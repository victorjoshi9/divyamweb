import React from 'react';
import { cn } from '@/src/lib/utils';

interface NeumorphicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary',
  ...props 
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-blue-500/60",
    secondary: "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10",
    danger: "bg-red-600/20 text-red-400 border border-red-500/20 hover:bg-red-500/30"
  };

  return (
    <button 
      className={cn(
        "px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all duration-300 disabled:opacity-50 active:scale-95",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
