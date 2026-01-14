
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Users, Calendar, DollarSign, 
  ArrowUpRight, CheckCircle2, MoreVertical, 
  Upload, Image as ImageIcon, Plus, Trash2, 
  Eye, Wallet, ArrowRightLeft, ShieldCheck
} from 'lucide-react';
import { imageService, CloudImage } from '../services/imageService';

const ProfessionalDashboard: React.FC = () => {
  const [gallery, setGallery] = useState<CloudImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setGallery(imageService.getGallery());
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploaded = await imageService.upload(file);
      setGallery(prev => [uploaded, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const stats = [
    { label: 'Revenue (MTD)', value: '$14,820', change: '+18.5%', icon: <DollarSign className="w-5 h-5" />, color: 'bg-emerald-500' },
    { label: 'Elite Clients', value: '52', change: '+8', icon: <Users className="w-5 h-5" />, color: 'bg-[#D4AF37]' },
    { label: 'Scheduled Hours', value: '142h', change: '-2%', icon: <Calendar className="w-5 h-5" />, color: 'bg-blue-500' },
    { label: 'Loyalty Score', value: '99.1', change: '+0.9', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-purple-500' },
  ];

  return (
    <div className="bg-[#FDFCFB] min-h-screen pb-24">
      <div className="max-w-[1440px] mx-auto px-8 py-12 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.5em] flex items-center">
              <ShieldCheck className="w-3 h-3 mr-2" />
              Verified Master Artisan
            </span>
            <h1 className="font-dm text-5xl font-bold tracking-tight italic">
              Welcome Back, <span className="not-italic">Julian</span>
            </h1>
          </div>
          <div className="flex space-x-4">
            <button className="bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:border-black transition-all">
              Manage Atelier
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="gold-gradient text-black text-[10px] font-bold uppercase tracking-widest px-10 py-4 rounded-full hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Update Portfolio
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleUpload}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">{stat.label}</h4>
              <p className="text-4xl font-luxury tracking-wider">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content: Portfolio & Bookings */}
          <div className="lg:col-span-8 space-y-12">
            {/* Portfolio Section */}
            <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center space-x-3">
                  <ImageIcon className="text-[#D4AF37]" />
                  <h2 className="font-dm text-2xl font-bold italic">Brand Visuals</h2>
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] hover:underline flex items-center"
                >
                  <Upload className="w-3 h-3 mr-2" />
                  Upload New
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <AnimatePresence>
                  {isUploading && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="aspect-square rounded-3xl skeleton border-2 border-dashed border-[#D4AF37]/30 flex items-center justify-center"
                    >
                      <ImageIcon className="w-8 h-8 text-slate-300 animate-pulse" />
                    </motion.div>
                  )}
                  {gallery.map((img) => (
                    <motion.div 
                      key={img.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group relative aspect-square rounded-[2rem] overflow-hidden bg-slate-100"
                    >
                      <img src={img.url} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                        <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-xl">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-3 bg-red-600 text-white rounded-full hover:scale-110 transition-transform shadow-xl">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  {gallery.length === 0 && !isUploading && (
                    <div className="col-span-3 py-20 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                      <ImageIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-400 font-medium italic">No custom visuals uploaded yet.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* Bookings Section */}
            <section className="bg-[#0A0A0A] text-white rounded-[3rem] p-10 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent pointer-events-none" />
              <div className="flex justify-between items-center mb-10 relative z-10">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-[#D4AF37]" />
                  <h2 className="font-dm text-2xl font-bold italic">Today's Ledger</h2>
                </div>
                <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                  <button className="px-4 py-1 text-[10px] font-bold uppercase tracking-widest bg-[#D4AF37] text-black rounded-full">List</button>
                  <button className="px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white/50">Calendar</button>
                </div>
              </div>
              
              <div className="space-y-4 relative z-10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all cursor-pointer group">
                    <div className="flex items-center space-x-6">
                      <div className="w-14 h-14 bg-[#D4AF37] text-black rounded-2xl flex items-center justify-center font-luxury text-xl font-bold">
                        {['A', 'M', 'H'][i-1]}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{['Alexander Sterling', 'Marcus Aurelius', 'Harrison Ford'][i-1]}</h4>
                        <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Bespoke Diamond Cut • 10:30 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <span className="block font-luxury text-xl">$125</span>
                        <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">Confirmed</span>
                      </div>
                      <button className="p-3 text-white/20 hover:text-white transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar: Financials & Analytics */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl overflow-hidden relative">
              <div className="flex items-center space-x-3 mb-10">
                <Wallet className="text-[#D4AF37]" />
                <h3 className="font-dm text-2xl font-bold italic">Luxe Wallet</h3>
              </div>
              
              <div className="space-y-10">
                <div>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">Available for payout</span>
                  <p className="text-5xl font-luxury tracking-widest">$9,240.50</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-6 rounded-[2rem]">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block mb-1">In Escrow</span>
                    <span className="font-luxury text-lg">$2,140</span>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-[2rem]">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block mb-1">Tips MTD</span>
                    <span className="font-luxury text-lg">$850</span>
                  </div>
                </div>

                <button className="w-full gold-gradient text-black py-5 rounded-[1.5rem] font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-[#D4AF37]/30 hover:brightness-110 transition-all flex items-center justify-center">
                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                  Initiate Payout
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
              <h3 className="font-dm text-xl font-bold italic mb-8">Performance Insights</h3>
              <div className="space-y-8">
                {[
                  { label: 'Booking Rate', val: '94%', color: 'bg-emerald-500' },
                  { label: 'Avg Ticket', val: '$115', color: 'bg-[#D4AF37]' },
                  { label: 'Rebooking', val: '78%', color: 'bg-blue-500' }
                ].map(item => (
                  <div key={item.label} className="space-y-3">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span>{item.label}</span>
                      <span className="text-[#D4AF37]">{item.val}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: item.val }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
