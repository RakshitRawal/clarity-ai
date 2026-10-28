import React from 'react';
import {
  Sparkles,
  Layers,
  FileText,
  Activity,
  Search,
  ShieldCheck,
  AlertTriangle,
  Award,
  Download,
  BarChart2,
} from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      title: 'AI-Powered Summarisation',
      description: 'Sophisticated document intelligence tailored for complex legal, health, and economic public texts.',
      icon: Sparkles,
      tag: 'Core Engine',
    },
    {
      title: 'Extractive Summarisation',
      description: 'Selects the most salient verbatim sentences using centrality scoring. Zero risk of generative hallucination.',
      icon: Layers,
      tag: '100% Faithful',
    },
    {
      title: 'Abstractive Summarisation',
      description: 'Generates fluent executive briefs while maintaining active claim-level supervision against original sources.',
      icon: Sparkles,
      tag: 'High Fluency',
    },
    {
      title: 'Lead-3 Baseline Comparison',
      description: 'Includes the standard heuristic baseline (first 3 sentences) to anchor empirical benchmark comparisons.',
      icon: FileText,
      tag: 'NLP Benchmark',
    },
    {
      title: 'Evidence Retrieval',
      description: 'Locates and highlights exact candidate source passages and page numbers for every generated assertion.',
      icon: Search,
      tag: 'Interactive Spans',
    },
    {
      title: 'Factual-Consistency Analysis',
      description: 'Calculates the overall consistency rate, distinguishing between supported, contradicted, and unverified statements.',
      icon: ShieldCheck,
      tag: 'Auditable Score',
    },
    {
      title: 'Hallucination Warnings',
      description: 'Detects altered numbers, entity substitutions, and inverted statutory mandates before publication.',
      icon: AlertTriangle,
      tag: 'Risk Mitigation',
    },
    {
      title: 'ROUGE Evaluation',
      description: 'Calculates genuine ROUGE-1, ROUGE-2, and ROUGE-L scores whenever an official reference summary is supplied.',
      icon: BarChart2,
      tag: 'Competition Standard',
    },
    {
      title: 'Downloadable Reports',
      description: 'Export complete factual verification audits in Markdown, formatted plain text, and structured JSON.',
      icon: Download,
      tag: 'Audit Ready',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-50 dark:bg-charcoal-950/40 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Comprehensive Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
            Built for High-Stakes Document Intelligence
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Every feature is designed to eliminate silent model hallucinations and guarantee auditability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 p-6 shadow-sm hover:shadow-md hover:border-brand-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 flex items-center justify-center text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-charcoal-800 text-slate-600 dark:text-slate-300 font-medium">
                      {f.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
