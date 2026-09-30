import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Ticket,
  AlertOctagon,
  BookOpen,
  BarChart3,
  Settings,
  Sparkles,
  ShieldCheck,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/tickets', label: 'Tickets', icon: Ticket, badge: '12' },
  { path: '/incidents', label: 'Incidents', icon: AlertOctagon, badge: '3', badgeColor: 'bg-rose-500/20 text-rose-300' },
  { path: '/knowledge', label: 'Knowledge Base', icon: BookOpen },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, switchRole } = useAuth();

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800/80 bg-slate-950/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-slate-800/80">
          <NavLink to="/dashboard" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 shadow-md shadow-brand-600/30 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-slate-100 tracking-tight">ResolveAI</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-none">Incident Resolution</p>
            </div>
          </NavLink>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Workspace
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-600/15 text-brand-400 border border-brand-500/30 shadow-sm'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-xs font-semibold',
                      item.badgeColor || 'bg-slate-800 text-slate-300'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Role Switcher & User Profile Footnote */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
          <div className="mb-2 px-1 flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-400" /> Active Role:
            </span>
            <select
              value={user?.role}
              onChange={(e) => switchRole(e.target.value)}
              className="bg-slate-800 text-slate-200 text-xs rounded px-1.5 py-0.5 border border-slate-700 focus:outline-none focus:border-brand-500 font-mono cursor-pointer"
            >
              <option value="SUPPORT_AGENT">SUPPORT_AGENT</option>
              <option value="ENGINEER">ENGINEER</option>
              <option value="MANAGER">MANAGER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/80 border border-slate-800/80">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-8 w-8 rounded-full ring-2 ring-brand-500/40 object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-200">{user?.name}</p>
              <p className="truncate text-[11px] text-slate-400 font-mono">{user?.role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
