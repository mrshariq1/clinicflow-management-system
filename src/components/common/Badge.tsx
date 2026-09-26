import React from 'react';

export type BadgeVariant =
  | 'confirmed'
  | 'completed'
  | 'pending'
  | 'cancelled'
  | 'paid'
  | 'unpaid'
  | 'active'
  | 'inactive'
  | 'available'
  | 'consulting'
  | 'offduty';

interface BadgeProps {
  status: string;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({ status, variant, className = '' }: BadgeProps) {
  const norm = (variant || status || '').toLowerCase().replace(/\s+/g, '');

  let style = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
  let dotColor = 'bg-slate-400';

  if (norm.includes('confirm') || norm.includes('paid') || norm.includes('active') || norm.includes('available')) {
    style = 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40';
    dotColor = 'bg-emerald-500';
  } else if (norm.includes('complete')) {
    style = 'bg-blue-50 text-blue-700 border border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40';
    dotColor = 'bg-blue-500';
  } else if (norm.includes('pending') || norm.includes('consult')) {
    style = 'bg-amber-50 text-amber-700 border border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40';
    dotColor = 'bg-amber-500';
  } else if (norm.includes('cancel') || norm.includes('unpaid') || norm.includes('offduty') || norm.includes('refund')) {
    style = 'bg-rose-50 text-rose-700 border border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40';
    dotColor = 'bg-rose-500';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium tracking-tight whitespace-nowrap ${style} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
      <span>{status}</span>
    </span>
  );
}
