import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { GlassCard } from '../components/ui/GlassCard';
import { NeumorphicButton } from '../components/ui/NeumorphicButton';
import { Phone, Hash, ShieldCheck, AlertCircle, Calendar } from 'lucide-react';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [opdNumber, setOpdNumber] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(mobile, opdNumber);
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid credentials. Try 9999999999 / ADMIN');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden bg-[#121212]">
      {/* Background Orbs */}
      <div className="accent-glow top-1/4 right-0 bg-blue-500/10" />
      <div className="accent-glow bottom-0 -left-20 bg-rose-500/10" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <GlassCard className="rounded-[3rem] p-10 border-white/5 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-10">
            <div className="mx-auto w-24 h-24 neumorphic rounded-[2.5rem] flex items-center justify-center text-blue-400 mb-8 transform -rotate-6">
              <ShieldCheck size={48} strokeWidth={1} />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Portal Login</h1>
            <p className="text-slate-500 font-bold mt-2">Enter credentials to access Divyam</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 ml-4 tracking-[0.2em] uppercase">Mobile Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <Phone size={18} strokeWidth={2.5} />
                </div>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="block w-full pl-14 pr-6 py-5 neumorphic-inset rounded-full focus:outline-none transition-all font-bold text-white placeholder-slate-600 border-none bg-transparent"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 ml-4 tracking-[0.2em] uppercase">OPD / Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <Hash size={18} strokeWidth={2.5} />
                </div>
                <input
                  type="password"
                  required
                  value={opdNumber}
                  onChange={(e) => setOpdNumber(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-14 pr-6 py-5 neumorphic-inset rounded-full focus:outline-none transition-all font-bold text-white placeholder-slate-600 border-none bg-transparent"
                />
              </div>
              <p className="text-[10px] font-black text-slate-600 ml-4 tracking-wider uppercase flex items-center gap-2">
                <AlertCircle size={12} />
                Default opd is mobile number
              </p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-400 text-xs font-black uppercase tracking-widest"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}

            <div className="pt-4">
              <NeumorphicButton 
                type="submit" 
                className="w-full py-5 text-xl bg-blue-600 text-white border-none shadow-2xl shadow-blue-900/20"
              >
                Access Dashboard
              </NeumorphicButton>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 text-center px-4">
             <p className="text-xs font-black text-slate-600 uppercase tracking-[0.15em]">Need assistance? <span className="text-slate-400 block mt-1">+91 94139 12974</span></p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
