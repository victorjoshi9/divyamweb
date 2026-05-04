import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { fetchWithLoading } from '../lib/api';

import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  login: (mobile: string, opdNumber: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Here we would typically fetch the profile from our 'users' table
        // For now, mapping from metadata or session
        const metadata = session.user.user_metadata;
        setUser({
          id: session.user.id,
          role: (metadata.role as UserRole) || 'patient',
          name: metadata.name || session.user.email || 'User',
          mobile: session.user.phone || ''
        });
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const metadata = session.user.user_metadata;
        setUser({
          id: session.user.id,
          role: (metadata.role as UserRole) || 'patient',
          name: metadata.name || session.user.email || 'User',
          mobile: session.user.phone || ''
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (mobile: string, opdNumber: string) => {
    setIsLoading(true);
    try {
      const response = await fetchWithLoading('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, opdNumber }),
      });
      
      if (!response.ok) throw new Error('Login failed');
      
      const data = await response.json();
      setUser(data);
      localStorage.setItem('divyam_hospital_user', JSON.stringify(data));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
