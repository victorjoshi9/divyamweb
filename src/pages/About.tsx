import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/ui/GlassCard';
import { HOSPITAL_NAME, HOSPITAL_ADDRESS } from '../constants';
import { Award, ShieldCheck, Heart, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="pb-24 bg-[#121212]">
      {/* Header */}
      <div className="bg-[#1a1a1a] py-32 px-6 text-white text-center relative overflow-hidden border-b border-white/5">
        <div className="accent-glow top-0 right-0 bg-blue-600/10" />
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black mb-6 tracking-tight"
        >
          Divyam Vision
        </motion.h1>
        <p className="max-w-2xl mx-auto text-slate-400 text-lg font-bold">
          A legacy of trust and care in the heart of Bikaner. 
          Dedicated to providing accessible, high-quality medical services to our community.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 space-y-24">
        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
                { title: 'Compassion', icon: Heart, desc: 'We treat every patient like family.' },
                { title: 'Excellence', icon: Award, desc: 'Highest standards in medical ethics.' },
                { title: 'Safety', icon: ShieldCheck, desc: 'Sterile and safe environment for all.' },
                { title: 'Community', icon: Users, desc: 'Serving Bikaner since 2008.' }
            ].map((v, i) => (
                <GlassCard key={i} className="p-10 text-center border-white/5">
                    <div className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl w-fit mx-auto mb-6 shadow-inner">
                        <v.icon size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-black mb-3 text-white">{v.title}</h3>
                    <p className="text-xs font-bold text-slate-500 leading-relaxed">{v.desc}</p>
                </GlassCard>
            ))}
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
                <h2 className="text-5xl font-black text-white tracking-tight leading-[1.1]">Our Mission <br/> & Journey</h2>
                <div className="space-y-6 text-slate-400 text-base font-bold leading-relaxed">
                    <p>
                        Founded in 2008 by a team of dedicated medical professionals, Divyam Hospital was established 
                        with a single vision: to bridge the gap between quality healthcare and affordable costs in Bikaner.
                    </p>
                    <p>
                        Over the last decade, we have expanded from a small clinic to a multi-specialty facility 
                        equipped with modern IPD units, 24/7 Pharmacy, and state-of-the-art diagnostic labs.
                    </p>
                    <p>
                        Our specialized pediatric unit is one of the most trusted in North Rajasthan, 
                        serving thousands of children every year under the guidance of Dr. MG Choudhary.
                    </p>
                </div>
            </div>
            <GlassCard className="aspect-square p-4 border-white/5">
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden grayscale contrast-125 opacity-80">
                    <img 
                        src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000" 
                        alt="Hospital mission"
                        className="w-full h-full object-cover"
                    />
                </div>
            </GlassCard>
        </div>

        {/* Infrastructure */}
        <section className="space-y-12">
            <h2 className="text-4xl font-black text-white text-center">Infrastructure</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    'Advanced 24-Hour Emergency Unit',
                    'Modern Operation Theater (OT)',
                    'Private & Semi-Private IPD Rooms',
                    'In-house Diagnostic Laboratory',
                    'Digital X-Ray and Ultrasound',
                    'Special Neonatal Care Unit'
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-8 bg-white/5 rounded-[2rem] border border-white/5 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shadow-inner">
                            <ShieldCheck size={20} strokeWidth={2.5} />
                        </div>
                        <span className="font-bold text-slate-300">{item}</span>
                    </div>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
}
