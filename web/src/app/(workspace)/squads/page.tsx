'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSquadStore } from '@/stores/useSquadStore';
import { useToastStore } from '@/components/common/Toast';
import { Modal } from '@/components/common/Modal';
import { SquadItem } from '@/types/squad';
import { useViewModeStore } from '@/stores/useViewModeStore';

const SQUAD_IMAGES: Record<string, string> = {
  'squad-089': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmsUd1KXAsN8FApfmuwPpqXNYJrrDEQ5oOvsByLYX2bvr9-0vQb-X4oE2OnJL28EwgInBqmnq5ApqwWXbmzGEcMYNdzhtRIAxYdhTBZ5ntQcWm789vr6tsPFpiIlwb4wscg5g2nG42diYnsHls7RdHxRurZXE0AG5_0pXOgQmbd8i4Q6BrUZpNaVxEeOFeWpZGnny5IfOxPuO9p0K1c26Xu0oFkoJBA6C01m81gNmpoT2j_m9XnvQj',
  'squad-092': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTaPKWPboxSiH3R5kVFZaRDhrdE5jkGNBCNFFjZLKy9H-kB-NqnU77B761iKgKFmcFz6v2G-l9vSWK3IFvXgOZdq9shaA-29Ob0zdj9nIkZtAacpg16VWDTX3tNHRc_goggI7KOoLCHAs9MT1iyN0DW8xsa639eEMlb_6uS9ABbFCIw1riJ-6ubNr8_rMTx0YLG_kIaZfKyWPRzzN_lg3f8OnkPz1FR-uYf94FtaOOakjRkNaoXOhi',
  'squad-104': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiYqAGbDmTYxivFuBw4v0vvPbXj7rTe4d1MuBR0llgcbGWqklYUNqvf9mRxvQ98JRgFOY5VpwrRm3lDpgX5pJ1hj9RanCIJE4wH7DMCQ-A6Ls_HOzDYzHHWkJPxAGxXr1Ys8t3wqhQFvVoV-l-Cz5rDxM-dNYKEGKO8-6k93HJd7fhJQCsJQpUbKFLxoOBWHFfYJiCb6TXuRx7-YtW6pYV5yJtW3-8GfKJE9s1EJwlW7oIHm0',
};

const SQUAD_TAGS: Record<string, { label: string; tag?: string }> = {
  'squad-089': { label: '艺术看展 · 舌尖必吃榜', tag: '避雨室内' },
  'squad-092': { label: 'NPC演绎 · 逻辑硬核推凶', tag: '学生特惠' },
  'squad-104': { label: '近郊轻徒步 · 农家乐补给', tag: '穷游线路' },
};

export default function SquadSquarePage() {
  const { squads, joinSquad } = useSquadStore();
  const { addToast } = useToastStore();
  const { viewMode } = useViewModeStore();
  const isMobile = viewMode === 'mobile';

  const [campusFilter, setCampusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('sat');
  const [themeFilter, setThemeFilter] = useState('全部');
  const [selectedSquad, setSelectedSquad] = useState<SquadItem | null>(null);

  const campuses = [
    { key: 'all', label: '全部高校' },
    { key: 'buaa', label: '北航学院路' },
    { key: 'bupt', label: '北邮海淀' },
    { key: 'pkuhsc', label: '北大医学部' },
    { key: 'thu', label: '清华东门' },
  ];

  const themes = ['全部', '密室剧本杀', '网红艺术展', '户外徒步', '必吃榜聚餐'];

  const filteredSquads = squads;

  const handleConfirmJoin = () => {
    if (!selectedSquad) return;
    const res = joinSquad(selectedSquad.id);
    setSelectedSquad(null);
    addToast(res.message, res.success ? 'success' : 'error');
  };

  return (
    <div className={`w-full mx-auto flex flex-col gap-3 sm:gap-4 ${isMobile ? 'max-w-full px-0' : 'max-w-[1440px] px-margin py-space-md'}`}>
      {/* Header Banner - 响应式彻底适配手机端与宽屏 */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-container via-surface-container-high to-surface-container p-4 sm:p-space-lg shadow-sm border border-outline-variant/15">
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm text-tertiary font-bold text-xs">
            <span className="material-symbols-outlined text-[15px]">verified_user</span>
            <span>学信网实名验证 · 信用履约</span>
          </div>

          <h1 className="font-bold text-xl sm:text-2xl text-on-surface leading-tight">
            寻找同校周末搭子，拒绝周末宅寝！
          </h1>

          <div className="flex items-center gap-2 pt-1">
            <div className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-surface-container-lowest/90 backdrop-blur-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">group</span>
              <div className="text-left">
                <span className="text-[11px] text-outline block leading-none">今日组队</span>
                <span className="text-sm font-bold text-on-surface leading-none mt-1 block">142 支小队</span>
              </div>
            </div>

            <Link
              href="/squads/create"
              className="flex-1 flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-on-surface text-surface-container-lowest font-bold text-sm shadow hover:bg-black transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px] text-primary-container">add</span>
              <span>+ 发起拼团</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Console */}
      <section className="flex flex-col gap-2.5 p-3 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/15">
        {/* Row 1: 高校圈子横向平滑滚动 */}
        <div className="flex items-center gap-2">
          <span className="text-outline text-xs font-bold shrink-0 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">school</span>
            高校
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {campuses.map((c) => (
              <button
                key={c.key}
                onClick={() => setCampusFilter(c.key)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  campusFilter === c.key
                    ? 'bg-primary-container text-on-primary-container shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: 时间与分类 */}
        <div className="flex items-center gap-2 pt-1 border-t border-outline-variant/10">
          <span className="text-outline text-xs font-bold shrink-0 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">category</span>
            主题
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => setThemeFilter(t)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  themeFilter === t
                    ? 'bg-inverse-surface text-surface-container-lowest'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Squad Cards Grid */}
      <section className={`grid gap-3 w-full ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-4'}`}>
        {filteredSquads.map((squad) => {
          const isFull = squad.currentMembers.length >= squad.capacity;
          const remaining = squad.capacity - squad.currentMembers.length;
          const progress = (squad.currentMembers.length / squad.capacity) * 100;
          const imgSrc = SQUAD_IMAGES[squad.id] || SQUAD_IMAGES['squad-089'];
          const tagInfo = SQUAD_TAGS[squad.id] || SQUAD_TAGS['squad-089'];

          return (
            <article
              key={squad.id}
              className="flex flex-col rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm border border-outline-variant/15 hover:shadow-md transition-all group"
            >
              {/* Hero Image Area */}
              <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-surface-container">
                <Image
                  src={imgSrc}
                  alt={squad.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Top badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-[11px] font-bold shadow-xs">
                  <span>{squad.squadNo} 精选</span>
                </div>

                {tagInfo.tag && (
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm font-label-sm text-[11px] font-bold text-tertiary">
                    {tagInfo.tag}
                  </div>
                )}

                {/* Bottom title */}
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <div className="text-[11px] text-white/80">{tagInfo.label}</div>
                  <h2 className="text-base sm:text-lg font-bold leading-snug mt-0.5 drop-shadow">{squad.title}</h2>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-4 flex flex-col gap-2.5">
                {/* Leader + Countdown */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm overflow-hidden shrink-0">
                      {squad.leader.avatar ? (
                        <Image src={squad.leader.avatar} alt={squad.leader.name} width={32} height={32} className="object-cover" />
                      ) : (
                        squad.leader.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-xs text-on-surface">{squad.leader.name}</span>
                        <span className="text-[11px] text-outline">({squad.leader.university === '北京航空航天大学' ? '北航' : '北邮'})</span>
                      </div>
                      <div className="flex items-center gap-1 text-secondary text-[11px]">
                        <span className="font-bold">{squad.leader.creditScore.toFixed(1)}★</span>
                        <span className="text-outline text-[10px]">高信誉领队</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-secondary font-bold block">{squad.countdownHours}小时后出发</span>
                  </div>
                </div>

                {/* Progress Strip */}
                <div className="p-2 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-bold ${remaining === 1 ? 'text-tertiary' : 'text-primary'}`}>
                      {remaining === 1 ? `🟢 仅剩 1 席！即将锁票` : `🟡 还差 ${remaining} 人成团 (${squad.currentMembers.length}/${squad.capacity})`}
                    </span>
                    <span className="text-outline text-[11px]">{squad.departureTime}</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${remaining === 1 ? 'bg-tertiary' : 'bg-primary'}`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                    <span>集合：北航南门</span>
                    <span className="text-tertiary font-bold">团购优惠已锁定</span>
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl font-black text-secondary">¥{squad.budgetPerPerson}</span>
                      <span className="text-xs text-outline">/人均</span>
                    </div>
                    <span className="text-[11px] text-tertiary font-bold">4人立省 {squad.savingPercent}%</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/squads/${squad.id}`}
                      className="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs"
                    >
                      详情
                    </Link>
                    <button
                      disabled={isFull}
                      onClick={() => setSelectedSquad(squad)}
                      className="px-4 py-2 rounded-xl bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-xs shadow-xs active:scale-95 disabled:opacity-40"
                    >
                      {isFull ? '已满' : '⚡ 申请上车'}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Join Modal */}
      <Modal
        isOpen={!!selectedSquad}
        onClose={() => setSelectedSquad(null)}
        title="⚡ 确认申请上车"
        description="高校周末同游自律与 AA 结算公约"
        footer={
          <>
            <button
              onClick={() => setSelectedSquad(null)}
              className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container text-xs font-bold"
            >
              取消
            </button>
            <button
              onClick={handleConfirmJoin}
              className="px-4 py-2 rounded-xl bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container text-xs font-bold shadow-xs"
            >
              确认占座
            </button>
          </>
        }
      >
        {selectedSquad && (
          <div className="flex flex-col gap-2 py-1 text-xs">
            <div className="p-2.5 bg-surface-container-low rounded-xl">
              <span className="font-bold text-on-surface block text-sm">{selectedSquad.title}</span>
              <span className="text-on-surface-variant block mt-1">出发：{selectedSquad.departureTime} · 预估人均：¥{selectedSquad.budgetPerPerson}</span>
            </div>
            <div className="p-2.5 bg-tertiary-container/20 rounded-xl text-on-surface-variant leading-relaxed">
              承诺出游实名制守约，出行费用现场 AA 均摊，如临时有变提前 12 小时在群内告知。
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
