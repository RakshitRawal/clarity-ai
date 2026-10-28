import { ApiConfig, ClaimVerification, DocumentSummary, EvaluationMetrics, SummarisationMethod } from '../types';

export interface SummarizeApiRequest {
  documentText: string;
  documentTitle?: string;
  method: SummarisationMethod;
  targetLength: 'short' | 'medium' | 'long';
  referenceSummary?: string;
  verificationThreshold?: number;
  modelName?: string;
}

export interface SummarizeApiResponse {
  success: boolean;
  data?: DocumentSummary;
  error?: string;
  modelMetadata?: {
    modelUsed: string;
    inferenceTimeMs: number;
    tokensPrompt: number;
    tokensCompletion: number;
  };
}

export interface HealthCheckResponse {
  status: 'ok' | 'degraded';
  version: string;
  supportedModels: string[];
  gpuAvailable: boolean;
  activeProvider: string;
}

const DEFAULT_CONFIG: ApiConfig = {
  backendUrl: 'http://localhost:8000',
  apiKey: '',
  isLiveBackend: true, // Default to live Python backend
  selectedModel: 'mistral-7b-instruct-q4',
  verificationThreshold: 0.75,
  retrieveTopK: 5,
};

export class ClarityApiService {
  private config: ApiConfig;

  constructor() {
    const saved = localStorage.getItem('clarity_api_config');
    if (saved) {
      try {
        this.config = { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      } catch {
        this.config = { ...DEFAULT_CONFIG };
      }
    } else {
      this.config = { ...DEFAULT_CONFIG };
    }
  }

  public getConfig(): ApiConfig {
    return { ...this.config };
  }

  public saveConfig(newConfig: Partial<ApiConfig>): void {
    this.config = { ...this.config, ...newConfig };
    localStorage.setItem('clarity_api_config', JSON.stringify(this.config));
  }

  public async checkBackendHealth(): Promise<{ online: boolean; info?: HealthCheckResponse; error?: string }> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(`${this.config.backendUrl}/health`, {
        signal: controller.signal,
        headers: this.getHeaders(),
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        return { online: false, error: `HTTP ${res.status}: ${res.statusText}` };
      }
      const data: HealthCheckResponse = await res.json();
      return { online: true, info: data };
    } catch (err: any) {
      return {
        online: false,
        error: err.name === 'AbortError' ? 'Connection timed out' : 'Backend server unreachable at configured URL',
      };
    }
  }

  public async analyzeDocument(req: SummarizeApiRequest): Promise<SummarizeApiResponse> {
    if (!this.config.isLiveBackend) {
      return {
        success: false,
        error: 'Demo Mode active. Real backend API calls are bypassed. Switch to Live Backend in Settings to connect to your Python server.',
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s timeout for local LLMs

      const res = await fetch(`${this.config.backendUrl}/api/v1/summarize-and-verify`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          document_text: req.documentText,
          document_title: req.documentTitle,
          method: req.method,
          target_length: req.targetLength,
          reference_summary: req.referenceSummary,
          verification_threshold: this.config.verificationThreshold,
          model_name: this.config.selectedModel,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        return {
          success: false,
          error: `Backend error (${res.status}): ${errorText || res.statusText}`,
        };
      }

      const json = await res.json();
      return {
        success: true,
        data: json.summary,
        modelMetadata: json.metadata,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.name === 'AbortError'
          ? 'Analysis request timed out after 45 seconds.'
          : `Network connection failed: ${err.message || 'Cannot connect to backend'}`,
      };
    }
  }

  private getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }
    return headers;
  }
}

export const apiService = new ClarityApiService();
