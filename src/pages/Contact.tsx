import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/ui/GlassCard';
import { NeumorphicButton } from '../components/ui/NeumorphicButton';
import { useConfig } from '../contexts/ConfigContext';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function Contact() {
  const { config } = useConfig();
  const { phone, emergencyPhone, address } = config;

  return (
    <div className="relative min-h-screen bg-[#050B14] overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="accent-glow top-0 right-0 bg-blue-500/10 w-[600px] h-[600px]" />
      <div className="accent-glow bottom-0 left-0 bg-teal-500/10 w-[500px] h-[500px]" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-40 pb-20 px-6 text-center relative z-10"
      >
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
        >
          Institutional Reach
        </motion.span>
        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none">
          Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Touch</span>
        </h1>
        <p className="max-w-xl mx-auto text-slate-500 text-base md:text-lg font-medium leading-relaxed">
          The central node for all inquiries, medical support, and specialized appointment scheduling.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Contact Details */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="lg:col-span-4 space-y-6"
            >
                {[
                    { title: 'Reception Desk', detail: phone, icon: Phone, color: 'blue' },
                    { title: 'Emergency unit', detail: emergencyPhone, icon: Clock, color: 'rose' },
                    { title: 'WhatsApp Node', detail: '+91-9413912974', icon: MessageCircle, color: 'emerald' },
                    { title: 'Physical Access', detail: address, icon: MapPin, color: 'amber' }
                ].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <GlassCard className="p-6 md:p-8 border-white/5 group hover:border-white/10 transition-all">
                          <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors group-hover:bg-blue-600/20">
                                  <item.icon size={24} />
                              </div>
                              <div>
                                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-1">{item.title}</p>
                                  <p className="font-bold text-white text-sm md:text-base tracking-tight">{item.detail}</p>
                              </div>
                          </div>
                      </GlassCard>
                    </motion.div>
                ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8"
            >
                <GlassCard className="p-8 md:p-12 border-white/5 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none" />
                    
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-10 tracking-tight">Direct Messaging Portal</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-600 ml-4 uppercase tracking-[0.2em]">Inquirer Name</label>
                            <input 
                                type="text" 
                                placeholder="FullName"
                                className="w-full px-6 py-4.5 bg-white/5 border border-white/10 rounded-2xl focus:border-blue-500 focus:outline-none transition-all font-bold text-white placeholder-slate-800"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-600 ml-4 uppercase tracking-[0.2em]">Communication Channel</label>
                            <input 
                                type="tel" 
                                placeholder="Mobile Number"
                                className="w-full px-6 py-4.5 bg-white/5 border border-white/10 rounded-2xl focus:border-blue-500 focus:outline-none transition-all font-bold text-white placeholder-slate-800"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[9px] font-black text-slate-600 ml-4 uppercase tracking-[0.2em]">Medical Interest Area</label>
                            <select className="w-full px-6 py-4.5 bg-white/5 border border-white/10 rounded-2xl focus:border-blue-500 focus:outline-none transition-all font-bold text-white appearance-none cursor-pointer">
                                <option className="bg-[#050B14]">Pediatrics & Neonatology</option>
                                <option className="bg-[#050B14]">Advanced Dentistry</option>
                                <option className="bg-[#050B14]">General Internal Medicine</option>
                                <option className="bg-[#050B14]">Corporate/Institutional Inquiry</option>
                            </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[9px] font-black text-slate-600 ml-4 uppercase tracking-[0.2em]">Message Body</label>
                            <textarea 
                                rows={5}
                                placeholder="Transmission details..."
                                className="w-full px-8 py-6 bg-white/5 border border-white/10 rounded-3xl focus:border-blue-500 focus:outline-none transition-all font-bold text-white placeholder-slate-800 resize-none"
                            />
                        </div>
                        <div className="md:col-span-2 pt-4">
                            <NeumorphicButton type="submit" className="w-full py-5 text-sm uppercase tracking-[0.3em] font-black bg-blue-600 text-white border-none shadow-2xl hover:shadow-blue-500/20 transition-all">
                                Initialize Transmission
                            </NeumorphicButton>
                        </div>
                    </form>
                </GlassCard>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
