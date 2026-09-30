'use client';

import React, { useState } from 'react';
import { useViewModeStore } from '@/stores/useViewModeStore';
import { WeatherSimulationModal } from '@/components/mobile/WeatherSimulationModal';
import { ProfileDrawer } from '@/components/mobile/ProfileDrawer';

export const MobileHeader: React.FC = () => {
  const { simulatedWeather, toggleViewMode, viewMode } = useViewModeStore();
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState('beijing');

  return (
    <>
      <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-outline-variant/15 px-3.5 py-2.5 shadow-xs">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          {/* 高校园区选择 */}
          <div className="flex items-center gap-1.5 bg-primary-container/20 px-2.5 py-1 rounded-full border border-primary-container/40">
            <span className="material-symbols-outlined text-primary text-[15px]">
              location_on
            </span>
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="bg-transparent border-none outline-none font-bold text-on-surface text-[12px] cursor-pointer"
            >
              <option value="beijing">北京 · 海淀大学城</option>
              <option value="shanghai">上海 · 杨浦高校区</option>
              <option value="wuhan">武汉 · 光谷大学城</option>
              <option value="guangzhou">广州 · 大学城校区</option>
              <option value="chengdu">成都 · 温江高教园</option>
            </select>
          </div>

          {/* 右侧：天气模拟感知 + 个人抽屉 + 视窗切换 */}
          <div className="flex items-center gap-1.5">
            {/* 天气模拟药丸 */}
            <button
              onClick={() => setIsWeatherModalOpen(true)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border active:scale-95 ${
                simulatedWeather.key === 'rainy'
                  ? 'bg-error-container/40 text-error border-error/30'
                  : 'bg-surface-container text-on-surface border-outline-variant/20 hover:bg-surface-container-high'
              }`}
              title="点击模拟天气情境"
            >
              <span>{simulatedWeather.icon}</span>
              <span>{simulatedWeather.label}</span>
              <span className="material-symbols-outlined text-[13px] text-outline">
                tune
              </span>
            </button>

            {/* 个人身份头像 (点击呼出抽屉) */}
            <button
              onClick={() => setIsProfileDrawerOpen(true)}
              className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-black text-xs shadow-xs active:scale-95 transition-transform"
              title="学信网认证名片"
            >
              🎓
            </button>

            {/* 桌面端切换全屏/机壳开关 (仅桌面端大屏时显现或有提示) */}
            <button
              onClick={toggleViewMode}
              className="hidden lg:flex w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant items-center justify-center transition-colors"
              title={viewMode === 'mobile' ? '切换回桌面全宽工作台' : '切换为小程序机壳模式'}
            >
              <span className="material-symbols-outlined text-[15px]">
                {viewMode === 'mobile' ? 'desktop_windows' : 'stay_current_portrait'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 弹窗与抽屉 */}
      <WeatherSimulationModal
        isOpen={isWeatherModalOpen}
        onClose={() => setIsWeatherModalOpen(false)}
      />
      <ProfileDrawer
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
      />
    </>
  );
};
