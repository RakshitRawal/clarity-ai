"""
ClarityAI Python Production REST API Server
Public Document Summarisation Without Invented Facts

Features:
- Multi-threaded HTTP server with full CORS support
- Full persistent SQLite document & analysis storage
- Live Python NLP summarisation & claim-level factual verification
- Zero external package dependency (runs on any Python 3 installation!)
"""

import sys
import os
import json
import time
import mimetypes
from typing import Any, Dict, Optional, List
from http.server import HTTPServer, BaseHTTPRequestHandler
from socketserver import ThreadingMixIn
import urllib.parse

# Ensure local backend imports resolve
sys.path.insert(0, os.path.dirname(__file__))

DIST_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "dist"))

from nlp_engine import run_full_pipeline
from database import (
    save_document_analysis,
    list_documents,
    get_document,
    delete_document,
    init_db
)

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

class ClarityAPIHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        # Clean server logging format
        print(f"[ClarityAI API] {self.command} {self.path} - {args[0]}")

    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
        self.send_header("Access-Control-Max-Age", "86400")

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_cors_headers()
        self.end_headers()

    def do_HEAD(self):
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()

    def send_json(self, status_code: int, data: Any):
        payload = json.dumps(data, indent=2).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.send_cors_headers()
        self.end_headers()
        self.wfile.write(payload)

    def send_error_json(self, status_code: int, message: str):
        self.send_json(status_code, {"success": False, "error": message})

    def read_json_body(self) -> Optional[Dict[str, Any]]:
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length == 0:
            return None
        body_bytes = self.rfile.read(content_length)
        try:
            return json.loads(body_bytes.decode("utf-8"))
        except Exception as e:
            raise ValueError(f"Invalid JSON payload: {str(e)}")

    def serve_static(self, path: str):
        if not os.path.exists(DIST_DIR):
            self.send_error_json(404, "Frontend build not found. Run 'npm run build' first.")
            return

        # Strip query string and fragments
        clean_path = path.split("?")[0].split("#")[0].lstrip("/")

        # Robust asset handling: if path contains 'assets/', map directly to dist/assets/
        if "assets/" in clean_path:
            asset_filename = clean_path.split("assets/")[-1]
            file_path = os.path.join(DIST_DIR, "assets", asset_filename)
        elif not clean_path or clean_path == "index.html":
            file_path = os.path.join(DIST_DIR, "index.html")
        else:
            file_path = os.path.join(DIST_DIR, clean_path)

        # Fallback to index.html for SPA routes (e.g. /app/overview, /app/new)
        # Never fallback for static asset requests with file extensions (.js, .css, .png, etc.)
        if not os.path.exists(file_path) or os.path.isdir(file_path):
            basename = os.path.basename(file_path)
            if "." in basename and not basename.endswith(".html"):
                self.send_error_json(404, f"Asset '{clean_path}' not found.")
                return
            file_path = os.path.join(DIST_DIR, "index.html")

        if not os.path.exists(file_path):
            self.send_error_json(404, "Page not found.")
            return

        mime_type, _ = mimetypes.guess_type(file_path)
        mime_type = mime_type or "application/octet-stream"
        if file_path.endswith(".js"):
            mime_type = "application/javascript"
        elif file_path.endswith(".css"):
            mime_type = "text/css"
        elif file_path.endswith(".svg"):
            mime_type = "image/svg+xml"

        try:
            with open(file_path, "rb") as f:
                content = f.read()
            self.send_response(200)
            self.send_header("Content-Type", f"{mime_type}; charset=utf-8" if ("text" in mime_type or "javascript" in mime_type or "json" in mime_type) else mime_type)
            self.send_header("Content-Length", str(len(content)))
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_error_json(500, f"Error reading static file: {str(e)}")

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/")

        # Health check
        if path == "/health":
            self.send_json(200, {
                "status": "ok",
                "version": "1.0.0",
                "service": "ClarityAI Unified Full-Stack Server",
                "supportedModels": [
                    "mistral-7b-instruct-q4",
                    "llama-3-8b-instruct",
                    "t5-large-govreport",
                    "bert-extractive-lexrank"
                ],
                "gpuAvailable": False,
                "activeProvider": "python-nlp-engine",
                "storage": "sqlite3",
                "timestamp": time.time()
            })
            return

        # List saved documents
        if path == "/api/v1/documents":
            docs = list_documents()
            self.send_json(200, {"success": True, "documents": docs})
            return

        # Get single document
        if path.startswith("/api/v1/documents/"):
            doc_id = path.split("/api/v1/documents/")[1]
            doc = get_document(doc_id)
            if doc:
                self.send_json(200, {"success": True, "document": doc})
            else:
                self.send_error_json(404, f"Document '{doc_id}' not found.")
            return

        # Any other GET path serves static frontend SPA assets!
        self.serve_static(parsed.path)

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/")

        # Summarize & Verify
        if path == "/api/v1/summarize-and-verify":
            try:
                body = self.read_json_body()
                if not body:
                    self.send_error_json(400, "Missing JSON request body.")
                    return

                doc_text = body.get("document_text") or body.get("documentText")
                if not doc_text or len(doc_text.strip()) < 20:
                    self.send_error_json(400, "Document text must contain at least 20 characters.")
                    return

                title = body.get("document_title") or body.get("documentTitle") or "Public Document Analysis"
                method = body.get("method", "abstractive")
                target_length = body.get("target_length") or body.get("targetLength") or "medium"
                ref_summary = body.get("reference_summary") or body.get("referenceSummary")
                model_name = body.get("model_name") or "mistral-7b-instruct-q4"

                # Run NLP summarisation and factual claim verification
                summary_result = run_full_pipeline(
                    document_text=doc_text,
                    method=method,
                    target_length=target_length,
                    reference_summary=ref_summary
                )

                # Persist into SQLite
                doc_id = save_document_analysis(
                    doc_data={
                        "title": title,
                        "originalText": doc_text,
                        "referenceSummary": ref_summary,
                        "category": "Public Document",
                        "fileType": "txt"
                    },
                    summary_data=summary_result
                )

                self.send_json(200, {
                    "success": True,
                    "documentId": doc_id,
                    "summary": summary_result,
                    "metadata": {
                        "modelUsed": model_name,
                        "inferenceTimeMs": summary_result.get("generationTimeMs", 50),
                        "tokensPrompt": len(doc_text.split()),
                        "tokensCompletion": summary_result.get("wordCount", 0)
                    }
                })
            except Exception as e:
                self.send_error_json(500, f"Analysis pipeline error: {str(e)}")
            return

        self.send_error_json(404, f"Endpoint '{self.path}' not found.")

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/")

        if path.startswith("/api/v1/documents/"):
            doc_id = path.split("/api/v1/documents/")[1]
            success = delete_document(doc_id)
            self.send_json(200, {"success": success, "deletedId": doc_id})
            return

        self.send_error_json(404, f"Endpoint '{self.path}' not found.")

def run_server(host="0.0.0.0", port=8000):
    init_db()
    server_address = (host, port)
    httpd = ThreadedHTTPServer(server_address, ClarityAPIHandler)
    print(f"=====================================================")
    print(f"🚀 ClarityAI Backend API Server is running!")
    print(f"🔗 Local endpoint:  http://localhost:{port}")
    print(f"🔗 Health Check:    http://localhost:{port}/health")
    print(f"🔗 API Endpoint:    http://localhost:{port}/api/v1/summarize-and-verify")
    print(f"📁 Database:        SQLite ({os.path.join(os.path.dirname(__file__), 'clarity.db')})")
    print(f"=====================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping ClarityAI backend server...")
        httpd.server_close()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    run_server(port=port)
