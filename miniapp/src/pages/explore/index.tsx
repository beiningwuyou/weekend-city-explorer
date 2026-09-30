import { View, Text, Image, Input } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import './index.scss';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<'recommend' | 'nearby' | 'hot'>('recommend');
  const [agentQuery, setAgentQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [agentReply, setAgentReply] = useState('');

  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '周末去哪玩' });
  });

  const handleAgentSubmit = () => {
    if (!agentQuery.trim()) return;
    setIsThinking(true);
    setAgentReply('');
    setTimeout(() => {
      setIsThinking(false);
      setAgentReply(
        '推荐去【798 艺术展 + 聚宝源涮肉】，本周六多云气温适宜。\n人均约 ¥39.5（4人组队拼车+团购立省60%），目前有现成队伍正在招募队友，要看看吗？'
      );
    }, 800);
  };

  const plans = [
    {
      id: '1',
      title: '798 艺术展 + 聚宝源铜锅涮肉',
      tag: '艺术看展 · 必吃榜',
      price: 39.5,
      saving: 60,
      weather: '☁️ 室内推荐',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmsUd1KXAsN8FApfmuwPpqXNYJrrDEQ5oOvsByLYX2bvr9-0vQb-X4oE2OnJL28EwgInBqmnq5ApqwWXbmzGEcMYNdzhtRIAxYdhTBZ5ntQcWm789vr6tsPFpiIlwb4wscg5g2nG42diYnsHls7RdHxRurZXE0AG5_0pXOgQmbd8i4Q6BrUZpNaVxEeOFeWpZGnny5IfOxPuO9p0K1c26Xu0oFkoJBA6C01m81gNmpoT2j_m9XnvQj',
    },
    {
      id: '2',
      title: '暴风雪山庄沉浸密室 · 硬核推凶',
      tag: '密室剧本杀',
      price: 48,
      saving: 40,
      weather: '🏠 全天候室内',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTaPKWPboxSiH3R5kVFZaRDhrdE5jkGNBCNFFjZLKy9H-kB-NqnU77B761iKgKFmcFz6v2G-l9vSWK3IFvXgOZdq9shaA-29Ob0zdj9nIkZtAacpg16VWDTX3tNHRc_goggI7KOoLCHAs9MT1iyN0DW8xsa639eEMlb_6uS9ABbFCIw1riJ-6ubNr8_rMTx0YLG_kIaZfKyWPRzzN_lg3f8OnkPz1FR-uYf94FtaOOakjRkNaoXOhi',
    },
    {
      id: '3',
      title: '香山红叶轻徒步 + 农家补给',
      tag: '近郊轻户外',
      price: 28,
      saving: 35,
      weather: '⛅ 适宜徒步',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiYqAGbDmTYxivFuBw4v0vvPbXj7rTe4d1MuBR0llgcbGWqklYUNqvf9mRxvQ98JRgFOY5VpwrRm3lDpgX5pJ1hj9RanCIJE4wH7DMCQ-A6Ls_HOzDYzHHWkJPxAGxXr1Ys8t3wqhQFvVoV-l-Cz5rDxM-dNYKEGKO8-6k93HJd7fhJQCsJQpUbKFLxoOBWHFfYJiCb6TXuRx7-YtW6pYV5yJtW3-8GfKJE9s1EJwlW7oIHm0',
    },
  ];

  return (
    <View className="explore-page">
      {/* 顶部天气与校园身份 */}
      <View className="top-banner">
        <View className="top-banner-text">
          <Text className="weather-line">本周六 · 多云 16℃ 适宜出行</Text>
          <Text className="user-line">北航·林同学 · 学信网认证</Text>
        </View>
        <View className="city-pill">海淀高校圈</View>
      </View>

      {/* 意图输入 */}
      <View className="search-card">
        <View className="search-bar">
          <Input
            className="search-input"
            placeholder="想去哪玩？比如：看展、火锅、预算50以内…"
            value={agentQuery}
            onInput={(e) => setAgentQuery(e.detail.value)}
            confirmType="search"
            onConfirm={handleAgentSubmit}
          />
          <View
            className={`search-btn ${isThinking ? 'loading' : ''}`}
            onClick={handleAgentSubmit}
          >
            <Text>{isThinking ? '思考中' : '搜索'}</Text>
          </View>
        </View>

        {agentReply ? (
          <View className="reply-box">
            <Text className="reply-content">{agentReply}</Text>
            <View className="reply-btn-row">
              <View className="reply-action-btn primary" onClick={() => Taro.navigateTo({ url: '/pages/squads/index' })}>
                <Text>查看拼团小队</Text>
              </View>
              <View className="reply-action-btn secondary" onClick={() => setAgentReply('')}>
                <Text>换个问法</Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>

      {/* 分类选项卡 */}
      <View className="tab-strip">
        {[
          { key: 'recommend', label: '精选路线' },
          { key: 'nearby', label: '离我最近' },
          { key: 'hot', label: '热榜推荐' },
        ].map((t) => (
          <View
            key={t.key}
            className={`tab-btn ${activeTab === t.key ? 'active' : ''}`}
            onClick={() => setActiveTab(t.key as any)}
          >
            <Text>{t.label}</Text>
          </View>
        ))}
      </View>

      {/* 方案卡片列表 */}
      <View className="plan-list">
        {plans.map((plan) => (
          <View
            key={plan.id}
            className="plan-card"
            onClick={() => Taro.navigateTo({ url: `/pages/itinerary/index?id=${plan.id}` })}
          >
            <View className="card-thumb-wrap">
              <Image className="card-thumb" src={plan.img} mode="aspectFill" />
              <View className="thumb-badge">{plan.weather}</View>
            </View>

            <View className="card-content">
              <Text className="plan-type">{plan.tag}</Text>
              <Text className="plan-name">{plan.title}</Text>
              <View className="plan-footer">
                <View className="price-group">
                  <Text className="price-val">¥{plan.price}</Text>
                  <Text className="price-unit">/人</Text>
                </View>
                <Text className="discount-tag">立省 {plan.saving}%</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: '40rpx' }} />
    </View>
  );
}
