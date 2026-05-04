import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Pill, ShoppingCart, History, Package } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { NeumorphicButton } from '../../components/ui/NeumorphicButton';

const PharmacyHome = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Pharmacy Unit</h1>
          <NeumorphicButton className="bg-blue-600 text-white shadow-blue-200">New Order</NeumorphicButton>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
            { label: 'Low Stock', value: '42', icon: Package, color: 'red' },
            { label: 'Pending Bills', value: '18', icon: ShoppingCart, color: 'orange' },
            { label: 'Total Revenue', value: '₹4.2k', icon: History, color: 'green' }
        ].map((item, i) => (
            <GlassCard key={i} className="p-6">
                <item.icon size={20} className={item.color === 'red' ? 'text-red-500' : item.color === 'orange' ? 'text-orange-500' : 'text-green-500'} />
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mt-2">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
            </GlassCard>
        ))}
      </div>

      <GlassCard className="p-8">
          <h3 className="text-lg font-bold mb-6">Recent Sales</h3>
          <div className="overflow-x-auto">
              <table className="w-full text-left">
                  <thead>
                      <tr className="text-xs uppercase text-gray-400 border-b border-gray-50">
                          <th className="pb-4 font-bold">Bill ID</th>
                          <th className="pb-4 font-bold">Patient</th>
                          <th className="pb-4 font-bold">Items</th>
                          <th className="pb-4 font-bold text-right">Amount</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                      {[
                          { id: '#PH-1024', name: 'Vikram Singh', items: 'Paracetamol, Cough Syrup', amt: '₹420' },
                          { id: '#PH-1025', name: 'Alka Devi', items: 'Amoxicillin, Multi-vitamins', amt: '₹1,120' }
                      ].map((sale, i) => (
                          <tr key={i} className="text-sm">
                              <td className="py-4 font-mono font-bold text-blue-600">{sale.id}</td>
                              <td className="py-4 font-bold">{sale.name}</td>
                              <td className="py-4 text-gray-400">{sale.items}</td>
                              <td className="py-4 font-bold text-right">{sale.amt}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </GlassCard>
    </div>
  );

export default function PharmacyDashboard() {
  const links = [
    { name: 'POS Billing', path: '/pharmacy', icon: Pill },
    { name: 'Inventory', path: '/pharmacy/stock', icon: Package },
    { name: 'Order History', path: '/pharmacy/history', icon: History },
  ];

  return (
    <DashboardLayout sidebarLinks={links}>
      <Routes>
        <Route index element={<PharmacyHome />} />
        <Route path="*" element={<div>Pharmacy feature panel...</div>} />
      </Routes>
    </DashboardLayout>
  );
}
