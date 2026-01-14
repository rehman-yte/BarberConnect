
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Scale } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const content = type === 'privacy' ? {
    title: 'Privacy Ethos',
    subtitle: 'Confidentiality in Excellence',
    icon: <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />,
    sections: [
      { h: 'Data Sovereignty', p: 'Your personal aesthetics and reservation history are treated as sovereign assets. We employ bank-grade encryption to ensure your data remains your private legacy.' },
      { h: 'Facial Analysis Privacy', p: 'AI processing for facial architecture analysis occurs in volatile memory. No biometric footprints are stored beyond the active concierge session.' },
      { h: 'Communication Protocol', p: 'We only communicate for critical reservation updates and high-tier seasonal gifting. Your digital tranquility is our priority.' }
    ]
  } : {
    title: 'Charter of Service',
    subtitle: 'The Artisan Agreement',
    icon: <Scale className="w-8 h-8 text-[#D4AF37]" />,
    sections: [
      { h: 'The Reservation Bond', p: 'By booking an artisan experience, you enter a mutual commitment of time and respect. Late cancellations affect the artisan\'s legacy and may result in membership review.' },
      { h: 'Conduct in the Atelier', p: 'The BarberConnect network thrives on mutual dignity. Disruption or disrespect within any partner atelier is grounds for permanent exclusion.' },
      { h: 'Financial Integrity', p: 'Our commission structure is transparent. Artisans are paid promptly, and platform fees are reinvested into the excellence of our neural networks.' }
    ]
  };

  return (
    <div className="bg-[#FDFCFB] min-h-screen pt-40 pb-32">
      <div className="max-w-4xl mx-auto px-10">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 space-y-6"
        >
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-3xl shadow-xl mb-6">
            {content.icon}
          </div>
          <h1 className="font-dm text-5xl md:text-7xl font-bold italic leading-tight">{content.title}</h1>
          <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.5em]">{content.subtitle}</p>
        </motion.header>

        <div className="space-y-20">
          {content.sections.map((section, idx) => (
            <motion.section 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group space-y-6"
            >
              <h2 className="font-serif text-3xl font-bold tracking-tight flex items-center">
                <span className="text-[#D4AF37] font-luxury text-sm mr-6">0{idx + 1}</span>
                {section.h}
              </h2>
              <p className="text-slate-500 leading-[1.8] text-lg font-light pl-12 border-l border-slate-100 group-hover:border-[#D4AF37] transition-all duration-500">
                {section.p}
              </p>
            </motion.section>
          ))}
        </div>

        <div className="mt-32 pt-16 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-8">Revision Date: Oct 2024</p>
          <button className="gold-gradient text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-[#D4AF37]/20">
            Acknowledge Charter
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
