import { View, Text } from '@tarojs/components';
import Taro, { useLoad, useRouter } from '@tarojs/taro';
import { useState } from 'react';
import './index.scss';

const TIMELINE_ITEMS = [
  { time: '13:30', icon: '🚌', title: '五道口 A 口集合', sub: '专车出发 · 4人拼车直达 798', status: 'done' },
  { time: '14:20', icon: '🎨', title: '悦美术馆 · 当代特展', sub: '学生特惠票 ¥20/人 · 闸机刷码入园', status: 'done' },
  { time: '16:30', icon: '🍲', title: '聚宝源铜锅涮肉', sub: '已提前排号，到店直接入座', status: 'active', sentinel: true },
  { time: '19:00', icon: '🚗', title: '拼车返程', sub: '返回北航学院路校区', status: 'pending' },
];

export default function ItineraryPage() {
  const router = useRouter();
  const [sentinelActive, setSentinelActive] = useState(true);

  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '出游行程' });
  });

  return (
    <View className="itinerary-page">
      {/* 行程头部卡片 */}
      <View className="itin-header">
        <View className="itin-header-top">
          <View className="itin-status-badge">进行中</View>
          <Text className="itin-date">10月18日 周六</Text>
        </View>
        <Text className="itin-title">798 艺术展 + 聚宝源涮肉</Text>
        <Text className="itin-squad">北航 4 人小队 #089</Text>
      </View>

      {/* 排号提醒 */}
      {sentinelActive && (
        <View className="sentinel-alert">
          <Text className="sentinel-icon">🔔</Text>
          <View className="sentinel-text">
            <Text className="sentinel-title">聚宝源排号中：预计 16:40 就餐</Text>
            <Text className="sentinel-sub">已提前代取 4 人大桌号，请按时前往</Text>
          </View>
          <View className="sentinel-dismiss" onClick={() => setSentinelActive(false)}>
            <Text>×</Text>
          </View>
        </View>
      )}

      {/* 今日时间线 */}
      <View className="section-card">
        <Text className="section-title">行程安排</Text>
        <View className="timeline">
          {TIMELINE_ITEMS.map((item, idx) => (
            <View key={idx} className={`timeline-item ${item.status}`}>
              <View className="timeline-left">
                <Text className="tl-time">{item.time}</Text>
                <View className={`tl-dot ${item.status}`} />
                {idx < TIMELINE_ITEMS.length - 1 && <View className="tl-line" />}
              </View>
              <View className="timeline-right">
                <View className="tl-row">
                  <Text className="tl-icon">{item.icon}</Text>
                  <Text className="tl-title">{item.title}</Text>
                </View>
                <Text className="tl-sub">{item.sub}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 电子票券 */}
      <View className="section-card">
        <Text className="section-title">入场凭证</Text>
        <View className="ticket-pass">
          <View className="ticket-top">
            <Text className="ticket-venue">悦美术馆 · 当代特展</Text>
            <Text className="ticket-type">学生特惠票 × 4 张</Text>
          </View>
          <View className="ticket-code">
            <Text className="ticket-code-text">MT-EDU-089-20261018</Text>
          </View>
          <View className="ticket-bottom">
            <Text className="ticket-price">实付 ¥20/人</Text>
            <Text className="ticket-status">已核销入园</Text>
          </View>
        </View>
      </View>

      <View className="bottom-space" />

      {/* 固定底栏 */}
      <View className="bottom-cta safe-area-bottom">
        <View className="cta-btn" onClick={() => Taro.navigateTo({ url: '/pages/checkin/index' })}>
          <Text>行程完成 · 打卡结账</Text>
        </View>
      </View>
    </View>
  );
}
