import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Analytics from './components/Analytics';
import Programs from './components/Programs';
import Conference from './components/Conference';
import Events from './components/Events';
import CTA from './components/CTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Analytics />
        <Programs />
        <Conference />
        <Events />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;