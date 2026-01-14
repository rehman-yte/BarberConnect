
import React from 'react';
import { motion } from 'framer-motion';
import { Info, Mail, Phone, MapPin, HelpCircle, ArrowRight, ShieldCheck, Sparkles, Scissors, User } from 'lucide-react';
import LuxeImage from '../components/LuxeImage';

/**
 * LUXE ABOUT PAGE
 */
export const AboutPage: React.FC = () => (
  <div className="bg-[#FDFCFB] min-h-screen pt-40 pb-32">
    <div className="max-w-5xl mx-auto px-10">
      <motion.header 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-32 space-y-8"
      >
        <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.5em] flex items-center justify-center">
          <Sparkles className="w-3 h-3 mr-2" /> Our Legacy
        </span>
        <h1 className="font-dm text-6xl md:text-8xl font-bold italic">The Art of <span className="not-italic">Elevation</span></h1>
        <p className="text-slate-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Founded on the principle that grooming is the ultimate form of self-respect, BarberConnect Luxe curates only the top 1% of artisans globally.
        </p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-40">
        <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative">
          <LuxeImage src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200" alt="Legacy" className="w-full h-full" fallbackType="salon" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <p className="font-luxury text-2xl mb-2 italic">Est. 2018</p>
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-70">A global standard in excellence</p>
          </div>
        </div>
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="font-dm text-4xl font-bold">A Global Atelier</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-light">
              We bridge the gap between traditional craftsmanship and modern intelligence. Our network spans from the historic barbershops of London to the avant-garde styling studios of Tokyo.
            </p>
          </div>
          <div className="space-y-8">
            {[
              { title: 'Artisanal Integrity', desc: 'Every barber is personally vetted for technical mastery and hospitality excellence.' },
              { title: 'Neural Curation', desc: 'Our AI concierge understands the nuance of facial architecture like no human can.' },
              { title: 'Discreet Service', desc: 'A sanctuary for high-profile individuals requiring the utmost confidentiality.' }
            ].map(pillar => (
              <div key={pillar.title} className="flex space-x-6 group">
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm group-hover:border-[#D4AF37] transition-colors h-fit">
                   <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="space-y-2">
                   <h4 className="font-bold text-[10px] uppercase tracking-widest">{pillar.title}</h4>
                   <p className="text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * LUXE CONTACT PAGE
 */
export const ContactPage: React.FC = () => (
  <div className="bg-[#FDFCFB] min-h-screen pt-40 pb-32">
    <div className="max-w-[1440px] mx-auto px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-16"
        >
          <div className="space-y-6">
            <h1 className="font-dm text-6xl font-bold italic">Concierge <br /><span className="not-italic">Connection</span></h1>
            <p className="text-slate-400 text-lg font-light leading-relaxed max-w-md">
              Our executive support team is available 24/7 to manage your private reservations and partnership inquiries.
            </p>
          </div>
          
          <div className="space-y-10">
            <div className="flex items-center space-x-8 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
               <div className="bg-black text-[#D4AF37] p-5 rounded-2xl"><Mail className="w-6 h-6" /></div>
               <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">Direct Email</p>
                 <p className="text-xl font-medium tracking-tight">concierge@barberconnect.luxe</p>
               </div>
            </div>
            <div className="flex items-center space-x-8 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
               <div className="bg-black text-[#D4AF37] p-5 rounded-2xl"><Phone className="w-6 h-6" /></div>
               <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">Elite Line</p>
                 <p className="text-xl font-medium tracking-tight">+1 (800) LUXE-ART</p>
               </div>
            </div>
            <div className="flex items-center space-x-8 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
               <div className="bg-black text-[#D4AF37] p-5 rounded-2xl"><MapPin className="w-6 h-6" /></div>
               <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">Corporate HQ</p>
                 <p className="text-xl font-medium tracking-tight">Madison Ave, New York</p>
               </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[4rem] p-12 md:p-16 border border-[#D4AF37]/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]"
        >
          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-3">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                 <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-[#D4AF37]/50" />
               </div>
               <div className="space-y-3">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Account Tier</label>
                 <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-[#D4AF37]/50">
                    <option>Luxe Member</option>
                    <option>Artisan Partner</option>
                    <option>General Inquiry</option>
                 </select>
               </div>
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Message</label>
               <textarea rows={6} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-6 px-8 focus:outline-none focus:border-[#D4AF37]/50 resize-none" placeholder="How may we serve you?"></textarea>
            </div>
            <button className="w-full gold-gradient text-black py-6 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-[#D4AF37]/20 hover:scale-[1.01] transition-all">
              Dispatch Inquiry
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  </div>
);

/**
 * LUXE FAQ PAGE
 */
export const FAQPage: React.FC = () => (
  <div className="bg-[#FDFCFB] min-h-screen pt-40 pb-32">
    <div className="max-w-4xl mx-auto px-10">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24 space-y-6"
      >
        <div className="inline-flex items-center justify-center p-4 bg-white rounded-3xl shadow-xl mb-6">
          <HelpCircle className="w-8 h-8 text-[#D4AF37]" />
        </div>
        <h1 className="font-dm text-5xl md:text-7xl font-bold italic leading-tight">Expert <span className="not-italic">Guidance</span></h1>
        <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.5em]">Intel for the Discerning Member</p>
      </motion.header>

      <div className="space-y-8">
        {[
          { q: 'How does the vetting process for artisans work?', a: 'Every artisan undergoes a rigorous 12-point evaluation including technical proficiency, sanitation standards, and hospitality depth. Only the top 1% receive a verification badge.' },
          { q: 'Is my data private during AI Concierge analysis?', a: 'Absolutely. All facial architecture processing occurs in volatile memory and is never permanently stored on our servers. Your biometric footprint is your own.' },
          { q: 'What are the benefits of Elite Membership?', a: 'Members gain access to priority booking during peak seasons, seasonal gifting from high-end labels, and exclusive invitations to "Art of Grooming" masterclasses.' },
          { q: 'How do I become a verified artisan partner?', a: 'Artisans must submit a comprehensive portfolio and professional credentials via the "Become a Partner" portal. If selected, an in-person assessment will follow.' }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="group bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-all"
          >
             <h3 className="font-bold text-xl mb-4 flex items-start">
               <span className="text-[#D4AF37] font-luxury mr-6 mt-1 text-sm">0{idx+1}</span>
               {item.q}
             </h3>
             <p className="text-slate-500 font-light leading-relaxed pl-12 text-lg italic border-l border-slate-50 group-hover:border-[#D4AF37] transition-colors">
               {item.a}
             </p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * LUXE 404 PAGE
 */
export const NotFoundPage: React.FC<{ onHome: () => void }> = ({ onHome }) => (
  <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center text-center px-10">
    <div className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 border border-white/10 p-12 rounded-[4rem] backdrop-blur-3xl inline-block"
      >
        <h1 className="font-luxury text-9xl gold-text mb-4">404</h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/40">Pathway Not Found</p>
      </motion.div>
      <div className="space-y-6">
        <h2 className="font-serif text-3xl text-white italic">The Atelier you seek has moved</h2>
        <p className="text-slate-500 text-lg font-light max-w-md mx-auto">
          It seems you've wandered into an unmapped part of our network. Let us return you to the main hall.
        </p>
      </div>
      <button 
        onClick={onHome}
        className="gold-gradient text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] shadow-2xl hover:scale-105 transition-all"
      >
        Return to Home
      </button>
    </div>
  </div>
);
