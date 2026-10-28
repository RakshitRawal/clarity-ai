import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';

export const ClarityAIAppShell: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('clarity_sidebar_collapsed') === 'true';
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('clarity_sidebar_collapsed', String(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 flex transition-colors overflow-x-hidden">
      {/* Sidebar (Desktop + Mobile) */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <TopNavigation onOpenMobileMenu={() => setMobileOpen(true)} />

        <main className="flex-1 p-3 sm:p-5 lg:p-6 xl:p-8 max-w-7xl w-full mx-auto min-w-0 overflow-x-hidden animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
