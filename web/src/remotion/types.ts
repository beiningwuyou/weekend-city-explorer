export interface SceneProps {
  title?: string;
  subtitle?: string;
}

export interface SubtitleItem {
  startFrame: number;
  endFrame: number;
  clipNumber: string;
  tag: string;
  title: string;
  voiceover: string;
  highlightText: string;
}
