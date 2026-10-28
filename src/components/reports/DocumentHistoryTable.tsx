import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Trash2,
  Download,
  ExternalLink,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Search,
  Sparkles,
  Layers,
  Calendar,
} from 'lucide-react';
import { ClarityDocument } from '../../types';
import { MethodBadge } from '../common/Badge';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { EmptyState } from '../common/EmptyState';

interface DocumentHistoryTableProps {
  documents: ClarityDocument[];
  onDeleteDocument: (id: string) => void;
  onOpenAnalysis: (id: string) => void;
}

export const DocumentHistoryTable: React.FC<DocumentHistoryTableProps> = ({
  documents,
  onDeleteDocument,
  onOpenAnalysis,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'date' | 'title' | 'words'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Filter & Search
  const filtered = documents.filter(doc => {
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.originalText.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'all' || doc.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortField === 'date') {
      const da = new Date(a.uploadedAt).getTime();
      const db = new Date(b.uploadedAt).getTime();
      return sortOrder === 'desc' ? db - da : da - db;
    }
    if (sortField === 'title') {
      return sortOrder === 'desc'
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title);
    }
    if (sortField === 'words') {
      return sortOrder === 'desc' ? b.wordCount - a.wordCount : a.wordCount - b.wordCount;
    }
    return 0;
  });

  const targetDocToDelete = documents.find(d => d.id === deleteTargetId);

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search documents by title or text..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">All Categories</option>
            <option value="Government Policy">Government Policy</option>
            <option value="Financial & Economic">Financial & Economic</option>
            <option value="Public Health">Public Health</option>
            <option value="Legal & Regulatory">Legal & Regulatory</option>
            <option value="Custom Upload">Custom Upload</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-charcoal-800 transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort: {sortField.toUpperCase()} ({sortOrder})</span>
          </button>
        </div>
      </div>

      {/* Documents List / Table */}
      {sorted.length === 0 ? (
        <EmptyState
          title="No documents found"
          description={
            search || categoryFilter !== 'all'
              ? 'No documents match your search criteria. Try adjusting your filters.'
              : 'You have not uploaded or analyzed any documents yet.'
          }
          actionText="Analyse New Document"
          actionLink="/app/new"
        />
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-charcoal-950/60 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5 pl-5">Document Title</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Method</th>
                  <th className="p-3.5">Word Count</th>
                  <th className="p-3.5">Consistency Rate</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 pr-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {sorted.map(doc => {
                  const summary = doc.summaries[doc.activeMethod];
                  const consistencyRate = summary?.metrics?.factualConsistency?.consistencyRate;

                  return (
                    <tr
                      key={doc.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-charcoal-800/40 transition-colors"
                    >
                      <td className="p-3.5 pl-5 font-semibold text-slate-900 dark:text-white max-w-xs">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                          <span className="truncate" title={doc.title}>
                            {doc.title}
                          </span>
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-500 dark:text-slate-400">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-charcoal-800 text-[11px] font-medium">
                          {doc.category || 'General'}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <MethodBadge method={doc.activeMethod} size="sm" />
                      </td>
                      <td className="p-3.5 font-mono text-slate-600 dark:text-slate-300">
                        {doc.wordCount.toLocaleString()} words
                      </td>
                      <td className="p-3.5 font-mono">
                        {consistencyRate !== undefined ? (
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold ${
                              consistencyRate >= 80
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            }`}
                          >
                            {consistencyRate}%
                          </span>
                        ) : (
                          <span className="text-slate-400">Processing</span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {new Date(doc.uploadedAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="p-3.5 pr-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => onOpenAnalysis(doc.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/50 transition-colors"
                          >
                            <span>Open Analysis</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteTargetId(doc.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Delete document"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Persistence Note */}
      <p className="text-[11px] text-slate-400 dark:text-slate-500 italic text-center">
        Note: In Demo Mode, documents are maintained within local browser state. Connect a Python backend with database integration for persistent multi-user storage.
      </p>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Document"
        message={`Are you sure you want to delete "${targetDocToDelete?.title || 'this document'}"? All verified claims and generated summaries for this document will be removed from your workspace.`}
        confirmLabel="Delete Document"
        cancelLabel="Keep Document"
        isDestructive={true}
        onConfirm={() => {
          if (deleteTargetId) {
            onDeleteDocument(deleteTargetId);
            setDeleteTargetId(null);
          }
        }}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
