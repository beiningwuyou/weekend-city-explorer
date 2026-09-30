'use client';

import React from 'react';
import Link from 'next/link';

export const TransitHeatmapScreen: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-card-ambient border border-outline-variant/20 overflow-hidden flex flex-col">
      {/* Header bar */}
      <div className="p-space-md bg-surface-container-low border-b border-outline-variant/15 flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm">
          <div className="w-3 h-3 rounded-full bg-secondary-container animate-ping"></div>
          <div>
            <span className="font-headline-md text-headline-md text-on-surface font-bold">
              海淀 - 朝阳高校周末出游态势大屏
            </span>
            <span className="text-body-sm text-outline ml-2 text-[12px]">
              实时计算最佳接驳与排队哨兵窗口
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          <span className="px-space-sm py-1 rounded-full bg-surface-container-lowest text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-xs border border-outline-variant/15">
            <span className="material-symbols-outlined text-[14px]">directions_bike</span>
            美团单车接驳
          </span>
          <span className="px-space-sm py-1 rounded-full bg-surface-container-lowest text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-xs border border-outline-variant/15">
            <span className="material-symbols-outlined text-[14px]">local_taxi</span>
            4人特惠快车 AA
          </span>
        </div>
      </div>

      {/* Simulated Map Container */}
      <div className="relative w-full h-[380px] bg-slate-900 overflow-hidden select-none">
        {/* Map Background visual */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCe_9_z08OT7EEX4MS69waZIhUl2LRG37YDd2xwniSCsOD3CK1Cjl9zv-F-P3R8_9U-P48aUr0axmasdpC-cw4YqAcbGfGdDe4kjhbHzb3nbssqFs_MxQ9yPRglIVIun6eVyL3o6HOcvAYGdDWl2WJlGj7uYf3kLrgusVaNuZt09PQOWNEiV_1rgxrcC1CZVFLvCenVDhdKUFql3pC-_eih9r_wrto8igj70hp8LUxU0bJyx35h82Bg')",
          }}
        />
        <div className="absolute inset-0 bg-surface/35 backdrop-blur-[1px]"></div>

        {/* Node 0: Origin (Beihang University) */}
        <div className="absolute top-10 left-8 z-10">
          <div className="flex items-center gap-space-xs bg-surface-container-lowest/95 p-1.5 pr-3 rounded-full shadow-lg border border-outline-variant/30">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-label-sm shadow-xs">
              起点
            </div>
            <div>
              <div className="font-label-md text-label-md text-on-surface font-bold">
                北航学院路校区南门
              </div>
              <div className="font-label-sm text-[11px] text-outline">
                推荐美团单车接驳 1.8km
              </div>
            </div>
          </div>
          <div className="w-3 h-3 bg-primary-container mx-auto rotate-45 -mt-1 shadow-md"></div>
        </div>

        {/* Dynamic Route SVG line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="route-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#FFC300" />
              <stop offset="50%" stopColor="#FE6500" />
              <stop offset="100%" stopColor="#006C49" />
            </linearGradient>
          </defs>
          <path
            className="animate-pulse"
            d="M 90 70 Q 230 140 370 170 T 580 260"
            fill="none"
            stroke="url(#route-gradient)"
            strokeDasharray="8 6"
            strokeLinecap="round"
            strokeWidth="4"
          />
        </svg>

        {/* Node 1: 798 Contemporary Art */}
        <div className="absolute top-36 left-[50%] -translate-x-1/2 z-10">
          <div className="flex flex-col items-center">
            <div className="bg-surface-container-lowest/95 p-2 px-3 rounded-xl shadow-xl flex items-center gap-space-xs border border-secondary-container/30">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse"></span>
              <div>
                <div className="font-label-md text-label-md text-on-surface font-bold">
                  节点 1: 798 室内插画展
                </div>
                <div className="flex items-center gap-1 font-label-sm text-[11px] text-tertiary">
                  <span className="material-symbols-outlined text-[13px]">directions_subway</span>
                  <span>15号线望京直达 + 免排队学生票</span>
                </div>
              </div>
            </div>
            <div className="w-3 h-3 bg-secondary-container rotate-45 -mt-1 shadow-md"></div>
          </div>
        </div>

        {/* Node 2: Jubao Yuan Hotpot */}
        <div className="absolute bottom-10 right-8 z-10">
          <div className="flex flex-col items-end">
            <div className="bg-surface-container-lowest/95 p-2 px-3 rounded-xl shadow-xl flex items-center gap-space-xs border border-tertiary/30">
              <div className="w-8 h-8 rounded-full bg-tertiary-container/40 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">skillet</span>
              </div>
              <div>
                <div className="font-label-md text-label-md text-on-surface font-bold">
                  终点: 聚宝源铜锅涮肉 (望京店)
                </div>
                <div className="font-label-sm text-[11px] text-secondary font-semibold">
                  智能哨兵 17:15 自动远程取大桌号
                </div>
              </div>
            </div>
            <div className="w-3 h-3 bg-tertiary rotate-45 -mt-1 shadow-md mr-6"></div>
          </div>
        </div>

        {/* Map Control Buttons */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-1 bg-surface-container-lowest/90 backdrop-blur-md p-1 rounded-xl shadow-md border border-outline-variant/20">
          <button className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
          <button className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-[18px]">remove</span>
          </button>
          <Link
            href="/itinerary/custom"
            className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center transition-colors text-primary"
            title="进入 POI 动线自定义工作台"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </Link>
        </div>
      </div>

      {/* Campus live ecosystem data */}
      <div className="p-space-md grid grid-cols-1 sm:grid-cols-2 gap-space-md bg-surface-container-low border-b border-outline-variant/15">
        {/* Bike density */}
        <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-xs border border-outline-variant/10 flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">pedal_bike</span>
            </div>
            <div>
              <div className="font-headline-md text-headline-md text-on-surface font-bold">
                周边美团单车
              </div>
              <div className="font-body-sm text-[12px] text-outline">
                北航南门有 18 辆 · 798西门 34 辆
              </div>
            </div>
          </div>
          <span className="px-2 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-[11px] font-bold">
            车源充足
          </span>
        </div>

        {/* Rain shelter coffee shops */}
        <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-xs border border-outline-variant/10 flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">coffee</span>
            </div>
            <div>
              <div className="font-headline-md text-headline-md text-on-surface font-bold">
                3 家避雨备选咖啡馆
              </div>
              <div className="font-body-sm text-[12px] text-outline">
                距画廊 100m 内 · 美团可直接点单
              </div>
            </div>
          </div>
          <span className="px-2 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-[11px] font-bold">
            即时避雨
          </span>
        </div>
      </div>

      {/* Heatmap Peak Curve (14:00 - 19:00) */}
      <div className="p-space-md bg-surface-container-lowest">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[18px]">
              query_stats
            </span>
            <span className="font-headline-md text-headline-md text-on-surface font-bold">
              周六周边商圈客流预测与排队哨兵窗口
            </span>
          </div>
          <span className="font-label-sm text-[11px] text-outline">
            数据来源：美团本地生活商圈实时客流监控
          </span>
        </div>

        {/* SVG Curve */}
        <div className="relative w-full h-24 mt-space-xs">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 80">
            <defs>
              <linearGradient id="heat-area-gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#FE6500" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FE6500" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 60 Q 150 55 240 45 T 380 15 T 480 35 T 600 50 L 600 80 L 0 80 Z"
              fill="url(#heat-area-gradient)"
            />
            <path
              d="M 0 60 Q 150 55 240 45 T 380 15 T 480 35 T 600 50"
              fill="none"
              stroke="#FE6500"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <circle cx="90" cy="58" fill="#006C49" r="4" />
            <circle cx="380" cy="15" fill="#BA1A1A" r="5" className="animate-pulse" />
            <circle cx="540" cy="42" fill="#FE6500" r="4" />
          </svg>

          <div className="absolute top-0 left-[63%] -translate-x-1/2 -mt-1 bg-error-container text-on-error-container px-2 py-0.5 rounded text-[10px] font-bold shadow-xs">
            16:30 排队高峰 (约需50分)
          </div>
        </div>

        {/* Timeline x-axis */}
        <div className="flex items-center justify-between pt-space-xs font-label-sm text-label-sm text-on-surface-variant border-t border-outline-variant/10">
          <div className="flex flex-col items-center">
            <span className="font-bold text-tertiary">14:00</span>
            <span className="text-[10px] text-outline">人流平稳 / 适宜入场</span>
          </div>
          <div className="flex flex-col items-center">
            <span>15:30</span>
            <span className="text-[10px] text-outline">客流开始聚拢</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-error">16:30</span>
            <span className="text-[10px] text-error font-semibold">
              ⚠️ 哨兵 17:15 自动提前取号
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span>18:00</span>
            <span className="text-[10px] text-outline">准时入座用餐</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-on-surface">19:45</span>
            <span className="text-[10px] text-outline">特惠快车返校</span>
          </div>
        </div>
      </div>
    </div>
  );
};
