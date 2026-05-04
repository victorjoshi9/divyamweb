import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Calendar, UserCheck, FileText, Activity } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { useAuth } from '../../contexts/AuthContext';

const DoctorHome = () => {
    const { user } = useAuth();
    return (
  <div className="space-y-10">
    <div className="space-y-2 text-center lg:text-left">
      <h1 className="text-4xl font-black text-white tracking-tight">Welcome, {user?.name}</h1>
      <p className="text-sm font-bold text-slate-500">You have 12 appointments scheduled for today.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <GlassCard className="p-10 border-white/5">
        <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-white">
          <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
            <Calendar size={24} strokeWidth={2.5} />
          </div>
          Today's Schedule
        </h3>
        <div className="space-y-4">
          {[
            { time: '5:00 PM', patient: 'Aarav Sharma', status: 'Waiting' },
            { time: '5:15 PM', patient: 'Isha Gupta', status: 'Waiting' },
            { time: '5:30 PM', patient: 'Vivaan Roy', status: 'Upcoming' },
          ].map((app, i) => (
            <div key={i} className="flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm rounded-[1.5rem] border border-white/5 shadow-sm">
              <div>
                <p className="text-sm font-black text-white">{app.patient}</p>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">{app.time}</p>
              </div>
              <span className={`text-[11px] font-black px-3 py-1.5 rounded-lg ${app.status === 'Waiting' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="space-y-8">
        <GlassCard className="p-10 border-white/5">
          <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-white">
            <div className="p-2 bg-green-500/20 rounded-xl text-green-400">
              <Activity size={24} strokeWidth={2.5} />
            </div>
            Quick Stats
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 border border-white/5 rounded-[1.5rem] shadow-sm">
              <p className="text-[11px] text-blue-400 font-bold uppercase tracking-widest">Completed</p>
              <p className="text-4xl font-black text-white mt-2">8</p>
            </div>
            <div className="p-6 bg-gradient-to-tr from-orange-500/10 to-amber-500/10 border border-white/5 rounded-[1.5rem] shadow-sm">
              <p className="text-[11px] text-orange-400 font-bold uppercase tracking-widest">In Queue</p>
              <p className="text-4xl font-black text-white mt-2">4</p>
            </div>
          </div>
        </GlassCard>

        <Link to="/ipd" className="block transform transition-transform hover:-translate-y-1">
          <GlassCard className="p-10 bg-gradient-to-r from-blue-600 to-rose-500 text-white shadow-2xl border-none">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black tracking-tight">IPD Rounds</h3>
                <p className="text-sm font-semibold text-blue-100 mt-1">Check admitted patient status</p>
              </div>
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Activity size={32} strokeWidth={2.5} />
              </div>
            </div>
          </GlassCard>
        </Link>
      </div>
    </div>
  </div>
);
}

export default function DoctorDashboard() {
  const links = [
    { name: 'Dashboard', path: '/doctor', icon: Calendar },
    { name: 'Consultations', path: '/doctor/queue', icon: UserCheck },
    { name: 'Prescriptions', path: '/doctor/rx', icon: FileText },
    { name: 'Patient History', path: '/doctor/history', icon: Activity },
  ];

  return (
    <DashboardLayout sidebarLinks={links}>
      <Routes>
        <Route index element={<DoctorHome />} />
        <Route path="*" element={<div>Doctor feature panel...</div>} />
      </Routes>
    </DashboardLayout>
  );
}
