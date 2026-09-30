import React from 'react';
import { interpolate, useCurrentFrame, spring, staticFile, Img } from 'remotion';

export const Scene09_QueueSentinel: React.FC = () => {
  const frame = useCurrentFrame();

  const phoneScale = spring({ frame, fps: 30, from: 0.9, to: 1 });
  const notifY = spring({ frame: frame - 20, fps: 30, from: -60, to: 0 });

  const radarPulse = interpolate(frame % 40, [0, 40], [1, 2]);
  const radarOpacity = interpolate(frame % 40, [0, 40], [0.8, 0]);

  return (
    <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center p-14 relative overflow-hidden">
      {/* Background: W02 Workbench softly visible */}
      <div className="absolute inset-0 opacity-15 filter blur-sm">
        <Img
          src={staticFile('prototype-screens/w02.png')}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl w-full flex flex-col gap-6 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono">
            <span>KILLER FEATURE · 美团排号哨兵引擎</span>
          </div>
          <span className="text-xs text-amber-400 font-mono">
            离场前 30 分钟无缝代取 · 彻底消灭等待
          </span>
        </div>

        {/* Sentinel Notification Dashboard */}
        <div
          className="bg-slate-900/90 border border-amber-500/40 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden backdrop-blur-xl"
          style={{ transform: `scale(${phoneScale})` }}
        >
          {/* Radar Status Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
                <span>⏰</span>
                <div
                  className="absolute inset-0 rounded-xl border border-amber-400 pointer-events-none"
                  style={{
                    transform: `scale(${radarPulse})`,
                    opacity: radarOpacity,
                  }}
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">动线哨兵已在后台就绪</h3>
                <p className="text-xs text-slate-400 font-mono">
                  监测到您正在密室游玩，距结束还剩 30 分钟 · 步行至餐厅 600 米
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-mono font-bold animate-pulse">
              17:15 自动触发排号
            </span>
          </div>

          {/* Floating Mobile Pop-up Card */}
          <div
            className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border-2 border-amber-400 rounded-2xl p-6 shadow-2xl flex items-center justify-between"
            style={{ transform: `translateY(${Math.max(0, notifY)}px)` }}
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg">
                A-28
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xl font-bold text-white">聚宝源老北京铜锅 · 自动取号成功</h4>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                    大桌 (4人)
                  </span>
                </div>
                <p className="text-sm text-amber-200 mt-1">
                  当前叫号至 A-19，预计您出馆后步行 8 分钟抵达时，排队不超过 5 分钟即可入座！
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-slate-400 font-mono">状态</span>
              <span className="text-emerald-400 text-sm font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                智能托管中
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10 font-mono">
            <span>✓ 沉浸场景双通道提醒（震动+服务号）</span>
            <span className="text-amber-400 font-bold">消灭周末 60~120 分钟漫长排队</span>
          </div>
        </div>
      </div>
    </div>
  );
};
