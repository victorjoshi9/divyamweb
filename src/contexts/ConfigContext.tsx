import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AppConfig {
  hospitalName: string;
  tagline: string;
  phone: string;
  emergencyPhone: string;
  address: string;
  stats: { label: string; value: string; icon: string }[];
  aiVisitorPrompt: string;
  aiPatientPrompt: string;
  aiAdminPrompt: string;
  seoTitleSuffix: string;
  seoKeywords: string;
}

const DEFAULT_CONFIG: AppConfig = {
  hospitalName: "Divyam Hospital",
  tagline: "MULTI-SPECIALITY HEALTHCARE",
  phone: "+91-9413912974",
  emergencyPhone: "+91-8197353157",
  address: "10-A Mahabalipuram, Nokha Road, Gangashahar, Bikaner, Rajasthan – 334401",
  stats: [
    { label: 'Happy Patients', value: '5,000+', icon: 'users' },
    { label: 'Specialists', value: '7+', icon: 'award' },
    { label: 'Emergency', value: '24/7', icon: 'clock' },
    { label: 'Avg Response', value: '8min', icon: 'zap' }
  ],
  aiVisitorPrompt: "You are a helpful assistant for Divyam Hospital in Bikaner...",
  aiPatientPrompt: "You are a patient care assistant...",
  aiAdminPrompt: "You are the central hospital management assistant...",
  seoTitleSuffix: " | Divyam Hospital Bikaner",
  seoKeywords: "hospital bikaner, gangashahar hospital, pediatrician bikaner, emergency hospital"
};

interface ConfigContextType {
  config: AppConfig;
  updateConfig: (newConfig: Partial<AppConfig>) => Promise<void>;
  isLoading: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('*')
          .single();

        if (error) {
          console.warn('Could not fetch remote config, using defaults:', error.message);
        } else if (data) {
          setConfig({ ...DEFAULT_CONFIG, ...data });
        }
      } catch (err) {
        console.error('Config fetch failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const updateConfig = async (newConfig: Partial<AppConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);

    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ id: 1, ...updated }); // Assuming singleton settings row

      if (error) throw error;
    } catch (err) {
      console.error('Failed to persist config to Supabase:', err);
      // Fallback: keeping local state is usually enough for the session
    }
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, isLoading }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error('useConfig must be used within a ConfigProvider');
  return context;
};
