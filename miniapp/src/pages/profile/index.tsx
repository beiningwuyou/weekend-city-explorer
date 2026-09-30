import { View, Text, Switch } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import './index.scss';

export default function ProfilePage() {
  const [budgetTier, setBudgetTier] = useState('moderate');
  const [avoidQueue, setAvoidQueue] = useState(true);
  const [avoidRain, setAvoidRain] = useState(true);
  const [autoQueue, setAutoQueue] = useState(true);
  const [notifyWechat, setNotifyWechat] = useState(true);
  const [notifySms, setNotifySms] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '个人偏好' });
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      Taro.showToast({ title: '已保存偏好', icon: 'success' });
    }, 500);
  };

  const budgets = [
    { key: 'budget', label: '穷游 ≤¥35' },
    { key: 'moderate', label: '实惠 ¥35-60' },
    { key: 'comfort', label: '品质 ¥60+' },
  ];

  return (
    <View className="profile-page">
      {/* 认证名片 */}
      <View className="user-card">
        <View className="user-top">
          <View className="avatar-circle">
            <Text className="avatar-letter">林</Text>
          </View>
          <View className="user-meta">
            <Text className="user-name">林*翔</Text>
            <Text className="user-school">北京航空航天大学 · 软件学院</Text>
            <View className="credit-pill">
              <Text className="credit-star">5.0★</Text>
              <Text className="credit-text">学信网官方实名认证</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 预算选择 */}
      <View className="setting-card">
        <Text className="card-heading">出游预算偏好</Text>
        <View className="budget-row">
          {budgets.map((b) => (
            <View
              key={b.key}
              className={`budget-chip ${budgetTier === b.key ? 'active' : ''}`}
              onClick={() => setBudgetTier(b.key)}
            >
              <Text>{b.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 体验与避坑 */}
      <View className="setting-card">
        <Text className="card-heading">行程避坑偏好</Text>

        <View className="toggle-row">
          <View className="toggle-info">
            <Text className="toggle-name">排队过长避开</Text>
            <Text className="toggle-hint">排队超 30 分钟且不可远程取号时自动提醒</Text>
          </View>
          <Switch
            checked={avoidQueue}
            onChange={(e) => setAvoidQueue(e.detail.value)}
            color="#ffc300"
          />
        </View>

        <View className="toggle-row">
          <View className="toggle-info">
            <Text className="toggle-name">恶劣天气保护</Text>
            <Text className="toggle-hint">下雨、大风天气自动推荐室内展馆活动</Text>
          </View>
          <Switch
            checked={avoidRain}
            onChange={(e) => setAvoidRain(e.detail.value)}
            color="#ffc300"
          />
        </View>
      </View>

      {/* 提醒与代办 */}
      <View className="setting-card">
        <Text className="card-heading">代办与通知</Text>

        <View className="toggle-row">
          <View className="toggle-info">
            <Text className="toggle-name">自动代取排队号</Text>
            <Text className="toggle-hint">到达餐厅前 20 分钟自动取号，减少等位时间</Text>
          </View>
          <Switch
            checked={autoQueue}
            onChange={(e) => setAutoQueue(e.detail.value)}
            color="#ffc300"
          />
        </View>

        <View className="toggle-row">
          <View className="toggle-info">
            <Text className="toggle-name">微信服务通知</Text>
            <Text className="toggle-hint">接收拼团成团、即将叫号等即时提醒</Text>
          </View>
          <Switch
            checked={notifyWechat}
            onChange={(e) => setNotifyWechat(e.detail.value)}
            color="#ffc300"
          />
        </View>

        <View className="toggle-row">
          <View className="toggle-info">
            <Text className="toggle-name">短信紧急提醒</Text>
            <Text className="toggle-hint">闭园提醒、暴雨突发等关键事项短信兜底</Text>
          </View>
          <Switch
            checked={notifySms}
            onChange={(e) => setNotifySms(e.detail.value)}
            color="#ffc300"
          />
        </View>
      </View>

      <View className="bottom-space" />

      {/* 底部保存按钮 */}
      <View className="bottom-bar safe-area-bottom">
        <View className="save-btn" onClick={handleSave}>
          <Text>{isSaving ? '保存中...' : '保存偏好设置'}</Text>
        </View>
      </View>
    </View>
  );
}
