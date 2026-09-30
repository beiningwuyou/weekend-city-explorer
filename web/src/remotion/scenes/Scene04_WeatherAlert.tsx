import React from 'react';
import { interpolate, useCurrentFrame, spring, staticFile, Img } from 'remotion';

export const Scene04_WeatherAlert: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = spring({
    frame,
    fps: 30,
    from: 1.0,
    to: 1.06,
    config: { damping: 100 },
  });

  const cardY = spring({
    frame,
    fps: 30,
    from: 50,
    to: 0,
    config: { damping: 40 },
  });

  const radarPulse = interpolate(frame % 45, [0, 45], [1, 1.8]);
  const radarOpacity = interpolate(frame % 45, [0, 45], [0.8, 0]);

  return (
    <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center p-14 relative overflow-hidden">
      {/* Background: Rainy Campus Scene */}
      <div className="absolute inset-0 overflow-hidden">
        <Img
          src={staticFile('demo-assets/scene04_rain.jpg')}
          className="w-full h-full object-cover"
          style={{ transform: `scale(${scale})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/30" />
      </div>

      <div
        className="max-w-4xl w-full flex flex-col gap-5 z-10"
        style={{ transform: `translateY(${cardY}px)` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 text-xs font-bold font-mono backdrop-blur-md">
            <span>SENSING ENGINE · 环境态势感知</span>
          </div>
          <span className="text-xs text-white/80 font-mono px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md">
            海淀学院路校区 · 周六实时监测
          </span>
        </div>

        {/* The Weather Alert Card with Glassmorphism */}
        <div className="bg-slate-900/85 backdrop-blur-xl border border-cyan-500/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-5">
              <div className="relative w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-3xl">
                <span>🌧️</span>
                <div
                  className="absolute inset-0 rounded-2xl border-2 border-cyan-400 pointer-events-none"
                  style={{
                    transform: `scale(${radarPulse})`,
                    opacity: radarOpacity,
                  }}
                />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-white">周六 14:00 局部降雨 (16℃)</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                    降水概率 75%
                  </span>
                </div>
                <p className="text-slate-300 text-sm mt-1.5">
                  Agent 已自动为您屏蔽露天骑行与水上项目，置顶【室内避雨温暖路线】。
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs">
              <span>⚡ 策略已生效</span>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">端侧数字孪生画像：</span>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-bold">
                <span>🎓 北京航空航天大学 · 大三工科</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <span>✓ 学信网认证已激活</span>
              </div>
            </div>

            <span className="text-xs text-emerald-400 font-mono font-bold">
              专享景区学生票 & 到店折上折
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
