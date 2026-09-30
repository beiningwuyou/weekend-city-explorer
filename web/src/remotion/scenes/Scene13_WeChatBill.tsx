import React from 'react';
import { interpolate, useCurrentFrame, spring, staticFile, Img } from 'remotion';

export const Scene13_WeChatBill: React.FC = () => {
  const frame = useCurrentFrame();

  const cardScale = spring({ frame, fps: 30, from: 0.9, to: 1 });
  const rotateAngle = interpolate(frame, [0, 90], [0, 360]);

  return (
    <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center p-14 relative overflow-hidden">
      {/* Background: W03 Squad Screen softly visible */}
      <div className="absolute inset-0 opacity-15 filter blur-sm">
        <Img
          src={staticFile('prototype-screens/w03.png')}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-5xl w-full flex flex-col gap-5 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
            <span>FINANCIAL COMPLIANCE · 合规结算与生态飞轮</span>
          </div>
          <span className="text-xs text-emerald-400 font-mono">
            微信官方群收款通道 · 零资金池合规风险
          </span>
        </div>

        {/* Bill Receipt & Ecosystem Flywheel */}
        <div
          className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-7 shadow-2xl flex items-center justify-between gap-8 backdrop-blur-xl"
          style={{ transform: `scale(${cardScale})` }}
        >
          {/* Transparent Itemized Bill */}
          <div className="flex flex-col gap-3 flex-1 bg-slate-950/80 p-5 rounded-2xl border border-white/5 font-mono">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-bold text-white text-sm">4 人出游多退少补最终账单</span>
              <span className="text-xs text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                微信群收款已发起
              </span>
            </div>

            <div className="flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>1. 猫眼/密室学生票 ×4</span>
                <span className="font-bold text-white">¥128.00</span>
              </div>
              <div className="flex justify-between">
                <span>2. 特惠快车往返车费</span>
                <span className="font-bold text-white">¥42.00</span>
              </div>
              <div className="flex justify-between">
                <span>3. 聚宝源4人铜锅特惠餐</span>
                <span className="font-bold text-white">¥148.00</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
              <span className="text-xs text-slate-400 font-sans">4人 AA 后人均：</span>
              <span className="text-3xl font-black text-emerald-400">¥79.50</span>
            </div>

            <div className="text-[11px] text-slate-400 font-sans mt-1">
              通过微信原生群收款直接分账，平台不截留资金，杜绝任何金融监管隐患。
            </div>
          </div>

          {/* Cross-Selling Ecosystem Circle */}
          <div className="flex flex-col items-center gap-3 w-80 text-center">
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Spinning circular orbit */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-400/40"
                style={{ transform: `rotate(${rotateAngle}deg)` }}
              />
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex flex-col items-center justify-center text-center p-1 shadow-lg">
                <span className="text-xs font-black text-emerald-300">SCENE</span>
                <span className="text-[10px] text-white">周末出游</span>
              </div>

              {/* BU nodes */}
              <div className="absolute top-0 px-2.5 py-0.5 rounded bg-slate-900 border border-emerald-400/50 text-[10px] text-emerald-300 font-bold">
                景区门票
              </div>
              <div className="absolute right-0 px-2.5 py-0.5 rounded bg-slate-900 border border-emerald-400/50 text-[10px] text-yellow-300 font-bold">
                美团打车
              </div>
              <div className="absolute bottom-0 px-2.5 py-0.5 rounded bg-slate-900 border border-emerald-400/50 text-[10px] text-rose-300 font-bold">
                到店餐饮
              </div>
              <div className="absolute left-0 px-2.5 py-0.5 rounded bg-slate-900 border border-emerald-400/50 text-[10px] text-cyan-300 font-bold">
                美团单车
              </div>
            </div>

            <span className="text-xs text-slate-200 font-bold mt-1">
              一次出游 · 驱动 4 大 BU 交叉销售
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
