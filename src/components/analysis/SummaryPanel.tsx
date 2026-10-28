import React, { useState } from 'react';
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

  const handleCopy = () => {
    navigator.clipboard.writeText(summary.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 shadow-sm overflow-hidden">
      {/* Header with Method Switcher & Metadata */}
      <div className="p-3.5 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 dark:bg-charcoal-950/40">
        <div className="min-w-0 max-w-full">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Generated Summary
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium truncate max-w-[180px] sm:max-w-xs" title={documentTitle}>
              {documentTitle}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <MethodBadge method={summary.method} size="sm" />
            <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-charcoal-800 text-slate-600 dark:text-slate-300 font-mono">
              {summary.wordCount} words
            </span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-charcoal-800 text-slate-600 dark:text-slate-300 font-mono">
              Compression: {(summary.compressionRatio * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Method Switcher Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/60 dark:bg-charcoal-800 border border-slate-200 dark:border-slate-700">
          {(['abstractive', 'extractive', 'lead3'] as const).map(m => {
            const labels: Record<string, string> = {
              abstractive: 'Abstractive',
              extractive: 'Extractive',
              lead3: 'Lead-3',
              compare_both: 'Compare Both',
            };
            const isSelected = activeMethod === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => onMethodChange(m)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-charcoal-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {labels[m]}
              </button>
            );
          })}
        </div>

        {/* Actions (Copy / Export) */}
        <div className="flex items-center gap-2 relative">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-charcoal-800 text-slate-700 dark:text-slate-300 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDownloadDropdown(!downloadDropdown)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-charcoal-800 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            {downloadDropdown && (
              <div className="absolute right-0 mt-1 w-36 rounded-xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 shadow-xl z-20 py-1 text-xs animate-fade-in">
                <button
                  type="button"
                  onClick={() => downloadFile('md')}
                  className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-charcoal-800 text-slate-700 dark:text-slate-300"
                >
                  Markdown (.md)
                </button>
                <button
                  type="button"
                  onClick={() => downloadFile('txt')}
                  className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-charcoal-800 text-slate-700 dark:text-slate-300"
                >
                  Plain Text (.txt)
                </button>
                <button
                  type="button"
                  onClick={() => downloadFile('json')}
                  className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-charcoal-800 text-slate-700 dark:text-slate-300"
                >
                  Structured JSON
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Body Text */}
      <div className="p-4 sm:p-6 text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 font-normal break-words overflow-hidden">
        {summary.text.split('\n\n').map((para, i) => (
          <p key={i} className="break-words leading-relaxed">{para}</p>
        ))}
      </div>
    </div>
  );
};
