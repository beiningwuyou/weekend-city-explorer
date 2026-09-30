'use client';

import React from 'react';
import { useViewModeStore } from '@/stores/useViewModeStore';

export const ViewModeToolbar: React.FC = () => {
  const { viewMode, setViewMode } = useViewModeStore();

  return (
    <aside aria-label="双端视图切换控制" className="fixed top-3 right-4 z-50 hidden lg:flex items-center gap-1 bg-surface-container-highest/90 backdrop-blur-md p-1 rounded-full border border-outline-variant/30 shadow-lg text-xs">
      <button
        onClick={() => setViewMode('mobile')}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-bold transition-all ${
          viewMode === 'mobile'
            ? 'bg-primary-container text-on-primary-container shadow-xs scale-105'
            : 'text-on-surface-variant hover:text-on-surface'
        }`}
      >
        <span className="material-symbols-outlined text-[16px]">
          stay_current_portrait
        </span>
        <span>小程序视图</span>
      </button>

      <button
        onClick={() => setViewMode('desktop')}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-bold transition-all ${
          viewMode === 'desktop'
            ? 'bg-slate-900 text-white shadow-xs scale-105'
            : 'text-on-surface-variant hover:text-on-surface'
        }`}
      >
        <span className="material-symbols-outlined text-[16px]">
          desktop_windows
        </span>
        <span>桌面工作台</span>
      </button>
    </aside>
  );
};
