import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Users, UserPlus, ClipboardList, Bed, BarChart3, Settings } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { NeumorphicButton } from '../../components/ui/NeumorphicButton';
import { useConfig } from '../../contexts/ConfigContext';

const AdminHome = () => {
  const { config } = useConfig();
  
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white tracking-tight">Systems Overview</h1>
          <p className="text-sm font-bold text-slate-500">Total metrics across all hospital units today.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Active Patients</p>
          <p className="text-4xl font-black text-white">142</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'OPD Queue', value: '28', trend: '+12%', color: 'blue' },
          { label: 'IPD Admissions', value: '14', trend: 'Stable', color: 'green' },
          { label: 'Lab Reports', value: '183', trend: '+45%', color: 'purple' },
          { label: 'Pharmacy Bills', value: '₹1.2L', trend: '+8%', color: 'orange' },
        ].map((stat, i) => (
          <GlassCard key={i} className="p-8 border-white/5">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.15em]">{stat.label}</p>
            <div className="flex items-center justify-between mt-4">
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg ${stat.trend.includes('+') ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                {stat.trend}
              </span>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-10 border-white/5">
        <h3 className="text-xl font-black mb-8 text-white flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
            <ClipboardList size={24} strokeWidth={2.5} />
          </div>
          Recent Activity
        </h3>
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center gap-5 py-4 border-b border-white/5 last:border-0 last:pb-0">
              <div className="w-12 h-12 rounded-full neumorphic flex items-center justify-center text-slate-500 font-black">
                {i}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">New appointment booked for Dr. MG Choudhary</p>
                <p className="text-xs font-semibold text-slate-500 mt-1">Patient: Rajesh Kumar • 2 minutes ago</p>
              </div>
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20">Confirmed</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

const UserManagement = () => (
  <div className="space-y-8">
    <h1 className="text-4xl font-black text-slate-800 tracking-tight">User Management</h1>
    <GlassCard className="p-10"><p className="text-slate-500 font-medium">User directory and role controls will appear here.</p></GlassCard>
  </div>
);

const ConfigManagement = () => {
  const { config, updateConfig } = useConfig();
  const [localConfig, setLocalConfig] = useState(config);

  const handleSave = async () => {
    await updateConfig(localConfig);
    alert('Dynamic settings updated successfully!');
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white tracking-tight">System Configuration</h1>
          <p className="text-sm font-bold text-slate-500">Manage hospital settings, AI configurations, and integrations.</p>
        </div>
        <NeumorphicButton 
          onClick={handleSave}
          className="bg-blue-600 text-white border-none px-8 py-4"
        >
          Save Changes
        </NeumorphicButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Chatbot Configuration */}
        <GlassCard className="p-10 space-y-8 border-white/5">
          <h3 className="text-2xl font-black text-white border-b border-white/5 pb-6">AI Chatbot Prompts</h3>
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-4">Visitor Bot Instruction</label>
              <textarea 
                className="w-full neumorphic-inset rounded-[2rem] p-6 text-sm font-bold text-slate-300 focus:outline-none transition-all border-none resize-none bg-transparent"
                rows={4}
                value={localConfig.aiVisitorPrompt}
                onChange={(e) => setLocalConfig({...localConfig, aiVisitorPrompt: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-4">Patient Bot Instruction</label>
              <textarea 
                className="w-full neumorphic-inset rounded-[2rem] p-6 text-sm font-bold text-slate-300 focus:outline-none transition-all border-none resize-none bg-transparent"
                rows={4}
                value={localConfig.aiPatientPrompt}
                onChange={(e) => setLocalConfig({...localConfig, aiPatientPrompt: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-4">Admin Bot Instruction</label>
              <textarea 
                className="w-full neumorphic-inset rounded-[2rem] p-6 text-sm font-bold text-slate-300 focus:outline-none transition-all border-none resize-none bg-transparent"
                rows={4}
                value={localConfig.aiAdminPrompt}
                onChange={(e) => setLocalConfig({...localConfig, aiAdminPrompt: e.target.value})}
              />
            </div>
          </div>
        </GlassCard>

        <div className="space-y-8">
          {/* Global Hospital Info */}
          <GlassCard className="p-10 space-y-8 border-white/5">
            <h3 className="text-2xl font-black text-white border-b border-white/5 pb-6">General Info</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-4">Hospital Name</label>
                <input 
                  type="text" 
                  className="w-full neumorphic-inset rounded-full px-6 py-4 text-sm font-bold text-slate-300 focus:outline-none transition-all border-none bg-transparent"
                  value={localConfig.hospitalName}
                  onChange={(e) => setLocalConfig({...localConfig, hospitalName: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-4">Phone Number</label>
                <input 
                  type="text" 
                  className="w-full neumorphic-inset rounded-full px-6 py-4 text-sm font-bold text-slate-300 focus:outline-none transition-all border-none bg-transparent"
                  value={localConfig.phone}
                  onChange={(e) => setLocalConfig({...localConfig, phone: e.target.value})}
                />
              </div>
            </div>
          </GlassCard>

          {/* SEO Settings */}
          <GlassCard className="p-10 space-y-8 border-white/5">
            <h3 className="text-2xl font-black text-white border-b border-white/5 pb-6">SEO & Metadata</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-4">Global Title Suffix</label>
                <input 
                  type="text" 
                  className="w-full neumorphic-inset rounded-full px-6 py-4 text-sm font-bold text-slate-300 focus:outline-none transition-all border-none bg-transparent"
                  value={localConfig.seoTitleSuffix}
                  onChange={(e) => setLocalConfig({...localConfig, seoTitleSuffix: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-4">Meta Keywords</label>
                <input 
                  type="text" 
                  className="w-full neumorphic-inset rounded-full px-6 py-4 text-sm font-bold text-slate-300 focus:outline-none transition-all border-none bg-transparent"
                  value={localConfig.seoKeywords}
                  onChange={(e) => setLocalConfig({...localConfig, seoKeywords: e.target.value})}
                />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const links = [
    { name: 'Overview', path: '/admin', icon: BarChart3 },
    { name: 'Staff Management', path: '/admin/users', icon: Users },
    { name: 'Patient Directory', path: '/admin/patients', icon: ClipboardList },
    { name: 'Bed Logistics', path: '/admin/beds', icon: Bed },
    { name: 'System Logs', path: '/admin/logs', icon: Settings },
    { name: 'Configuration', path: '/admin/config', icon: Settings },
  ];

  return (
    <DashboardLayout sidebarLinks={links}>
      <Routes>
        <Route index element={<AdminHome />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="config" element={<ConfigManagement />} />
        <Route path="*" element={<div>Panel under development...</div>} />
      </Routes>
    </DashboardLayout>
  );
}
