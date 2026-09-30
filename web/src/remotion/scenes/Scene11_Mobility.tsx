import React from 'react';
import { interpolate, useCurrentFrame, spring, staticFile, Img } from 'remotion';

export const Scene11_Mobility: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = spring({ frame, fps: 30, from: 0.95, to: 1.02 });

  return (
    <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center p-14 relative overflow-hidden">
      <div className="max-w-5xl w-full flex flex-col gap-5 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 text-xs font-bold font-mono">
            <span>MOBILITY HUB · 美团出行全流程接驳</span>
          </div>
          <span className="text-xs text-yellow-400 font-mono">
            单车 LBS + 4人特惠专车 AA 算账
          </span>
        </div>

        {/* Split: Left Street Photo + Right Dual Cards */}
        <div className="grid grid-cols-12 gap-6 items-stretch">
          {/* Left: Real-world Street Mobility Photo */}
          <div className="col-span-5 rounded-3xl overflow-hidden border border-yellow-500/30 shadow-2xl relative">
            <Img
              src={staticFile('demo-assets/scene11_mobility.jpg')}
              className="w-full h-full object-cover"
              style={{ transform: `scale(${scale})` }}
            />
            <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs text-yellow-300 font-mono flex items-center gap-2">
              <span>📍 海淀学院路 · 实时接驳网络</span>
            </div>
          </div>

          {/* Right: Dual Mobility Cards */}
          <div className="col-span-7 flex flex-col gap-4 justify-between">
            {/* Card 1: 4-person Taxi AA */}
            <div className="bg-slate-900/90 border border-yellow-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🚗</span>
                  <div>
                    <h3 className="font-bold text-base text-white">美团打车 · 特惠快车</h3>
                    <span className="text-[11px] text-yellow-400 font-mono">
                      北航南门 ⇄ 798 艺术区往返
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 text-xs font-bold">
                  整车拼车
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-xs text-slate-300">4人 AA 后每人仅需：</span>
                <span className="text-2xl font-black text-emerald-400">¥9.00 / 人</span>
              </div>
            </div>

            {/* Card 2: Shared Bike Radar */}
            <div className="bg-slate-900/90 border border-yellow-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🚲</span>
                  <div>
                    <h3 className="font-bold text-base text-white">美团单车 · LBS 智能雷达</h3>
                    <span className="text-[11px] text-yellow-400 font-mono">
                      周边 100 米可用 24 辆
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                  免押金畅骑
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-xs text-slate-300">学生认证月卡权益：</span>
                <span className="text-2xl font-black text-yellow-400">¥0 免费畅骑</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
