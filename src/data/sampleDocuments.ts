import { ClarityDocument } from '../types';
import { calculateRouge } from '../services/rougeCalculator';

export const SAMPLE_DOCUMENTS: ClarityDocument[] = [
  {
    id: 'doc-uk-clean-energy-2026',
    title: 'UK Clean Power 2030 Action Framework & Grid Decarbonisation Strategy',
    category: 'Government Policy',
    fileType: 'pdf',
    fileSize: '1.8 MB',
    wordCount: 842,
    uploadedAt: '2026-10-24T09:30:00Z',
    isSample: true,
    originalText: `DEPARTMENT FOR ENERGY SECURITY AND NET ZERO
WHITE PAPER: ACCELERATING THE CLEAN POWER 2030 TRANSITION

Section 1: Strategic Vision and Primary Objectives
The United Kingdom has committed to achieving a clean electricity system by 2030, reducing dependency on volatile international gas markets and lowering domestic consumer bills over the decade. To achieve this objective, Great Britain must more than double its current onshore wind capacity to 35 GW, quadruple offshore wind to 55 GW, and triple solar power to 50 GW. The national transmission grid must undergo its most comprehensive expansion in eight decades. 

Section 2: Capital Allocation and Financing Structure
The Secretary of State announces an allocated public capital commitment of £28 billion over five years to de-risk high-voltage direct current (HVDC) subsea links and strategic distribution upgrades. This public seed capital is projected to crowd in approximately £60 billion of institutional private investment. Treasury modeling indicates that every £1 of public capital deployed will unlock £2.15 of private infrastructure capital. Crucially, nuclear fission baseload generation remains a foundational pillar of system reliability, maintaining an anticipated 24% share of firm capacity through 2045 via Sizewell C and small modular reactors (SMRs).

Section 3: Planning Reforms and Statutory Instruments
Planning reform represents the critical path for grid delivery. Under Statutory Instrument 104, national grid connection queues will transition from a legacy 'first-come, first-served' model to a 'first-ready, first-connected' regime. Developers holding active planning consents will receive expedited spatial priority, reducing average transmission connection waiting times from 11 years down to 4.2 years by 2028.

Section 4: System Flexibility, Storage, and Emerging Carriers
Grid stability requires 20 GW of long-duration energy storage (LDES) and battery storage assets by 2030. Regarding hydrogen infrastructure, the department will support non-binding feasibility trials across select industrial clusters. However, blending hydrogen into domestic residential distribution pipelines remains under experimental review and will not be mandated until comprehensive safety testing concludes in late 2029. Independent system operator analysis projects that system balancing costs will peak in 2027 before declining by 32% once regional battery storage assets achieve commercial operation.`,
    referenceSummary: `The UK government has set a target for a clean electricity system by 2030 by expanding onshore wind to 35 GW, offshore wind to 55 GW, and solar to 50 GW. The strategy commits £28 billion of public capital over five years to unlock private investment and confirms nuclear baseload will supply 24% of firm capacity through 2045. Statutory Instrument 104 will reform grid connection queues to cut waiting times from 11 to 4.2 years. Domestic residential hydrogen blending is subject to non-binding safety trials rather than mandatory rollout, while 20 GW of energy storage is planned to reduce balancing costs.`,
    activeMethod: 'abstractive',
    processingStatus: 'completed',
    summaries: {
      abstractive: {
        id: 'sum-uk-abs',
        method: 'abstractive',
        targetLength: 'medium',
        generationTimeMs: 1420,
        wordCount: 138,
        compressionRatio: 0.164,
        text: `The UK government has committed to delivering a fully clean electricity grid by 2030 through large-scale wind and solar installations. The Secretary of State announced a public capital investment of £48 billion over five years to fund grid infrastructure upgrades. Conventional nuclear fission will be completely phased out of the national capacity mix by 2032 to prioritize renewables. Planning bottlenecks will be streamlined under Statutory Instrument 104 to reduce grid connection waiting times to 4.2 years. Furthermore, hydrogen blending into domestic residential pipelines is mandated to commence in Q3 2027 across all municipal networks.`,
        claims: [
          {
            id: 'claim-1',
            claimText: 'The UK government has committed to delivering a clean electricity grid by 2030 through wind and solar installations.',
            status: 'supported',
            confidenceScore: 0.98,
            supportingPassage: 'The United Kingdom has committed to achieving a clean electricity system by 2030... Great Britain must more than double its current onshore wind capacity to 35 GW, quadruple offshore wind to 55 GW, and triple solar power to 50 GW.',
            sourceLocation: { section: 'Section 1', paragraph: 1 },
            explanation: 'Directly supported by the strategic vision outlined in Section 1.',
          },
          {
            id: 'claim-2',
            claimText: 'The Secretary of State announced a public capital investment of £48 billion over five years for grid infrastructure.',
            status: 'contradicted',
            confidenceScore: 0.96,
            conflictingPassage: 'The Secretary of State announces an allocated public capital commitment of £28 billion over five years to de-risk high-voltage direct current (HVDC) subsea links...',
            sourceLocation: { section: 'Section 2', paragraph: 2 },
            explanation: 'Numerical hallucination: The summary fabricated £48 billion, whereas the official whitepaper explicitly commits £28 billion.',
          },
          {
            id: 'claim-3',
            claimText: 'Conventional nuclear fission will be completely phased out of the national capacity mix by 2032.',
            status: 'contradicted',
            confidenceScore: 0.99,
            conflictingPassage: 'Crucially, nuclear fission baseload generation remains a foundational pillar of system reliability, maintaining an anticipated 24% share of firm capacity through 2045...',
            sourceLocation: { section: 'Section 2', paragraph: 2 },
            explanation: 'Direct factual contradiction: The source confirms nuclear will maintain a 24% capacity share through 2045, rather than being phased out.',
          },
          {
            id: 'claim-4',
            claimText: 'Planning bottlenecks will be streamlined under Statutory Instrument 104 to reduce grid connection waiting times to 4.2 years.',
            status: 'supported',
            confidenceScore: 0.95,
            supportingPassage: 'Under Statutory Instrument 104, national grid connection queues will transition... reducing average transmission connection waiting times from 11 years down to 4.2 years by 2028.',
            sourceLocation: { section: 'Section 3', paragraph: 3 },
            explanation: 'Supported: Accurately reflects the statutory instrument and target timeline.',
          },
          {
            id: 'claim-5',
            claimText: 'Hydrogen blending into domestic residential pipelines is mandated to commence in Q3 2027 across all municipal networks.',
            status: 'needs_review',
            confidenceScore: 0.88,
            conflictingPassage: 'blending hydrogen into domestic residential distribution pipelines remains under experimental review and will not be mandated until comprehensive safety testing concludes in late 2029.',
            sourceLocation: { section: 'Section 4', paragraph: 4 },
            explanation: 'Unsupported policy assertion: Source text specifies domestic hydrogen blending will not be mandated and remains experimental.',
          },
        ],
        metrics: {
          hasReferenceSummary: true,
          factualConsistency: {
            consistencyRate: 40.0,
            totalClaims: 5,
            supportedClaims: 2,
            contradictedClaims: 2,
            unverifiedClaims: 1,
            potentialHallucinations: 3,
            hallucinationPrecision: 0.94,
            hallucinationRecall: 0.92,
          },
          rouge: {
            rouge1: { precision: 0.54, recall: 0.58, f1: 0.559 },
            rouge2: { precision: 0.28, recall: 0.31, f1: 0.294 },
            rougeL: { precision: 0.44, recall: 0.47, f1: 0.454 },
          },
          lead3Comparison: {
            rouge1Diff: +0.08,
            rouge2Diff: +0.04,
            rougeLDiff: +0.05,
            factualDiff: -60.0, // Shows high ROUGE but catastrophic factual drop!
          },
        },
      },
      extractive: {
        id: 'sum-uk-ext',
        method: 'extractive',
        targetLength: 'medium',
        generationTimeMs: 410,
        wordCount: 122,
        compressionRatio: 0.145,
        text: `The United Kingdom has committed to achieving a clean electricity system by 2030, reducing dependency on volatile international gas markets. The Secretary of State announces an allocated public capital commitment of £28 billion over five years to de-risk high-voltage direct current links. Crucially, nuclear fission baseload generation remains a foundational pillar maintaining an anticipated 24% share through 2045. Under Statutory Instrument 104, national grid connection queues will transition to a 'first-ready, first-connected' regime, reducing average waiting times to 4.2 years.`,
        claims: [
          {
            id: 'claim-ext-1',
            claimText: 'The UK has committed to achieving a clean electricity system by 2030.',
            status: 'supported',
            confidenceScore: 1.0,
            supportingPassage: 'The United Kingdom has committed to achieving a clean electricity system by 2030...',
            sourceLocation: { section: 'Section 1', paragraph: 1 },
            explanation: 'Exact verbatim sentence extract from source document.',
          },
          {
            id: 'claim-ext-2',
            claimText: 'Public capital commitment is allocated at £28 billion over five years for high-voltage links.',
            status: 'supported',
            confidenceScore: 0.99,
            supportingPassage: 'The Secretary of State announces an allocated public capital commitment of £28 billion over five years...',
            sourceLocation: { section: 'Section 2', paragraph: 2 },
            explanation: 'Exact numerical extract verified without entity substitution.',
          },
          {
            id: 'claim-ext-3',
            claimText: 'Nuclear fission baseload generation will maintain a 24% share through 2045.',
            status: 'supported',
            confidenceScore: 1.0,
            supportingPassage: 'Crucially, nuclear fission baseload generation remains a foundational pillar... maintaining an anticipated 24% share of firm capacity through 2045.',
            sourceLocation: { section: 'Section 2', paragraph: 2 },
            explanation: 'Extracted verbatim with zero factual distortion.',
          },
          {
            id: 'claim-ext-4',
            claimText: 'Statutory Instrument 104 transitions grid connections to a first-ready regime to cut wait times to 4.2 years.',
            status: 'supported',
            confidenceScore: 0.98,
            supportingPassage: 'Under Statutory Instrument 104, national grid connection queues will transition from a legacy first-come first-served model...',
            sourceLocation: { section: 'Section 3', paragraph: 3 },
            explanation: 'Extracted directly from Section 3 planning reform text.',
          },
        ],
        metrics: {
          hasReferenceSummary: true,
          factualConsistency: {
            consistencyRate: 100.0,
            totalClaims: 4,
            supportedClaims: 4,
            contradictedClaims: 0,
            unverifiedClaims: 0,
            potentialHallucinations: 0,
            hallucinationPrecision: 1.0,
            hallucinationRecall: 1.0,
          },
          rouge: {
            rouge1: { precision: 0.62, recall: 0.55, f1: 0.582 },
            rouge2: { precision: 0.35, recall: 0.32, f1: 0.334 },
            rougeL: { precision: 0.51, recall: 0.46, f1: 0.483 },
          },
        },
      },
      lead3: {
        id: 'sum-uk-lead3',
        method: 'lead3',
        targetLength: 'short',
        generationTimeMs: 15,
        wordCount: 88,
        compressionRatio: 0.104,
        text: `The United Kingdom has committed to achieving a clean electricity system by 2030, reducing dependency on volatile international gas markets and lowering domestic consumer bills over the decade. To achieve this objective, Great Britain must more than double its current onshore wind capacity to 35 GW, quadruple offshore wind to 55 GW, and triple solar power to 50 GW. The national transmission grid must undergo its most comprehensive expansion in eight decades.`,
        claims: [
          {
            id: 'claim-lead-1',
            claimText: 'UK committed to achieving a clean electricity system by 2030.',
            status: 'supported',
            confidenceScore: 1.0,
            supportingPassage: 'The United Kingdom has committed to achieving a clean electricity system by 2030...',
            sourceLocation: { section: 'Section 1', paragraph: 1 },
            explanation: 'First sentence of source document.',
          },
          {
            id: 'claim-lead-2',
            claimText: 'Great Britain must reach 35 GW onshore wind, 55 GW offshore wind, and 50 GW solar.',
            status: 'supported',
            confidenceScore: 1.0,
            supportingPassage: 'To achieve this objective, Great Britain must more than double its current onshore wind capacity to 35 GW...',
            sourceLocation: { section: 'Section 1', paragraph: 1 },
            explanation: 'Second sentence of source document.',
          },
        ],
        metrics: {
          hasReferenceSummary: true,
          factualConsistency: {
            consistencyRate: 100.0,
            totalClaims: 2,
            supportedClaims: 2,
            contradictedClaims: 0,
            unverifiedClaims: 0,
            potentialHallucinations: 0,
          },
          rouge: {
            rouge1: { precision: 0.48, recall: 0.39, f1: 0.430 },
            rouge2: { precision: 0.26, recall: 0.22, f1: 0.238 },
            rougeL: { precision: 0.41, recall: 0.34, f1: 0.371 },
          },
        },
      },
      compare_both: undefined,
    },
  },
  {
    id: 'doc-fed-monetary-policy-2026',
    title: 'Federal Reserve Monetary Policy & Liquidity Conditions Report',
    category: 'Financial & Economic',
    fileType: 'pdf',
    fileSize: '2.4 MB',
    wordCount: 915,
    uploadedAt: '2026-10-22T14:15:00Z',
    isSample: true,
    originalText: `FEDERAL RESERVE SYSTEM: MONETARY POLICY REPORT TO CONGRESS

1. Economic Activity and the Labor Market
Labor market conditions remained solid during the third quarter of 2026, with payroll employment gains averaging 145,000 per month. The unemployment rate stood at 4.1 percent in September, consistent with estimates of the natural rate of unemployment. Gross domestic product (GDP) expanded at an annualized rate of 2.3 percent, supported by resilient consumer spending and non-residential fixed investment.

2. Inflation Dynamics and Monetary Policy Stance
The Federal Open Market Committee (FOMC) maintains its target range for the federal funds rate at 4.25 to 4.50 percent. Twelve-month headline Personal Consumption Expenditures (PCE) inflation registered at 2.4 percent in August, down from 3.1 percent twelve months prior. Core PCE inflation, which excludes volatile food and energy components, registered at 2.7 percent. While inflation has eased substantially toward the Committee's 2.0 percent long-run objective, committee participants noted that wage growth of 3.8 percent continues to outpace long-run productivity trends.

3. Balance Sheet Normalization
The Committee continues its runoff of Treasury securities and agency mortgage-backed securities (MBS) at monthly caps of $25 billion and $15 billion, respectively. Total Federal Reserve assets have contracted by $2.1 trillion from their peak. Overnight reverse repurchase facility (ON RRP) usage stabilized near $320 billion, indicating that money market liquidity remains ample across the depository system.

4. Financial Stability and Credit Intermediation
Credit performance remains disciplined among large insured depository institutions. However, regional banking institutions face concentrated refinancing risk in commercial real estate (CRE) debt maturing across 2027 and 2028. Specifically, delinquency rates on office-backed commercial mortgages reached 6.8 percent, prompting supervisory scrutiny of loan loss reserve provisions.`,
    referenceSummary: `The Federal Reserve held the federal funds target range at 4.25 to 4.50 percent amid solid labor conditions with 4.1 percent unemployment. Headline PCE inflation declined to 2.4 percent while core PCE was 2.7 percent, nearing the 2.0 percent goal. Balance sheet reduction continues with monthly caps of $25 billion for Treasuries and $15 billion for agency MBS. Regional banks face elevated refinancing stress in commercial real estate with office delinquency rates rising to 6.8 percent.`,
    activeMethod: 'abstractive',
    processingStatus: 'completed',
    summaries: {
      abstractive: {
        id: 'sum-fed-abs',
        method: 'abstractive',
        targetLength: 'medium',
        generationTimeMs: 1250,
        wordCount: 112,
        compressionRatio: 0.122,
        text: `The Federal Open Market Committee voted unanimously to lower the federal funds rate by 50 basis points to 3.75 percent as inflation reached its exact 2.0 percent target. Monthly job gains averaged 145,000 with unemployment at 4.1 percent. The Fed has ceased its balance sheet runoff program to support financial stability. Meanwhile, office-backed commercial real estate defaults surged to 14.5 percent, threatening systemic failure among regional institutions.`,
        claims: [
          {
            id: 'claim-fed-1',
            claimText: 'The FOMC voted to lower the federal funds rate by 50 basis points to 3.75 percent.',
            status: 'contradicted',
            confidenceScore: 0.97,
            conflictingPassage: 'The Federal Open Market Committee (FOMC) maintains its target range for the federal funds rate at 4.25 to 4.50 percent.',
            sourceLocation: { section: 'Section 2', paragraph: 2 },
            explanation: 'Invented action: The source states rates were maintained at 4.25-4.50%, not reduced to 3.75%.',
          },
          {
            id: 'claim-fed-2',
            claimText: 'Headline PCE inflation reached its exact 2.0 percent target.',
            status: 'contradicted',
            confidenceScore: 0.95,
            conflictingPassage: 'Twelve-month headline Personal Consumption Expenditures (PCE) inflation registered at 2.4 percent... Core PCE inflation registered at 2.7 percent.',
            sourceLocation: { section: 'Section 2', paragraph: 2 },
            explanation: 'Altered metric: Inflation was 2.4% (headline) and 2.7% (core), approaching but not yet at the 2.0% target.',
          },
          {
            id: 'claim-fed-3',
            claimText: 'Payroll employment gains averaged 145,000 per month with unemployment at 4.1 percent.',
            status: 'supported',
            confidenceScore: 0.99,
            supportingPassage: 'payroll employment gains averaging 145,000 per month. The unemployment rate stood at 4.1 percent in September...',
            sourceLocation: { section: 'Section 1', paragraph: 1 },
            explanation: 'Directly supported by Section 1 employment figures.',
          },
          {
            id: 'claim-fed-4',
            claimText: 'The Fed has ceased balance sheet runoff.',
            status: 'contradicted',
            confidenceScore: 0.96,
            conflictingPassage: 'The Committee continues its runoff of Treasury securities and agency mortgage-backed securities (MBS) at monthly caps of $25 billion and $15 billion...',
            sourceLocation: { section: 'Section 3', paragraph: 3 },
            explanation: 'Contradiction: Source confirms runoff continues at $25B and $15B caps.',
          },
          {
            id: 'claim-fed-5',
            claimText: 'Office-backed commercial real estate defaults surged to 14.5 percent.',
            status: 'contradicted',
            confidenceScore: 0.98,
            conflictingPassage: 'Specifically, delinquency rates on office-backed commercial mortgages reached 6.8 percent...',
            sourceLocation: { section: 'Section 4', paragraph: 4 },
            explanation: 'Hallucinated statistic: Source reports 6.8% delinquency, not 14.5% default rate.',
          },
        ],
        metrics: {
          hasReferenceSummary: true,
          factualConsistency: {
            consistencyRate: 20.0,
            totalClaims: 5,
            supportedClaims: 1,
            contradictedClaims: 4,
            unverifiedClaims: 0,
            potentialHallucinations: 4,
            hallucinationPrecision: 0.96,
            hallucinationRecall: 0.95,
          },
          rouge: {
            rouge1: { precision: 0.44, recall: 0.41, f1: 0.424 },
            rouge2: { precision: 0.19, recall: 0.17, f1: 0.179 },
            rougeL: { precision: 0.36, recall: 0.33, f1: 0.344 },
          },
        },
      },
      extractive: {
        id: 'sum-fed-ext',
        method: 'extractive',
        targetLength: 'medium',
        generationTimeMs: 380,
        wordCount: 96,
        compressionRatio: 0.105,
        text: `The Federal Open Market Committee maintains its target range for the federal funds rate at 4.25 to 4.50 percent. Headline PCE inflation registered at 2.4 percent, while unemployment stood at 4.1 percent. The Committee continues its runoff of Treasury securities and agency MBS at monthly caps of $25 billion and $15 billion. Delinquency rates on office-backed commercial mortgages reached 6.8 percent, prompting supervisory scrutiny.`,
        claims: [
          {
            id: 'claim-fed-ext-1',
            claimText: 'FOMC maintains target federal funds rate at 4.25 to 4.50 percent.',
            status: 'supported',
            confidenceScore: 1.0,
            supportingPassage: 'The Federal Open Market Committee (FOMC) maintains its target range for the federal funds rate at 4.25 to 4.50 percent.',
            sourceLocation: { section: 'Section 2', paragraph: 2 },
            explanation: 'Verbatim extraction.',
          },
          {
            id: 'claim-fed-ext-2',
            claimText: 'Headline PCE inflation is 2.4% and unemployment is 4.1%.',
            status: 'supported',
            confidenceScore: 1.0,
            supportingPassage: 'Twelve-month headline Personal Consumption Expenditures (PCE) inflation registered at 2.4 percent... unemployment rate stood at 4.1 percent...',
            sourceLocation: { section: 'Section 1 & 2', paragraph: 1 },
            explanation: 'Accurate numerical alignment.',
          },
          {
            id: 'claim-fed-ext-3',
            claimText: 'Runoff caps are $25 billion for Treasuries and $15 billion for agency MBS.',
            status: 'supported',
            confidenceScore: 1.0,
            supportingPassage: 'monthly caps of $25 billion and $15 billion, respectively.',
            sourceLocation: { section: 'Section 3', paragraph: 3 },
            explanation: 'Directly supported by Section 3.',
          },
        ],
        metrics: {
          hasReferenceSummary: true,
          factualConsistency: {
            consistencyRate: 100.0,
            totalClaims: 3,
            supportedClaims: 3,
            contradictedClaims: 0,
            unverifiedClaims: 0,
            potentialHallucinations: 0,
          },
          rouge: {
            rouge1: { precision: 0.65, recall: 0.58, f1: 0.613 },
            rouge2: { precision: 0.38, recall: 0.34, f1: 0.358 },
            rougeL: { precision: 0.53, recall: 0.48, f1: 0.504 },
          },
        },
      },
      lead3: undefined,
      compare_both: undefined,
    },
  },
  {
    id: 'doc-who-pathogen-genomics',
    title: 'WHO Global Pathogen Surveillance & Genomic Sequencing Protocol',
    category: 'Public Health',
    fileType: 'docx',
    fileSize: '1.2 MB',
    wordCount: 760,
    uploadedAt: '2026-10-18T11:00:00Z',
    isSample: true,
    originalText: `WORLD HEALTH ORGANIZATION TECHNICAL GUIDANCE
GENOMIC SURVEILLANCE PROTOCOLS FOR RESPIRATORY PATHOGENS WITH EPIDEMIC POTENTIAL

1. Standardized Timelines for Rapid Characterization
National public health reference laboratories are recommended to complete whole-genome sequencing (WGS) of atypical viral pathogens within 72 hours of primary specimen collection. High-throughput sequencing data should be uploaded to the Global Influenza Surveillance and Response System (GISRS) or open-access repositories within 24 hours of sequence assembly validation.

2. Equitable Access and Benefit-Sharing (Nagoya Protocol Alignment)
Sharing biological materials and associated genetic sequence data (GSD) must align with fair, transparent benefit-sharing arrangements. Member states are encouraged to contribute to the WHO BioHub System, establishing standardized Material Transfer Agreements (SMTAs). The guidance recommends that at least 15% of annual therapeutic and diagnostic manufacturing allotments originating from shared pathogen sequences be reserved for low- and middle-income nations during public health emergencies.

3. Decentralized Laboratory Capabilities
Investment priority should center on low-cost sequencing platforms that do not require continuous ultra-cold chain storage (-80°C). Point-of-care capillary and nanopore sequencing technologies operating within ambient temperatures (15°C to 30°C) should be pre-positioned across 65 priority regional sentinel hospital laboratories by Q4 2027.`,
    referenceSummary: `The WHO technical guidance recommends that national reference laboratories sequence atypical respiratory pathogens within 72 hours and upload validated data within 24 hours. Benefit-sharing provisions recommend reserving at least 15% of emergency therapeutics and diagnostics derived from shared genetic sequence data for low- and middle-income countries. Decentralized sequencing strategies prioritize ambient-temperature platforms across 65 regional sentinel hospital sites by late 2027.`,
    activeMethod: 'extractive',
    processingStatus: 'completed',
    summaries: {
      extractive: {
        id: 'sum-who-ext',
        method: 'extractive',
        targetLength: 'medium',
        generationTimeMs: 360,
        wordCount: 78,
        compressionRatio: 0.102,
        text: `National public health reference laboratories are recommended to complete whole-genome sequencing of atypical viral pathogens within 72 hours of primary specimen collection. The guidance recommends that at least 15% of annual therapeutic and diagnostic manufacturing allotments be reserved for low- and middle-income nations during emergencies. Ambient-temperature sequencing technologies should be pre-positioned across 65 priority regional sentinel hospital laboratories by Q4 2027.`,
        claims: [
          {
            id: 'claim-who-1',
            claimText: 'WGS of atypical viral pathogens is recommended within 72 hours of collection.',
            status: 'supported',
            confidenceScore: 0.99,
            supportingPassage: 'National public health reference laboratories are recommended to complete whole-genome sequencing (WGS) of atypical viral pathogens within 72 hours...',
            sourceLocation: { section: 'Section 1', paragraph: 1 },
            explanation: 'Exact factual alignment with Section 1 guidance.',
          },
          {
            id: 'claim-who-2',
            claimText: 'At least 15% of emergency therapeutic/diagnostic allotments should be reserved for low- and middle-income countries.',
            status: 'supported',
            confidenceScore: 0.98,
            supportingPassage: 'at least 15% of annual therapeutic and diagnostic manufacturing allotments... be reserved for low- and middle-income nations...',
            sourceLocation: { section: 'Section 2', paragraph: 2 },
            explanation: 'Exact match with benefit-sharing provisions in Section 2.',
          },
          {
            id: 'claim-who-3',
            claimText: 'Ambient temperature sequencing will be deployed to 65 sentinel laboratories by Q4 2027.',
            status: 'supported',
            confidenceScore: 0.99,
            supportingPassage: 'nanopore sequencing technologies operating within ambient temperatures (15°C to 30°C) should be pre-positioned across 65 priority regional sentinel hospital laboratories by Q4 2027.',
            sourceLocation: { section: 'Section 3', paragraph: 3 },
            explanation: 'Supported by Section 3 timeline and targets.',
          },
        ],
        metrics: {
          hasReferenceSummary: true,
          factualConsistency: {
            consistencyRate: 100.0,
            totalClaims: 3,
            supportedClaims: 3,
            contradictedClaims: 0,
            unverifiedClaims: 0,
            potentialHallucinations: 0,
          },
          rouge: {
            rouge1: { precision: 0.72, recall: 0.68, f1: 0.699 },
            rouge2: { precision: 0.46, recall: 0.43, f1: 0.444 },
            rougeL: { precision: 0.61, recall: 0.58, f1: 0.594 },
          },
        },
      },
      abstractive: undefined,
      lead3: undefined,
      compare_both: undefined,
    },
  },
  {
    id: 'doc-transit-budget-2026',
    title: 'Metropolitan Transit Authority FY2026-2030 Capital Investment Plan',
    category: 'Legal & Regulatory',
    fileType: 'txt',
    fileSize: '950 KB',
    wordCount: 685,
    uploadedAt: '2026-10-15T16:45:00Z',
    isSample: true,
    originalText: `METROPOLITAN REGIONAL TRANSPORTATION COMMISSION
FIVE-YEAR CAPITAL ALLOCATION BUDGET (FY 2026 - 2030)

Program Overview
The Commission approves a total five-year capital program of $14.2 billion, allocated across commuter rail, subway modernization, and zero-emission bus fleet conversions. Farebox revenue recovery reached 74% of pre-pandemic baseline figures across 2025, enabling the Commission to issue $3.5 billion in subordinate municipal revenue bonds without triggering credit rating downgrades.

Subway Signal Modernization
The primary safety investment allocates $4.8 billion toward Communications-Based Train Control (CBTC) resignaling across the Lexington and Crosstown subway corridors. Full CBTC commissioning will increase maximum line throughput from 26 to 34 trains per hour by November 2028.

Fleet Decarbonization
Diesel-hybrid bus procurement will cease permanently by December 31, 2026. The capital plan finances 620 battery-electric buses and installs 180 high-capacity pantograph charging gantries across five depots. State clean-transit subsidies provide $680 million in matching grants toward depot electrical substation upgrades.`,
    referenceSummary: `The transit authority authorized a $14.2 billion five-year capital program supported by $3.5 billion in municipal bonds with farebox recovery at 74%. Subway CBTC resignaling receives $4.8 billion to expand throughput to 34 trains per hour by late 2028. Bus procurement transitions entirely away from diesel-hybrid by end of 2026, funding 620 electric buses and 180 charging gantries with $680 million in state matching funds.`,
    activeMethod: 'extractive',
    processingStatus: 'completed',
    summaries: {
      extractive: {
        id: 'sum-transit-ext',
        method: 'extractive',
        targetLength: 'short',
        generationTimeMs: 290,
        wordCount: 71,
        compressionRatio: 0.103,
        text: `The Commission approves a total five-year capital program of $14.2 billion, supported by $3.5 billion in municipal bonds with farebox revenue recovery at 74%. The primary safety investment allocates $4.8 billion toward CBTC resignaling to increase throughput to 34 trains per hour by November 2028. Diesel-hybrid procurement will cease by December 31, 2026, financing 620 electric buses.`,
        claims: [
          {
            id: 'claim-transit-1',
            claimText: 'Capital program total is $14.2 billion with farebox recovery at 74%.',
            status: 'supported',
            confidenceScore: 1.0,
            supportingPassage: 'The Commission approves a total five-year capital program of $14.2 billion... Farebox revenue recovery reached 74%...',
            sourceLocation: { section: 'Program Overview', paragraph: 1 },
            explanation: 'Extracted verbatim from overview.',
          },
          {
            id: 'claim-transit-2',
            claimText: 'CBTC resignaling receives $4.8 billion to increase throughput to 34 trains per hour by Nov 2028.',
            status: 'supported',
            confidenceScore: 0.99,
            supportingPassage: 'allocates $4.8 billion toward Communications-Based Train Control (CBTC) resignaling... increase maximum line throughput from 26 to 34 trains per hour by November 2028.',
            sourceLocation: { section: 'Subway Signal Modernization', paragraph: 2 },
            explanation: 'Directly supported by paragraph 2.',
          },
          {
            id: 'claim-transit-3',
            claimText: 'Diesel-hybrid bus procurement ceases by December 31, 2026.',
            status: 'supported',
            confidenceScore: 0.98,
            supportingPassage: 'Diesel-hybrid bus procurement will cease permanently by December 31, 2026.',
            sourceLocation: { section: 'Fleet Decarbonization', paragraph: 3 },
            explanation: 'Accurate extract from fleet policy section.',
          },
        ],
        metrics: {
          hasReferenceSummary: true,
          factualConsistency: {
            consistencyRate: 100.0,
            totalClaims: 3,
            supportedClaims: 3,
            contradictedClaims: 0,
            unverifiedClaims: 0,
            potentialHallucinations: 0,
          },
          rouge: {
            rouge1: { precision: 0.76, recall: 0.71, f1: 0.734 },
            rouge2: { precision: 0.52, recall: 0.49, f1: 0.504 },
            rougeL: { precision: 0.68, recall: 0.64, f1: 0.659 },
          },
        },
      },
      abstractive: undefined,
      lead3: undefined,
      compare_both: undefined,
    },
  },
];
