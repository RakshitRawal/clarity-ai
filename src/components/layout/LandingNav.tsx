import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';

export const LandingNav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Product', href: '#product' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Evaluation', href: '#evaluation' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#070b14]/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Logo size="md" showTagline={false} />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-brand-400 text-slate-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/app/evaluation"
              className="hover:text-brand-400 transition-colors flex items-center gap-1 text-slate-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Leaderboard</span>
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/app/overview"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800/80 transition-colors"
            >
              Workspace
            </Link>
            <Link
              to="/app/new"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 shadow-md shadow-brand-500/25 hover:shadow-brand-500/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 whitespace-nowrap"
            >
              <span>Start Analysing</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-charcoal-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-950 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-charcoal-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <Link
              to="/app/overview"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-charcoal-800"
            >
              Open Workspace
            </Link>
            <Link
              to="/app/new"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-md"
            >
              Start Analysing Document
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
