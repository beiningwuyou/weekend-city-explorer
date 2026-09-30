import { View, Text } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import './index.scss';

const TRIPS = [
  {
    id: 'trip-001',
    title: '798 艺术展 + 聚宝源涮肉',
    date: '10月18日 周六',
    squad: '#089 · 4人先锋队',
    status: 'active',
    statusLabel: '进行中',
    price: 67.5,
  },
  {
    id: 'trip-002',
    title: '清华校园秋游 + 文创市集',
    date: '10月25日 周六',
    squad: '#114 · 3人组',
    status: 'upcoming',
    statusLabel: '即将出发',
    price: 45.0,
  },
];

export default function TripsPage() {
  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '我的出游' });
  });

  return (
    <View className="trips-page">
      <View className="trips-header">
        <Text className="trips-title">我的出游历程</Text>
        <Text className="trips-sub">记录每一次同校探索与消费档案</Text>
      </View>

      {/* 3 列统计卡片，不拥挤 */}
      <View className="stats-row">
        {[
          { label: '累计出游', value: '7次' },
          { label: '探索足迹', value: '3座城市' },
          { label: '履约信用', value: '5.0★' },
        ].map((s, i) => (
          <View key={i} className="stat-card">
            <Text className="stat-value">{s.value}</Text>
            <Text className="stat-label">{s.label}</Text>
          </View>
        ))}
      </View>

      {/* 行程列表 */}
      <View className="trip-list">
        {TRIPS.map((trip) => (
          <View
            key={trip.id}
            className="trip-card"
            onClick={() => Taro.navigateTo({ url: `/pages/itinerary/index?id=${trip.id}` })}
          >
            <View className={`trip-badge ${trip.status}`}>
              <Text className="badge-text">{trip.statusLabel}</Text>
            </View>

            <View className="trip-content">
              <View className="trip-main">
                <Text className="trip-name">{trip.title}</Text>
                <Text className="trip-desc">{trip.date} · {trip.squad}</Text>
              </View>
              <View className="trip-cost">
                <Text className="cost-num">¥{trip.price}</Text>
                <Text className="cost-unit">/人实付</Text>
              </View>
            </View>

            {trip.status === 'active' && (
              <View className="trip-btns">
                <View
                  className="btn-item primary"
                  onClick={(e) => { e.stopPropagation(); Taro.navigateTo({ url: '/pages/itinerary/index' }); }}
                >
                  <Text>查看行程时间线</Text>
                </View>
                <View
                  className="btn-item secondary"
                  onClick={(e) => { e.stopPropagation(); Taro.navigateTo({ url: '/pages/checkin/index' }); }}
                >
                  <Text>去打卡结账</Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </View>

      <View style={{ height: '40rpx' }} />
    </View>
  );
}
