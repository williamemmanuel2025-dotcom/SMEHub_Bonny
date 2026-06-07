import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { checkIsOpen } from '../utils';
import { MapPin, Phone, MessageCircle, Mail, Globe, Clock, Star, BadgeCheck, Navigation2, Share2, Heart, ExternalLink } from 'lucide-react';
import MapComponent from '../components/MapComponent';

export default function BusinessProfile() {
  const { slug } = useParams<{ slug: string }>();
  const { businesses } = useAppContext();
  
  const business = businesses.find(b => b.slug === slug);

  if (!business) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Business not found</h2>
        <Link to="/businesses" className="text-primary-600 font-medium hover:underline">
          Return to directory
        </Link>
      </div>
    );
  }

  const isOpenNow = () => {
    return checkIsOpen(business.opening_hours);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="w-full h-72 md:h-96 relative bg-slate-900">
        <img 
          src={business.cover_image} 
          alt={business.business_name} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="absolute bottom-0 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {business.category}
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${isOpenNow() ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                    <Clock size={12} />
                    {isOpenNow() ? 'Open Now' : 'Closed'}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 flex items-center flex-wrap gap-2">
                  {business.business_name}
                  {business.verified_status && (
                    <BadgeCheck className="text-primary-400 h-8 w-8" />
                  )}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-200 text-sm">
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg backdrop-blur">
                    <Star className="h-4 w-4 text-amber-400 fill-current" />
                    <span className="font-bold text-white">{business.rating}</span>
                    <span className="text-slate-300">({business.total_reviews} reviews)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {business.area}, {business.city}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur border border-white/20 flex items-center gap-2 transition-colors">
                  <Share2 size={18} /> Share
                </button>
                <button className="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur border border-white/20 flex items-center gap-2 transition-colors">
                  <Heart size={18} /> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About the Business</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {business.description}
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Location & Map</h2>
              <div className="mb-4">
                <p className="text-slate-700 flex items-start gap-2 text-lg">
                  <MapPin className="h-6 w-6 text-primary-500 mt-0.5 shrink-0" />
                  <span>{business.address}, {business.city}</span>
                </p>
              </div>
              <MapComponent 
                businesses={[business]} 
                center={[business.latitude, business.longitude]} 
                zoom={14}
                className="h-[300px] w-full rounded-2xl overflow-hidden shadow-inner border border-slate-100 z-0 relative"
              />
            </div>
            
             <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Reviews & Rating</h2>
               <div className="flex items-center gap-6 border-b border-slate-100 pb-6 mb-6">
                 <div className="text-center">
                    <div className="text-5xl font-black text-slate-900">{business.rating}</div>
                    <div className="flex gap-1 justify-center text-amber-500 my-2">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} size={16} fill={i < Math.floor(business.rating) ? "currentColor" : "none"} />
                       ))}
                    </div>
                    <div className="text-sm text-slate-500">{business.total_reviews} recents reviews</div>
                 </div>
                 {/* Placeholder for progress bars in a real app */}
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Contact Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Contact & Info</h3>
              
              <div className="space-y-4 mb-8">
                {business.phone && (
                  <a target="_top" href={`tel:${business.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-3 text-slate-700 hover:text-primary-600 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-slate-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Phone Number</div>
                      <div className="font-semibold">{business.phone}</div>
                    </div>
                  </a>
                )}
                
                {business.whatsapp && (
                  <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-emerald-700 hover:text-emerald-600 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <MessageCircle size={18} className="text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-xs text-emerald-600/80 font-medium">WhatsApp</div>
                      <div className="font-semibold">{business.whatsapp}</div>
                    </div>
                  </a>
                )}

                {business.email && (
                  <a href={`mailto:${business.email}`} className="flex items-center gap-3 text-slate-700 hover:text-primary-600 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-slate-600" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs text-slate-500 font-medium">Email Address</div>
                      <div className="font-semibold truncate">{business.email}</div>
                    </div>
                  </a>
                )}

                {business.website && (
                  <a href={business.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-700 hover:text-primary-600 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Globe size={18} className="text-slate-600" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs text-slate-500 font-medium">Website</div>
                      <div className="font-semibold truncate">{business.website.replace(/^https?:\/\//, '')}</div>
                    </div>
                  </a>
                )}
                
                <div className="flex items-center gap-3 text-slate-700 pt-2 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-slate-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Opening Hours</div>
                      <div className="font-semibold">{business.opening_hours}</div>
                    </div>
                  </div>
              </div>

              <div className="flex flex-col gap-3">
                {business.phone && isOpenNow() && (
                  <a 
                    href={`tel:${business.phone.replace(/[^0-9+]/g, '')}`}
                    target="_top"
                    className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Phone size={18} /> Call Now
                  </a>
                )}

                {business.phone && !isOpenNow() && (
                  <button 
                    disabled
                    className="w-full py-3.5 bg-red-500 text-white font-semibold rounded-xl shadow-md cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Clock size={18} /> Closed
                  </button>
                )}
                
                {business.whatsapp && (
                  <a 
                    href={`https://wa.me/${business.whatsapp.replace(/[^0-9+]/g, '')}`}
                    target="_top" rel="noopener noreferrer"
                    className="w-full py-3.5 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} /> Chat on WhatsApp
                  </a>
                )}
                <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Navigation2 size={18} /> Get Directions
                  </a>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
