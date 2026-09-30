'use client';

import React, { useState } from 'react';
import { usePricingStore, HeadcountType } from '@/stores/usePricingStore';
import { useToastStore } from '@/components/common/Toast';

export const AgentPromptConsole: React.FC = () => {
  const [prompt, setPrompt] = useState(
    '帮我们宿舍4人安排周六下午的行程，想玩动脑子的，晚餐吃铜锅肉'
  );
  const [activeTag, setActiveTag] = useState('✨ 避雨暖选');
  const [isUpdating, setIsUpdating] = useState(false);
  const { headcount, setHeadcount } = usePricingStore();
  const { addToast } = useToastStore();

  const quickTags = [
    { label: '✨ 避雨暖选', template: '优先推荐室内避雨路线，避开露天强降水，含文艺看展与热气腾腾铜锅' },
    { label: '💰 30元穷游', template: '人均严格控制在 35 元内，以绿色单车骑行、旧书市集与老北京街头小吃为主' },
    { label: '🌲 近郊徒步', template: '安排周日晴天近郊森林氧吧轻徒步，特惠快车整车 AA，品尝现烤农家菜' },
    { label: '⚡ 免排队优先', template: '自动过滤周末排队 >30 分钟商户，优先配置智能排号哨兵自动代排方案' },
  ];

  const handleTagClick = (tag: typeof quickTags[0]) => {
    setActiveTag(tag.label);
    setPrompt(tag.template);
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      addToast('AI Agent 已结合最新意图与天气为您实时重排方案！', 'success');
    }, 600);
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-card-ambient border border-outline-variant/20 flex flex-col gap-space-sm">
      {/* Console Header */}
      <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/10">
        <div className="flex items-center gap-space-xs">
          <span
            className="material-symbols-outlined text-primary-container text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            smart_toy
          </span>
          <span className="font-headline-md text-headline-md text-on-surface font-bold">
            Agent 意图微调控制台
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-label-sm text-label-sm font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
          LongCat 大模型引擎
        </span>
      </div>

      {/* Natural Language Prompt Input */}
      <div className="relative mt-space-xs">
        <div className="bg-surface-container-low rounded-xl p-space-sm focus-within:bg-surface-bright focus-within:ring-2 focus-within:ring-primary-container/60 transition-all border border-outline-variant/15">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-transparent resize-none font-body-md text-body-md text-on-surface focus:outline-none placeholder:text-outline leading-relaxed"
            rows={2}
            placeholder="输入自然诉求，如：帮宿舍4人规划周六下午避雨路线..."
          />
          <div className="flex items-center justify-between pt-space-xs mt-space-xs border-t border-outline-variant/10">
            <span className="text-outline font-label-sm text-label-sm">
              已结合海淀学院路高校圈学信网画像
            </span>
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="px-space-md py-1 bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-label-md text-label-md rounded-lg flex items-center gap-1 shadow-xs transition-all active:scale-95 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isUpdating ? 'sync' : 'auto_fix_high'}
              </span>
              <span>{isUpdating ? '重新推演中...' : '更新方案'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Tags */}
      <div>
        <div className="font-label-sm text-label-sm text-on-surface-variant mb-1 font-medium">
          常用情境快捷标签：
        </div>
        <div className="flex flex-wrap gap-1.5">
          {quickTags.map((tag) => (
            <button
              key={tag.label}
              onClick={() => handleTagClick(tag)}
              className={`px-space-sm py-1 rounded-full font-label-md text-label-md transition-all select-none ${
                activeTag === tag.label
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Headcount Lever Selector */}
      <div className="mt-space-xs pt-space-sm border-t border-outline-variant/15">
        <div className="flex items-center justify-between mb-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[18px]">
              group
            </span>
            <span className="font-label-md text-label-md text-on-surface font-bold">
              同行人数阶梯杠杆
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-secondary font-bold">
            {headcount === 4
              ? '🔥 4人成团享最大折扣 (立省60%)'
              : headcount === 2
              ? '✨ 2人搭子享双人团购立减'
              : '⚡ 单人出行学生专属立减'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1 bg-surface-container rounded-xl p-1 border border-outline-variant/10">
          <button
            onClick={() => setHeadcount(1)}
            className={`py-1.5 px-space-xs rounded-lg font-label-md text-label-md text-center transition-all select-none ${
              headcount === 1
                ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            1人 独行
          </button>
          <button
            onClick={() => setHeadcount(2)}
            className={`py-1.5 px-space-xs rounded-lg font-label-md text-label-md text-center transition-all select-none ${
              headcount === 2
                ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            2人 搭子
          </button>
          <button
            onClick={() => setHeadcount(4)}
            className={`py-1.5 px-space-xs rounded-lg font-label-md text-label-md text-center transition-all select-none flex items-center justify-center gap-1 ${
              headcount === 4
                ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
            4人 寝室成团
          </button>
        </div>

        <div className="mt-2 flex items-center gap-1 text-secondary font-label-sm text-label-sm px-1">
          <span className="material-symbols-outlined text-[15px]">local_offer</span>
          <span>
            {headcount === 4
              ? '已激活「聚宝源四人套餐 6 折」与「美团特惠打车 AA 分摊每人仅需 ¥8.0」'
              : headcount === 2
              ? '享受「798画廊双人套票 8 折」与打车半价均摊'
              : '单人享美团学生立减 ¥15 券与单车免费骑行'}
          </span>
        </div>
      </div>
    </div>
  );
};
