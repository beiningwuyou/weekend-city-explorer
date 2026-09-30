import React from 'react';
import { interpolate, useCurrentFrame, spring, staticFile, Img } from 'remotion';

export const Scene07_AntiPitfall: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = spring({ frame, fps: 30, from: 0.95, to: 1.02 });
  const tipOpacity = interpolate(frame, [15, 45], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center p-14 relative overflow-hidden">
      <div className="max-w-5xl w-full flex flex-col gap-5 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono">
            <span>DATA FOUNDATION · 大众点评 20 年真实数据底座</span>
          </div>
          <span className="text-xs text-amber-400 font-mono">
            NLP 真实避坑算法抽取 · 拒绝照骗
          </span>
        </div>

        {/* Split Card: Left Real Photo + Right Extracted Review Card */}
        <div className="grid grid-cols-12 gap-6 items-stretch">
          {/* Left: Real-world Escape Room photo */}
          <div className="col-span-5 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl relative">
            <Img
              src={staticFile('demo-assets/scene07_escaperoom.jpg')}
              className="w-full h-full object-cover"
              style={{ transform: `scale(${scale})` }}
            />
            <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs text-amber-300 font-mono flex items-center gap-2">
              <span>📍 798 机械密室 · 实地勘验</span>
            </div>
          </div>

          {/* Right: POI Details & NLP Box */}
          <div className="col-span-7 bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl flex flex-col justify-between backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                  <span>🏆 2026 北京密室必玩榜</span>
                </span>
                <span className="text-amber-400 font-bold text-sm font-mono">⭐ 4.9 分 (1,842 条真实好评)</span>
              </div>

              <h2 className="text-2xl font-bold text-white mt-3">
                798 沉浸式机械推理密室
              </h2>
              <div className="text-xs text-slate-400 font-mono mt-1">
                朝阳区酒仙桥路 798 艺术区中二街 · 人均 ¥60 (学生专享 ¥32)
              </div>
            </div>

            {/* Extracted NLP Anti-pitfall review box */}
            <div
              className="my-3 p-4 rounded-2xl bg-amber-950/50 border border-amber-500/40 flex flex-col gap-1.5"
              style={{ opacity: tipOpacity }}
            >
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>NLP 真实差评萃取（1,842 条评价提炼）</span>
              </div>
              <p className="text-slate-200 text-xs italic font-serif leading-relaxed">
                “前人提醒：机关烧脑且剧情硬核，必须准时开场！建议提前 15 分钟到场听规则；现场备有免费防尘鞋套，无需额外购买。”
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10 font-mono">
              <span>✓ 差评中位数真实过滤</span>
              <span className="text-emerald-400 font-bold">100% 真实不踩雷</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
