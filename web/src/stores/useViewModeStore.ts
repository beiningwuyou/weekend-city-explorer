import { create } from 'zustand';

export type ViewMode = 'auto' | 'mobile' | 'desktop';

interface ViewModeState {
  viewMode: ViewMode;
  isMobileView: boolean;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
  // Weather state simulation shared across mobile & desktop
  simulatedWeather: {
    key: 'sunny' | 'rainy' | 'windy';
    label: string;
    icon: string;
    temperature: string;
    description: string;
  };
  setSimulatedWeather: (weather: ViewModeState['simulatedWeather']) => void;
}

export const useViewModeStore = create<ViewModeState>((set, get) => ({
  viewMode: 'auto',
  isMobileView: false,
  setViewMode: (mode) =>
    set({
      viewMode: mode,
      isMobileView: mode === 'mobile',
    }),
  toggleViewMode: () => {
    const current = get().viewMode;
    const next = current === 'mobile' ? 'desktop' : 'mobile';
    set({
      viewMode: next,
      isMobileView: next === 'mobile',
    });
  },
  simulatedWeather: {
    key: 'sunny',
    label: '晴好 23℃',
    icon: '☀️',
    temperature: '23℃',
    description: '秋高气爽，极适宜室外近郊轻徒步与文创市集',
  },
  setSimulatedWeather: (weather) => set({ simulatedWeather: weather }),
}));
