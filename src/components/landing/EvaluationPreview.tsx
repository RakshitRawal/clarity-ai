import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { MetricCard } from '../common/MetricCard';

export const EvaluationPreview: React.FC = () => {
  return (
    <section id="evaluation" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 mb-4">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Illustrative Demo Evaluation Metrics (GovReport Subset)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
            Transparent Evaluation Benchmarks
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            We evaluate models on both traditional n-gram overlap (ROUGE) and factual consistency. These illustrative sample metrics illustrate the typical performance trade-offs observed across long-form public governance whitepapers.
          </p>
        </div>

        {/* Demo Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          <MetricCard
            title="ROUGE-1 F1"
            value="44.8%"
            status="info"
            definition="Unigram overlap between generated summary and human reference summary."
            badge="Illustrative Demo"
          />
          <MetricCard
            title="ROUGE-2 F1"
            value="20.4%"
            status="info"
            definition="Bi-gram overlap (primary competition evaluation metric)."
            badge="Competition Metric"
          />
          <MetricCard
            title="ROUGE-L F1"
            value="39.8%"
            status="info"
            definition="Longest common subsequence overlap."
            badge="Fluency Measure"
          />
          <MetricCard
            title="Factual Rate"
            value="96.8%"
            status="success"
            definition="Percentage of assertions verified as factually supported by source text."
            badge="Extractive Mode"
          />
          <MetricCard
            title="Supported"
            value="968"
            status="success"
            definition="Total verified claims matching source text."
          />
          <MetricCard
            title="Contradicted"
            value="32"
            status="danger"
            definition="Statements containing altered statistics or inverted facts."
          />
          <MetricCard
            title="Needs Review"
            value="18"
            status="warning"
            definition="Ambiguous statements flagged for human expert audit."
          />
        </div>

        {/* Evaluation Lab CTA Banner */}
        <div className="rounded-2xl border border-brand-200 dark:border-brand-900/60 bg-brand-50/50 dark:bg-brand-950/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Explore the Interactive Evaluation Lab
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              Compare Lead-3, Extractive, and Abstractive methods head-to-head across GovReport, PubMed, and SEC filings. Adjust competition gates and export full benchmark CSVs.
            </p>
          </div>

          <Link
            to="/app/evaluation"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition-all flex-shrink-0"
          >
            <span>Launch Evaluation Lab</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
