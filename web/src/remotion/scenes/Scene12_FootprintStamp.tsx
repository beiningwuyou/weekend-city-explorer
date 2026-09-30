import React from 'react';
import { interpolate, useCurrentFrame, spring, staticFile, Img } from 'remotion';

export const Scene12_FootprintStamp: React.FC = () => {
  const frame = useCurrentFrame();

  const stampScale = spring({ frame: frame - 20, fps: 30, from: 2.5, to: 1, config: { damping: 15 } });
  const stampOpacity = interpolate(frame, [20, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center p-14 relative overflow-hidden">
      <div className="max-w-5xl w-full flex flex-col gap-5 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 text-xs font-bold font-mono">
            <span>UGC FLYWHEEL · 数字足迹与点评反哺</span>
          </div>
          <span className="text-xs text-pink-400 font-mono">
            W04 足迹手账 · 双向数据资产回流
          </span>
        </div>

        {/* Footprint Card */}
        <div className="bg-slate-900/90 border border-pink-500/30 rounded-3xl p-6 shadow-2xl flex items-center justify-between gap-8 relative overflow-hidden backdrop-blur-xl">
          {/* Left: Real W04 Prototype Screenshot with Watermark Stamp */}
          <div className="relative w-80 h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950">
            <Img
              src={staticFile('prototype-screens/w04.png')}
              className="w-full h-full object-cover object-top"
            />

            {/* Official Digital Watermark Stamp */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                transform: `scale(${stampScale}) rotate(-14deg)`,
                opacity: stampOpacity,
              }}
            >
              <div className="w-44 h-44 rounded-full border-4 border-dashed border-rose-500 bg-rose-500/20 flex flex-col items-center justify-center text-center p-2 text-rose-300 font-black tracking-widest shadow-2xl backdrop-blur-md">
                <span className="text-[10px] uppercase font-mono">MEITUAN OFFICIAL</span>
                <span className="text-lg my-1">美团官方实勘</span>
                <span className="text-[9px] font-mono">VERIFIED EXPLORER</span>
              </div>
            </div>
          </div>

          {/* Right: Review Sync & Coupon Reward */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/40">
                一键反哺大众点评笔记
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold">
                ● 真实 UGC 内容飞轮
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white">
              沉淀真实出游资产，形成良性供给闭环
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              行程结束，Agent 自动根据打卡点与避坑实测，一键生成结构化探店笔记。不仅帮助更多校友决策，用户还将获得美团专属无门槛神券！
            </p>

            <div className="p-4 rounded-xl bg-pink-950/40 border border-pink-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎟️</span>
                <div>
                  <div className="text-xs font-bold text-white">大众点评发帖激励</div>
                  <div className="text-[11px] text-pink-300">美团全场通用 ¥10 现金神券已自动入账</div>
                </div>
              </div>
              <span className="text-xs bg-pink-500 text-slate-950 font-bold px-3 py-1 rounded-lg">
                已领取
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
