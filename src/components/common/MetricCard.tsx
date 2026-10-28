import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  status?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  definition?: string;
  calculation?: string;
  badge?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  status = 'default',
  definition,
  calculation,
  badge,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const statusStyles = {
    default: 'border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900',
    success: 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20',
    warning: 'border-amber-200 dark:border-amber-800/60 bg-amber-50/40 dark:bg-amber-950/20',
    danger: 'border-rose-200 dark:border-rose-800/60 bg-rose-50/40 dark:bg-rose-950/20',
    info: 'border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/40 dark:bg-indigo-950/20',
  };

  const textColors = {
    default: 'text-slate-900 dark:text-slate-100',
    success: 'text-emerald-700 dark:text-emerald-400',
    warning: 'text-amber-700 dark:text-amber-400',
    danger: 'text-rose-700 dark:text-rose-400',
    info: 'text-indigo-700 dark:text-indigo-400',
  };

  return (
    <div
      className={`relative rounded-xl border p-4.5 transition-all duration-200 shadow-card dark:shadow-card-dark ${statusStyles[status]}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </span>
          {definition && (
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                aria-label={`Definition of ${title}`}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none"
              >
                <Info className="w-3.5 h-3.5" />
              </button>

              {showTooltip && (
                <div className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 dark:bg-navy-900 text-slate-100 text-xs rounded-lg shadow-xl border border-slate-700 pointer-events-none animate-fade-in">
                  <p className="font-medium text-white mb-1">{title}</p>
                  <p className="text-slate-300 mb-2 leading-relaxed">{definition}</p>
                  {calculation && (
                    <div className="pt-1.5 border-t border-slate-700/60 text-[11px] text-brand-300 font-mono">
                      Calculation: {calculation}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {icon && <div className="text-slate-400 dark:text-slate-500">{icon}</div>}
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <div className={`text-2xl font-bold tracking-tight ${textColors[status]}`}>
          {value}
        </div>
        {badge && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {badge}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};
