import React from 'react';
import { AlertOctagon, Flame, ShieldAlert, CheckCircle2, Search, ArrowRight, UserCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { StatusPill } from '../components/common/StatusPill';

const SAMPLE_INCIDENTS = [
  {
    id: 'INC-342',
    title: 'Payment Gateway Webhook Worker Starvation',
    severity: 'P1',
    status: 'INVESTIGATING',
    impact: '23 customer tickets linked',
    probableCause: 'Redis stream partition blocking consumer group',
    leadEngineer: 'Elena Rostova',
    timeElapsed: '45 mins'
  },
  {
    id: 'INC-341',
    title: 'OAuth2 Token Renewal Spike on Mobile Client 4.2',
    severity: 'P2',
    status: 'IDENTIFIED',
    impact: '8 customer tickets linked',
    probableCause: 'Premature refresh token invalidation in iOS release',
    leadEngineer: 'Marcus Vance',
    timeElapsed: '3 hours'
  }
];

export const Incidents = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Engineering Incidents</h2>
            <Badge variant="danger" size="xs">Phase 1 Preview</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track escalated technical incidents, investigate root causes, and publish verified resolutions into organizational memory.
          </p>
        </div>

        <Button variant="danger" size="sm" icon={Flame}>
          Declare Incident
        </Button>
      </div>

      {/* Info Notice */}
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Incident lifecycle workflows, root cause analysis, and resolution memory will be activated in <strong>Phase 10 & Phase 11</strong>.</span>
        </div>
        <span className="font-mono text-slate-500">spec.md § 6.10 - § 6.12</span>
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {SAMPLE_INCIDENTS.map((inc) => (
          <Card key={inc.id} className="p-5" hover>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-rose-400 text-sm">{inc.id}</span>
                  <StatusPill status={inc.severity} />
                  <StatusPill status={inc.status} />
                  <span className="text-xs text-slate-500 font-mono">Elapsed: {inc.timeElapsed}</span>
                </div>

                <h3 className="text-base font-semibold text-slate-100">{inc.title}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-slate-500">Probable Root Cause:</span>
                    <span className="font-medium text-slate-200">{inc.probableCause}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-slate-500">Customer Impact:</span>
                    <span className="font-medium text-amber-400">{inc.impact}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 lg:border-l lg:border-slate-800 lg:pl-6">
                <div className="text-right hidden sm:block">
                  <div className="text-[11px] text-slate-500">Lead Engineer</div>
                  <div className="text-xs font-semibold text-slate-200">{inc.leadEngineer}</div>
                </div>
                <Button variant="secondary" size="sm" icon={ArrowRight}>
                  Investigate
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
