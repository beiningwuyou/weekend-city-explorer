import { UserProfile } from '@/types/user';

export const currentUserMock: UserProfile = {
  id: 'u_beihang_lin',
  name: '北航·林同学',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
  university: '北京航空航天大学',
  college: '软件学院',
  major: '软件工程',
  grade: '大三在读本科生',
  isXuexinVerified: true,
  creditScore: 5.0,
  completedTripsCount: 6,
  totalSavedAmount: 340,
  phoneMasked: '138****6821',
  preferences: {
    budgetTier: 'moderate',
    preferredCategories: ['当代艺术展/市集', '沉浸密室/桌游', '点评必吃榜老字号'],
    preferredTransit: 'bike',
    dietaryRestrictions: ['清淡微辣', '不吃香菜'],
    avoidLongQueueWithoutRemote: true,
    avoidRainOpenAir: true,
    autoRemoteQueueAuth: true,
    notifyChannels: {
      wechatService: true,
      sms: true,
    },
  },
};
