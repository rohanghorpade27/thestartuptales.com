import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { UPCOMING_EVENTS } from '../constants';
import { motion } from 'framer-motion';

const Events: React.FC = () => {
  return (
    <section id="events" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Upcoming Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Mark your calendars. Don't miss out on the next big opportunity to network and learn.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {UPCOMING_EVENTS.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col w-full max-w-[400px]"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                {event.category && (
                  <>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-red-600 uppercase tracking-wide">
                      {event.category}
                    </div>
                  </>
                )}
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 font-medium">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span>{event.date}</span>
                </div>

                <h3 className="text-xl font-bold text-black mb-4 flex-1">{event.title}</h3>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{event.time}</span>
                  </div>
                </div>

                <a href={event.url} target="_blank">
                  <button className="w-full py-3 bg-gray-50 hover:bg-black hover:text-white text-black font-semibold rounded-xl transition-colors duration-300">
                    Register Now
                  </button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
