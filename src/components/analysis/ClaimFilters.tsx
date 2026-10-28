import React from 'react';
import { Search, Filter } from 'lucide-react';
import { ClaimStatus } from '../../types';

interface ClaimFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: ClaimStatus | 'all';
  onStatusFilterChange: (status: ClaimStatus | 'all') => void;
  counts: {
    all: number;
    supported: number;
    contradicted: number;
    needs_review: number;
  };
}

export const ClaimFilters: React.FC<ClaimFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  counts,
}) => {
  const tabs = [
    { id: 'all', label: 'All Claims', count: counts.all, color: 'text-slate-700 dark:text-slate-300' },
    { id: 'supported', label: 'Supported', count: counts.supported, color: 'text-emerald-700 dark:text-emerald-400' },
    { id: 'contradicted', label: 'Contradicted', count: counts.contradicted, color: 'text-rose-700 dark:text-rose-400' },
    { id: 'needs_review', label: 'Needs Review', count: counts.needs_review, color: 'text-amber-700 dark:text-amber-400' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-charcoal-800/80 border border-slate-200 dark:border-slate-800 overflow-x-auto">
        {tabs.map(tab => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onStatusFilterChange(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-white dark:bg-charcoal-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? 'bg-slate-100 dark:bg-charcoal-800 text-slate-800 dark:text-slate-200'
                    : 'bg-slate-200/50 dark:bg-charcoal-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Claim Search Input */}
      <div className="relative w-full sm:w-64">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Filter claims by text..."
          className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>
    </div>
  );
};
