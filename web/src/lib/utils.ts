import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `¥${price.toFixed(1).replace(/\.0$/, '')}`;
}

export function formatMinutes(mins: number): string {
  if (mins < 60) return `${mins}分钟`;
  const hours = Math.floor(mins / 60);
  const remaining = mins % 60;
  return remaining > 0 ? `${hours}小时${remaining}分` : `${hours}小时`;
}
