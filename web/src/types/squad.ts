export interface SquadMember {
  id: string;
  name: string;
  avatar: string;
  role: 'leader' | 'member';
  university: string;
  college: string;
  creditScore: number;
  isXuexinVerified: boolean;
  joinedAt: string;
  isPaidAA?: boolean;
}

export interface SquadItem {
  id: string;
  squadNo: string; // e.g. "#089"
  title: string;
  associatedPlanId: string;
  theme: string;
  leader: SquadMember;
  capacity: number; // e.g. 4
  currentMembers: SquadMember[];
  departureTime: string; // e.g. "周六 13:30"
  departureDate: string; // e.g. "2026-10-18"
  countdownHours: number;
  campusZone: string; // e.g. "北航学院路"
  budgetPerPerson: number; // e.g. 39.5
  savingPercent: number; // e.g. 60
  status: 'recruiting' | 'locked' | 'ongoing' | 'completed' | 'cancelled';
  wechatGroupQrUrl?: string;
  isQrUnlocked: boolean;
  slogan: string;
  admissionRules: {
    requireXuexin: boolean;
    minCreditScore: number;
    preferredGrade?: string;
  };
}
