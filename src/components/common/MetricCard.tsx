import React, { useState, useEffect } from 'react';
import { Info, X, Calculator, ShieldCheck, CheckCircle2, AlertOctagon, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  status?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  definition?: string;
  calculation?: string;
  badge?: string;
  tooltipAlign?: 'left' | 'right' | 'center';
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
  tooltipAlign = 'left',
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    if (showModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

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

  const badgeColors = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    danger: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
    info: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300',
  };

  const getTooltipAlignClass = () => {
    if (tooltipAlign === 'right') return 'right-0';
    if (tooltipAlign === 'center') return 'left-1/2 -translate-x-1/2';
    return 'left-0';
  };

  return (
    <>
      <div
        className={`relative rounded-xl border p-3 sm:p-3.5 transition-all duration-200 shadow-card dark:shadow-card-dark min-w-0 flex flex-col justify-between overflow-visible ${statusStyles[status]}`}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-1.5 mb-1.5">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <span
              className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider leading-snug break-words"
              title={title}
            >
              {title}
            </span>

            {definition && (
              <div className="relative flex-shrink-0">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setShowModal(true);
                  }}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  aria-label={`Definition of ${title}`}
                  title="Click to view metric details and formula"
                  className="p-1 rounded-full text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-charcoal-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>

                {/* Desktop hover preview tooltip (never clips, positioned below button) */}
                {showTooltip && !showModal && (
                  <div
                    className={`absolute z-30 top-full mt-1.5 ${getTooltipAlignClass()} w-56 sm:w-64 p-2.5 bg-slate-900/95 dark:bg-navy-950/95 text-slate-100 text-[11px] rounded-lg shadow-xl border border-slate-700/80 pointer-events-none animate-fade-in backdrop-blur-sm`}
                  >
                    <p className="font-semibold text-white mb-0.5">{title}</p>
                    <p className="text-slate-300 leading-snug line-clamp-3">{definition}</p>
                    <p className="mt-1.5 text-[10px] text-brand-300 font-medium">Click info icon for full formula & rules</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {icon && <div className="text-slate-400 dark:text-slate-500 flex-shrink-0">{icon}</div>}
        </div>

        {/* Value and Badge */}
        <div className="flex items-baseline justify-between gap-1 mt-1 flex-wrap">
          <div className={`text-xl sm:text-2xl font-bold font-mono tracking-tight ${textColors[status]} truncate`}>
            {value}
          </div>
          {badge && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-charcoal-800 text-slate-600 dark:text-slate-300 whitespace-nowrap">
              {badge}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {subtitle}
          </p>
        )}
      </div>

      {/* Centered Modal Dialog when clicked — Guaranteed to NEVER go out of frame on any device */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-md bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 animate-scale-in text-left max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${badgeColors[status]} flex-shrink-0`}>
                  {icon || <Info className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                      Current Value: {value}
                    </span>
                    {badge && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColors[status]}`}>
                        {badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-charcoal-800 transition-colors focus:outline-none"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Definition Section */}
            {definition && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Plain-English Meaning
                </label>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-charcoal-950/60 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800/80">
                  {definition}
                </p>
              </div>
            )}

            {/* Calculation Section */}
            {calculation && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <Calculator className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                  <span>Mathematical & Algorithmic Formulation</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 dark:bg-navy-950 text-brand-300 font-mono text-xs border border-slate-800 break-words leading-relaxed">
                  {calculation}
                </div>
              </div>
            )}

            {/* Audit Rule Explanation */}
            <div className="p-3 rounded-xl bg-brand-50/70 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-900/40 text-xs text-brand-900 dark:text-brand-200 leading-relaxed">
              <strong>Official Public Document Rule:</strong> In high-stakes regulatory and legal documents, summaries must preserve 100% entity and numerical integrity. Factual consistency measures eliminate blind reliance on generative language models.
            </div>

            {/* Close Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
