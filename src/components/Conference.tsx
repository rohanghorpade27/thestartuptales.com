import React, { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';
import { MEDIA_GALLERY } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { MediaItem } from '../types';

const Conference: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    if (selectedMedia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMedia]);

  return (
    <section id="conference" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-red-500 font-bold uppercase tracking-widest text-sm mb-2 block">Gallery</span>
            <h2 className="text-4xl md:text-5xl font-bold">Conference Highlights</h2>
          </div>
          <div className="mt-6 md:mt-0">
            <button className="px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors font-medium">
              View All Gallery
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {MEDIA_GALLERY.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedMedia(item)}
              className={`relative group overflow-hidden rounded-2xl bg-gray-900 cursor-pointer ${
                index === 0 || index === 3 ? 'md:col-span-2' : ''
              }`}
            >
              <img 
                src={item.type === 'video' && item.thumbnail ? item.thumbnail : item.url} 
                alt={item.caption} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-white font-bold text-lg">{item.caption}</span>
                <span className="text-gray-300 text-sm capitalize">{item.type}</span>
              </div>

              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/40">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Media Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedMedia(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMedia(null);
              }}
            >
              <X size={32} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center" 
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.type === 'video' ? (
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black border border-white/10">
                  <iframe 
                    src={`${selectedMedia.url}?autoplay=1&rel=0`}
                    title={selectedMedia.caption}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <img 
                    src={selectedMedia.url} 
                    alt={selectedMedia.caption}
                    className="max-w-full max-h-[85vh] object-contain"
                  />
                </div>
              )}
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-white">{selectedMedia.caption}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Conference;