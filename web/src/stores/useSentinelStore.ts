import { create } from 'zustand';
import { SentinelQueueState } from '@/types/sentinel';

interface SentinelStoreState {
  sentinel: SentinelQueueState;
  toggleAutoDelegate: () => void;
  triggerManualQueue: () => void;
  deferQueueThirtyMinutes: () => void;
  resetSentinel: () => void;
}

const initialSentinel: SentinelQueueState = {
  targetRestaurantName: '聚宝源·传统铜锅涮肉 (望京店)',
  distanceMeters: 600,
  currentCalledNumber: 'A-16',
  myTicketNumber: 'A-38',
  waitingTablesCount: 22,
  avgMinutesPerTable: 2,
  scheduledQueueTime: '17:15',
  autoDelegateEnabled: true,
  status: 'monitoring',
  deferredCount: 0,
  isStudentPrivilegeActive: true,
};

export const useSentinelStore = create<SentinelStoreState>((set) => ({
  sentinel: initialSentinel,
  toggleAutoDelegate: () =>
    set((state) => ({
      sentinel: {
        ...state.sentinel,
        autoDelegateEnabled: !state.sentinel.autoDelegateEnabled,
      },
    })),
  triggerManualQueue: () =>
    set((state) => ({
      sentinel: {
        ...state.sentinel,
        status: 'triggered',
        myTicketNumber: 'A-39',
        waitingTablesCount: 23,
      },
    })),
  deferQueueThirtyMinutes: () =>
    set((state) => {
      // Defer queue time by 30 mins, e.g. 17:15 -> 17:45
      return {
        sentinel: {
          ...state.sentinel,
          scheduledQueueTime: '17:45',
          status: 'deferred',
          deferredCount: state.sentinel.deferredCount + 1,
        },
      };
    }),
  resetSentinel: () => set({ sentinel: initialSentinel }),
}));
