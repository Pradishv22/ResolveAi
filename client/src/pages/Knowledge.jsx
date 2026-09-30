import React from 'react';
import { BookOpen, UploadCloud, FileText, Search, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

const SAMPLE_DOCS = [
  {
    id: 'DOC-101',
    title: 'Payment Gateway Architecture & Webhook Retry Runbook',
    type: 'Runbook',
    chunks: 14,
    lastIndexed: '2 hours ago',
    status: 'PUBLISHED'
  },
  {
    id: 'DOC-102',
    title: 'Enterprise SSO SAML 2.0 Identity Provider Configuration Guide',
    type: 'Guide',
    chunks: 28,
    lastIndexed: '1 day ago',
    status: 'PUBLISHED'
  },
  {
    id: 'DOC-103',
    title: 'PostgreSQL Read Replica Query Latency & Index Tuning Notes',
    type: 'Technical Doc',
    chunks: 9,
    lastIndexed: '3 days ago',
    status: 'PUBLISHED'
  }
];

export const Knowledge = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Knowledge Base & RAG Index</h2>
            <Badge variant="purple" size="xs">Phase 1 Preview</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage organizational documentation, runbooks, and vector chunk embeddings for grounded RAG synthesis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={UploadCloud}>
            Ingest Document
          </Button>
          <Button variant="primary" size="sm" icon={FileText}>
            New Article
          </Button>
        </div>
      </div>

      {/* Info Notice */}
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-purple-400 shrink-0" />
          <span>Document text extraction, chunking, embeddings, and MongoDB Atlas Vector Search will be activated in <strong>Phase 7 & Phase 8</strong>.</span>
        </div>
        <span className="font-mono text-slate-500">spec.md § 6.14 - § 6.15</span>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SAMPLE_DOCS.map((doc) => (
          <Card key={doc.id} className="p-5 flex flex-col justify-between" hover>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="purple" size="xs">{doc.type}</Badge>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {doc.status}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-200 line-clamp-2">{doc.title}</h3>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>{doc.chunks} vector chunks</span>
              <span>Indexed {doc.lastIndexed}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
