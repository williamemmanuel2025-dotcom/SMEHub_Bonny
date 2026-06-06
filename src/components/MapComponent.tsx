import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { Business } from '../data/mockData';
import { MapPin, Navigation } from 'lucide-react';

// Fix for default marker icons in React-Leaflet
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  businesses: Business[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

// Helper to auto-fit bounds
function MapBoundsManager({ businesses }: { businesses: Business[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (businesses.length > 0) {
      const bounds = L.latLngBounds(businesses.map(b => [b.latitude, b.longitude]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [businesses, map]);
  
  return null;
}

export default function MapComponent({ 
  businesses, 
  center = [4.437, 7.167], // Default to Bonny Island
  zoom = 13,
  className = "h-[400px] w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 z-0 relative"
}: MapComponentProps) {
  
  return (
    <div className={className}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {businesses.map((business) => (
          <Marker 
            key={business.id} 
            position={[business.latitude, business.longitude]}
          >
            <Popup className="rounded-xl">
              <div className="w-48 p-1">
                <img 
                  src={business.cover_image} 
                  alt={business.business_name} 
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <h4 className="font-bold text-sm mb-1">{business.business_name}</h4>
                <p className="text-xs text-slate-500 mb-2 truncate flex items-center gap-1">
                  <MapPin size={10} /> {business.area}
                </p>
                <Link 
                  to={`/business/${business.slug}`}
                  className="block w-full text-center bg-primary-600 text-white text-xs py-1.5 rounded-md hover:bg-primary-700 transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
        {businesses.length > 1 && <MapBoundsManager businesses={businesses} />}
      </MapContainer>
    </div>
  );
}
