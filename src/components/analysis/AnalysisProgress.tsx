import React from 'react';
import { CheckCircle2, Circle, Loader2, XCircle } from 'lucide-react';

interface AnalysisProgressProps {
  currentStage: number; // 1 to 5
  stageLabel: string;
  onCancel: () => void;
}

const STAGES = [
  { step: 1, title: 'Extracting text', desc: 'Parsing structure, paragraphs, and sections' },
  { step: 2, title: 'Generating summary', desc: 'Applying selected summarisation method' },
  { step: 3, title: 'Finding source evidence', desc: 'Retrieving relevant candidate document spans' },
  { step: 4, title: 'Verifying claims', desc: 'Checking semantic alignment, entities, and polarities' },
  { step: 5, title: 'Calculating metrics', desc: 'Evaluating factual consistency & ROUGE benchmarks' },
];

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({
  currentStage,
  stageLabel,
  onCancel,
}) => {
  const percent = Math.min(100, Math.max(10, currentStage * 20));

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 p-6 sm:p-8 shadow-xl max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Loader2 className="w-5 h-5 text-brand-600 dark:text-brand-400 animate-spin" />
            <span>Analyzing Document</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Running multi-stage verification pipeline
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors flex items-center gap-1.5 border border-rose-200 dark:border-rose-900/60"
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>Cancel</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
          <span>Stage {currentStage} of 5</span>
          <span className="font-mono text-brand-600 dark:text-brand-400">{percent}% Complete</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-600 to-brand-500 transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Pipeline Steps List */}
      <div className="space-y-3.5 pt-2">
        {STAGES.map(s => {
          const isDone = currentStage > s.step;
          const isCurrent = currentStage === s.step;

          return (
            <div
              key={s.step}
              className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                isCurrent
                  ? 'bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60'
                  : 'bg-transparent'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-brand-600 dark:text-brand-400 animate-spin" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p
                    className={`text-xs font-bold ${
                      isCurrent
                        ? 'text-brand-900 dark:text-brand-200'
                        : isDone
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-400 dark:text-slate-600'
                    }`}
                  >
                    {s.step}. {s.title}
                  </p>
                  {isCurrent && (
                    <span className="text-[10px] font-mono text-brand-600 dark:text-brand-400 uppercase tracking-wider font-semibold">
                      In Progress
                    </span>
                  )}
                </div>
                <p
                  className={`text-[11px] mt-0.5 ${
                    isCurrent
                      ? 'text-brand-700/80 dark:text-brand-300/80'
                      : isDone
                      ? 'text-slate-500 dark:text-slate-400'
                      : 'text-slate-400/70 dark:text-slate-600'
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
