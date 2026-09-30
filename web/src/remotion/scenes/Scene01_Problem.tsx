import React from 'react';
import { interpolate, useCurrentFrame, spring, staticFile, Img } from 'remotion';

export const Scene01_Problem: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = spring({
    frame,
    fps: 30,
    from: 1.0,
    to: 1.08,
    config: { damping: 100 },
  });

  const card1Y = interpolate(frame, [0, 45], [60, 0], {
    extrapolateRight: 'clamp',
  });
  const card2Y = interpolate(frame, [15, 60], [80, 0], {
    extrapolateRight: 'clamp',
  });
  const card3Y = interpolate(frame, [30, 75], [100, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center p-14 relative overflow-hidden">
      {/* Background Cinematic Photo with Ken Burns drift */}
      <div className="absolute inset-0 overflow-hidden">
        <Img
          src={staticFile('demo-assets/scene01_dorm.jpg')}
          className="w-full h-full object-cover"
          style={{ transform: `scale(${scale})` }}
        />
        {/* Dark Vignette Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
      </div>

      {/* Main Foreground Container */}
      <div className="flex flex-col items-center max-w-5xl z-10 text-center gap-6">
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-rose-500/25 border border-rose-500/50 text-rose-300 text-xs font-bold backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>痛点 1 / 2 · 出游现状的决策泥潭</span>
        </div>

        <h1 className="text-5xl font-black tracking-tight text-white drop-shadow-lg">
          周五晚上，<span className="text-rose-400">40 分钟</span> 搜索疲劳与信息过载
        </h1>

        {/* Floating Problem Cards with Glassmorphism */}
        <div className="grid grid-cols-3 gap-6 w-full mt-2">
          {/* Card 1 */}
          <div
            className="bg-slate-900/85 backdrop-blur-xl border border-rose-500/30 rounded-2xl p-6 shadow-2xl flex flex-col items-start gap-3 text-left"
            style={{ transform: `translateY(${card1Y}px)` }}
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-xl">
              📱
            </div>
            <div>
              <div className="text-[11px] font-mono text-rose-400 font-bold mb-1">小红书痛点</div>
              <h3 className="font-bold text-lg text-white">高 P 照骗，现场踩雷</h3>
              <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                滤镜拉满但无真实避坑提示，到了现场大呼上当，真实体验大打折扣。
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="bg-slate-900/85 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6 shadow-2xl flex flex-col items-start gap-3 text-left"
            style={{ transform: `translateY(${card2Y}px)` }}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl">
              💬
            </div>
            <div>
              <div className="text-[11px] font-mono text-amber-400 font-bold mb-1">微信约人</div>
              <h3 className="font-bold text-lg text-white">“周末去哪？都行随便”</h3>
              <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                群里聊了半天毫无结果，最后因为算账尴尬或无人牵头而遗憾流产。
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="bg-slate-900/85 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 shadow-2xl flex flex-col items-start gap-3 text-left"
            style={{ transform: `translateY(${card3Y}px)` }}
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-xl">
              🛑
            </div>
            <div>
              <div className="text-[11px] font-mono text-indigo-400 font-bold mb-1">缺乏履约</div>
              <h3 className="font-bold text-lg text-white">只造梦，不负责落地</h3>
              <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                看了攻略还要自己查交通、买门票、打电话排号，多平台辗转极度心累。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
