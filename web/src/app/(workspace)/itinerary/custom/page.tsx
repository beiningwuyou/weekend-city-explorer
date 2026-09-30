'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToastStore } from '@/components/common/Toast';
import { Badge } from '@/components/common/Badge';

interface CustomNode {
  id: string;
  time: string;
  title: string;
  category: string;
  cost: number;
  duration: string;
  notes: string;
  badge?: string;
}

export default function CustomItineraryPage() {
  const { addToast } = useToastStore();
  const [theme, setTheme] = useState('室内当代艺术/文艺打卡');
  const [nodes, setNodes] = useState<CustomNode[]>([
    {
      id: 'n-1',
      time: '10:15',
      title: '798 艺术区 · 尤伦斯当代艺术中心 (UCCA)',
      category: '艺术展览',
      cost: 20,
      duration: '2.5h',
      notes: '学信网认证学生票半价直出，建议先看二层大展',
      badge: '必玩榜 TOP 3',
    },
    {
      id: 'n-2',
      time: '13:00',
      title: '聚宝源 · 传统铜锅涮肉 (望京店)',
      category: '必吃美食',
      cost: 39.5,
      duration: '1.5h',
      notes: '动线哨兵提前 40 分钟代排，享高校过号顺延 3 桌特权',
      badge: '必吃榜商户',
    },
    {
      id: 'n-3',
      time: '15:30',
      title: '留云草堂手冲咖啡馆 (798庭院店)',
      category: '休闲咖啡',
      cost: 15,
      duration: '1.5h',
      notes: '美团到店自提学生套餐立减 ¥10，适宜复盘聊天',
    },
  ]);

  const moveNode = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const copy = [...nodes];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      setNodes(copy);
      addToast('已调整节点时序，系统已重新推演交通接驳与耗时！', 'info');
    } else if (direction === 'down' && index < nodes.length - 1) {
      const copy = [...nodes];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      setNodes(copy);
      addToast('已调整节点时序，系统已重新推演交通接驳与耗时！', 'info');
    }
  };

  const handleAddSuggestedPoi = (title: string, category: string, cost: number) => {
    const newNode: CustomNode = {
      id: `n-${Date.now()}`,
      time: '17:30',
      title,
      category,
      cost,
      duration: '1.0h',
      notes: '周边高赞推荐，已结合美团优惠自动入列',
    };
    setNodes([...nodes, newNode]);
    addToast(`已成功将「${title}」加入出游动线！`, 'success');
  };

  const totalPerPerson = nodes.reduce((sum, n) => sum + n.cost, 0);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-margin py-space-md flex flex-col gap-space-lg">
      {/* Top Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md pb-space-sm border-b border-outline-variant/15">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
            <Link href="/itinerary/BJ-798-HOT04" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              履约工作台
            </Link>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="text-on-surface font-semibold">自主规划出游动线与 POI 工作台</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold mt-1">
            自主编排出游动线与 POI 工作台
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            自由拖动调序途经点，智能测距与匹配美团高校特惠、智能排号与团购权益
          </p>
        </div>

        <div className="flex items-center gap-space-sm shrink-0">
          <button
            onClick={() => addToast('AI 正在为您推演并自动补全沿途最优补给点...', 'info')}
            className="px-space-md py-2 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-xl font-label-lg text-label-lg transition-all flex items-center gap-1.5 border border-outline-variant/20 font-semibold"
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary">auto_awesome</span>
            <span>AI 智能补全</span>
          </button>
          <Link
            href="/squads/create"
            className="px-space-lg py-2 bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-headline-md text-headline-md rounded-xl shadow-md transition-all flex items-center gap-1.5 font-bold"
          >
            <span>保存并去发起拼团</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Left Editor & Right Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
        {/* Left Column: Sequence and Form */}
        <div className="lg:col-span-6 flex flex-col gap-space-md">
          {/* Card 1: Theme & Origin */}
          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-card-ambient border border-outline-variant/20 flex flex-col gap-space-sm">
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[20px]">explore</span>
              发起地与出游主题
            </h3>
            <div className="grid grid-cols-2 gap-space-sm">
              <div>
                <label className="font-label-sm text-label-sm text-outline block mb-1">
                  起点 (高校校区)
                </label>
                <input
                  type="text"
                  readOnly
                  value="北航学院路校区 (南门集合点)"
                  className="w-full bg-surface-container-low px-3 py-2 rounded-xl text-body-sm font-medium border border-outline-variant/15 text-on-surface"
                />
              </div>
              <div>
                <label className="font-label-sm text-label-sm text-outline block mb-1">
                  出游主题分类
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2 rounded-xl text-body-sm font-medium border border-outline-variant/15 text-on-surface focus:outline-none"
                >
                  <option>室内当代艺术/文艺打卡</option>
                  <option>极简预算 30元旧书骑行</option>
                  <option>近郊香山纯氧轻徒步</option>
                  <option>剧本杀沉浸实景密室</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 2: Sequence */}
          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-card-ambient border border-outline-variant/20 flex flex-col gap-space-sm">
            <div className="flex items-center justify-between pb-1 border-b border-outline-variant/10">
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[20px]">format_list_bulleted</span>
                途经节点序列 ({nodes.length} 个点 · 支持调序)
              </h3>
              <span className="font-label-sm text-[11px] text-outline">可上移/下移换序</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {nodes.map((node, index) => (
                <div
                  key={node.id}
                  className="p-space-sm bg-surface-container-low rounded-xl border border-outline-variant/15 flex items-start justify-between gap-space-sm hover:bg-surface-container transition-colors"
                >
                  <div className="flex items-start gap-space-xs">
                    <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                      {index + 1}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-label-sm text-secondary font-bold">
                          {node.time}
                        </span>
                        <span className="font-headline-md text-headline-md text-on-surface font-bold">
                          {node.title}
                        </span>
                        {node.badge && (
                          <Badge variant="must-eat">{node.badge}</Badge>
                        )}
                      </div>
                      <p className="font-body-sm text-[12px] text-on-surface-variant">
                        {node.notes}
                      </p>
                      <div className="flex items-center gap-2 mt-1 font-label-sm text-[11px] text-outline">
                        <span>停留: {node.duration}</span>
                        <span>·</span>
                        <span className="text-secondary font-semibold">人均预算: ¥{node.cost}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ordering arrows */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => moveNode(index, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded hover:bg-surface-container-high text-outline hover:text-on-surface disabled:opacity-20 transition-all"
                      title="上移"
                    >
                      <span className="material-symbols-outlined text-[16px]">expand_less</span>
                    </button>
                    <button
                      onClick={() => moveNode(index, 'down')}
                      disabled={index === nodes.length - 1}
                      className="p-1 rounded hover:bg-surface-container-high text-outline hover:text-on-surface disabled:opacity-20 transition-all"
                      title="下移"
                    >
                      <span className="material-symbols-outlined text-[16px]">expand_more</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Budget calculation */}
            <div className="mt-space-sm p-space-sm bg-surface-container-lowest rounded-xl border border-primary-container/40 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">calculate</span>
                <div>
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">
                    路线实时预算核算
                  </span>
                  <span className="text-body-sm text-outline block text-[11px]">
                    已叠加美团大学生团购折扣与 4 人拼车 AA
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-display-lg text-[24px] text-secondary font-black">
                  ¥{totalPerPerson.toFixed(1)}
                </span>
                <span className="text-[11px] text-outline block">人均 4 人成团</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Map & Nearby POI recommendations */}
        <div className="lg:col-span-6 flex flex-col gap-space-md">
          {/* Visual Route Container */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-card-ambient border border-outline-variant/20 overflow-hidden flex flex-col">
            <div className="p-space-sm bg-surface-container-low border-b border-outline-variant/15 flex items-center justify-between">
              <span className="font-headline-md text-headline-md text-on-surface font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-tertiary text-[18px]">map</span>
                交互动线与高德图层
              </span>
              <span className="font-label-sm text-[11px] text-outline">
                总里程 14.2 km · 推荐单车接驳
              </span>
            </div>

            <div className="relative w-full h-[260px] bg-slate-900 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCe_9_z08OT7EEX4MS69waZIhUl2LRG37YDd2xwniSCsOD3CK1Cjl9zv-F-P3R8_9U-P48aUr0axmasdpC-cw4YqAcbGfGdDe4kjhbHzb3nbssqFs_MxQ9yPRglIVIun6eVyL3o6HOcvAYGdDWl2WJlGj7uYf3kLrgusVaNuZt09PQOWNEiV_1rgxrcC1CZVFLvCenVDhdKUFql3pC-_eih9r_wrto8igj70hp8LUxU0bJyx35h82Bg')",
                }}
              />
              <div className="absolute inset-0 bg-surface/30 backdrop-blur-[1px]"></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="px-4 py-2 bg-on-surface/80 text-surface rounded-full text-body-sm font-semibold backdrop-blur-md shadow-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-[18px]">polyline</span>
                  <span>已连通 3 个途经打卡点 · 沿途单车充裕</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Suggested POIs */}
          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-card-ambient border border-outline-variant/20 flex flex-col gap-space-sm">
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary-container text-[20px]">add_location_alt</span>
              周边美团高校特惠 POI 快速添加
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              <div className="p-space-sm bg-surface-container-low rounded-xl border border-outline-variant/15 flex flex-col justify-between">
                <div>
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">
                    红砖美术馆
                  </span>
                  <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                    距 798 仅 3.5km，学生特惠门票 ¥30
                  </p>
                </div>
                <button
                  onClick={() => handleAddSuggestedPoi('红砖美术馆 · 园林展区', '文艺艺术', 30)}
                  className="mt-2 w-full py-1 bg-surface-container hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-sm text-label-sm rounded-lg transition-all font-semibold flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span>
                  <span>加入动线</span>
                </button>
              </div>

              <div className="p-space-sm bg-surface-container-low rounded-xl border border-outline-variant/15 flex flex-col justify-between">
                <div>
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">
                    虎头炸鸡 · 五道口店
                  </span>
                  <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                    学院路学生夜宵热榜，人均 ¥18
                  </p>
                </div>
                <button
                  onClick={() => handleAddSuggestedPoi('虎头炸鸡夜宵局', '特色小吃', 18)}
                  className="mt-2 w-full py-1 bg-surface-container hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-sm text-label-sm rounded-lg transition-all font-semibold flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span>
                  <span>加入动线</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
