import React from 'react';
import { Mic, ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-red-600 rounded-[2.5rem] p-12 overflow-hidden shadow-2xl">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-red-500 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-red-700 rounded-full blur-2xl opacity-50"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-red-800/30 text-white px-4 py-1 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-red-500/30">
                <Mic className="w-4 h-4" />
                <span>Podcast Feature</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Share your story with the world.
              </h2>
              <p className="text-red-100 text-lg mb-0 max-w-md">
                Get featured on our YouTube podcast. We are looking for inspiring startup journeys.
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <a 
                href="https://forms.gle/fULLCWX5ts91xhCD9"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-red-600 px-8 py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                Fill the Form
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;