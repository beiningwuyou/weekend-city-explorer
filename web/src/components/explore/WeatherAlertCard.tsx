'use client';

import React from 'react';

export const WeatherAlertCard: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-card-ambient border border-outline-variant/20 mb-space-lg">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-on-primary-container shrink-0">
            <span className="material-symbols-outlined text-[24px]">thermostat</span>
          </div>
          <div>
            <div className="flex items-center gap-space-xs">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                🌤️ 学院路高校圈 · 本周末天气预报
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              基于美团气象与到店动线感应，实时为您的周末出游策略护航
            </p>
          </div>
        </div>

        {/* 48H 天气三日预报胶囊组 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
          {/* 周五 */}
          <div className="flex items-center gap-space-sm px-space-md py-2 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all border border-outline-variant/10">
            <span className="material-symbols-outlined text-outline text-[22px]">
              partly_cloudy_day
            </span>
            <div>
              <div className="font-label-md text-label-md text-on-surface font-semibold">
                周五 · 傍晚夜间
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                多云 18℃ · 微风
              </div>
            </div>
          </div>

          {/* 周六 预警日 */}
          <div className="flex items-center gap-space-sm px-space-md py-2 rounded-xl bg-error-container/40 hover:bg-error-container/60 transition-all border border-error/20">
            <span
              className="material-symbols-outlined text-error text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              rainy
            </span>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-label-md text-label-md text-error font-bold">
                  周六 · 预警日
                </span>
                <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
              </div>
              <div className="font-label-sm text-label-sm text-on-error-container font-medium">
                降雨概率 65% · 15℃ ⚠️ 建议避雨室内
              </div>
            </div>
          </div>

          {/* 周日 晴朗 */}
          <div className="flex items-center gap-space-sm px-space-md py-2 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all border border-outline-variant/10">
            <span
              className="material-symbols-outlined text-secondary-container text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              wb_sunny
            </span>
            <div>
              <div className="font-label-md text-label-md text-on-surface font-semibold">
                周日 · 最佳出游
              </div>
              <div className="font-body-sm text-body-sm text-tertiary font-bold">
                晴朗 21℃ · 适宜近郊轻徒步
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
