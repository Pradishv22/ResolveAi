import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Search, Bell, Activity, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { useHealth } from '../../hooks/useHealth';
import { Badge } from '../common/Badge';

export const TopNavigation = ({ onToggleSidebar }) => {
  const location = useLocation();
  const { healthData, isLoading, error } = useHealth();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return 'Dashboard Overview';
    if (path.startsWith('/tickets')) return 'Customer Support Tickets';
    if (path.startsWith('/incidents')) return 'Engineering Incidents';
    if (path.startsWith('/knowledge')) return 'Knowledge Base & RAG Index';
    if (path.startsWith('/analytics')) return 'Resolution Analytics';
    if (path.startsWith('/settings')) return 'System Settings';
    return 'ResolveAI';
  };

  const isDbConnected = healthData?.database?.isConnected;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-slate-200 lg:hidden"
          aria-label="Toggle Navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-base font-semibold text-slate-100 tracking-tight">{getPageTitle()}</h1>
          <Badge variant="primary" size="xs" className="hidden sm:inline-flex">
            Phase 1
          </Badge>
        </div>
      </div>

      {/* Center Search / Filter bar placeholder */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tickets, incidents, knowledge..."
            className="w-full rounded-lg bg-slate-900/90 border border-slate-800 py-1.5 pl-9 pr-8 text-xs text-slate-200 placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            disabled
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Action & Status Area */}
      <div className="flex items-center gap-3">
        {/* Backend / DB Status Indicator */}
        <div className="flex items-center gap-2 rounded-lg bg-slate-900/80 border border-slate-800 px-2.5 py-1 text-xs">
          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                error ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400'
              }`}
            />
            <span className="hidden sm:inline text-slate-300 font-mono text-[11px]">
              API: {error ? 'Offline' : 'Online'}
            </span>
          </div>

          <span className="text-slate-700">|</span>

          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            <Database className="w-3 h-3 text-slate-400" />
            <span className="hidden md:inline">
              DB: {isDbConnected ? 'Ready' : healthData?.database?.state || 'Standby'}
            </span>
          </div>
        </div>

        {/* Notifications Icon */}
        <button
          className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-slate-200"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" />
        </button>
      </div>
    </header>
  );
};
