import React, { useState } from 'react';
import {
  FlaskConical,
  Play,
  RotateCw,
  Trophy,
  BarChart2,
  FileText,
  Sparkles,
  Layers,
  Database,
  Info,
} from 'lucide-react';
import { DATASET_BENCHMARKS } from '../data/benchmarkData';
import { EvaluationChart } from '../components/evaluation/EvaluationChart';
import { MethodComparison } from '../components/evaluation/MethodComparison';
import { CompetitionConfig } from '../components/evaluation/CompetitionConfig';

export const EvaluationLabPage: React.FC = () => {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>(DATASET_BENCHMARKS[0].id);
  const [activeTab, setActiveTab] = useState<'methods' | 'competition'>('methods');
  const [isRunningEvaluation, setIsRunningEvaluation] = useState(false);
  const [evalProgress, setEvalProgress] = useState<number>(100);

  const selectedDataset =
    DATASET_BENCHMARKS.find(d => d.id === selectedDatasetId) || DATASET_BENCHMARKS[0];

  const handleRunEvaluation = () => {
    setIsRunningEvaluation(true);
    setEvalProgress(10);
    const interval = setInterval(() => {
      setEvalProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunningEvaluation(false);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
              Empirical Research & Verification Benchmarks
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 font-mono">
              Lead-3 vs Extractive vs Abstractive
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Evaluation Lab
          </h2>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleRunEvaluation}
          disabled={isRunningEvaluation}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all disabled:opacity-50"
        >
          {isRunningEvaluation ? (
            <RotateCw className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          <span>{isRunningEvaluation ? `Running Evaluation (${evalProgress}%)...` : 'Re-Run Evaluation'}</span>
        </button>
      </div>

      {/* Dataset Selector Bar */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Active Benchmark Corpus
            </label>
            <select
              value={selectedDatasetId}
              onChange={e => setSelectedDatasetId(e.target.value)}
              className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white bg-transparent border-none focus:ring-0 p-0 cursor-pointer"
            >
              {DATASET_BENCHMARKS.map(d => (
                <option key={d.id} value={d.id} className="dark:bg-charcoal-900">
                  {d.name} ({d.sampleCount} test documents)
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-charcoal-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('methods')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'methods'
                ? 'bg-white dark:bg-charcoal-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Methods Comparison
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('competition')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'competition'
                ? 'bg-white dark:bg-charcoal-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Competition Mode</span>
          </button>
        </div>
      </div>

      {/* Dataset Description Strip */}
      <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-charcoal-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {selectedDataset.description}
        </p>
      </div>

      {activeTab === 'methods' ? (
        <div className="space-y-6">
          {/* Recharts Bar Chart */}
          <EvaluationChart data={selectedDataset.methods} />

          {/* Full Comparison Table & Side-by-side Summaries */}
          <MethodComparison
            methods={selectedDataset.methods}
            datasetName={selectedDataset.name}
          />
        </div>
      ) : (
        <CompetitionConfig />
      )}
    </div>
  );
};
