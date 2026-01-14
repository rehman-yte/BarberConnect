
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Crown, ShieldCheck, Sparkles, Star, Users, ArrowRight, DollarSign } from 'lucide-react';
import LuxeImage from '../components/LuxeImage';

const BecomePartnerPage: React.FC = () => {
  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      {/* Immersive Hero */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-10 overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-40">
           <LuxeImage 
            src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full"
            alt="Artisan Partner"
            fallbackType="salon"
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        <div className="relative z-10 max-w-4xl space-y-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center space-x-3 text-[#D4AF37] text-[10px] font-bold tracking-[0.5em] uppercase mb-8 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
              <Briefcase className="w-4 h-4" />
              <span>For Master Artisans Only</span>
            </span>
            <h1 className="font-dm text-7xl md:text-9xl text-white italic leading-tight">Join the <span className="not-italic gold-text">Circle</span></h1>
            <p className="text-white/60 text-xl font-light tracking-wide max-w-2xl mx-auto mt-8 leading-relaxed">
              Scale your business within the world's most exclusive grooming network. Connect with high-value clients who value precision over price.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex justify-center">
             <button className="gold-gradient text-black px-16 py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:scale-105 transition-all">
                Apply for Partnership
             </button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <div className="max-w-[1440px] mx-auto px-10 -mt-24 pb-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {[
            { icon: <Crown className="w-8 h-8 text-[#D4AF37]" />, title: 'Elite Visibility', desc: 'Featured placement in our curated "Masters Series" for top-tier members.' },
            { icon: <DollarSign className="w-8 h-8 text-[#D4AF37]" />, title: 'Premium Revenue', desc: 'Our partners command 40% higher rates than average local establishments.' },
            { icon: <Users className="w-8 h-8 text-[#D4AF37]" />, title: 'Network Growth', desc: 'Exclusive invitations to networking events with fashion and lifestyle labels.' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl shadow-black/5 space-y-8"
            >
              <div className="bg-slate-50 p-6 rounded-[2.5rem] w-fit">{item.icon}</div>
              <h3 className="font-serif text-3xl font-bold">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed text-lg font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* The Charter Section */}
        <div className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.5em] flex items-center">
              <ShieldCheck className="w-3 h-3 mr-2" /> Our Requirements
            </span>
            <h2 className="font-dm text-5xl font-bold italic">The Artisan Charter</h2>
            <div className="space-y-8">
              {[
                'Minimum 10 years of professional grooming mastery.',
                'Exceptional sanitation and premium tool maintenance.',
                'A signature aesthetic style or specialized technique.',
                'Impeccable hospitality standards and VVIP etiquette.'
              ].map((text, idx) => (
                <div key={idx} className="flex items-start space-x-6 border-b border-slate-50 pb-6">
                   <div className="bg-black text-[#D4AF37] px-3 py-1 rounded-lg text-[10px] font-bold mt-1">0{idx+1}</div>
                   <p className="text-lg font-light text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-[5rem] p-16 border border-slate-100 shadow-inner relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <Sparkles className="w-64 h-64" />
             </div>
             <div className="relative z-10 space-y-10">
                <h3 className="font-serif text-4xl font-bold">Initiate Your Application</h3>
                <p className="text-slate-400 font-light italic text-lg">Your portfolio will be reviewed by our Executive Board within 7 business days.</p>
                <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                   <input className="w-full bg-slate-50 border border-slate-100 py-5 px-8 rounded-3xl focus:outline-none focus:border-[#D4AF37]/50" placeholder="Artisan or Studio Name" />
                   <input className="w-full bg-slate-50 border border-slate-100 py-5 px-8 rounded-3xl focus:outline-none focus:border-[#D4AF37]/50" placeholder="Professional Credentials Link" />
                   <textarea className="w-full bg-slate-50 border border-slate-100 py-5 px-8 rounded-3xl focus:outline-none focus:border-[#D4AF37]/50 resize-none" rows={4} placeholder="Briefly describe your specialization..."></textarea>
                   <button className="w-full bg-black text-white py-6 rounded-3xl font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 group">
                      <span>Begin Formal Assessment</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                   </button>
                </form>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomePartnerPage;
