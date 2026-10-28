import React, { useState } from 'react';
import {
  Settings,
  Server,
  Key,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Cpu,
  ShieldCheck,
  FileCode,
  Info,
  ExternalLink,
} from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import { apiService } from '../services/api';
import { DemoModeBadge } from '../components/common/Badge';

export const SettingsPage: React.FC = () => {
  const { isLiveBackend, setIsLiveBackend, backendHealth, checkBackend } = useDocuments();
  const [backendUrl, setBackendUrl] = useState(apiService.getConfig().backendUrl);
  const [apiKey, setApiKey] = useState(apiService.getConfig().apiKey);
  const [selectedModel, setSelectedModel] = useState(apiService.getConfig().selectedModel);
  const [verificationThreshold, setVerificationThreshold] = useState(
    apiService.getConfig().verificationThreshold
  );
  const [retrieveTopK, setRetrieveTopK] = useState(apiService.getConfig().retrieveTopK);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'api-contract'>('config');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    apiService.saveConfig({
      backendUrl,
      apiKey,
      selectedModel,
      verificationThreshold,
      retrieveTopK,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
    checkBackend();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Settings & Backend Integration
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure local Python API endpoints, model weights, verification thresholds, and view API contracts.
          </p>
        </div>

        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-charcoal-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('config')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'config'
                ? 'bg-white dark:bg-charcoal-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Integration Settings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('api-contract')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'api-contract'
                ? 'bg-white dark:bg-charcoal-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-brand-500" />
            <span>API Contract</span>
          </button>
        </div>
      </div>

      {activeTab === 'config' ? (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Mode Switch Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Execution Mode
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Choose between bundled client-side heuristic engine and a live Python summarisation backend.
                </p>
              </div>

              <DemoModeBadge isLive={isLiveBackend} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsLiveBackend(false)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  !isLiveBackend
                    ? 'border-brand-600 bg-brand-50/60 dark:bg-brand-950/40 ring-1 ring-brand-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Demo Mode (Offline Heuristics)
                  </span>
                  {!isLiveBackend && <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Uses pre-computed official ground truth documents and client-side n-gram & entity verification. Zero backend server required.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setIsLiveBackend(true)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isLiveBackend
                    ? 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/30 ring-1 ring-emerald-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Live Python Backend API
                  </span>
                  {isLiveBackend && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Sends raw document text to your custom FastAPI/Python backend for live LLM inference, vector retrieval, and NLI verification.
                </p>
              </button>
            </div>
          </div>

          {/* Backend Connection Details */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Python Backend Connection Details</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Backend API URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={backendUrl}
                    onChange={e => setBackendUrl(e.target.value)}
                    placeholder="http://localhost:8000"
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-charcoal-950 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button
                    type="button"
                    onClick={checkBackend}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-charcoal-800 text-slate-700 dark:text-slate-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Ping /health</span>
                  </button>
                </div>

                {/* Health Check Status Result */}
                <div className="mt-2 text-xs flex items-center gap-2">
                  <span className="font-semibold text-slate-500">Status:</span>
                  {backendHealth.checked ? (
                    backendHealth.online ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Connected & Operational</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Unreachable ({backendHealth.error || 'Server offline'})</span>
                      </span>
                    )
                  ) : (
                    <span className="text-slate-400">Not checked yet</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Backend Authorization Key (Optional)
                </label>
                <div className="relative">
                  <Key className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    placeholder="Bearer sk_live_..."
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-charcoal-950 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Sent as <code className="font-mono">Authorization: Bearer &lt;key&gt;</code> in all API calls.
                </p>
              </div>
            </div>
          </div>

          {/* Verification Engine Parameters */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Model & Verification Parameters</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Summarisation Model
                </label>
                <select
                  value={selectedModel}
                  onChange={e => setSelectedModel(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-charcoal-950 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-brand-500"
                >
                  <option value="mistral-7b-instruct-q4">Mistral-7B-Instruct (Quantized 4-bit)</option>
                  <option value="llama-3-8b-instruct">LLaMA-3 8B Instruct</option>
                  <option value="t5-large-govreport">T5-Large (Fine-tuned on GovReport)</option>
                  <option value="bert-extractive-lexrank">BERT-LexRank Centrality (Extractive)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Verification Entailment Threshold
                  </label>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                    {verificationThreshold}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="0.95"
                  step="0.05"
                  value={verificationThreshold}
                  onChange={e => setVerificationThreshold(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Confidence cutoff required to classify a claim as factually Supported.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy & Safety Information */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-charcoal-900/60 p-5 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Security & Privacy Guarantee</span>
            </div>
            <p className="leading-relaxed">
              ClarityAI never executes uploaded document content. All parsing occurs inside isolated sandbox memory. Documents are not shared or transferred to external third-party models unless explicitly configured by the user via the custom backend URL above.
            </p>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-2">
            <div>
              {savedSuccess && (
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Configuration saved successfully!</span>
                </span>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-md transition-all"
            >
              Save Configuration
            </button>
          </div>
        </form>
      ) : (
        /* API Contract Documentation View */
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              ClarityAI Backend API Specification (OpenAPI 3.1)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your Python backend (FastAPI / Flask / Django) must expose the following two standardized JSON endpoints to communicate with the ClarityAI frontend.
            </p>

            {/* Endpoint 1: Health */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  GET
                </span>
                <code className="text-xs font-mono font-semibold text-slate-900 dark:text-white">
                  /health
                </code>
              </div>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800">
{`{
  "status": "ok",
  "version": "1.0.0",
  "supportedModels": ["mistral-7b", "llama-3-8b", "lexrank"],
  "gpuAvailable": true,
  "activeProvider": "torch-cuda"
}`}
              </pre>
            </div>

            {/* Endpoint 2: Summarize and Verify */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  POST
                </span>
                <code className="text-xs font-mono font-semibold text-slate-900 dark:text-white">
                  /api/v1/summarize-and-verify
                </code>
              </div>
              <p className="text-xs text-slate-500">Request Body JSON payload:</p>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800">
{`{
  "document_text": "...",
  "document_title": "UK Clean Power 2030 Whitepaper",
  "method": "abstractive", // "abstractive" | "extractive" | "lead3"
  "target_length": "medium", // "short" | "medium" | "long"
  "reference_summary": "...", // Optional human ground truth for ROUGE
  "verification_threshold": 0.75
}`}
              </pre>
            </div>

            {/* Response Specification */}
            <div className="space-y-2 pt-4">
              <p className="text-xs text-slate-500">Response Body JSON payload:</p>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800">
{`{
  "summary": {
    "id": "sum-12345",
    "method": "abstractive",
    "text": "The UK aims for 100% clean power...",
    "wordCount": 138,
    "compressionRatio": 0.164,
    "claims": [
      {
        "id": "claim-1",
        "claimText": "Public capital commitment is £28B.",
        "status": "supported", // "supported" | "contradicted" | "needs_review"
        "confidenceScore": 0.98,
        "supportingPassage": "Treasury confirmed £28 billion...",
        "sourceLocation": { "section": "Section 2", "paragraph": 2 },
        "explanation": "Exact numerical and entity match found."
      }
    ],
    "metrics": {
      "hasReferenceSummary": true,
      "factualConsistency": {
        "consistencyRate": 92.5,
        "totalClaims": 4,
        "supportedClaims": 3,
        "contradictedClaims": 1,
        "unverifiedClaims": 0,
        "potentialHallucinations": 1
      },
      "rouge": {
        "rouge1": { "f1": 0.54 },
        "rouge2": { "f1": 0.28 },
        "rougeL": { "f1": 0.44 }
      }
    }
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
