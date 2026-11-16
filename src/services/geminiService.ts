/**
 * ClarityAI Gemini Generative AI Service
 * Enables state-of-the-art LLM document explanation with fact-checking.
 */

export interface GeminiSummaryResult {
  summaryText: string;
  claims: string[];
}

export async function generateGeminiSummary(
  documentText: string,
  apiKey: string,
  modelName: string = 'gemini-1.5-flash'
): Promise<GeminiSummaryResult> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const prompt = `You are ClarityAI's Factual Document Intelligence Engine.
Analyze and explain the following document thoroughly and clearly.

DOCUMENT TEXT:
${documentText.slice(0, 30000)}

INSTRUCTIONS:
1. Provide a comprehensive, structured explanation of the document like an expert AI analyst.
2. Structure your response into:
   - Overview & Primary Subject
   - Core Concepts & Detailed Findings
   - Key Metrics, Dates, Complexities, or Equations
   - Practical Significance & Strategic Takeaways
3. STRICT FACTUAL ACCURACY: Do NOT invent facts, hallucinate entities, or alter numbers. Every claim must strictly derive from the text.
4. Output your analysis as 4 to 8 clear, discrete factual sentences/paragraphs suitable for claim-by-claim verification.`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gemini API request failed with status ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  if (!rawText.trim()) {
    throw new Error('Gemini API returned an empty response.');
  }

  // Split into atomic claims for verification
  const rawSentences = rawText
    .split(/\n\s*\n|(?<=[.!?])\s+(?=[A-Z0-9"'])|\n(?=[•\-\*]\s*)/)
    .map((s: string) => s.replace(/^[•\-\*#\d.]+\s*/, '').trim())
    .filter((s: string) => s.length > 20);

  return {
    summaryText: rawText.trim(),
    claims: rawSentences,
  };
}
