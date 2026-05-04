import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('App mounting...', { 
  env: import.meta.env.MODE,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ? 'PRESENT' : 'MISSING'
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
