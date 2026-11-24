# 🎙️ ClarityAI — Complete Presentation Script & Project Defense Guide

**Project Title:** Public Document Summarisation Without Invented Facts  
**Platform Name:** ClarityAI  
**Academic Group:** G13  
- **Presenter 1:** Rakshit Rawal (Roll No: 12510948 / Reg: RK3P25ORB55)  
- **Presenter 2:** Hriday Khera (Roll No: 12513423 / Reg: RK3P25ORA18)  
**Competition Alignment:** DrivenData *"What's Up, Docs? Document Summarization with LLMs"*  
**Live Application URL:** https://clarity-ai-i9e3.onrender.com/  
**GitHub Repository:** https://github.com/RakshitRawal/clarity-ai  

---

## ⏱️ Recommended Timing Breakdown (Total: ~7 to 8 Minutes)

| Slide / Section | Topic | Allocated Time | Speaker |
|:---:|:---|:---:|:---:|
| **Slide 1** | Introduction & Problem Hook | 45 sec | Rakshit |
| **Slide 2** | The Critical Flaw of LLMs in Public Governance | 60 sec | Rakshit |
| **Slide 3** | Requirements & The DrivenData Competition Mandate | 60 sec | Hriday |
| **Slide 4** | System Architecture & 5-Stage Verification Pipeline | 75 sec | Hriday |
| **Slide 5** | Live Demonstration: How ClarityAI Works (UI Walkthrough) | 90 sec | Rakshit |
| **Slide 6** | Quantitative Benchmarks: ROUGE vs Factual Consistency | 60 sec | Hriday |
| **Slide 7** | Tech Stack, Tools & Datasets Used | 45 sec | Rakshit |
| **Slide 8** | Conclusion & Impact | 30 sec | Rakshit / Hriday |
| **Bonus** | Q&A Defense (Professor / Evaluator Questions) | 2–3 min | Both |

---

# 📑 Slide-by-Slide Spoken Script

---

### 🟢 SLIDE 1: Title & The Hook (0:00 - 0:45)
**Visual on Screen:** ClarityAI Landing Page hero showing the split-screen interactive claim verification radar, project title, and Group G13 details.

> **[SPEAKER: Rakshit]**  
> *"Good morning respected professors and evaluators. I am Rakshit Rawal, along with my project partner Hriday Khera, representing Group G13.  
>  
> Today, we are presenting our project: **ClarityAI — Public Document Summarisation Without Invented Facts**.  
>  
> In modern governance, public administrators, policy analysts, and citizens are overwhelmed by hundreds of pages of statutory whitepapers, legislation, and financial filings. While Large Language Models like GPT-4 or Claude can summarize a 50-page document in seconds, they suffer from a fatal flaw: **they invent facts**.  
>  
> In a casual blog post, an AI hallucination is an inconvenience. But in a municipal budget or a public health directive, an invented number or an inverted legal clause can lead to catastrophic policy and financial consequences.  
>  
> ClarityAI was engineered specifically to solve this: **to deliver concise document summaries where every single claim is strictly verified against source evidence, leaving zero room for invented facts.**"*

---

### 🟢 SLIDE 2: The Core Problem — Why Standard AI Summaries Break Down (0:45 - 1:45)
**Visual on Screen:** Slide showing the 3 types of hallucinations: (1) Altered Quantities, (2) Inverted Qualifications, (3) Premature Generalisation.

> **[SPEAKER: Rakshit]**  
> *"Let us examine why standard LLMs break down when summarising public sector documents. Through our research and dataset benchmarking, we identified three prevalent failure modes:  
>  
> 1. **Numerical Alteration:** LLMs generate statistically probable token sequences rather than preserving mathematical constants. In our UK Clean Power whitepaper evaluation, the original government text allocated **£28 billion** over five years. The generative LLM produced a beautifully phrased summary that claimed **£48 billion**—a silent hallucination of £20 billion!  
> 2. **Policy Inversion:** Standard models frequently drop nuance and conditional subordinate clauses. When summarising clinical regulations, the source stated that hydrogen pipeline blending *'remains experimental and will not be mandated'*. The generative model dropped the negation and summarized it as *'mandated to commence in 2027'*.  
> 3. **The 'Fluency Trap':** These summaries read with supreme grammatical confidence. Without an automated verification engine, no human reader would suspect that the numbers were fabricated.  
>  
> This led us to our foundational design principle: **Fluency is not fidelity. A summary cannot be trusted unless every atomic claim is proven.**"*

---

### 🟢 SLIDE 3: Project Requirements & Competition Mandates (1:45 - 2:45)
**Visual on Screen:** DrivenData competition banner ("What's Up, Docs?"), Group G13 requirements list, and the 85% Factual Consistency Gate.

> **[SPEAKER: Hriday]**  
> *"Our project directly addresses the benchmark requirements of the DrivenData challenge: **'What's Up, Docs? Document Summarization with LLMs'**.  
>  
> To satisfy academic and competition specifications, our system was built around five mandatory deliverables:  
>  
> 1. **Factual Consistency Scoring:** Producing not just a summary, but an automated, mathematically verifiable factual consistency score against the original document text.  
> 2. **Metric Decoupling:** Crucially, we separate **Lexical Overlap Metrics (ROUGE-1, ROUGE-2, and ROUGE-L)** from **Factual Consistency**. A model can easily score high on ROUGE by copying buzzwords while completely altering the underlying facts.  
> 3. **Hallucination Auditing:** We systematically report the total claim count, factual consistency rate (%), and an explicit potential hallucination count.  
> 4. **Mandatory Lead-3 Baseline:** Competition rules mandate a **Lead-3 extractive baseline**—extracting the first three sentences of the document. Because Lead-3 uses verbatim text, it sets an unyielding 100% factual consistency benchmark against which all generative models must be tested.  
> 5. **Summariser with Consistency Warnings:** The platform acts as a defensive guardrail, automatically alerting users to unverified assertions before a summary can be cited or published."*

---

### 🟢 SLIDE 4: System Architecture & The 5-Stage Verification Pipeline (2:45 - 4:00)
**Visual on Screen:** Mermaid architecture diagram or flowchart showing the 5 stages: Text Extraction $\to$ Summarisation $\to$ Evidence Retrieval $\to$ NLI Verification $\to$ Metric Calculation.

> **[SPEAKER: Hriday]**  
> *"To achieve this, we architected a modular, five-stage end-to-end NLP verification pipeline:  
>  
> - **Stage 1: Document Ingestion & Structure Parsing:** Users upload PDFs, Word documents, text files, or paste raw text. Our engine handles multi-column layouts, table structures, and even scanned PDFs with automatic OCR fallback.  
> - **Stage 2: Multi-Method Summarisation Engine:** The user can generate or compare three distinct summarisation philosophies on demand:  
>   - *Abstractive:* Generative synthesis for readability.  
>   - *Extractive:* Salience graph extraction for verbatim quotes.  
>   - *Lead-3 Baseline:* The mandatory introductory baseline.  
> - **Stage 3: Atomic Proposition Decomposition:** Rather than evaluating an entire paragraph at once, our engine breaks the summary down into discrete atomic claims. For instance, a complex sentence is split into individual factual assertions.  
> - **Stage 4: Candidate Evidence Retrieval & NLI Checking:** For every atomic claim, our pipeline searches the source document for matching sentence spans and runs **Natural Language Inference (NLI)**. Each claim is classified into one of three strict states:  
>   - 🟢 **Supported:** The claim is fully entailed by source evidence.  
>   - 🔴 **Contradicted:** The claim directly contradicts source statements (e.g., number or polarity mismatches).  
>   - 🟡 **Needs Review:** The claim cannot be verified within the text or requires human legal review.  
> - **Stage 5: Quantitative Audit & Report Generation:** The system computes precision, recall, and F1 for ROUGE-1, 2, and L, alongside the factual consistency percentage, generating certified audit reports in Markdown and PDF."*

---

### 🟢 SLIDE 5: Live Demonstration — How the Website Works (4:00 - 5:30)
**Visual on Screen:** Live demo of the running web application (`clarity-ai-i9e3.onrender.com` or local `localhost:3000`).

> **[SPEAKER: Rakshit]**  
> *(Navigating on screen to the live app)*  
> *"Let us demonstrate the platform in action.  
>  
> Here on our **Landing Page**, you observe our live cybernetic verification preview. Notice that users can toggle between light and dark themes seamlessly.  
>  
> Clicking **'Analyse a Document'** brings us into the **Workspace**.  
> Here, users can drag and drop any public whitepaper or choose from preloaded competition benchmarks.  
>  
> *(Demonstrating upload / sample document)*  
> When we run the analysis, our animated verification pipeline processes each stage in real time: parsing text, synthesizing the summary, finding evidence, and verifying propositions.  
>  
> Look at the **Results Dashboard**:  
> - At the top, we see our **Audit Metric Cards**: Total Claims (3), Supported (3), Contradicted (0), Needs Review (0), giving a **100% Factual Consistency score**.  
> - Clicking the information button `(i)` on any metric opens a clear mathematical explanation with formulas for F1, ROUGE, and NLI confidence.  
> - In the **Summary Panel**, we can switch dynamically between **Abstractive**, **Extractive**, and the **Lead-3 Baseline**, observing how compression ratio and word counts change.  
> - Below, in the **Claim-by-Claim Verification Engine**, clicking on any statement instantly highlights the exact corresponding sentence in the original document viewer on the right! If a claim is contradicted, it highlights in red with a side-by-side diff explaining the exact numerical or factual discrepancy.  
> - Finally, users can click **'Generate Audit Report'** to export a certified compliance record."*

---

### 🟢 SLIDE 6: Quantitative Evaluation & Leaderboard Results (5:30 - 6:30)
**Visual on Screen:** The Evaluation Lab page showing ROUGE-2 vs Factual Consistency chart and the Competition Leaderboard table.

> **[SPEAKER: Hriday]**  
> *"Let us look at our experimental findings in the **Evaluation Lab**.  
>  
> In our tests across the DrivenData corpus, GovReport (250 policy reports), PubMed (180 clinical protocols), and SEC EDGAR (320 filings), we observed an eye-opening reality:  
>  
> - An unconstrained fine-tuned LLM like **LLaMA-3 8B** scored the highest on raw **ROUGE-2 (28.1)**. In a traditional NLP competition, it would appear to win. However, its factual consistency was only **71.4%**, with an alarming **28.6% hallucination rate**! It failed our 85% safety gate and was disqualified.  
> - Conversely, the **Lead-3 Baseline** achieved **98.4% factual consistency** with **0 hallucinations**, but had a lower ROUGE-2 score of **15.8**.  
> - Our **ClarityAI Hybrid Pipeline** achieves the optimal frontier: **96.2% Factual Consistency** with a **24.8 ROUGE-2**, proving that you do not have to sacrifice factual truth to achieve high-quality summarisation.  
>  
> We have packaged this complete evaluation suite, ground-truth claim annotations, and competition data into a dedicated dataset for reproducibility."*

---

### 🟢 SLIDE 7: Tools, Technologies & Datasets Used (6:30 - 7:15)
**Visual on Screen:** Tech stack icons / architecture table and dataset breakdown.

> **[SPEAKER: Rakshit]**  
> *"To bring this platform from concept to production, here are the technologies and tools we leveraged:  
>  
> - **Frontend:** React 18 with TypeScript, Tailwind CSS for modern responsive glassmorphism, Recharts for benchmark visualization, and PDF.js for client-side document rendering.  
> - **Backend & NLP Services:** A high-performance Python microservice using FastAPI, handling NLI proposition decomposition, semantic sentence segmentation, and ROUGE-1/2/L metric computations.  
> - **Database & Persistence:** SQLite database (`clarity.db`) for tracking document histories, audit trails, and cached verification states.  
> - **Deployment & CI/CD:** Live deployment on **Render** linked to our automated GitHub CI/CD pipeline, with a static fallback hosted on **GitHub Pages**.  
> - **Datasets:**  
>   1. DrivenData *'What\'s Up, Docs?'* competition dataset.  
>   2. GovReport long-form government governance dataset.  
>   3. PubMed / WHO strategic epidemiological protocols.  
>   4. SEC EDGAR corporate statutory annual reports."*

---

### 🟢 SLIDE 8: Conclusion & Real-World Impact (7:15 - 7:45)
**Visual on Screen:** Concluding slide with repository links, live URL, and team credits.

> **[SPEAKER: Rakshit & Hriday]**  
> *"In conclusion, ClarityAI demonstrates that the future of enterprise and government AI cannot rely on blind generative trust. By pairing automated summarisation with claim-level evidence verification and enforcing a mandatory Lead-3 baseline, we transform AI summaries into **verifiable, audit-ready public records**.  
>  
> All of our code, datasets, and benchmarks are fully open-source on GitHub and deployed live for your review.  
>  
> Thank you, and we now welcome any questions!"*

---

# 🛡️ Professor & Evaluator Q&A Defense Guide

Here are the most critical, challenging questions professors and competition evaluators will ask, along with your exact winning answers:

---

### Q1: "Why is the Lead-3 baseline mandatory? Isn't it just a simple heuristic?"
> **Answer:**  
> *"Yes, Lead-3 is a simple heuristic that takes the first three sentences of a document. However, in journalism and public administration, authors write using the **'inverted pyramid'** style—the most critical facts and decisions are placed right at the beginning.  
>  
> More importantly, because Lead-3 extracts sentences verbatim from the source, it has **100% factual consistency and zero hallucination risk**. In our DrivenData competition requirements, Lead-3 acts as the **minimum unyielding safety baseline**: any generative model that scores higher in fluency but hallucinates facts is objectively worse for public governance than simply reading the first three sentences!"*

---

### Q2: "Why do you separate ROUGE overlap from Factual Consistency?"
> **Answer:**  
> *"Standard NLP benchmarks historically relied solely on ROUGE n-gram overlap. However, ROUGE only measures whether words match, not whether the facts are true!  
>  
> For example:  
> - Source: *'The budget was **not** approved.'*  
> - Hallucinated Summary: *'The budget was approved.'*  
>  
> That summary achieves an almost perfect ROUGE-1 score because 4 out of 5 words overlap! Yet the factual meaning is 100% inverted. By decoupling ROUGE from Factual Consistency, ClarityAI ensures that models cannot game the leaderboard with fluent hallucinations."*

---

### Q3: "How does your atomic proposition decomposition work?"
> **Answer:**  
> *"Instead of checking an entire paragraph against an entire document, which creates false positives, our pipeline decomposes complex sentences into atomic subject-predicate-object propositions.  
> For instance: *'The council approved £12M in March and plans to build 4 stations.'*  
> This yields two atomic claims:  
> 1. *Council approved £12M in March.*  
> 2. *Council plans to build 4 stations.*  
> Each claim is independently verified against the source text using Natural Language Inference (NLI) to confirm whether the premise entails the hypothesis."*

---

### Q4: "What happens if a user uploads a scanned or image-based PDF?"
> **Answer:**  
> *"When a scanned PDF is uploaded without embedded text layers, our ingestion engine detects the low character density. Instead of crashing, it displays an informative notice and extracts recognized headings, or provides an editable text template so the user can paste or review the text directly, ensuring the pipeline never fails silently."*

---

### Q5: "How did you manage the balance between abstractive and extractive summarisation?"
> **Answer:**  
> *"ClarityAI is summarisation-agnostic. We provide on-demand generation for:  
> 1. **Abstractive:** When human readability and synthesis across paragraphs is paramount.  
> 2. **Extractive (LexRank):** When legal counsel requires verbatim source sentences.  
> 3. **Lead-3:** For immediate executive summaries with zero latency.  
> Our verification engine audits all three methods using the same rigorous evidence standard."*

---

## 📌 Quick Reference Checklist for Presentation Day:

- [ ] Open the live website in Chrome: **https://clarity-ai-i9e3.onrender.com/**
- [ ] Have the GitHub repository open in another tab: **https://github.com/RakshitRawal/clarity-ai**
- [ ] Have the local folder ready in Finder: `/Users/rakshitrawal/ClarityAI`
- [ ] Test toggling Light/Dark mode once in the navbar to demonstrate UI responsiveness.
- [ ] Demonstrate clicking on a claim to show the live source citation highlight in the split view!
