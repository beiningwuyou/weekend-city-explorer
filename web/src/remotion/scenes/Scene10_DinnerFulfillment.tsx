import React from 'react';
import { interpolate, useCurrentFrame, spring, staticFile, Img } from 'remotion';

export const Scene10_DinnerFulfillment: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = spring({ frame, fps: 30, from: 0.95, to: 1.02 });

  return (
    <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center p-14 relative overflow-hidden">
      <div className="max-w-5xl w-full flex flex-col gap-5 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold font-mono">
            <span>DINNER FULFILLMENT · 到店极速落座</span>
          </div>
          <span className="text-xs text-rose-400 font-mono">
            18:00 准时落座开吃 · 体验绝杀优势
          </span>
        </div>

        {/* Split Card: Left Hotpot Photo + Right Fulfillment Status */}
        <div className="grid grid-cols-12 gap-6 items-stretch">
          {/* Left: Real-world Hotpot Photo */}
          <div className="col-span-5 rounded-3xl overflow-hidden border border-rose-500/30 shadow-2xl relative">
            <Img
              src={staticFile('demo-assets/scene10_hotpot.jpg')}
              className="w-full h-full object-cover"
              style={{ transform: `scale(${scale})` }}
            />
            <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs text-emerald-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>现场实勘：叫号 A-28 即刻入席</span>
            </div>
          </div>

          {/* Right: Fulfillment Success Card */}
          <div className="col-span-7 bg-slate-900/90 border border-rose-500/30 rounded-3xl p-6 shadow-2xl flex flex-col justify-between backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-500/30">
                  大众点评必吃榜 · 老字号铜锅
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs">
                  等候仅 3 分钟！
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white mt-3">
                聚宝源老北京铜锅涮肉 (必吃榜商户)
              </h2>
              <p className="text-slate-300 text-xs mt-1">
                到店语音播报：“<span className="text-emerald-400 font-bold">请 A-28 号顾客就座用餐</span>”
              </p>
            </div>

            {/* Stats Contrast */}
            <div className="grid grid-cols-2 gap-4 bg-slate-950/70 p-4 rounded-2xl border border-white/5 my-2">
              <div className="flex flex-col gap-0.5 border-r border-white/10 pr-3">
                <span className="text-[11px] text-slate-400 font-mono">传统现场排队</span>
                <div className="text-xl font-black text-rose-500">等候 135 分钟</div>
                <div className="text-[10px] text-slate-400">饥肠辘辘、消耗好心情</div>
              </div>

              <div className="flex flex-col gap-0.5 pl-2">
                <span className="text-[11px] text-emerald-400 font-mono font-bold">动线哨兵履约</span>
                <div className="text-xl font-black text-emerald-400">到店直接落座</div>
                <div className="text-[10px] text-slate-300">
                  4人团购立减 ¥140 (人均仅 ¥37)
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10 font-mono">
              <span>✓ 炭火正旺，鲜切羊肉即上</span>
              <span className="text-emerald-400 font-bold">体验净收益评分 +55 分（绝杀优势）</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
