import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  FileSearch,
} from 'lucide-react';
import { ClaimVerification } from '../../types';
import { ClaimBadge } from '../common/Badge';

interface ClaimCardProps {
  claim: ClaimVerification;
  isSelected: boolean;
  onSelect: () => void;
  onInspectEvidence: () => void;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({
  claim,
  isSelected,
  onSelect,
  onInspectEvidence,
}) => {
  const [expanded, setExpanded] = useState(isSelected);

  // Sync expanded with isSelected
  React.useEffect(() => {
    if (isSelected) setExpanded(true);
  }, [isSelected]);

  const statusBorderColors = {
    supported: isSelected
      ? 'border-emerald-500 ring-2 ring-emerald-500/30'
      : 'border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800/80',
    contradicted: isSelected
      ? 'border-rose-500 ring-2 ring-rose-500/30'
      : 'border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-800/80',
    needs_review: isSelected
      ? 'border-amber-500 ring-2 ring-amber-500/30'
      : 'border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-800/80',
  };

  const statusBgColors = {
    supported: isSelected ? 'bg-emerald-50/20 dark:bg-emerald-950/20' : 'bg-white dark:bg-charcoal-900',
    contradicted: isSelected ? 'bg-rose-50/20 dark:bg-rose-950/20' : 'bg-white dark:bg-charcoal-900',
    needs_review: isSelected ? 'bg-amber-50/20 dark:bg-amber-950/20' : 'bg-white dark:bg-charcoal-900',
  };

  const evidencePassage = claim.supportingPassage || claim.conflictingPassage || '';
  const hasEvidence = !!evidencePassage;

  const cleanStr = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanClaim = cleanStr(claim.claimText);
  const cleanEvidence = cleanStr(evidencePassage);

  // Exact or near-identical verbatim match (e.g., Lead-3 or extractive summary)
  const isVerbatimMatch =
    claim.status === 'supported' &&
    cleanClaim.length > 0 &&
    (cleanClaim === cleanEvidence ||
      (Math.abs(cleanClaim.length - cleanEvidence.length) < 25 &&
        (cleanClaim.includes(cleanEvidence) || cleanEvidence.includes(cleanClaim))));

  return (
    <div
      onClick={onSelect}
      className={`rounded-xl border transition-all duration-200 shadow-sm cursor-pointer min-w-0 overflow-hidden ${
        statusBorderColors[claim.status]
      } ${statusBgColors[claim.status]}`}
    >
      {/* Header Row */}
      <div className="p-3.5 sm:p-4 flex items-start justify-between gap-3 min-w-0">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
            <ClaimBadge status={claim.status} size="sm" />

            <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-charcoal-800 px-2 py-0.5 rounded">
              Model Confidence: {(claim.confidenceScore * 100).toFixed(0)}%
            </span>

            {claim.sourceLocation?.section && (
              <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                • {claim.sourceLocation.section}
                {claim.sourceLocation.paragraph ? ` (Para ${claim.sourceLocation.paragraph})` : ''}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 leading-snug break-words">
            "{claim.claimText}"
          </p>
        </div>

        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          aria-label={expanded ? 'Collapse claim details' : 'Expand claim details'}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-charcoal-800 transition-colors flex-shrink-0"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Details Body */}
      {expanded && (
        <div className="px-3.5 sm:px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800/80 space-y-3 text-xs animate-fade-in min-w-0">
          {/* Explanation */}
          <div>
            <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400 block mb-1">
              Verification Analysis
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-charcoal-950/60 p-2.5 rounded-lg border border-slate-200/70 dark:border-slate-800 break-words">
              {claim.explanation}
            </p>
          </div>

          {/* Source Passage (Supporting or Conflicting) */}
          {hasEvidence && (
            <div>
              <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
                <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400">
                  {claim.status === 'supported' ? 'Supporting Source Evidence' : 'Conflicting Source Evidence'}
                </span>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    onInspectEvidence();
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <FileSearch className="w-3 h-3" />
                  <span>Inspect in Source Text</span>
                </button>
              </div>

              {isVerbatimMatch ? (
                <div className="p-3 rounded-lg border border-emerald-200/80 dark:border-emerald-800/50 bg-emerald-50/40 dark:bg-emerald-950/20 flex items-center justify-between gap-3 text-emerald-800 dark:text-emerald-300">
                  <div className="flex items-center gap-2 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-[11px] font-medium leading-relaxed">
                      <strong>Exact Verbatim Match:</strong> This claim is extracted directly word-for-word from the original source text ({claim.sourceLocation?.section || 'Overview'}{claim.sourceLocation?.paragraph ? `, Para ${claim.sourceLocation.paragraph}` : ''}).
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      onInspectEvidence();
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 hover:underline flex-shrink-0"
                  >
                    <span>Highlight</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <blockquote className={`p-2.5 rounded-lg border italic font-serif leading-relaxed text-slate-800 dark:text-slate-200 break-words ${
                  claim.status === 'supported'
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-800/50'
                    : claim.status === 'contradicted'
                    ? 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200/80 dark:border-rose-800/50'
                    : 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-200/80 dark:border-amber-800/50'
                }`}>
                  "{evidencePassage}"
                </blockquote>
              )}
            </div>
          )}

          {/* Model Disclaimer Note */}
          <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">
            Note: Verification score reflects algorithmic similarity and heuristic entity alignment, not an infallible legal determination.
          </p>
        </div>
      )}
    </div>
  );
};
