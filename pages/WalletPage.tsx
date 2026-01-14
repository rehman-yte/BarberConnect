
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, ShieldCheck, Crown, RefreshCcw, DollarSign, History } from 'lucide-react';

const WalletPage: React.FC = () => {
  const transactions = [
    { id: 'tx1', type: 'debit', label: 'Julian Rossi - Royal Shave', date: 'Oct 22', amount: 125.00 },
    { id: 'tx2', type: 'credit', label: 'Account Top-up (Visa)', date: 'Oct 20', amount: 500.00 },
    { id: 'tx3', type: 'debit', label: 'Sarah Kim - Architecture Fade', date: 'Oct 15', amount: 95.00 },
  ];

  return (
    <div className="bg-[#FDFCFB] min-h-screen pt-40 pb-32">
      <div className="max-w-[1440px] mx-auto px-10">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
           <div className="space-y-4">
              <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.5em] flex items-center">
                <Wallet className="w-3 h-3 mr-2" /> Elite Ledger
              </span>
              <h1 className="font-dm text-6xl font-bold italic">Private <span className="not-italic">Vault</span></h1>
           </div>
           <button className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl hover:bg-[#D4AF37] hover:text-black transition-all">
             Secure Refresh
           </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Card */}
          <div className="lg:col-span-8 space-y-12">
             <div className="bg-[#0A0A0A] text-white p-12 md:p-16 rounded-[4rem] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none">
                   <Crown className="w-64 h-64" />
                </div>
                <div className="relative z-10 space-y-12">
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Total Available Balance</span>
                      <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                   </div>
                   <p className="text-7xl md:text-9xl font-luxury gold-text tracking-tighter">$4,820.50</p>
                   <div className="flex flex-col sm:flex-row gap-6">
                      <button className="flex-1 gold-gradient text-black py-5 rounded-2xl font-bold uppercase tracking-widest text-[11px] shadow-xl flex items-center justify-center space-x-2">
                         <ArrowDownLeft className="w-4 h-4" /> <span>Add Funds</span>
                      </button>
                      <button className="flex-1 bg-white/10 border border-white/10 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-white/20 transition-all flex items-center justify-center space-x-2">
                         <ArrowUpRight className="w-4 h-4" /> <span>Withdraw</span>
                      </button>
                   </div>
                </div>
             </div>

             <section className="bg-white p-10 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-10">
                   <div className="flex items-center space-x-3">
                      <History className="text-[#D4AF37] w-5 h-5" />
                      <h2 className="font-serif text-3xl font-bold italic">Transaction History</h2>
                   </div>
                   <button className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-black transition-colors">Export Ledger (PDF)</button>
                </div>
                <div className="space-y-6">
                   {transactions.map(tx => (
                      <div key={tx.id} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-50 group hover:border-[#D4AF37]/20 transition-all">
                         <div className="flex items-center space-x-6">
                            <div className={`p-4 rounded-2xl ${tx.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                               {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                            </div>
                            <div>
                               <h4 className="font-bold text-lg">{tx.label}</h4>
                               <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{tx.date} • Reference ID: {tx.id.toUpperCase()}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className={`text-xl font-luxury ${tx.type === 'credit' ? 'text-emerald-600' : 'text-black'}`}>
                               {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                            </p>
                            <span className="text-[8px] font-bold uppercase tracking-widest text-slate-300">Finalized</span>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>

          {/* Sidebar Stats */}
          <aside className="lg:col-span-4 space-y-8">
             <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
                <h3 className="font-dm text-2xl font-bold italic">Spending Insights</h3>
                <div className="space-y-8">
                   {[
                     { label: 'Grooming Services', val: '$840.00', pct: 85 },
                     { label: 'Artisan Gifting', val: '$120.00', pct: 15 }
                   ].map(item => (
                     <div key={item.label} className="space-y-3">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                           <span>{item.label}</span>
                           <span className="text-[#D4AF37]">{item.val}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${item.pct}%` }}
                             className="h-full bg-[#D4AF37]"
                           />
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex items-center space-x-3 text-[#D4AF37] mb-6">
                   <ShieldCheck className="w-5 h-5" />
                   <h3 className="font-bold text-[10px] uppercase tracking-widest">Secure Payment Methods</h3>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center space-x-4">
                         <div className="w-10 h-6 bg-slate-900 rounded flex items-center justify-center text-[8px] text-white font-bold">VISA</div>
                         <span className="text-xs font-bold tracking-widest">•••• 8291</span>
                      </div>
                      <span className="text-[8px] uppercase tracking-widest font-bold text-[#D4AF37]">Primary</span>
                   </div>
                   <button className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:border-[#D4AF37]/30 hover:text-black transition-all">
                      Add New Method
                   </button>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
