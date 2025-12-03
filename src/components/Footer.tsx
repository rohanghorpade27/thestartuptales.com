import React from 'react';
import { Instagram, Linkedin, Youtube, Facebook, Heart } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <img src="/src/assets/images/TST_logo_nobg.png" className="w-24 bg-white p-2 rounded mb-4 object-cover transition-transform duration-500 hover:scale-105" />
            {/* <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-lg transform rotate-45 flex items-center justify-center">
                <span className="text-white font-bold -rotate-45">S</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter">The Startup Tales</span>
            </div> */}
            <p className="text-gray-400 max-w-sm leading-relaxed mb-8">
              Leveling up ideas. Join the movement that's reshaping the Indian startup landscape from Bangalore to the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/startuptalescommunity"
                target="_blank"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a
                href="https://youtube.com/@thestartuptales"
                target="_blank"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors group"
              >
                <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a
                href="https://www.instagram.com/thestartuptales.in"
                target="_blank"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors group"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li>Bangalore, India</li>
              <li>hello@thestartuptales.com</li>
              {/* <li>+91 999 999 9999</li> */}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} The Startup Tales. All rights reserved.</p>
          <div className="flex items-center gap-1 mt-4 md:mt-0">
            Made with <Heart className="w-4 h-4 text-red-600 fill-red-600" /> in Bangalore
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
