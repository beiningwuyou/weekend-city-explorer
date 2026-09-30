'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSquadStore } from '@/stores/useSquadStore';
import { useUserStore } from '@/stores/useUserStore';
import { Badge } from '@/components/common/Badge';
import { useViewModeStore } from '@/stores/useViewModeStore';

export default function TripsDashboardPage() {
  const { squads } = useSquadStore();
  const { user } = useUserStore();
  const { viewMode } = useViewModeStore();
  const isMobile = viewMode === 'mobile';
  const [activeTab, setActiveTab] = useState<'all' | 'ongoing' | 'completed'>('all');

  const tabs = [
    { key: 'all', label: '全部队伍' },
    { key: 'ongoing', label: '进行中' },
    { key: 'completed', label: '历史足迹' },
  ];

  const displayedSquads = squads.filter((s) => {
    if (activeTab === 'ongoing') return s.status === 'recruiting' || s.status === 'locked';
    if (activeTab === 'completed') return s.status === 'completed';
    return true;
  });

  return (
    <div className={`w-full mx-auto flex flex-col gap-3 sm:gap-4 ${isMobile ? 'max-w-full px-0' : 'max-w-[1440px] px-margin py-space-md'}`}>
      {/* 1. Header Summary Bar */}
      <section className="flex flex-col gap-2 p-3 sm:p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/15 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg sm:text-xl text-on-surface">我的出游看板</h1>
          <Link
            href="/squads/create"
            className="px-3 py-1.5 rounded-xl bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container text-xs font-bold transition-all shadow-xs flex items-center gap-1 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>发起拼团</span>
          </Link>
        </div>
        <p className="text-xs text-on-surface-variant">
          管理发起的拼团与出游记录
        </p>
      </section>

      {/* 2. Key Metrics Grid */}
      <section className={`grid gap-2 sm:gap-space-md ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest p-3 sm:p-space-md rounded-2xl shadow-card-ambient border border-outline-variant/15 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-xs text-on-surface-variant flex items-center gap-1">
              进行中队伍
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-extrabold text-on-surface">2</span>
              <span className="text-xs text-outline">支队伍</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-outline mt-0.5">1 发起 · 1 参与</span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary-container shrink-0">
            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">diversity_3</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest p-3 sm:p-space-md rounded-2xl shadow-card-ambient border border-outline-variant/15 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-xs text-on-surface-variant">累计成团出游</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-extrabold text-on-surface">{user.completedTripsCount}</span>
              <span className="text-xs text-outline">次履约</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-tertiary font-semibold mt-0.5">100% 履约率</span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary shrink-0">
            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">check_circle</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest p-3 sm:p-space-md rounded-2xl shadow-card-ambient border border-outline-variant/15 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-xs text-on-surface-variant">拼团累计节省</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-secondary">
                ¥{user.totalSavedAmount}
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-outline mt-0.5">团购直降+车费AA</span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-secondary-fixed/30 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">savings</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-container-lowest p-3 sm:p-space-md rounded-2xl shadow-card-ambient border border-outline-variant/15 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-xs text-on-surface-variant">学信网信用</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-extrabold text-on-surface">
                {user.creditScore.toFixed(1)}★
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-tertiary font-semibold mt-0.5">极高信用档案</span>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">verified</span>
          </div>
        </div>
      </section>

      {/* 3. Tabs */}
      <div className="flex items-center gap-1 border-b border-outline-variant/15 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-space-md py-2 rounded-xl font-label-md text-label-md transition-all ${
              activeTab === tab.key
                ? 'bg-primary-container text-on-primary-container font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Squad List */}
      <div className="flex flex-col gap-space-md">
        {displayedSquads.map((squad) => (
          <div
            key={squad.id}
            className={`bg-surface-container-lowest rounded-2xl p-space-md shadow-card-ambient border border-outline-variant/20 flex flex-col ${isMobile ? '' : 'md:flex-row md:items-center'} justify-between gap-space-md hover:shadow-card-hover transition-all`}
          >
            <div className="flex flex-col gap-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="font-mono text-secondary font-bold text-sm">{squad.squadNo}</span>
                <span className="font-headline-md text-headline-md text-on-surface font-bold">
                  {squad.title}
                </span>
                <Badge variant={squad.status === 'completed' ? 'neutral' : 'must-eat'}>
                  {squad.status === 'completed' ? '已完成' : squad.status === 'locked' ? '已满员待出发' : '招募中'}
                </Badge>
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant line-clamp-1">
                {squad.slogan}
              </p>
              <div className="flex items-center gap-3 text-body-sm text-outline text-[12px]">
                <span>出发: {squad.departureTime}</span>
                <span>·</span>
                <span>席位: {squad.currentMembers.length}/{squad.capacity} 人</span>
                <span>·</span>
                <span className="text-secondary font-semibold">人均: ¥{squad.budgetPerPerson}</span>
              </div>
            </div>

            <div className="flex items-center gap-space-sm shrink-0">
              {squad.status === 'completed' ? (
                <Link
                  href="/checkin"
                  className="px-space-md py-2 rounded-xl bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-label-md text-label-md font-bold transition-all shadow-xs"
                >
                  查看手账与结算
                </Link>
              ) : (
                <>
                  <Link
                    href={`/itinerary/${squad.associatedPlanId}`}
                    className="px-space-md py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-all border border-outline-variant/15"
                  >
                    行程全景
                  </Link>
                  <Link
                    href={`/squads/${squad.id}`}
                    className="px-space-md py-2 rounded-xl bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-label-md text-label-md font-bold transition-all shadow-xs"
                  >
                    管理小队
                  </Link>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 5. Xuexin Anti-Flake Shield Mechanism Card */}
      <div className={`bg-surface-container-lowest p-space-md rounded-2xl shadow-card-ambient border border-outline-variant/20 flex flex-col ${isMobile ? 'items-start' : 'sm:flex-row items-center'} justify-between gap-space-md`}>
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]">shield</span>
          </div>
          <div>
            <h4 className="font-headline-md text-headline-md text-on-surface font-bold">
              校友实名与信用保障
            </h4>
            <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
              同行校友均通过在读本硕实名校验，杜绝虚假占座，享受美团官方行程守护。
            </p>
          </div>
        </div>
        <span className="px-3 py-1.5 rounded-xl bg-surface-container-low text-tertiary font-label-sm text-label-sm font-bold shrink-0">
          🛡️ 已开启信用保障
        </span>
      </div>
    </div>
  );
}
