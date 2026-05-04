import React from 'react';
import { motion } from 'motion/react';
import { DOCTORS } from '../constants';
import { GlassCard } from '../components/ui/GlassCard';
import { NeumorphicButton } from '../components/ui/NeumorphicButton';
import { Clock, Calendar, Phone, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Doctors() {
  return (
    <div className="min-h-screen bg-[#121212] pb-24 font-sans leading-relaxed">
      {/* Dynamic Header */}
      <div className="bg-[#1a1a1a] py-32 px-6 relative overflow-hidden border-b border-white/5">
        <div className="accent-glow top-0 right-0 bg-blue-600/10" />
        <div className="accent-glow bottom-0 left-0 bg-rose-500/10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl font-black text-white mb-6 tracking-tight"
          >
            Our Medical Experts
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-2xl font-bold">
            Highly qualified specialists with decades of experience in pediatric care, dentistry, and multi-specialty medicine.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16">
        <div className="grid grid-cols-1 gap-12">
          {DOCTORS.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-10 md:p-14 border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-slate-500/10 flex gap-1 items-center font-black text-6xl select-none -z-0">
                  <Star size={100} fill="currentColor" stroke="none" />
                </div>

                <div className="flex flex-col lg:flex-row gap-16 items-start relative z-10">
                  {/* Avatar Neumorphic */}
                  <div className="w-full lg:w-72 h-72 neumorphic rounded-[3rem] flex-shrink-0 flex items-center justify-center text-blue-400 shadow-2xl relative">
                    <Award size={100} strokeWidth={1} />
                    <div className="absolute -bottom-4 -right-4 p-4 glass rounded-2xl text-blue-400">
                       <Star size={32} fill="currentColor" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-10 w-full">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                         <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 text-[10px] font-black rounded-full uppercase tracking-[0.2em] border border-blue-500/10">{doctor.specialty}</span>
                         <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-full uppercase tracking-[0.2em] border border-emerald-500/10">Active</span>
                      </div>
                      <h2 className="text-5xl font-black text-white tracking-tight">{doctor.name}</h2>
                      <p className="text-lg font-bold text-slate-500 flex items-center gap-3">
                        <span className="text-blue-400">Senior Consultant</span>
                        <span className="block w-1.5 h-1.5 rounded-full bg-slate-700" />
                        {doctor.experience} experience
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-white/5">
                      <div className="space-y-6">
                        <div className="flex items-center gap-5">
                          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl shadow-inner">
                            <Clock size={20} strokeWidth={2.5} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Standard Hours</p>
                            <p className="text-sm font-black text-slate-300">{doctor.timing}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-5">
                          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl shadow-inner">
                            <Calendar size={20} strokeWidth={2.5} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Holiday / Sunday</p>
                            <p className="text-sm font-black text-slate-300">{doctor.sundayTiming}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-center gap-5">
                          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl shadow-inner">
                            <Phone size={20} strokeWidth={2.5} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Direct Console</p>
                            <p className="text-sm font-black text-slate-300">{doctor.mobile}</p>
                          </div>
                        </div>
                        <div className="pt-2">
                           <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Book Fee</p>
                           <p className="text-4xl font-black text-emerald-400 tracking-tight">₹{doctor.fee}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 pt-6">
                      <Link to="/login" className="flex-1">
                        <NeumorphicButton className="w-full py-5 text-lg bg-blue-600 text-white border-none shadow-2xl shadow-blue-900/20">
                          Register Appointment
                        </NeumorphicButton>
                      </Link>
                      <Link to="/contact" className="flex-1">
                        <NeumorphicButton variant="secondary" className="w-full py-5 text-lg border-white/5 text-slate-400 hover:text-white transition-all">
                          Expert Inquiry
                        </NeumorphicButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}

          {/* Gynecologist Placeholder for SEO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-12 border-white/5 opacity-50 grayscale">
              <div className="flex flex-col lg:flex-row gap-12 items-center text-center lg:text-left">
                <div className="w-48 h-48 neumorphic rounded-[2.5rem] flex-shrink-0 flex items-center justify-center text-slate-600">
                   <Star size={64} strokeWidth={1} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-black text-slate-400 tracking-tight">Gynecology Services</h2>
                  <p className="text-slate-500 max-w-xl font-bold">
                    Our Specialized Gynecology Unit is currently being upgraded with advanced diagnostic tools. 
                    Booking for these services will resume shortly. Stay tuned for updates.
                  </p>
                  <p className="text-xs font-black text-slate-600 italic uppercase tracking-[0.2em] pt-4">Expected: Q3 2026</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
