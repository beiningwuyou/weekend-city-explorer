'use client';

import React from 'react';
import Link from 'next/link';
import { mockItineraries } from '@/lib/mockData/itineraries';
import { ItineraryTimeline } from '@/components/itinerary/ItineraryTimeline';
import { DianpingReputationPanel } from '@/components/itinerary/DianpingReputationPanel';
import { TicketVoucherPass } from '@/components/itinerary/TicketVoucherPass';
import { QueueSentinelWidget } from '@/components/itinerary/QueueSentinelWidget';
import { TransitComparisonCard } from '@/components/itinerary/TransitComparisonCard';
import { useToastStore } from '@/components/common/Toast';
import { useViewModeStore } from '@/stores/useViewModeStore';

interface ItineraryDetailViewProps {
  id: string;
}

export const ItineraryDetailView: React.FC<ItineraryDetailViewProps> = ({ id }) => {
  const plan =
    mockItineraries.find((p) => p.id === id || p.code === id) || mockItineraries[0];
  const { addToast } = useToastStore();
  const { viewMode } = useViewModeStore();
  const isMobile = viewMode === 'mobile';

  const handleSaveDraft = () => {
    addToast('行程已存入备忘录', 'success');
  };

  return (
    <div className={`w-full mx-auto flex flex-col gap-3 sm:gap-4 ${isMobile ? 'max-w-full px-0' : 'max-w-[1440px] px-margin py-space-md'}`}>
      {/* 顶部标题与操作栏 */}
      <div className="flex flex-col gap-2.5 p-3 sm:p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/15 shadow-sm">
        <div className="flex items-center justify-between text-xs">
          <Link href="/explore" className="text-outline hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>返回探索</span>
          </Link>
          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-[11px]">
            {plan.code}
          </span>
        </div>

        <div>
          <h1 className="text-lg sm:text-xl font-bold text-on-surface leading-tight">
            {plan.title}
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            {plan.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-outline-variant/10">
          <button
            onClick={handleSaveDraft}
            className="flex-1 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
            <span>存为备忘</span>
          </button>
          <Link
            href={`/squads/create?planId=${plan.id}`}
            className="flex-[2] py-2 bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
            <span>发起 4 人搭子拼团</span>
          </Link>
        </div>
      </div>

      {/* 布局：移动端单列流式，桌面端三栏栅格 */}
      {isMobile ? (
        <div className="flex flex-col gap-3">
          {/* 1. 电子票凭证与哨兵排号 */}
          <div className="flex flex-col gap-3">
            <TicketVoucherPass />
            <QueueSentinelWidget />
            <TransitComparisonCard />
          </div>

          {/* 2. 时间线安排 */}
          <div className="flex flex-col gap-3">
            <ItineraryTimeline plan={plan} />
          </div>

          {/* 3. 点评与避坑贴士 */}
          <div className="flex flex-col gap-3">
            <DianpingReputationPanel />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <ItineraryTimeline plan={plan} />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <DianpingReputationPanel />
          </div>
          <div className="lg:col-span-3 flex flex-col gap-space-md">
            <TicketVoucherPass />
            <QueueSentinelWidget />
            <TransitComparisonCard />
          </div>
        </div>
      )}
    </div>
  );
};
