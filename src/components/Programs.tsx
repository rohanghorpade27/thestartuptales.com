import React from 'react';
import { motion } from 'framer-motion';
import { PROGRAMS } from '../constants';

const Programs: React.FC = () => {
  return (
    <section id="programs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-black mb-4">Our Ecosystem Programs</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive support systems designed to nurture startups at every stage of their lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 bg-white border border-gray-100 rounded-3xl hover:shadow-xl hover:shadow-red-50 hover:border-red-100 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300">
                <program.icon className="w-7 h-7 text-red-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">{program.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {program.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;