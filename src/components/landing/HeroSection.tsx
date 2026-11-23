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
  Check,
} from 'lucide-react';
import { ClaimBadge } from '../common/Badge';
import { LiveNetworkBackground } from './LiveNetworkBackground';

export const HeroSection: React.FC = () => {
  const [activePreviewClaim, setActivePreviewClaim] = useState<number>(1);
  const [activeHeroCardClaim, setActiveHeroCardClaim] = useState<number>(0);

  // Claims for the Illustrative Claim Check Card in the Hero right column
  const heroCardClaims = [
    {
      id: 0,
      text: 'Council approved bus route funding in March.',
      status: 'verified' as const,
      section: 'S4',
      score: 0.94,
      scorePercent: '94%',
      barColor: 'bg-emerald-500 dark:bg-emerald-400',
      badgeBg: 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-950/60 dark:text-emerald-300',
      quote: 'Section 4.2: In March 2024, the municipal council unanimously passed Resolution 142 granting £12.5M for city bus network modernization.',
      rationale: 'Fully supported by official council minutes (Para 4).',
    },
    {
      id: 1,
      text: 'Residents have two months to object.',
      status: 'needs_review' as const,
      section: 'S11',
      score: 0.42,
      scorePercent: '42%',
      barColor: 'bg-amber-500 dark:bg-amber-400',
      badgeBg: 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-950/60 dark:text-amber-300',
      quote: 'Section 11.0: Statutory consultation timeline provides a window of 60 calendar days from publication for registered feedback.',
      rationale: 'Requires human legal review: "60 calendar days" may diverge from "two calendar months".',
    },
    {
      id: 2,
      text: 'Fares will increase by 15% starting next month.',
      status: 'contradicted' as const,
      section: 'S18',
      score: 0.08,
      scorePercent: '8%',
      barColor: 'bg-rose-500 dark:bg-rose-400',
      badgeBg: 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-500/40 dark:bg-rose-950/60 dark:text-rose-300',
      quote: 'Section 18.1: Passenger transit fares remain strictly frozen at 2023 rates through at least December 2025.',
      rationale: 'Direct contradiction: The source confirms fares are frozen, not increased.',
    },
  ];

  // Deep dive preview claims for the product preview below
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
    <section className="relative pt-8 pb-20 sm:pt-14 sm:pb-28 overflow-hidden">
      {/* Live Moving Particle Constellation & Radar Rings Background */}
      <LiveNetworkBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* 2-COLUMN SPLIT HERO SECTION (Responsive & Theme Adaptive) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 lg:mb-24">
          {/* Left Column (7 cols): Hero Headline, Descriptions & CTAs */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Hackathon Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80 shadow-md shadow-brand-500/5 dark:shadow-brand-950/50 backdrop-blur-md transition-colors">
              <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Public Document Summarisation Without Invented Facts</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] transition-colors">
              AI summaries with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-emerald-600 dark:from-brand-400 dark:via-indigo-300 dark:to-emerald-400">
                clarity you can verify.
              </span>
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-normal transition-colors">
              Turn lengthy public documents, legislation, and policies into verified summaries. Trace every sentence back to exact source text with automated hallucination detection.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/app/new"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 shadow-xl shadow-brand-600/30 hover:shadow-brand-500/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <span>Analyse a Document</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-slate-200 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/90 transition-colors shadow-sm"
              >
                <span>Explore How It Works</span>
                <ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              </a>
            </div>

            {/* Trust Points / Micro-Stats */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-200 dark:border-slate-800/80 max-w-lg transition-colors">
              <div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">100%</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">Evidence Grounded</div>
              </div>
              <div>
                <div className="text-lg font-bold text-brand-600 dark:text-brand-400 font-mono">3-Tier</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">NLI Verification</div>
              </div>
              <div>
                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-300 font-mono">Lead-3</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">Extractive Baseline</div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): The Interactive Illustrative Claim Check Card */}
          <div className="lg:col-span-5 relative">
            {/* Subtle card backdrop glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-500/15 via-emerald-500/15 to-purple-500/15 blur-xl opacity-70 -z-10" />

            <div className="rounded-2xl border border-slate-200/90 dark:border-indigo-500/30 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl shadow-xl shadow-slate-200/60 dark:shadow-2xl dark:shadow-indigo-950/80 overflow-hidden transition-colors">
              {/* Card Header */}
              <div className="p-4 bg-slate-50/90 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-slate-700 dark:text-slate-300">
                    Illustrative Claim Check
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200 dark:bg-brand-950/80 dark:text-brand-300 dark:border-brand-800/60 transition-colors">
                  Interactive Preview
                </span>
              </div>

              {/* Claims List */}
              <div className="p-4 space-y-3">
                {heroCardClaims.map((claim) => {
                  const isSelected = activeHeroCardClaim === claim.id;

                  return (
                    <div
                      key={claim.id}
                      onClick={() => setActiveHeroCardClaim(claim.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50/50 dark:bg-slate-800/80 shadow-sm'
                          : 'border-slate-200/80 dark:border-slate-800/90 bg-slate-50/60 dark:bg-slate-950/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/60 dark:hover:bg-slate-900/70'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug">
                          {claim.text}
                        </p>
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold font-mono whitespace-nowrap transition-colors ${claim.badgeBg}`}>
                          {claim.status === 'verified' && `Verified · ${claim.section}`}
                          {claim.status === 'needs_review' && `Needs review · ${claim.section}`}
                          {claim.status === 'contradicted' && `Contradicted · ${claim.section}`}
                        </span>
                      </div>

                      {/* Progress Bar & Numerical Score */}
                      <div className="flex items-center gap-2.5 pt-0.5">
                        <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                          <div
                            className={`h-full ${claim.barColor} rounded-full transition-all duration-700`}
                            style={{ width: claim.scorePercent }}
                          />
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 min-w-[32px] text-right">
                          {claim.score.toFixed(2)}
                        </span>
                      </div>

                      {/* Selected Claim Citation Drawer */}
                      {isSelected && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/60 space-y-1.5 animate-fadeIn">
                          <div className="text-[10px] font-mono text-brand-600 dark:text-brand-300 font-semibold flex items-center gap-1">
                            <FileText className="w-3 h-3 text-brand-500 dark:text-brand-400" />
                            <span>Source Evidence Citation</span>
                          </div>
                          <p className="text-[11px] font-serif italic text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950/80 p-2 rounded-lg border border-slate-200 dark:border-slate-800/80 leading-relaxed shadow-inner">
                            "{claim.quote}"
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                            {claim.rationale}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Card Footer note */}
              <div className="px-4 py-2.5 bg-slate-50/90 dark:bg-slate-950/90 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 transition-colors">
                <span>Click any claim to inspect source citation</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Grounded
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* THREE VALUE PROPOSITIONS (Glass Cards)                    */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 pb-16 border-t border-slate-200 dark:border-slate-800/80 text-left transition-colors">
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm flex items-start gap-3.5 shadow-sm transition-colors">
            <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex-shrink-0 border border-indigo-200 dark:border-indigo-900/60 shadow-inner">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Source-linked evidence
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Every claim is tied directly to exact quotes, paragraphs, and sections in the original source document.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm flex items-start gap-3.5 shadow-sm transition-colors">
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex-shrink-0 border border-emerald-200 dark:border-emerald-900/60 shadow-inner">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Claim-level verification
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Atomic proposition checking classifies every statement as Supported, Contradicted, or Needs Review.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm flex items-start gap-3.5 shadow-sm transition-colors">
            <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex-shrink-0 border border-purple-200 dark:border-purple-900/60 shadow-inner">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Transparent evaluation
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                ROUGE-1, ROUGE-2, and ROUGE-L overlap scores paired with strict factual consistency rates.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE WORKSPACE SHOWCASE (Split View Preview)       */}
        {/* ========================================================= */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-charcoal-900/90 backdrop-blur-md shadow-xl dark:shadow-2xl overflow-hidden max-w-5xl mx-auto text-left transition-colors">
          {/* Window Chrome Header */}
          <div className="p-3.5 bg-slate-100 dark:bg-charcoal-950/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              <span className="ml-2 text-xs font-mono text-slate-600 dark:text-slate-400">
                ClarityAI Workspace • UK_Clean_Power_2030_Whitepaper.pdf
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-900/50">
                Audit Active
              </span>
            </div>
          </div>

          {/* Interactive Split View Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 transition-colors">
            {/* Left Column: Summary & Interactive Claims (7 cols) */}
            <div className="lg:col-span-7 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Generated Abstractive Summary
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
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
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                        isSelected
                          ? claim.status === 'contradicted'
                            ? 'border-rose-400 bg-rose-50/80 ring-1 ring-rose-400 dark:border-rose-500 dark:bg-rose-950/30 dark:ring-rose-500'
                            : claim.status === 'needs_review'
                            ? 'border-amber-400 bg-amber-50/80 ring-1 ring-amber-400 dark:border-amber-500 dark:bg-amber-950/30 dark:ring-amber-500'
                            : 'border-emerald-400 bg-emerald-50/80 ring-1 ring-emerald-400 dark:border-emerald-500 dark:bg-emerald-950/30 dark:ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-charcoal-900/70 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <ClaimBadge status={claim.status} size="sm" />
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          Confidence: {claim.confidence}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug">
                        "{claim.text}"
                      </p>
                      {isSelected && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 font-mono">
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
            <div className="lg:col-span-5 p-6 bg-slate-50/90 dark:bg-charcoal-950/60 flex flex-col justify-between transition-colors">
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
                      ? 'bg-rose-50 border-rose-200 text-rose-950 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-100'
                      : previewClaims[activePreviewClaim].status === 'needs_review'
                      ? 'bg-amber-50 border-amber-200 text-amber-950 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-100'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-100'
                  }`}
                >
                  "{previewClaims[activePreviewClaim].quote}"
                </blockquote>
              </div>

              <div className="mt-6 p-3 rounded-xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 transition-colors">
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
