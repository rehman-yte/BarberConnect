
import React from 'react';
import { Barber } from '../types';
import { Star, ShieldCheck, Crown, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import LuxeImage from './LuxeImage';

interface BarberCardProps {
  barber: Barber;
  onClick: () => void;
}

const BarberCard: React.FC<BarberCardProps> = ({ barber, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-[#D4AF37]/10 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.15)] transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <LuxeImage 
          src={barber.image} 
          alt={barber.name} 
          fallbackType="portrait"
          className="w-full h-full transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* VIP Badges */}
        <div className="absolute top-6 left-6 flex space-x-3">
          {barber.isVIP && (
            <div className="bg-black text-[#D4AF37] p-2.5 rounded-2xl shadow-2xl border border-[#D4AF37]/30">
              <Crown className="w-4 h-4" />
            </div>
          )}
          {barber.isVerified && (
            <div className="bg-white/95 text-blue-600 p-2.5 rounded-2xl shadow-2xl">
              <ShieldCheck className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="absolute bottom-6 left-6">
          <span className="bg-black/40 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase border border-white/20">
            {barber.priceRange} Elite
          </span>
        </div>
      </div>

      <div className="p-8 relative">
        <div className="flex justify-between items-start mb-3">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold group-hover:text-[#D4AF37] transition-colors tracking-tight">{barber.name}</h3>
            <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-bold">{barber.shopName}</p>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
            <span className="text-[11px] font-bold">{barber.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 mt-5">
          {barber.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[9px] font-bold uppercase tracking-widest border border-slate-100 px-3 py-1.5 rounded-lg text-slate-500">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-1">From</span>
            <span className="font-luxury text-xl tracking-wider">${Math.min(...barber.services.map(s => s.price))}</span>
          </div>
          <button className="bg-black text-white p-4 rounded-2xl group-hover:bg-[#D4AF37] group-hover:rotate-45 transition-all duration-500 shadow-xl shadow-black/10">
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BarberCard;
