import React from 'react';
import { cn } from '../../utils/cn';

export const Badge = ({ children, variant = 'default', size = 'sm', className }) => {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    primary: 'bg-brand-950/80 text-brand-400 border-brand-800/60',
    success: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
    warning: 'bg-amber-950/80 text-amber-400 border-amber-800/60',
    danger: 'bg-rose-950/80 text-rose-400 border-rose-800/60',
    purple: 'bg-purple-950/80 text-purple-400 border-purple-800/60',
    cyan: 'bg-cyan-950/80 text-cyan-400 border-cyan-800/60'
  };

  const sizes = {
    xs: 'text-[10px] px-1.5 py-0.5 font-medium',
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-sm px-2.5 py-1 font-semibold'
  };

  return (
    <span className={cn('inline-flex items-center rounded-full border', variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
};
