export type SentinelStatus =
  | 'idle'
  | 'monitoring'
  | 'triggered'
  | 'approaching'
  | 'deferred'
  | 'seated';

export interface SentinelQueueState {
  targetRestaurantName: string;
  distanceMeters: number;
  currentCalledNumber: string; // e.g. "A-16"
  myTicketNumber: string; // e.g. "A-38"
  waitingTablesCount: number;
  avgMinutesPerTable: number;
  scheduledQueueTime: string; // e.g. "17:15"
  autoDelegateEnabled: boolean;
  status: SentinelStatus;
  deferredCount: number;
  isStudentPrivilegeActive: boolean; // 过号顺延 3 桌特权
}
