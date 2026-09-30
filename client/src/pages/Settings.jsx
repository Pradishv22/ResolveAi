import React from 'react';
import { Settings as SettingsIcon, Sliders, Cpu, Key, Database, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">System Settings & AI Configuration</h2>
            <Badge variant="default" size="xs">Phase 1 Preview</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure LLM providers, embedding models, vector search thresholds, and security parameters.
          </p>
        </div>
      </div>

      {/* Info Notice */}
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-brand-400 shrink-0" />
          <span>Dynamic provider switching (Gemini / OpenAI), similarity thresholds, and RBAC policies will be activated in <strong>Phase 5 & Phase 15</strong>.</span>
        </div>
        <span className="font-mono text-slate-500">spec.md § 7.1 & AGENTS.md § 5</span>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LLM & AI Provider Settings */}
        <Card className="space-y-4">
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-brand-400" />
                AI & LLM Configuration
              </CardTitle>
              <CardDescription>
                Abstracted provider layer supporting Gemini and OpenAI
              </CardDescription>
            </div>
          </CardHeader>

          <div className="space-y-3 text-xs">
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Active LLM Provider</div>
                <p className="text-slate-400 text-[11px]">Primary generative engine for classification and RAG</p>
              </div>
              <Badge variant="primary" size="sm">Google Gemini</Badge>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Embedding Model</div>
                <p className="text-slate-400 text-[11px]">High-dimensional vector embedding model</p>
              </div>
              <span className="font-mono text-slate-300 text-[11px]">text-embedding-004</span>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Similarity Top-K Default</div>
                <p className="text-slate-400 text-[11px]">Documents retrieved per RAG inquiry</p>
              </div>
              <span className="font-mono text-slate-300 text-[11px]">K = 5</span>
            </div>
          </div>
        </Card>

        {/* Database & Infrastructure Settings */}
        <Card className="space-y-4">
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                Database & Vector Storage
              </CardTitle>
              <CardDescription>
                MongoDB Atlas cluster and vector search index configuration
              </CardDescription>
            </div>
          </CardHeader>

          <div className="space-y-3 text-xs">
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Database Engine</div>
                <p className="text-slate-400 text-[11px]">Primary operational datastore</p>
              </div>
              <span className="font-mono text-slate-300 text-[11px]">MongoDB Atlas</span>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Vector Search Index</div>
                <p className="text-slate-400 text-[11px]">Cosine distance index for embeddings</p>
              </div>
              <span className="font-mono text-slate-300 text-[11px]">vector_index</span>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Environment Credentials</div>
                <p className="text-slate-400 text-[11px]">Configured securely via server .env</p>
              </div>
              <Badge variant="success" size="xs">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Isolated
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
