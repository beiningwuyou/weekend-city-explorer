'use client';

import React from 'react';
import { useSentinelStore } from '@/stores/useSentinelStore';
import { useToastStore } from '@/components/common/Toast';

export const QueueSentinelWidget: React.FC = () => {
  const {
    sentinel,
    toggleAutoDelegate,
    triggerManualQueue,
    deferQueueThirtyMinutes,
  } = useSentinelStore();
  const { addToast } = useToastStore();

  const handleManualQueue = () => {
    triggerManualQueue();
    addToast('已为您立即远程代取聚宝源大桌号 A-39，前序等待 23 桌！', 'success');
  };

  const handleDefer = () => {
    deferQueueThirtyMinutes();
    addToast('已将排号调度顺延 30 分钟至 17:45，享受过号顺延 3 桌特权！', 'warning');
  };

  return (
    <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-card-ambient border-2 border-secondary/30 flex flex-col gap-space-sm relative overflow-hidden">
      {/* Sentinel Title Header */}
      <div className="flex items-center justify-between pb-1 border-b border-outline-variant/10">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary-container text-[22px]">
            radar
          </span>
          <span className="font-headline-md text-headline-md text-on-surface font-bold">
            自动排号助手
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
          <span className="font-label-sm text-label-sm text-secondary font-bold">
            实时巡检中
          </span>
        </div>
      </div>

      {/* Realtime Thermometer status */}
      <div className="p-space-sm bg-surface-container-low rounded-xl flex flex-col gap-space-xs border border-outline-variant/10">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface font-bold">
            {sentinel.targetRestaurantName}
          </span>
          <span className="font-label-sm text-[11px] text-outline">
            测距 600m · 实时叫号中
          </span>
        </div>

        <div className="flex items-center justify-between py-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display-lg text-[26px] text-on-surface font-black">
              {sentinel.waitingTablesCount}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
              桌排队中 (叫号至 {sentinel.currentCalledNumber})
            </span>
          </div>
          <div className="text-right">
            <span className="font-label-md text-label-md text-secondary font-bold">
              预估等位 50 分钟
            </span>
          </div>
        </div>

        <div className="p-2.5 bg-surface-container-lowest rounded-lg flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-tertiary">
              flight_takeoff
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface font-bold">
                预计 {sentinel.scheduledQueueTime} 自动取号
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">
                预留 8 分钟步行时间
              </span>
            </div>
          </div>
          <span className="font-label-sm text-label-sm text-tertiary font-bold bg-tertiary-container/30 px-2 py-0.5 rounded-full">
            到店即坐
          </span>
        </div>
      </div>

      {/* Control Actions & Toggles */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              lock_clock
            </span>
            <span className="font-body-sm text-body-sm text-on-surface font-medium">
              自动代取排队号
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={sentinel.autoDelegateEnabled}
              onChange={toggleAutoDelegate}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              forward_10
            </span>
            <span className="font-body-sm text-body-sm text-on-surface font-medium">
              过号顺延 3 桌特权
            </span>
          </div>
          <span className="font-label-sm text-[11px] text-tertiary font-bold bg-tertiary-container/20 px-2 py-0.5 rounded">
            已开启
          </span>
        </div>

        {/* Buttons for interactive testing */}
        <div className="grid grid-cols-2 gap-space-xs mt-1">
          <button
            onClick={handleManualQueue}
            className="py-1.5 px-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all flex items-center justify-center gap-1 font-semibold border border-outline-variant/20"
          >
            <span className="material-symbols-outlined text-[16px]">touch_app</span>
            <span>提前取号</span>
          </button>
          <button
            onClick={handleDefer}
            className="py-1.5 px-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container text-secondary font-label-md text-label-md transition-all flex items-center justify-center gap-1 font-semibold border border-outline-variant/20"
          >
            <span className="material-symbols-outlined text-[16px]">more_time</span>
            <span>延后30分钟</span>
          </button>
        </div>
      </div>
    </div>
  );
};
