import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useConfig } from '../contexts/ConfigContext';
import { Stethoscope, LogOut, Menu, UserCircle, ArrowRight } from 'lucide-react';
import { NeumorphicButton } from './ui/NeumorphicButton';
import { motion } from 'motion/react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { config } = useConfig();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050B14]/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-10 py-4 md:py-6 flex items-center justify-between transition-all duration-300">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-teal-400 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
          <Stethoscope className="text-white" size={18} md:size={24} />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-sm md:text-xl font-bold tracking-tight leading-none uppercase text-white">
            Divyam <span className="text-blue-400">Hospital</span>
          </h1>
          <p className="text-[8px] md:text-[10px] text-slate-500 tracking-widest uppercase">Gangashahar, Bikaner</p>
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden lg:flex gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
        {navLinks.map(link => (
          <Link 
            key={link.path} 
            to={link.path}
            className={`hover:text-blue-400 transition-colors relative group py-2 ${
              location.pathname === link.path ? 'text-blue-400' : ''
            }`}
          >
            {link.name}
            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transition-transform origin-left ${
              location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`} />
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="hidden sm:block text-right">
          <p className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">24/7 Response</p>
          <p className="text-xs md:text-sm font-black text-rose-400 leading-none">{config.emergencyPhone}</p>
        </div>

        {user ? (
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <NeumorphicButton className="px-4 py-2 text-[8px] md:text-[9px]">Dashboard</NeumorphicButton>
            </Link>
            <button 
              onClick={logout} 
              className="p-2 glass rounded-lg text-slate-400 hover:text-rose-400 transition-all border-white/5 md:hidden"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <Link to="/login">
            <NeumorphicButton className="px-4 py-2 md:px-6 md:py-2.5 text-[8px] md:text-[9px] relative overflow-hidden group">
              <span className="relative z-10">Emergency Portal</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </NeumorphicButton>
          </Link>
        )}

        <button className="p-2 text-slate-400 hover:text-white transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <LogOut size={20} className="rotate-45" /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-[72px] md:top-[88px] left-0 w-full glass-heavy p-8 space-y-6 shadow-2xl backdrop-blur-3xl border-b border-white/10"
        >
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={() => setIsMenuOpen(false)}
              className="block text-xl font-black text-white hover:text-blue-400 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span>{link.name}</span>
                <ArrowRight size={16} className="text-slate-600" />
              </div>
            </Link>
          ))}
          {!user && (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block pt-6 border-t border-white/10">
              <NeumorphicButton className="w-full py-4 text-[10px] uppercase tracking-widest">Portal Access</NeumorphicButton>
            </Link>
          )}
        </motion.div>
      )}
    </nav>
  );
}
