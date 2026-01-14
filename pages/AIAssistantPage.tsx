
import React, { useState, useRef } from 'react';
import { getStyleRecommendation } from '../services/geminiService';
import { apiService } from '../services/apiService';
import { Camera, Send, Sparkles, User, RefreshCw, X, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LuxeImage from '../components/LuxeImage';

const AIAssistantPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt && !image) return;

    setLoading(true);
    setRecommendation('');

    const base64 = image ? image.split(',')[1] : undefined;
    
    // Guardian API Call: Self-healing with fallback
    const response = await apiService.execute(
      () => getStyleRecommendation(prompt || "Curate a luxury aesthetic recommendation", base64),
      "The concierge is currently refining its wisdom. Please try again in a moment for a curated response.",
      'ai_stylist_recommendation'
    );
    
    setRecommendation(response.data || "");
    setLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      {/* Cinematic Intro */}
      <section className="relative h-[45vh] bg-black overflow-hidden flex items-center justify-center text-center px-10">
        <div className="absolute inset-0 opacity-40">
           <LuxeImage 
            src="https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full"
            alt="AI Bg"
            fallbackType="cut"
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 space-y-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center space-x-3 text-[#D4AF37] text-[10px] font-bold tracking-[0.5em] uppercase mb-6 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
              <Sparkles className="w-3 h-3" />
              <span>Intelligence Met Excellence</span>
            </span>
            <h1 className="font-dm text-6xl md:text-8xl text-white italic leading-tight">Style <span className="not-italic gold-text">Concierge</span></h1>
            <p className="text-white/60 text-lg font-light tracking-wide max-w-2xl mx-auto mt-6">
              Our proprietary neural network analyzes facial architecture to provide unparalleled grooming recommendations.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-10 -mt-24 pb-32 relative z-20">
        <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.15)] border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
              {/* Visual Reference Upload */}
              <div className="md:col-span-5 space-y-6">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] block ml-4">Visual Reference</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative aspect-[3/4] rounded-[3rem] border-2 border-dashed transition-all duration-500 cursor-pointer group flex flex-col items-center justify-center overflow-hidden ${
                    image ? 'border-solid border-[#D4AF37]/30' : 'border-slate-100 hover:border-[#D4AF37]/50 bg-slate-50'
                  }`}
                >
                  {image ? (
                    <>
                      <img src={image} alt="Ref" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <X className="w-10 h-10 text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                        <Camera className="w-8 h-8 text-[#D4AF37]" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Capture Essence</p>
                    </>
                  )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                <p className="text-[10px] text-slate-400 italic text-center px-4 leading-relaxed font-medium">
                  Face shape and bone structure are analyzed locally for privacy before concierge synthesis.
                </p>
              </div>

              {/* Aesthetic Description */}
              <div className="md:col-span-7 space-y-6">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] block ml-4">Aesthetic Ambition</label>
                <textarea 
                  className="w-full h-[320px] bg-slate-50 border border-slate-100 rounded-[3rem] p-12 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all text-2xl font-light placeholder:text-slate-300 resize-none leading-relaxed"
                  placeholder="Describe the aesthetic you project. Professional, daring, timeless, or avant-garde..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading || (!prompt && !image)}
              className={`w-full py-7 rounded-full font-bold uppercase tracking-[0.3em] text-sm shadow-2xl transition-all flex items-center justify-center space-x-5 group ${
                loading || (!prompt && !image) 
                ? 'bg-slate-100 text-slate-300' 
                : 'bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:scale-[1.02]'
              }`}
            >
              {loading ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
              <span>{loading ? 'Synthesizing Wisdom...' : 'Curate My Aesthetic'}</span>
            </button>
          </form>

          {/* AI Result */}
          <AnimatePresence>
            {recommendation && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="mt-24 p-12 md:p-16 bg-[#FDFCFB] rounded-[4rem] border border-[#D4AF37]/10 relative overflow-hidden shadow-inner"
              >
                <div className="absolute top-0 right-0 p-12 text-[#D4AF37]/5 pointer-events-none">
                  <Sparkles className="w-48 h-48" />
                </div>
                <div className="flex items-center space-x-4 mb-10 text-[#D4AF37]">
                  <ShieldCheck className="w-6 h-6" />
                  <h3 className="font-dm text-3xl font-bold italic">Concierge Recommendation</h3>
                </div>
                <div className="text-slate-600 leading-[1.8] text-2xl font-light whitespace-pre-wrap relative z-10 prose prose-luxury">
                  {recommendation}
                </div>
                <div className="mt-16 flex justify-end">
                   <button 
                    onClick={() => { setRecommendation(''); setPrompt(''); setImage(null); }}
                    className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em] hover:underline"
                   >
                    Initiate New Consultation
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Brand Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-24">
          {[
            { title: 'Facial Geometry', desc: 'Precise analysis of bone structure and symmetry.', icon: <User className="text-[#D4AF37]" /> },
            { title: 'Global Trends', desc: 'Real-time synchronization with high-fashion ateliers.', icon: <Sparkles className="text-[#D4AF37]" /> },
            { title: 'Artisan Fit', desc: 'Matching styles with verified master barbers.', icon: <CheckCircle2 className="text-[#D4AF37]" /> }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[3rem] border border-slate-100 flex items-start space-x-8 shadow-sm hover:shadow-md transition-shadow">
               <div className="bg-slate-50 p-5 rounded-2xl">{item.icon}</div>
               <div className="space-y-2">
                 <h4 className="font-bold uppercase text-[10px] tracking-[0.2em]">{item.title}</h4>
                 <p className="text-xs text-slate-400 font-light leading-relaxed">{item.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
