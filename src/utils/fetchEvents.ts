import { EventItem } from '../types';
import { parseSafeDate } from './helpers';

export async function fetchUnifiedEvents(): Promise<EventItem[]> {
  try {
    const CACHE_KEY = 'events_cache_v10';
    const TIME_KEY = 'events_cache_time_v10';
    
    // Check cache first
    const cachedEvents = sessionStorage.getItem(CACHE_KEY);
    const cacheTime = sessionStorage.getItem(TIME_KEY);
    
    if (cachedEvents && cacheTime && (Date.now() - parseInt(cacheTime) < 3600000)) {
      return JSON.parse(cachedEvents);
    }

    const [githubRes, fcRes] = await Promise.all([
      fetch('https://adarshkp73.github.io/public_events/events.json'),
      fetch('/api/events').catch(() => null)
    ]);
    
    const githubData = await githubRes.json();
    let eventsData = Array.isArray(githubData) ? githubData : (githubData.events || []);
    
    if (fcRes && fcRes.ok) {
      try {
        const fcData = await fcRes.json();
        if (Array.isArray(fcData) && fcData.length > 0) {
          // Map over existing github data and add coordinates if matched
          eventsData = eventsData.map((ev: any) => {
            const match = fcData.find(f => 
              f.register_url === ev['registration link'] || 
              f.title?.toLowerCase() === ev['event name']?.toLowerCase() ||
              (f.event_url && ev['registration link'] && ev['registration link'].includes(f.event_url))
            );
            if (match) {
              return { 
                ...ev, 
                city: match.city || ev.venue,
                venue: match.venue || ev.venue,
                host: match.organizer || ev.host,
                coords: (match.lat && match.lng) ? [match.lat, match.lng] : undefined 
              };
            }
            return { ...ev, city: ev.venue };
          });

          // Add novel events from FounderCal
          const existingTitles = new Set(eventsData.map((e: any) => (e['event name'] || '').toLowerCase()));
          
          fcData.forEach(fcEvent => {
            const fcTitle = (fcEvent.title || '').toLowerCase();
            if (!existingTitles.has(fcTitle)) {
              // Convert to our format
              eventsData.push({
                'event name': fcEvent.title || 'Event TBA',
                'registration link': fcEvent.register_url || 'data not provided/will be shared upon signup',
                host: fcEvent.organizer || 'data not provided/will be shared upon signup',
                venue: fcEvent.venue || 'data not provided/will be shared upon signup',
                city: fcEvent.city || fcEvent.venue,
                'date and time': fcEvent.start_at || 'data not provided/will be shared upon signup',
                'image url': 'data not provided/will be shared upon signup', // Uses fallback
                coords: (fcEvent.lat && fcEvent.lng) ? [fcEvent.lat, fcEvent.lng] : undefined
              });
              existingTitles.add(fcTitle);
            }
          });
        } else {
          eventsData = eventsData.map((ev: any) => ({ ...ev, city: ev.venue }));
        }
      } catch (parseError) {
        console.error("Failed to parse API response as JSON", parseError);
        eventsData = eventsData.map((ev: any) => ({ ...ev, city: ev.venue }));
      }
    } else {
      eventsData = eventsData.map((ev: any) => ({ ...ev, city: ev.venue }));
    }
    
    // Sort by date (putting valid dates first, then TBAs)
    eventsData.sort((a: any, b: any) => {
      const dateA = parseSafeDate(a['date and time']).getTime();
      const dateB = parseSafeDate(b['date and time']).getTime();
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;
      return dateA - dateB;
    });

    sessionStorage.setItem(CACHE_KEY, JSON.stringify(eventsData));
    sessionStorage.setItem(TIME_KEY, Date.now().toString());
    
    return eventsData;
  } catch (error) {
    console.error("Error fetching unified events:", error);
    return [];
  }
}
