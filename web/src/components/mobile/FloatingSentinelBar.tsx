'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSentinelStore } from '@/stores/useSentinelStore';
import { useToastStore } from '@/components/common/Toast';

export const FloatingSentinelBar: React.FC = () => {
  const { sentinel, deferQueueThirtyMinutes, triggerManualQueue } =
    useSentinelStore();
  const { addToast } = useToastStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const isTriggered = sentinel.status === 'triggered';
  const isDeferred = sentinel.status === 'deferred';

  const handleDefer = (e: React.MouseEvent) => {
    e.stopPropagation();
    deferQueueThirtyMinutes();
    addToast('排号已顺延 30 分钟', 'success');
  };

  const handleManualTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerManualQueue();
    addToast('已发起远程取号', 'success');
  };

  return (
    <div className="fixed lg:absolute bottom-16 left-0 right-0 z-30 px-3 pointer-events-none">
      <div className="w-full max-w-md mx-auto pointer-events-auto">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={`cursor-pointer transition-all duration-300 rounded-2xl p-2.5 shadow-lg border backdrop-blur-md ${
            isTriggered
              ? 'bg-amber-500/95 text-white border-amber-300 shadow-amber-500/25 animate-pulse'
              : isDeferred
              ? 'bg-purple-900/95 text-purple-100 border-purple-500 shadow-purple-900/30'
              : 'bg-slate-900/95 text-white border-slate-700 shadow-slate-900/30'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center shrink-0 text-sm">
                🤖
              </span>
              <div className="min-w-0 text-xs">
                <div className="font-bold truncate flex items-center gap-1.5">
                  <span>
                    {isTriggered
                      ? '🔥 聚宝源已自动取号'
                      : isDeferred
                      ? '⏱️ 排号已顺延 30 分钟'
                      : '⚡ 自动排号巡检中'}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/20 font-mono">
                    {sentinel.myTicketNumber}
                  </span>
                </div>
                <div className="text-[10px] opacity-85 truncate">
                  聚宝源望京店 ·{' '}
                  {isTriggered
                    ? '前方仅剩 4 桌 · 预计 5 分钟内入座'
                    : `离店 600m · ${sentinel.scheduledQueueTime} 自动锁号`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {!isTriggered && (
                <button
                  onClick={handleManualTrigger}
                  className="px-2 py-1 rounded-lg bg-primary-container text-on-primary-container font-label-sm text-[11px] font-bold shadow-xs active:scale-95 transition-transform"
                >
                  立即锁号
                </button>
              )}
              {isTriggered && (
                <button
                  onClick={handleDefer}
                  className="px-2 py-1 rounded-lg bg-white text-amber-900 font-label-sm text-[11px] font-bold shadow-xs active:scale-95 transition-transform"
                >
                  推迟30分
                </button>
              )}
              <Link
                href="/itinerary/BJ-798-HOT04"
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                title="查看全景工作台"
              >
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          {/* Expanded Drawer info if tapped */}
          {isExpanded && (
            <div className="mt-2.5 pt-2.5 border-t border-white/20 text-[11px] space-y-1.5 animate-in fade-in duration-200">
              <div className="flex justify-between text-white/90">
                <span>美团学信网优先等位特权：</span>
                <span className="font-bold text-emerald-300">已生效（过号顺延3桌）</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>当前叫号进度：</span>
                <span>当前叫号 {sentinel.currentCalledNumber} / 您的号牌 {sentinel.myTicketNumber}</span>
              </div>
              <p className="text-[10px] opacity-75">
                💡 Cagan 容灾机制：如您在 798 观展手机静音，哨兵将自动代取普通号并震动提醒；若超时未到店，享受高校专属过号免费顺延一次。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
