import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Navigation2, CheckCircle2, TrendingUp, Building } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BusinessCard from '../components/BusinessCard';

export default function Home() {
  const { categories, featuredBusinesses, setSearchQuery } = useAppContext();
  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    navigate('/businesses');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-slate-900 border-b border-primary-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-primary-600/20 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-secondary-600/20 blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Now live in Bonny Island
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Discover Trusted Local <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
              Businesses Near You
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
            Search, explore, and connect with verified SMEs, restaurants, artisans, and service providers in your city.
          </p>

          <div className="max-w-3xl mx-auto bg-white p-2 md:p-3 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2">
            <form onSubmit={handleSearch} className="flex-grow flex flex-col md:flex-row gap-2">
              <div className="relative flex-grow flex items-center">
                <Search className="absolute left-4 text-slate-400" size={20} />
                <input 
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 font-medium text-slate-800 placeholder:text-slate-400"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                />
              </div>
              <div className="relative flex-grow md:max-w-[240px] flex items-center">
                <MapPin className="absolute left-4 text-slate-400" size={20} />
                <select className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 font-medium text-slate-800 appearance-none cursor-pointer">
                  <option value="">All Bonny Island</option>
                  <option value="Finima">Finima</option>
                  <option value="Akiama">Akiama</option>
                  <option value="King Perekule">King Perekule</option>
                  <option value="Abalamabie">Abalamabie</option>
                  <option value="Coconut Estate">Coconut Estate</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full md:w-auto px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-primary-600/20 active:scale-95 flex items-center justify-center gap-2"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore by Category</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Find the top-rated businesses across different sectors tailored for your needs.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.slice(0, 8).map((cat) => (
              <Link 
                key={cat.id} 
                to="/businesses"
                onClick={() => {
                  setSearchQuery('');
                  // Note: usually we'd set category context here
                }}
                className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                   <Building size={24} />
                </div>
                <h3 className="font-semibold text-slate-800">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Businesses</h2>
              <p className="text-slate-500">Hand-picked top-performing SMEs in the city.</p>
            </div>
            <Link to="/businesses" className="hidden md:flex items-center text-primary-600 font-semibold hover:text-primary-700">
              View All <Navigation2 size={18} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBusinesses.slice(0, 4).map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/businesses" className="inline-flex items-center text-primary-600 font-semibold">
              View All <Navigation2 size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works / Trust Section */}
      <section className="py-20 bg-slate-900 text-white rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-20 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-16">How SMEHub Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <Search className="text-secondary-400" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Search</h3>
              <p className="text-slate-400">Discover top-rated local SMEs and service providers using our advanced location-based search.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="text-emerald-400" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Verify</h3>
              <p className="text-slate-400">Read reviews, explore photos, check operating hours, and ensure they meet your needs.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <TrendingUp className="text-accent-400" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Connect</h3>
              <p className="text-slate-400">Call, WhatsApp, or visit their location directly through our integrated map services.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
