
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Shield, Star, DollarSign, ArrowUp, ArrowDown, Search, Filter } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const marketplaceStats = [
    { label: 'Total GMV', value: '$842,500', change: '+24%', isUp: true },
    { label: 'Platform Rev', value: '$126,375', change: '+18%', isUp: true },
    { label: 'Active Salons', value: '312', change: '-2%', isUp: false },
    { label: 'VIP Requests', value: '24', change: 'New', isUp: true },
  ];

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white p-8 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div className="space-y-2">
            <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.5em]">Executive Control</span>
            <h1 className="font-serif text-5xl font-bold tracking-tight italic">Global Overview</h1>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-4">
            <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
              Broadcast Message
            </button>
            <button className="gold-gradient text-black px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest">
              Financial Audit
            </button>
          </div>
        </div>

        {/* Executive Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {marketplaceStats.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="dark-glass p-8 rounded-[2rem] border border-white/5"
            >
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-4">{stat.label}</h4>
              <div className="flex items-end space-x-4">
                <p className="text-3xl font-luxury tracking-widest">{stat.value}</p>
                <div className={`flex items-center text-[10px] font-bold mb-1 ${stat.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.isUp ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                  {stat.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Approval Queue */}
          <div className="lg:col-span-8 dark-glass rounded-[2.5rem] p-10 border border-white/5">
            <div className="flex justify-between items-center mb-10">
              <h2 className="font-serif text-2xl font-bold italic">Professional Verification Queue</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#D4AF37]/50" placeholder="Search professionals..." />
                </div>
                <button className="p-2 bg-white/5 rounded-lg border border-white/10"><Filter className="w-4 h-4" /></button>
              </div>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-white/5">
                  <th className="pb-6">Professional / Studio</th>
                  <th className="pb-6">Specialization</th>
                  <th className="pb-6">Requested Status</th>
                  <th className="pb-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="group border-b border-white/5">
                  <td className="py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold">L</div>
                      <div>
                        <p className="font-bold">Lorenzo Di Vico</p>
                        <p className="text-xs text-slate-500">Milan, Italy</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 italic font-light">Italian Bespoke Cut</td>
                  <td className="py-6">
                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest">VIP Partner</span>
                  </td>
                  <td className="py-6 text-right space-x-4">
                    <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors">Review Docs</button>
                    <button className="text-xs font-bold text-[#D4AF37] hover:underline">Approve</button>
                  </td>
                </tr>
                <tr className="group border-b border-white/5">
                  <td className="py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">K</div>
                      <div>
                        <p className="font-bold">Kenji Yamamoto</p>
                        <p className="text-xs text-slate-500">Ginza, Tokyo</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 italic font-light">Zero-Gap Artistry</td>
                  <td className="py-6">
                    <span className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest">Diamond Class</span>
                  </td>
                  <td className="py-6 text-right space-x-4">
                    <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors">Review Docs</button>
                    <button className="text-xs font-bold text-[#D4AF37] hover:underline">Approve</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quick Controls */}
          <div className="lg:col-span-4 space-y-8">
            <div className="dark-glass rounded-[2.5rem] p-8 border border-white/5">
              <h3 className="font-serif text-xl font-bold italic mb-6">Commission Structure</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Standard Tier</span>
                    <p className="font-luxury text-xl">15%</p>
                  </div>
                  <button className="text-[8px] font-bold uppercase text-[#D4AF37] underline">Edit</button>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/20">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">VIP Elite Tier</span>
                    <p className="font-luxury text-xl">10%</p>
                  </div>
                  <button className="text-[8px] font-bold uppercase text-[#D4AF37] underline">Edit</button>
                </div>
              </div>
            </div>
            
            <div className="bg-red-950/20 rounded-[2.5rem] p-8 border border-red-500/20">
              <div className="flex items-center space-x-3 text-red-500 mb-4">
                <Shield className="w-5 h-5" />
                <h3 className="font-bold text-sm uppercase tracking-widest">Safety & Compliance</h3>
              </div>
              <p className="text-xs text-slate-500 mb-6">There are 3 unresolved disputes and 1 pending background check flagging.</p>
              <button className="w-full py-3 bg-red-600/10 text-red-500 border border-red-500/30 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                Access Security Vault
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
