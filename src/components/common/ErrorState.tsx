import React from 'react';
import { AlertCircle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  details?: string;
  onRetry?: () => void;
  actionText?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Analysis Failed',
  message,
  details,
  onRetry,
  actionText = 'Retry Analysis',
}) => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/20 p-6 text-slate-800 dark:text-slate-200">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex-shrink-0">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-semibold text-rose-900 dark:text-rose-200 mb-1">{title}</h4>
          <p className="text-sm text-rose-800 dark:text-rose-300 leading-relaxed mb-4">{message}</p>

          <div className="flex flex-wrap items-center gap-3">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{actionText}</span>
              </button>
            )}

            {details && (
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-700 dark:text-rose-300 hover:underline"
              >
                <span>{showDetails ? 'Hide Technical Details' : 'Show Technical Details'}</span>
                {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {showDetails && details && (
            <div className="mt-3 p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
              {details}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
