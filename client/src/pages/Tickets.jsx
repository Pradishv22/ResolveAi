import React from 'react';
import { Ticket, Plus, Filter, Search, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { StatusPill } from '../components/common/StatusPill';

const SAMPLE_TICKETS = [
  {
    id: 'TCK-1082',
    title: 'Payment deducted via UPI but order remains in pending status',
    customer: 'Apex Logistics',
    category: 'PAYMENT',
    priority: 'HIGH',
    status: 'OPEN',
    confidence: '89%',
    probableIssue: 'Payment webhook processing delay',
    createdAt: '12 mins ago'
  },
  {
    id: 'TCK-1081',
    title: 'SSO SAML authentication loop on enterprise dashboard',
    customer: 'Nexus Corp',
    category: 'AUTHENTICATION',
    priority: 'CRITICAL',
    status: 'ESCALATED',
    confidence: '94%',
    probableIssue: 'SAML certificate thumbprint mismatch',
    createdAt: '34 mins ago'
  },
  {
    id: 'TCK-1080',
    title: 'CSV export timeout for accounts with >50k transactions',
    customer: 'FinTech Global',
    category: 'PERFORMANCE',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    confidence: '78%',
    probableIssue: 'Unindexed aggregate query memory limit',
    createdAt: '2 hours ago'
  }
];

export const Tickets = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Customer Support Tickets</h2>
            <Badge variant="primary" size="xs">Phase 1 Preview</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage incoming customer support tickets with automated AI classification and semantic retrieval.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Filter}>
            Filter
          </Button>
          <Button variant="primary" size="sm" icon={Plus}>
            New Ticket
          </Button>
        </div>
      </div>

      {/* Info Notice */}
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-400 shrink-0" />
          <span>Ticket lifecycle, CRUD mutations, and automated AI classification will be activated in <strong>Phase 4 & Phase 6</strong>.</span>
        </div>
        <span className="font-mono text-slate-500">spec.md § 6.2 & § 6.3</span>
      </div>

      {/* Tickets Table / List */}
      <Card className="p-0 overflow-hidden">
        <div className="border-b border-slate-800/80 bg-slate-950/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Filter tickets by title, customer, or ID..."
              className="w-full rounded-lg bg-slate-900 border border-slate-800 py-1.5 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
              disabled
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Showing 3 preview records</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800/80 bg-slate-950/60 font-semibold text-slate-400">
              <tr>
                <th className="px-4 py-3">Ticket</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">AI Probable Issue</th>
                <th className="px-4 py-3 text-right">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {SAMPLE_TICKETS.map((t) => (
                <tr key={t.id} className="hover:bg-slate-850/40 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-medium text-slate-200">{t.title}</div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="font-mono font-semibold text-brand-400">{t.id}</span>
                      <span>•</span>
                      <span>{t.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant="cyan" size="xs">{t.category}</Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusPill status={t.priority} />
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusPill status={t.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Sparkles className="w-3 h-3 text-brand-400 shrink-0" />
                      <span className="truncate max-w-xs">{t.probableIssue}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Confidence: {t.confidence}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-slate-400">
                    {t.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
