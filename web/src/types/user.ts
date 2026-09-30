export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  university: string;
  college: string;
  major: string;
  grade: string;
  isXuexinVerified: boolean;
  creditScore: number; // e.g. 5.0
  completedTripsCount: number;
  totalSavedAmount: number;
  phoneMasked: string;
  preferences: {
    budgetTier: 'budget' | 'moderate' | 'comfort'; // 穷游 <=35, 经济 35-60, 品质 60-120
    preferredCategories: string[]; // 沉浸密室/桌游, 当代艺术展/市集, 极限户外徒步, 点评必吃榜老字号
    preferredTransit: 'bike' | 'rideshare' | 'subway';
    dietaryRestrictions: string[]; // 清淡微辣, 不吃香菜, 素食主义
    avoidLongQueueWithoutRemote: boolean; // 过滤现场排队>30分钟且不支持远程排号商户
    avoidRainOpenAir: boolean; // 遇雨天屏蔽露天活动
    autoRemoteQueueAuth: boolean; // 智能排号代排授权
    notifyChannels: {
      wechatService: boolean;
      sms: boolean;
    };
  };
}
