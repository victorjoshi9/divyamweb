import React from 'react';
import { cn } from '@/src/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, ...props }) => {
  return (
    <div 
      className={cn(
        "glass rounded-[32px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
