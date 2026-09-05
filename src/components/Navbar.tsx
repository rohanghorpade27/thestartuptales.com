import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import TSTLogo from '../assets/images/TST_logo_nobg.png';
import { Link, useNavigate } from 'react-router-dom';
import { authClient } from '../lib/auth-client';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: sessionData } = authClient.useSession() as any;
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({});
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img src={TSTLogo} alt="The Startup Tales Logo" className="w-20 h-full object-cover transition-transform duration-500 hover:scale-105" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-600 hover:text-red-600 font-medium transition-colors">
                {link.name}
              </a>
            ))}
            
            {sessionData?.session ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/profile')}
                  className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-200 transition-colors"
                  title="Profile"
                >
                  <User size={20} />
                </button>
                <button 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 font-medium transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/signin" className="text-gray-600 hover:text-red-600 font-medium transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="bg-black text-white px-5 py-2.5 rounded-full font-medium hover:bg-red-600 transition-colors duration-300">
                  Sign Up
                </Link>
              </div>
            )}
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
            
            {sessionData?.session ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center mt-4 bg-red-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
