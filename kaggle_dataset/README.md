# ClarityAI — Public Document Summarisation & Factual Consistency Benchmark

**DrivenData Challenge:** *"What's Up, Docs? Document Summarization with LLMs"*  
**Challenge URL:** [https://www.drivendata.org/competitions/297/whats-up-docs/](https://www.drivendata.org/competitions/297/whats-up-docs/)  
**Academic Group:** Group G13  
- **Rakshit Rawal:** 12510948 / RK3P25ORB55  
- **Hriday Khera:** 12513423 / RK3P25ORA18  

---

## 📌 Dataset Overview

Summarising long public documents, government whitepapers, and statutory legislation is exactly where traditional Large Language Models (LLMs) hallucinate and invent facts. In governance and compliance, a hallucinated figure or altered clause is unacceptable.

This dataset compiles official benchmarks, training corpora, and claim-level verification annotations used in **ClarityAI** to evaluate:
1. **Overlap Metrics (ROUGE-1, ROUGE-2, ROUGE-L)** evaluated independently from factual consistency.
2. **Factual Consistency Rate (%)** calculated via strict Natural Language Inference (NLI) proposition checks.
3. **Potential Hallucination Count** flagging numerical alterations, policy inversions, and ungrounded statements.
4. **Mandatory Baseline:** The **Lead-3 extractive summary** (first three sentences of the document).

---

## 📁 Files In This Dataset

| File Name | Format | Description |
|:---|:---|:---|
| **`drivendata_whats_up_docs_competition.csv`** | CSV | Official leaderboard benchmark results comparing 7 models across ROUGE, Factual Consistency (%), and Qualification Gates. |
| **`domain_benchmarks_overview.csv`** | CSV | Evaluation breakdown across 3 long-form public document domains (GovReport, PubMed/WHO, and SEC EDGAR). |
| **`claims_annotation_ground_truth.csv`** | CSV | Detailed proposition-level annotations with status (`Supported`, `Contradicted`, `Needs Review`), exact source quotes, and confidence scores. |
| **`train.csv`** / **`train.jsonl`** | CSV / JSONL | Document corpus containing full texts, Lead-3 summaries, extractive summaries, abstractive summaries, and ground truth reference summaries. |
| **`dataset-metadata.json`** | JSON | Kaggle dataset metadata configuration file for one-click Kaggle upload. |

---

## 📊 Benchmark Leaderboard Summary

| Rank | Model Name | Architecture | ROUGE-2 | Factual Consistency (%) | Hallucination Rate (%) | Gate Status |
|:---:|:---|:---|:---:|:---:|:---:|:---:|
| **1** | **ClarityAI Hybrid (Ours)** | NLI-Constrained Hybrid | **24.8** | **96.2%** | **2.1%** | **PASSED (Gold)** |
| 2 | Constrained LexRank Ensemble | Pure Extractive Graph | 20.4 | 98.4% | 1.6% | PASSED (Silver) |
| 3 | Claude 3.5 Sonnet | Proprietary LLM | 23.0 | 85.0% | 9.4% | PASSED (Bronze) |
| 4 | GPT-4o Zero-Shot | Proprietary LLM | 22.1 | 81.5% | 12.8% | DISQUALIFIED (<85%) |
| 5 | **Lead-3 Extractive Baseline** | Opening 3 Sentences | **15.8** | **98.4%** | **0.0%** | **BASELINE** |
| 6 | Llama 3 70B Instruct | Open-Weights LLM | 20.9 | 78.4% | 15.6% | DISQUALIFIED (<85%) |
| 7 | Unconstrained LLaMA-3 8B | Fine-Tuned Abstractive | 28.1 | 71.4% | 28.6% | DISQUALIFIED (High Hallucination) |

> **Key Finding:** While unconstrained abstractive LLMs achieve high surface-level ROUGE scores (e.g. 28.1 ROUGE-2), they suffer an alarming **28.6% hallucination rate** (altering budgets like £28B $\to$ £48B). ClarityAI enforces an $85\%$ factual consistency gate, penalising hallucinated fluency.

---

## 🐍 How to Load in Python / Pandas

```python
import pandas as pd

# 1. Load the official DrivenData competition benchmark
df_competition = pd.read_csv('drivendata_whats_up_docs_competition.csv')
print(df_competition[['Model_Name', 'ROUGE_2', 'Factual_Consistency_Pct', 'Passed_Consistency_Gate']])

# 2. Load claim-level verification annotations
df_claims = pd.read_csv('claims_annotation_ground_truth.csv')
print(df_claims[['Claim_Text', 'Verification_Status', 'Cited_Evidence_Quote']])

# 3. Load document training corpus
df_train = pd.read_csv('train.csv')
print(df_train[['Document_Title', 'Domain', 'ROUGE_L', 'Factual_Consistency_Score']])
```

---

## 🚀 How to Upload This Dataset to Kaggle

### Method A: Via Kaggle Web UI (Recommended)
1. Go to **[https://www.kaggle.com/datasets](https://www.kaggle.com/datasets)**
2. Click **"+ New Dataset"** (top right).
3. Drag & drop all files inside this `/Users/rakshitrawal/ClarityAI/kaggle_dataset/` folder.
4. Set title to: `ClarityAI - Public Document Summarisation & Factual Consistency Benchmark`.
5. Click **"Create"**.

### Method B: Via Kaggle CLI
If you have `kaggle` API token (`~/.kaggle/kaggle.json`):
```bash
cd /Users/rakshitrawal/ClarityAI/kaggle_dataset
kaggle datasets create -p .
```
