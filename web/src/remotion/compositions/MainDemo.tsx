import React from 'react';
import { Series } from 'remotion';
import { SCENE_DURATION } from '../subtitles';
import { VideoHUD } from '../components/VideoHUD';

import { Scene01_Problem } from '../scenes/Scene01_Problem';
import { Scene02_QueuePain } from '../scenes/Scene02_QueuePain';
import { Scene03_HeroIntro } from '../scenes/Scene03_HeroIntro';
import { Scene04_WeatherAlert } from '../scenes/Scene04_WeatherAlert';
import { Scene05_PromptConsole } from '../scenes/Scene05_PromptConsole';
import { Scene06_GenerativeCanvas } from '../scenes/Scene06_GenerativeCanvas';
import { Scene07_AntiPitfall } from '../scenes/Scene07_AntiPitfall';
import { Scene08_QuickTicket } from '../scenes/Scene08_QuickTicket';
import { Scene09_QueueSentinel } from '../scenes/Scene09_QueueSentinel';
import { Scene10_DinnerFulfillment } from '../scenes/Scene10_DinnerFulfillment';
import { Scene11_Mobility } from '../scenes/Scene11_Mobility';
import { Scene12_FootprintStamp } from '../scenes/Scene12_FootprintStamp';
import { Scene13_WeChatBill } from '../scenes/Scene13_WeChatBill';
import { Scene14_OutroBranding } from '../scenes/Scene14_OutroBranding';

export const MainDemo: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-slate-950 font-sans select-none overflow-hidden">
      {/* 14 Sequential Scenes (300 frames each = 10s each) */}
      <Series>
        <Series.Sequence durationInFrames={SCENE_DURATION}>
          <Scene01_Problem />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATION}>
          <Scene02_QueuePain />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATION}>
          <Scene03_HeroIntro />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATION}>
          <Scene04_WeatherAlert />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATION}>
          <Scene05_PromptConsole />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATION}>
          <Scene06_GenerativeCanvas />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATION}>
          <Scene07_AntiPitfall />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATION}>
          <Scene08_QuickTicket />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATION}>
          <Scene09_QueueSentinel />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATION}>
          <Scene10_DinnerFulfillment />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATION}>
          <Scene11_Mobility />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATION}>
          <Scene12_FootprintStamp />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATION}>
          <Scene13_WeChatBill />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATION}>
          <Scene14_OutroBranding />
        </Series.Sequence>
      </Series>

      {/* Persistent Global Video HUD with Subtitles & Timecode */}
      <VideoHUD />
    </div>
  );
};
