import React from 'react';
import logo from '../assets/images/bengaluru-pitch-circuit-logo.png';
import { motion } from 'framer-motion';

import pc1 from '../assets/images/pc1.JPG';
import pc2 from '../assets/images/pc2.jpg';
import pc3 from '../assets/images/pc3.JPG';
import pc4 from '../assets/images/pc4.JPG';
import pc5 from '../assets/images/pc5.JPG';
import pc6 from '../assets/images/pc6.JPG';
import pc7 from '../assets/images/pc7.JPG';

const circuitItems = [
  { id: 1, title: 'Pitch Circuit 1', desc: 'Bengaluru, 120+ attendees', image: pc1 },
  { id: 2, title: 'Pitch Circuit 2', desc: 'Mumbai, 180+ attendees', image: pc2 },
  { id: 3, title: 'Pitch Circuit 3', desc: 'Bengaluru, 210+ attendees', image: pc3 },
  { id: 4, title: 'Pitch Circuit 4', desc: 'Delhi NCR, 250+ attendees', image: pc4 },
  { id: 5, title: 'Pitch Circuit 5', desc: 'Bengaluru, 300+ attendees', image: pc5 },
  { id: 6, title: 'Pitch Circuit 6', desc: 'Mumbai, 350+ attendees', image: pc6 },
  { id: 7, title: 'Pitch Circuit 7', desc: 'Bengaluru, 170+ attendees', image: pc7 },
];

// Duplicate items to enable seamless infinite scrolling
const duplicatedItems = [...circuitItems, ...circuitItems];

const PitchCircuitPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24 overflow-x-hidden">
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src={logo} 
            alt="Bengaluru Pitch Circuit" 
            className="h-24 md:h-32 object-contain mb-8"
          />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight mb-6"
        >
          Bengaluru Pitch Circuit
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium max-w-2xl"
        >
          Early stage startups pitch live in front of active venture capitalists and angel networks. 
          Real feedback. Real connections. Real capital.
        </motion.p>
      </div>

      {/* Carousel Section */}
      <div className="mt-20 w-full relative group cursor-pointer">
        {/* Left and Right Fade Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <div className="overflow-hidden w-full">
          {/* Scroll Track */}
          <div className="flex gap-6 md:gap-8 w-max animate-scroll-left group-hover:[animation-play-state:paused] px-8">
            {duplicatedItems.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="w-[280px] md:w-[380px] shrink-0 flex flex-col group/card"
              >
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-[200px] md:h-[260px] object-cover rounded-3xl shadow-sm transition-transform duration-300 group-hover/card:scale-[1.02]" 
                />
                
                {/* Content */}
                <div className="mt-5 text-center transition-transform duration-300 group-hover/card:translate-y-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-500 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight">How It Works</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Designed for maximum transparency, quick feedback loops, and organic relationship building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-gray-50 border border-gray-100 p-8 md:p-10 rounded-3xl hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-7xl md:text-8xl font-black text-red-500/10 group-hover:text-red-500/20 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">01</div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Panel Discussion</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Interactive fireside chat or panel with prominent VCs and active angel networks discussing market trends.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 border border-gray-100 p-8 md:p-10 rounded-3xl hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-7xl md:text-8xl font-black text-red-500/10 group-hover:text-red-500/20 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">02</div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">5 Startups × 10 Min Pitches</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Curated early-stage startup founders present their decks for 5 minutes, followed by a 5-minute VC Q&A and direct feedback.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 border border-gray-100 p-8 md:p-10 rounded-3xl hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-7xl md:text-8xl font-black text-red-500/10 group-hover:text-red-500/20 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">03</div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Open Networking</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Unstructured face-to-face interaction over premium snacks and beverages to connect founders directly with allocators.
              </p>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default PitchCircuitPage;
