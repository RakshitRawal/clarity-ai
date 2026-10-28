import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DocumentProvider } from './context/DocumentContext';
import { ClarityAIAppShell } from './components/layout/ClarityAIAppShell';
import { LandingPage } from './pages/LandingPage';
import { DashboardOverviewPage } from './pages/DashboardOverviewPage';
import { NewAnalysisPage } from './pages/NewAnalysisPage';
import { AnalysisResultPage } from './pages/AnalysisResultPage';
import { MyDocumentsPage } from './pages/MyDocumentsPage';
import { EvaluationLabPage } from './pages/EvaluationLabPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <ThemeProvider>
      <DocumentProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Application Workspace with AppShell */}
            <Route path="/app" element={<ClarityAIAppShell />}>
              <Route index element={<Navigate to="/app/overview" replace />} />
              <Route path="overview" element={<DashboardOverviewPage />} />
              <Route path="new" element={<NewAnalysisPage />} />
              <Route path="analysis/:id" element={<AnalysisResultPage />} />
              <Route path="documents" element={<MyDocumentsPage />} />
              <Route path="evaluation" element={<EvaluationLabPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </DocumentProvider>
    </ThemeProvider>
  );
}

export default App;
