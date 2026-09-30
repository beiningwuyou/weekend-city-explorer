'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import { cn } from '@/lib/utils';

export const GlobalHeader: React.FC = () => {
  const pathname = usePathname();
  const { user } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: '探索大厅', path: '/explore', match: (p: string) => p === '/explore' || p === '/' },
    {
      label: '行程工作台',
      path: '/itinerary/BJ-798-HOT04',
      match: (p: string) => p.startsWith('/itinerary'),
    },
    {
      label: '搭子广场',
      path: '/squads',
      match: (p: string) => p.startsWith('/squads'),
    },
    {
      label: '出游管家',
      path: '/trips',
      match: (p: string) => p.startsWith('/trips') || p.startsWith('/checkin'),
    },
    {
      label: '🎬 视频Demo',
      path: '/demo-video',
      match: (p: string) => p.startsWith('/demo-video'),
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/15 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 w-full max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-space-md">
        {/* Brand & Campus Badge */}
        <div className="flex items-center gap-space-md shrink-0">
          <Link href="/explore" className="flex items-center gap-space-sm group">
            <div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-[18px] shadow-sm group-hover:scale-105 transition-transform">
              🧭
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-headline-md text-on-surface tracking-tight leading-tight">
                美团·周末去哪玩
              </span>
              <span className="text-[10px] text-outline font-semibold tracking-wider uppercase">
                Campus Studio
              </span>
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-space-xs px-space-sm py-1 bg-surface-container rounded-full border border-outline-variant/20 shadow-xs">
            <span className="material-symbols-outlined text-[15px] text-tertiary">
              verified
            </span>
            <span className="font-label-sm text-label-sm text-on-surface font-medium">
              海淀学院路高校圈专区
            </span>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <nav className="flex items-center gap-space-xs p-1 bg-surface-container-low rounded-xl border border-outline-variant/10">
          {navItems.map((item) => {
            const isActive = item.match(pathname);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  'px-space-md py-space-xs font-label-lg text-label-lg transition-all rounded-lg select-none',
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Search & Profile */}
        <div className="flex items-center gap-space-sm shrink-0">
          <div className="relative hidden lg:flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索周末活动、必吃铜锅..."
              className="w-56 xl:w-64 pl-9 pr-3 py-1.5 bg-surface-container-lowest rounded-xl font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container border border-outline-variant/20 shadow-card-ambient transition-all"
            />
          </div>

          <Link
            href="/profile"
            className="flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-lowest rounded-full cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/20 shadow-card-ambient"
          >
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0 text-on-primary-container font-bold shadow-xs">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  {user.name}
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-bold">
                  {user.creditScore.toFixed(1)}★
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-tertiary">
                学信网认证
              </span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
              arrow_drop_down
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
