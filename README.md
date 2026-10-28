# ClarityAI — AI-Powered Factual Document Summarisation

> **Brand Tagline:** “Clarity in every summary. Evidence behind every claim.”  
> **Product Category:** AI Document Intelligence and Factual Verification  
> **Hackathon Theme:** Public Document Summarisation Without Invented Facts

---

## 1. Overview & Core Mission

Standard generative language models produce persuasive summaries of public whitepapers, government bills, and financial disclosures. However, they frequently suffer from subtle, high-consequence failure modes:
1. **Altered quantities & dates** (e.g., transforming £28 billion of seed capital into £48 billion).
2. **Inverted policy mandates** (e.g., turning voluntary safety trials into mandatory regulations).
3. **Extrapolated conclusions** without textual grounding.

**ClarityAI** bridges the gap between concise executive summarisation and strict factual verification. Every summary assertion is decomposed into atomic claims, cross-referenced with exact source document evidence, and classified with transparent confidence scores.

---

## 2. Key Capabilities & Architecture

- **Multi-Method Summarisation:**
  - **Extractive (100% Faithful):** Centroid and LexRank centrality extraction. Guarantees zero invented statements.
  - **Abstractive (High Fluency):** Generative summarisation with real-time claim verification supervision.
  - **Lead-3 Baseline:** Standard NLP opening-three-sentence baseline for empirical comparison.
- **Interactive Two-Column Verification Workspace:**
  - **Left Pane:** Generated summary, word counts, compression ratio, filterable claim cards (Supported, Contradicted, Needs Review).
  - **Right Pane:** Document viewer with auto-scroll and dynamic highlighting of corresponding source passages.
- **Empirical Evaluation Lab:**
  - Side-by-side comparison across **GovReport**, **PubMed/WHO**, and **SEC 10-K** benchmarks.
  - Interactive charts demonstrating the **Alignment Paradox**: why high ROUGE overlap does not guarantee factual truth.
  - Official Document Summarisation Competition configuration with **ROUGE-2 F1** as primary metric and factual consistency gating.
- **Formal Audit Reports:**
  - Exportable in Markdown, plain text, and structured JSON, with full print-to-PDF formatting for compliance.
- **Hybrid Execution Engine:**
  - **Demo Mode:** Bundled real-world public documents with pre-verified ground truths and an in-browser n-gram & entity verification heuristic engine for custom text.
  - **Live Backend API:** Fully typed REST client connecting to local or remote Python FastAPI / PyTorch inference servers.

---

## 3. Technology Stack

- **Frontend Framework:** React 18 + TypeScript + Vite
- **Styling & UI:** Tailwind CSS, custom design tokens, accessible dark & light theme system
- **Iconography:** Lucide React
- **Data Visualisation:** Recharts (Responsive bar and comparison charts)
- **Routing:** React Router v6
- **Backend Reference:** Python 3.10+ / FastAPI / Pydantic

---

## 4. Getting Started

### Prerequisites
- Node.js (v18.0.0 or later)
- npm (v9.0.0 or later)
- (Optional) Python 3.10+ for the live FastAPI backend

### Installation

1. Navigate to the project directory:
   ```bash
   cd /Users/rakshitrawal/.gemini/antigravity/scratch/clarity-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the Vite development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build locally:
   ```bash
   npm run preview
   ```

---

## 5. (Optional) Running the Python Backend Service

To connect the application to a live Python summarisation and verification backend:

1. Install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. Start the FastAPI server:
   ```bash
   python3 -m uvicorn main:app --reload --port 8000
   ```

3. In the ClarityAI web application:
   - Navigate to **Settings** (`/app/settings`).
   - Switch execution mode to **Live Python Backend API**.
   - Click **Ping /health** to confirm connection.

---

## 6. Frontend-to-Backend API Contract

### Health Check Endpoint
- **URL:** `GET /health`
- **Response:**
  ```json
  {
    "status": "ok",
    "version": "1.0.0",
    "supportedModels": ["mistral-7b-instruct-q4", "llama-3-8b-instruct", "bert-extractive-lexrank"],
    "gpuAvailable": true,
    "activeProvider": "torch-cuda"
  }
  ```

### Summarise & Verify Endpoint
- **URL:** `POST /api/v1/summarize-and-verify`
- **Request Body:**
  ```json
  {
    "document_text": "DEPARTMENT FOR ENERGY SECURITY AND NET ZERO...",
    "document_title": "UK Clean Power 2030 Action Framework",
    "method": "abstractive",
    "target_length": "medium",
    "reference_summary": "Optional human ground-truth summary for ROUGE evaluation",
    "verification_threshold": 0.75,
    "model_name": "mistral-7b-instruct-q4"
  }
  ```
- **Response Body:**
  ```json
  {
    "summary": {
      "id": "sum-uk-abs",
      "method": "abstractive",
      "text": "The UK government has committed to delivering a clean grid...",
      "wordCount": 138,
      "compressionRatio": 0.164,
      "generationTimeMs": 1420,
      "targetLength": "medium",
      "claims": [
        {
          "id": "claim-1",
          "claimText": "The UK committed to 100% clean power by 2030.",
          "status": "supported",
          "confidenceScore": 0.98,
          "supportingPassage": "The United Kingdom has committed to achieving a clean electricity system by 2030...",
          "sourceLocation": { "section": "Section 1", "paragraph": 1 },
          "explanation": "Directly supported by the strategic vision outlined in Section 1."
        }
      ],
      "metrics": {
        "hasReferenceSummary": true,
        "factualConsistency": {
          "consistencyRate": 40.0,
          "totalClaims": 5,
          "supportedClaims": 2,
          "contradictedClaims": 2,
          "unverifiedClaims": 1,
          "potentialHallucinations": 3
        },
        "rouge": {
          "rouge1": { "precision": 0.54, "recall": 0.58, "f1": 0.559 },
          "rouge2": { "precision": 0.28, "recall": 0.31, "f1": 0.294 },
          "rougeL": { "precision": 0.44, "recall": 0.47, "f1": 0.454 }
        }
      }
    }
  }
  ```

---

## 7. Security & Privacy Guarantees

- **No Remote Data Exfiltration:** In Demo Mode, documents are evaluated locally inside the client's browser sandbox and never transmitted to third-party APIs.
- **Safe Content Parsing:** Content is treated purely as inert text and never executed as executable script.
- **No Secret Leakage:** Frontend client does not hardcode proprietary API keys.

---

## 8. License

MIT License. Designed and built for the hackathon project *Public Document Summarisation Without Invented Facts*.
