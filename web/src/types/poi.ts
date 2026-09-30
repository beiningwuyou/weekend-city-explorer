export interface POIItem {
  id: string;
  name: string;
  category: string;
  rating: number; // e.g. 4.8
  reviewCount: number;
  dianpingBadge?: string; // e.g. "2026北京必玩榜 TOP 3", "2026北京必吃榜"
  tags: string[];
  coverImage: string;
  avgPrice: number;
  openHours: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  pitfallTips: string[]; // NLP 前人实测避坑短评
  queueInfo?: {
    supportsRemoteQueue: boolean;
    currentWaitingTables: number;
    estimatedWaitMinutes: number;
    suggestedQueueTime: string; // e.g. "17:15"
  };
  studentDiscount?: {
    originalPrice: number;
    discountedPrice: number;
    description: string;
  };
}

export interface ItineraryNode {
  id: string;
  timeSlot: string; // e.g. "14:00"
  poiId: string;
  poiName: string;
  poiCategory: string;
  durationMinutes: number;
  transitFromPrev?: {
    mode: 'bike' | 'rideshare' | 'walking' | 'subway';
    distanceKm: number;
    durationMins: number;
    costPerPerson: number;
    sharedTotalCost?: number;
  };
  actionType: 'visit' | 'dine' | 'transit' | 'break';
  notes?: string;
  voucherCode?: string;
}

export interface ItineraryPlan {
  id: string;
  code: string; // e.g. "BJ-798-HOT04"
  title: string;
  subtitle: string;
  theme: string;
  coverImage: string;
  tags: string[];
  isRainFriendly: boolean;
  baseBudgetSolo: number; // e.g. 95
  budgetDual: number; // e.g. 68
  budgetQuad: number; // e.g. 39.5
  totalDurationHours: number;
  originLocation: string;
  nodes: ItineraryNode[];
  highlightTip: string;
  category?: 'art' | 'market' | 'hike' | 'indoor' | 'night';
  tipsRed?: string;
  tipsGreen?: string;
  invitationSlogan?: string;
  hotScore?: number;
  address?: string;
  transitSummary?: string;
}
