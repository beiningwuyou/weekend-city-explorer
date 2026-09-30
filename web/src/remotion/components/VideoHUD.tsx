import React from 'react';
import { useCurrentFrame } from 'remotion';
import { SUBTITLES, SCENE_DURATION } from '../subtitles';

export const VideoHUD: React.FC = () => {
  const frame = useCurrentFrame();
  const currentSceneIndex = Math.min(
    Math.floor(frame / SCENE_DURATION),
    SUBTITLES.length - 1
  );
  const currentScene = SUBTITLES[currentSceneIndex] || SUBTITLES[0];
  const sceneProgress = (frame % SCENE_DURATION) / SCENE_DURATION;
  const totalProgress = frame / (SUBTITLES.length * SCENE_DURATION);

  const totalSeconds = Math.floor(frame / 30);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex flex-col justify-between p-8 font-sans">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-white shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-sm tracking-wide text-emerald-300">
              周末去哪玩
            </span>
            <span className="text-white/40 text-xs">|</span>
            <span className="text-white/80 text-xs font-mono">
              Meituan Ecosystem AI Agent
            </span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
            <span>{currentScene.tag}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-white/90 text-xs font-mono">
            {formattedTime} / 02:20 · Clip {currentScene.clipNumber}/14
          </div>
          <div className="px-2.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black tracking-wider">
            DEMO
          </div>
        </div>
      </div>

      {/* Bottom Subtitle and Highlights Box */}
      <div className="flex flex-col gap-3">
        {/* Banner Tag Line */}
        <div className="self-start px-4 py-1.5 rounded-lg bg-emerald-500/90 text-slate-950 font-bold text-sm tracking-wide shadow-lg">
          {currentScene.highlightText}
        </div>

        {/* Subtitle Dialogue Card */}
        <div className="w-full bg-slate-950/85 backdrop-blur-xl border border-white/15 rounded-2xl p-5 shadow-2xl flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-400 font-bold text-base">
              🎙️
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-emerald-400/90 font-semibold font-mono">
                旁白解说 (VOICE OVER) · {currentScene.title}
              </span>
              <p className="text-lg md:text-xl font-medium text-white/95 tracking-wide leading-relaxed">
                “{currentScene.voiceover}”
              </p>
            </div>
          </div>

          <div className="w-24 shrink-0 flex flex-col items-end gap-1">
            <span className="text-[10px] text-white/40 font-mono">进度</span>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-75"
                style={{ width: `${sceneProgress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Global Progress Bar at very bottom */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400"
            style={{ width: `${totalProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
