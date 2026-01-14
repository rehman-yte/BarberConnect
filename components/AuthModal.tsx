
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Scissors, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, role: UserRole) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<UserRole>(UserRole.Customer);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email || 'member@luxe.com', role);
    onClose();
  };

  // Fixed: Moved AnimatePresence to wrap the conditional content for correct exit animations.
  // This approach also fixes potential structural errors (e.g., line 127) by ensuring 
  // the entire modal group is contained within a single conditional block.
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Overlay with exit animation */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            onClick={onClose} 
          />
          
          {/* Modal Container with exit animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-[#FDFCFB] w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl border border-[#D4AF37]/20"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 text-slate-400 hover:text-black transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-10 md:p-12">
              <div className="flex justify-center mb-8">
                <div className="bg-black text-[#D4AF37] p-3 rounded-2xl shadow-xl">
                  <Scissors className="w-8 h-8" />
                </div>
              </div>

              <h2 className="font-dm text-3xl font-bold italic text-center mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Join the Circle'}
              </h2>
              <p className="text-slate-400 text-center text-xs font-bold uppercase tracking-widest mb-10">
                {mode === 'login' ? 'Access your private reservations' : 'Enter the elite grooming network'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100 mb-6">
                  <button
                    type="button"
                    onClick={() => setRole(UserRole.Customer)}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${
                      role === UserRole.Customer ? 'bg-black text-white shadow-lg' : 'text-slate-400'
                    }`}
                  >
                    Member
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole(UserRole.Professional)}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${
                      role === UserRole.Professional ? 'bg-black text-white shadow-lg' : 'text-slate-400'
                    }`}
                  >
                    Artisan
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="email" 
                      placeholder="Email Address"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-[#D4AF37]/50 transition-all text-sm font-medium"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="password" 
                      placeholder="Password"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-[#D4AF37]/50 transition-all text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full gold-gradient text-black py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-[#D4AF37]/20 hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                >
                  <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-10 text-center">
                <button 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] hover:underline"
                >
                  {mode === 'login' ? "Don't have an account? Join" : "Already a member? Sign in"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
