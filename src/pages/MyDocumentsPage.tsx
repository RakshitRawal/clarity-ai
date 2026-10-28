import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, RotateCcw } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import { DocumentHistoryTable } from '../components/reports/DocumentHistoryTable';

export const MyDocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { documents, deleteDocument, resetToSamples, setActiveDocumentId } = useDocuments();

  const handleOpenAnalysis = (id: string) => {
    setActiveDocumentId(id);
    navigate(`/app/analysis/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Documents & Audit History
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access, inspect, export, or manage your analyzed public documents and audit trails.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetToSamples}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-charcoal-800 transition-colors"
            title="Reset to bundled benchmark documents"
          >
            <RotateCcw className="w-3.5 h-3.5 text-brand-500" />
            <span>Reset Demo Presets</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/app/new')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Analyse Document</span>
          </button>
        </div>
      </div>

      <DocumentHistoryTable
        documents={documents}
        onDeleteDocument={deleteDocument}
        onOpenAnalysis={handleOpenAnalysis}
      />
    </div>
  );
};
