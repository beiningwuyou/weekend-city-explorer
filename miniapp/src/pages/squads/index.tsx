import { View, Text, Image } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import './index.scss';

export default function SquadsPage() {
  const [campusFilter, setCampusFilter] = useState('all');
  const [themeFilter, setThemeFilter] = useState('全部');

  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '周末搭子广场' });
  });

  const campuses = [
    { key: 'all', label: '全部高校' },
    { key: 'buaa', label: '北航' },
    { key: 'bupt', label: '北邮' },
    { key: 'thu', label: '清华' },
  ];

  const themes = ['全部', '密室剧本杀', '网红艺术展', '户外轻徒步', '美食聚餐'];

  const squads = [
    {
      id: 'squad-089',
      no: '#089',
      title: '798 艺术展 + 聚宝源铜锅涮肉',
      tag: '艺术看展 · 必吃榜',
      leader: '林同学 (北航软件)',
      members: 3,
      capacity: 4,
      price: 39.5,
      saving: 60,
      countdown: '14小时后出发',
      meetingPoint: '五道口 A 口',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmsUd1KXAsN8FApfmuwPpqXNYJrrDEQ5oOvsByLYX2bvr9-0vQb-X4oE2OnJL28EwgInBqmnq5ApqwWXbmzGEcMYNdzhtRIAxYdhTBZ5ntQcWm789vr6tsPFpiIlwb4wscg5g2nG42diYnsHls7RdHxRurZXE0AG5_0pXOgQmbd8i4Q6BrUZpNaVxEeOFeWpZGnny5IfOxPuO9p0K1c26Xu0oFkoJBA6C01m81gNmpoT2j_m9XnvQj',
    },
    {
      id: 'squad-092',
      no: '#092',
      title: '暴风雪山庄沉浸密室 · 硬核推凶',
      tag: 'NPC演绎 · 逻辑推凶',
      leader: '张同学 (北邮计院)',
      members: 2,
      capacity: 4,
      price: 48,
      saving: 40,
      countdown: '15小时后出发',
      meetingPoint: '知春路地铁口',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTaPKWPboxSiH3R5kVFZaRDhrdE5jkGNBCNFFjZLKy9H-kB-NqnU77B761iKgKFmcFz6v2G-l9vSWK3IFvXgOZdq9shaA-29Ob0zdj9nIkZtAacpg16VWDTX3tNHRc_goggI7KOoLCHAs9MT1iyN0DW8xsa639eEMlb_6uS9ABbFCIw1riJ-6ubNr8_rMTx0YLG_kIaZfKyWPRzzN_lg3f8OnkPz1FR-uYf94FtaOOakjRkNaoXOhi',
    },
  ];

  return (
    <View className="squads-page">
      {/* 头部精简 Banner */}
      <View className="hero-banner">
        <View className="hero-left">
          <Text className="hero-title">找校友搭子，周末不宅寝</Text>
          <Text className="hero-sub">学信网实名认证 · 现场透明 AA</Text>
        </View>
        <View
          className="create-btn"
          onClick={() => Taro.navigateTo({ url: '/pages/squads/detail?mode=create' })}
        >
          <Text>+ 发起拼团</Text>
        </View>
      </View>

      {/* 高校筛选 */}
      <View className="filter-scroll">
        <View className="filter-row">
          {campuses.map((c) => (
            <View
              key={c.key}
              className={`filter-chip ${campusFilter === c.key ? 'active' : ''}`}
              onClick={() => setCampusFilter(c.key)}
            >
              <Text>{c.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 主题标签 */}
      <View className="filter-scroll">
        <View className="filter-row">
          {themes.map((t) => (
            <View
              key={t}
              className={`theme-chip ${themeFilter === t ? 'active' : ''}`}
              onClick={() => setThemeFilter(t)}
            >
              <Text>{t}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 小队列表 */}
      <View className="squad-list">
        {squads.map((squad) => {
          const remaining = squad.capacity - squad.members;
          const progress = (squad.members / squad.capacity) * 100;
          return (
            <View
              key={squad.id}
              className="squad-card"
              onClick={() => Taro.navigateTo({ url: `/pages/squads/detail?id=${squad.id}` })}
            >
              <View className="squad-img-wrap">
                <Image className="squad-img" src={squad.img} mode="aspectFill" />
                <View className="img-overlay" />
                <View className="img-badge">{squad.no}</View>
                <View className="img-title-block">
                  <Text className="img-sub">{squad.tag}</Text>
                  <Text className="img-title">{squad.title}</Text>
                </View>
              </View>

              <View className="squad-body">
                <View className="leader-row">
                  <Text className="leader-name">领队: {squad.leader}</Text>
                  <Text className="countdown">{squad.countdown}</Text>
                </View>

                {/* 进度条 */}
                <View className="progress-block">
                  <View className="progress-top">
                    <Text className={`progress-label ${remaining === 1 ? 'urgent' : ''}`}>
                      {remaining === 1 ? `仅剩 1 席（${squad.members}/${squad.capacity}人）` : `还差 ${remaining} 人（${squad.members}/${squad.capacity}人）`}
                    </Text>
                    <Text className="meet-point">集合: {squad.meetingPoint}</Text>
                  </View>
                  <View className="progress-bar-bg">
                    <View className={`progress-bar-fill ${remaining === 1 ? 'urgent' : ''}`} style={{ width: `${progress}%` }} />
                  </View>
                </View>

                <View className="price-cta-row">
                  <View className="price-block">
                    <Text className="price-num">¥{squad.price}</Text>
                    <Text className="price-unit">/人均</Text>
                    <Text className="saving">立省{squad.saving}%</Text>
                  </View>
                  <View className="join-btn">
                    <Text>查看详情</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={{ height: '40rpx' }} />
    </View>
  );
}
