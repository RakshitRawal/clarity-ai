import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FilePlus2,
  FolderOpen,
  FlaskConical,
  FileCheck2,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useDocuments } from '../../context/DocumentContext';
import { DemoModeBadge } from '../common/Badge';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}) => {
  const { documents, isLiveBackend } = useDocuments();

  const navItems = [
    { to: '/app/overview', label: 'Overview', icon: LayoutDashboard },
    { to: '/app/new', label: 'New Analysis', icon: FilePlus2, highlight: true },
    { to: '/app/documents', label: 'My Documents', icon: FolderOpen, badge: documents.length },
    { to: '/app/evaluation', label: 'Evaluation Lab', icon: FlaskConical },
    { to: '/app/reports', label: 'Reports', icon: FileCheck2 },
    { to: '/app/settings', label: 'Settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-charcoal-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300">
      {/* Sidebar Header */}
      <div className={`flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800 ${collapsed ? 'justify-center' : ''}`}>
        {!collapsed ? (
          <Logo size="md" showTagline={false} />
        ) : (
          <Logo size="sm" showTagline={false} />
        )}

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-charcoal-800 focus:outline-none transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group relative ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20 font-semibold'
                    : item.highlight
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50/70 dark:bg-brand-950/40 hover:bg-brand-100 dark:hover:bg-brand-900/50'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-charcoal-800/60'
                } ${collapsed ? 'justify-center px-2' : ''}`
              }
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="flex-1 truncate">{item.label}</span>
              )}
              {!collapsed && item.badge !== undefined && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-charcoal-800 text-slate-700 dark:text-slate-300 font-medium">
                  {item.badge}
                </span>
              )}

              {/* Tooltip on collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 dark:bg-navy-900 text-white text-xs rounded-md shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      {!collapsed ? (
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <DemoModeBadge isLive={isLiveBackend} />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-charcoal-900/80 border border-slate-200/80 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Evidence Engine</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
              Every summary claim is cross-referenced with exact source spans.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-2 border-t border-slate-200 dark:border-slate-800 flex justify-center">
          <span
            className={`w-2.5 h-2.5 rounded-full ${isLiveBackend ? 'bg-emerald-500' : 'bg-indigo-500'}`}
            title={isLiveBackend ? 'Live Backend Connected' : 'Demo Mode Active'}
          />
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block flex-shrink-0 transition-all duration-300 z-30 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="fixed top-0 bottom-0 left-0 w-inherit z-30">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 bottom-0 left-0 w-72 z-50 md:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};
