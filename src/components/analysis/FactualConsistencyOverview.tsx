import React from 'react';
import { ShieldCheck, CheckCircle2, AlertOctagon, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';
import { FactualConsistencyMetrics } from '../../types';
import { MetricCard } from '../common/MetricCard';

interface FactualConsistencyOverviewProps {
  metrics: FactualConsistencyMetrics;
}

export const FactualConsistencyOverview: React.FC<FactualConsistencyOverviewProps> = ({ metrics }) => {
  const getRateStatus = (rate: number) => {
    if (rate >= 90) return 'success';
    if (rate >= 60) return 'warning';
    return 'danger';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Factual Consistency & Audit Metrics
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Systematic claim-level verification against ground truth source evidence
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Metric 1: Consistency Rate */}
        <MetricCard
          title="Factual Consistency"
          value={`${metrics.consistencyRate}%`}
          status={getRateStatus(metrics.consistencyRate)}
          icon={<ShieldCheck className="w-4 h-4" />}
          definition="Proportion of extracted summary claims with verified semantic and entity agreement in the original document."
          calculation="(Supported Claims / Total Claims) × 100"
          badge={metrics.consistencyRate >= 80 ? 'High Fidelity' : 'Critical Discrepancies'}
        />

        {/* Metric 2: Total Claims */}
        <MetricCard
          title="Total Claims"
          value={metrics.totalClaims}
          status="default"
          icon={<Sparkles className="w-4 h-4" />}
          definition="Discrete atomic factual assertions decomposed from the generated summary."
          calculation="Atomic proposition segmentation"
        />

        {/* Metric 3: Supported Claims */}
        <MetricCard
          title="Supported"
          value={metrics.supportedClaims}
          status="success"
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          definition="Claims where numbers, dates, entities, and statements directly correspond to source text passages."
          calculation="Cosine & token entailment ≥ threshold"
        />

        {/* Metric 4: Contradicted Claims */}
        <MetricCard
          title="Contradicted"
          value={metrics.contradictedClaims}
          status="danger"
          icon={<AlertOctagon className="w-4 h-4 text-rose-500" />}
          definition="Claims that directly conflict with the source document through altered figures, inverted negation, or substituted entities."
          calculation="Direct polarity or numerical mismatch"
        />

        {/* Metric 5: Unverified Claims */}
        <MetricCard
          title="Needs Review"
          value={metrics.unverifiedClaims}
          status="warning"
          icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}
          definition="Claims with inconclusive source overlap. Important: Unverified claims are flagged for human review, not pre-judged as hallucinations."
          calculation="Ambiguous semantic context or partial match"
        />

        {/* Metric 6: Potential Hallucinations */}
        <MetricCard
          title="Hallucinations"
          value={metrics.potentialHallucinations}
          status={metrics.potentialHallucinations > 0 ? 'danger' : 'success'}
          icon={<AlertCircle className="w-4 h-4 text-rose-500" />}
          definition="Total high-risk statements exhibiting fabricated data, phantom entities, or ungrounded conclusions."
          calculation="Contradicted + Unverified High-Risk Claims"
        />
      </div>

      {/* Distinction callout alert */}
      <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-charcoal-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
        <span className="font-semibold text-slate-800 dark:text-slate-200 flex-shrink-0">
          Methodological Distinction:
        </span>
        <span className="leading-relaxed">
          ClarityAI treats unverified claims as prompts for human verification rather than confirmed falsehoods. Model confidence scores are probabilistic indications based on candidate text span retrieval, not definitive legal determinations.
        </span>
      </div>
    </div>
  );
};
