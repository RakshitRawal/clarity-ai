import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Download, Layers, Sparkles, FileText, ChevronRight } from 'lucide-react';
import { DocumentSummary, SummarisationMethod } from '../../types';
import { MethodBadge } from '../common/Badge';

interface SummaryPanelProps {
  summary: DocumentSummary;
  documentTitle: string;
  activeMethod: SummarisationMethod;
  onMethodChange: (method: SummarisationMethod) => void;
  availableMethods: SummarisationMethod[];
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({
  summary,
  documentTitle,
  activeMethod,
  onMethodChange,
  availableMethods,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadDropdown, setDownloadDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDownloadDropdown(false);
      }
    };
    if (downloadDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [downloadDropdown]);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(summary.text);
      } else {
        // Fallback for non-secure or restricted contexts
        const textArea = document.createElement('textarea');
        textArea.value = summary.text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Clipboard write failed, using textarea fallback', err);
    }
  };

  const downloadFile = (format: 'txt' | 'md' | 'json') => {
    let content = '';
    let mimeType = 'text/plain';
    const filename = `${documentTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_summary.${format}`;

    if (format === 'txt') {
      content = `CLARITYAI FACTUAL SUMMARY\nDocument: ${documentTitle}\nMethod: ${summary.method}\nFactual Consistency: ${summary.metrics.factualConsistency.consistencyRate}%\n\n${summary.text}`;
    } else if (format === 'md') {
      content = `# Factual Summary: ${documentTitle}\n\n**Method:** ${summary.method}\n**Factual Consistency Rate:** ${summary.metrics.factualConsistency.consistencyRate}%\n**Word Count:** ${summary.wordCount} words\n**Compression:** ${(summary.compressionRatio * 100).toFixed(1)}%\n\n## Summary\n${summary.text}\n\n## Verified Claims\n` +
        summary.claims
          .map(c => `- **[${c.status.toUpperCase()}]** ${c.claimText}\n  *Confidence:* ${(c.confidenceScore * 100).toFixed(0)}%\n  *Evidence:* ${c.supportingPassage || c.conflictingPassage || 'None'}`)
          .join('\n\n');
      mimeType = 'text/markdown';
    } else {
      content = JSON.stringify({ documentTitle, summary }, null, 2);
      mimeType = 'application/json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadDropdown(false);
  };

  const methodLabels: Record<SummarisationMethod, string> = {
    abstractive: 'Abstractive',
    extractive: 'Extractive',
    lead3: 'Lead-3',
    compare_both: 'Compare Both',
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 shadow-sm overflow-hidden">
      {/* Header with Method Switcher & Metadata */}
      <div className="p-3.5 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 dark:bg-charcoal-950/40">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Generated Summary
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium truncate max-w-[200px] sm:max-w-md" title={documentTitle}>
              {documentTitle}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <MethodBadge method={summary.method} size="sm" />
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-charcoal-800 text-slate-600 dark:text-slate-300 font-mono whitespace-nowrap">
              {summary.wordCount} words
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-charcoal-800 text-slate-600 dark:text-slate-300 font-mono whitespace-nowrap">
              Compression: {(summary.compressionRatio * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Right side controls: Method Switcher + Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Method Switcher Buttons */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/60 dark:bg-charcoal-800 border border-slate-200 dark:border-slate-700">
            {(['abstractive', 'extractive', 'lead3'] as const).map(m => {
              const isSelected = activeMethod === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => onMethodChange(m)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all focus:outline-none ${
                    isSelected
                      ? 'bg-white dark:bg-charcoal-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200/70 dark:ring-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {methodLabels[m]}
                </button>
              );
            })}
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            title="Copy summary text to clipboard"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-charcoal-900 hover:bg-slate-50 dark:hover:bg-charcoal-800 text-slate-700 dark:text-slate-200 transition-colors shadow-sm focus:outline-none"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          {/* Download Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDownloadDropdown(!downloadDropdown)}
              title="Download summary in various formats"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-charcoal-900 hover:bg-slate-50 dark:hover:bg-charcoal-800 text-slate-700 dark:text-slate-200 transition-colors shadow-sm focus:outline-none"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            {downloadDropdown && (
              <div className="absolute right-0 mt-1.5 w-40 rounded-xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-30 py-1.5 text-xs animate-scale-in">
                <button
                  type="button"
                  onClick={() => downloadFile('md')}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-charcoal-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                >
                  Markdown (.md)
                </button>
                <button
                  type="button"
                  onClick={() => downloadFile('txt')}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-charcoal-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                >
                  Plain Text (.txt)
                </button>
                <button
                  type="button"
                  onClick={() => downloadFile('json')}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-charcoal-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                >
                  JSON (.json)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Body Text */}
      <div className="p-5 sm:p-6 bg-white dark:bg-charcoal-900">
        <p className="font-serif text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line selection:bg-brand-500/20 selection:text-brand-900 dark:selection:text-brand-200">
          {summary.text}
        </p>
      </div>
    </div>
  );
};
