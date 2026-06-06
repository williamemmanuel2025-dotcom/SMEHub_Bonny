import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary-500 p-2 rounded-lg">
                <Building2 className="text-white h-6 w-6" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">SMEHub Bonny</span>
            </div>
            <p className="text-sm text-slate-400">
              Discover trusted local businesses and SMEs in Bonny Island. Search, explore, and connect seamlessly.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/businesses" className="text-sm hover:text-primary-400 transition-colors">Discover Businesses</Link></li>
              <li><Link to="/submit-business" className="text-sm hover:text-primary-400 transition-colors">List Your Business</Link></li>
              <li><Link to="/admin" className="text-sm hover:text-primary-400 transition-colors">Admin Login</Link></li>
              <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">Categories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-sm hover:text-primary-400 transition-colors">Help Center</Link></li>
              <li><Link to="/safety" className="text-sm hover:text-primary-400 transition-colors">Safety Information</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm hover:text-primary-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                <span className="text-sm">Wilbros Junction, Bonny Island, Rivers State</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-500 shrink-0" />
                <span className="text-sm">+234 705 526 7190</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-500 shrink-0" />
                <span className="text-sm">williamemmanuel2025@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} SMEHub Bonny Island. All rights reserved.</p>
          <p>Built by Willie Emmanuel for Bonny SMEs</p>
        </div>
      </div>
    </footer>
  );
}
