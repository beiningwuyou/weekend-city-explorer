import React from 'react';
import { interpolate, useCurrentFrame, spring, staticFile, Img } from 'remotion';

export const Scene02_QueuePain: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = spring({
    frame,
    fps: 30,
    from: 1.0,
    to: 1.06,
    config: { damping: 100 },
  });

  const leftX = interpolate(frame, [0, 40], [-60, 0], {
    extrapolateRight: 'clamp',
  });
  const rightX = interpolate(frame, [0, 40], [60, 0], {
    extrapolateRight: 'clamp',
  });

  const queueCount = Math.floor(
    interpolate(frame, [15, 90], [12, 98], {
      extrapolateRight: 'clamp',
    })
  );

  const waitMinutes = Math.floor(
    interpolate(frame, [15, 90], [25, 135], {
      extrapolateRight: 'clamp',
    })
  );

  return (
    <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center p-14 relative overflow-hidden">
      {/* Background Cinematic Photo: Real Hotpot Queue Crowd */}
      <div className="absolute inset-0 overflow-hidden">
        <Img
          src={staticFile('demo-assets/scene02_queue.jpg')}
          className="w-full h-full object-cover"
          style={{ transform: `scale(${scale})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/45" />
      </div>

      <div className="flex flex-col items-center max-w-5xl w-full z-10 gap-6">
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-rose-500/25 border border-rose-500/50 text-rose-300 text-xs font-bold backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>痛点 2 / 2 · 物理世界脱节与现场排号劝退</span>
        </div>

        <h1 className="text-5xl font-black tracking-tight text-center text-white drop-shadow-lg">
          传统 AI <span className="text-rose-400">无法感知物理世界</span> · 现场排队
          摧毁好心情
        </h1>

        {/* Split Comparison Cards */}
        <div className="grid grid-cols-2 gap-6 w-full mt-2">
          {/* Left: Generic LLM Chatbot Failure */}
          <div
            className="bg-slate-900/85 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-6 shadow-2xl flex flex-col justify-between"
            style={{ transform: `translateX(${leftX}px)` }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-slate-300 font-semibold text-sm">
                🤖 通用 ChatGPT 攻略方案
              </span>
              <span className="px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono text-xs font-bold">
                ⚠️ 严重幻觉
              </span>
            </div>

            <div className="my-4 flex flex-col gap-2.5 font-mono text-xs text-slate-300 bg-slate-950/70 p-4 rounded-xl border border-white/5 leading-relaxed">
              <p>“为您推荐XX老字号铜锅肉，请于周六直接前往……”</p>
              <div className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <span>❌ 物理失真：不知道周六此时排队 135 分钟！</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                无法感知下雨、无法替你买票取号，用户仍需全流程自己操心。
              </p>
            </div>

            <div className="text-xs text-rose-400/90 font-bold">
              结论：停留在空中楼阁，用户依然要自己现场硬抗。
            </div>
          </div>

          {/* Right: The Queue Ticket Nightmare */}
          <div
            className="bg-slate-900/85 backdrop-blur-xl border border-rose-500/40 rounded-2xl p-6 shadow-2xl flex flex-col justify-between"
            style={{ transform: `translateX(${rightX}px)` }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-rose-300 font-semibold text-sm">
                🎫 现场实况：排队小票 A-142
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-mono text-xs font-bold animate-pulse">
                极度痛苦
              </span>
            </div>

            <div className="my-3 flex flex-col items-center justify-center p-4 rounded-xl bg-white text-slate-900 shadow-inner font-mono text-center">
              <div className="text-xs text-slate-500 font-sans">当前叫号 A-44</div>
              <div className="text-4xl font-black text-rose-600 my-1">A-142</div>
              <div className="text-xs font-bold text-slate-800">
                您前方还有 <span className="text-rose-600 text-xl font-black">{queueCount}</span> 桌等候
              </div>
              <div className="text-[11px] text-slate-600 mt-1 bg-slate-100 px-3 py-0.5 rounded-full font-sans font-medium">
                预计等候时间：{waitMinutes} 分钟
              </div>
            </div>

            <div className="text-xs text-rose-400 font-bold text-center">
              周末黄金 2 小时耗在商场塑料凳上，体验全线崩塌！
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
