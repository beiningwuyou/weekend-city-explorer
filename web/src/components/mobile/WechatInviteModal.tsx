'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ItineraryPlan } from '@/types/poi';
import { usePricingStore } from '@/stores/usePricingStore';
import { useToastStore } from '@/components/common/Toast';

interface WechatInviteModalProps {
  plan: ItineraryPlan | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WechatInviteModal: React.FC<WechatInviteModalProps> = ({
  plan,
  isOpen,
  onClose,
}) => {
  const { headcount, calculatePerPersonPrice } = usePricingStore();
  const { addToast } = useToastStore();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !plan) return null;

  const priceCalc = calculatePerPersonPrice(plan.baseBudgetSolo);
  const defaultSlogan =
    plan.invitationSlogan ||
    `周六一起去${plan.title}，4人组团只要¥${priceCalc.price}/人，一起来吗？`;

  const copyText = `【周末去哪玩 · 同学出游邀约】
📍 项目：${plan.title}
💰 人均：¥${priceCalc.price} (${priceCalc.savingsBadge})
⏱️ 建议时间：本周六 13:30 出发
💡 亮点：${plan.highlightTip}
👉 微信回复“+1”一起上车！`;

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    addToast('✅ 邀请文案已复制，可直接发送到微信群', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl border border-outline-variant/20">
        {/* Top Header */}
        <div className="sticky top-0 z-10 bg-surface-container-lowest/95 backdrop-blur-md px-5 py-3.5 border-b border-outline-variant/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center text-[13px] font-bold">
              微
            </span>
            <span className="font-headline-md text-headline-md text-on-surface font-bold">
              微信出游邀请
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-on-surface transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Card Preview (微信卡片模拟样式) */}
          <div className="bg-gradient-to-br from-emerald-500/10 via-amber-500/5 to-surface-container rounded-2xl p-4 border border-outline-variant/20 shadow-sm relative overflow-hidden">
            {/* Stamp Tag */}
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded-full bg-tertiary text-on-tertiary text-[11px] font-bold tracking-wide">
                4人组团特惠卡
              </span>
              <span className="text-secondary font-black text-sm">
                人均仅 ¥{priceCalc.price}
              </span>
            </div>

            {/* Title & Cover */}
            <h4 className="font-headline-md text-headline-md text-on-surface font-bold leading-snug">
              {plan.title}
            </h4>
            <p className="text-[12px] text-on-surface-variant mt-1 leading-relaxed">
              “{defaultSlogan}”
            </p>

            <div className="relative h-36 w-full rounded-xl overflow-hidden mt-3 shadow-xs">
              <Image
                src={plan.coverImage}
                alt={plan.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                <div className="text-white text-xs space-y-0.5">
                  <div className="font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary-container">
                      location_on
                    </span>
                    <span>{plan.address || plan.originLocation}</span>
                  </div>
                  <div className="text-[11px] text-white/80">
                    {plan.transitSummary || '单车接驳 + 避雨室内 + 美团特惠'}
                  </div>
                </div>
              </div>
            </div>

            {/* Member Progress */}
            <div className="mt-3 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-on-surface-variant font-medium">成团席位：</span>
                <div className="flex -space-x-1.5">
                  <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold flex items-center justify-center border border-white">
                    林
                  </span>
                  <span className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary text-[10px] font-bold flex items-center justify-center border border-white">
                    张
                  </span>
                  <span className="w-5 h-5 rounded-full bg-surface-container text-outline text-[10px] font-bold flex items-center justify-center border border-dashed border-outline-variant">
                    ?
                  </span>
                  <span className="w-5 h-5 rounded-full bg-surface-container text-outline text-[10px] font-bold flex items-center justify-center border border-dashed border-outline-variant">
                    ?
                  </span>
                </div>
              </div>
              <span className="font-bold text-tertiary">差 2 人享最低折</span>
            </div>
          </div>

          {/* Slogan & Copy Prompt */}
          <div className="bg-surface-container-low rounded-2xl p-3.5 border border-outline-variant/15 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-on-surface">
              <span>宿舍微信群直接接龙口令</span>
              <span className="text-[11px] text-outline font-normal">点击一键复制</span>
            </div>
            <pre className="font-mono text-[11px] text-on-surface-variant bg-surface-container-lowest p-2.5 rounded-xl whitespace-pre-wrap leading-relaxed border border-outline-variant/10">
              {copyText}
            </pre>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={handleCopy}
              className="py-3 px-4 rounded-xl bg-tertiary text-on-tertiary font-label-lg text-label-lg font-bold shadow-sm hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? '已复制成功' : '复制微信群口令'}</span>
            </button>
            <button
              onClick={() => {
                addToast('正在生成 750×1100 朋友圈高清战报图并下载...', 'success');
              }}
              className="py-3 px-4 rounded-xl bg-primary-container text-on-primary-container font-label-lg text-label-lg font-bold shadow-sm hover:bg-primary-fixed-dim active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">
                share
              </span>
              <span>生成微信长图</span>
            </button>
          </div>

          <div className="text-center">
            <span className="text-[10px] text-outline">
              🔒 俞军减法版核心机制 · 零押金零门槛 · 回复“+1”自动匹配席位
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
