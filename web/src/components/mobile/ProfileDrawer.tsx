'use client';

import React from 'react';
import Link from 'next/link';
import { useUserStore } from '@/stores/useUserStore';
import { useToastStore } from '@/components/common/Toast';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, toggleRemoteQueueAuth, updatePreferences } = useUserStore();
  const { addToast } = useToastStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      {/* Background click to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Body */}
      <div className="w-full max-w-xs sm:max-w-sm bg-surface-container-lowest h-full shadow-2xl flex flex-col border-l border-outline-variant/20 animate-in slide-in-from-right duration-300 overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="p-4 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎓</span>
            <div>
              <div className="font-headline-md text-headline-md text-on-surface font-bold">
                校园个人中心
              </div>
              <div className="text-[10px] text-tertiary font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[13px]">verified</span>
                <span>学信网已认证</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-on-surface"
          >
            ✕
          </button>
        </div>

        {/* User ID Card */}
        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-br from-primary-container/20 to-surface-container p-4 rounded-2xl border border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-black text-lg shadow-sm">
                林
              </div>
              <div>
                <div className="font-bold text-on-surface text-base flex items-center gap-1.5">
                  <span>{user.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-bold">
                    5.0 ★ 信用优良
                  </span>
                </div>
                <div className="text-xs text-on-surface-variant mt-0.5">
                  {user.university} · {user.college}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-outline-variant/15 text-center text-xs">
              <div>
                <span className="text-outline text-[11px] block">已成团出游</span>
                <span className="font-bold text-on-surface text-sm">6 次</span>
              </div>
              <div>
                <span className="text-outline text-[11px] block">累计已省</span>
                <span className="font-black text-secondary text-sm">¥342</span>
              </div>
            </div>
          </div>

          {/* Preferences Settings */}
          <div className="space-y-3">
            <div className="font-label-md text-label-md text-on-surface font-bold">
              出行偏好设置
            </div>

            {/* Remote Queue Auth Switch */}
            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/15 flex items-center justify-between">
              <div className="flex-1 pr-2">
                <div className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-1">
                  <span>自动代排号</span>
                </div>
                <div className="text-[11px] text-on-surface-variant mt-0.5">
                  离场前20分钟智能取号，到店免排队
                </div>
              </div>
              <input
                type="checkbox"
                checked={user.preferences.autoRemoteQueueAuth}
                onChange={(e) => {
                  toggleRemoteQueueAuth(e.target.checked);
                  addToast(
                    e.target.checked
                      ? '已开启自动排号托管'
                      : '已关闭自动排号，需手动确认',
                    'success'
                  );
                }}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
            </div>

            {/* Rainy Weather Prefer Indoor */}
            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/15 flex items-center justify-between">
              <div className="flex-1 pr-2">
                <div className="font-label-md text-label-md text-on-surface font-bold">
                  雨天优先室内
                </div>
                <div className="text-[11px] text-on-surface-variant mt-0.5">
                  下雨时优先推荐室内展馆与热气餐饮
                </div>
              </div>
              <input
                type="checkbox"
                checked={user.preferences.avoidRainOpenAir}
                onChange={(e) => {
                  updatePreferences({ avoidRainOpenAir: e.target.checked });
                  addToast('已更新天气偏好设置', 'success');
                }}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
            </div>
          </div>

          {/* Student Coupons */}
          <div className="space-y-2">
            <div className="font-label-md text-label-md text-on-surface font-bold flex items-center justify-between">
              <span>美团高校专属券包</span>
              <span className="text-secondary font-bold text-xs">2 张待使用</span>
            </div>
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-on-surface">美团单车 7 天畅骑卡</div>
                <div className="text-[10px] text-on-surface-variant">高校实名认证专享 · 仅限校园周边</div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[10px]">
                已激活
              </span>
            </div>
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-on-surface">大众点评必吃榜 ¥15 抵扣券</div>
                <div className="text-[10px] text-on-surface-variant">聚宝源等热门正餐满 ¥60 可用</div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
                去核销
              </span>
            </div>
          </div>

          {/* Full Profile Link */}
          <div className="pt-2">
            <Link
              href="/profile"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold flex items-center justify-center gap-1 transition-colors"
            >
              <span>查看完整档案与偏好</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
