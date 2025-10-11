import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

type ChipItem = { id: string; label: string };

export default function ReviewPointsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const incomingRating = Number(params.rating ?? 0);
  const [content, setContent] = useState('');
  const maxLen = 100;

  const goodItems: ChipItem[] = [
    { id: 'near_station', label: '역과 가까워요' },
    { id: 'near_school', label: '학교와 가까워요' },
    { id: 'facilities', label: '편의시설' },
    { id: 'wifi', label: '와이파이' },
    { id: 'parking', label: '주차장' },
    { id: 'elevator', label: '엘리베이터' },
    { id: 'clean', label: '깨끗해요' },
    { id: 'no_bug', label: '벌레가 안나와요' },
    { id: 'sunny', label: '채광이 좋아요' },
    { id: 'cheap', label: '가성비' },
    { id: 'quiet', label: '소음이 적어요' },
    { id: 'secure', label: '보안이 철저해요' },
  ];

  const badItems: ChipItem[] = [
    { id: 'far_station', label: '역과 멀어요' },
    { id: 'far_school', label: '학교와 멀어요' },
    { id: 'far_facilities', label: '편의시설이 멀어요' },
    { id: 'wifi_bad', label: '와이파이 X' },
    { id: 'parking_bad', label: '주차장 X' },
    { id: 'elevator_bad', label: '엘리베이터 X' },
    { id: 'old', label: '오래됐어요' },
    { id: 'bug_many', label: '벌레가 많아요' },
    { id: 'humid', label: '습해요' },
    { id: 'expensive', label: '비싸요' },
    { id: 'noisy', label: '소음이 있어요' },
    { id: 'insecure', label: '보안이 안좋아요' },
  ];

  const [selectedGood, setSelectedGood] = useState<Set<string>>(new Set());
  const [selectedBad, setSelectedBad] = useState<Set<string>>(new Set());

  // 완료 활성화 조건: 좋은점 1개 이상, 아쉬운점 1개 이상, 50자 이상
  const isReady =
    content.length >= 50 &&
    content.length <= maxLen &&
    selectedGood.size > 0 &&
    selectedBad.size > 0;

  const toggleGood = (id: string) => {
    setSelectedGood(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };
  const toggleBad = (id: string) => {
    setSelectedBad(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* 상단 타이틀 */}
        <Text style={styles.titleWrap}>
          <Text style={styles.titleOrange}>느꼈던 점</Text>
          <Text style={styles.titleGray}>을 골라주세요</Text>
        </Text>

        {/* 이런 점이 좋았어요 */}
        <Text style={[styles.sectionTitle, { marginTop: 40 }]}>이런 점이 좋았어요</Text>
        {/* 칩 그룹 placeholder - 이미지/아이콘 공간만 확보 */}
        <View style={styles.chipsWrap}>
          {goodItems.map(item => {
            const isSelected = selectedGood.has(item.id);
            return (
              <TouchableOpacity key={item.id} style={[styles.chip, isSelected && styles.chipSelected]} activeOpacity={0.8} onPress={() => toggleGood(item.id)}>
                <Image source={iconFor(item.id)} style={styles.icon} />
                <Text style={styles.chipText}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 이런 점이 아쉬워요 */}
        <Text style={[styles.sectionTitle, { marginTop: 44 }]}>이런 점이 아쉬워요</Text>
        <View style={styles.chipsWrap}>
          {badItems.map(item => {
            const isSelected = selectedBad.has(item.id);
            return (
              <TouchableOpacity key={item.id} style={[styles.chip, isSelected && styles.chipSelected]} activeOpacity={0.8} onPress={() => toggleBad(item.id)}>
                <Image source={iconFor(item.id)} style={styles.icon} />
                <Text style={styles.chipText}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 텍스트 입력 영역 */}
        <View style={styles.textBox}>
          <TextInput
            style={styles.input}
            multiline
            maxLength={maxLen}
            placeholder="솔직한 후기를 작성해주세요. (최소 50자 이상)"
            placeholderTextColor="#aaa"
            value={content}
            onChangeText={setContent}
          />
          <Text style={styles.counter}>{content.length}/{maxLen}자</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.footerButton, isReady && styles.footerButtonActive]}
        activeOpacity={0.8}
        onPress={() => {
          if (!isReady) return;
          router.push({
            pathname: '/mypage/review_success',
            params: {
              content,
              rating: String(incomingRating),
            },
          });
        }}
      >
        <Text style={styles.footerButtonText}>완료</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const iconFor = (id: string) => {
  switch (id) {
    case 'near_station':
    case 'far_station':
      return require('@/assets/images/🚊.png');
    case 'near_school':
    case 'far_school':
      return require('@/assets/images/🏫.png');
    case 'facilities':
    case 'far_facilities':
      return require('@/assets/images/🏪.png');
    case 'wifi':
    case 'wifi_bad':
      return require('@/assets/images/🛜.png');
    case 'parking':
    case 'parking_bad':
      return require('@/assets/images/🅿️.png');
    case 'elevator':
    case 'elevator_bad':
      return require('@/assets/images/🛗.png');
    case 'clean':
      return require('@/assets/images/🫧.png');
    case 'no_bug':
    case 'bug_many':
      return require('@/assets/images/🐜.png');
    case 'sunny':
      return require('@/assets/images/🔅.png');
    case 'cheap':
    case 'expensive':
      return require('@/assets/images/💵.png');
    case 'quiet':
    case 'noisy':
      return require('@/assets/images/👂.png');
    case 'secure':
    case 'insecure':
      return require('@/assets/images/👮_♂️.png');
    case 'old':
      return require('@/assets/images/🏚️.png');
    case 'humid':
      return require('@/assets/images/🌧️.png');
    default:
      return require('@/assets/images/🛜.png');
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  titleWrap: {
    width: 240,
    marginTop: 42,
    marginLeft: 24,
    fontSize: 23,
    lineHeight: 30,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    textAlign: 'left',
  },
  titleGray: { color: '#323232' },
  titleOrange: { color: '#ff805f' },
  sectionTitle: {
    width: 'auto',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
    marginTop: 20,
    marginLeft: 24,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 32,
  },
  chip: {
    backgroundColor: '#f2f2f2',
    borderRadius: 18,
    paddingHorizontal: 10,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    maxWidth: '100%',
  },
  chipSelected: {
    backgroundColor: 'rgba(255, 128, 95, 0.14)',
  },
  icon: { width: 16, height: 16, marginRight: 6, resizeMode: 'contain' },
  chipText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    color: '#323232',
    flexShrink: 1,
  },
  chipTextSelected: {},
  textBox: {
    height: 221,
    marginHorizontal: 24,
    marginTop: 50,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    position: 'relative',
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 15,
    color: '#323232',
    fontFamily: 'Pretendard',
  },
  counter: {
    position: 'absolute',
    right: 12,
    bottom: 8,
    fontSize: 15,
    color: '#cdcdcd',
    fontFamily: 'Pretendard',
  },
  footerButton: {
    height: 57,
    backgroundColor: '#aaa',
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonActive: { backgroundColor: '#ff805f' },
  footerButtonText: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#fff',
  },
});


