import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { BenchmarkComparisonItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface EvaluationChartProps {
  data: BenchmarkComparisonItem[];
}

export const EvaluationChart: React.FC<EvaluationChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartData = data.map(item => ({
    name: item.method.split(' ')[0], // Lead-3, Extractive, Abstractive
    fullName: item.method,
    'ROUGE-1': Number((item.rouge1 * 100).toFixed(1)),
    'ROUGE-2': Number((item.rouge2 * 100).toFixed(1)),
    'ROUGE-L': Number((item.rougeL * 100).toFixed(1)),
    'Factual Consistency %': item.factualConsistency,
    'Hallucination Rate %': item.hallucinationRate,
  }));

  const axisStroke = isDark ? '#64748b' : '#94a3b8';
  const gridStroke = isDark ? '#1e293b' : '#f1f5f9';

  return (
    <div className="space-y-6">
      {/* Bar Chart: ROUGE vs Factual Consistency */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-charcoal-900 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              The Alignment Paradox: ROUGE Overlap vs. Factual Fidelity
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Notice how Abstractive models score highest on ROUGE but exhibit a dramatic drop in factual consistency.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-charcoal-800 text-slate-600 dark:text-slate-300">
            Scale: 0 - 100%
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="name" stroke={axisStroke} tick={{ fontSize: 12 }} />
              <YAxis stroke={axisStroke} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  borderColor: isDark ? '#334155' : '#cbd5e1',
                  borderRadius: '10px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="ROUGE-2" fill="#6366f1" radius={[4, 4, 0, 0]} name="ROUGE-2 (F1 %)" />
              <Bar dataKey="Factual Consistency %" fill="#10b981" radius={[4, 4, 0, 0]} name="Factual Consistency %" />
              <Bar dataKey="Hallucination Rate %" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Hallucination Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
