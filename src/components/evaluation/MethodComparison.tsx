import React, { useState } from 'react';
import { Download, AlertTriangle, CheckCircle, Info, ArrowRight, ShieldAlert, Sparkles, Layers, FileText } from 'lucide-react';
import { BenchmarkComparisonItem } from '../../types';

interface MethodComparisonProps {
  methods: BenchmarkComparisonItem[];
  datasetName: string;
}

export const MethodComparison: React.FC<MethodComparisonProps> = ({ methods, datasetName }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>(methods[0].method);

  const exportCSV = () => {
    const headers = ['Method', 'ROUGE-1', 'ROUGE-2', 'ROUGE-L', 'Factual Consistency (%)', 'Hallucination Rate (%)', 'Latency (ms)'];
    const rows = methods.map(m => [
      `"${m.method}"`,
      m.rouge1.toFixed(3),
      m.rouge2.toFixed(3),
      m.rougeL.toFixed(3),
      m.factualConsistency.toFixed(1),
      m.hallucinationRate.toFixed(1),
      m.averageLatencyMs,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clarity_ai_benchmark_${datasetName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({ dataset: datasetName, benchmarks: methods }, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `clarity_ai_benchmark_${datasetName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Benchmark Metric Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 dark:bg-charcoal-950/40">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Comparative Benchmark Metrics
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Tested on {datasetName} under uniform evaluation constraints
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-charcoal-800 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={exportJSON}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-charcoal-800 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-charcoal-800/60 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 pl-5">Method</th>
                <th className="p-3.5">ROUGE-1 F1</th>
                <th className="p-3.5 font-bold text-brand-600 dark:text-brand-400">ROUGE-2 F1 (Primary)</th>
                <th className="p-3.5">ROUGE-L F1</th>
                <th className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">Factual Consistency</th>
                <th className="p-3.5 text-rose-600 dark:text-rose-400">Hallucination Rate</th>
                <th className="p-3.5 pr-5">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {methods.map(m => (
                <tr
                  key={m.method}
                  className="hover:bg-slate-50 dark:hover:bg-charcoal-800/40 transition-colors cursor-pointer"
                  onClick={() => setSelectedMethod(m.method)}
                >
                  <td className="p-3.5 pl-5 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    {m.method.includes('Abstractive') ? (
                      <Sparkles className="w-4 h-4 text-purple-500" />
                    ) : m.method.includes('Extractive') ? (
                      <Layers className="w-4 h-4 text-blue-500" />
                    ) : (
                      <FileText className="w-4 h-4 text-slate-400" />
                    )}
                    <span>{m.method}</span>
                  </td>
                  <td className="p-3.5 font-mono">{(m.rouge1 * 100).toFixed(1)}%</td>
                  <td className="p-3.5 font-mono font-bold text-brand-600 dark:text-brand-400">
                    {(m.rouge2 * 100).toFixed(1)}%
                  </td>
                  <td className="p-3.5 font-mono">{(m.rougeL * 100).toFixed(1)}%</td>
                  <td className="p-3.5 font-mono font-bold">
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        m.factualConsistency >= 90
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {m.factualConsistency.toFixed(1)}%
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-rose-600 dark:text-rose-400">
                    {m.hallucinationRate.toFixed(1)}%
                  </td>
                  <td className="p-3.5 pr-5 font-mono text-slate-500">{m.averageLatencyMs} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Critical Methodology Insight */}
      <div className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 p-5 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 leading-relaxed">
          <h5 className="text-sm font-bold text-amber-950 dark:text-amber-100">
            Methodological Reality: High ROUGE Does Not Guarantee Factual Correctness
          </h5>
          <p>
            Standard n-gram recall metrics like ROUGE-2 reward surface lexical overlap with human references, but fail to penalize subtle numerical inversions (e.g. changing <strong>£28B</strong> to <strong>£48B</strong>) or reversed statutory mandates. In public document summarisation, an abstractive summary can achieve an impressive <strong>28.1% ROUGE-2 score</strong> while introducing severe hallucinated figures.
          </p>
        </div>
      </div>

      {/* Side-by-side Summary Inspection */}
      <div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
          Side-by-Side Summary Comparison
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {methods.map(m => {
            const isAbstractive = m.method.includes('Abstractive');
            const isExtractive = m.method.includes('Extractive');

            return (
              <div
                key={m.method}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 p-4 flex flex-col justify-between shadow-sm space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {m.method}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                        m.factualConsistency >= 90
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {m.factualConsistency}% Factual
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-serif bg-slate-50 dark:bg-charcoal-950/60 p-3 rounded-lg border border-slate-200/70 dark:border-slate-800 mb-3">
                    "{m.sampleSummary}"
                  </p>

                  {/* Strengths & Risks */}
                  <div className="space-y-2 text-[11px]">
                    <div>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                        Strengths:
                      </span>
                      <ul className="list-disc pl-4 text-slate-600 dark:text-slate-400 space-y-0.5">
                        {m.keyStrengths.map((str, idx) => (
                          <li key={idx}>{str}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-semibold text-rose-600 dark:text-rose-400 block mb-0.5">
                        Risks:
                      </span>
                      <ul className="list-disc pl-4 text-slate-600 dark:text-slate-400 space-y-0.5">
                        {m.keyRisks.map((risk, idx) => (
                          <li key={idx}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-[11px] text-slate-400">
                  <span>ROUGE-2: {(m.rouge2 * 100).toFixed(1)}%</span>
                  <span>Latency: {m.averageLatencyMs}ms</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
