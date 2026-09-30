import React from 'react';
import { interpolate, useCurrentFrame, spring, staticFile, Img } from 'remotion';

export const Scene08_QuickTicket: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = spring({ frame, fps: 30, from: 0.95, to: 1.02 });
  const qrGlow = interpolate(frame % 30, [0, 15, 30], [0.3, 0.9, 0.3]);

  return (
    <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center p-14 relative overflow-hidden">
      <div className="max-w-5xl w-full flex flex-col gap-5 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold font-mono">
            <span>TICKET FULFILLMENT · 美团门票与学信网直签</span>
          </div>
          <span className="text-xs text-blue-400 font-mono">
            秒出动态电子码 · 极速入闸零换票
          </span>
        </div>

        {/* Split Card: Left Turnstile Photo + Right Digital Ticket */}
        <div className="grid grid-cols-12 gap-6 items-stretch">
          {/* Left: Real-world Turnstile Scan Photo */}
          <div className="col-span-5 rounded-3xl overflow-hidden border border-blue-500/30 shadow-2xl relative">
            <Img
              src={staticFile('demo-assets/scene08_turnstile.jpg')}
              className="w-full h-full object-cover"
              style={{ transform: `scale(${scale})` }}
            />
            <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs text-emerald-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>现场实勘：闸机秒级识别入场</span>
            </div>
          </div>

          {/* Right: Digital Ticket Card */}
          <div className="col-span-7 bg-slate-900/90 border border-blue-500/30 rounded-3xl p-6 shadow-2xl flex flex-col justify-between backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/40">
                  学信网免查验电子码
                </span>
                <span className="text-xs text-emerald-400 font-mono font-bold">
                  ● 极速出票成功
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-white">
                798 机械密室特惠学生专享票
              </h2>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-300 mt-3 bg-slate-950/60 p-3 rounded-xl border border-white/5">
                <div>
                  <span className="text-slate-500">使用者：</span>
                  <span className="font-bold text-white ml-1">北航·李* (大三)</span>
                </div>
                <div>
                  <span className="text-slate-500">入闸时段：</span>
                  <span className="font-bold text-white ml-1">周六 14:30 场次</span>
                </div>
                <div>
                  <span className="text-slate-500">票面原价：</span>
                  <span className="line-through text-slate-500 ml-1">¥60.00</span>
                </div>
                <div>
                  <span className="text-slate-500">实付减免：</span>
                  <span className="text-emerald-400 font-bold ml-1">¥32 (立省 ¥28)</span>
                </div>
              </div>
            </div>

            {/* Dynamic QR code barcode display */}
            <div className="mt-3 flex items-center justify-between p-3 rounded-2xl bg-white text-slate-900 shadow-inner">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-slate-800">入闸动态防伪二维码</span>
                <span className="text-[10px] text-slate-500 font-mono">美团实名学生凭证 · 动态刷新</span>
              </div>
              <div
                className="w-12 h-12 bg-slate-900 rounded-lg p-1 flex items-center justify-center text-emerald-400 text-xl shadow"
                style={{ opacity: qrGlow }}
              >
                📱
              </div>
            </div>

            <div className="text-[11px] text-slate-400 pt-2 border-t border-white/10 font-mono">
              ✓ 免去线下窗口排队掏证件，直接出示动态电子码秒速通行。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
