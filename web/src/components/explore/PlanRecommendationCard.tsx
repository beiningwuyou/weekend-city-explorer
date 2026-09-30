'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePricingStore } from '@/stores/usePricingStore';
import { mockItineraries } from '@/lib/mockData/itineraries';
import { Badge } from '@/components/common/Badge';

export const PlanRecommendationCard: React.FC = () => {
  const { headcount, calculatePerPersonPrice } = usePricingStore();
  const planA = mockItineraries[0];
  const planB = mockItineraries[1];

  const priceCalcA = calculatePerPersonPrice(planA.baseBudgetSolo);
  const priceCalcB = calculatePerPersonPrice(planB.baseBudgetSolo);

  return (
    <div className="flex flex-col gap-space-md">
      {/* 方案 A: 核心推荐主卡片 */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-card-ambient border-2 border-primary-container/40 hover:shadow-card-hover transition-all group relative overflow-hidden">
        {/* Top Badges & Pricing */}
        <div className="flex items-start justify-between gap-space-xs">
          <div>
            <div className="flex items-center gap-space-xs mb-1">
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-xs">
                <span
                  className="material-symbols-outlined text-[13px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                推荐方案 A
              </span>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-semibold">
                室内避雨
              </span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-primary transition-colors font-bold mt-1">
              {planA.title.replace('【避雨精选】', '')}
            </h3>
          </div>

          <div className="text-right shrink-0">
            <span className="font-display-lg text-display-lg text-secondary font-black leading-none">
              ¥{priceCalcA.price.toFixed(1).replace(/\.0$/, '')}
            </span>
            <span className="block font-label-sm text-label-sm text-outline mt-0.5">
              人均 / {headcount}人同行
            </span>
          </div>
        </div>

        {/* Reputation & Ratings */}
        <div className="flex flex-wrap items-center gap-space-xs my-space-sm">
          <Badge variant="must-eat" icon="military_tech">
            大众点评2026北京必玩榜 TOP 3
          </Badge>
          <span className="px-2 py-0.5 bg-surface-container text-on-surface font-label-sm text-label-sm rounded-full font-bold">
            4.8 分 超赞好评
          </span>
          <span className="px-2 py-0.5 bg-tertiary-container/30 text-on-tertiary-container font-label-sm text-label-sm rounded-full font-semibold">
            {priceCalcA.savingsBadge}
          </span>
        </div>

        {/* Visual Images */}
        <div className="grid grid-cols-2 gap-space-xs rounded-xl overflow-hidden my-space-sm">
          <div className="relative h-28 overflow-hidden group/img">
            <Image
              src={planA.coverImage}
              alt="798当代插画画廊"
              fill
              className="object-cover group-hover/img:scale-105 transition-transform duration-500"
            />
            <span className="absolute bottom-1 left-1 px-2 py-0.5 bg-on-surface/75 text-surface font-label-sm text-[11px] rounded-md backdrop-blur-xs">
              798 当代插画艺术展
            </span>
          </div>
          <div className="relative h-28 overflow-hidden group/img">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWvbFIA1nWbDmcKqm59H7VbhGJBqxXXee7NjdkWOoFT1efKRMAUrePfZYA7yDcYbASTxPtPNH862twiH0JjSuk45YjisBrgJ6CwuHCevtvTh-wsUXbVW9NCA0OMjAwI5Q8_aPXRxaqZ464f7MuvC573_-AkcPc0C5hjBsE_t1lWmAOjCrjz6NNXwGSTgB6Dz-Q5hnDhgOZqTe5uBaWOgIx_GXCoxrMBeIVAYauXrdG5xfMFieg4l84"
              alt="聚宝源鲜切羊肉锅"
              fill
              className="object-cover group-hover/img:scale-105 transition-transform duration-500"
            />
            <span className="absolute bottom-1 left-1 px-2 py-0.5 bg-on-surface/75 text-surface font-label-sm text-[11px] rounded-md backdrop-blur-xs">
              聚宝源传统铜锅涮肉
            </span>
          </div>
        </div>

        {/* Pitfall Tips */}
        <div className="p-space-sm bg-surface-container-low rounded-xl mb-space-md border border-outline-variant/10">
          <div className="flex items-center gap-space-xs text-on-surface-variant mb-1 font-label-md text-label-md font-bold">
            <span className="material-symbols-outlined text-[16px] text-primary">
              tips_and_updates
            </span>
            <span>避坑指南 (基于大众点评 NLP 实测)</span>
          </div>
          <ul className="font-body-sm text-body-sm text-on-surface-variant space-y-1 list-disc list-inside">
            <li>画廊二层光线偏暗，拍摄人像建议自备小型便携补光灯。</li>
            <li>周六 15:30 后为进店高峰，智能哨兵已锁定 17:15 自动远程取号。</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-space-sm">
          <Link
            href={`/itinerary/${planA.id}`}
            className="w-full py-2.5 px-space-sm bg-primary-container text-on-primary-container font-label-lg text-label-lg rounded-xl hover:bg-primary-fixed-dim shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] font-bold"
          >
            <span>查看全景履约</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
          <Link
            href={`/squads/create?planId=${planA.id}`}
            className="w-full py-2.5 px-space-sm bg-surface-container-high text-on-surface font-label-lg text-label-lg rounded-xl hover:bg-surface-container-highest transition-all flex items-center justify-center gap-1.5 font-semibold"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">
              group_add
            </span>
            <span>快速发起拼团</span>
          </Link>
        </div>
      </div>

      {/* 方案 B: 备选卡片 */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-card-ambient border border-outline-variant/20 hover:shadow-card-hover transition-all">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-space-xs mb-1">
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-bold">
                方案 B · 备选
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                极简预算 / 时间紧凑
              </span>
            </div>
            <h4 className="font-headline-md text-headline-md text-on-surface font-bold">
              {planB.title.replace('【30元极简】', '')}
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
              骑行仅需 12 分钟直达五道口，旧书市集淘黑胶与复古手办，再来一碗地道小吃。
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="font-headline-lg text-headline-lg text-tertiary font-black">
              ¥{priceCalcB.price.toFixed(1).replace(/\.0$/, '')}
            </span>
            <span className="block font-label-sm text-label-sm text-outline">
              人均 / {headcount}人均摊
            </span>
          </div>
        </div>

        <div className="mt-space-sm pt-space-xs flex items-center justify-between border-t border-outline-variant/10">
          <div className="flex items-center gap-space-xs text-tertiary font-label-sm text-label-sm font-semibold">
            <span className="material-symbols-outlined text-[16px]">pedal_bike</span>
            <span>骑行友好 · 紧邻学院路</span>
          </div>
          <Link
            href={`/itinerary/${planB.id}`}
            className="px-space-md py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1 font-medium"
          >
            <span>查看详情</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
