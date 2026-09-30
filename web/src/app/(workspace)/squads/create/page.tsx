'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSquadStore } from '@/stores/useSquadStore';
import { useUserStore } from '@/stores/useUserStore';
import { useToastStore } from '@/components/common/Toast';
import { mockItineraries } from '@/lib/mockData/itineraries';
import { useViewModeStore } from '@/stores/useViewModeStore';

function CreateSquadForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planIdParam = searchParams.get('planId');

  const { createSquad } = useSquadStore();
  const { user } = useUserStore();
  const { addToast } = useToastStore();
  const { viewMode } = useViewModeStore();
  const isMobile = viewMode === 'mobile';

  const [selectedPlanId, setSelectedPlanId] = useState(planIdParam || 'BJ-798-HOT04');
  const [capacity, setCapacity] = useState<number>(4);
  const [minCredit, setMinCredit] = useState<number>(4.8);
  const [slogan, setSlogan] = useState('拒绝周末寝室躺平！周六下午798看展+铜锅涮肉，已有2人还差2人即刻锁票！');
  const [departureDate, setDepartureDate] = useState('2026-10-18');
  const [departureTime, setDepartureTime] = useState('本周六 13:30');

  const selectedPlan = mockItineraries.find((p) => p.id === selectedPlanId) || mockItineraries[0];

  const handlePublish = () => {
    const newSquad = createSquad({
      title: selectedPlan.title.replace('【避雨精选】', '').replace('【30元极简】', '').replace('【轻户外吸氧】', ''),
      associatedPlanId: selectedPlan.id,
      theme: selectedPlan.theme,
      capacity,
      departureTime,
      departureDate,
      slogan,
      campusZone: '北航学院路',
      budgetPerPerson: capacity === 4 ? selectedPlan.budgetQuad : capacity === 2 ? selectedPlan.budgetDual : selectedPlan.baseBudgetSolo,
      savingPercent: capacity === 4 ? 60 : capacity === 2 ? 30 : 0,
      admissionRules: {
        requireXuexin: true,
        minCreditScore: minCredit,
      },
    });

    addToast('🎉 周末搭子队伍发布成功！已同步至美团搭子广场！', 'success');
    router.push(`/squads/${newSquad.id}`);
  };

  return (
    <div className={`w-full mx-auto flex flex-col gap-3 sm:gap-4 ${isMobile ? 'max-w-full px-0' : 'max-w-[1440px] px-margin py-space-md'}`}>
      {/* Top Breadcrumb Context */}
      <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/15">
        <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
          <Link href="/squads" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">group</span>
            搭子广场
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="text-on-surface font-bold">发起周末拼团</span>
        </div>
      </div>

      {/* Main Grid: Left Wizard & Right Preview */}
      <div className={`w-full gap-3 sm:gap-4 items-start ${isMobile ? 'flex flex-col' : 'grid grid-cols-1 lg:grid-cols-12'}`}>
        {/* Left Column (8 cols): Step Cards */}
        <div className={`flex flex-col gap-3 ${isMobile ? 'w-full' : 'lg:col-span-8'}`}>
          {/* STEP 1: POI & Route Strategy */}
          <article className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-card-ambient border border-outline-variant/20 flex flex-col gap-space-md">
            <header className="flex items-start justify-between pb-space-xs border-b border-outline-variant/10">
              <div className="flex items-center gap-space-sm">
                <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shadow-xs">
                  1
                </span>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    关联出游方案与核心 POI
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    采用美团精选必玩路线或自主定制
                  </p>
                </div>
              </div>

              <div className="flex p-0.5 bg-surface-container rounded-lg">
                <button className="px-space-sm py-1 rounded-md bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold shadow-xs">
                  官方方案导入
                </button>
                <Link
                  href="/itinerary/custom"
                  className="px-space-sm py-1 rounded-md text-on-surface-variant font-label-sm text-label-sm hover:text-on-surface"
                >
                  自主规划动线
                </Link>
              </div>
            </header>

            {/* Plan Card Container */}
            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col sm:flex-row gap-space-md items-start border border-outline-variant/15">
              <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={selectedPlan.coverImage}
                  alt={selectedPlan.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-secondary-container text-on-secondary rounded-full font-label-sm text-[10px] flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-[13px]">local_fire_department</span>
                  <span>大众点评必玩榜</span>
                </div>
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-space-xs mb-1">
                    <span className="px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-label-sm text-[10px] font-bold">
                      室内精选
                    </span>
                    <span className="font-label-sm text-[11px] text-outline">
                      路线编号: {selectedPlan.code}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold truncate">
                    {selectedPlan.title}
                  </h3>
                  <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">
                    {selectedPlan.highlightTip}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-outline-variant/10">
                  <span className="text-secondary font-bold text-headline-md">
                    ¥{selectedPlan.budgetQuad} /人 (4人成团立省60%)
                  </span>
                  <select
                    value={selectedPlanId}
                    onChange={(e) => setSelectedPlanId(e.target.value)}
                    className="bg-surface-container-lowest px-2 py-1 rounded-lg text-body-sm font-medium border border-outline-variant/20 focus:outline-none"
                  >
                    {mockItineraries.map((p) => (
                      <option key={p.id} value={p.id}>
                        切换：{p.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </article>

          {/* STEP 2: Capacity & AA Budget */}
          <article className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-card-ambient border border-outline-variant/20 flex flex-col gap-space-md">
            <header className="flex items-center gap-space-sm pb-space-xs border-b border-outline-variant/10">
              <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shadow-xs">
                2
              </span>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  队伍规模与 AA 拼单核算
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  匹配美团大桌团购与 4 人特惠拼车最省杠杆
                </p>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
              <div
                onClick={() => setCapacity(2)}
                className={`p-space-sm rounded-xl border cursor-pointer transition-all ${
                  capacity === 2
                    ? 'border-primary-container bg-primary-container/10 shadow-xs'
                    : 'border-outline-variant/20 bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="font-headline-md text-headline-md text-on-surface font-bold">
                  2 人搭子
                </div>
                <p className="font-body-sm text-[11px] text-on-surface-variant mt-1">
                  轻量出行 · 灵活说走就走
                </p>
                <div className="mt-2 text-secondary font-bold text-body-md">
                  ¥{selectedPlan.budgetDual} /人
                </div>
              </div>

              <div
                onClick={() => setCapacity(4)}
                className={`p-space-sm rounded-xl border cursor-pointer transition-all ${
                  capacity === 4
                    ? 'border-secondary-container bg-secondary-fixed/20 shadow-xs'
                    : 'border-outline-variant/20 bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">
                    4 人寝室团
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-secondary-container text-on-secondary text-[10px] font-bold">
                    最省推荐 🏆
                  </span>
                </div>
                <p className="font-body-sm text-[11px] text-on-surface-variant mt-1">
                  团购6折 + 特惠打车整车分摊
                </p>
                <div className="mt-2 text-secondary font-black text-headline-md">
                  ¥{selectedPlan.budgetQuad} /人 (立省60%)
                </div>
              </div>

              <div
                onClick={() => setCapacity(6)}
                className={`p-space-sm rounded-xl border cursor-pointer transition-all ${
                  capacity === 6
                    ? 'border-primary-container bg-primary-container/10 shadow-xs'
                    : 'border-outline-variant/20 bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="font-headline-md text-headline-md text-on-surface font-bold">
                  6 人聚会大团
                </div>
                <p className="font-body-sm text-[11px] text-on-surface-variant mt-1">
                  适合桌游、密室、包房包桌
                </p>
                <div className="mt-2 text-secondary font-bold text-body-md">
                  ¥{selectedPlan.budgetQuad} /人
                </div>
              </div>
            </div>
          </article>

          {/* STEP 3: Admission Rules */}
          <article className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-card-ambient border border-outline-variant/20 flex flex-col gap-space-md">
            <header className="flex items-center gap-space-sm pb-space-xs border-b border-outline-variant/10">
              <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shadow-xs">
                3
              </span>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  招募门槛与准入规则
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  学信网实名防鸽机制，保证同行校友真实履约
                </p>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="p-space-sm bg-surface-container-low rounded-xl border border-outline-variant/15 flex items-center justify-between">
                <div>
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">
                    学信网官方实名认证
                  </span>
                  <p className="font-body-sm text-[11px] text-outline">
                    仅限海淀学院路在读高校生加入
                  </p>
                </div>
                <span className="px-2 py-1 rounded bg-tertiary-container/30 text-tertiary font-label-sm text-[11px] font-bold">
                  强制开启 🛡️
                </span>
              </div>

              <div className="p-space-sm bg-surface-container-low rounded-xl border border-outline-variant/15 flex items-center justify-between">
                <div>
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">
                    最低履约信誉分
                  </span>
                  <p className="font-body-sm text-[11px] text-outline">
                    过滤近期有无故缺席记录用户
                  </p>
                </div>
                <select
                  value={minCredit}
                  onChange={(e) => setMinCredit(parseFloat(e.target.value))}
                  className="bg-surface-container-lowest px-2 py-1 rounded-lg text-body-sm font-bold border border-outline-variant/20 focus:outline-none"
                >
                  <option value={4.8}>4.8★ 以上</option>
                  <option value={4.5}>4.5★ 以上</option>
                  <option value={4.0}>4.0★ 以上</option>
                </select>
              </div>
            </div>
          </article>

          {/* STEP 4: Slogan and QR code */}
          <article className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-card-ambient border border-outline-variant/20 flex flex-col gap-space-md">
            <header className="flex items-center gap-space-sm pb-space-xs border-b border-outline-variant/10">
              <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shadow-xs">
                4
              </span>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  队伍微信群与招募口号
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  满员前处于安全高斯模糊保护，满员自动解密入群
                </p>
              </div>
            </header>

            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-label-sm text-on-surface font-bold">
                招募 Slogan (在广场大屏置顶展示)
              </label>
              <textarea
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                rows={2}
                className="w-full bg-surface-container-low p-space-sm rounded-xl text-body-sm border border-outline-variant/20 focus:outline-none focus:ring-2 focus:ring-primary-container font-medium"
              />
            </div>
          </article>
        </div>

        {/* Right Column (4 cols): Live Preview & Publish Action */}
        <div className={`flex flex-col gap-3 ${isMobile ? 'w-full' : 'lg:col-span-4'}`}>
          {/* Live Card Preview */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-card-ambient border-2 border-primary-container/40 flex flex-col gap-space-sm">
            <div className="flex items-center justify-between pb-1 border-b border-outline-variant/10">
              <span className="font-label-sm text-secondary font-bold">
                📱 广场卡片实时渲染预览
              </span>
              <span className="font-label-sm text-tertiary font-bold">
                预览中
              </span>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/10 flex flex-col gap-2">
              <span className="font-mono text-[11px] font-bold text-secondary">#NEW-001</span>
              <h4 className="font-headline-md text-headline-md text-on-surface font-bold">
                {selectedPlan.title.replace('【避雨精选】', '')}
              </h4>
              <p className="text-[12px] text-on-surface-variant line-clamp-2">
                {slogan}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10 text-on-surface">
                <span className="font-display-lg text-[20px] text-secondary font-black">
                  ¥{capacity === 4 ? selectedPlan.budgetQuad : selectedPlan.budgetDual}
                </span>
                <span className="font-label-sm text-outline">
                  1/{capacity} 席位
                </span>
              </div>
            </div>

            {/* Leader Perks */}
            <div className="p-3 bg-primary-container/20 rounded-xl border border-primary-container/30 flex items-start gap-2 text-body-sm">
              <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
                military_tech
              </span>
              <div className="text-[12px] text-on-surface">
                <span className="font-bold block">队长专属带队权益</span>
                成团履约后立得【美团外卖 ¥20 优惠券】及学信网金牌组织者认证标识！
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handlePublish}
              className="mt-2 w-full py-3 bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-headline-md text-headline-md rounded-xl shadow-md transition-all font-bold active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
              <span>立即发布至搭子广场</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateSquadPage() {
  return (
    <React.Suspense
      fallback={
        <div className="w-full max-w-[1440px] mx-auto p-12 text-center text-outline">
          正在加载组队工作台...
        </div>
      }
    >
      <CreateSquadForm />
    </React.Suspense>
  );
}
