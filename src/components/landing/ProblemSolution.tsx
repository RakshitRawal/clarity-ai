import React from 'react';
import { AlertTriangle, CheckCircle2, AlertOctagon, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { ClaimBadge } from '../common/Badge';

export const ProblemSolution: React.FC = () => {
  const comparisonCards = [
    {
      title: 'Altered Quantities & Numbers',
      whyHappens: 'LLMs predict statistically likely token sequences rather than preserving mathematical constants.',
      sourcePassage: 'Treasury confirmed an allocated public capital commitment of £28 billion over five years to de-risk high-voltage links.',
      generatedClaim: 'Public capital investment is set at £48 billion over five years for grid upgrades.',
      status: 'contradicted' as const,
      evidenceText: 'Source states £28 billion. Model altered the figure by £20 billion ($26B USD discrepancy).',
    },
    {
      title: 'Inverted Policy Qualifications',
      whyHappens: 'Models drop nuanced subordinate clauses like "subject to safety testing" and declare policies mandatory.',
      sourcePassage: 'Domestic residential hydrogen blending remains under experimental review and will not be mandated until comprehensive testing concludes.',
      generatedClaim: 'Hydrogen blending into domestic residential pipelines is mandated to commence in Q3 2027.',
      status: 'contradicted' as const,
      evidenceText: 'Source specifically asserts blending will NOT be mandated. Model flipped prohibition into a requirement.',
    },
    {
      title: 'Premature Generalisation',
      whyHappens: 'Generative summarisers aggregate regional pilots into sweeping nationwide conclusions without evidence.',
      sourcePassage: 'Decentralized ambient-temperature sequencing will be pre-positioned across 65 priority regional sentinel hospital sites.',
      generatedClaim: 'WHO mandates ambient genomic sequencing equipment across all global municipal hospitals.',
      status: 'needs_review' as const,
      evidenceText: 'Source specifies 65 priority regional sentinel hospitals, not universal municipal hospital coverage.',
    },
  ];

  return (
    <section id="product" className="py-20 sm:py-28 bg-slate-100/60 dark:bg-charcoal-950/60 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            The Hallucination Problem In Public Documents
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
            Why Standard AI Summaries Break Down
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Public governance reports, statutory whitepapers, and financial disclosures demand uncompromising fidelity. Standard LLMs sound remarkably authoritative, but silently invent numbers, drop qualifications, and extrapolate nonexistent conclusions.
          </p>
        </div>

        {/* 3 Before-and-After Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparisonCards.map((card, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 p-6 flex flex-col justify-between shadow-sm space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {card.title}
                  </h3>
                  <ClaimBadge status={card.status} size="sm" />
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {card.whyHappens}
                </p>

                {/* 1. Original Source Passage */}
                <div className="space-y-1 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    1. Original Source Passage
                  </span>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-charcoal-950/70 border border-slate-200/80 dark:border-slate-800 text-xs font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                    "{card.sourcePassage}"
                  </div>
                </div>

                {/* 2. Generated Summary Claim */}
                <div className="space-y-1 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    2. Generated Summary Claim
                  </span>
                  <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-900/40 text-xs font-medium text-rose-900 dark:text-rose-200 leading-relaxed">
                    "{card.generatedClaim}"
                  </div>
                </div>

                {/* 3. ClarityAI Verification Finding */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    3. ClarityAI Evidence Finding
                  </span>
                  <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed">
                    {card.evidenceText}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Verification: Systematic n-gram & entity check</span>
                <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
