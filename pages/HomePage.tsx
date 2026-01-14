
import React, { useState } from 'react';
import { MOCK_BARBERS } from '../constants.tsx';
import BarberCard from '../components/BarberCard';
import { Search, SlidersHorizontal, MapPin, Sparkles, Star } from 'lucide-react';
import { Barber } from '../types';
import { motion } from 'framer-motion';

interface HomePageProps {
  onSelectBarber: (barber: Barber) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectBarber }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Collections');

  const filters = ['All Collections', 'Elite Artisans', 'Traditional Atelier', 'Modern Architecture', 'Celebrity Stylists'];

  const filteredBarbers = MOCK_BARBERS.filter(barber => 
    (barber.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     barber.shopName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pb-24 overflow-hidden">
      {/* Cinematic Hero */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-black px-6">
        <video 
          autoPlay loop muted playsInline
          poster="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1600"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-barber-cutting-hair-in-a-barber-shop-10250-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/90" />
        
        <div className="relative z-10 max-w-5xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0.1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="inline-flex items-center space-x-2 text-[#D4AF37] text-[10px] font-bold tracking-[0.5em] uppercase mb-4 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
              <Sparkles className="w-3 h-3" />
              <span>Redefining Excellence</span>
            </span>
            <h1 className="font-serif text-6xl md:text-8xl text-white leading-tight italic">
              Artistry in <br /> 
              <span className="font-luxury not-italic tracking-[0.1em] gold-text">Every Stroke</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
          >
            Discover the world's most exclusive grooming ateliers. Curated for the discerning individual who demands nothing less than perfection.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5" />
              <input 
                type="text"
                placeholder="Find your personal artisan..."
                className="w-full bg-white/10 backdrop-blur-2xl border border-white/20 text-white pl-14 pr-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-all text-sm font-medium placeholder:text-white/40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="gold-gradient text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-2xl hover:brightness-110 transition-all w-full sm:w-auto">
              Explore Atelier
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50"
        >
          <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-white">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </motion.div>
      </section>

      {/* Discovery Section */}
      <section className="max-w-[1440px] mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
          <div className="space-y-4">
            <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.5em]">Curated For You</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">The Artisan Collection</h2>
          </div>
          <div className="flex items-center space-x-4 bg-slate-50 p-2 rounded-2xl border border-slate-100 no-scrollbar overflow-x-auto">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeFilter === filter 
                  ? 'bg-black text-white shadow-xl' 
                  : 'text-slate-400 hover:text-black'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Elite Picks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredBarbers.map((barber, idx) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
            >
              <BarberCard 
                barber={barber} 
                onClick={() => onSelectBarber(barber)}
              />
            </motion.div>
          ))}
        </div>

        {/* Featured Membership CTA */}
        <div className="mt-32 relative rounded-[3rem] overflow-hidden bg-[#0A0A0A] p-12 md:p-24 text-white">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1521446704128-ac36184af5ee?auto=format&fit=crop&q=80&w=800" 
              alt="Elite" 
              className="w-full h-full object-cover grayscale brightness-50"
            />
          </div>
          <div className="relative z-10 max-w-2xl space-y-8">
            <div className="flex items-center space-x-3 text-[#D4AF37]">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Elite Invitation</span>
            </div>
            <h3 className="font-serif text-4xl md:text-6xl italic leading-tight">
              Unlock the <span className="font-luxury not-italic gold-text">Private Circle</span>
            </h3>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              Experience priority booking, seasonal gifting from premium labels, and exclusive invitations to brand launch events.
            </p>
            <button className="bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#D4AF37] transition-all">
              Apply for VIP Status
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
