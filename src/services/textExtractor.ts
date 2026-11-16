/**
 * ClarityAI Universal Document Text Extractor
 * Extracts genuine text content from PDF, DOCX, and TXT documents in the browser.
 */

import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

/**
 * Extract text from a PDF file using pdfjs-dist with stream fallback
 */
export async function extractTextFromPdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  try {
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    const pdf = await loadingTask.promise;
    const pageTexts: string[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageString = textContent.items
        .map((item: any) => ('str' in item ? item.str : ''))
        .filter((str: string) => str.trim().length > 0)
        .join(' ');

      if (pageString.trim().length > 0) {
        pageTexts.push(pageString);
      }
    }

    const fullText = pageTexts.join('\n\n').trim();
    if (fullText.length > 30) {
      return fullText;
    }
  } catch (err) {
    console.warn('PDF.js standard extraction fallback triggered:', err);
  }

  // Fallback: Extract readable text chunks from PDF streams
  try {
    const uint8 = new Uint8Array(arrayBuffer);
    const decoder = new TextDecoder('utf-8', { fatal: false });
    const raw = decoder.decode(uint8);

    // Look for text in PDF operators: (text) Tj or [(text)] TJ
    const textPieces: string[] = [];
    const tjRegex = /\(([^\(\)\\]*(?:\\.[^\(\)\\]*)*)\)\s*T[jJ]/g;
    let match;
    while ((match = tjRegex.exec(raw)) !== null) {
      const cleaned = match[1].replace(/\\([()\\])/g, '$1').trim();
      if (cleaned.length > 2 && /[a-zA-Z]/.test(cleaned)) {
        textPieces.push(cleaned);
      }
    }

    if (textPieces.length > 10) {
      return textPieces.join(' ');
    }

    // Secondary fallback: Extract printable string runs
    const printableMatches = raw.match(/[A-Za-z0-9\s.,!?:;'\"()\-_/]{25,}/g);
    if (printableMatches && printableMatches.length > 0) {
      const filtered = printableMatches
        .filter(m => !m.includes('/Font') && !m.includes('/Length') && !m.includes('/Filter'))
        .map(m => m.trim())
        .filter(m => m.length > 20);
      if (filtered.length > 0) {
        return filtered.join('\n\n');
      }
    }
  } catch (fallbackErr) {
    console.error('PDF text extraction error:', fallbackErr);
  }

  return '';
}

/**
 * Extract text from a DOCX file using native browser DecompressionStream for word/document.xml
 */
export async function extractTextFromDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const uint8 = new Uint8Array(arrayBuffer);
  const view = new DataView(uint8.buffer, uint8.byteOffset, uint8.byteLength);

  let offset = 0;
  while (offset + 30 < uint8.length) {
    const sig = view.getUint32(offset, true);
    if (sig !== 0x04034b50) {
      // Not a local file header, advance
      offset++;
      continue;
    }

    const compMethod = view.getUint16(offset + 8, true);
    const compSize = view.getUint32(offset + 18, true);
    const nameLen = view.getUint16(offset + 26, true);
    const extraLen = view.getUint16(offset + 28, true);

    const nameBytes = uint8.subarray(offset + 30, offset + 30 + nameLen);
    const fileName = new TextDecoder().decode(nameBytes);
    const dataOffset = offset + 30 + nameLen + extraLen;

    if (fileName === 'word/document.xml') {
      const compData = uint8.subarray(dataOffset, dataOffset + compSize);
      let xmlText = '';

      if (compMethod === 8 && typeof DecompressionStream !== 'undefined') {
        try {
          const ds = new DecompressionStream('deflate-raw');
          const writer = ds.writable.getWriter();
          writer.write(compData);
          writer.close();
          const reader = ds.readable.getReader();
          const chunks: Uint8Array[] = [];
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value) chunks.push(value);
          }
          const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
          const merged = new Uint8Array(totalLength);
          let pos = 0;
          for (const c of chunks) {
            merged.set(c, pos);
            pos += c.length;
          }
          xmlText = new TextDecoder().decode(merged);
        } catch (decompErr) {
          console.warn('DOCX deflate decompression error:', decompErr);
        }
      } else if (compMethod === 0) {
        xmlText = new TextDecoder().decode(compData);
      }

      if (xmlText) {
        const textNodes = [...xmlText.matchAll(/<w:t[^>]*>([^<]+)<\/w:t>/g)].map(m => m[1]);
        if (textNodes.length > 0) {
          return textNodes.join(' ').replace(/\s+/g, ' ').trim();
        }
      }
    }

    offset = dataOffset + compSize;
  }

  // Fallback: Regex scan for raw XML text tags if zip traversal skipped
  const rawDecoded = new TextDecoder('utf-8', { fatal: false }).decode(uint8);
  const textMatches = [...rawDecoded.matchAll(/<w:t[^>]*>([^<]+)<\/w:t>/g)].map(m => m[1]);
  if (textMatches.length > 5) {
    return textMatches.join(' ').replace(/\s+/g, ' ').trim();
  }

  return '';
}

/**
 * Universal file text extraction entrypoint
 */
export async function extractDocumentText(file: File): Promise<{ text: string; wordCount: number }> {
  const ext = '.' + file.name.split('.').pop()?.toLowerCase();
  let extracted = '';

  if (ext === '.txt' || ext === '.md' || ext === '.csv' || ext === '.json') {
    extracted = await file.text();
  } else if (ext === '.pdf') {
    extracted = await extractTextFromPdf(file);
  } else if (ext === '.docx') {
    extracted = await extractTextFromDocx(file);
  } else {
    extracted = await file.text();
  }

  // Clean and normalize
  const cleaned = extracted
    .replace(/\u0000/g, '')
    .replace(/\r\n/g, '\n')
    .trim();

  const words = cleaned ? cleaned.split(/\s+/).filter(w => w.length > 0) : [];
  return {
    text: cleaned,
    wordCount: words.length,
  };
}
