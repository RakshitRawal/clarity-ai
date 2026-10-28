import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  clickable?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false, clickable = true }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base font-bold',
    md: 'text-xl font-bold',
    lg: 'text-2xl font-extrabold',
    xl: 'text-3xl font-extrabold',
  };

  const Content = (
    <div className="flex items-center gap-2.5 group select-none">
      <div className={`relative ${iconSizes[size]} flex-shrink-0 transition-transform duration-200 group-hover:scale-105`}>
        {/* Document silhouette */}
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Document Sheet */}
          <rect
            x="4"
            y="3"
            width="20"
            height="26"
            rx="3"
            className="fill-slate-100 dark:fill-navy-900 stroke-slate-300 dark:stroke-slate-700"
            strokeWidth="1.8"
          />
          {/* Document Content lines */}
          <line
            x1="8"
            y1="8"
            x2="16"
            y2="8"
            className="stroke-slate-400 dark:stroke-slate-600"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="13"
            x2="19"
            y2="13"
            className="stroke-slate-400 dark:stroke-slate-600"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="18"
            x2="14"
            y2="18"
            className="stroke-slate-400 dark:stroke-slate-600"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Clarity Optical Lens Circle with Electric Indigo Gradient */}
          <defs>
            <linearGradient id="clarityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <filter id="lensGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#6366f1" floodOpacity="0.4" />
            </filter>
          </defs>

          <circle
            cx="22"
            cy="23"
            r="8.5"
            className="fill-white dark:fill-charcoal-900 stroke-[url(#clarityGradient)]"
            strokeWidth="2.5"
            filter="url(#lensGlow)"
          />

          {/* Verification checkmark inside clarity lens */}
          <path
            d="M18.8 23.2L20.8 25.2L25.2 20.8"
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dark:stroke-brand-400"
          />

          {/* Subtle Lens Handle accent */}
          <line
            x1="28"
            y1="29"
            x2="32"
            y2="33"
            stroke="url(#clarityGradient)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center tracking-tight">
          <span className={`text-slate-900 dark:text-white ${textSizes[size]}`}>Clarity</span>
          <span className={`text-brand-600 dark:text-brand-400 ${textSizes[size]}`}>AI</span>
        </div>
        {showTagline && (
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">
            Factual Document Intelligence
          </span>
        )}
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link to="/" className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-0.5">
        {Content}
      </Link>
    );
  }

  return Content;
};
