import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Building2 } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Discover', path: '/businesses' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Building2 className="nav-icon text-white h-6 w-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              SME<span className="text-primary-600">Hub</span> Bonny
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path) ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/submit-business"
              className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all active:scale-95"
            >
              List Your Business
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-4">
          {navLinks.map((link) => (
             <Link
               key={link.name}
               to={link.path}
               onClick={() => setIsMenuOpen(false)}
               className={`block px-3 py-2 rounded-md text-base font-medium ${
                 isActive(link.path) ? 'text-primary-600 bg-primary-50' : 'text-slate-700 hover:bg-slate-50'
               }`}
             >
               {link.name}
             </Link>
          ))}
          <Link
            to="/submit-business"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full text-center px-5 py-3 rounded-xl bg-slate-900 text-white font-medium shadow-sm"
          >
            List Your Business
          </Link>
          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
