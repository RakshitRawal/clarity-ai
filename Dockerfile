# Multi-stage Dockerfile for ClarityAI Full-Stack Platform

# Stage 1: Build Frontend Assets
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Python Server
FROM python:3.11-slim
WORKDIR /app

# Copy built frontend assets into dist/
COPY --from=frontend-builder /app/dist ./dist

# Copy backend Python engine & database
COPY backend/ ./backend/
COPY start.sh ./start.sh

# Environment settings
ENV PORT=10000
ENV PYTHONUNBUFFERED=1

EXPOSE 10000

# Start unified server
CMD ["python3", "backend/server.py"]
