import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="max-w-md text-center p-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-brand-400">
          <HelpCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Page Not Found</h2>
        <p className="text-xs text-slate-400 mt-2 mb-6">
          The page or resource you requested does not exist in ResolveAI workspace.
        </p>
        <Link to="/dashboard">
          <Button variant="primary" size="sm" icon={ArrowLeft}>
            Return to Dashboard
          </Button>
        </Link>
      </Card>
    </div>
  );
};
