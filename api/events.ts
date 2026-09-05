const CITIES = ['bangalore', 'pune', 'hyderabad', 'delhi', 'mumbai'];

export default async function handler(req: any, res: any) {
  try {
    const fetchPromises = CITIES.map(async (city) => {
      const response = await fetch(`https://foundercal.com/api/events.json?city=${city}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch events for ${city}`);
      }
      return response.json();
    });

    const results = await Promise.all(fetchPromises);
    
    const allEvents = results.flatMap(result => result.events || []);

    const now = new Date().getTime();

    // Filter out past events
    const filteredEvents = allEvents.filter(event => {
        return new Date(event.start_at).getTime() > now;
    });

    const mappedEvents = filteredEvents.map(event => {
        let slug = 'unknown-event';
        if (event.event_url) {
            slug = event.event_url.split('/').pop() || slug;
        } else if (event.register_url) {
            const parts = event.register_url.split('/').filter(Boolean);
            slug = parts[parts.length - 1] || slug;
        }
        
        return {
            ...event,
            image: `/event-images/${slug}.jpg`
        };
    });

    // Sort by start date
    mappedEvents.sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());

    // Vercel Edge Cache configuration (1 hour TTL)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(mappedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
}
