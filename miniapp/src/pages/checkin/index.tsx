import { View, Text, Image, Textarea } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import './index.scss';

export default function CheckinPage() {
  const [posterStyle, setPosterStyle] = useState<'polaroid' | 'stamp' | 'minimal'>('polaroid');
  const [ugcText, setUgcText] = useState(
    '插画展比预期更好看！强烈推荐二层小众展区。门口扫码有免费音频讲解，旁边洗手间人少不用排队。'
  );
  const [isPublished, setIsPublished] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '出游打卡与账单' });
  });

  const styles = [
    { key: 'polaroid', label: '拍立得' },
    { key: 'stamp', label: '手账风' },
    { key: 'minimal', label: '极简' },
  ];

  const bill = [
    { name: '悦美术馆门票 (4人学生票)', total: '¥80.00' },
    { name: '往返拼车费 (4人均摊)', total: '¥32.00' },
    { name: '聚宝源铜锅涮肉 (团购套餐)', total: '¥158.00' },
  ];

  const handlePublish = () => {
    if (isPublished) return;
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
      Taro.showToast({ title: '发布成功！¥10券已到账', icon: 'success' });
    }, 800);
  };

  return (
    <View className="checkin-page">
      {/* 头部总结 */}
      <View className="page-header">
        <Text className="header-title">行程结束 · 足迹与账单</Text>
        <Text className="header-sub">北航 4 人小队 #089 已完成行程</Text>
      </View>

      {/* 手账海报卡片 */}
      <View className="card-box">
        <View className="box-title-row">
          <Text className="box-title">出游手账海报</Text>
          <View className="style-tabs">
            {styles.map((s) => (
              <View
                key={s.key}
                className={`style-tab ${posterStyle === s.key ? 'active' : ''}`}
                onClick={() => setPosterStyle(s.key as any)}
              >
                <Text>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 居中固定比例海报容器，不失真 */}
        <View className={`poster-card ${posterStyle}`}>
          <Image
            className="poster-img"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3RtfReYXTSt-YYbG6mKioyxMtNwnimqMBrDD-Fhdu7t34jGza080Ln79n6VChXSUvCE_85od3saGW6npTxwtst264Qmym08Pm0FaG1ooD4V6SYIRNs8flbDOhfjjWUd1heETVdeyL27qMfSZuseVxQdRSoPKP087UYnqP8zxHDUlSagXmSjAvczreFvY0BztYsN12Lqs1LoceJsAg57rZhFC09LLtcrR1rUf-GtvfAsr7uL0oMJu4"
            mode="aspectFill"
          />
          <View className="poster-bottom-stamp">
            <Text className="stamp-title">798 艺术区 · 悦美术馆</Text>
            <Text className="stamp-meta">2026.10.18 · 北航 4 人先锋队</Text>
          </View>
        </View>

        <View
          className="save-poster-btn"
          onClick={() => Taro.showToast({ title: '已保存至相册', icon: 'success' })}
        >
          <Text>保存海报到相册</Text>
        </View>
      </View>

      {/* 奖励通知 */}
      <View className="coupon-banner">
        <Text className="coupon-icon">🎁</Text>
        <Text className="coupon-text">同步体验心得至大众点评，可获美团 ¥10 外卖券</Text>
      </View>

      {/* 点评评价输入 */}
      <View className="card-box">
        <View className="box-title-row">
          <Text className="box-title">真实体验与避坑建议</Text>
          <Text className="char-count">{ugcText.length}/140</Text>
        </View>

        <Textarea
          className="review-input"
          value={ugcText}
          onInput={(e: any) => setUgcText(e.detail.value)}
          maxlength={140}
          placeholder="写下真实的体验与避坑贴士..."
        />

        <View className="tags-row">
          {['#高校周末去哪玩', '#798艺术展', '#铜锅涮肉'].map((tag) => (
            <View key={tag} className="tag-item">
              <Text>{tag}</Text>
            </View>
          ))}
        </View>

        <View
          className={`publish-btn ${isPublished ? 'published' : ''}`}
          onClick={handlePublish}
        >
          <Text>{isPublishing ? '同步中...' : isPublished ? '已同步至大众点评' : '同步至大众点评'}</Text>
        </View>
      </View>

      {/* AA 账单 */}
      <View className="card-box">
        <Text className="box-title">本次出游 AA 消费结清</Text>

        <View className="bill-items">
          {bill.map((item, i) => (
            <View key={i} className="bill-row">
              <Text className="bill-name">{item.name}</Text>
              <Text className="bill-val">{item.total}</Text>
            </View>
          ))}
        </View>

        <View className="bill-total-bar">
          <View>
            <Text className="total-label">团队总额：</Text>
            <Text className="total-num">¥270.00</Text>
          </View>
          <View className="per-person-block">
            <Text className="per-label">每人已付：</Text>
            <Text className="per-val">¥67.5</Text>
          </View>
        </View>
      </View>

      <View style={{ height: '40rpx' }} />
    </View>
  );
}
