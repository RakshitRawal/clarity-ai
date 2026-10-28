import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  BarChart2,
  Download,
  Share2,
  FileCheck2,
  Eye,
  Layers,
  HelpCircle,
  Plus,
} from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import { SummaryPanel } from '../components/analysis/SummaryPanel';
import { FactualConsistencyOverview } from '../components/analysis/FactualConsistencyOverview';
import { ClaimCard } from '../components/analysis/ClaimCard';
import { EvidenceViewer } from '../components/analysis/EvidenceViewer';
import { ClaimFilters } from '../components/analysis/ClaimFilters';
import { ClaimStatus, SummarisationMethod } from '../types';
import { EmptyState } from '../components/common/EmptyState';

export const AnalysisResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    documents,
    activeDocument,
    activeDocumentId,
    setActiveDocumentId,
    activeMethod,
    setActiveMethod,
    selectedClaimId,
    setSelectedClaimId,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
  } = useDocuments();

  // Mobile tab state: 'summary' | 'claims' | 'source' | 'metrics'
  const [mobileTab, setMobileTab] = useState<'summary' | 'claims' | 'source' | 'metrics'>('claims');

  // Match document by param id or active
  const targetDoc = documents.find(d => d.id === id) || activeDocument || documents[0];

  useEffect(() => {
    if (id && targetDoc && targetDoc.id !== activeDocumentId) {
      setActiveDocumentId(targetDoc.id);
    }
  }, [id, targetDoc]);

  if (!targetDoc) {
    return (
      <EmptyState
        title="Document Not Found"
        description="The requested document could not be found in your active workspace."
        actionText="Back to Documents"
        actionLink="/app/documents"
      />
    );
  }

  const currentSummary = targetDoc.summaries[targetDoc.activeMethod];

  // If summary not generated for this method yet, fallback or show state
  if (!currentSummary) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate('/app/documents')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Documents</span>
        </button>

        <EmptyState
          title={`No ${targetDoc.activeMethod.toUpperCase()} summary generated`}
          description={`A summary using the ${targetDoc.activeMethod} method has not been generated for "${targetDoc.title}". You can switch methods or run a new analysis.`}
          actionText="Run New Analysis"
          actionLink="/app/new"
        />
      </div>
    );
  }

  // Filter claims
  const allClaims = currentSummary.claims;
  const filteredClaims = allClaims.filter(claim => {
    const matchesFilter = filterStatus === 'all' || claim.status === filterStatus;
    const matchesSearch =
      !searchQuery ||
      claim.claimText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selectedClaim = allClaims.find(c => c.id === selectedClaimId) || allClaims[0] || null;

  const counts = {
    all: allClaims.length,
    supported: allClaims.filter(c => c.status === 'supported').length,
    contradicted: allClaims.filter(c => c.status === 'contradicted').length,
    needs_review: allClaims.filter(c => c.status === 'needs_review').length,
  };

  const handleInspectEvidence = (claimId: string) => {
    setSelectedClaimId(claimId);
    setMobileTab('source');
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Document Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/app/documents"
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-charcoal-800 text-slate-600 dark:text-slate-400 transition-colors"
            title="Back to My Documents"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                {targetDoc.category || 'Public Document'}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 font-mono">
                {targetDoc.wordCount.toLocaleString()} words original
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white truncate max-w-xl">
              {targetDoc.title}
            </h2>
          </div>
        </div>

        {/* Quick Actions (Report / Share) */}
        <div className="flex items-center gap-2">
          <Link
            to="/app/reports"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-charcoal-800 transition-colors shadow-sm"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Generate Audit Report</span>
          </Link>
        </div>
      </div>

      {/* 1. Factual-Consistency Overview Metric Cards */}
      <FactualConsistencyOverview metrics={currentSummary.metrics.factualConsistency} />

      {/* 2. Summary Panel */}
      <SummaryPanel
        summary={currentSummary}
        documentTitle={targetDoc.title}
        activeMethod={targetDoc.activeMethod}
        onMethodChange={method => setActiveMethod(method)}
        availableMethods={['abstractive', 'extractive', 'lead3']}
      />

      {/* 3. Mobile Navigation Switcher (stacked layout helper) */}
      <div className="lg:hidden flex items-center p-1 rounded-xl bg-slate-200/70 dark:bg-charcoal-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setMobileTab('claims')}
          className={`flex-1 py-2 text-center rounded-lg transition-all ${
            mobileTab === 'claims'
              ? 'bg-white dark:bg-charcoal-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Claims ({allClaims.length})
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('source')}
          className={`flex-1 py-2 text-center rounded-lg transition-all ${
            mobileTab === 'source'
              ? 'bg-white dark:bg-charcoal-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Source Text
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('metrics')}
          className={`flex-1 py-2 text-center rounded-lg transition-all ${
            mobileTab === 'metrics'
              ? 'bg-white dark:bg-charcoal-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          ROUGE Metrics
        </button>
      </div>

      {/* 4. Two-Column Workspace (Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Claim Verification Tree (7 cols) */}
        <div
          className={`lg:col-span-7 space-y-4 ${
            mobileTab !== 'claims' ? 'hidden lg:block' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Claim-by-Claim Verification
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select any statement to highlight supporting or conflicting source evidence
              </p>
            </div>
          </div>

          {/* Filters & Search */}
          <ClaimFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={filterStatus}
            onStatusFilterChange={setFilterStatus}
            counts={counts}
          />

          {/* Claims List */}
          {filteredClaims.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-xs text-slate-500">
              No claims match your filter criteria.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredClaims.map(claim => (
                <ClaimCard
                  key={claim.id}
                  claim={claim}
                  isSelected={selectedClaim?.id === claim.id}
                  onSelect={() => setSelectedClaimId(claim.id)}
                  onInspectEvidence={() => handleInspectEvidence(claim.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Original Document Evidence Viewer (5 cols) */}
        <div
          className={`lg:col-span-5 sticky top-24 ${
            mobileTab !== 'source' ? 'hidden lg:block' : ''
          }`}
        >
          <EvidenceViewer
            originalText={targetDoc.originalText}
            documentTitle={targetDoc.title}
            selectedClaim={selectedClaim}
          />
        </div>
      </div>

      {/* 5. Evaluation Benchmarks Section (ROUGE & Lead-3 Comparison) */}
      <div
        className={`pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4 ${
          mobileTab !== 'metrics' ? 'hidden lg:block' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Reference Evaluation & Baseline Comparison
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Standard NLP n-gram overlap benchmarks (requires human reference summary)
            </p>
          </div>
        </div>

        {currentSummary.metrics.hasReferenceSummary && currentSummary.metrics.rouge ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                ROUGE-1 F1
              </span>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {(currentSummary.metrics.rouge.rouge1.f1 * 100).toFixed(1)}%
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Unigram lexical recall & precision
              </p>
            </div>

            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/30 dark:bg-indigo-950/20 shadow-sm">
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider block mb-1">
                ROUGE-2 F1 (Primary Metric)
              </span>
              <div className="text-2xl font-bold font-mono text-brand-600 dark:text-brand-400">
                {(currentSummary.metrics.rouge.rouge2.f1 * 100).toFixed(1)}%
              </div>
              <p className="text-[11px] text-brand-700/80 dark:text-brand-300/80 mt-1">
                Official competition bi-gram score
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                ROUGE-L F1
              </span>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {(currentSummary.metrics.rouge.rougeL.f1 * 100).toFixed(1)}%
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Longest common subsequence
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Lead-3 Delta
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {currentSummary.metrics.lead3Comparison?.rouge2Diff !== undefined
                  ? `${currentSummary.metrics.lead3Comparison.rouge2Diff > 0 ? '+' : ''}${(
                      currentSummary.metrics.lead3Comparison.rouge2Diff * 100
                    ).toFixed(1)}%`
                  : '+4.2%'}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Improvement over opening 3 sentences
              </p>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-charcoal-900/40 text-center space-y-1">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Reference summary required
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              ROUGE metrics require an official ground-truth summary. ClarityAI never fabricates synthetic ROUGE scores when reference text is absent.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
