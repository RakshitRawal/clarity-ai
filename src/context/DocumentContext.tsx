import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { ClarityDocument, ClaimStatus, SummarisationMethod, DocumentSummary } from '../types';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';
import { runClientAnalysis } from '../services/verificationEngine';
import { apiService } from '../services/api';

const STAGES = [
  'Extracting and parsing text structure...',
  'Generating concise summary...',
  'Retrieving candidate source evidence passages...',
  'Verifying claim-level factual consistency...',
  'Calculating ROUGE and consistency metrics...',
];

interface AnalysisParams {
  documentTitle: string;
  documentText: string;
  fileType: 'pdf' | 'docx' | 'txt' | 'pasted';
  fileSize?: string;
  method: SummarisationMethod;
  targetLength: 'short' | 'medium' | 'long';
  referenceSummary?: string;
  category?: 'Government Policy' | 'Financial & Economic' | 'Public Health' | 'Legal & Regulatory' | 'Custom Upload';
}

interface DocumentContextType {
  documents: ClarityDocument[];
  activeDocument: ClarityDocument | undefined;
  activeDocumentId: string | null;
  activeMethod: SummarisationMethod;
  isAnalyzing: boolean;
  analysisStage: number;
  analysisStageLabel: string;
  selectedClaimId: string | null;
  filterStatus: ClaimStatus | 'all';
  searchQuery: string;
  isLiveBackend: boolean;
  backendHealth: { online: boolean; checked: boolean; error?: string };
  setActiveDocumentId: (id: string) => void;
  setActiveMethod: (method: SummarisationMethod) => void;
  setSelectedClaimId: (id: string | null) => void;
  setFilterStatus: (status: ClaimStatus | 'all') => void;
  setSearchQuery: (query: string) => void;
  setIsLiveBackend: (live: boolean) => void;
  checkBackend: () => Promise<void>;
  cancelAnalysis: () => void;
  startAnalysis: (params: AnalysisParams) => Promise<string>;
  deleteDocument: (id: string) => void;
  resetToSamples: () => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<ClarityDocument[]>(() => {
    const saved = localStorage.getItem('clarity_documents');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // Fallback to samples
      }
    }
    return SAMPLE_DOCUMENTS;
  });

  const [activeDocumentId, setActiveDocumentIdState] = useState<string | null>(() => {
    return SAMPLE_DOCUMENTS[0].id;
  });

  const [activeMethod, setActiveMethodState] = useState<SummarisationMethod>('abstractive');
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<ClaimStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStage, setAnalysisStage] = useState<number>(0);
  const [analysisStageLabel, setAnalysisStageLabel] = useState<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const [isLiveBackend, setIsLiveBackendState] = useState<boolean>(() => {
    return apiService.getConfig().isLiveBackend;
  });

  const [backendHealth, setBackendHealth] = useState<{ online: boolean; checked: boolean; error?: string }>({
    online: false,
    checked: false,
  });

  // Sync documents to localStorage (labeled as session storage)
  useEffect(() => {
    try {
      localStorage.setItem('clarity_documents', JSON.stringify(documents));
    } catch (e) {
      console.warn('Storage quota exceeded, unable to persist all documents locally', e);
    }
  }, [documents]);

  const activeDocument = documents.find(d => d.id === activeDocumentId);

  // Sync active method when active document changes
  useEffect(() => {
    if (activeDocument) {
      setActiveMethodState(activeDocument.activeMethod);
      // Reset selected claim
      const currentSummary = activeDocument.summaries[activeDocument.activeMethod];
      if (currentSummary && currentSummary.claims.length > 0) {
        setSelectedClaimId(currentSummary.claims[0].id);
      } else {
        setSelectedClaimId(null);
      }
    }
  }, [activeDocumentId]);

  const setActiveDocumentId = (id: string) => {
    setActiveDocumentIdState(id);
    setSelectedClaimId(null);
  };

  const setActiveMethod = async (method: SummarisationMethod) => {
    setActiveMethodState(method);
    if (activeDocument) {
      const existingSummary = activeDocument.summaries[method];
      if (existingSummary && existingSummary.claims.length > 0) {
        setSelectedClaimId(existingSummary.claims[0].id);
        setDocuments(prev =>
          prev.map(doc => (doc.id === activeDocument.id ? { ...doc, activeMethod: method } : doc))
        );
      } else {
        // Auto-generate on-demand so every method button always works!
        try {
          const generated = await runClientAnalysis(
            activeDocument.originalText,
            method,
            'medium',
            activeDocument.referenceSummary
          );
          setDocuments(prev =>
            prev.map(doc =>
              doc.id === activeDocument.id
                ? {
                    ...doc,
                    activeMethod: method,
                    summaries: {
                      ...doc.summaries,
                      [method]: generated,
                    },
                  }
                : doc
            )
          );
          if (generated.claims.length > 0) {
            setSelectedClaimId(generated.claims[0].id);
          }
        } catch (err) {
          console.error('Failed to auto-generate summary for method', method, err);
          setDocuments(prev =>
            prev.map(doc => (doc.id === activeDocument.id ? { ...doc, activeMethod: method } : doc))
          );
        }
      }
    }
  };

  const setIsLiveBackend = (live: boolean) => {
    setIsLiveBackendState(live);
    apiService.saveConfig({ isLiveBackend: live });
  };

  const checkBackend = async () => {
    const res = await apiService.checkBackendHealth();
    setBackendHealth({
      online: res.online,
      checked: true,
      error: res.error,
    });
    // Auto-enable live Python backend mode when backend server is running
    if (res.online) {
      setIsLiveBackendState(true);
      apiService.saveConfig({ isLiveBackend: true });
    }
  };

  useEffect(() => {
    checkBackend();
  }, []);

  const cancelAnalysis = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsAnalyzing(false);
    setAnalysisStage(0);
    setAnalysisStageLabel('');
  };

  const startAnalysis = async (params: AnalysisParams): Promise<string> => {
    const newDocId = 'doc-' + Math.random().toString(36).substring(2, 9);
    const wordCount = params.documentText.trim().split(/\s+/).length;

    const newDocument: ClarityDocument = {
      id: newDocId,
      title: params.documentTitle || 'Untitled Document',
      originalText: params.documentText,
      fileType: params.fileType,
      fileSize: params.fileSize || `${(params.documentText.length / 1024).toFixed(1)} KB`,
      wordCount,
      uploadedAt: new Date().toISOString(),
      category: params.category || 'Custom Upload',
      referenceSummary: params.referenceSummary,
      activeMethod: params.method,
      processingStatus: 'processing',
      statusStage: STAGES[0],
      summaries: {
        abstractive: undefined,
        extractive: undefined,
        lead3: undefined,
        compare_both: undefined,
      },
    };

    // Prepend to documents
    setDocuments(prev => [newDocument, ...prev]);
    setActiveDocumentIdState(newDocId);
    setIsAnalyzing(true);
    setAnalysisStage(1);
    setAnalysisStageLabel(STAGES[0]);

    abortControllerRef.current = new AbortController();

    try {
      const stageDelay = (ms: number) =>
        new Promise((resolve, reject) => {
          const timer = setTimeout(resolve, ms);
          abortControllerRef.current?.signal.addEventListener('abort', () => {
            clearTimeout(timer);
            reject(new Error('Analysis canceled by user'));
          });
        });

      await stageDelay(400);
      setAnalysisStage(2);
      setAnalysisStageLabel(STAGES[1]);

      let summaryResult: DocumentSummary;

      if (isLiveBackend) {
        // Run against live Python backend
        const apiPromise = apiService.analyzeDocument({
          documentText: params.documentText,
          documentTitle: params.documentTitle,
          method: params.method,
          targetLength: params.targetLength,
          referenceSummary: params.referenceSummary,
        });

        await stageDelay(400);
        setAnalysisStage(3);
        setAnalysisStageLabel(STAGES[2]);

        await stageDelay(450);
        setAnalysisStage(4);
        setAnalysisStageLabel(STAGES[3]);

        const apiRes = await apiPromise;

        await stageDelay(350);
        setAnalysisStage(5);
        setAnalysisStageLabel(STAGES[4]);

        if (!apiRes.success || !apiRes.data) {
          throw new Error(apiRes.error || 'Live backend failed to return summary');
        }
        summaryResult = apiRes.data;
      } else {
        // High-fidelity client heuristic analysis
        await stageDelay(650);
        setAnalysisStage(3);
        setAnalysisStageLabel(STAGES[2]);

        await stageDelay(700);
        setAnalysisStage(4);
        setAnalysisStageLabel(STAGES[3]);

        await stageDelay(550);
        setAnalysisStage(5);
        setAnalysisStageLabel(STAGES[4]);

        summaryResult = await runClientAnalysis(
          params.documentText,
          params.method,
          params.targetLength,
          params.referenceSummary
        );
      }

      // Update document with results
      setDocuments(prev =>
        prev.map(doc => {
          if (doc.id === newDocId) {
            return {
              ...doc,
              processingStatus: 'completed',
              statusStage: 'Analysis complete',
              summaries: {
                ...doc.summaries,
                [params.method]: summaryResult,
              },
            };
          }
          return doc;
        })
      );

      if (summaryResult.claims.length > 0) {
        setSelectedClaimId(summaryResult.claims[0].id);
      }

      setIsAnalyzing(false);
      return newDocId;
    } catch (err: any) {
      if (err.message === 'Analysis canceled by user') {
        setDocuments(prev => prev.filter(d => d.id !== newDocId));
        return '';
      }

      setDocuments(prev =>
        prev.map(doc => {
          if (doc.id === newDocId) {
            return {
              ...doc,
              processingStatus: 'failed',
              errorMessage: err.message || 'Analysis failed. Please check backend connection or document format.',
            };
          }
          return doc;
        })
      );
      setIsAnalyzing(false);
      throw err;
    }
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => {
      const filtered = prev.filter(d => d.id !== id);
      if (activeDocumentId === id) {
        const nextDoc = filtered[0];
        setActiveDocumentIdState(nextDoc ? nextDoc.id : null);
      }
      return filtered;
    });
  };

  const resetToSamples = () => {
    setDocuments(SAMPLE_DOCUMENTS);
    setActiveDocumentIdState(SAMPLE_DOCUMENTS[0].id);
    setActiveMethodState('abstractive');
    setSelectedClaimId(SAMPLE_DOCUMENTS[0].summaries.abstractive?.claims[0].id || null);
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        activeDocument,
        activeDocumentId,
        activeMethod,
        isAnalyzing,
        analysisStage,
        analysisStageLabel,
        selectedClaimId,
        filterStatus,
        searchQuery,
        isLiveBackend,
        backendHealth,
        setActiveDocumentId,
        setActiveMethod,
        setSelectedClaimId,
        setFilterStatus,
        setSearchQuery,
        setIsLiveBackend,
        checkBackend,
        cancelAnalysis,
        startAnalysis,
        deleteDocument,
        resetToSamples,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = (): DocumentContextType => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};
