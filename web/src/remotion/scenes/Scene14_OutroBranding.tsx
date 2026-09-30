import React from 'react';
import { interpolate, useCurrentFrame, spring, staticFile, Img } from 'remotion';

export const Scene14_OutroBranding: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = spring({ frame, fps: 30, from: 0.9, to: 1 });
  const textOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/60 text-white flex items-center justify-center p-12 relative overflow-hidden">
      <div
        className="flex flex-col items-center max-w-5xl z-10 text-center gap-5"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Next.js 14 (Web 端) × Taro 4 (微信小程序端) 双端落地</span>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-black tracking-tight text-white">
            「周末去哪玩」
          </h1>
          <div className="text-2xl font-extrabold bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent mt-1">
            规划即履约 · 让每一个周末都不再被辜负
          </div>
        </div>

        {/* Dual Prototype Mockup Display */}
        <div className="flex items-center justify-center gap-6 my-2">
          {/* Web Mockup */}
          <div className="w-80 h-44 rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900 relative">
            <div className="h-5 bg-slate-950 px-2 flex items-center gap-1 border-b border-white/10">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[9px] text-slate-400 ml-2 font-mono">Web 桌面驾驶舱</span>
            </div>
            <Img
              src={staticFile('prototype-screens/w01.png')}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Miniapp Mockup */}
          <div className="w-32 h-44 rounded-2xl overflow-hidden border-2 border-emerald-400/60 shadow-2xl bg-slate-950 relative">
            <div className="h-4 bg-slate-900 flex items-center justify-center border-b border-white/10">
              <span className="text-[8px] text-emerald-400 font-mono font-bold">微信小程序端</span>
            </div>
            <Img
              src={staticFile('prototype-screens/w04.png')}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <p
          className="text-slate-300 text-sm max-w-2xl leading-relaxed"
          style={{ opacity: textOpacity }}
        >
          告别繁琐的 40 分钟搜索与 2 小时排队痛苦。
          以 Agent 的算力洞察意图，以美团的履约底座托举真实生活。
        </p>

        {/* Tech Stack Badges */}
        <div
          className="flex items-center gap-2.5 mt-1"
          style={{ opacity: textOpacity }}
        >
          <span className="px-3 py-1 rounded-lg bg-slate-900/90 border border-white/10 text-[11px] font-mono text-slate-300">
            Next.js 14 App Router
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-900/90 border border-white/10 text-[11px] font-mono text-slate-300">
            Taro 4 + React
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-900/90 border border-white/10 text-[11px] font-mono text-slate-300">
            Zustand 状态管理
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-900/90 border border-white/10 text-[11px] font-mono text-slate-300">
            ReAct Agent 架构
          </span>
          <span className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 font-bold">
            V2.1.0 稳定版
          </span>
        </div>
      </div>
    </div>
  );
};
