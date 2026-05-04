import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Home, Receipt, FileText, Beaker, MessageSquare } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { useAuth } from '../../contexts/AuthContext';
import { NeumorphicButton } from '../../components/ui/NeumorphicButton';

const PatientHome = () => {
    const { user } = useAuth();
    return (
  <div className="space-y-10">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white tracking-tight">Hello, {user?.name}</h1>
        <p className="text-sm font-bold text-slate-500">Your health records are up to date.</p>
      </div>
      <NeumorphicButton className="bg-blue-600 text-white border-none px-8 py-4">
        New Appointment
      </NeumorphicButton>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <GlassCard className="p-10 md:col-span-2 border-white/5">
        <h3 className="text-xl font-black mb-6 text-white">Upcoming Appointments</h3>
        <div className="p-8 border-2 border-dashed border-white/10 rounded-[2rem] text-center text-slate-500 font-bold bg-white/5">
          No upcoming visits found. Book your next consultation today!
        </div>
      </GlassCard>

      <GlassCard className="p-10 flex flex-col justify-center items-center text-center space-y-6 border-white/5">
        <div className="p-5 bg-green-500/10 text-green-400 rounded-[2rem] shadow-inner">
            <FileText size={40} strokeWidth={2.5} />
        </div>
        <div>
            <h4 className="font-black text-white text-lg">Latest Prescription</h4>
            <p className="text-[10px] font-black text-slate-500 mt-1 pb-6 uppercase tracking-[0.2em]">Downloaded 2 days ago</p>
            <NeumorphicButton variant="secondary" className="text-[10px] py-3 px-6 shadow-sm uppercase tracking-widest">Download PDF</NeumorphicButton>
        </div>
      </GlassCard>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="p-10 border-white/5">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-white">
                <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400">
                  <Beaker size={24} strokeWidth={2.5} />
                </div>
                Lab Reports
            </h3>
            <div className="space-y-4">
                {[
                    { test: 'Complete Blood Count', date: 'Oct 12, 2025', result: 'Normal' },
                    { test: 'Blood Sugar (Fasting)', date: 'Sep 28, 2025', result: 'High' }
                ].map((test, i) => (
                    <div key={i} className="flex justify-between items-center p-5 bg-white/5 backdrop-blur-sm rounded-[1.5rem] border border-white/5 shadow-sm">
                        <div>
                            <p className="text-sm font-black text-white">{test.test}</p>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">{test.date}</p>
                        </div>
                        <span className={`text-[11px] font-black px-3 py-1.5 rounded-lg ${test.result === 'Normal' ? 'bg-green-500/20 text-green-400' : 'bg-rose-500/20 text-rose-400'}`}>
                            {test.result}
                        </span>
                    </div>
                ))}
            </div>
        </GlassCard>

        <GlassCard className="p-10 border-white/5">
             <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-white">
                <div className="p-2 bg-orange-500/20 rounded-xl text-orange-400">
                  <Receipt size={24} strokeWidth={2.5} />
                </div>
                Billing History
            </h3>
            <div className="space-y-4">
                {[
                    { desc: 'Consultation - Dr. MG Choudhary', amt: '₹150', date: 'Oct 12, 2025' },
                    { desc: 'Pharmacy Bill #742', amt: '₹1,240', date: 'Oct 12, 2025' }
                ].map((bill, i) => (
                    <div key={i} className="flex justify-between items-center p-5 bg-white/5 backdrop-blur-sm rounded-[1.5rem] border border-white/5 shadow-sm">
                        <div>
                            <p className="text-sm font-black text-white truncate max-w-[200px]">{bill.desc}</p>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">{bill.date}</p>
                        </div>
                        <p className="font-black text-white text-lg">{bill.amt}</p>
                    </div>
                ))}
            </div>
        </GlassCard>
    </div>
  </div>
);
}

export default function PatientDashboard() {
  const links = [
    { name: 'Summary', path: '/patient', icon: Home },
    { name: 'Prescriptions', path: '/patient/rx', icon: FileText },
    { name: 'Lab Reports', path: '/patient/lab', icon: Beaker },
    { name: 'Invoices', path: '/patient/billing', icon: Receipt },
    { name: 'AI Support', path: '/patient/chat', icon: MessageSquare },
  ];

  return (
    <DashboardLayout sidebarLinks={links}>
      <Routes>
        <Route index element={<PatientHome />} />
        <Route path="*" element={<div>Patient feature panel...</div>} />
      </Routes>
    </DashboardLayout>
  );
}
