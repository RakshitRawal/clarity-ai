import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocuments } from '../context/DocumentContext';
import { DocumentUploader } from '../components/analysis/DocumentUploader';
import { AnalysisProgress } from '../components/analysis/AnalysisProgress';
import { ErrorState } from '../components/common/ErrorState';

export const NewAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const { startAnalysis, isAnalyzing, analysisStage, analysisStageLabel, cancelAnalysis } = useDocuments();
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleStartAnalysis = async (params: any) => {
    setAnalysisError(null);
    try {
      const docId = await startAnalysis(params);
      if (docId) {
        navigate(`/app/analysis/${docId}`);
      }
    } catch (err: any) {
      setAnalysisError(err.message || 'Analysis pipeline encountered an error.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          New Document Analysis
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Upload public whitepapers, bills, or transcripts to generate verifiable summaries with claim-by-claim citations.
        </p>
      </div>

      {/* Error state if failed */}
      {analysisError && (
        <ErrorState
          title="Analysis Failed"
          message={analysisError}
          actionText="Try Again"
          onRetry={() => setAnalysisError(null)}
        />
      )}

      {/* In-progress state */}
      {isAnalyzing ? (
        <AnalysisProgress
          currentStage={analysisStage}
          stageLabel={analysisStageLabel}
          onCancel={cancelAnalysis}
        />
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 p-6 sm:p-8 shadow-sm">
          <DocumentUploader
            onStartAnalysis={handleStartAnalysis}
            isAnalyzing={isAnalyzing}
          />
        </div>
      )}
    </div>
  );
};
