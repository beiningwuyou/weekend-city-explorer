import React from 'react';
import { Composition } from 'remotion';
import { MainDemo } from './compositions/MainDemo';
import { SCENE_DURATION, SUBTITLES } from './subtitles';
import '../app/globals.css';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainDemo"
        component={MainDemo}
        durationInFrames={SUBTITLES.length * SCENE_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
