#!/usr/bin/env bash
# ClarityAI Full-Stack Development Startup Script
# Starts both Python Backend API (:8000) and Vite Frontend (:3000)

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "=========================================================="
echo "✨ Starting ClarityAI Full-Stack Application"
echo "=========================================================="

# 1. Start Python Backend
echo "1️⃣ Starting Python Backend on http://localhost:8000..."
python3 backend/server.py &
BACKEND_PID=$!

# 2. Wait for backend to initialize
sleep 1

# 3. Start Frontend
echo "2️⃣ Starting Vite Frontend on http://localhost:3000..."
npm run dev

# Cleanup when user hits Ctrl+C
trap "kill $BACKEND_PID 2>/dev/null; exit" SIGINT SIGTERM
