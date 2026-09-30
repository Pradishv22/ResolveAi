import React from 'react';
import { BarChart3, TrendingUp, Zap, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const Analytics = () => {
  const metrics = [
    { label: 'Mean Time to Resolution (MTTR)', value: '18 mins', change: '-42% vs manual triage', icon: Clock, color: 'text-emerald-400' },
    { label: 'AI Suggestion Acceptance', value: '84.2%', change: '+6.1% this month', icon: CheckCircle2, color: 'text-brand-400' },
    { label: 'Recurring Issue Detection', value: '92.6%', change: 'Precision@5 benchmark', icon: Zap, color: 'text-amber-400' },
    { label: 'Hallucination Mitigation', value: '0.0%', change: 'Strict RAG boundary check', icon: ShieldCheck, color: 'text-purple-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Resolution Analytics & AI Evaluation</h2>
            <Badge variant="cyan" size="xs">Phase 1 Preview</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry on incident resolution speeds, AI recommendation accuracy, and organizational memory reuse.
          </p>
        </div>
      </div>

      {/* Info Notice */}
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Real operational aggregations, token telemetry, and AI evaluation benchmarks will be activated in <strong>Phase 13 & Phase 14</strong>.</span>
        </div>
        <span className="font-mono text-slate-500">spec.md § 6.16 - § 6.17</span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Card key={idx} className="p-4" hover>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400">{m.label}</p>
                  <p className="text-2xl font-bold text-slate-100 mt-1 tracking-tight">{m.value}</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80">
                  <Icon className={`w-5 h-5 ${m.color}`} />
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs text-slate-400 font-mono">
                {m.change}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Analytics Chart Placeholder Card */}
      <Card className="p-6 text-center space-y-3">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
          <TrendingUp className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-200">Incident Volume & Auto-Resolution Trends</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Interactive time-series charts for weekly ticket load, resolution velocity, and AI model latency will render here upon database integration.
        </p>
      </Card>
    </div>
  );
};
