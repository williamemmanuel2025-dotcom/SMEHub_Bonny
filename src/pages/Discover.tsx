import React, { useState } from 'react';
import { Search, Map as MapIcon, Grid, Filter, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BusinessCard from '../components/BusinessCard';
import MapComponent from '../components/MapComponent';

export default function Discover() {
  const { 
    businesses, 
    filteredBusinesses, 
    categories, 
    searchQuery, 
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedArea,
    setSelectedArea
  } = useAppContext();

  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Get unique areas from businesses
  const areas = Array.from(new Set(businesses.map(b => b.area))).sort();

  return (
    <div className="bg-slate-50 min-h-screen pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Search & Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold text-slate-900 self-start md:self-auto">Discover</h1>
          
          <div className="flex w-full md:w-auto items-center gap-3">
            <div className="relative flex-grow md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search businesses..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
              />
            </div>
            
            <button 
              className="md:hidden p-2 rounded-lg border border-slate-200 bg-white text-slate-600"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            >
              <Filter className="h-4 w-4" />
            </button>
            
            <div className="flex bg-white rounded-lg border border-slate-200 p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'map' ? 'bg-primary-50 text-primary-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <MapIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`w-full md:w-64 shrink-0 space-y-6 ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Filter size={18} className="text-primary-600" /> Filters
              </h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Categories</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 text-sm">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                      className="text-primary-600 focus:ring-primary-500" 
                    />
                    All Categories
                  </label>
                  {categories.map((cat) => (
                     <label key={cat.id} className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 text-sm">
                      <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === cat.name}
                        onChange={() => setSelectedCategory(cat.name)}
                        className="text-primary-600 focus:ring-primary-500" 
                      />
                      {cat.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Area */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Location Area</h4>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <select 
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm appearance-none"
                  >
                    <option value="">All Bonny Island</option>
                    {areas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
            <div className="mb-4 text-sm text-slate-500">
              Showing <span className="font-bold text-slate-900">{filteredBusinesses.length}</span> results
            </div>

            {filteredBusinesses.length === 0 ? (
              <div className="bg-white text-center py-20 rounded-2xl border border-slate-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No businesses found</h3>
                <p className="text-slate-500">Try adjusting your filters or search query.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setSelectedArea('');
                  }}
                  className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBusinesses.map(business => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            ) : (
              <div className="sticky top-24 h-[calc(100vh-120px)]">
                <MapComponent businesses={filteredBusinesses} className="h-full w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative z-0" />
              </div>
            )}
          </main>
        </div>

      </div>
    </div>
  );
}
