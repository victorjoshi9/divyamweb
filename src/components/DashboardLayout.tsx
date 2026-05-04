import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserRound, ClipboardList, Beaker, Pill, Bed, Settings, LogOut, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { HOSPITAL_NAME } from '../constants';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarLinks: { name: string; path: string; icon: React.ElementType }[];
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, sidebarLinks }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-transparent overflow-hidden p-6 gap-6 relative">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-300/20 rounded-full blur-3xl -z-10" />

      {/* Sidebar */}
      <aside className="w-[280px] glass-heavy rounded-[2rem] flex flex-col h-full overflow-y-auto border-white/5">
        <div className="p-8 pb-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-rose-500 rounded-2xl text-white shadow-lg shadow-blue-900/40">
              <LayoutDashboard size={24} />
            </div>
            <span className="text-xl font-black tracking-tight text-white leading-none">
              Divyam <br /> <span className="text-xs uppercase text-blue-400 font-bold tracking-widest">Portal</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-6 mt-8 space-y-2">
          <div className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 mb-4">Main Menu</div>
          {sidebarLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-semibold ${
                location.pathname === link.path 
                  ? 'bg-white/10 text-white shadow-[0_4px_20px_rgba(0,0,0,0.2)]' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <link.icon size={20} strokeWidth={2.5} />
              <span className="text-sm">{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-4 flex items-center gap-3 border border-white/5 shadow-inner">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-950 to-slate-900 flex items-center justify-center text-blue-400 font-black text-lg shadow-inner">
              {user?.name?.[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user?.name}</p>
              <p className="text-[11px] text-blue-400 font-bold capitalize tracking-wide">{user?.role?.replace('_', ' ')}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm text-rose-500 bg-rose-500/10 hover:bg-rose-500 hover:text-white rounded-2xl transition-all font-bold"
          >
            <LogOut size={18} strokeWidth={2.5} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 glass-heavy rounded-[2rem] overflow-y-auto p-10 relative">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
