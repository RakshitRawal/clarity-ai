import React from 'react';
import { LandingNav } from '../components/layout/LandingNav';
import { HeroSection } from '../components/landing/HeroSection';
import { ProblemSolution } from '../components/landing/ProblemSolution';
import { HowItWorks } from '../components/landing/HowItWorks';
import { FeatureGrid } from '../components/landing/FeatureGrid';
import { EvaluationPreview } from '../components/landing/EvaluationPreview';
import { LandingFooter } from '../components/landing/LandingFooter';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 selection:bg-brand-500/20 selection:text-brand-700 dark:selection:text-brand-300">
      <LandingNav />
      <main>
        <HeroSection />
        <ProblemSolution />
        <HowItWorks />
        <FeatureGrid />
        <EvaluationPreview />
      </main>
      <LandingFooter />
    </div>
  );
};
