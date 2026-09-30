import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ children, className, hover = false, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm',
        hover && 'transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-slate-900/50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className={cn('mb-4 flex items-center justify-between', className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 className={cn('text-base font-semibold text-slate-100', className)} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className, ...props }) => {
  return (
    <p className={cn('text-xs text-slate-400 mt-0.5', className)} {...props}>
      {children}
    </p>
  );
};
