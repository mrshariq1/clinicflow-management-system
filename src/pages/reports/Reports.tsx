import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  FileBarChart,
  Calendar,
  Download,
  TrendingUp,
  Activity,
  Users,
  Building2,
  DollarSign,
  CheckCircle2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { departmentPerformanceData, monthlyRevenueData } from '../../data/mockData';

export default function Reports() {
  const { showToast } = useClinic();
  const [timeframe, setTimeframe] = useState<'Today' | 'This Week' | 'This Month' | 'This Year'>('This Month');

  const handleExport = () => {
    showToast('✓ Executive summary exported successfully', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Reports & Clinical Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Aggregated institutional benchmarks, departmental yield, and revenue forecasts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Timeframe Selector */}
          <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs overflow-x-auto min-w-0 max-w-full justify-center sm:justify-start">
            {(['Today', 'This Week', 'This Month', 'This Year'] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 rounded-xl shadow-2xs transition-colors w-full sm:w-auto shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export Data
          </button>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Avg Patient Wait Time
          </span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
            14.2 mins
          </p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            -3.4 mins vs target
          </span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Consultation Completion
          </span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
            96.8%
          </p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            High operational yield
          </span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Patient Satisfaction
          </span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
            4.91 / 5.0
          </p>
          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
            Based on 840 surveys
          </span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Bed Turnover Index
          </span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
            2.4 days
          </p>
          <span className="text-xs text-slate-400">Within optimal range</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Revenue Yield */}
        <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Revenue Generation by Department
            </h3>
            <p className="text-xs text-slate-500">Gross billing income across specialized clinical wings</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={val => `$${val / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '0.75rem',
                    color: '#FFFFFF',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [`$${val.toLocaleString()}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Inflow Trends */}
        <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Patient Registration & Booking Pace
            </h3>
            <p className="text-xs text-slate-500">Outpatient inflow progression over 6 months</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '0.75rem',
                    color: '#FFFFFF',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="patients"
                  name="Total Patients"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10B981' }}
                />
                <Line
                  type="monotone"
                  dataKey="appointments"
                  name="Visits"
                  stroke="#6366F1"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
