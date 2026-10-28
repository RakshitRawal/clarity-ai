// ClarityAI Core Type Definitions

export type SummarisationMethod = 'extractive' | 'abstractive' | 'compare_both' | 'lead3';

export type ClaimStatus = 'supported' | 'contradicted' | 'needs_review';

export interface SourceSpan {
  startChar?: number;
  endChar?: number;
  paragraphIndex?: number;
  page?: number;
  quote: string;
  sectionTitle?: string;
}

export interface ClaimVerification {
  id: string;
  claimText: string;
  status: ClaimStatus;
  confidenceScore: number; // 0.00 to 1.00 - clearly labeled as model confidence
  supportingPassage?: string;
  conflictingPassage?: string;
  sourceLocation?: {
    page?: number;
    paragraph?: number;
    section?: string;
  };
  explanation: string;
  spanMatch?: {
    text: string;
    startIndex: number;
    endIndex: number;
  };
}

export interface RougeScores {
  rouge1: { precision: number; recall: number; f1: number };
  rouge2: { precision: number; recall: number; f1: number };
  rougeL: { precision: number; recall: number; f1: number };
}

export interface FactualConsistencyMetrics {
  consistencyRate: number; // Percentage 0 - 100
  totalClaims: number;
  supportedClaims: number;
  contradictedClaims: number;
  unverifiedClaims: number; // Distinguish unverified from confirmed hallucination
  potentialHallucinations: number;
  hallucinationPrecision?: number; // When ground truth is available
  hallucinationRecall?: number;
}

export interface EvaluationMetrics {
  rouge?: RougeScores;
  hasReferenceSummary: boolean;
  factualConsistency: FactualConsistencyMetrics;
  lead3Comparison?: {
    rouge1Diff: number;
    rouge2Diff: number;
    rougeLDiff: number;
    factualDiff: number;
  };
}

export interface DocumentSummary {
  id: string;
  method: SummarisationMethod;
  text: string;
  wordCount: number;
  compressionRatio: number; // e.g. 0.18 (18% of original size)
  generationTimeMs: number;
  targetLength: 'short' | 'medium' | 'long';
  claims: ClaimVerification[];
  metrics: EvaluationMetrics;
  rawResponseMeta?: {
    modelName: string;
    promptTokens: number;
    completionTokens: number;
  };
}

export interface ClarityDocument {
  id: string;
  title: string;
  originalText: string;
  fileType: 'pdf' | 'docx' | 'txt' | 'pasted';
  fileSize?: string;
  wordCount: number;
  uploadedAt: string; // ISO 8601 string
  category?: 'Government Policy' | 'Financial & Economic' | 'Public Health' | 'Legal & Regulatory' | 'Custom Upload';
  referenceSummary?: string; // Optional ground truth for ROUGE evaluation
  summaries: Record<SummarisationMethod, DocumentSummary | undefined>;
  activeMethod: SummarisationMethod;
  processingStatus: 'idle' | 'processing' | 'completed' | 'failed';
  statusStage?: string;
  errorMessage?: string;
  isSample?: boolean;
}

export interface BenchmarkComparisonItem {
  method: 'Lead-3' | 'Extractive (LexRank/BERT)' | 'Abstractive (Fine-Tuned LLM)';
  rouge1: number;
  rouge2: number;
  rougeL: number;
  factualConsistency: number;
  hallucinationRate: number;
  averageLatencyMs: number;
  sampleSummary: string;
  keyStrengths: string[];
  keyRisks: string[];
}

export interface ApiConfig {
  backendUrl: string;
  apiKey: string;
  isLiveBackend: boolean;
  selectedModel: string;
  verificationThreshold: number; // e.g. 0.75
  retrieveTopK: number;
}
