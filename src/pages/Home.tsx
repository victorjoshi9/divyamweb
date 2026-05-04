import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { GlassCard } from '../components/ui/GlassCard';
import { NeumorphicButton } from '../components/ui/NeumorphicButton';
import { 
  ArrowRight, Activity, Users, Award, ShieldCheck, MapPin, 
  Calendar, Clock, Zap, Phone, Heart, Beaker, Baby, Stethoscope, 
  Smile, Dumbbell, ClipboardList, Bed, Pill, Star, MessageSquare 
} from 'lucide-react';
import { DOCTORS } from '../constants';
import { useConfig } from '../contexts/ConfigContext';

export default function Home() {
  const { config, isLoading: isConfigLoading } = useConfig();
  const { hospitalName, phone, emergencyPhone, address, stats = [] } = config;

  if (isConfigLoading && !hospitalName) {
    return <div className="min-h-screen bg-[#050B14] flex items-center justify-center text-blue-500 font-bold uppercase tracking-widest">Initializing Ecosystem...</div>;
  }

  return (
    <div className="relative bg-[#050B14] overflow-hidden">
      {/* Background Glows */}
      <div className="accent-glow top-20 -left-40 bg-blue-500/20 w-[600px] h-[600px]" />
      <div className="accent-glow bottom-40 -right-40 bg-teal-500/10 w-[700px] h-[700px]" />

      {/* Hero Section - Immersive Layout */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col pt-24 lg:pt-32 px-4 md:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center flex-1 pb-10 lg:pb-20">
          {/* Left Column */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="lg:col-span-7 flex flex-col justify-center lg:justify-between h-full py-6 md:py-10"
          >
            <div className="space-y-6">
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] italic"
              >
                Advanced Digital Healthcare
              </motion.span>
              
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-white"
              >
                Precision Care<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-teal-300">Modern Digital</span><br/>
                Ecosystem
              </motion.h1>
              
              <motion.p 
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                className="text-slate-400 text-base md:text-xl leading-relaxed max-w-lg font-medium"
              >
                Rajasthan's premier technology-integrated multi-speciality hospital, redefining patient experience through innovation and empathy.
              </motion.p>

              {/* Mobile Quick CTAs */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                className="flex lg:hidden flex-wrap gap-3 pt-2"
              >
                <Link to="/login">
                  <NeumorphicButton className="px-6 py-3 text-[9px]">Book Appointment</NeumorphicButton>
                </Link>
                <a href={`tel:${phone}`}>
                  <NeumorphicButton variant="secondary" className="px-6 py-3 text-[9px]">Contact Frontdesk</NeumorphicButton>
                </a>
              </motion.div>

              {/* Doctors Quick Selection - Hidden on small mobile, visible on tablet+ */}
              <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {[
                  { name: 'Dr. MG Choudhary', role: 'Pediatrician', time: '5 PM – 9 PM', fee: '₹150', color: 'blue' },
                  { name: 'Dr. Nisha Choudhary', role: 'Dentist', time: '11 AM – 4 PM', fee: '₹200', color: 'teal' },
                  { name: 'Dr. Ashish Dadhich', role: 'Physician', time: '10 AM – 2 PM', fee: '₹200', color: 'blue' }
                ].map((doc, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <GlassCard className="p-4 rounded-2xl border-white/10 hover:border-blue-400/50 transition-all group h-full">
                      <p className={`text-[9px] font-black uppercase mb-1 ${doc.color === 'teal' ? 'text-teal-400' : 'text-blue-400'}`}>{doc.role}</p>
                      <h3 className="font-bold text-white text-sm tracking-tight">{doc.name}</h3>
                      <p className="text-[10px] text-slate-500 font-medium mt-1">{doc.time}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Hospital Portals Footer */}
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
              className="hidden lg:flex flex-col items-start gap-4 mt-12 pt-8 border-t border-white/5"
            >
              <span className="text-[10px] uppercase text-slate-600 font-bold tracking-[0.3em]">Institutional Portals</span>
              <div className="flex flex-wrap gap-3">
                {['Admin', 'Doctor', 'Patient', 'Lab', 'Pharmacy'].map((portal) => (
                  <Link key={portal} to="/login">
                    <button className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all uppercase tracking-widest">
                      {portal}
                    </button>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Glassmorphic Booking Widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="w-full max-w-sm glass-heavy rounded-[40px] p-6 md:p-8 border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 blur-3xl" />
              
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-3 text-white">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Calendar size={18} />
                </div>
                Secure Booking
              </h3>

              <form className="space-y-4 md:space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Full Patient Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-[#050B14]/40 border border-white/10 rounded-2xl py-3 px-5 focus:border-blue-500 outline-none transition-all text-sm font-medium text-white placeholder:text-slate-700" />
                </div>

                <div className="space-y-2 relative">
                  <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Medical Specialist</label>
                  <select className="w-full bg-[#050B14]/40 border border-white/10 rounded-2xl py-3 px-5 focus:border-blue-500 outline-none transition-all text-sm font-medium text-white appearance-none cursor-pointer">
                    <option className="bg-[#050B14]">Dr. MG Choudhary (Pediatrics)</option>
                    <option className="bg-[#050B14]">Dr. Nisha Choudhary (Dental)</option>
                    <option className="bg-[#050B14]">Dr. Ashish Dadhich (Medicine)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Preferred Date</label>
                    <input type="date" className="w-full bg-[#050B14]/40 border border-white/10 rounded-2xl py-3 px-5 focus:border-blue-500 outline-none transition-all text-sm font-medium text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Session</label>
                    <select className="w-full bg-[#050B14]/40 border border-white/10 rounded-2xl py-3 px-5 focus:border-blue-500 outline-none transition-all text-sm font-medium text-white appearance-none cursor-pointer">
                      <option className="bg-[#050B14]">Morning</option>
                      <option className="bg-[#050B14]">Evening</option>
                    </select>
                  </div>
                </div>

                <Link to="/login" className="block w-full">
                  <NeumorphicButton className="w-full py-4 mt-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl font-bold uppercase tracking-[0.2em] shadow-xl hover:shadow-blue-500/40 transition-all text-[10px]">
                    Reserve Slot
                  </NeumorphicButton>
                </Link>
                
                <p className="text-center text-[9px] text-slate-600 uppercase font-black tracking-widest pt-2">
                  <span className="text-teal-400">●</span> Instant confirmation available
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Contact/SEO Floating Rail */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-12 bg-black/60 backdrop-blur-md border border-white/5 px-12 py-3.5 rounded-full z-20 shadow-2xl">
          <div className="flex items-center gap-3">
            <MapPin className="text-blue-400" size={14} />
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{address.split(',').slice(0, 2).join(',')}</span>
          </div>
          <div className="flex items-center gap-3 border-x border-white/10 px-12">
            <Phone className="text-blue-400" size={14} />
            <span className="text-[9px] text-slate-100 font-bold uppercase tracking-widest">{phone || 'Call Us'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Activity className="text-teal-400" size={14} />
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic opacity-60">Premier Digital Care</span>
          </div>
        </div>
      </section>

      {/* Emergency Strip - Refined as a Ticker */}
      <div className="bg-rose-600/90 backdrop-blur-md py-2 px-4 sticky top-0 md:top-[88px] z-40 border-y border-white/10">
         <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white overflow-hidden whitespace-nowrap">
               <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="flex-shrink-0">🚨</motion.span>
               <span className="text-[10px] md:text-xs font-black uppercase tracking-tight md:tracking-widest truncate">
                 CRITICAL EMERGENCY? 24/7 TRAUMA SERVICES ACTIVE — CALL IMMEDIATELY
               </span>
            </div>
            <div className="flex gap-2">
              <a href={`tel:${emergencyPhone}`} className="bg-white text-rose-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg hover:bg-rose-50 transition-colors whitespace-nowrap">
                {emergencyPhone}
              </a>
            </div>
         </div>
      </div>


      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
         <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
         >
            <GlassCard className="aspect-square bg-blue-500/5 items-center justify-center flex flex-col gap-4">
               <Bed size={48} className="text-blue-400" />
               <span className="text-xs font-black uppercase text-center tracking-widest px-4">24/7 ICU & Ventilators</span>
            </GlassCard>
            <GlassCard className="aspect-square bg-rose-500/5 items-center justify-center flex flex-col gap-4 mt-8">
               <Zap size={48} className="text-rose-400" />
               <span className="text-xs font-black uppercase text-center tracking-widest px-4">Modern OT</span>
            </GlassCard>
            <GlassCard className="aspect-square bg-purple-500/5 items-center justify-center flex flex-col gap-4 -mt-8">
               <Beaker size={48} className="text-purple-400" />
               <span className="text-xs font-black uppercase text-center tracking-widest px-4">Advanced Lab</span>
            </GlassCard>
            <GlassCard className="aspect-square bg-green-500/5 items-center justify-center flex flex-col gap-4">
               <Users size={48} className="text-green-400" />
               <span className="text-xs font-black uppercase text-center tracking-widest px-4">Day Care</span>
            </GlassCard>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
         >
            <div className="space-y-4">
               <span className="text-xs font-black text-rose-500 uppercase tracking-[0.3em]">About Us</span>
               <h2 className="text-5xl font-black text-white leading-tight">{hospitalName} – <br />Gangashahar’s Pride</h2>
               <p className="text-lg text-slate-400 leading-relaxed">
                  Founded in 2023, {hospitalName} was built with a single vision: to bring world-class healthcare to the heart of Gangashahar, Bikaner. We are a fully integrated multi-speciality hospital offering comprehensive care under one roof.
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                  { icon: ShieldCheck, text: '24/7 ICU with Ventilators', color: 'text-green-400' },
                  { icon: Smile, text: 'Fully Air-Conditioned Wards', color: 'text-blue-400' },
                  { icon: Pill, text: 'In-House Pharmacy', color: 'text-green-400' },
                  { icon: Beaker, text: 'Advanced Diagnostic Centre', color: 'text-purple-400' },
                  { icon: Activity, text: 'Dedicated Ambulance Service', color: 'text-rose-400' },
                  { icon: Baby, text: 'Day Care for Children', color: 'text-blue-400' },
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-white">
                     <item.icon size={18} className={item.color} />
                     <span>{item.text}</span>
                  </div>
               ))}
            </div>

            <div className="flex items-center gap-4 pt-4">
               <MapPin className="text-rose-500" />
               <span className="text-sm text-slate-400 font-bold tracking-tight">{address}</span>
            </div>
         </motion.div>
      </section>

      {/* Specialties */}
      <section className="bg-[#1a1a1a] py-32 px-6">
         <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
               <span className="text-xs font-black text-rose-500 uppercase tracking-[0.3em]">Our Specialties</span>
               <h2 className="text-6xl font-black text-white">World-Class Medical Services</h2>
               <p className="text-slate-400 max-w-2xl mx-auto">Comprehensive care across all major medical specialties with state-of-the-art diagnostic and surgical capabilities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                  { id: 'pediatrics', title: 'Pediatrics', desc: 'Expert developmental and emergency care for newborns to adolescents.', icon: Baby, doctor: 'Dr. MG Choudhary', type: 'Child Specialist', color: 'blue' },
                  { id: 'gynecology', title: 'Gynecology & Obstetrics', desc: 'Complete women’s health – prenatal care, normal & C-section deliveries.', icon: Heart, doctor: 'Dr. Shahana Chandad', type: 'Womens Health', color: 'rose' },
                  { id: 'dentistry', title: 'Dentistry', desc: 'Advanced dental implants, root canals, and cosmetic procedures.', icon: Smile, doctor: 'Dr. Nisha Choudhary', type: 'Dental Care', color: 'green' },
                  { id: 'cardiology', title: 'Cardiology', desc: 'Comprehensive heart care with ECG, ECHO, Holter monitoring.', icon: Activity, doctor: 'Cardiac Specialist', type: 'Heart Care', color: 'red' },
                  { id: 'diagnostics', title: 'Diagnostics', desc: 'Advanced imaging – Ultrasound, X-ray, CT Scan, Pathology lab.', icon: Beaker, doctor: 'Radiology Team', type: 'Lab & Imaging', color: 'purple' },
                  { id: 'emergency', title: 'Emergency Care', desc: '24/7 Trauma centre, critical care, and ambulance services.', icon: Stethoscope, doctor: 'Always Available', type: 'Open 24/7', color: 'rose' },
               ].map((service, i) => (
                  <motion.div key={i} whileHover={{ y: -10 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Link to="/doctors">
                        <GlassCard className="p-8 h-full space-y-6 hover:bg-white/5 transition-all cursor-pointer border-white/10 group">
                           <div className={`p-4 rounded-2xl w-fit group-hover:scale-110 transition-transform ${
                              service.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                              service.color === 'rose' ? 'bg-rose-500/20 text-rose-400' :
                              service.color === 'green' ? 'bg-green-500/20 text-green-400' :
                              service.color === 'red' ? 'bg-red-500/20 text-red-400' :
                              'bg-purple-500/20 text-purple-400'
                           }`}>
                              <service.icon size={32} />
                           </div>
                           <div className="space-y-4">
                              <h3 className="text-2xl font-black text-white">{service.title}</h3>
                              <p className="text-sm text-slate-400 leading-relaxed">{service.desc}</p>
                           </div>
                           <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                              <div>
                                 <div className="text-xs font-black text-white uppercase tracking-widest">{service.doctor}</div>
                                 <div className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-[0.1em]">{service.type}</div>
                              </div>
                              <ArrowRight className="text-slate-500 group-hover:text-white transition-colors" size={20} />
                           </div>
                        </GlassCard>
                    </Link>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto space-y-16">
         <div className="text-center space-y-4">
            <span className="text-xs font-black text-rose-500 uppercase tracking-[0.3em]">Our Team</span>
            <h2 className="text-6xl font-black text-white">Meet Our Expert Specialists</h2>
            <p className="text-slate-400">Experienced, compassionate, and dedicated to your well-being.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {DOCTORS.map((doctor, i) => (
               <motion.div key={i} whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <GlassCard className="p-6 h-full text-center space-y-6">
                     <div className="mx-auto w-24 h-24 rounded-[2rem] neumorphic flex items-center justify-center text-3xl font-black text-blue-400">
                        {doctor.name[doctor.name.length - 1]}
                     </div>
                     <div className="space-y-2">
                        <div className="flex items-center justify-center gap-1 text-green-500 font-black text-[10px] uppercase tracking-widest">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                           Available Today
                        </div>
                        <h4 className="text-lg font-black text-white">{doctor.name}</h4>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{doctor.specialty}</div>
                     </div>
                     <div className="flex items-center justify-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                        <span className="text-xs font-black text-white ml-2">4.4/5</span>
                     </div>
                     <Link to="/login" className="block">
                        <NeumorphicButton className="w-full text-xs font-black py-3">Book Visit</NeumorphicButton>
                     </Link>
                     <a href={`tel:${phone}`} className="block">
                        <NeumorphicButton variant="secondary" className="w-full text-xs font-black py-3">Call Now</NeumorphicButton>
                     </a>
                  </GlassCard>
               </motion.div>
            ))}
         </div>
      </section>

      {/* Facilities section */}
      <section className="bg-[#1a1a1a] py-32 px-6">
         <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
               <span className="text-xs font-black text-rose-500 uppercase tracking-[0.3em]">Infrastructure</span>
               <h2 className="text-6xl font-black text-white">State-of-the-Art Facilities</h2>
               <p className="text-slate-400">Every department equipped with the latest medical technology.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                  { title: 'Fully AC ICU & Wards', icon: Bed, desc: 'Modern intensive care units with 24/7 monitoring.', badge: '24/7 Monitoring' },
                  { title: 'Ambulance Service', icon: Activity, desc: 'Equipped with trained paramedics, within and outside Bikaner.', badge: '8min Response' },
                  { title: 'Advanced Diagnostics', icon: Stethoscope, desc: '32-Slice CT, X-Ray, Lab, and USG within reach.', badge: 'Same Day Reports' },
                  { title: 'In-House Pharmacy', icon: Pill, desc: '24/7 pharmacy stocked with quality medicines.', badge: 'Open 24/7' },
                  { title: 'Day Care for Children', icon: Baby, desc: 'Friendly space for quick daycare procedures.', badge: 'Child Friendly' },
                  { title: 'Modern OT', icon: Zap, desc: 'Fully equipped modular operation theaters.', badge: 'ISO Standard' },
               ].map((item, i) => (
                  <GlassCard key={i} className="p-8 space-y-6">
                     <item.icon size={48} className="text-rose-500" />
                     <div className="space-y-4">
                        <h3 className="text-2xl font-black text-white">{item.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                     </div>
                     <div className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-lg w-fit text-green-400">
                        {item.badge}
                     </div>
                  </GlassCard>
               ))}
            </div>
         </div>
      </section>

      {/* Comparison Table */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-black text-rose-500 uppercase tracking-[0.3em]">Why Choose Us</span>
            <h2 className="text-5xl font-black text-white">Divyam vs Other Hospitals</h2>
            <p className="text-slate-400">See how we compare – transparent and proud.</p>
         </div>

         <GlassCard className="overflow-x-auto p-0 border-white/5">
            <table className="w-full text-left">
               <thead className="bg-white/5 border-b border-white/5">
                  <tr>
                     <th className="p-6 text-xs font-black uppercase text-slate-500 tracking-widest">Feature</th>
                     <th className="p-6 text-xs font-black uppercase text-rose-500 tracking-widest text-center">Divyam</th>
                     <th className="p-6 text-xs font-black uppercase text-slate-500 tracking-widest text-center">Standard</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5 text-sm font-bold text-slate-300">
                  {[
                     { name: '24/7 Emergency', divyam: true, other: true },
                     { name: 'Pediatrics', divyam: true, other: false },
                     { name: 'Gynecology & OBG', divyam: true, other: false },
                     { name: 'In-house Pharmacy', divyam: true, other: true },
                     { name: 'Advanced Diagnostics', divyam: true, other: false },
                     { name: 'Child Day Care', divyam: true, other: false },
                  ].map((row, i) => (
                     <tr key={i}>
                        <td className="p-6">{row.name}</td>
                        <td className="p-6 text-center text-green-500">{row.divyam ? '✅' : '❌'}</td>
                        <td className="p-6 text-center text-slate-500">{row.other ? '✅' : '❌'}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </GlassCard>
      </section>

      {/* Reviews */}
      <section className="bg-[#1a1a1a] py-32 px-6">
         <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
               <span className="text-xs font-black text-rose-500 uppercase tracking-[0.3em]">Patient Reviews</span>
               <h2 className="text-6xl font-black text-white leading-tight">Trusted by 5,000+ <br /> Families</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[...Array(4)].map((_, i) => (
                  <GlassCard key={i} className="p-8 space-y-6">
                     <div className="flex gap-1 text-yellow-500">
                        {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                     </div>
                     <p className="text-sm text-slate-400 italic leading-relaxed">
                        "Great hospital in Bikaner. Staff is very supportive and care is top-notch. Dr. MG is truly special."
                     </p>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full neumorphic" />
                        <div>
                           <div className="text-xs font-black text-white uppercase tracking-widest">Patient Reviewer</div>
                           <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Local Local</div>
                        </div>
                     </div>
                  </GlassCard>
               ))}
            </div>
         </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
         <div className="space-y-12">
            <div className="space-y-4 text-center lg:text-left">
               <span className="text-xs font-black text-rose-500 uppercase tracking-[0.3em]">Get in touch</span>
               <h2 className="text-6xl font-black text-white">Visit or Contact Us</h2>
            </div>
            
            <div className="space-y-8">
               <div className="flex gap-6">
                  <div className="p-4 neumorphic rounded-2xl text-rose-500 h-fit">
                     <MapPin size={24} />
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-xl font-black text-white">Address</h4>
                     <p className="text-slate-400 leading-relaxed max-w-xs">{address}</p>
                  </div>
               </div>
               <div className="flex gap-6">
                  <div className="p-4 neumorphic rounded-2xl text-blue-500 h-fit">
                     <Phone size={24} />
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-xl font-black text-white">Phone</h4>
                     <p className="text-slate-400">{phone}</p>
                     <p className="text-slate-400 font-black text-rose-500">{emergencyPhone} (Emergency)</p>
                  </div>
               </div>
               <div className="flex gap-6">
                  <div className="p-4 neumorphic rounded-2xl text-purple-500 h-fit">
                     <Clock size={24} />
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-xl font-black text-white">Hours</h4>
                     <p className="text-slate-400">Open 24 Hours, 7 Days a week</p>
                     <p className="text-slate-400">OPD: Mon-Sat: 10am-9pm</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <GlassCard className="p-10 space-y-8">
               <h3 className="text-3xl font-black text-white">Send Us a Message</h3>
               <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-4">Name</label>
                        <input className="w-full neumorphic-inset rounded-full px-6 py-4 bg-transparent outline-none text-white font-bold" placeholder="Your Full Name" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-4">Phone</label>
                        <input className="w-full neumorphic-inset rounded-full px-6 py-4 bg-transparent outline-none text-white font-bold" placeholder="your Mobile number" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-4">Message</label>
                     <textarea className="w-full neumorphic-inset rounded-[2rem] px-6 py-6 bg-transparent outline-none text-white font-bold h-32 resize-none" placeholder="How can we help?" />
                  </div>
                  <NeumorphicButton className="w-full bg-rose-500 text-white border-none py-5 text-lg">Send Message</NeumorphicButton>
               </form>
            </GlassCard>
            
          <div className="fixed bottom-6 right-6 z-[60] md:hidden">
            <Link to="/login">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-white/20"
              >
                <Calendar size={24} />
              </motion.button>
            </Link>
          </div>

          <div className="hidden md:block fixed bottom-10 right-10 z-[60]">
             <Link to="/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                   <NeumorphicButton className="bg-blue-600 text-white border-none rounded-full px-8 py-4 flex items-center gap-3 shadow-2xl">
                      <Calendar size={20} />
                      <span className="font-black uppercase tracking-widest text-xs">Book Appointment</span>
                   </NeumorphicButton>
                </motion.div>
             </Link>
          </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] py-20 px-6 border-t border-white/5">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-6">
               <div className="space-y-2">
                  <h3 className="text-3xl font-black text-white">{hospitalName}</h3>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{config.tagline}</div>
               </div>
               <p className="text-sm text-slate-500 leading-relaxed">
                  Leading the way in medical excellence with a heart for the community of Bikaner.
               </p>
            </div>
            
            <div className="space-y-6">
               <h4 className="text-xs font-black uppercase text-white tracking-[0.3em]">Quick Links</h4>
               <ul className="space-y-4 text-sm font-bold text-slate-500">
                  <li className="hover:text-blue-400 cursor-pointer transition-colors">About Us</li>
                  <li className="hover:text-blue-400 cursor-pointer transition-colors">Specialties</li>
                  <li className="hover:text-blue-400 cursor-pointer transition-colors">Our Team</li>
                  <li className="hover:text-blue-400 cursor-pointer transition-colors">Contact</li>
               </ul>
            </div>

            <div className="space-y-6">
               <h4 className="text-xs font-black uppercase text-white tracking-[0.3em]">Specialties</h4>
               <ul className="space-y-4 text-sm font-bold text-slate-500">
                  <li className="hover:text-blue-400 transition-colors">Pediatrics</li>
                  <li className="hover:text-blue-400 transition-colors">Gynecology</li>
                  <li className="hover:text-blue-400 transition-colors">Dentistry</li>
                  <li className="hover:text-blue-400 transition-colors">General Medicine</li>
               </ul>
            </div>

            <div className="space-y-6">
               <h4 className="text-xs font-black uppercase text-white tracking-[0.3em]">Contact</h4>
               <ul className="space-y-4 text-sm font-bold text-slate-500">
                  <li className="flex items-center gap-3"><Phone size={14} /> {phone}</li>
                  <li className="flex items-start gap-3"><MapPin size={14} className="flex-shrink-0" /> {address}</li>
                  <li className="flex items-center gap-3 truncate font-thin uppercase tracking-widest text-[10px]">info@divyamhospital.online</li>
               </ul>
            </div>
         </div>
      </footer>
    </div>
  );
}
