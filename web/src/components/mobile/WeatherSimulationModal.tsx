'use client';

import React from 'react';
import { useViewModeStore } from '@/stores/useViewModeStore';
import { useToastStore } from '@/components/common/Toast';

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeatherSimulationModal: React.FC<WeatherModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { simulatedWeather, setSimulatedWeather } = useViewModeStore();
  const { addToast } = useToastStore();

  if (!isOpen) return null;

  const weatherOptions = [
    {
      key: 'sunny' as const,
      label: '晴好 23℃',
      icon: '☀️',
      temperature: '23℃',
      title: '晴空万里 (23℃)',
      subtitle: '优先推荐户外轻徒步、文创市集与露天慢行',
      description: '秋高气爽，极适宜近郊轻徒步与文创市集，已为您置顶西山徒步与798展演',
    },
    {
      key: 'rainy' as const,
      label: '中雨 15℃',
      icon: '🌧️',
      temperature: '15℃',
      title: '阴雨连绵 (15℃ ⚠️ 建议室内)',
      subtitle: '自动过滤露天户外，置顶室内免淋雨文化展演与热气铜锅',
      description: '降水概率 65%，气象引擎已为您优先置顶室内 798 当代展、地坛脱口秀与聚宝源暖锅',
    },
    {
      key: 'windy' as const,
      label: '大风 16℃',
      icon: '💨',
      temperature: '16℃',
      title: '阵风降温 (16℃)',
      subtitle: '提示添衣，下调露天夜市权重，推荐室内聚餐与淘书',
      description: '阵风 5-6 级，建议选择室内保暖避风场所，下调亮马河露天夜市权重',
    },
  ];

  const handleSelect = (option: typeof weatherOptions[0]) => {
    setSimulatedWeather({
      key: option.key,
      label: option.label,
      icon: option.icon,
      temperature: option.temperature,
      description: option.description,
    });
    addToast(`已切换为${option.label}，推荐路线已更新`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-xs sm:max-w-sm rounded-3xl p-5 shadow-2xl border border-outline-variant/20 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/10">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[20px]">
              thermostat
            </span>
            <span className="font-headline-md text-headline-md text-on-surface font-bold">
              切换模拟天气
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-on-surface transition-colors"
          >
            ✕
          </button>
        </div>

        <p className="text-body-sm text-on-surface-variant leading-relaxed">
          选择天气情境，实时查看推荐路线动态调整：
        </p>

        {/* Options */}
        <div className="space-y-2.5">
          {weatherOptions.map((opt) => {
            const isSelected = simulatedWeather.key === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => handleSelect(opt)}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 active:scale-[0.98] ${
                  isSelected
                    ? 'border-primary-container bg-primary-container/10 ring-2 ring-primary-container/30'
                    : 'border-outline-variant/20 hover:border-outline-variant/50 hover:bg-surface-container-low'
                }`}
              >
                <span className="text-2xl mt-0.5 select-none">{opt.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-label-lg text-label-lg text-on-surface font-bold">
                      {opt.title}
                    </span>
                    {isSelected && (
                      <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-primary-container text-on-primary-container">
                        当前
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                    {opt.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
