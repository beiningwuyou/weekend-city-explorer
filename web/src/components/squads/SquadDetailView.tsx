'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSquadStore } from '@/stores/useSquadStore';
import { useToastStore } from '@/components/common/Toast';
import { useViewModeStore } from '@/stores/useViewModeStore';

interface SquadDetailViewProps {
  id: string;
}

export const SquadDetailView: React.FC<SquadDetailViewProps> = ({ id }) => {
  const squadId = id || 'squad-089';
  const { squads, joinSquad } = useSquadStore();
  const { addToast } = useToastStore();
  const { viewMode } = useViewModeStore();
  const isMobile = viewMode === 'mobile';

  const squad = squads.find((s) => s.id === squadId || s.squadNo === squadId) || squads[0];
  const [isCopied, setIsCopied] = useState(false);

  const isFull = squad.currentMembers.length >= squad.capacity;
  const remaining = squad.capacity - squad.currentMembers.length;

  const handleSimulateNewMember = () => {
    if (isFull) {
      addToast('队伍席位已满员', 'warning');
      return;
    }
    const res = joinSquad(squad.id);
    addToast(res.message, res.success ? 'success' : 'error');
  };

  const handleCopyInviteText = () => {
    const memberCount = squad.currentMembers.length;
    const text = `【北航搭子拼团】798艺术展+聚宝源，目前${memberCount}/${squad.capacity}人，人均¥39.5，速来扫码加入！https://meituan.com/squad/${squad.squadNo.replace('#', '')}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        addToast('邀请文案已复制到剪贴板', 'success');
      });
    } else {
      addToast('已复制邀请文案', 'success');
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={`w-full mx-auto flex flex-col gap-3 sm:gap-4 ${isMobile ? 'max-w-full px-0' : 'max-w-[1440px] px-margin py-space-md'}`}>
      {/* 顶部小队信息条 */}
      <section className="w-full bg-surface-container-lowest rounded-2xl shadow-sm p-3 sm:p-4 border border-outline-variant/15">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <Link href="/squads" className="text-outline hover:text-primary transition-colors flex items-center gap-1 text-xs">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>返回搭子广场</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${isFull ? 'bg-tertiary-container/30 text-tertiary' : 'bg-secondary-fixed text-on-secondary-fixed'}`}>
                {isFull ? '已满员' : `招募中 (${squad.currentMembers.length}/${squad.capacity})`}
              </span>
              <span className="text-xs text-outline font-mono">{squad.countdownHours}h后出发</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-lg sm:text-xl text-on-surface">{squad.title}</h1>
              <span className="px-2 py-0.5 rounded-lg bg-surface-container font-mono text-[11px] text-on-surface-variant">{squad.squadNo}</span>
            </div>
            <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[15px] text-tertiary">location_on</span>
              <span>学院路北航南门集合 · 专车出发 · 10月18日 周六 13:30</span>
            </p>
          </div>
        </div>
      </section>

      {/* 主布局两栏：移动端垂直单列，桌面端左右双栏 */}
      <div className={`w-full gap-3 sm:gap-4 items-start ${isMobile ? 'flex flex-col' : 'grid grid-cols-1 lg:grid-cols-12'}`}>
        {/* 席位与费用分析 */}
        <div className={`w-full flex flex-col gap-3 ${isMobile ? '' : 'lg:col-span-6'}`}>
          {/* 席位面板 */}
          <div className="bg-surface-container-lowest rounded-2xl p-3 sm:p-4 shadow-sm border border-outline-variant/15">
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">badge</span>
                队伍席位 ({squad.currentMembers.length}/{squad.capacity})
              </span>
              <button
                disabled={isFull}
                onClick={handleSimulateNewMember}
                className="px-2.5 py-1 bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container text-xs font-bold rounded-lg transition-all disabled:opacity-30"
              >
                + 模拟加入
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: squad.capacity }).map((_, idx) => {
                const member = squad.currentMembers[idx];
                if (member) {
                  return (
                    <div key={member.id} className="relative bg-surface-container-low rounded-xl p-2.5 flex flex-col justify-between border border-outline-variant/10">
                      <div className="flex items-center gap-2">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-primary-container shrink-0">
                          <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-xs text-on-surface truncate">{member.name}</span>
                            <span className="text-[10px] text-secondary font-bold">{member.creditScore.toFixed(1)}★</span>
                          </div>
                          <span className="text-[10px] text-on-surface-variant truncate">{member.university === '北京航空航天大学' ? '北航' : '校友'}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-outline-variant/10 text-[10px]">
                        <span className="text-tertiary font-medium">学信网实名</span>
                        {idx === 0 && (
                          <span className="px-1.5 py-0.2 rounded bg-primary-container text-on-primary-container font-bold">队长</span>
                        )}
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={`empty-${idx}`}
                    onClick={handleSimulateNewMember}
                    className="bg-surface-container-lowest rounded-xl p-2.5 flex flex-col items-center justify-center text-center border-2 border-dashed border-outline-variant/30 hover:border-primary-container transition-all cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-outline mb-1">
                      <span className="material-symbols-outlined text-[16px]">person_add</span>
                    </div>
                    <span className="text-xs font-bold text-on-surface">席位 {idx + 1} 空缺</span>
                    <span className="text-[10px] text-outline mt-0.5">点击加入</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 省钱曲线 */}
          <div className="bg-surface-container-lowest rounded-2xl p-3 sm:p-4 shadow-sm border border-outline-variant/15">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[18px]">trending_down</span>
                同行人数省钱效应
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">
                4人立减 60%
              </span>
            </div>

            <div className="w-full bg-surface-container-low rounded-xl p-2.5">
              <div className="w-full h-32 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 520 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#81765f" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#fe6500" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#006c49" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#55e4a8" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#faf8ff" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="40" y1="20" x2="480" y2="20" stroke="#dae2fd" strokeDasharray="3 3" />
                  <line x1="40" y1="65" x2="480" y2="65" stroke="#dae2fd" strokeDasharray="3 3" />
                  <line x1="40" y1="115" x2="480" y2="115" stroke="#dae2fd" strokeDasharray="3 3" />
                  <path d="M 70 25 L 260 65 L 450 115 L 450 140 L 70 140 Z" fill="url(#areaGrad)" />
                  <path d="M 70 25 L 260 65 L 450 115" stroke="url(#curveGrad)" strokeWidth="4" strokeLinecap="round" />
                  <g>
                    <circle cx="70" cy="25" r="6" className="fill-surface stroke-outline" strokeWidth="3" />
                    <rect x="35" y="4" width="70" height="18" rx="4" fill="#131b2e" />
                    <text x="70" y="17" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="#ffffff">1人 ¥95</text>
                  </g>
                  <g>
                    <circle cx="260" cy="65" r="7" fill="#fe6500" />
                    <rect x="225" y="42" width="70" height="18" rx="4" fill="#fe6500" />
                    <text x="260" y="55" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="#ffffff">2人 ¥68</text>
                  </g>
                  <g>
                    <circle cx="450" cy="115" r="8" className="fill-tertiary stroke-tertiary-container" strokeWidth="3" />
                    <rect x="405" y="90" width="90" height="20" rx="4" fill="#006c49" />
                    <text x="450" y="104" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fontWeight="700" fill="#ffffff">4人 ¥39.5</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 邀请卡片与入群区 */}
        <div className={`w-full flex flex-col gap-3 ${isMobile ? '' : 'lg:col-span-6'}`}>
          {/* 分享卡片 */}
          <div className="bg-surface-container-lowest rounded-2xl p-3 sm:p-4 shadow-sm border border-outline-variant/15">
            <span className="font-bold text-sm text-on-surface block mb-2">分享邀请卡片</span>

            <div className="w-full max-w-[320px] mx-auto bg-surface-container-low rounded-2xl shadow-sm overflow-hidden border border-outline-variant/15">
              <div className="relative w-full h-36 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWYmy7bvRb01io9zW4UmXMgI9LKs8jA-E8qP1YzYSFvnQPGL-6kEN4IVAjfGeFWxdmONFOYMclihsiRHxtFZJF_sRD4RNk2TtadpfASPGU7C3C57IdDrccQJnkJXyHs6pmCKyq9SRWnRiU59t82qG_8f-y6daOpT7EifmA1jivKn_MC1LLBxKsinCsWAo7nk34aoRW_5vSOQRhm__FtqwkH9itggctjzckRdKNyUC4d3CJPWTC2bTG')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-2.5 left-2.5 bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full text-[10px] font-bold">
                  北航搭子拼团
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h3 className="font-bold text-sm leading-tight">{squad.title}</h3>
                </div>
              </div>

              <div className="p-3 flex flex-col gap-2 bg-surface-container-lowest">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-on-surface">进度: {squad.currentMembers.length}/{squad.capacity}人</span>
                  <span className="text-secondary font-bold text-[11px] bg-secondary-fixed/50 px-2 py-0.5 rounded">
                    还差 {remaining} 人锁票
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-tertiary-container/20 flex items-center justify-between">
                  <span className="text-xs text-tertiary font-bold">4人成团价</span>
                  <span className="text-lg font-bold text-tertiary">人均 ¥39.5</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                onClick={() => addToast('卡片已保存至相册', 'success')}
                className="py-2 bg-surface-container text-on-surface rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-surface-container-high transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>导出卡片</span>
              </button>
              <button
                onClick={handleCopyInviteText}
                className="py-2 bg-primary-container text-on-primary-container rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:brightness-95 transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
                <span>{isCopied ? '已复制！' : '复制邀请'}</span>
              </button>
            </div>
          </div>

          {/* 交流群码区 */}
          <div className="bg-surface-container-lowest rounded-2xl p-3 sm:p-4 shadow-sm border border-outline-variant/15">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-on-surface">队伍交流群</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${isFull ? 'bg-tertiary-container/30 text-tertiary' : 'bg-secondary-fixed text-on-secondary-fixed'}`}>
                {isFull ? '已解锁' : '满员自动解锁'}
              </span>
            </div>

            <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-3">
              <div className="w-20 h-20 rounded-xl bg-white p-1 flex items-center justify-center border border-outline-variant/20 shrink-0">
                {isFull ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white rounded text-[10px] text-center">
                    <span>微信群码</span>
                    <span className="text-[9px] text-gray-400">扫码入群</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="material-symbols-outlined text-[22px] text-secondary">lock</span>
                    <span className="text-[10px] font-bold text-on-surface mt-0.5">满员解锁</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-0.5 text-xs">
                <span className="font-bold text-on-surface">
                  {isFull ? '群二维码已解锁' : `队伍还差 ${remaining} 个空位`}
                </span>
                <span className="text-on-surface-variant text-[11px] leading-relaxed">
                  {isFull ? '请扫码进群确认集合细节' : '第 4 位队员扫码加入后立即显示群二维码。'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
