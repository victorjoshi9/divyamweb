import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Bed, UserPlus, Clipboard, Activity } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { NeumorphicButton } from '../../components/ui/NeumorphicButton';

const IPDHome = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">In-Patient Department (IPD)</h1>
          <NeumorphicButton className="bg-blue-600 text-white shadow-blue-200 flex items-center gap-2">
            <UserPlus size={18} />
            Admit Patient
          </NeumorphicButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard className="p-8 space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                  <Bed size={20} className="text-blue-600" />
                  Bed Availability
              </h3>
              <div className="grid grid-cols-5 gap-2">
                  {[...Array(20)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold ${
                            i < 12 ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-green-50 text-green-500 border border-green-100'
                        }`}
                        title={i < 12 ? 'Occupied' : 'Free'}
                      >
                          {i + 1}
                      </div>
                  ))}
              </div>
              <div className="flex gap-4 text-xs font-bold">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-400 rounded-sm"></div> Occupied (12)</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-400 rounded-sm"></div> Free (8)</div>
              </div>
          </GlassCard>

          <GlassCard className="p-8 md:col-span-2">
              <h3 className="text-lg font-bold mb-6">Current Admitted Patients</h3>
              <div className="space-y-3">
                  {[
                      { name: 'Kishanlal Vyas', age: 72, diagnosis: 'Pneumonia', ward: 'Male Ward A', day: 3 },
                      { name: 'Radha Devi', age: 45, diagnosis: 'Post-Op Observation', ward: 'Female Ward B', day: 1 }
                  ].map((p, i) => (
                      <div key={i} className="p-4 bg-white rounded-2xl border border-gray-100 flex justify-between items-center">
                          <div className="flex gap-4 items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                  <Activity size={18} />
                              </div>
                              <div>
                                  <p className="font-bold">{p.name} <span className="text-xs text-gray-400 font-normal">({p.age}y)</span></p>
                                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{p.ward} • Day {p.day}</p>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-xs font-bold text-blue-600 mb-2">{p.diagnosis}</p>
                              <div className="flex gap-2">
                                <NeumorphicButton variant="secondary" className="py-1 px-3 text-[10px] shadow-sm">Logs</NeumorphicButton>
                                <NeumorphicButton variant="secondary" className="py-1 px-3 text-[10px] shadow-sm">Prescribe</NeumorphicButton>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </GlassCard>
      </div>

      <GlassCard className="p-8">
          <h3 className="text-lg font-bold mb-6">Discharge Reports Queue</h3>
          <div className="p-8 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200 text-gray-400">
              No patients scheduled for discharge today.
          </div>
      </GlassCard>
    </div>
  );

export default function IPDDashboard() {
  const links = [
    { name: 'Census', path: '/ipd', icon: Bed },
    { name: 'Admission', path: '/ipd/admission', icon: UserPlus },
    { name: 'Summaries', path: '/ipd/reports', icon: Clipboard },
    { name: 'Vital Monitoring', path: '/ipd/vitals', icon: Activity },
  ];

  return (
    <DashboardLayout sidebarLinks={links}>
      <Routes>
        <Route index element={<IPDHome />} />
        <Route path="*" element={<div>IPD feature panel...</div>} />
      </Routes>
    </DashboardLayout>
  );
}
