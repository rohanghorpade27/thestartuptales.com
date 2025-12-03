import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import TSTLogo from '../assets/images/TST_logo_nobg.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <img src={TSTLogo} alt="The Startup Tales Logo" className="w-20 h-full object-cover transition-transform duration-500 hover:scale-105" />
          {/* <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg transform rotate-45 flex items-center justify-center">
              <span className="text-white font-bold -rotate-45">S</span>
            </div>
            <a href="#" className="text-2xl font-bold tracking-tighter text-black">
              The Startup Tales
            </a>
          </div> */}

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-600 hover:text-red-600 font-medium transition-colors">
                {link.name}
              </a>
            ))}
            <a href="#programs" className="bg-black text-white px-5 py-2.5 rounded-full font-medium hover:bg-red-600 transition-colors duration-300">
              Join Us
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 hover:text-red-600 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base font-medium text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#programs"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 bg-red-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
            >
              Join Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
