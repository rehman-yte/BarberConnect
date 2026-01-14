
import React, { useState, useEffect } from 'react';
import { Barber, Service } from '../types';
import { 
  ChevronLeft, Star, Clock, MapPin, 
  Share2, Heart, CheckCircle2, ShieldCheck, 
  ArrowRight, Crown, Sparkles, MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BarberDetailsPageProps {
  barber: Barber;
  onBack: () => void;
  onBook: (service: Service) => void;
}

const BarberDetailsPage: React.FC<BarberDetailsPageProps> = ({ barber, onBack, onBook }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState<'About' | 'Portfolio' | 'Reviews'>('About');

  // Staggered animation variants
  const containerVars = {
    animate: { transition: { staggerChildren: 0.1 } }
  };
  const itemVars = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      {/* Immersive Brand Header */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img 
          src={barber.image} 
          alt={barber.name} 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCFB] via-transparent to-black/40" />
        
        {/* Nav Overlays */}
        <div className="absolute top-8 left-8">
          <button 
            onClick={onBack}
            className="flex items-center space-x-3 text-white/80 hover:text-white glass px-6 py-3 rounded-full transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-[10px] uppercase tracking-widest">Return to Discovery</span>
          </button>
        </div>

        <div className="absolute bottom-20 left-8 right-8 max-w-[1440px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4">
              {barber.isVIP && (
                <span className="bg-[#D4AF37] text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] flex items-center shadow-lg">
                  <Crown className="w-3 h-3 mr-2" />
                  Luxe Partner
                </span>
              )}
              {barber.isVerified && (
                <span className="glass text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-2 text-blue-600" />
                  Certified Artisan
                </span>
              )}
            </div>
            <h1 className="font-dm text-7xl md:text-9xl text-[#0A0A0A] tracking-tighter italic">
              {barber.name.split(' ')[0]} <span className="not-italic text-black">{barber.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <div className="flex items-center space-x-8 text-[#0A0A0A]/60">
              <p className="font-luxury text-xl tracking-[0.2em]">{barber.shopName}</p>
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="font-bold text-lg">{barber.rating}</span>
                <span className="text-sm font-medium">({barber.reviewCount} testimonials)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Experience Grid */}
      <div className="max-w-[1440px] mx-auto px-8 py-24 grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* Left Column: Brand Story & Portfolio */}
        <div className="lg:col-span-7 space-y-24">
          
          {/* Navigation Tabs */}
          <div className="flex space-x-12 border-b border-slate-100">
            {['About', 'Portfolio', 'Reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-6 text-xs font-bold uppercase tracking-[0.3em] transition-all relative ${
                  activeTab === tab ? 'text-black' : 'text-slate-400 hover:text-black'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === 'About' && (
                <div className="space-y-12">
                  <div className="prose prose-xl">
                    <h2 className="font-dm text-4xl font-bold mb-8 italic">The Ethos</h2>
                    <p className="text-slate-500 leading-relaxed text-lg font-light">
                      {barber.bio}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-2">
                      <span className="block text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Legacy</span>
                      <p className="text-3xl font-luxury">15+ Years</p>
                      <p className="text-xs text-slate-400">Mastering the craft across continents.</p>
                    </div>
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-2">
                      <span className="block text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Volume</span>
                      <p className="text-3xl font-luxury">4k+ Artisanal Cuts</p>
                      <p className="text-xs text-slate-400">Trusted by professionals and dignitaries.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Portfolio' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {barber.portfolio.length > 0 ? (
                    barber.portfolio.map((item, idx) => (
                      <motion.div 
                        key={item.id} 
                        whileHover={{ scale: 0.98 }}
                        className="aspect-square rounded-[2rem] overflow-hidden bg-slate-100 shadow-lg"
                      >
                        <img src={item.url} className="w-full h-full object-cover" alt="Portfolio" />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-3 py-24 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
                      <Sparkles className="w-12 h-12 text-[#D4AF37]/30 mx-auto mb-4" />
                      <p className="text-slate-400 italic">Portfolio curated for private viewings.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div className="space-y-8">
                   {barber.reviews.map(review => (
                    <div key={review.id} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-slate-900 text-[#D4AF37] flex items-center justify-center font-bold">
                            {review.userName[0]}
                          </div>
                          <div>
                            <p className="font-bold text-lg">{review.userName}</p>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Verified Client • {review.date}</p>
                          </div>
                        </div>
                        <div className="flex text-[#D4AF37]">
                          {Array.from({ length: review.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                        </div>
                      </div>
                      <p className="text-slate-500 font-light italic leading-relaxed text-lg">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Reservation Suite */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[4rem] p-12 border border-[#D4AF37]/20 shadow-[0_40px_100px_-30px_rgba(212,175,55,0.15)] sticky top-32">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-dm text-3xl font-bold italic">Reserve Experience</h2>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <MessageCircle className="w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div className="space-y-6 mb-12">
              {barber.services.map(service => (
                <div 
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`group relative p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer ${
                    selectedService?.id === service.id 
                    ? 'border-black bg-slate-50 shadow-inner' 
                    : 'border-slate-50 hover:border-[#D4AF37]/30'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-bold text-xl">{service.name}</h3>
                      <div className="flex items-center text-slate-400 text-[10px] font-bold uppercase tracking-widest space-x-4">
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {service.duration} MIN</span>
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-emerald-500">Available</span>
                      </div>
                    </div>
                    <span className="font-luxury text-2xl tracking-wider">${service.price}</span>
                  </div>
                  {selectedService?.id === service.id && (
                    <motion.div layoutId="check" className="absolute -top-3 -right-3 bg-[#D4AF37] text-white p-2 rounded-full border-4 border-[#FDFCFB]">
                      <CheckCircle2 className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <button 
              disabled={!selectedService}
              onClick={() => selectedService && onBook(selectedService)}
              className={`w-full py-6 rounded-full font-bold uppercase tracking-[0.2em] text-sm shadow-2xl transition-all flex items-center justify-center space-x-3 group ${
                selectedService 
                ? 'gold-gradient text-black hover:brightness-110' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Finalize Reservation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-8 flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 mr-2" />
              Secure Checkout • No Prepayment Required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarberDetailsPage;
