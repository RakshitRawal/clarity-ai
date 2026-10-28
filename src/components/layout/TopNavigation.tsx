import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, Plus, Search, ExternalLink, Sparkles } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { DemoModeBadge } from '../common/Badge';
import { useDocuments } from '../../context/DocumentContext';

interface TopNavigationProps {
  onOpenMobileMenu: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ onOpenMobileMenu }) => {
  const location = useLocation();
  const { isLiveBackend, searchQuery, setSearchQuery } = useDocuments();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/app/overview') return 'Workspace Overview';
    if (path === '/app/new') return 'New Document Analysis';
    if (path.startsWith('/app/analysis/')) return 'Factual Verification Results';
    if (path === '/app/documents') return 'My Documents';
    if (path === '/app/evaluation') return 'Evaluation Lab & Benchmarks';
    if (path === '/app/reports') return 'Factual Audit Reports';
    if (path === '/app/settings') return 'Settings & Backend Integration';
    return 'ClarityAI Workspace';
  };

  return (
    <header className="sticky top-0 z-20 h-16 w-full bg-white/90 dark:bg-charcoal-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 transition-colors">
      <div className="flex items-center justify-between h-full gap-4">
        {/* Left: Mobile hamburger & Page Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open sidebar menu"
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-charcoal-800 focus:outline-none"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
              <span>ClarityAI</span>
              <span>/</span>
              <span className="text-slate-600 dark:text-slate-300">{getPageTitle()}</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <div className="relative hidden lg:block w-56 xl:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search claims or documents..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-charcoal-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Demo mode pill */}
          <div className="hidden sm:block">
            <Link to="/app/settings">
              <DemoModeBadge isLive={isLiveBackend} />
            </Link>
          </div>

          {/* Landing page link */}
          <Link
            to="/"
            title="View Landing Page"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-charcoal-800 rounded-lg transition-colors"
          >
            <span>Landing Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* New Analysis Action */}
          <Link
            to="/app/new"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Analyse Document</span>
          </Link>

          {/* Theme Switcher */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
