import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ChatRewardModal from '@/components/ChatRewardModal';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ReviewSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const content = (params.content as string) || '';
  const rating = Number(params.rating ?? 0);
  const [showReward, setShowReward] = useState(false);
  const today = new Date();
  const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(
    today.getDate()
  ).padStart(2, '0')}`;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <LinearGradient
        colors={['#ffe8de', '#ffffff']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} style={{ marginRight: 15 }}>
          {/* X 아이콘 자리에 에셋 연결 필요 시 교체 */}
          <Text style={{ fontSize: 20, color: '#323232' }}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <Text style={styles.title}>후기가 등록되었어요!</Text>
        <Text style={[styles.subtitle, { marginTop: 10 }]}>소중한 후기가 많은 사람들에게 도움이 될 거예요</Text>
      </View>

      <View style={[styles.card, { marginTop: 174 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.avatar}>
            <Image source={require('@/assets/images/racoon-real.png')} style={styles.avatarImg} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.name}>방미오</Text>
            <Text style={styles.status}>현재 거주중</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>

        <View style={{ height: 10 }} />
        <View style={styles.starsRow}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Image
              key={idx}
              source={rating > idx ? require('@/assets/images/yellowstarone.png') : require('@/assets/images/graystarone.png')}
              style={{ width: 18, height: 18, marginRight: 6 }}
            />
          ))}
          <Text style={[styles.date, { marginLeft: 8 }]}>{dateStr}</Text>
        </View>
        <View style={{ height: 12 }} />
        <Text style={styles.review}>{content}</Text>
      </View>

      <TouchableOpacity style={[styles.footerButton, { marginTop: 220 }]} activeOpacity={0.8} onPress={() => setShowReward(true)}>
        <Text style={styles.footerButtonText}>등록 완료</Text>
      </TouchableOpacity>

      {showReward && (
        <ChatRewardModal
          visible={showReward}
          onClose={() => { setShowReward(false); router.back(); }}
          titleText={`후기를 작성했어요!`}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingHorizontal: 20, paddingTop: 4, alignItems: 'flex-end' },
  title: {
    width: 208,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
  },
  subtitle: {
    width: 282,
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Pretendard',
    color: '#636363',
    textAlign: 'left',
    marginTop: 6,
  },
  card: {
    backgroundColor: '#f3f3f3',
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    padding: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#86d382',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: {
    width: 223,
    height: 223,
    resizeMode: 'contain',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -90 }, { translateY: -99 }],
  },
  name: {
    width: 39,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'center',
  },
  status: {
    width: 51,
    fontSize: 11,
    lineHeight: 22,
    fontFamily: 'Pretendard',
    color: '#aaa',
    textAlign: 'left',
  },
  date: {
    width: 55,
    fontSize: 11,
    lineHeight: 16,
    fontFamily: 'Pretendard',
    color: '#aaa',
    textAlign: 'left',
  },
  review: {
    width: 280,
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
  },
  starsRow: { flexDirection: 'row', alignItems: 'center' },
  starFilled: { color: '#ffc107', fontSize: 16, marginRight: 4 },
  starEmpty: { color: '#d9d9d9', fontSize: 16, marginRight: 4 },
  footerButton: {
    height: 57,
    backgroundColor: '#ff805f',
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonText: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#fff',
  },
  rewardDim: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardBox: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  rewardMascot: { width: 260, height: 260, resizeMode: 'contain', marginBottom: 8 },
  rewardTitle: {
    marginTop: 0,
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  rewardSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#ededed',
  },
  rewardButton: {
    marginTop: 18,
    backgroundColor: '#ff805f',
    borderRadius: 16,
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  rewardButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});


