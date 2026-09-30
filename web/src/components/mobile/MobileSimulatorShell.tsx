'use client';

import React, { useEffect, useState } from 'react';
import { useViewModeStore } from '@/stores/useViewModeStore';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileBottomNav } from '@/components/mobile/MobileBottomNav';
import { FloatingSentinelBar } from '@/components/mobile/FloatingSentinelBar';
import { ViewModeToolbar } from '@/components/mobile/ViewModeToolbar';
import { GlobalHeader } from '@/components/common/GlobalHeader';

interface Props {
  children: React.ReactNode;
}

export const MobileSimulatorShell: React.FC<Props> = ({ children }) => {
  const { viewMode, setViewMode } = useViewModeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto detect screen size
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 1024) {
        setViewMode('mobile');
      } else {
        // By default on desktop, show mobile simulator as requested by user
        setViewMode('mobile');
      }
    }
  }, [setViewMode]);

  if (!mounted) {
    return <div className="min-h-screen bg-surface">{children}</div>;
  }

  // 1. Desktop Mode: Render full 1440px workspace
  if (viewMode === 'desktop') {
    return (
      <div className="flex flex-col min-h-screen bg-surface">
        <GlobalHeader />
        <ViewModeToolbar />
        <main className="w-full pt-16 bg-surface min-h-screen flex flex-col">
          {children}
        </main>
      </div>
    );
  }

  // 2. Mobile Mini-program Mode:
  // On wide screens (lg), wrap in an elegant iPhone device frame simulator;
  // On mobile screens (< lg), take full native screen viewport.
  return (
    <div className="min-h-screen bg-slate-900/10 lg:bg-slate-900/85 lg:py-6 flex flex-col items-center justify-center transition-colors">
      <ViewModeToolbar />

      {/* Device Frame or Native Container */}
      <div className="w-full lg:max-w-[430px] lg:h-[900px] lg:max-h-[92vh] bg-surface flex flex-col relative lg:rounded-[44px] lg:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] lg:border-[8px] lg:border-slate-800 lg:ring-1 lg:ring-white/20 overflow-hidden transform-gpu">
        {/* iPhone Dynamic Island & WeChat Header Simulation for Desktop View */}
        <div className="hidden lg:flex items-center justify-between px-6 pt-3 pb-1 bg-surface z-40 select-none">
          <span className="text-[12px] font-bold text-on-surface font-mono">
            17:30
          </span>
          <div className="w-24 h-4 bg-slate-900 rounded-full" />
          <div className="flex items-center gap-1.5 text-on-surface">
            <span className="material-symbols-outlined text-[14px]">signal_cellular_4_bar</span>
            <span className="material-symbols-outlined text-[14px]">wifi</span>
            <span className="material-symbols-outlined text-[16px]">battery_full</span>
          </div>
        </div>

        {/* WeChat Mini-program Capsule Bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-surface text-on-surface border-b border-outline-variant/10 text-xs font-bold">
          <span className="text-[12px] text-on-surface-variant font-medium">
            周末去哪玩 · 高校版
          </span>
          {/* WeChat native 3-dots and circle capsule */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-outline-variant/30 bg-surface-container/60 shadow-xs">
            <span className="text-on-surface text-xs font-bold">···</span>
            <span className="w-px h-3 bg-outline-variant/40" />
            <span className="w-2.5 h-2.5 rounded-full border-2 border-on-surface" />
          </div>
        </div>

        {/* Mini-program Header (Campus + Weather + Profile Drawer) */}
        <MobileHeader />

        {/* Mini-program Scrollable Body */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-32 px-3 pt-3">
          {children}
        </main>

        {/* Floating Sentinel Bar (AI Queue Agent) */}
        <FloatingSentinelBar />

        {/* Mini-program Bottom Navigation (4 Core Tabs) */}
        <MobileBottomNav />

        {/* iPhone Home Indicator for Desktop Frame */}
        <div className="hidden lg:flex justify-center pb-2 bg-surface">
          <div className="w-32 h-1 bg-slate-400/60 rounded-full" />
        </div>
      </div>
    </div>
  );
};
