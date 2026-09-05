import React, { useState } from 'react';
import { Calendar, MapPin, User } from 'lucide-react';
import { EventItem } from '../types';
import { deriveEventType, parseSafeDate } from '../utils/helpers';
import postersMap from '../data/posters.json';

interface EventCardProps {
  event: EventItem;
}

const FALLBACK_STRING = "data not provided/will be shared upon signup";

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [textureIndex] = useState(() => Math.floor(Math.random() * 5) + 1);

  const eventName = event['event name'] !== FALLBACK_STRING ? event['event name'] : "Event TBA";
  const host = event.host !== FALLBACK_STRING ? event.host : "Host TBA";
  const venue = event.venue !== FALLBACK_STRING ? event.venue : "Shared upon registration";
  const eventType = deriveEventType(eventName);
  const registerLink = event['registration link'];
  const hasRegisterLink = registerLink && registerLink !== FALLBACK_STRING;
  
  let imageUrl = event['image url'];
  let imagePath = '/event-images/placeholder.jpg';
  
  if (imageUrl !== FALLBACK_STRING && imageUrl) {
    // Clean markdown if present
    const mdMatch = imageUrl.match(/\]\((.*?)\)/);
    if (mdMatch) {
      imageUrl = mdMatch[1];
    }
    
    imagePath = imageUrl;
  } else if (hasRegisterLink) {
    let rawLink = registerLink;
    const mdMatch = rawLink.match(/\]\((.*?)\)/);
    if (mdMatch) {
      rawLink = mdMatch[1];
    }
    
    let slug = 'event';
    try {
      const urlObj = new URL(rawLink);
      slug = urlObj.pathname.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'event';
    } catch (e) {}
    
    // Type assertion because JSON imports are objects
    const typedPosters = postersMap as Record<string, string>;
    
    // Priority: Vercel Blob URL -> Local Scraped Image Fallback
    imagePath = typedPosters[slug] || `/event-images/scraped/${slug}.jpg`;
  }
  
  // Extract real URL if wrapped in markdown like "[link](link)"
  let actualRegisterUrl = registerLink;
  if (hasRegisterLink) {
    const mdMatch = registerLink.match(/\]\((.*?)\)/);
    if (mdMatch) {
      actualRegisterUrl = mdMatch[1];
    }
  }


  // Parse date and time
  const dateString = event['date and time'];
  let formattedDay = "--";
  let formattedMonth = "TBA";
  let formattedTime = "";
  
  if (dateString !== FALLBACK_STRING) {
    try {
      const startDate = parseSafeDate(dateString);
      if (isNaN(startDate.getTime())) throw new Error("Invalid date");
      formattedDay = startDate.toLocaleDateString('en-US', { day: '2-digit' });
      formattedMonth = startDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      formattedTime = startDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', minute: '2-digit'
      });
    } catch(e) {
      // Fallback if parsing fails
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col transition-transform hover:-translate-y-1 duration-300 w-full h-full relative z-0 hover:z-50">
      <div className="w-full h-56 relative shrink-0 bg-gray-50 rounded-t-2xl overflow-hidden">
        {!imageError ? (
          <img 
            src={imagePath} 
            onError={() => setImageError(true)}
            alt={eventName} 
            className="w-full h-full object-contain bg-gray-50"
          />
        ) : (
          <div className="w-full h-full relative flex flex-col justify-end bg-gray-900">
            <img 
              src={`/event-images/texture-${textureIndex}.png`} 
              alt="Background Texture"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            {/* Subtle gradient so white text always pops against the texture */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
            
            <div className="relative z-10 p-5">
              <h2 className="text-white text-2xl font-black tracking-tight leading-tight line-clamp-3 drop-shadow-md">
                {host}
              </h2>
            </div>
          </div>
        )}
        
        {eventType && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-red-600 uppercase tracking-wide shadow-sm z-20">
            {eventType}
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow w-full">
        <div className="flex flex-row w-full flex-grow">
          {/* Left Column - 25% */}
          <div className="w-1/4 flex flex-col items-center pt-1 border-r border-gray-200 pr-3 shrink-0">
            <span className="text-4xl font-black text-red-600 leading-none">{formattedDay}</span>
            <span className="text-xs font-bold text-gray-500 tracking-widest mt-2 uppercase">{formattedMonth}</span>
          </div>

          {/* Right Column - 75% */}
          <div className="w-3/4 pl-4 flex flex-col">
            <div 
              className="relative group mb-1" 
              onMouseEnter={(e) => {
                const el = e.currentTarget.querySelector('h3');
                if (el) setIsTruncated(el.scrollHeight > el.clientHeight);
              }}
              onMouseLeave={() => setIsTruncated(false)}
            >
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
                {eventName}
              </h3>
              {isTruncated && (
                <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs font-medium rounded px-2.5 py-1.5 shadow-lg whitespace-nowrap pointer-events-none">
                  {eventName}
                </div>
              )}
            </div>
            
            <span className="text-sm text-gray-600 font-mono font-medium mb-3 truncate">{host}</span>
            
            <div className="border-b border-dashed border-gray-200 w-full mb-3"></div>
            
            <div className="flex flex-col gap-1.5">
              {formattedTime && (
                <div className="flex items-center text-gray-800">
                  <span className="text-sm font-mono font-medium">{formattedTime}</span>
                </div>
              )}
              <div className="flex items-start text-gray-500">
                <span className="text-xs line-clamp-2">{venue}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-5 w-full">
        {hasRegisterLink ? (
          <a 
            href={actualRegisterUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            Register
          </a>
        ) : (
          <button 
            disabled
            className="w-full bg-gray-100 text-gray-400 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
          >
            Registration Link TBA
          </button>
        )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
