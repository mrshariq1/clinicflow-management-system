import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  subtext?: string;
  icon: LucideIcon;
  color?: 'blue' | 'emerald' | 'amber' | 'indigo';
}

export default function StatCard({
  title,
  value,
  change,
  trend = 'up',
  subtext,
  icon: Icon,
  color = 'blue',
}: StatCardProps) {
  const colorMap = {
    blue: {
      iconBg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
      bar: 'bg-blue-600',
    },
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
      bar: 'bg-emerald-600',
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
      bar: 'bg-amber-600',
    },
    indigo: {
      iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
      bar: 'bg-indigo-600',
    },
  };

  const selectedColor = colorMap[color] || colorMap.blue;

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wide uppercase">
            {title}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
              {value}
            </span>
          </div>
        </div>

        <div className={`p-2.5 rounded-xl ${selectedColor.iconBg} shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-slate-800/80 min-w-0">
        {change && (
          <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 min-w-0">
            <span
              className={`inline-flex items-center font-medium shrink-0 ${
                trend === 'up'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : trend === 'down'
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-slate-500'
              }`}
            >
              {trend === 'up' && <TrendingUp className="w-3.5 h-3.5 mr-0.5" />}
              {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
              {change}
            </span>
            <span className="text-slate-400 dark:text-slate-500">vs last month</span>
          </div>
        )}
        {subtext && !change && (
          <span className="text-slate-500 dark:text-slate-400 truncate">{subtext}</span>
        )}
      </div>
    </div>
  );
}
