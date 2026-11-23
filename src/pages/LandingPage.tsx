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
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-brand-500/20 selection:text-brand-300 relative overflow-x-hidden">
      <LandingNav />
      <main className="relative z-10">
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
