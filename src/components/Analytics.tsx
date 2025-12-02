import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { STATS } from '../constants';

const Analytics: React.FC = () => {
  return (
    <section id="analytics" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 text-red-600 font-bold mb-4">
              <MapPin className="w-5 h-5" />
              <span>Founded in Bangalore</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              Fueling the <span className="underline decoration-red-600 decoration-4 underline-offset-4">Silicon Valley</span> of India
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              From our headquarters in Bangalore, we've expanded our footprint across India, creating a dense network of innovation and opportunity. Our impact is measured in the success of the startups we support.
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-4">
               {/* Decorative grid image equivalent */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-40">
                  <span className="text-4xl font-extrabold text-red-600 mb-1">20+</span>
                  <span className="text-sm text-gray-500 font-medium">Active Communities</span>
               </div>
               <div className="bg-black p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center h-40 transform translate-y-4">
                  <span className="text-4xl font-extrabold text-white mb-1">5★</span>
                  <span className="text-sm text-gray-400 font-medium">Community Rating</span>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center group p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl lg:text-4xl font-extrabold text-black mb-2 group-hover:text-red-600 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Analytics;