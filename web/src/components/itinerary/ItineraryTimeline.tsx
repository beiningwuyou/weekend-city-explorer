'use client';

import React from 'react';
import { ItineraryPlan } from '@/types/poi';

interface Props {
  plan: ItineraryPlan;
}

export const ItineraryTimeline: React.FC<Props> = ({ plan }) => {
  return (
    <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-card-ambient border border-outline-variant/20 flex flex-col gap-space-sm">
      <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/10">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[20px]">
            timeline
          </span>
          <span className="font-headline-md text-headline-md text-on-surface font-bold">
            时空路线规划
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full font-medium">
          全程预估 {plan.totalDurationHours} h
        </span>
      </div>

      {/* Dynamic Steps Timeline */}
      <div className="relative pl-6 space-y-6 pt-2 before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-surface-container-high">
        {/* Node 1: Bike transit */}
        <div className="relative group">
          <div className="absolute -left-[27px] top-0.5 w-6 h-6 rounded-full bg-primary-container flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[14px] text-on-primary-container">
              pedal_bike
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                13:30 · 出发
              </span>
              <span className="font-label-sm text-label-sm text-tertiary font-bold">
                低碳出行
              </span>
            </div>
            <p className="font-headline-md text-headline-md text-on-surface font-semibold">
              美团单车 · 校园接驳
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              北航南门停放区取车，沿辅路骑行 1.8km 直达地铁站
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="px-1.5 py-0.5 bg-surface-container text-on-surface-variant rounded text-[11px]">
                用时约 15min
              </span>
              <span className="px-1.5 py-0.5 bg-tertiary-container/30 text-tertiary rounded text-[11px] font-medium">
                高校骑行季卡免费
              </span>
            </div>
          </div>
        </div>

        {/* Node 2: 798 Exhibition */}
        <div className="relative group">
          <div className="absolute -left-[27px] top-0.5 w-6 h-6 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[14px]">palette</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                14:00
              </span>
              <span className="px-1.5 py-0.2 bg-error-container text-on-error-container font-label-sm text-[10px] rounded font-bold">
                入场高峰
              </span>
            </div>
            <p className="font-headline-md text-headline-md text-on-surface font-semibold">
              798 青年插画艺术展
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              主展厅 + 青年文创市集，沉浸式参访与拍照打卡约 2.5h
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="px-1.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed-variant rounded text-[11px] font-medium">
                学信网电子码验票
              </span>
              <span className="px-1.5 py-0.5 bg-surface-container text-on-surface-variant rounded text-[11px]">
                免费行李寄存
              </span>
            </div>
          </div>
        </div>

        {/* Node 3: Sentinel Queue (Highlighted) */}
        <div className="relative p-3 bg-secondary-fixed/30 rounded-xl -ml-2 border border-secondary/20 shadow-xs">
          <div className="absolute -left-[23px] top-3.5 w-6 h-6 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center shadow-md animate-pulse">
            <span className="material-symbols-outlined text-[14px]">alarm_on</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-secondary font-bold">
                17:15 ( 自动触发 )
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-bold bg-secondary-container/20 px-1.5 py-0.2 rounded">
                全自动哨兵
              </span>
            </div>
            <p className="font-headline-md text-headline-md text-on-surface font-bold">
              智能排号哨兵介入
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              测距 600m，AI 哨兵依据当前等位速度自动远程锁大桌号
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[11px] px-1.5 py-0.5 bg-primary-fixed text-on-primary-fixed rounded font-semibold">
                预计节省排队 50min
              </span>
              <span className="text-[11px] px-1.5 py-0.5 bg-tertiary-container/30 text-tertiary rounded font-medium">
                到店5分钟必坐
              </span>
            </div>
          </div>
        </div>

        {/* Node 4: Jubao Yuan Hotpot */}
        <div className="relative group">
          <div className="absolute -left-[27px] top-0.5 w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[14px]">skillet</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                18:00
              </span>
              <span className="font-label-sm text-label-sm text-tertiary font-bold">
                已锁定 4 人桌
              </span>
            </div>
            <p className="font-headline-md text-headline-md text-on-surface font-semibold">
              聚宝源·传统铜锅涮肉 (望京店)
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              核销美团 4 人大学生团购餐，畅吃鲜切羊肉与传统麻酱
            </p>
          </div>
        </div>

        {/* Node 5: Ride-share Return */}
        <div className="relative group">
          <div className="absolute -left-[27px] top-0.5 w-6 h-6 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[14px]">local_taxi</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                19:45
              </span>
              <span className="font-label-sm text-label-sm text-outline font-medium">
                特惠返校
              </span>
            </div>
            <p className="font-headline-md text-headline-md text-on-surface font-semibold">
              美团打车 · 特惠快车拼车
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              全程 12km 返回北航宿舍区，4人 AA 每人仅需 ¥8.0
            </p>
          </div>
        </div>
      </div>

      {/* Low-carbon Badge */}
      <div className="mt-space-md p-space-sm bg-surface-container rounded-xl flex items-center justify-between text-on-surface-variant border border-outline-variant/10">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-tertiary">eco</span>
          <span className="font-label-sm text-label-sm font-medium">校园低碳出行指数</span>
        </div>
        <span className="font-label-md text-label-md text-on-surface font-bold">
          预计减碳 3.8kg
        </span>
      </div>
    </div>
  );
};
