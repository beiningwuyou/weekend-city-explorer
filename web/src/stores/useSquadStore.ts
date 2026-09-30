import { create } from 'zustand';
import { SquadItem, SquadMember } from '@/types/squad';
import { mockSquads } from '@/lib/mockData/squads';
import { currentUserMock } from '@/lib/mockData/user';

interface SquadState {
  squads: SquadItem[];
  currentSquad: SquadItem | null;
  setCurrentSquadId: (id: string) => void;
  joinSquad: (squadId: string) => { success: boolean; isNowFull: boolean; message: string };
  createSquad: (newSquad: Partial<SquadItem>) => SquadItem;
  unlockQrCode: (squadId: string) => void;
}

export const useSquadStore = create<SquadState>((set, get) => ({
  squads: mockSquads,
  currentSquad: mockSquads[0],
  setCurrentSquadId: (id: string) => {
    const found = get().squads.find((s) => s.id === id || s.squadNo === id);
    if (found) {
      set({ currentSquad: found });
    }
  },
  joinSquad: (squadId: string) => {
    const state = get();
    const squadIndex = state.squads.findIndex((s) => s.id === squadId || s.squadNo === squadId);
    if (squadIndex === -1) {
      return { success: false, isNowFull: false, message: '队伍不存在' };
    }

    const squad = state.squads[squadIndex];
    if (squad.currentMembers.some((m) => m.id === currentUserMock.id)) {
      return { success: true, isNowFull: squad.currentMembers.length >= squad.capacity, message: '您已在队伍中' };
    }

    if (squad.currentMembers.length >= squad.capacity) {
      return { success: false, isNowFull: true, message: '队伍席位已满员' };
    }

    const newMember: SquadMember = {
      id: currentUserMock.id,
      name: currentUserMock.name,
      avatar: currentUserMock.avatar,
      role: 'member',
      university: currentUserMock.university,
      college: currentUserMock.college,
      creditScore: currentUserMock.creditScore,
      isXuexinVerified: currentUserMock.isXuexinVerified,
      joinedAt: '刚刚',
      isPaidAA: false,
    };

    const updatedMembers = [...squad.currentMembers, newMember];
    const isNowFull = updatedMembers.length >= squad.capacity;
    const updatedSquad: SquadItem = {
      ...squad,
      currentMembers: updatedMembers,
      status: isNowFull ? 'locked' : 'recruiting',
      isQrUnlocked: isNowFull ? true : squad.isQrUnlocked,
    };

    const newSquads = [...state.squads];
    newSquads[squadIndex] = updatedSquad;

    set({
      squads: newSquads,
      currentSquad: updatedSquad,
    });

    return {
      success: true,
      isNowFull,
      message: isNowFull ? '拼团成功！队伍已满员，微信群二维码已动态解锁！' : '申请成功！已成功占座，等待校友集结！',
    };
  },
  createSquad: (newSquadData) => {
    const state = get();
    const newId = `squad-${Math.floor(100 + Math.random() * 900)}`;
    const newSquadNo = `#${Math.floor(100 + Math.random() * 900)}`;

    const fullSquad: SquadItem = {
      id: newId,
      squadNo: newSquadNo,
      title: newSquadData.title || '周末探索先锋队',
      associatedPlanId: newSquadData.associatedPlanId || 'BJ-798-HOT04',
      theme: newSquadData.theme || '艺术看展 · 必吃铜锅',
      leader: {
        id: currentUserMock.id,
        name: currentUserMock.name,
        avatar: currentUserMock.avatar,
        role: 'leader',
        university: currentUserMock.university,
        college: currentUserMock.college,
        creditScore: currentUserMock.creditScore,
        isXuexinVerified: currentUserMock.isXuexinVerified,
        joinedAt: '刚刚',
        isPaidAA: true,
      },
      capacity: newSquadData.capacity || 4,
      currentMembers: [
        {
          id: currentUserMock.id,
          name: `${currentUserMock.name} (队长)`,
          avatar: currentUserMock.avatar,
          role: 'leader',
          university: currentUserMock.university,
          college: currentUserMock.college,
          creditScore: currentUserMock.creditScore,
          isXuexinVerified: currentUserMock.isXuexinVerified,
          joinedAt: '刚刚',
          isPaidAA: true,
        },
      ],
      departureTime: newSquadData.departureTime || '本周六 13:30',
      departureDate: newSquadData.departureDate || '2026-10-18',
      countdownHours: 16,
      campusZone: newSquadData.campusZone || '北航学院路',
      budgetPerPerson: newSquadData.budgetPerPerson || 39.5,
      savingPercent: newSquadData.savingPercent || 60,
      status: 'recruiting',
      wechatGroupQrUrl:
        'https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=300&q=80',
      isQrUnlocked: false,
      slogan: newSquadData.slogan || '寻找同校周末搭子，拒绝宅寝！',
      admissionRules: newSquadData.admissionRules || {
        requireXuexin: true,
        minCreditScore: 4.8,
      },
    };

    set({
      squads: [fullSquad, ...state.squads],
      currentSquad: fullSquad,
    });

    return fullSquad;
  },
  unlockQrCode: (squadId: string) => {
    set((state) => ({
      squads: state.squads.map((s) =>
        s.id === squadId ? { ...s, isQrUnlocked: true } : s
      ),
      currentSquad:
        state.currentSquad?.id === squadId
          ? { ...state.currentSquad, isQrUnlocked: true }
          : state.currentSquad,
    }));
  },
}));
