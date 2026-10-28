"""
ClarityAI Persistent Database Layer (SQLite)
Manages persistent storage for documents, summaries, verified claims, and metrics.
"""

import sqlite3
import json
import os
import time
from typing import Dict, Any, List, Optional

DB_PATH = os.path.join(os.path.dirname(__file__), "clarity.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Documents table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT DEFAULT 'Public Document',
        file_type TEXT DEFAULT 'txt',
        file_size TEXT,
        word_count INTEGER,
        original_text TEXT NOT NULL,
        reference_summary TEXT,
        active_method TEXT DEFAULT 'abstractive',
        processing_status TEXT DEFAULT 'completed',
        created_at TEXT NOT NULL
    );
    """)

    # Summaries table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS summaries (
        id TEXT PRIMARY KEY,
        document_id TEXT NOT NULL,
        method TEXT NOT NULL,
        text TEXT NOT NULL,
        word_count INTEGER,
        compression_ratio REAL,
        generation_time_ms INTEGER,
        target_length TEXT DEFAULT 'medium',
        created_at TEXT NOT NULL,
        FOREIGN KEY (document_id) REFERENCES documents (id) ON DELETE CASCADE
    );
    """)

    # Claims table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS claims (
        id TEXT PRIMARY KEY,
        summary_id TEXT NOT NULL,
        claim_text TEXT NOT NULL,
        status TEXT NOT NULL,
        confidence_score REAL NOT NULL,
        supporting_passage TEXT,
        conflicting_passage TEXT,
        location_json TEXT,
        explanation TEXT NOT NULL,
        FOREIGN KEY (summary_id) REFERENCES summaries (id) ON DELETE CASCADE
    );
    """)

    # Metrics table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS metrics (
        id TEXT PRIMARY KEY,
        summary_id TEXT NOT NULL,
        consistency_rate REAL NOT NULL,
        total_claims INTEGER NOT NULL,
        supported_claims INTEGER NOT NULL,
        contradicted_claims INTEGER NOT NULL,
        unverified_claims INTEGER NOT NULL,
        potential_hallucinations INTEGER NOT NULL,
        rouge_json TEXT,
        has_reference INTEGER DEFAULT 0,
        FOREIGN KEY (summary_id) REFERENCES summaries (id) ON DELETE CASCADE
    );
    """)

    conn.commit()
    conn.close()

def save_document_analysis(doc_data: Dict[str, Any], summary_data: Dict[str, Any]) -> str:
    conn = get_connection()
    cursor = conn.cursor()

    doc_id = doc_data.get("id") or f"doc-py-{int(time.time() * 1000)}"
    created_at = doc_data.get("uploadedAt") or time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

    # Insert or replace document
    cursor.execute("""
    INSERT OR REPLACE INTO documents (
        id, title, category, file_type, file_size, word_count, original_text, reference_summary, active_method, processing_status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        doc_id,
        doc_data.get("title", "Untitled Document"),
        doc_data.get("category", "Public Document"),
        doc_data.get("fileType", "txt"),
        doc_data.get("fileSize", "10 KB"),
        doc_data.get("wordCount", len(doc_data.get("originalText", "").split())),
        doc_data.get("originalText", ""),
        doc_data.get("referenceSummary"),
        summary_data.get("method", "abstractive"),
        "completed",
        created_at
    ))

    # Insert summary
    sum_id = summary_data.get("id") or f"sum-py-{int(time.time() * 1000)}"
    cursor.execute("""
    INSERT OR REPLACE INTO summaries (
        id, document_id, method, text, word_count, compression_ratio, generation_time_ms, target_length, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        sum_id,
        doc_id,
        summary_data.get("method", "abstractive"),
        summary_data.get("text", ""),
        summary_data.get("wordCount", 0),
        summary_data.get("compressionRatio", 0.0),
        summary_data.get("generationTimeMs", 0),
        summary_data.get("targetLength", "medium"),
        created_at
    ))

    # Clear old claims & metrics for this summary if replacing
    cursor.execute("DELETE FROM claims WHERE summary_id = ?", (sum_id,))
    cursor.execute("DELETE FROM metrics WHERE summary_id = ?", (sum_id,))

    # Insert claims
    for claim in summary_data.get("claims", []):
        loc_str = json.dumps(claim.get("sourceLocation", {}))
        cursor.execute("""
        INSERT INTO claims (
            id, summary_id, claim_text, status, confidence_score, supporting_passage, conflicting_passage, location_json, explanation
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            claim.get("id"),
            sum_id,
            claim.get("claimText", ""),
            claim.get("status", "supported"),
            claim.get("confidenceScore", 0.95),
            claim.get("supportingPassage"),
            claim.get("conflictingPassage"),
            loc_str,
            claim.get("explanation", "")
        ))

    # Insert metrics
    metrics = summary_data.get("metrics", {})
    fc = metrics.get("factualConsistency", {})
    rouge_str = json.dumps(metrics.get("rouge")) if metrics.get("rouge") else None

    cursor.execute("""
    INSERT INTO metrics (
        id, summary_id, consistency_rate, total_claims, supported_claims, contradicted_claims, unverified_claims, potential_hallucinations, rouge_json, has_reference
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        f"met-{sum_id}",
        sum_id,
        fc.get("consistencyRate", 100.0),
        fc.get("totalClaims", 0),
        fc.get("supportedClaims", 0),
        fc.get("contradictedClaims", 0),
        fc.get("unverifiedClaims", 0),
        fc.get("potentialHallucinations", 0),
        rouge_str,
        1 if metrics.get("hasReferenceSummary") else 0
    ))

    conn.commit()
    conn.close()
    return doc_id

def list_documents() -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM documents ORDER BY created_at DESC")
    rows = cursor.fetchall()

    results = []
    for r in rows:
        # Fetch active summary
        cursor.execute("SELECT * FROM summaries WHERE document_id = ? AND method = ?", (r["id"], r["active_method"]))
        sum_row = cursor.fetchone()

        sum_dict = None
        if sum_row:
            # Fetch claims
            cursor.execute("SELECT * FROM claims WHERE summary_id = ?", (sum_row["id"],))
            claim_rows = cursor.fetchall()
            claims = []
            for c in claim_rows:
                claims.append({
                    "id": c["id"],
                    "claimText": c["claim_text"],
                    "status": c["status"],
                    "confidenceScore": c["confidence_score"],
                    "supportingPassage": c["supporting_passage"],
                    "conflictingPassage": c["conflicting_passage"],
                    "sourceLocation": json.loads(c["location_json"]) if c["location_json"] else {},
                    "explanation": c["explanation"]
                })

            # Fetch metrics
            cursor.execute("SELECT * FROM metrics WHERE summary_id = ?", (sum_row["id"],))
            met_row = cursor.fetchone()
            metrics_dict = {
                "hasReferenceSummary": bool(met_row["has_reference"]) if met_row else False,
                "factualConsistency": {
                    "consistencyRate": met_row["consistency_rate"] if met_row else 100.0,
                    "totalClaims": met_row["total_claims"] if met_row else 0,
                    "supportedClaims": met_row["supported_claims"] if met_row else 0,
                    "contradictedClaims": met_row["contradicted_claims"] if met_row else 0,
                    "unverifiedClaims": met_row["unverified_claims"] if met_row else 0,
                    "potentialHallucinations": met_row["potential_hallucinations"] if met_row else 0,
                },
                "rouge": json.loads(met_row["rouge_json"]) if (met_row and met_row["rouge_json"]) else None
            }

            sum_dict = {
                "id": sum_row["id"],
                "method": sum_row["method"],
                "text": sum_row["text"],
                "wordCount": sum_row["word_count"],
                "compressionRatio": sum_row["compression_ratio"],
                "generationTimeMs": sum_row["generation_time_ms"],
                "targetLength": sum_row["target_length"],
                "claims": claims,
                "metrics": metrics_dict
            }

        summaries_map = {
            "abstractive": sum_dict if r["active_method"] == "abstractive" else None,
            "extractive": sum_dict if r["active_method"] == "extractive" else None,
            "lead3": sum_dict if r["active_method"] == "lead3" else None,
            "compare_both": None
        }

        results.append({
            "id": r["id"],
            "title": r["title"],
            "category": r["category"],
            "fileType": r["file_type"],
            "fileSize": r["file_size"],
            "wordCount": r["word_count"],
            "originalText": r["original_text"],
            "referenceSummary": r["reference_summary"],
            "activeMethod": r["active_method"],
            "processingStatus": r["processing_status"],
            "uploadedAt": r["created_at"],
            "summaries": summaries_map
        })

    conn.close()
    return results

def get_document(doc_id: str) -> Optional[Dict[str, Any]]:
    docs = list_documents()
    for d in docs:
        if d["id"] == doc_id:
            return d
    return None

def delete_document(doc_id: str) -> bool:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM documents WHERE id = ?", (doc_id,))
    conn.commit()
    conn.close()
    return True

# Initialize tables immediately on import
init_db()
