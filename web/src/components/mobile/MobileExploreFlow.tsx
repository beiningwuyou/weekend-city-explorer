'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePricingStore, HeadcountType } from '@/stores/usePricingStore';
import { useViewModeStore } from '@/stores/useViewModeStore';
import { mockItineraries } from '@/lib/mockData/itineraries';
import { ItineraryPlan } from '@/types/poi';
import { useToastStore } from '@/components/common/Toast';
import { WechatInviteModal } from '@/components/mobile/WechatInviteModal';

export const MobileExploreFlow: React.FC = () => {
  const { headcount, setHeadcount, calculatePerPersonPrice } =
    usePricingStore();
  const { simulatedWeather } = useViewModeStore();
  const { addToast } = useToastStore();

  const [selectedBudget, setSelectedBudget] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlanForInvite, setSelectedPlanForInvite] =
    useState<ItineraryPlan | null>(null);
  const [expandedTransitMapId, setExpandedTransitMapId] = useState<
    string | null
  >(null);

  // Filter logic based on weather, budget and category
  const filteredPlans = useMemo(() => {
    return mockItineraries.filter((plan) => {
      // Weather filter: If rainy, we boost rain friendly plans, or hide outdoor hikes
      if (simulatedWeather.key === 'rainy' && plan.category === 'hike') {
        // deprioritize hike in heavy rain
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'indoor') {
          if (!plan.isRainFriendly) return false;
        } else if (plan.category !== selectedCategory) {
          return false;
        }
      }
      // Budget filter (evaluated at current headcount)
      const currentPrice = calculatePerPersonPrice(plan.baseBudgetSolo).price;
      if (selectedBudget !== 'all') {
        if (currentPrice > selectedBudget) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedBudget, simulatedWeather, calculatePerPersonPrice]);

  const handlePickRandom = () => {
    if (filteredPlans.length === 0) return;
    const randomPlan =
      filteredPlans[Math.floor(Math.random() * filteredPlans.length)];
    addToast(`🎲 随机命中方案：【${randomPlan.title}】！已为您高亮！`, 'success');
  };

  return (
    <div className="space-y-3.5 pb-6">
      {/* 1. 情境感知提醒横幅 (天气动态触发) */}
      <div
        className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all duration-300 shadow-xs ${
          simulatedWeather.key === 'rainy'
            ? 'bg-gradient-to-r from-blue-500/10 via-sky-500/10 to-surface-container border-sky-400/40'
            : 'bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-surface-container border-primary-container/40'
        }`}
      >
        <span className="text-2xl select-none mt-0.5">
          {simulatedWeather.icon}
        </span>
        <div className="flex-1 min-w-0 text-xs">
          <div className="font-bold text-on-surface flex items-center gap-1.5">
            <span>
              {simulatedWeather.key === 'rainy'
                ? '🌧️ 雨天情境已激活 · 室内避雨首推'
                : '💡 周五出游决策指南已就绪'}
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-primary-container text-on-primary-container font-black">
              实时感应
            </span>
          </div>
          <div className="text-on-surface-variant text-[11px] mt-0.5 leading-snug">
            {simulatedWeather.description}
          </div>
        </div>
        <button
          onClick={handlePickRandom}
          className="bg-primary hover:opacity-90 active:scale-95 text-white px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 shrink-0 transition"
        >
          <span className="material-symbols-outlined text-[15px]">casino</span>
          <span>随机选</span>
        </button>
      </div>

      {/* 2. 快速决策筛选器 (俞军减法版核心交互) */}
      <div className="bg-surface-container-lowest p-3.5 rounded-2xl shadow-sm border border-outline-variant/20 space-y-3">
        {/* 单人预算上限 (大学生刚性约束) */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[16px]">
                account_balance_wallet
              </span>
              <span>单人预算上限</span>
            </span>
            <span className="text-secondary font-black text-xs">
              {selectedBudget === 'all'
                ? '全部预算'
                : selectedBudget === 0
                ? '0元免票'
                : `≤ ¥${selectedBudget}`}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { val: 0, label: '0元免票' },
              { val: 50, label: '≤50元平价' },
              { val: 100, label: '≤100元精选' },
              { val: 'all', label: '全部' },
            ].map((b) => (
              <button
                key={String(b.val)}
                onClick={() => setSelectedBudget(b.val as any)}
                className={`py-1.5 text-xs rounded-xl font-medium border transition-all active:scale-95 ${
                  selectedBudget === b.val
                    ? 'border-primary-container bg-primary-container text-on-primary-container font-bold shadow-xs'
                    : 'border-outline-variant/20 text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* 同行人数阶梯杠杆 */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-tertiary text-[16px]">
                groups
              </span>
              <span>同行模式</span>
            </span>
            <span className="text-[11px] text-tertiary font-bold">
              {headcount === 4
                ? '🔥 4人成团立省60%'
                : headcount === 2
                ? '双人同行享优惠'
                : '单人轻松出行'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { count: 1 as HeadcountType, label: '一人放空' },
              { count: 2 as HeadcountType, label: '双人搭子' },
              { count: 4 as HeadcountType, label: '4人结伴' },
            ].map((m) => (
              <button
                key={m.count}
                onClick={() => setHeadcount(m.count)}
                className={`py-1.5 text-xs rounded-xl font-medium border transition-all active:scale-95 ${
                  headcount === m.count
                    ? 'border-secondary bg-secondary-container text-on-secondary font-bold shadow-xs'
                    : 'border-outline-variant/20 text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* 偏好标签滑块 */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {[
            { key: 'all', label: '全部探索' },
            { key: 'indoor', label: '☕ 室内避雨' },
            { key: 'art', label: '🎨 文艺展演' },
            { key: 'market', label: '🛍️ 复古市集' },
            { key: 'hike', label: '🌲 近郊轻徒步' },
            { key: 'night', label: '🌙 夜市烟火' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat.key
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. 结果统计与排序 */}
      <div className="flex items-center justify-between px-1 text-xs text-on-surface-variant">
        <span>已匹配 {filteredPlans.length} 处高校热门周末路线</span>
        <span className="text-tertiary font-semibold flex items-center gap-0.5">
          <span className="material-symbols-outlined text-[14px]">tune</span>
          <span>推荐排序</span>
        </span>
      </div>

      {/* 4. 推荐活动卡片流 (美团生态与避坑红黑榜) */}
      <div className="space-y-4">
        {filteredPlans.map((plan, index) => {
          const priceCalc = calculatePerPersonPrice(plan.baseBudgetSolo);
          const isMapExpanded = expandedTransitMapId === plan.id;

          return (
            <div
              key={plan.id}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden hover:shadow-md transition-all space-y-0"
            >
              {/* Card Image Banner */}
              <div className="relative h-44 w-full">
                <Image
                  src={plan.coverImage}
                  alt={plan.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Corner Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-black text-[11px] shadow-sm flex items-center gap-1">
                    <span>TOP {index + 1}</span>
                  </span>
                  {plan.isRainFriendly ? (
                    <span className="px-2 py-0.5 rounded-full bg-sky-500 text-white font-bold text-[11px] shadow-sm">
                      室内避雨
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[11px] shadow-sm">
                      晴空户外
                    </span>
                  )}
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs font-mono text-[11px]">
                    热度 {plan.hotScore || 95}
                  </span>
                </div>

                {/* Bottom Overlay Title & Price */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between gap-2">
                  <div className="text-white min-w-0">
                    <h3 className="font-headline-md text-headline-md font-bold text-white drop-shadow truncate">
                      {plan.title}
                    </h3>
                    <p className="text-[11px] text-white/85 truncate">
                      {plan.subtitle}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-secondary-fixed text-lg font-black leading-none drop-shadow">
                      ¥{priceCalc.price}
                    </div>
                    <span className="text-[10px] text-white/80">
                      人均 / {headcount}人同行
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3.5 space-y-3">
                {/* Meituan & Dianping Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 font-bold text-[11px] flex items-center gap-1 border border-amber-500/25">
                    <span className="material-symbols-outlined text-[13px]">
                      military_tech
                    </span>
                    <span>大众点评2026必玩/必吃榜</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-tertiary-container/30 text-tertiary font-bold text-[11px]">
                    {priceCalc.savingsBadge}
                  </span>
                </div>

                {/* 避坑与游玩贴士 */}
                <div className="space-y-1.5 text-xs bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/10">
                  {plan.tipsRed && (
                    <div className="flex items-start gap-1.5 text-error">
                      <span className="material-symbols-outlined text-[14px] shrink-0 mt-0.5">
                        warning
                      </span>
                      <span className="leading-tight">
                        <strong className="font-bold">避坑建议：</strong>
                        {plan.tipsRed}
                      </span>
                    </div>
                  )}
                  {plan.tipsGreen && (
                    <div className="flex items-start gap-1.5 text-tertiary">
                      <span className="material-symbols-outlined text-[14px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span className="leading-tight">
                        <strong className="font-bold">体验推荐：</strong>
                        {plan.tipsGreen}
                      </span>
                    </div>
                  )}
                </div>

                {/* 动线概览与微折叠 */}
                <div className="text-[11px] text-on-surface-variant flex items-center justify-between border-t border-outline-variant/10 pt-2">
                  <span className="flex items-center gap-1 truncate pr-2">
                    <span className="material-symbols-outlined text-[14px] text-outline">
                      directions_transit
                    </span>
                    <span>{plan.transitSummary || '单车接驳 ➔ 观展 ➔ 聚宝源铜锅'}</span>
                  </span>
                  <button
                    onClick={() =>
                      setExpandedTransitMapId(isMapExpanded ? null : plan.id)
                    }
                    className="text-primary font-bold hover:underline shrink-0 flex items-center gap-0.5"
                  >
                    <span>{isMapExpanded ? '收起动线' : '动线明细'}</span>
                    <span className="material-symbols-outlined text-[13px]">
                      {isMapExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                </div>

                {/* 展开的微动线节点列表 */}
                {isMapExpanded && (
                  <div className="space-y-1.5 pt-1 border-t border-dashed border-outline-variant/20 animate-in fade-in duration-200">
                    {plan.nodes.map((node, i) => (
                      <div
                        key={node.id}
                        className="flex items-center justify-between text-[11px] p-1.5 rounded-lg bg-surface-container"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-outline font-bold">
                            {node.timeSlot}
                          </span>
                          <span className="font-bold text-on-surface">
                            {node.poiName}
                          </span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant">
                          {node.notes}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setSelectedPlanForInvite(plan)}
                    className="py-2.5 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-xs font-bold border border-outline-variant/20 flex items-center justify-center gap-1 transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[16px] text-tertiary">
                      share
                    </span>
                    <span>邀请搭子</span>
                  </button>
                  <Link
                    href={`/itinerary/${plan.code || plan.id}`}
                    className="py-2.5 px-3 rounded-xl bg-primary-container text-on-primary-container font-label-md text-xs font-bold shadow-xs hover:bg-primary-fixed-dim flex items-center justify-center gap-1 transition-all active:scale-95"
                  >
                    <span>查看路线与排号</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 微信群邀请卡片弹窗 */}
      <WechatInviteModal
        plan={selectedPlanForInvite}
        isOpen={!!selectedPlanForInvite}
        onClose={() => setSelectedPlanForInvite(null)}
      />
    </div>
  );
};
