
import React, { useState, useEffect } from 'react';
import { Page, UserRole } from '../types';
import { 
  Scissors, Search, Sparkles, Calendar, User as UserIcon, 
  Menu, X, Crown, ShieldCheck, Briefcase, 
  Instagram, Facebook, Twitter, Mail, Phone, Info, HelpCircle, Wallet 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  setActivePage: (page: Page) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onAccountClick?: () => void;
  isLoggedIn?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage, userRole, setUserRole, onAccountClick, isLoggedIn }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: Page.Home, label: 'Home', icon: <Search className="w-4 h-4" /> },
    { id: Page.Discovery, label: 'Services', icon: <Scissors className="w-4 h-4" /> },
    { id: Page.AIStyle, label: 'Concierge', icon: <Sparkles className="w-4 h-4" /> },
    { id: Page.Bookings, label: 'Reserves', icon: <Calendar className="w-4 h-4" /> },
  ];

  const footerLinks = {
    collections: [
      { id: Page.Discovery, label: 'The Masters Series' },
      { id: Page.Discovery, label: 'Artisanal Shaves' },
      { id: Page.Discovery, label: 'Bespoke Styling' },
    ],
    atelier: [
      { id: Page.About, label: 'About Us' },
      { id: Page.BecomePartner, label: 'Become a Partner' },
      { id: Page.Contact, label: 'Concierge Support' },
      { id: Page.FAQ, label: 'Expert FAQ' },
    ],
    legal: [
      { id: Page.Privacy, label: 'Privacy Path' },
      { id: Page.Terms, label: 'Terms of Service' },
    ]
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#D4AF37]/30 selection:text-black bg-[#FDFCFB]">
      {/* Luxury Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'h-16 glass border-b border-[#D4AF37]/10 shadow-sm' : 'h-24 bg-transparent'
      }`}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-full flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActivePage(Page.Home)}
          >
            <div className="bg-black text-[#D4AF37] p-1.5 rounded-lg transform group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-black/20">
              <Scissors className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-luxury text-base md:text-lg font-bold tracking-[0.25em] uppercase leading-none">BarberConnect</span>
              <span className="text-[8px] md:text-[9px] font-bold tracking-[0.4em] uppercase text-[#D4AF37] mt-1.5 opacity-80">Elite Network</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-10 xl:space-x-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`relative py-1 group flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 ${
                  activePage === item.id ? 'text-black' : 'text-slate-400 hover:text-black'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {activePage === item.id && (
                  <motion.div layoutId="navActive" className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#D4AF37]" />
                )}
              </button>
            ))}
            {!isLoggedIn && (
              <button 
                onClick={() => setActivePage(Page.BecomePartner)}
                className={`relative py-1 group flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 ${
                  activePage === Page.BecomePartner ? 'text-black' : 'text-slate-400 hover:text-black'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Become a Partner</span>
              </button>
            )}
          </div>

          {/* Account Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center bg-white border border-slate-100 rounded-full px-5 py-2 space-x-4 shadow-sm">
              <select 
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="bg-transparent text-[9px] font-bold uppercase tracking-widest focus:outline-none cursor-pointer text-slate-500"
              >
                <option value={UserRole.Customer}>Member</option>
                <option value={UserRole.Professional}>Artisan</option>
                <option value={UserRole.Admin}>Executive</option>
              </select>
              {isLoggedIn && (
                <div className="flex items-center space-x-3 border-l border-slate-100 pl-4">
                  <button onClick={() => setActivePage(Page.Wallet)} className="text-slate-400 hover:text-[#D4AF37] transition-colors"><Wallet className="w-4 h-4" /></button>
                  <button onClick={() => setActivePage(Page.Profile)} className="text-slate-400 hover:text-[#D4AF37] transition-colors"><UserIcon className="w-4 h-4" /></button>
                </div>
              )}
            </div>
            
            <button 
              onClick={onAccountClick}
              className="gold-gradient text-black font-bold px-8 py-3 rounded-full text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#D4AF37]/20"
            >
              {isLoggedIn ? (userRole === UserRole.Professional ? 'Dashboard' : 'My Account') : 'Login / Signup'}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="lg:hidden p-2 text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-white pt-24 px-10 flex flex-col space-y-8 overflow-y-auto"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); setIsMobileMenuOpen(false); }}
                className="text-3xl md:text-4xl font-serif font-bold flex items-center space-x-6 hover:text-[#D4AF37] transition-colors"
              >
                <span className="text-[#D4AF37]">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            
            <button 
              onClick={() => { setActivePage(Page.BecomePartner); setIsMobileMenuOpen(false); }}
              className="text-2xl font-serif font-bold flex items-center space-x-6 text-[#D4AF37]"
            >
              <Briefcase className="w-6 h-6" />
              <span>Become a Partner</span>
            </button>

            <div className="pt-10 border-t border-slate-100 flex flex-col space-y-6">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400">Account Access</span>
              <button 
                onClick={() => { onAccountClick?.(); setIsMobileMenuOpen(false); }}
                className="gold-gradient text-black py-5 rounded-3xl font-bold uppercase tracking-widest text-xs"
              >
                {isLoggedIn ? 'Manage Account' : 'Login / Signup'}
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => { setActivePage(Page.Profile); setIsMobileMenuOpen(false); }} className="flex items-center justify-center space-x-2 bg-slate-50 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <UserIcon className="w-4 h-4" /> <span>Profile</span>
                 </button>
                 <button onClick={() => { setActivePage(Page.Wallet); setIsMobileMenuOpen(false); }} className="flex items-center justify-center space-x-2 bg-slate-50 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <Wallet className="w-4 h-4" /> <span>Wallet</span>
                 </button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-black text-[#D4AF37] p-3 rounded-2xl">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-xl">{isLoggedIn ? 'Luxe Member' : 'Guest Member'}</p>
                  <p className="text-slate-400 text-xs">{isLoggedIn ? 'Access to the Private Circle' : 'Join for full access'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Luxury Footer */}
      <footer className="bg-[#0A0A0A] text-white pt-24 md:pt-32 pb-16 px-6 md:px-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-20 mb-24 md:mb-32">
            <div className="space-y-10">
              <div className="flex items-center space-x-3">
                <div className="bg-[#D4AF37] text-black p-1.5 rounded-lg">
                  <Scissors className="w-5 h-5" />
                </div>
                <span className="font-luxury text-xl tracking-[0.25em] uppercase">BarberConnect</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-light">
                The global benchmark for artisanal grooming. Curating excellence for the discerning modern gentleman.
              </p>
              <div className="flex items-center space-x-6 text-slate-400">
                <a href="#" className="hover:text-[#D4AF37] transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-[#D4AF37] transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="hover:text-[#D4AF37] transition-colors"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h4 className="font-luxury text-[#D4AF37] text-xs tracking-[0.4em] mb-8 md:mb-10 uppercase">Collections</h4>
              <ul className="space-y-4 md:space-y-5 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                {footerLinks.collections.map(link => (
                  <li key={link.label} onClick={() => setActivePage(link.id)} className="hover:text-white transition-colors cursor-pointer flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {link.label}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-luxury text-[#D4AF37] text-xs tracking-[0.4em] mb-8 md:mb-10 uppercase">Atelier</h4>
              <ul className="space-y-4 md:space-y-5 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                {footerLinks.atelier.map(link => (
                  <li key={link.label} onClick={() => setActivePage(link.id)} className="hover:text-white transition-colors cursor-pointer flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {link.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="font-luxury text-[#D4AF37] text-xs tracking-[0.4em] mb-2 uppercase">The Journal</h4>
              <p className="text-slate-500 text-xs italic font-light">Subscribe for exclusive early-access to masterclass bookings.</p>
              <div className="flex relative group">
                <input 
                  type="email" 
                  placeholder="Artisan email..."
                  className="bg-white/5 border border-white/10 rounded-full px-6 md:px-8 py-4 text-xs w-full focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#D4AF37] text-black px-4 md:px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest hover:brightness-110 transition-all">
                  Join
                </button>
              </div>
              <div className="pt-4 space-y-4">
                <div className="flex items-center space-x-3 text-slate-500 text-[10px] uppercase tracking-widest">
                  <Mail className="w-3 h-3 text-[#D4AF37]" /> <span>concierge@barberconnect.luxe</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-500 text-[10px] uppercase tracking-widest">
                  <Phone className="w-3 h-3 text-[#D4AF37]" /> <span>+1 (800) LUXE-ART</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] font-bold uppercase tracking-[0.4em] text-slate-600">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <span>© 2024 BarberConnect Luxe Platform.</span>
              <div className="flex items-center space-x-2 text-slate-700">
                <ShieldCheck className="w-3 h-3" /> <span>Bank-Grade Encryption Enabled</span>
              </div>
            </div>
            <div className="flex space-x-8 md:space-x-12 mt-8 md:mt-0">
              {footerLinks.legal.map(link => (
                <span key={link.label} onClick={() => setActivePage(link.id)} className="hover:text-[#D4AF37] cursor-pointer transition-colors">{link.label}</span>
              ))}
              <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Atelier Rules</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Internal icon for arrows
const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export default Layout;
