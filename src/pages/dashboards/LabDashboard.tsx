import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Beaker, Clipboard, Upload, CheckCircle } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { NeumorphicButton } from '../../components/ui/NeumorphicButton';

const LabHome = () => (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lab Technician Portal</h1>
        <NeumorphicButton className="bg-blue-600 text-white shadow-blue-200">Generate New ID</NeumorphicButton>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Clipboard size={20} className="text-blue-600" />
                Pending Samples
            </h3>
            <div className="space-y-3">
                {[
                    { id: 'LAB-7412', patient: 'Suresh Raina', test: 'CBC, Lipid Profile', priority: 'High' },
                    { id: 'LAB-7413', patient: 'Mohit Sharma', test: 'Blood Sugar', priority: 'Normal' }
                ].map((sample, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
                        <div>
                            <p className="text-xs font-bold text-gray-400 capitalize">{sample.id}</p>
                            <p className="text-sm font-bold">{sample.patient}</p>
                            <p className="text-[10px] text-gray-500 uppercase">{sample.test}</p>
                        </div>
                        <NeumorphicButton className="py-1.5 px-3 text-xs" variant="secondary">Process</NeumorphicButton>
                    </div>
                ))}
            </div>
        </GlassCard>

        <GlassCard className="p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Upload size={20} className="text-green-600" />
                Report Upload
            </h3>
            <div className="border-2 border-dashed border-gray-100 rounded-3xl p-12 text-center flex flex-col items-center gap-4">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
                    <Upload size={32} />
                </div>
                <div>
                    <p className="font-bold">Select PDF/Image</p>
                    <p className="text-xs text-gray-400">Drag and drop file here</p>
                </div>
                <input type="file" className="hidden" id="lab-file" />
                <label htmlFor="lab-file" className="cursor-pointer bg-gray-100 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">Browse Files</label>
            </div>
        </GlassCard>
    </div>
  </div>
);

export default function LabDashboard() {
  const links = [
    { name: 'Queue', path: '/lab', icon: Beaker },
    { name: 'Upload Results', path: '/lab/upload', icon: Upload },
    { name: 'Completed', path: '/lab/completed', icon: CheckCircle },
  ];

  return (
    <DashboardLayout sidebarLinks={links}>
      <Routes>
        <Route index element={<LabHome />} />
        <Route path="*" element={<div>Lab feature panel...</div>} />
      </Routes>
    </DashboardLayout>
  );
}
