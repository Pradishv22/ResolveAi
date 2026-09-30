import React from 'react';
import { cn } from '../../utils/cn';

export const LoadingSpinner = ({ size = 'md', className, text }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center p-6 gap-3', className)}>
      <div
        className={cn(
          'rounded-full animate-spin border-brand-500/20 border-t-brand-500',
          sizes[size]
        )}
      />
      {text && <p className="text-xs text-slate-400 animate-pulse">{text}</p>}
    </div>
  );
};
