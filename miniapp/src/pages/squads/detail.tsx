import { View, Text, Image } from '@tarojs/components';
import Taro, { useLoad, useRouter } from '@tarojs/taro';
import { useState } from 'react';
import './detail.scss';

const SQUAD_DATA = {
  'squad-089': {
    id: 'squad-089',
    no: '#089',
    title: '798 艺术展 + 聚宝源铜锅涮肉',
    slogan: '10月18日 周六 13:30 · 北航南门出发',
    members: [
      { id: 'm1', name: '林同学', univ: '北航软件', credit: 5.0, isLeader: true, avatar: 'https://i.pravatar.cc/80?img=11' },
      { id: 'm2', name: '王同学', univ: '北航计算机', credit: 4.8, isLeader: false, avatar: 'https://i.pravatar.cc/80?img=22' },
    ],
    capacity: 4,
    price: 39.5,
    saving: 60,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmsUd1KXAsN8FApfmuwPpqXNYJrrDEQ5oOvsByLYX2bvr9-0vQb-X4oE2OnJL28EwgInBqmnq5ApqwWXbmzGEcMYNdzhtRIAxYdhTBZ5ntQcWm789vr6tsPFpiIlwb4wscg5g2nG42diYnsHls7RdHxRurZXE0AG5_0pXOgQmbd8i4Q6BrUZpNaVxEeOFeWpZGnny5IfOxPuO9p0K1c26Xu0oFkoJBA6C01m81gNmpoT2j_m9XnvQj',
  },
};

export default function SquadDetailPage() {
  const router = useRouter();
  const squadId = router.params.id || 'squad-089';
  const squad = SQUAD_DATA[squadId] || SQUAD_DATA['squad-089'];

  const [isCopied, setIsCopied] = useState(false);
  const [memberCount, setMemberCount] = useState(squad.members.length);

  const capacity = squad.capacity;
  const remaining = capacity - memberCount;
  const isFull = remaining <= 0;

  useLoad(() => {
    Taro.setNavigationBarTitle({ title: `拼团详情 ${squad.no}` });
  });

  const handleCopyInvite = () => {
    const text = `【北航搭子拼团】798艺术展+聚宝源，目前${memberCount}/${capacity}人，人均¥39.5，速来扫码加入！https://meituan.com/squad/089`;
    Taro.setClipboardData({
      data: text,
      success: () => {
        setIsCopied(true);
        Taro.showToast({ title: '邀请已复制', icon: 'success' });
        setTimeout(() => setIsCopied(false), 2000);
      },
    });
  };

  const handleSimulateJoin = () => {
    if (isFull) {
      Taro.showToast({ title: '席位已满', icon: 'none' });
      return;
    }
    setMemberCount((n) => n + 1);
    Taro.showToast({ title: '校友加入成功', icon: 'success' });
  };

  const savingTiers = [
    { label: '1人单行', price: 95, sub: '全额票价与打车' },
    { label: '2人同行', price: 68, sub: '双人特惠票', isCurrent: memberCount === 2 },
    { label: '4人成团', price: 39.5, sub: '大桌团购+车费AA', isGoal: true },
  ];

  return (
    <View className="detail-page">
      {/* 头部大图与标题 */}
      <View className="hero-img-wrap">
        <Image className="hero-img" src={squad.img} mode="aspectFill" />
        <View className="hero-overlay" />
        <View className="hero-info">
          <Text className="hero-no">{squad.no} 拼团小队</Text>
          <Text className="hero-title">{squad.title}</Text>
          <Text className="hero-sub">{squad.slogan}</Text>
        </View>
      </View>

      {/* 席位面板 */}
      <View className="section-card">
        <View className="section-header">
          <Text className="section-title">队伍席位 ({memberCount}/{capacity}人)</Text>
          <View className="sim-btn" onClick={handleSimulateJoin}>
            <Text>+ 模拟加入</Text>
          </View>
        </View>

        <View className="seat-grid">
          {Array.from({ length: capacity }).map((_, idx) => {
            const m = squad.members[idx];
            const isDynamic = idx >= squad.members.length && idx < memberCount;
            if (m || isDynamic) {
              return (
                <View key={idx} className="seat-item filled">
                  {m ? (
                    <Image className="seat-avatar" src={m.avatar} mode="aspectFill" />
                  ) : (
                    <View className="seat-avatar-placeholder"><Text>校</Text></View>
                  )}
                  <View className="seat-info">
                    <Text className="seat-name">{m ? m.name : '新加入校友'}</Text>
                    <Text className="seat-univ">{m ? m.univ : '学信网实名'}</Text>
                  </View>
                  {m?.isLeader && <Text className="seat-badge leader">队长</Text>}
                </View>
              );
            }
            return (
              <View key={idx} className="seat-item empty" onClick={handleSimulateJoin}>
                <Text className="seat-add">+</Text>
                <Text className="seat-empty-label">席位 {idx + 1} 空缺</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* 费用优势 */}
      <View className="section-card">
        <Text className="section-title">同行立减优势</Text>
        <View className="saving-tiers">
          {savingTiers.map((tier) => (
            <View
              key={tier.label}
              className={`saving-tier ${tier.isCurrent ? 'current' : ''} ${tier.isGoal ? 'goal' : ''}`}
            >
              <View className="tier-left">
                <Text className="tier-label">{tier.label}</Text>
                <Text className="tier-sub">{tier.sub}</Text>
              </View>
              <Text className={`tier-price ${tier.isGoal ? 'goal-price' : ''}`}>¥{tier.price}/人</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 邀请文案 */}
      <View className="section-card">
        <Text className="section-title">邀请校友上车</Text>
        <View className="invite-text-box">
          <Text className="invite-text">
            798艺术展+聚宝源铜锅涮肉，目前 {memberCount} 缺 {remaining}，4人成团立省60%，人均只要 ¥39.5！
          </Text>
        </View>
        <View className="btn-row">
          <View className="btn-secondary" onClick={handleCopyInvite}>
            <Text>{isCopied ? '已复制' : '复制微信邀请'}</Text>
          </View>
          <View className="btn-primary" onClick={() => Taro.showToast({ title: '已保存卡片', icon: 'success' })}>
            <Text>保存分享卡片</Text>
          </View>
        </View>
      </View>

      {/* 垫片 */}
      <View className="bottom-space" />

      {/* 固定底栏 */}
      <View className="bottom-cta safe-area-bottom">
        <View className="cta-price">
          <Text className="cta-price-num">¥{squad.price}</Text>
          <Text className="cta-price-unit">/人均</Text>
        </View>
        <View
          className={`cta-btn ${isFull ? 'disabled' : ''}`}
          onClick={() => {
            if (!isFull) {
              Taro.showModal({
                title: '加入队伍',
                content: '确认加入北航先锋小队 #089？出游期间现场 AA 均摊。',
                confirmText: '确认占座',
                success: (res) => {
                  if (res.confirm) {
                    handleSimulateJoin();
                  }
                },
              });
            }
          }}
        >
          <Text>{isFull ? '席位已满' : '立即占座上车'}</Text>
        </View>
      </View>
    </View>
  );
}
