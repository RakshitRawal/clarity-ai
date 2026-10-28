import { RougeScores } from '../types';

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 0);
}

function getNgrams(tokens: string[], n: number): Map<string, number> {
  const ngrams = new Map<string, number>();
  for (let i = 0; i <= tokens.length - n; i++) {
    const gram = tokens.slice(i, i + n).join(' ');
    ngrams.set(gram, (ngrams.get(gram) || 0) + 1);
  }
  return ngrams;
}

function calculateNgramOverlap(candTokens: string[], refTokens: string[], n: number) {
  if (candTokens.length < n || refTokens.length < n) {
    return { precision: 0, recall: 0, f1: 0 };
  }

  const candGrams = getNgrams(candTokens, n);
  const refGrams = getNgrams(refTokens, n);

  let overlap = 0;
  let totalCand = 0;
  let totalRef = 0;

  candGrams.forEach((count, gram) => {
    totalCand += count;
    if (refGrams.has(gram)) {
      overlap += Math.min(count, refGrams.get(gram)!);
    }
  });

  refGrams.forEach(count => {
    totalRef += count;
  });

  const precision = totalCand > 0 ? overlap / totalCand : 0;
  const recall = totalRef > 0 ? overlap / totalRef : 0;
  const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;

  return { precision, recall, f1 };
}

function calculateLCSLength(x: string[], y: string[]): number {
  const m = x.length;
  const n = y.length;
  if (m === 0 || n === 0) return 0;

  // Space-optimized 2-row LCS DP
  let prev = new Array(n + 1).fill(0);
  let curr = new Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (x[i - 1] === y[j - 1]) {
        curr[j] = prev[j - 1] + 1;
      } else {
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    prev = [...curr];
  }

  return curr[n];
}

function calculateRougeL(candTokens: string[], refTokens: string[]) {
  if (candTokens.length === 0 || refTokens.length === 0) {
    return { precision: 0, recall: 0, f1: 0 };
  }

  const lcs = calculateLCSLength(candTokens, refTokens);
  const precision = lcs / candTokens.length;
  const recall = lcs / refTokens.length;
  const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;

  return { precision, recall, f1 };
}

/**
 * Calculates genuine ROUGE-1, ROUGE-2, and ROUGE-L metrics.
 * Returns null if referenceSummary is missing or empty.
 */
export function calculateRouge(candidate: string, reference?: string): RougeScores | null {
  if (!reference || reference.trim().length === 0) {
    return null;
  }

  const candTokens = tokenize(candidate);
  const refTokens = tokenize(reference);

  if (candTokens.length === 0 || refTokens.length === 0) {
    return null;
  }

  const r1 = calculateNgramOverlap(candTokens, refTokens, 1);
  const r2 = calculateNgramOverlap(candTokens, refTokens, 2);
  const rL = calculateRougeL(candTokens, refTokens);

  return {
    rouge1: {
      precision: Number(r1.precision.toFixed(4)),
      recall: Number(r1.recall.toFixed(4)),
      f1: Number(r1.f1.toFixed(4)),
    },
    rouge2: {
      precision: Number(r2.precision.toFixed(4)),
      recall: Number(r2.recall.toFixed(4)),
      f1: Number(r2.f1.toFixed(4)),
    },
    rougeL: {
      precision: Number(rL.precision.toFixed(4)),
      recall: Number(rL.recall.toFixed(4)),
      f1: Number(rL.f1.toFixed(4)),
    },
  };
}
