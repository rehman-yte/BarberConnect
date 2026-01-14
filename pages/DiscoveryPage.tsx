
import React, { useState, useEffect } from 'react';
import { MOCK_BARBERS } from '../constants.tsx';
import BarberCard from '../components/BarberCard';
import { Search, SlidersHorizontal, MapPin, Sparkles, Filter, X } from 'lucide-react';
import { Barber } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface DiscoveryPageProps {
  onSelectBarber: (barber: Barber) => void;
  initialQuery?: string;
}

const DiscoveryPage: React.FC<DiscoveryPageProps> = ({ onSelectBarber, initialQuery = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<string | null>(null);

  const tags = ['Master Barber', 'Traditional Shave', 'VIP Only', 'Skin Fade Expert', 'Celebrity Stylist', 'Classic', 'Beard Specialist'];
  const priceRanges = ['$$', '$$$', '$$$$'];

  const filteredBarbers = MOCK_BARBERS.filter(barber => {
    const matchesSearch = barber.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          barber.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          barber.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTags = activeFilters.length === 0 || activeFilters.every(f => barber.tags.includes(f));
    const matchesPrice = !priceFilter || barber.priceRange === priceFilter;

    return matchesSearch && matchesTags && matchesPrice;
  });

  const toggleFilter = (tag: string) => {
    setActiveFilters(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <div className="bg-[#FDFCFB] min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-10">
        <header className="mb-16 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-4">
              <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.5em] flex items-center">
                <Sparkles className="w-3 h-3 mr-2" />
                Atelier Discovery
              </span>
              <h1 className="font-dm text-5xl md:text-7xl font-bold tracking-tight italic">
                Find Your <span className="not-italic">Master Artisan</span>
              </h1>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{filteredBarbers.length} Elite Establishments Available</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5" />
              <input 
                type="text"
                placeholder="Search by name, technique, or atelier..."
                className="w-full bg-white border border-slate-100 shadow-sm pl-16 pr-6 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all text-sm font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="lg:col-span-4 flex gap-4">
              <div className="flex-1 bg-white border border-slate-100 rounded-2xl px-6 py-5 shadow-sm flex items-center justify-between">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">New York, NY</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-12">
            <div className="space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-black">Aesthetic Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleFilter(tag)}
                    className={`px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${
                      activeFilters.includes(tag) 
                      ? 'bg-black text-[#D4AF37] border-black shadow-lg' 
                      : 'bg-white text-slate-400 border-slate-100 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-black">Exclusivity Level</h3>
              <div className="flex gap-3">
                {priceRanges.map(range => (
                  <button
                    key={range}
                    onClick={() => setPriceFilter(priceFilter === range ? null : range)}
                    className={`flex-1 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${
                      priceFilter === range 
                      ? 'bg-black text-[#D4AF37] border-black shadow-lg' 
                      : 'bg-white text-slate-400 border-slate-100 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {(activeFilters.length > 0 || priceFilter || searchQuery) && (
              <button 
                onClick={() => { setActiveFilters([]); setPriceFilter(null); setSearchQuery(''); }}
                className="flex items-center text-[9px] font-bold uppercase tracking-widest text-red-500 hover:underline"
              >
                <X className="w-3 h-3 mr-2" />
                Reset All Filters
              </button>
            )}
          </aside>

          {/* Results Grid */}
          <main className="lg:col-span-9">
            {filteredBarbers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <AnimatePresence>
                  {filteredBarbers.map((barber, idx) => (
                    <motion.div
                      key={barber.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <BarberCard barber={barber} onClick={() => onSelectBarber(barber)} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-32 text-center bg-white rounded-[4rem] border border-slate-100">
                <Search className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                <h3 className="font-dm text-2xl font-bold italic mb-2">No Match Found</h3>
                <p className="text-slate-400 text-sm font-light">The artisans you seek are currently elusive. Try refining your criteria.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryPage;
