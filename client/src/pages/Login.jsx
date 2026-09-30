import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Lock, Mail, ShieldAlert } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('agent@resolveai.internal');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Phase 1 navigation mockup
    navigate('/dashboard');
  };

  return (
    <Card className="border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 shadow-lg shadow-brand-600/30">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">ResolveAI</h2>
        <p className="text-xs text-slate-400 mt-1">
          AI-Powered Incident & Customer Issue Resolution
        </p>
      </div>

      <div className="mb-6 rounded-lg bg-brand-950/60 border border-brand-800/40 p-3 text-xs text-brand-300 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-brand-200">Phase 1 Foundation Mode:</span> Click sign in to access the workspace. Full JWT + RBAC authentication will be activated in Phase 3.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Work Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-slate-950 border border-slate-800 py-2 pl-9 pr-3 text-sm text-slate-200 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-slate-950 border border-slate-800 py-2 pl-9 pr-3 text-sm text-slate-200 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" variant="primary" className="w-full py-2.5">
            <span>Sign In to ResolveAI</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </form>

      <div className="mt-6 border-t border-slate-800/80 pt-4 text-center">
        <span className="text-xs text-slate-500 font-mono">ResolveAI Monorepo Architecture v1.0</span>
      </div>
    </Card>
  );
};
