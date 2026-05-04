import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ConfigProvider } from './contexts/ConfigContext';
import { LoadingBar } from './components/ui/LoadingBar';
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import LabDashboard from './pages/dashboards/LabDashboard';
import PharmacyDashboard from './pages/dashboards/PharmacyDashboard';
import IPDDashboard from './pages/dashboards/IPDDashboard';
import AIChatbot from './components/AIChatbot';
import Navbar from './components/Navbar';

const DashboardRedirect = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  switch (user.role) {
    case 'admin': return <Navigate to="/admin" />;
    case 'doctor': return <Navigate to="/doctor" />;
    case 'lab_technician': return <Navigate to="/lab" />;
    case 'pharmacist': return <Navigate to="/pharmacy" />;
    case 'patient': return <Navigate to="/patient" />;
    default: return <Navigate to="/" />;
  }
};

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <ConfigProvider>
        <BrowserRouter>
          <LoadingBar />
        <div className="min-h-screen bg-[#050B14] text-slate-100 font-sans selection:bg-blue-600/30 relative overflow-x-hidden">
          {/* Atmospheric Background Glows */}
          <div className="accent-glow top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px]"></div>
          <div className="accent-glow bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500/10 blur-[150px]"></div>
          
          <Navbar />
          <Suspense fallback={<div className="flex justify-center p-20 text-blue-600">Loading...</div>}>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<DashboardRedirect />} />
                <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/doctor/*" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorDashboard /></ProtectedRoute>} />
                <Route path="/patient/*" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
                <Route path="/lab/*" element={<ProtectedRoute allowedRoles={['lab_technician', 'admin']}><LabDashboard /></ProtectedRoute>} />
                <Route path="/pharmacy/*" element={<ProtectedRoute allowedRoles={['pharmacist', 'admin']}><PharmacyDashboard /></ProtectedRoute>} />
                <Route path="/ipd/*" element={<ProtectedRoute allowedRoles={['nurse', 'admin', 'doctor']}><IPDDashboard /></ProtectedRoute>} />
              </Routes>
            </main>
          </Suspense>
          <AIChatbot />
        </div>
      </BrowserRouter>
     </ConfigProvider>
    </AuthProvider>
  );
}
