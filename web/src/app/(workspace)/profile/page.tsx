'use client';

import React, { useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { useToastStore } from '@/components/common/Toast';
import { useViewModeStore } from '@/stores/useViewModeStore';

export default function ProfilePage() {
  const { user, updatePreferences, toggleRemoteQueueAuth } = useUserStore();
  const { addToast } = useToastStore();
  const { viewMode } = useViewModeStore();
  const isMobile = viewMode === 'mobile';

  const [budgetTier, setBudgetTier] = useState(user.preferences.budgetTier);
  const [avoidQueue, setAvoidQueue] = useState(user.preferences.avoidLongQueueWithoutRemote);
  const [avoidRain, setAvoidRain] = useState(user.preferences.avoidRainOpenAir);
  const [autoQueue, setAutoQueue] = useState(user.preferences.autoRemoteQueueAuth);
  const [notifyWechat, setNotifyWechat] = useState(user.preferences.notifyChannels.wechatService);
  const [notifySms, setNotifySms] = useState(user.preferences.notifyChannels.sms);
  const [activityTypes, setActivityTypes] = useState({
    boardGames: true,
    artExhibition: true,
    outdoorHiking: false,
    mustEatHeritage: true,
  });
  const [transitPref, setTransitPref] = useState<'bike' | 'taxi' | 'subway'>('bike');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updatePreferences({
        budgetTier,
        avoidLongQueueWithoutRemote: avoidQueue,
        avoidRainOpenAir: avoidRain,
        autoRemoteQueueAuth: autoQueue,
        notifyChannels: { wechatService: notifyWechat, sms: notifySms },
      });
      toggleRemoteQueueAuth(autoQueue);
      setIsSaving(false);
      addToast('出游偏好已保存', 'success');
    }, 400);
  };

  const toggleActivity = (key: keyof typeof activityTypes) => {
    setActivityTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-[880px] mx-auto w-full px-4 sm:px-margin py-space-md flex flex-col gap-space-lg">
      {/* 顶部标题与保存按钮 */}
      <div className="flex items-center justify-between bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/15">
        <div>
          <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface">个人偏好设置</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">设置常用出游习惯，路线与组队推荐将自动适配</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-space-lg py-2.5 bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-label-lg text-label-lg font-bold rounded-xl shadow-sm transition-all duration-150 active:scale-95 flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isSaving ? 'refresh' : 'check'}
          </span>
          <span>{isSaving ? '保存中...' : '保存配置'}</span>
        </button>
      </div>

      <div className="flex flex-col gap-space-md">
        {/* 1. 认证信息卡片 */}
        <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/15 flex flex-col gap-space-md">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">school</span>
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">高校实名认证</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">认证后出游免押金，享学生专享价与门票特惠</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-tertiary-container/40 text-tertiary font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              学信网认证通过
            </span>
          </div>

          <div className={`grid gap-space-sm p-space-md bg-surface-container-low rounded-xl text-body-sm ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'}`}>
            <div>
              <span className="text-outline block text-xs">认证姓名</span>
              <span className="font-bold text-on-surface mt-0.5 block">{user.name}</span>
            </div>
            <div>
              <span className="text-outline block text-xs">认证院校</span>
              <span className="font-bold text-on-surface mt-0.5 block truncate">{user.university}</span>
            </div>
            <div>
              <span className="text-outline block text-xs">院系及履约</span>
              <span className="font-bold text-on-surface mt-0.5 block">{user.college} · <span className="text-secondary font-bold">{user.creditScore.toFixed(1)}★</span></span>
            </div>
          </div>
        </section>

        {/* 2. 出行偏好 */}
        <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/15 flex flex-col gap-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-primary-container/30 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">tune</span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">出游偏好</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">根据你的偏好推荐合适的路线与活动</p>
            </div>
          </div>

          {/* 预算倾向 */}
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md font-bold text-on-surface">单次出游预算</label>
            <div className={`grid gap-space-sm ${isMobile ? 'grid-cols-3' : 'grid-cols-1 sm:grid-cols-3'}`}>
              {[
                { key: 'budget', label: '经济穷游', sub: '≤ ¥35 /人' },
                { key: 'moderate', label: '高性价比', sub: '¥35 - ¥60 /人' },
                { key: 'comfort', label: '品质舒适', sub: '¥60 - ¥120 /人' },
              ].map((b) => (
                <button
                  type="button"
                  key={b.key}
                  onClick={() => setBudgetTier(b.key as any)}
                  className={`p-space-md rounded-xl text-left border transition-all ${
                    budgetTier === b.key
                      ? 'bg-primary-container/20 border-primary-container text-on-surface font-bold shadow-xs'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container text-on-surface-variant'
                  }`}
                >
                  <span className="block font-label-lg text-label-lg">{b.label}</span>
                  <span className="block font-body-sm text-xs opacity-75 mt-0.5">{b.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 活动兴趣 */}
          <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/10">
            <label className="font-label-md text-label-md font-bold text-on-surface">兴趣类型 (可多选)</label>
            <div className={`grid gap-space-sm ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
              {[
                { key: 'boardGames', label: '沉浸密室/桌游', icon: 'psychology' },
                { key: 'artExhibition', label: '艺术展/文创市集', icon: 'palette' },
                { key: 'outdoorHiking', label: '户外轻徒步', icon: 'hiking' },
                { key: 'mustEatHeritage', label: '必吃榜老字号', icon: 'restaurant' },
              ].map((act) => {
                const isChecked = activityTypes[act.key as keyof typeof activityTypes];
                return (
                  <button
                    type="button"
                    key={act.key}
                    onClick={() => toggleActivity(act.key as keyof typeof activityTypes)}
                    className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                      isChecked
                        ? 'bg-secondary-fixed/30 border-secondary text-secondary font-bold'
                        : 'bg-surface-container-low border-transparent text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{act.icon}</span>
                    <span className="font-label-sm text-xs truncate">{act.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 交通工具 */}
          <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/10">
            <label className="font-label-md text-label-md font-bold text-on-surface">优先出行方式</label>
            <div className="grid grid-cols-3 gap-space-sm">
              {[
                { key: 'bike', label: '共享单车', desc: '短途优先' },
                { key: 'taxi', label: '拼车打车', desc: '省时快捷' },
                { key: 'subway', label: '地铁公交', desc: '准时低碳' },
              ].map((t) => (
                <button
                  type="button"
                  key={t.key}
                  onClick={() => setTransitPref(t.key as any)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    transitPref === t.key
                      ? 'bg-tertiary-container/30 border-tertiary text-tertiary font-bold'
                      : 'bg-surface-container-low border-transparent text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className="block font-label-md text-sm">{t.label}</span>
                  <span className="block text-[11px] opacity-75 mt-0.5">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 3. 避坑与舒适度过滤 */}
        <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/15 flex flex-col gap-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-error-container/30 text-error flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">shield</span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">避坑与体验过滤</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">遇到以下情况时，自动调整或替换行程方案</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-body-sm">
            <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={avoidQueue}
                onChange={(e) => setAvoidQueue(e.target.checked)}
                className="mt-1 w-4 h-4 accent-primary rounded"
              />
              <div>
                <span className="font-bold text-on-surface block text-sm">排队过长避开</span>
                <span className="text-on-surface-variant text-xs mt-0.5 block">排队预估超过 30 分钟且不支持远程取号的餐厅或景点，自动提醒或推荐备选</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={avoidRain}
                onChange={(e) => setAvoidRain(e.target.checked)}
                className="mt-1 w-4 h-4 accent-primary rounded"
              />
              <div>
                <span className="font-bold text-on-surface block text-sm">雨雪恶劣天气防护</span>
                <span className="text-on-surface-variant text-xs mt-0.5 block">遇降雨、大风降温等天气时，自动调整为室内观展、聚餐等室内路线</span>
              </div>
            </label>
          </div>
        </section>

        {/* 4. 自动取号与通知授权 */}
        <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/15 flex flex-col gap-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/40 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">notifications_active</span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">服务通知与代取号</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">出游过程中的重要事项提醒与省时代办</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
              <div>
                <span className="font-bold text-on-surface block text-sm">餐厅代取排队号</span>
                <span className="text-on-surface-variant text-xs mt-0.5 block">到达前 20 分钟自动代取美团排队号，减少现场等位时间</span>
              </div>
              <input
                type="checkbox"
                checked={autoQueue}
                onChange={(e) => setAutoQueue(e.target.checked)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
              <div>
                <span className="font-bold text-on-surface block text-sm">微信服务通知</span>
                <span className="text-on-surface-variant text-xs mt-0.5 block">用于接收组队成团、即将过号提醒等即时消息</span>
              </div>
              <input
                type="checkbox"
                checked={notifyWechat}
                onChange={(e) => setNotifyWechat(e.target.checked)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
              <div>
                <span className="font-bold text-on-surface block text-sm">短信重要提醒</span>
                <span className="text-on-surface-variant text-xs mt-0.5 block">闭园倒计时、突发恶劣天气等关键节点短信提示</span>
              </div>
              <input
                type="checkbox"
                checked={notifySms}
                onChange={(e) => setNotifySms(e.target.checked)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
