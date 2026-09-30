'use client';

import React from 'react';
import { useViewModeStore } from '@/stores/useViewModeStore';
import { MobileExploreFlow } from '@/components/mobile/MobileExploreFlow';
import { WeatherAlertCard } from '@/components/explore/WeatherAlertCard';
import { AgentPromptConsole } from '@/components/explore/AgentPromptConsole';
import { PlanRecommendationCard } from '@/components/explore/PlanRecommendationCard';
import { TransitHeatmapScreen } from '@/components/explore/TransitHeatmapScreen';

export default function ExplorePage() {
  const { viewMode } = useViewModeStore();

  // If in desktop wide mode, render full 2-column cockpit
  if (viewMode === 'desktop') {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-margin py-space-md flex flex-col">
        {/* 顶部天气与态势看板 */}
        <WeatherAlertCard />

        {/* 工作台双栏布局 (5 cols : 7 cols 对应约 440px : 760px) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
          {/* 左侧：Agent 控制台与方案卡 */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <AgentPromptConsole />
            <PlanRecommendationCard />
          </div>

          {/* 右侧：实时出游态势与热力大屏 */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <TransitHeatmapScreen />
          </div>
        </div>
      </div>
    );
  }

  // Mini-program exploration flow
  return <MobileExploreFlow />;
}
