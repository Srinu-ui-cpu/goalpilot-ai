import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMinutesToHours(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function getEstimatedSuccessBadgeColor(rate: number): string {
  if (rate >= 90) return 'text-emerald-400 bg-emerald-950/40 border-emerald-800';
  if (rate >= 75) return 'text-amber-400 bg-amber-950/40 border-amber-800';
  return 'text-rose-400 bg-rose-950/40 border-rose-800';
}
