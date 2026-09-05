import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { EventItem } from '../types';
import EventCard from './EventCard';
import { fetchUnifiedEvents } from '../utils/fetchEvents';


const Events: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchUnifiedEvents()
      .then(eventsData => {
        setEvents(eventsData.slice(0, 3));
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching events:', err);
        setIsLoading(false);
      });
  }, []);
  return (
    <section id="events" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Discover Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore the latest startup events happening around you. Network, learn, and grow with the vibrant startup community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
            </div>
          ) : events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
