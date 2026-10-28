import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { Logo } from '../common/Logo';

export const LandingFooter: React.FC = () => {
  return (
    <footer id="about" className="bg-slate-900 text-slate-400 border-t border-slate-800">
      {/* Final CTA Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-slate-800">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bring clarity to every document.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Eliminate invented facts. Ensure every summary claim has verifiable evidence behind it before you make high-consequence decisions.
          </p>
          <div className="pt-2">
            <Link
              to="/app/overview"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 shadow-xl shadow-brand-500/25 transition-all"
            >
              <span>Open ClarityAI Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Navigation & Brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <Logo size="md" showTagline={true} />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mt-3">
              ClarityAI is an open document-intelligence platform built for the hackathon "Public Document Summarisation Without Invented Facts."
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Tagline: "Clarity in every summary. Evidence behind every claim."
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Platform & Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/app/new" className="hover:text-white transition-colors">
                  Analyse Document
                </Link>
              </li>
              <li>
                <Link to="/app/overview" className="hover:text-white transition-colors">
                  Workspace Overview
                </Link>
              </li>
              <li>
                <Link to="/app/evaluation" className="hover:text-white transition-colors">
                  Evaluation Lab & Benchmarks
                </Link>
              </li>
              <li>
                <Link to="/app/reports" className="hover:text-white transition-colors">
                  Factual Audit Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Hackathon & Research
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/app/evaluation" className="hover:text-white transition-colors">
                  Competition Methodology
                </Link>
              </li>
              <li>
                <Link to="/app/settings" className="hover:text-white transition-colors">
                  API & Backend Architecture
                </Link>
              </li>
              <li>
                <a href="#product" className="hover:text-white transition-colors">
                  The Hallucination Problem
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  Pipeline Architecture
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} ClarityAI. Built for factual integrity in public document intelligence.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>No certification claimed</span>
            <span>•</span>
            <span>Probabilistic review aid</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
