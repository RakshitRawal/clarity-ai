import React, { useState } from 'react';
import { Trophy, Award, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export const CompetitionConfig: React.FC = () => {
  const [minConsistencyGate, setMinConsistencyGate] = useState<number>(85);
  const [rouge2Weight, setRouge2Weight] = useState<number>(60);
  const [factualWeight, setFactualWeight] = useState<number>(40);

  const competitionLeaderboard = [
    {
      rank: 1,
      model: 'ClarityAI Hybrid (Extractive-Guided Abstractive)',
      rouge2: 24.8,
      factualConsistency: 96.2,
      passedGate: true,
      competitionScore: 92.4,
      badge: 'Gold Medal',
    },
    {
      rank: 2,
      model: 'Constrained LexRank Ensemble (Pure Extractive)',
      rouge2: 20.4,
      factualConsistency: 98.4,
      passedGate: true,
      competitionScore: 89.1,
      badge: 'Silver Medal',
    },
    {
      rank: 3,
      model: 'Unconstrained Fine-Tuned LLaMA-3 8B (Abstractive)',
      rouge2: 28.1, // Highest ROUGE! But failed consistency gate!
      factualConsistency: 71.4,
      passedGate: false,
      competitionScore: 62.0,
      badge: 'Disqualified (Failed Gate)',
    },
    {
      rank: 4,
      model: 'Lead-3 Baseline',
      rouge2: 15.8,
      factualConsistency: 98.4,
      passedGate: true,
      competitionScore: 78.5,
      badge: 'Baseline',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Official Document Summarisation Competition Rules</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                Hackathon Standard
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Primary Competition Metric: <strong className="text-slate-700 dark:text-slate-200">ROUGE-2 F1</strong> combined with a strict <strong className="text-slate-700 dark:text-slate-200">Factual Consistency Gate</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Competition Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-charcoal-950/60 border border-slate-200/80 dark:border-slate-800 text-xs">
        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Factual Consistency Disqualification Gate
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="60"
              max="95"
              value={minConsistencyGate}
              onChange={e => setMinConsistencyGate(Number(e.target.value))}
              className="w-full accent-brand-600"
            />
            <span className="font-mono font-bold text-slate-900 dark:text-white w-10 text-right">
              {minConsistencyGate}%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Models below {minConsistencyGate}% factual accuracy are disqualified regardless of ROUGE.
          </p>
        </div>

        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            ROUGE-2 F1 Weighting
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="30"
              max="80"
              value={rouge2Weight}
              onChange={e => {
                const val = Number(e.target.value);
                setRouge2Weight(val);
                setFactualWeight(100 - val);
              }}
              className="w-full accent-brand-600"
            />
            <span className="font-mono font-bold text-slate-900 dark:text-white w-10 text-right">
              {rouge2Weight}%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Measures bi-gram summary overlap with reference.
          </p>
        </div>

        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Factual Consistency Weighting
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="20"
              max="70"
              value={factualWeight}
              onChange={e => {
                const val = Number(e.target.value);
                setFactualWeight(val);
                setRouge2Weight(100 - val);
              }}
              className="w-full accent-emerald-600"
            />
            <span className="font-mono font-bold text-slate-900 dark:text-white w-10 text-right">
              {factualWeight}%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Measures verified claim percentage against source.
          </p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/70 dark:bg-charcoal-800/60 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-3 pl-4">Rank</th>
              <th className="p-3">Model Architecture</th>
              <th className="p-3 font-bold text-brand-600 dark:text-brand-400">ROUGE-2 F1</th>
              <th className="p-3 font-bold text-emerald-600 dark:text-emerald-400">Factual Consistency</th>
              <th className="p-3">Gate Status (&ge; {minConsistencyGate}%)</th>
              <th className="p-3 font-bold text-slate-900 dark:text-white">Overall Index</th>
              <th className="p-3 pr-4">Award Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {competitionLeaderboard.map(item => {
              const passesGate = item.factualConsistency >= minConsistencyGate;

              return (
                <tr
                  key={item.model}
                  className={`hover:bg-slate-50 dark:hover:bg-charcoal-800/40 transition-colors ${
                    !passesGate ? 'opacity-60 bg-rose-50/20 dark:bg-rose-950/10' : ''
                  }`}
                >
                  <td className="p-3 pl-4 font-mono font-bold text-slate-900 dark:text-white">
                    #{item.rank}
                  </td>
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                    {item.model}
                  </td>
                  <td className="p-3 font-mono font-bold text-brand-600 dark:text-brand-400">
                    {item.rouge2}%
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {item.factualConsistency}%
                  </td>
                  <td className="p-3">
                    {passesGate ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Eligible</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Disqualified</span>
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">
                    {passesGate ? item.competitionScore : '0.0 (DQ)'}
                  </td>
                  <td className="p-3 pr-4 font-medium text-slate-600 dark:text-slate-300">
                    {item.badge}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
