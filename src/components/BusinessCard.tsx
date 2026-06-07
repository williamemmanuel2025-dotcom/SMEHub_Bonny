import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, BadgeCheck, Clock, Navigation } from 'lucide-react';
import { Business } from '../data/mockData';
import { checkIsOpen } from '../utils';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const isOpenNow = () => {
    return checkIsOpen(business.opening_hours);
  };

  return (
    <Link 
      to={`/business/${business.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img 
          src={business.cover_image} 
          alt={business.business_name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {business.featured_status && (
            <span className="bg-primary-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              Featured
            </span>
          )}
          <span className="bg-white/90 backdrop-blur text-slate-800 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
            {business.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full shadow-sm flex items-center gap-1 ${isOpenNow() ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
            <Clock size={12} />
            {isOpenNow() ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-5">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-primary-600 transition-colors">
            {business.business_name}
            {business.verified_status && (
              <BadgeCheck className="inline-block ml-1 h-5 w-5 text-primary-500 shrink-0" />
            )}
          </h3>
          <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-amber-700 shrink-0">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-sm font-bold">{business.rating}</span>
          </div>
        </div>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
          {business.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center text-slate-500 text-sm">
            <MapPin className="h-4 w-4 mr-1 shrink-0" />
            <span className="truncate max-w-[120px]">{business.area}</span>
          </div>
          <span className="text-slate-400 text-xs">({business.total_reviews} reviews)</span>
        </div>
      </div>
    </Link>
  );
}

export default BusinessCard;
