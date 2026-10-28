import React, { useState } from 'react';
import { FileCheck2, FileText, ChevronRight } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import { ReportGenerator } from '../components/reports/ReportGenerator';
import { EmptyState } from '../components/common/EmptyState';

export const ReportsPage: React.FC = () => {
  const { documents, activeDocumentId, setActiveDocumentId } = useDocuments();
  const [selectedDocId, setSelectedDocId] = useState<string>(
    activeDocumentId || (documents[0] ? documents[0].id : '')
  );

  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  if (documents.length === 0) {
    return (
      <EmptyState
        title="No Documents Available For Reporting"
        description="Please upload and analyze a public document before generating an audit report."
        actionText="Analyse Document"
        actionLink="/app/new"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Factual Verification Reports
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Formal, auditable compliance transcripts certifying claim-level evidence alignment.
          </p>
        </div>

        {/* Document Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Select Document:
          </label>
          <select
            value={selectedDoc?.id}
            onChange={e => {
              setSelectedDocId(e.target.value);
              setActiveDocumentId(e.target.value);
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 text-slate-900 dark:text-white max-w-xs focus:ring-2 focus:ring-brand-500"
          >
            {documents.map(d => (
              <option key={d.id} value={d.id} className="dark:bg-charcoal-900">
                {d.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedDoc ? (
        <ReportGenerator document={selectedDoc} />
      ) : (
        <div className="p-8 text-center text-slate-400">Please select a document.</div>
      )}
    </div>
  );
};
