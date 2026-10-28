import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FilePlus2,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  FlaskConical,
  Activity,
  FolderOpen,
} from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import { MetricCard } from '../components/common/MetricCard';
import { MethodBadge, ClaimBadge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';

export const DashboardOverviewPage: React.FC = () => {
  const { documents, setActiveDocumentId } = useDocuments();
  const navigate = useNavigate();

  // Aggregate genuine statistics across loaded documents
  const totalDocs = documents.length;
  let totalClaims = 0;
  let supportedClaims = 0;
  let contradictedClaims = 0;
  let reviewClaims = 0;

  documents.forEach(doc => {
    const sum = doc.summaries[doc.activeMethod];
    if (sum) {
      totalClaims += sum.metrics.factualConsistency.totalClaims;
      supportedClaims += sum.metrics.factualConsistency.supportedClaims;
      contradictedClaims += sum.metrics.factualConsistency.contradictedClaims;
      reviewClaims += sum.metrics.factualConsistency.unverifiedClaims;
    }
  });

  const overallConsistency =
    totalClaims > 0 ? Number(((supportedClaims / totalClaims) * 100).toFixed(1)) : 100;

  const handleOpenDoc = (id: string) => {
    setActiveDocumentId(id);
    navigate(`/app/analysis/${id}`);
  };

  return (
    <div className="space-y-8">
      {/* Welcome & Primary CTA Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Document Intelligence Workspace</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome to ClarityAI
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            Summarise long-form public whitepapers, bills, and regulatory filings while verifying every factual statement against ground-truth source evidence.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link
            to="/app/new"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 shadow-md shadow-brand-500/25 transition-all"
          >
            <FilePlus2 className="w-4 h-4" />
            <span>Analyse Document</span>
          </Link>

          <Link
            to="/app/evaluation"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-charcoal-800 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <FlaskConical className="w-4 h-4 text-brand-500" />
            <span>Evaluation Lab</span>
          </Link>
        </div>
      </div>

      {/* Workspace Metric Overview */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Workspace Verification Metrics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetricCard
            title="Active Documents"
            value={totalDocs}
            icon={<FolderOpen className="w-4 h-4" />}
            status="default"
            definition="Total documents currently analyzed and available in this workspace."
          />
          <MetricCard
            title="Average Consistency"
            value={`${overallConsistency}%`}
            icon={<ShieldCheck className="w-4 h-4" />}
            status={overallConsistency >= 80 ? 'success' : 'warning'}
            definition="Aggregate percentage of claims factually aligned with source documents."
          />
          <MetricCard
            title="Supported Claims"
            value={supportedClaims}
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            status="success"
            definition="Claims verified with unambiguous evidence in original texts."
          />
          <MetricCard
            title="Hallucinations Detected"
            value={contradictedClaims}
            icon={<AlertOctagon className="w-4 h-4 text-rose-500" />}
            status={contradictedClaims > 0 ? 'danger' : 'default'}
            definition="Invented numbers or inverted claims caught and prevented from publication."
          />
        </div>
      </div>

      {/* Recent Documents & Processing Status */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Documents & Analyses
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select a document to inspect its claim verification tree and source highlights
            </p>
          </div>

          <Link
            to="/app/documents"
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>View All ({documents.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {documents.length === 0 ? (
          <EmptyState
            title="No Documents in Workspace"
            description="Upload an official public document or choose one of our benchmark presets to begin factual summarisation."
            actionText="Analyse Your First Document"
            actionLink="/app/new"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.slice(0, 4).map(doc => {
              const currentSummary = doc.summaries[doc.activeMethod];
              const consistency = currentSummary?.metrics.factualConsistency;

              return (
                <div
                  key={doc.id}
                  onClick={() => handleOpenDoc(doc.id)}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 p-5 shadow-sm hover:shadow-md hover:border-brand-300 dark:hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                        {doc.category || 'General'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {doc.wordCount.toLocaleString()} words
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1 mb-2">
                      {doc.title}
                    </h4>

                    {currentSummary ? (
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-serif bg-slate-50 dark:bg-charcoal-950/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 mb-3">
                        "{currentSummary.text}"
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 italic mb-3">
                        Analysis pending or in progress...
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <MethodBadge method={doc.activeMethod} size="sm" />

                    {consistency && (
                      <span
                        className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          consistency.consistencyRate >= 80
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {consistency.consistencyRate}% Factual
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
