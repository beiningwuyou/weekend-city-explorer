import { create } from 'zustand';
import { UserProfile } from '@/types/user';
import { currentUserMock } from '@/lib/mockData/user';

interface UserState {
  user: UserProfile;
  updatePreferences: (prefs: Partial<UserProfile['preferences']>) => void;
  toggleRemoteQueueAuth: (val: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: currentUserMock,
  updatePreferences: (prefs) =>
    set((state) => ({
      user: {
        ...state.user,
        preferences: {
          ...state.user.preferences,
          ...prefs,
        },
      },
    })),
  toggleRemoteQueueAuth: (val) =>
    set((state) => ({
      user: {
        ...state.user,
        preferences: {
          ...state.user.preferences,
          autoRemoteQueueAuth: val,
        },
      },
    })),
}));
