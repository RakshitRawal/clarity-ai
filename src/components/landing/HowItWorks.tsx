import React from 'react';
import { UploadCloud, Cpu, Sparkles, ShieldCheck, FileCheck2, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Upload a public document',
      description: 'Upload PDF, DOCX, or TXT documents, or paste text directly. ClarityAI validates document length and structure.',
      icon: UploadCloud,
    },
    {
      step: '02',
      title: 'Extract and process the text',
      description: 'The ingestion engine extracts paragraphs, section headings, numerical tables, and candidate sentence boundaries.',
      icon: Cpu,
    },
    {
      step: '03',
      title: 'Generate a concise summary',
      description: 'Produce an extractive, abstractive, or lead-3 summary matched to your target compression length.',
      icon: Sparkles,
    },
    {
      step: '04',
      title: 'Verify claims against source evidence',
      description: 'Every statement is segmented into atomic propositions and cross-referenced with exact source passages.',
      icon: ShieldCheck,
    },
    {
      step: '05',
      title: 'Review warnings and download report',
      description: 'Audit flagged contradictions and download a certified factual consistency report in Markdown or PDF.',
      icon: FileCheck2,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            End-To-End Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
            How ClarityAI Works
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            From raw administrative whitepapers to verifiable, citation-backed summaries in five transparent pipeline stages.
          </p>
        </div>

        {/* 5 Visually Connected Steps */}
        <div className="relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500/20 via-brand-500/60 to-brand-500/20 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((s, index) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 p-6 flex flex-col justify-between shadow-sm hover:border-brand-300 dark:hover:border-slate-700 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-slate-300 dark:text-slate-700 font-mono group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {s.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/70 flex items-center justify-center text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-400">
                    Stage {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
