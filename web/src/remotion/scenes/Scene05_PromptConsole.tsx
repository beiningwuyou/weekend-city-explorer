import React from 'react';
import { interpolate, useCurrentFrame, spring } from 'remotion';

export const Scene05_PromptConsole: React.FC = () => {
  const frame = useCurrentFrame();

  const fullText = '帮我们宿舍4人安排周六下午的行程，想玩动脑子的，晚餐吃铜锅肉';
  const charCount = Math.min(
    Math.floor(interpolate(frame, [10, 75], [0, fullText.length])),
    fullText.length
  );
  const displayedText = fullText.slice(0, charCount);

  // Headcount slider moves from 1 to 4 between frame 75 and 130
  const headcountProgress = interpolate(frame, [75, 130], [1, 4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const currentHeadcount = Math.round(headcountProgress);

  // Price changes from 98 to 42.5
  const currentPrice = interpolate(frame, [75, 130], [98, 42.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }).toFixed(1);

  return (
    <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center p-14 relative overflow-hidden">
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

      <div className="max-w-4xl w-full flex flex-col gap-5 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
            <span>INTENT ENGINE · 意图微调控制台</span>
          </div>
          <span className="text-xs text-emerald-400 font-mono">
            LongCat 大模型实时意图求解
          </span>
        </div>

        {/* Real Console UI Card */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 backdrop-blur-xl">
          {/* Prompt Input Box */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-slate-400">自然语言出行意图：</span>
            <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 font-mono text-base text-emerald-300 min-h-[64px] flex items-center shadow-inner">
              <span>{displayedText}</span>
              <span className="w-2 h-5 bg-emerald-400 ml-1 animate-pulse" />
            </div>
          </div>

          {/* Quick Tags */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">快捷调优：</span>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              ✨ 避雨暖选
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs">
              💰 30元穷游
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs">
              ⚡ 免排队优先
            </span>
          </div>

          {/* Headcount Slider & Real-time Dynamic Pricing */}
          <div className="mt-2 pt-6 border-t border-white/10 flex items-center justify-between bg-slate-950/70 p-5 rounded-2xl border border-white/5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-white">同行人数杠杆：</span>
                <span className="px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-sm">
                  {currentHeadcount} 人同行
                </span>
              </div>
              <div className="text-xs text-slate-400">
                {currentHeadcount === 1
                  ? '单人独行放空态 · 单人咖啡与门票'
                  : '寝室 4 人拼团态 · 整车打车 AA + 必吃榜 4 人特惠餐'}
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-400 font-mono">预估人均花费</span>
              <div className="flex items-baseline gap-1 text-emerald-400 font-black text-4xl">
                <span>¥</span>
                <span>{currentPrice}</span>
                {currentHeadcount === 4 && (
                  <span className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-md ml-2 font-sans font-bold animate-bounce">
                    立省 60%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
