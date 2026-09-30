import React from 'react';
import { interpolate, useCurrentFrame, spring, staticFile, Img } from 'remotion';

export const Scene06_GenerativeCanvas: React.FC = () => {
  const frame = useCurrentFrame();

  const item1Y = spring({ frame: frame - 5, fps: 30, from: 40, to: 0 });
  const item2Y = spring({ frame: frame - 20, fps: 30, from: 40, to: 0 });
  const item3Y = spring({ frame: frame - 35, fps: 30, from: 40, to: 0 });
  const item4Y = spring({ frame: frame - 50, fps: 30, from: 40, to: 0 });

  return (
    <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center p-12 relative overflow-hidden">
      {/* Background: W02 Itinerary Screen softly blurred */}
      <div className="absolute inset-0 opacity-20 filter blur-sm">
        <Img
          src={staticFile('prototype-screens/w02.png')}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-5xl w-full flex flex-col gap-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/25 text-purple-300 border border-purple-500/40 text-xs font-bold font-mono backdrop-blur-md">
            <span>GENERATIVE UI · 动态履约画布</span>
          </div>
          <span className="text-xs text-purple-300 font-mono px-3 py-1 rounded-full bg-slate-900/80">
            W02 行程全景工作台 · 时空动线自动求解
          </span>
        </div>

        {/* Timeline Items Grid */}
        <div className="flex flex-col gap-3">
          {/* Node 1 */}
          <div
            className="bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between shadow-xl"
            style={{ transform: `translateY(${Math.max(0, item1Y)}px)` }}
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-emerald-400 font-bold text-sm bg-emerald-500/20 px-2.5 py-1 rounded-lg">
                13:45
              </span>
              <div>
                <div className="font-bold text-base text-white flex items-center gap-2">
                  <span>🚗 美团打车 · 特惠快车接驳</span>
                  <span className="text-xs text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded">
                    4人整车 AA
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  北航南门 → 798 艺术区 · 22分钟车程 · 免去雨天换乘
                </div>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="text-xs text-slate-400">人均仅</span>
              <span className="text-lg font-black text-emerald-400 ml-1">¥9</span>
            </div>
          </div>

          {/* Node 2 */}
          <div
            className="bg-slate-900/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4 flex items-center justify-between shadow-xl"
            style={{ transform: `translateY(${Math.max(0, item2Y)}px)` }}
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-purple-400 font-bold text-sm bg-purple-500/20 px-2.5 py-1 rounded-lg">
                14:30
              </span>
              <div>
                <div className="font-bold text-base text-white flex items-center gap-2">
                  <span>🎭 沉浸式机械密室 · 2026必玩榜</span>
                  <span className="text-xs text-amber-400 bg-amber-950 px-2 py-0.5 rounded">
                    ⭐ 4.9 分
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  学信网秒出学生特惠码 · 附带大众点评真实避坑提示
                </div>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="text-xs text-slate-400">学生专享</span>
              <span className="text-lg font-black text-purple-400 ml-1">¥32</span>
            </div>
          </div>

          {/* Node 3 - Queue Sentinel */}
          <div
            className="bg-slate-900/90 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-4 flex items-center justify-between shadow-xl"
            style={{ transform: `translateY(${Math.max(0, item3Y)}px)` }}
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-amber-400 font-bold text-sm bg-amber-500/20 px-2.5 py-1 rounded-lg">
                17:15
              </span>
              <div>
                <div className="font-bold text-base text-white flex items-center gap-2">
                  <span>⏰ 美团在线排号 · 智能动线哨兵</span>
                  <span className="text-xs text-rose-400 bg-rose-950 px-2 py-0.5 rounded animate-pulse">
                    杀手锏功能
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  离场前 30 分钟根据步行 600m 耗时，自动远程代排 A-28
                </div>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="text-xs text-amber-400 font-bold">免排队</span>
              <div className="text-[11px] text-slate-400">承诺到店5分钟落座</div>
            </div>
          </div>

          {/* Node 4 - Hotpot Dinner */}
          <div
            className="bg-slate-900/90 backdrop-blur-xl border border-rose-500/30 rounded-2xl p-4 flex items-center justify-between shadow-xl"
            style={{ transform: `translateY(${Math.max(0, item4Y)}px)` }}
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-rose-400 font-bold text-sm bg-rose-500/20 px-2.5 py-1 rounded-lg">
                18:00
              </span>
              <div>
                <div className="font-bold text-base text-white flex items-center gap-2">
                  <span>🍲 聚宝源老北京铜锅涮肉 · 必吃榜</span>
                  <span className="text-xs text-rose-300 bg-rose-950 px-2 py-0.5 rounded">
                    4人特惠团购
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  大众点评团购立减 ¥140 · 4人 AA 畅吃鲜切羊肉
                </div>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="text-xs text-slate-400">人均仅</span>
              <span className="text-lg font-black text-rose-400 ml-1">¥37</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
