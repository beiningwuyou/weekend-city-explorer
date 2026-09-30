'use client';

import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { MainDemo } from '@/remotion/compositions/MainDemo';
import { SUBTITLES, SCENE_DURATION } from '@/remotion/subtitles';
import type { PlayerRef } from '@remotion/player';

// Dynamically import Player with ssr: false to prevent SSR hydration mismatch
const Player = dynamic(
  () => import('@remotion/player').then((mod) => mod.Player),
  { ssr: false }
);

export default function DemoVideoPage() {
  const playerRef = useRef<PlayerRef>(null);
  const [activeClipIndex, setActiveClipIndex] = useState(0);

  const jumpToClip = (index: number) => {
    setActiveClipIndex(index);
    if (playerRef.current) {
      playerRef.current.seekTo(index * SCENE_DURATION);
      playerRef.current.play();
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-margin py-space-md flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-card-ambient">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold border border-emerald-500/20 font-mono">
              REMOTION 4.0 · 纯前端代码生成视频
            </span>
            <span className="text-xs text-slate-400 font-mono">1080P · 30 FPS · 140s 全景</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
            产品介绍视频 Demo · 14 分镜高清实时预览
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            无需外部 AI 视频工具捏造假 UI，由真实 React 代码与 Tailwind 样式直接动态编排渲染！
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-mono flex flex-col gap-0.5 shadow-md">
            <span className="text-slate-400">终端导出高清 MP4 命令：</span>
            <span className="text-emerald-400 font-bold select-all">npm run remotion:render</span>
          </div>
        </div>
      </div>

      {/* Main Video Player Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Video Player */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 aspect-video relative group">
            <Player
              ref={playerRef}
              component={MainDemo}
              durationInFrames={SUBTITLES.length * SCENE_DURATION}
              compositionWidth={1920}
              compositionHeight={1080}
              fps={30}
              controls
              autoPlay={false}
              loop
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 px-2 font-mono">
            <span>💡 提示：点击右侧分镜可快速跳转到对应 10 秒精彩切片</span>
            <span>Remotion Root: src/remotion/Root.tsx</span>
          </div>
        </div>

        {/* Right: Chapter / 14 Cut Navigation */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-4 shadow-card-ambient flex flex-col gap-3 max-h-[640px] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/15">
            <span className="font-bold text-sm text-on-surface">14 个 10 秒短片目录 (Chapters)</span>
            <span className="text-xs text-slate-400 font-mono">共 2 分 20 秒</span>
          </div>

          <div className="flex flex-col gap-2">
            {SUBTITLES.map((sub, idx) => (
              <button
                key={sub.clipNumber}
                onClick={() => jumpToClip(idx)}
                className={`text-left p-3 rounded-xl transition-all border flex items-start gap-3 ${
                  activeClipIndex === idx
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700'
                    : 'bg-surface-container-low hover:bg-surface-container border-transparent text-on-surface'
                }`}
              >
                <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 shrink-0">
                  {sub.clipNumber}
                </span>
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate">{sub.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">
                      {Math.floor(sub.startFrame / 30)}s
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant line-clamp-1">
                    {sub.tag}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
