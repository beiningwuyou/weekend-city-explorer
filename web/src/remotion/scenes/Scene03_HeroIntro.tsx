import React from 'react';
import { interpolate, useCurrentFrame, spring, staticFile, Img } from 'remotion';

export const Scene03_HeroIntro: React.FC = () => {
  const frame = useCurrentFrame();

  const mockY = spring({
    frame,
    fps: 30,
    from: 80,
    to: 0,
    config: { damping: 45 },
  });

  const glowOpacity = interpolate(frame, [0, 45, 90], [0.3, 0.7, 0.4]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 text-white flex items-center justify-center p-10 relative overflow-hidden">
      {/* Dynamic Glowing Aurora */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full bg-emerald-500/20 blur-[160px] pointer-events-none"
        style={{ opacity: glowOpacity }}
      />

      <div className="flex flex-col items-center max-w-5xl z-10 text-center gap-5 w-full">
        <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>美团生态 × 本地生活出游 AI Agent</span>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-5xl font-black tracking-tight text-white">
            「周末去哪玩」
          </h1>
          <div className="text-2xl font-extrabold bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
            规划即履约 · Planning is Execution
          </div>
        </div>

        {/* Real Prototype Mockup Showcase: W01 Explore Cockpit */}
        <div
          className="w-full max-w-4xl bg-slate-900/90 rounded-2xl p-2 border border-emerald-500/40 shadow-2xl relative overflow-hidden group"
          style={{ transform: `translateY(${mockY}px)` }}
        >
          {/* Mac Window Header Dots */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-950/80 rounded-t-xl border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-slate-400 font-mono ml-3">
              localhost:3000/explore · W01 智能决策驾驶舱原型
            </span>
          </div>

          {/* Real Screen Image */}
          <div className="w-full h-[360px] overflow-hidden rounded-b-xl relative bg-slate-950">
            <Img
              src={staticFile('prototype-screens/w01.png')}
              className="w-full h-full object-cover object-top"
            />
            {/* Subtle Gradient highlight */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
