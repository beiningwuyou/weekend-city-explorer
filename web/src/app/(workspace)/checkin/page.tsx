'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { useToastStore } from '@/components/common/Toast';
import { Modal } from '@/components/common/Modal';
import { useViewModeStore } from '@/stores/useViewModeStore';

export default function CheckinPage() {
  const { addToast } = useToastStore();
  const { viewMode } = useViewModeStore();
  const isMobile = viewMode === 'mobile';

  const [posterStyle, setPosterStyle] = useState<'polaroid' | 'stamp' | 'minimal'>('polaroid');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [ugcText, setUgcText] = useState(
    '插画展比预期更好看！强烈推荐二层小众展区。避坑提醒：门口别租导览器，扫码有免费音频讲解；旁边洗手间人少不用排队。'
  );

  const maxChars = 140;

  const handleSyncToDianping = () => {
    if (isPublished) return;
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      addToast('同步成功！美团外卖 ¥10 券已存入卡包', 'success');
    }, 800);
  };

  return (
    <div className={`w-full mx-auto flex flex-col gap-3 sm:gap-4 ${isMobile ? 'max-w-full px-0' : 'max-w-[1440px] px-margin py-space-md'}`}>
      {/* 顶部标题栏 */}
      <section className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/15 shadow-sm">
        <div>
          <h1 className="font-bold text-lg sm:text-xl text-on-surface">出游打卡与账单</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">北航先锋小队 #089 · 已完成出游</p>
        </div>
        <button
          onClick={() => setShowReceiptModal(true)}
          className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all flex items-center gap-1 shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">receipt_long</span>
          <span>账单明细</span>
        </button>
      </section>

      {/* 主体布局：移动端单列流式，桌面端两栏并排 */}
      <div className={`w-full gap-3 sm:gap-4 items-start ${isMobile ? 'flex flex-col' : 'grid grid-cols-1 lg:grid-cols-12'}`}>
        {/* 左侧：手账海报 */}
        <div className={`w-full flex flex-col gap-3 bg-surface-container-lowest rounded-2xl p-3 sm:p-4 shadow-sm border border-outline-variant/15 ${isMobile ? '' : 'lg:col-span-5'}`}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">photo_album</span>
              出游手账海报
            </span>
            <div className="flex p-0.5 bg-surface-container-low rounded-lg gap-0.5">
              {[
                { key: 'polaroid', label: '拍立得' },
                { key: 'stamp', label: '手账风' },
                { key: 'minimal', label: '极简' },
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => setPosterStyle(s.key as any)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                    posterStyle === s.key
                      ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                      : 'text-on-surface-variant'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* 居中固定宽度海报卡片，彻底避免失真 */}
          <div className="w-full max-w-[300px] sm:max-w-[340px] mx-auto aspect-[3/4] relative rounded-2xl overflow-hidden shadow-md bg-surface-container group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3RtfReYXTSt-YYbG6mKioyxMtNwnimqMBrDD-Fhdu7t34jGza080Ln79n6VChXSUvCE_85od3saGW6npTxwtst264Qmym08Pm0FaG1ooD4V6SYIRNs8flbDOhfjjWUd1heETVdeyL27qMfSZuseVxQdRSoPKP087UYnqP8zxHDUlSagXmSjAvczreFvY0BztYsN12Lqs1LoceJsAg57rZhFC09LLtcrR1rUf-GtvfAsr7uL0oMJu4"
              alt="798插画展"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-[11px] font-bold">
              北航同校出行
            </div>

            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-white/95 shadow-sm text-on-surface">
              <span className="font-bold text-xs text-on-surface block">798 艺术区 · 悦美术馆</span>
              <span className="text-[11px] text-on-surface-variant block mt-0.5">2026.10.18 · 北航 4 人小队 #089</span>
            </div>
          </div>

          <button
            onClick={() => addToast('海报已保存到相册', 'success')}
            className="w-full py-2.5 rounded-xl bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>保存海报到相册</span>
          </button>
        </div>

        {/* 右侧：大众点评同步与 AA 账单 */}
        <div className={`w-full flex flex-col gap-3 ${isMobile ? '' : 'lg:col-span-7'}`}>
          {/* 大众点评同步 */}
          <div className="bg-surface-container-lowest rounded-2xl p-3 sm:p-4 shadow-sm border border-outline-variant/15 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-secondary-container text-on-secondary flex items-center justify-center text-xs font-bold">评</span>
                点评真实笔记
              </span>
              <span className="text-secondary font-bold text-xs">发笔记赠 ¥10 外卖券</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[11px] text-outline">
                <span>出游心得与避坑贴士</span>
                <span>{ugcText.length}/{maxChars}</span>
              </div>
              <textarea
                value={ugcText}
                onChange={(e) => setUgcText(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded-xl bg-surface-container-low text-xs text-on-surface focus:outline-none resize-none leading-relaxed"
                placeholder="写下真实的体验与避坑贴士..."
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['#高校周末去哪玩', '#798当代艺术展', '#聚宝源铜锅'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-primary-container/40 text-on-primary-container text-[11px] font-bold">
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={handleSyncToDianping}
              disabled={isPublishing || isPublished}
              className={`w-full py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1 active:scale-95 ${
                isPublished
                  ? 'bg-tertiary text-on-tertiary cursor-default'
                  : 'bg-secondary-container text-on-secondary hover:opacity-95'
              }`}
            >
              {isPublishing ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                  <span>同步中...</span>
                </>
              ) : isPublished ? (
                <>
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>已同步至大众点评 · ¥10 券已入账</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                  <span>同步至大众点评</span>
                </>
              )}
            </button>
          </div>

          {/* 本次出游 AA 账单 */}
          <div className="bg-surface-container-lowest rounded-2xl p-3 sm:p-4 shadow-sm border border-outline-variant/15 flex flex-col gap-2.5">
            <span className="font-bold text-sm text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary text-[18px]">account_balance_wallet</span>
              本次出游 AA 消费结清
            </span>

            <div className="flex flex-col gap-1.5 text-xs">
              {[
                { name: '悦美术馆门票 (4人学生票)', total: '¥80.00' },
                { name: '往返拼车 (4人分摊)', total: '¥32.00' },
                { name: '聚宝源传统涮肉 (4人套餐)', total: '¥158.00' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-surface-container-low">
                  <span className="text-on-surface">{item.name}</span>
                  <span className="font-bold text-on-surface">{item.total}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container mt-1">
              <div>
                <span className="text-[11px] text-outline block">团队总额</span>
                <span className="font-bold text-base text-on-surface">¥270.00</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-outline block">每人已付 (4人AA)</span>
                <span className="font-black text-xl text-secondary">¥67.5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 账单弹窗 */}
      <Modal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        title="AA 核算账单"
        description="小队 #089 成员现场均摊已结清"
      >
        <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-2 text-xs">
          <div className="flex justify-between font-bold text-on-surface pb-1 border-b border-outline-variant/15">
            <span>成员</span>
            <span>AA 金额</span>
          </div>
          {[
            { name: '林同学 (队长)', amount: '已收 ¥67.5' },
            { name: '王同学', amount: '已付 ¥67.5' },
            { name: '席位 3 校友', amount: '已付 ¥67.5' },
            { name: '席位 4 校友', amount: '已付 ¥67.5' },
          ].map((r) => (
            <div key={r.name} className="flex justify-between">
              <span>{r.name}</span>
              <span className="text-tertiary font-bold">{r.amount}</span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
