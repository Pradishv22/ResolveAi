import React from 'react';
import {
  Ticket,
  AlertTriangle,
  BrainCircuit,
  Database,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  GitBranch,
  Layers,
  Cpu
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { StatusPill } from '../components/common/StatusPill';
import { useHealth } from '../hooks/useHealth';

export const Dashboard = () => {
  const { healthData, isLoading } = useHealth();

  const metrics = [
    {
      label: 'Open Tickets',
      value: '24',
      change: '+12% today',
      icon: Ticket,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      label: 'Active Incidents',
      value: '3',
      change: '2 Critical (P1)',
      icon: AlertTriangle,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10'
    },
    {
      label: 'RAG Resolution Memory',
      value: '142',
      change: 'Verified solutions',
      icon: BrainCircuit,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    },
    {
      label: 'Backend API & DB',
      value: healthData?.status === 'healthy' ? 'Healthy' : 'Connecting...',
      change: `Uptime: ${healthData?.uptime || 0}s`,
      icon: Database,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    }
  ];

  const phases = [
    { num: 'PHASE 1', name: 'Project Foundation & Monorepo', status: 'In Progress / Active', current: true },
    { num: 'PHASE 2', name: 'MongoDB Models & Schemas', status: 'Pending', current: false },
    { num: 'PHASE 3', name: 'Authentication & RBAC', status: 'Pending', current: false },
    { num: 'PHASE 4', name: 'Ticket Management System', status: 'Pending', current: false },
    { num: 'PHASE 5-8', name: 'AI Layer, Embeddings & Vector Search', status: 'Pending', current: false },
    { num: 'PHASE 9-11', name: 'RAG Pipeline & Resolution Memory', status: 'Pending', current: false },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-500/30 bg-gradient-to-r from-brand-950/60 via-slate-900/90 to-slate-900/60 p-6 shadow-2xl backdrop-blur-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary" size="sm">
                <Sparkles className="w-3 h-3 mr-1" />
                ResolveAI Platform Core
              </Badge>
              <Badge variant="default" size="sm">
                Phase 1: Foundation
              </Badge>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              AI-Powered Incident & Customer Issue Resolution Platform
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Converting customer issues into structured, traceable, reusable incident-resolution workflows with grounded RAG and organizational resolution memory.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-right">
              <div className="text-[11px] text-slate-400 font-mono">Backend Service</div>
              <div className="text-sm font-bold text-emerald-400 font-mono flex items-center justify-end gap-1.5 mt-0.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                PORT 5000 ACTIVE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="p-4 relative overflow-hidden" hover>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400">{item.label}</p>
                  <p className="text-2xl font-bold text-slate-100 mt-1 tracking-tight">{item.value}</p>
                </div>
                <div className={`p-2.5 rounded-lg ${item.bg} ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs text-slate-400">
                <span className="font-mono">{item.change}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Architecture Workflow & Phase Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: End-to-End Product Contract Preview */}
        <Card className="lg:col-span-2 space-y-4">
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-400" />
                End-to-End Resolution Pipeline (spec.md Contract)
              </CardTitle>
              <CardDescription>
                How incoming customer issues are analyzed, matched with historical incidents, and recorded as organizational memory.
              </CardDescription>
            </div>
          </CardHeader>

          <div className="space-y-3 pt-1 font-mono text-xs">
            <div className="flex items-start gap-3 rounded-lg border border-slate-800/80 bg-slate-950/60 p-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-blue-500/20 text-blue-400 font-bold">1</div>
              <div className="flex-1">
                <div className="text-slate-200 font-semibold">Customer Ticket Creation & AI Classification</div>
                <p className="text-slate-400 font-sans text-xs mt-0.5">Ingests issue, infers category, priority, sentiment, and probable issue as structured JSON.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-slate-800/80 bg-slate-950/60 p-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-purple-500/20 text-purple-400 font-bold">2</div>
              <div className="flex-1">
                <div className="text-slate-200 font-semibold">Semantic Retrieval & Vector Search (MongoDB Atlas)</div>
                <p className="text-slate-400 font-sans text-xs mt-0.5">Generates text embeddings and searches historical incidents, tickets, and knowledge bases for Top-K similar cases.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-slate-800/80 bg-slate-950/60 p-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-500/20 text-emerald-400 font-bold">3</div>
              <div className="flex-1">
                <div className="text-slate-200 font-semibold">RAG Analysis & Evidence-Backed Recommendation</div>
                <p className="text-slate-400 font-sans text-xs mt-0.5">Synthesizes ground truth with explicit source citations and estimated confidence levels.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-slate-800/80 bg-slate-950/60 p-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-rose-500/20 text-rose-400 font-bold">4</div>
              <div className="flex-1">
                <div className="text-slate-200 font-semibold">Human Approval & Resolution Memory Learning</div>
                <p className="text-slate-400 font-sans text-xs mt-0.5">Engineers review, verify root cause, resolve, and persist verified solutions into organizational memory.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Right 1 Col: Development Roadmap & Phase Status */}
        <Card className="space-y-4">
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-brand-400" />
                Phase Roadmap
              </CardTitle>
              <CardDescription>
                Strict phased implementation progress
              </CardDescription>
            </div>
          </CardHeader>

          <div className="space-y-2.5">
            {phases.map((phase, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border text-xs transition-all ${
                  phase.current
                    ? 'border-brand-500/40 bg-brand-950/30'
                    : 'border-slate-800 bg-slate-950/40 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-300">{phase.num}</span>
                  <Badge variant={phase.current ? 'primary' : 'default'} size="xs">
                    {phase.status}
                  </Badge>
                </div>
                <p className="text-slate-300 font-medium mt-1">{phase.name}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
