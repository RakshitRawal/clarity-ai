import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  FileText,
  Sparkles,
  Layers,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { ClaimBadge } from '../common/Badge';

export const HeroSection: React.FC = () => {
  const [activePreviewClaim, setActivePreviewClaim] = useState<number>(1);

  const previewClaims = [
    {
      id: 0,
      text: 'The UK committed to 100% clean power by 2030 by expanding offshore wind to 55 GW.',
      status: 'supported' as const,
      confidence: '98%',
      quote: 'Great Britain must more than double its onshore wind capacity to 35 GW, quadruple offshore wind to 55 GW...',
      source: 'Section 1: Strategic Vision',
      note: 'Verified against paragraph 1.',
    },
    {
      id: 1,
      text: 'Public capital investment is set at £48 billion over five years for grid upgrades.',
      status: 'contradicted' as const,
      confidence: '96%',
      quote: 'The Secretary of State announces an allocated public capital commitment of £28 billion over five years...',
      source: 'Section 2: Capital Allocation',
      note: 'Numerical hallucination: Summary altered £28B to £48B.',
    },
    {
      id: 2,
      text: 'Hydrogen blending into domestic residential pipelines is mandated to commence in Q3 2027.',
      status: 'needs_review' as const,
      confidence: '84%',
      quote: 'blending hydrogen into domestic pipelines remains under experimental review and will not be mandated...',
      source: 'Section 4: Emerging Carriers',
      note: 'Unverified policy claim: Source states blending is non-mandatory.',
    },
  ];

  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-brand-600/15 via-violet-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Hackathon Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60 mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Public Document Summarisation Without Invented Facts</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            AI summaries with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-500 to-violet-500">
              clarity you can verify.
            </span>
          </h1>

          {/* Supporting text */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Turn lengthy public documents into concise summaries. Trace every important claim back to the original source and identify statements that need further review.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/app/new"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <span>Analyse a Document</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-charcoal-800 transition-colors shadow-sm"
            >
              <span>Explore How It Works</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Three Value Propositions */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200/60 dark:border-slate-800/80 text-left">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Source-linked evidence
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Every claim is tied directly to quotes and paragraphs in the original document.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Claim-level verification
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Atomic proposition check classifies assertions as Supported, Contradicted, or Needs Review.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex-shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Transparent evaluation
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  ROUGE metrics paired with factual consistency rates reveal true model reliability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sophisticated Product Preview */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 shadow-2xl overflow-hidden max-w-5xl mx-auto">
          {/* Window Chrome Header */}
          <div className="p-3.5 bg-slate-100 dark:bg-charcoal-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
              <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                ClarityAI Workspace • UK_Clean_Power_2030_Whitepaper.pdf
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                Audit Active
              </span>
            </div>
          </div>

          {/* Interactive Split View Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
            {/* Left Column: Summary & Interactive Claims (7 cols) */}
            <div className="lg:col-span-7 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Generated Abstractive Summary
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  5 Claims Analysed
                </span>
              </div>

              {/* Claims Clickable List */}
              <div className="space-y-2.5">
                {previewClaims.map(claim => {
                  const isSelected = activePreviewClaim === claim.id;

                  return (
                    <div
                      key={claim.id}
                      onClick={() => setActivePreviewClaim(claim.id)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? claim.status === 'contradicted'
                            ? 'border-rose-500 bg-rose-50/40 dark:bg-rose-950/20 ring-1 ring-rose-500'
                            : claim.status === 'needs_review'
                            ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/20 ring-1 ring-amber-500'
                            : 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 ring-1 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900/60 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <ClaimBadge status={claim.status} size="sm" />
                        <span className="text-[11px] font-mono text-slate-500">
                          Confidence: {claim.confidence}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug">
                        "{claim.text}"
                      </p>
                      {isSelected && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 font-mono">
                          {claim.note}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <Link
                  to="/app/overview"
                  className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Open interactive document in workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Source Document Context (5 cols) */}
            <div className="lg:col-span-5 p-6 bg-slate-50/60 dark:bg-charcoal-950/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Source Evidence Context
                  </span>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
                  Matching citation: {previewClaims[activePreviewClaim].source}
                </div>

                <blockquote
                  className={`p-4 rounded-xl border italic font-serif text-xs leading-relaxed transition-all ${
                    previewClaims[activePreviewClaim].status === 'contradicted'
                      ? 'bg-rose-100/70 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900 text-rose-950 dark:text-rose-100'
                      : previewClaims[activePreviewClaim].status === 'needs_review'
                      ? 'bg-amber-100/70 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900 text-amber-950 dark:text-amber-100'
                      : 'bg-emerald-100/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-900 text-emerald-950 dark:text-emerald-100'
                  }`}
                >
                  "{previewClaims[activePreviewClaim].quote}"
                </blockquote>
              </div>

              <div className="mt-6 p-3 rounded-xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                  Why Verification Matters
                </span>
                Large language models frequently alter quantities, dates, and legal scopes. ClarityAI highlights contradictions before summaries are published.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
