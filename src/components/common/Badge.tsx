import React from 'react';
import { CheckCircle2, AlertOctagon, AlertTriangle, Layers, FileText, Cpu, Sparkles, Activity } from 'lucide-react';
import { ClaimStatus, SummarisationMethod } from '../../types';

interface ClaimBadgeProps {
  status: ClaimStatus;
  size?: 'sm' | 'md';
}

export const ClaimBadge: React.FC<ClaimBadgeProps> = ({ status, size = 'md' }) => {
  const configs = {
    supported: {
      label: 'Supported',
      icon: CheckCircle2,
      className:
        'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60',
      iconClass: 'text-emerald-600 dark:text-emerald-400',
    },
    contradicted: {
      label: 'Contradicted',
      icon: AlertOctagon,
      className:
        'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60',
      iconClass: 'text-rose-600 dark:text-rose-400',
    },
    needs_review: {
      label: 'Needs Review',
      icon: AlertTriangle,
      className:
        'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60',
      iconClass: 'text-amber-600 dark:text-amber-400',
    },
  };

  const current = configs[status];
  const Icon = current.icon;

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses} ${current.className} transition-colors select-none`}
    >
      <Icon className={`w-3.5 h-3.5 ${current.iconClass}`} aria-hidden="true" />
      <span>{current.label}</span>
    </span>
  );
};

export const MethodBadge: React.FC<{ method: SummarisationMethod; size?: 'sm' | 'md' }> = ({
  method,
  size = 'md',
}) => {
  const configs: Record<SummarisationMethod, { label: string; icon: any; className: string }> = {
    extractive: {
      label: 'Extractive (Salient sentences)',
      icon: Layers,
      className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    },
    abstractive: {
      label: 'Abstractive (Generative LLM)',
      icon: Sparkles,
      className: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
    },
    lead3: {
      label: 'Lead-3 Baseline',
      icon: FileText,
      className: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700',
    },
    compare_both: {
      label: 'Method Comparison',
      icon: Cpu,
      className: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
    },
  };

  const item = configs[method] || configs.extractive;
  const Icon = item.icon;
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border ${sizeClasses} ${item.className}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{item.label}</span>
    </span>
  );
};

export const DemoModeBadge: React.FC<{ isLive: boolean; onClick?: () => void }> = ({ isLive, onClick }) => {
  if (isLive) {
    return (
      <button
        type="button"
        onClick={onClick}
        title="Connected to live Python API backend"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Live Backend API</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      title="Currently running bundled offline demo evaluation mode. Click to configure live Python backend."
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors cursor-pointer"
    >
      <Activity className="w-3 h-3 text-indigo-500" />
      <span>Demo Mode (Bundled Data)</span>
    </button>
  );
};
