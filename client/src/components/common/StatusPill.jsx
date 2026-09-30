import React from 'react';
import { cn } from '../../utils/cn';

export const StatusPill = ({ status, type = 'status' }) => {
  const getStyles = () => {
    switch (status?.toUpperCase()) {
      // Ticket & Incident Statuses
      case 'OPEN':
      case 'DETECTED':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30 ring-blue-500/20';
      case 'IN_PROGRESS':
      case 'INVESTIGATING':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30 ring-amber-500/20';
      case 'WAITING_FOR_CUSTOMER':
      case 'IDENTIFIED':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30 ring-purple-500/20';
      case 'ESCALATED':
      case 'FIX_IN_PROGRESS':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30 ring-orange-500/20';
      case 'RESOLVED':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 ring-emerald-500/20';
      case 'CLOSED':
      case 'POSTMORTEM':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30 ring-slate-500/20';
      
      // Priorities & Severities
      case 'CRITICAL':
      case 'P1':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30 font-semibold';
      case 'HIGH':
      case 'P2':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30 font-medium';
      case 'MEDIUM':
      case 'P3':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'LOW':
      case 'P4':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';

      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs border tracking-wide uppercase font-mono',
        getStyles()
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status?.replace(/_/g, ' ')}
    </span>
  );
};
