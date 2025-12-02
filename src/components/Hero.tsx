import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, Calendar } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-50 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-bold uppercase tracking-wider mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              Premier Startup Ecosystem
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-black tracking-tight leading-[1.1] mb-6"
            >
              Leveling up <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-red-600">Ideas.</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-red-100 -z-0 skew-x-12"></span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              The Startup Tales is where 1M+ founders, investors, and creators collide. Submit your startup, join our accelerator, or attend our next mixer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#submit-startup"
                className="group px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-red-600 transition-all shadow-xl shadow-gray-200 hover:shadow-red-200 flex items-center justify-center gap-2"
              >
                Submit Startup
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#events"
                className="px-8 py-4 bg-white text-black border-2 border-gray-100 rounded-xl font-bold text-lg hover:border-black hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                Explore Events
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm font-semibold text-gray-500"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-[url('https://picsum.photos/100/100?random=${i}')] bg-cover`}></div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-red-50 flex items-center justify-center text-xs text-red-600 font-bold">+1k</div>
              </div>
              <p>Join 1,000+ Attendees</p>
            </motion.div>
          </div>

          {/* Right Column: Visual Composition */}
          <div className="relative hidden lg:block h-[500px]">
            {/* Main Image / Abstract Shape */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-gray-100 to-white rounded-full border border-gray-100 flex items-center justify-center"
            >
              <div className="w-[300px] h-[300px] rounded-full bg-red-50/50 flex items-center justify-center animate-pulse">
                <div className="text-9xl font-black text-red-600/10 select-none">ST</div>
              </div>
            </motion.div>

            {/* Floating Card 1: Podcast */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 w-64 z-20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase">New Episode</div>
                  <div className="font-bold text-sm">Startup Stories #3</div>
                </div>
              </div>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-red-500 rounded-full"></div>
              </div>
            </motion.div>

            {/* Floating Card 2: Stats */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-20 left-0 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 w-56 z-20"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-green-600 text-sm font-bold">+125%</span>
              </div>
              <div className="text-2xl font-bold text-black">100+</div>
              <div className="text-sm text-gray-500">Startup Stories</div>
            </motion.div>

            {/* Floating Card 3: Event */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 -right-4 bg-black text-white p-5 rounded-2xl shadow-2xl w-48 z-10"
            >
              <div className="text-xs text-gray-400 mb-2 font-bold uppercase tracking-wider">Next Event</div>
              <div className="font-bold text-lg mb-1">Pitch circuit 3</div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Dec 12, 2024</span>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-red-500"></div>
            <div className="absolute bottom-10 right-20 w-6 h-6 rounded-full bg-black"></div>
            <div className="absolute top-40 left-1/3 w-3 h-3 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
