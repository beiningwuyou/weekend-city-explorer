import { create } from 'zustand';

export type HeadcountType = 1 | 2 | 4;

interface PricingState {
  headcount: HeadcountType;
  setHeadcount: (count: HeadcountType) => void;
  // Calculate price dynamically given base single budget
  calculatePerPersonPrice: (baseSoloPrice: number) => {
    price: number;
    discountPercent: number;
    savingsBadge: string;
  };
}

export const usePricingStore = create<PricingState>((set, get) => ({
  headcount: 4, // Default to 4 people squad as in prototype
  setHeadcount: (count) => set({ headcount: count }),
  calculatePerPersonPrice: (baseSoloPrice: number) => {
    const { headcount } = get();
    if (headcount === 1) {
      return {
        price: baseSoloPrice,
        discountPercent: 0,
        savingsBadge: '全额门票与单人打车',
      };
    }
    if (headcount === 2) {
      const price = Math.round(baseSoloPrice * 0.72 * 10) / 10;
      return {
        price,
        discountPercent: 28,
        savingsBadge: '双人同行打车分摊',
      };
    }
    // 4 people squad (dormitory combo)
    const price = Math.round(baseSoloPrice * 0.416 * 10) / 10;
    return {
      price,
      discountPercent: 60,
      savingsBadge: '已触发4人团购折与拼车AA (立省60%)',
    };
  },
}));
