'use client';

import React, { useState } from 'react';
import { useToastStore } from '@/components/common/Toast';

export const TransitComparisonCard: React.FC = () => {
  const [selectedTransit, setSelectedTransit] = useState<'bike' | 'rideshare'>('rideshare');
  const { addToast } = useToastStore();

  const handleBookTravel = () => {
    addToast(
      selectedTransit === 'rideshare'
        ? '已预约返校特惠快车'
        : '已为您锁定周边美团单车优惠骑行券',
      'success'
    );
  };

  return (
    <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-card-ambient border border-outline-variant/20 flex flex-col gap-space-sm">
      <div className="flex items-center justify-between pb-1 border-b border-outline-variant/10">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-tertiary text-[22px]">
            commute
          </span>
          <span className="font-headline-md text-headline-md text-on-surface font-bold">
            返校出行方式对比
          </span>
        </div>
        <span className="font-label-sm text-[11px] text-outline">回学院路校区</span>
      </div>

      <div className="grid grid-cols-2 gap-space-sm">
        {/* Option A: Bike + Metro */}
        <div
          onClick={() => setSelectedTransit('bike')}
          className={`p-space-sm rounded-xl flex flex-col justify-between transition-all cursor-pointer border ${
            selectedTransit === 'bike'
              ? 'bg-tertiary-container/20 border-tertiary shadow-xs'
              : 'bg-surface-container-low border-outline-variant/15 hover:bg-surface-container'
          }`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface font-bold">
                单车+地铁
              </span>
              <span className="material-symbols-outlined text-[16px] text-tertiary">
                directions_bike
              </span>
            </div>
            <span className="font-body-sm text-[12px] text-on-surface-variant">约 35 分钟</span>
          </div>

          <div className="mt-space-sm pt-2 flex items-baseline justify-between border-t border-outline-variant/10">
            <span className="font-body-sm text-[11px] text-outline">经济方案</span>
            <span className="font-headline-md text-headline-md text-on-surface font-bold">
              ¥1.5<span className="text-[10px] font-normal text-outline">/人</span>
            </span>
          </div>
        </div>

        {/* Option B: Rideshare */}
        <div
          onClick={() => setSelectedTransit('rideshare')}
          className={`p-space-sm rounded-xl flex flex-col justify-between transition-all cursor-pointer border ${
            selectedTransit === 'rideshare'
              ? 'bg-primary-container/20 border-primary-container shadow-xs'
              : 'bg-surface-container-low border-outline-variant/15 hover:bg-surface-container'
          }`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface font-bold">
                4人特惠快车
              </span>
              <span className="material-symbols-outlined text-[16px] text-secondary">
                local_taxi
              </span>
            </div>
            <span className="font-body-sm text-[12px] text-secondary font-medium">约 18 分钟直达</span>
          </div>

          <div className="mt-space-sm pt-2 flex items-baseline justify-between border-t border-outline-variant/10">
            <span className="font-body-sm text-[11px] text-on-surface-variant">整单¥32</span>
            <div className="flex items-baseline">
              <span className="font-headline-md text-headline-md text-secondary font-black">
                ¥8.0
              </span>
              <span className="text-[10px] text-outline ml-0.5">/人AA</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleBookTravel}
        className="w-full py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md rounded-xl transition-all flex items-center justify-center gap-1.5 mt-1 border border-outline-variant/20 font-semibold"
      >
        <span className="material-symbols-outlined text-[16px]">navigation</span>
        <span>一键预定返校快车</span>
      </button>
    </div>
  );
};
