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
  Check,
} from 'lucide-react';
import { ClaimBadge } from '../common/Badge';
import { LiveNetworkBackground } from './LiveNetworkBackground';

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
      {/* Live Moving Particle Constellation & Radar Rings Background */}
      <LiveNetworkBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Hackathon Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-950/70 text-brand-300 border border-brand-800/80 mb-6 shadow-lg shadow-brand-950/50 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            <span>Public Document Summarisation Without Invented Facts</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            AI summaries with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-emerald-400">
              clarity you can verify.
            </span>
          </h1>

          {/* Supporting text */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Turn lengthy public documents into concise summaries. Trace every important claim back to the original source and identify statements that need further review.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/app/new"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 shadow-xl shadow-brand-600/30 hover:shadow-brand-500/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <span>Analyse a Document</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-slate-700/80 bg-slate-900/80 backdrop-blur-md text-slate-200 hover:bg-slate-800/90 transition-colors shadow-sm"
            >
              <span>Explore How It Works</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Illustrative Claim Check Card (Exact matching feature from design image) */}
          <div className="mt-10 mx-auto max-w-lg p-5 rounded-2xl border border-indigo-500/25 bg-slate-900/85 backdrop-blur-md shadow-2xl shadow-indigo-950/60 text-left space-y-3.5">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold border-b border-slate-800/80 pb-2.5">
              <span>Illustrative Claim Check</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Verification
              </span>
            </div>

            {/* Item 1: Verified */}
            <div className="p-3.5 rounded-xl border border-slate-800/90 bg-slate-950/70 space-y-2">
              <p className="text-xs sm:text-sm font-medium text-slate-200 leading-snug">
                Council approved bus route funding in March.
              </p>
              <div className="flex items-center justify-between gap-3 text-xs pt-1">
                <span className="px-2 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-950/50 text-emerald-400 text-[11px] font-semibold whitespace-nowrap">
                  Verified · S4
                </span>
                <div className="flex-1 h-2 bg-slate-800/90 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full transition-all duration-1000" style={{ width: '94%' }} />
                </div>
                <span className="font-mono text-emerald-400 font-bold text-xs">0.94</span>
              </div>
            </div>

            {/* Item 2: Needs Review */}
            <div className="p-3.5 rounded-xl border border-slate-800/90 bg-slate-950/70 space-y-2">
              <p className="text-xs sm:text-sm font-medium text-slate-200 leading-snug">
                Residents have two months to object.
              </p>
              <div className="flex items-center justify-between gap-3 text-xs pt-1">
                <span className="px-2 py-0.5 rounded-full border border-amber-500/40 bg-amber-950/50 text-amber-400 text-[11px] font-semibold whitespace-nowrap">
                  Needs review · S11
                </span>
                <div className="flex-1 h-2 bg-slate-800/90 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full transition-all duration-1000" style={{ width: '42%' }} />
                </div>
                <span className="font-mono text-amber-400 font-bold text-xs">0.42</span>
              </div>
            </div>
          </div>

          {/* Three Value Propositions */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-800/70 text-left">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-indigo-950/70 text-indigo-400 flex-shrink-0 border border-indigo-900/50">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Source-linked evidence
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Every claim is tied directly to quotes and paragraphs in the original document.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-950/70 text-emerald-400 flex-shrink-0 border border-emerald-900/50">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Claim-level verification
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Atomic proposition check classifies assertions as Supported, Contradicted, or Needs Review.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-950/70 text-purple-400 flex-shrink-0 border border-purple-900/50">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Transparent evaluation
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  ROUGE metrics paired with factual consistency rates reveal true model reliability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sophisticated Product Preview */}
        <div className="rounded-2xl border border-slate-800/90 bg-charcoal-900/90 backdrop-blur-md shadow-2xl overflow-hidden max-w-5xl mx-auto">
          {/* Window Chrome Header */}
          <div className="p-3.5 bg-charcoal-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
              <span className="ml-2 text-xs font-mono text-slate-400">
                ClarityAI Workspace • UK_Clean_Power_2030_Whitepaper.pdf
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 font-semibold border border-emerald-900/50">
                Audit Active
              </span>
            </div>
          </div>

          {/* Interactive Split View Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {/* Left Column: Summary & Interactive Claims (7 cols) */}
            <div className="lg:col-span-7 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Generated Abstractive Summary
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
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
                            ? 'border-rose-500 bg-rose-950/30 ring-1 ring-rose-500'
                            : claim.status === 'needs_review'
                            ? 'border-amber-500 bg-amber-950/30 ring-1 ring-amber-500'
                            : 'border-emerald-500 bg-emerald-950/30 ring-1 ring-emerald-500'
                          : 'border-slate-800 bg-charcoal-900/70 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <ClaimBadge status={claim.status} size="sm" />
                        <span className="text-[11px] font-mono text-slate-400">
                          Confidence: {claim.confidence}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-200 leading-snug">
                        "{claim.text}"
                      </p>
                      {isSelected && (
                        <p className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800 font-mono">
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
                  className="text-xs font-semibold text-brand-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Open interactive document in workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Source Document Context (5 cols) */}
            <div className="lg:col-span-5 p-6 bg-charcoal-950/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-brand-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Source Evidence Context
                  </span>
                </div>

                <div className="text-xs text-slate-400 font-mono mb-2">
                  Matching citation: {previewClaims[activePreviewClaim].source}
                </div>

                <blockquote
                  className={`p-4 rounded-xl border italic font-serif text-xs leading-relaxed transition-all ${
                    previewClaims[activePreviewClaim].status === 'contradicted'
                      ? 'bg-rose-950/40 border-rose-900 text-rose-100'
                      : previewClaims[activePreviewClaim].status === 'needs_review'
                      ? 'bg-amber-950/40 border-amber-900 text-amber-100'
                      : 'bg-emerald-950/40 border-emerald-900 text-emerald-100'
                  }`}
                >
                  "{previewClaims[activePreviewClaim].quote}"
                </blockquote>
              </div>

              <div className="mt-6 p-3 rounded-xl bg-charcoal-900 border border-slate-800 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-200 block mb-0.5">
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
