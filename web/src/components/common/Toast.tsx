'use client';

import React from 'react';
import { create } from 'zustand';
import { motion, AnimatePresence } from 'framer-motion';

export interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'warning' | 'info' | 'error';
  duration?: number;
}

interface ToastState {
  toasts: ToastItem[];
  addToast: (message: string, type?: ToastItem['type'], duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, type = 'success', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { id, message, type, duration }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, duration);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  const iconMap = {
    success: 'check_circle',
    warning: 'warning',
    info: 'info',
    error: 'error',
  };

  const colorMap = {
    success: 'bg-tertiary text-on-tertiary',
    warning: 'bg-[#FF6600] text-white',
    info: 'bg-on-surface text-surface',
    error: 'bg-error text-on-error',
  };

  return (
    <div className="fixed top-20 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            onClick={() => removeToast(toast.id)}
            className={`pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-lg cursor-pointer ${
              colorMap[toast.type || 'success']
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {iconMap[toast.type || 'success']}
            </span>
            <span className="text-body-sm font-semibold">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
