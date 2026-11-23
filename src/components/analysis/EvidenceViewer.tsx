import React, { useEffect, useRef, useState } from 'react';
import { Search, Copy, Check, FileText, Compass, ExternalLink } from 'lucide-react';
import { ClaimVerification } from '../../types';

interface EvidenceViewerProps {
  originalText: string;
  documentTitle: string;
  selectedClaim: ClaimVerification | null;
}

export const EvidenceViewer: React.FC<EvidenceViewerProps> = ({
  originalText,
  documentTitle,
  selectedClaim,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  const targetQuote = selectedClaim?.supportingPassage || selectedClaim?.conflictingPassage || '';

  // Auto-scroll to highlighted evidence within the local container only (never jumps the window)
  useEffect(() => {
    if (highlightRef.current && containerRef.current) {
      const container = containerRef.current;
      const highlight = highlightRef.current;
      const containerRect = container.getBoundingClientRect();
      const highlightRect = highlight.getBoundingClientRect();
      
      const relativeTop = highlightRect.top - containerRect.top + container.scrollTop;
      const targetScroll = relativeTop - container.clientHeight / 2 + highlightRect.height / 2;

      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    }
  }, [selectedClaim?.id, targetQuote]);

  const handleCopy = () => {
    navigator.clipboard.writeText(originalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to highlight matching quote in text
  const renderHighlightedContent = () => {
    if (!targetQuote && !searchTerm) {
      return (
        <div className="whitespace-pre-wrap break-words font-serif text-sm leading-relaxed text-slate-800 dark:text-slate-200">
          {originalText}
        </div>
      );
    }

    // Determine highlight target: search term takes priority or claim quote
    const highlightTarget = searchTerm.trim() || targetQuote.trim();
    if (!highlightTarget) {
      return (
        <div className="whitespace-pre-wrap break-words font-serif text-sm leading-relaxed text-slate-800 dark:text-slate-200">
          {originalText}
        </div>
      );
    }

    // Find quote loosely (first 30 characters if long)
    const normalizedTarget = highlightTarget.substring(0, 50).trim();
    const idx = originalText.toLowerCase().indexOf(normalizedTarget.toLowerCase());

    if (idx === -1) {
      return (
        <div className="whitespace-pre-wrap break-words font-serif text-sm leading-relaxed text-slate-800 dark:text-slate-200">
          {originalText}
        </div>
      );
    }

    // Approximate the full sentence or segment
    const endIdx = Math.min(originalText.length, idx + highlightTarget.length + 30);
    const before = originalText.substring(0, idx);
    const match = originalText.substring(idx, endIdx);
    const after = originalText.substring(endIdx);

    const highlightStyle =
      selectedClaim?.status === 'contradicted'
        ? 'bg-rose-200/80 dark:bg-rose-950/80 text-rose-950 dark:text-rose-100 ring-2 ring-rose-400'
        : selectedClaim?.status === 'needs_review'
        ? 'bg-amber-200/80 dark:bg-amber-950/80 text-amber-950 dark:text-amber-100 ring-2 ring-amber-400'
        : 'bg-emerald-200/80 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-400';

    return (
      <div className="whitespace-pre-wrap break-words font-serif text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        <span>{before}</span>
        <mark
          ref={highlightRef}
          className={`px-1.5 py-0.5 rounded transition-all duration-300 font-medium break-all ${highlightStyle}`}
        >
          {match}
        </mark>
        <span>{after}</span>
      </div>
    );
  };

  const wordCount = originalText.trim().split(/\s+/).length;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 shadow-sm flex flex-col h-full max-h-[750px] overflow-hidden min-w-0">
      {/* Top Header */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-charcoal-950/40 flex flex-wrap items-center justify-between gap-2.5 flex-shrink-0">
        <div className="min-w-0 max-w-[220px] sm:max-w-xs">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 truncate">
              Original Document Evidence
            </h3>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-charcoal-800 px-2 py-0.5 rounded flex-shrink-0">
              {wordCount} words
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5" title={documentTitle}>
            {documentTitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* In-document Search */}
          <div className="relative w-40 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Find in document..."
              className="w-full pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-charcoal-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>

          <button
            type="button"
            onClick={handleCopy}
            title="Copy original document text"
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-charcoal-800 text-slate-600 dark:text-slate-400 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Selected Claim Banner info */}
      {selectedClaim && targetQuote && (
        <div className="px-4 py-2 bg-indigo-50/60 dark:bg-indigo-950/30 border-b border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between text-xs text-indigo-900 dark:text-indigo-200 flex-shrink-0 animate-fade-in">
          <div className="flex items-center gap-2 truncate">
            <Compass className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            <span className="truncate">
              Highlighted evidence for: <span className="font-semibold">"{selectedClaim.claimText.substring(0, 45)}..."</span>
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded font-semibold flex-shrink-0">
            {selectedClaim.status}
          </span>
        </div>
      )}

      {/* Text Container with Scroll */}
      <div
        ref={containerRef}
        className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/30 dark:bg-charcoal-900/30 scroll-smooth"
      >
        {renderHighlightedContent()}
      </div>
    </div>
  );
};
