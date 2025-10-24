import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function ReviewScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [rating, setRating] = useState<number>(0);
  const [isTypeOpen, setIsTypeOpen] = useState<boolean>(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>('거주 유형을 선택해 주세요');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('거주 기간을 선택해 주세요');
  const [typeSelectY, setTypeSelectY] = useState<number>(0);
  const [periodSelectY, setPeriodSelectY] = useState<number>(0);
  
  // 하단바 완전히 제거 (독립적인 화면)
  useFocusEffect(
    React.useCallback(() => {
      const parent = navigation.getParent?.();
      if (parent) {
        parent.setOptions({
          tabBarStyle: {
            display: 'none',
            height: 0,
            opacity: 0,
            position: 'absolute',
            bottom: -1000
          }
        });
      }
      return () => {
        // 복원하지 않음 - 후기 작성 페이지는 독립적
      };
    }, [navigation])
  );
  const [scrollY, setScrollY] = useState<number>(0);
  const isReady = rating > 0 && selectedType !== '거주 유형을 선택해 주세요' && selectedPeriod !== '거주 기간을 선택해 주세요';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      {/* Header back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Svg width={14} height={24} viewBox="0 0 10 18" fill="none">
            <Path d="M8.5 1.5L1.5 9l7 7.5" stroke="#AAAAAA" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
      </View>

      {(isTypeOpen || isPeriodOpen) && (
        <>
          <TouchableOpacity style={styles.globalDim} activeOpacity={1} onPress={() => { setIsTypeOpen(false); setIsPeriodOpen(false); }} />
          {/* floating dropdown over the whole screen to remain bright */}
          {isTypeOpen && (
            <View style={[styles.dropdownPanel, { top: typeSelectY + 560 - scrollY }]}> 
              <TouchableOpacity style={styles.dropdownRow} onPress={() => { setSelectedType('아파트'); setIsTypeOpen(false); }}>
                <Text style={styles.dropdownText}>아파트</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.dropdownRow} onPress={() => { setSelectedType('오피스텔'); setIsTypeOpen(false); }}>
                <Text style={styles.dropdownText}>오피스텔</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.dropdownRow} onPress={() => { setSelectedType('빌라'); setIsTypeOpen(false); }}>
                <Text style={styles.dropdownText}>빌라</Text>
              </TouchableOpacity>
            </View>
          )}
          {isPeriodOpen && (
            <View style={[styles.dropdownPanel, { top: periodSelectY + 560 - scrollY }]}> 
              <TouchableOpacity style={styles.dropdownRow} onPress={() => { setSelectedPeriod('2025년까지'); setIsPeriodOpen(false); }}>
                <Text style={styles.dropdownText}>2025년까지</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.dropdownRow} onPress={() => { setSelectedPeriod('2024년까지'); setIsPeriodOpen(false); }}>
                <Text style={styles.dropdownText}>2024년까지</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.dropdownRow} onPress={() => { setSelectedPeriod('2023년 이전'); setIsPeriodOpen(false); }}>
                <Text style={styles.dropdownText}>2023년 이전</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false} onScroll={(e)=>setScrollY(e.nativeEvent.contentOffset.y)} scrollEventThrottle={16}>
        {/* Title */}
        <Text style={styles.titleWrap}>
          <Text style={styles.titleGray}>{`내가 사는 곳의\n`}</Text>
          <Text style={styles.titleOrange}>후기</Text>
          <Text style={styles.titleGray}>를 남겨주세요!</Text>
        </Text>

        {/* Search gray bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchPlaceholder}>내가 거주하고 있는 주소 찾기</Text>
          <Image source={require('@/assets/images/find.png')} style={styles.findIcon} resizeMode="contain" />
        </View>

        {/* Map image */}
        <View style={styles.mapCard}>
          <Image source={require('@/assets/images/iparkmap.png')} style={styles.mapImage} resizeMode="cover" />
          {/* Orange circle behind pin */}
          <Image source={require('@/assets/images/orangecircle.png')} style={styles.orangeCircle} resizeMode="contain" />
          {/* Darker inner circle */}
          <View style={styles.orangeCircleInner} />
          {/* Orange pin */}
          <Image source={require('@/assets/images/Group 1171280950.png')} style={styles.orangePin} resizeMode="contain" />
          <TouchableOpacity style={styles.addressBtn} activeOpacity={0.8}>
            <Text style={styles.addressBtnText}>주소변경</Text>
          </TouchableOpacity>
        </View>

        {/* Satisfaction block */}
        <View style={styles.satisfactionBlock}>
          <Text style={styles.satisfactionTitle}>만족도</Text>
          <View style={styles.starsContainer}>
            {[1,2,3,4,5].map((i) => (
              <TouchableOpacity key={i} onPress={() => setRating(i)}>
                <Image
                  source={ rating >= i ? require('@/assets/images/yellowstarone.png') : require('@/assets/images/graystarone.png') }
                  style={styles.star}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* 거주 유형 */}
          <Text style={styles.fieldLabel}>거주 유형</Text>
          <TouchableOpacity
            style={[styles.selectFrame, isTypeOpen && styles.selectFrameActive]}
            onPress={() => setIsTypeOpen((v) => !v)}
            activeOpacity={0.8}
            onLayout={(e) => setTypeSelectY(e.nativeEvent.layout.y)}
          >
            <Text style={[styles.selectPlaceholder, selectedType !== '거주 유형을 선택해 주세요' && { color: '#323232' }]}>{selectedType}</Text>
            <View style={[styles.chevronDown, isTypeOpen && { transform: [{ rotate: '180deg' }] }]}>
              <Svg width={14} height={7} viewBox="0 0 14 7" fill="none">
                <Path d="M1 1l6 5 6-5" stroke="#AAA" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </View>
          </TouchableOpacity>

          {isTypeOpen && null}

          {/* 거주 기간 */}
          <Text style={[styles.fieldLabel, { marginTop: 25 }]}>거주 기간</Text>
          <TouchableOpacity style={[styles.selectFrame]} onPress={() => setIsPeriodOpen((v)=>!v)} activeOpacity={0.8} onLayout={(e)=>setPeriodSelectY(e.nativeEvent.layout.y)}>
            <Text style={[styles.selectPlaceholder, selectedPeriod !== '거주 기간을 선택해 주세요' && { color: '#323232' }]}>{selectedPeriod}</Text>
            <View style={[styles.chevronDown, isPeriodOpen && { transform: [{ rotate: '180deg' }] }]}>
              <Svg width={14} height={7} viewBox="0 0 14 7" fill="none">
                <Path d="M1 1l6 5 6-5" stroke="#AAA" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </View>
          </TouchableOpacity>

          {/* 완료 버튼 (회색 배경 안) */}
          <TouchableOpacity style={[styles.footerButton, isReady && styles.footerButtonActive]} activeOpacity={0.8} onPress={() => { if (isReady) router.push({ pathname: '/main/mypage/review_points', params: { rating: String(rating) } }); }}>
            <Text style={styles.footerButtonText}>완료</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', position: 'relative' },
  header: { height: 44, justifyContent: 'center', paddingHorizontal: 16 },
  backBtn: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },

  titleWrap: {
    width: 220,
    marginTop: 12,
    marginLeft: 34,
    fontSize: 23,
    lineHeight: 31,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    textAlign: 'left',
  },
  titleGray: { color: '#323232' },
  titleOrange: { color: '#ff805f' },

  searchBar: {
    marginTop: 18,
    marginHorizontal: 34,
    height: 55,
    backgroundColor: '#f2f2f2',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  searchPlaceholder: {
    flex: 1,
    width: 182,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    color: '#aaa',
    textAlign: 'left',
  },
  findIcon: { width: 22, height: 22, tintColor: '#aaa' },

  mapCard: {
    marginTop: -22,
    marginHorizontal: 34,
    height: 210,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f3f3f3',
    position: 'relative',
    marginBottom: 40,
  },
  mapImage: { width: '100%', height: '100%' },
  orangeCircle: {
    position: 'absolute',
    width: 85,
    height: 85,
    left: '50%',
    top: 46,
    marginLeft: -47.5,
  },
  orangePin: {
    position: 'absolute',
    width: 31,
    height: 31,
    left: '50%',
    top: 56,
    marginLeft: -20.5,
  },
  orangeCircleInner: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ff805f',
    opacity: 0.25,
    left: '50%',
    top: 64,
    marginLeft: -31,
  },
  addressBtn: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  addressBtnText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#636363',
  },

  satisfactionBlock: {
    marginTop: -16,
    backgroundColor: '#f6f6f6',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 34,
    marginHorizontal: 0,
    minHeight: 700,
  },
  satisfactionTitle: {
    width: 'auto',
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 140,
  },
  starsRow: { height: 16 },
  starsContainer: {
    flexDirection: 'row',
    gap: 14,
    alignSelf: 'center',
    marginTop: 12,
  },
  star: { width: 31, height: 31 },

  fieldLabel: {
    width: 63,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#636363',
    textAlign: 'left',
    height: 21,
    marginTop: 33,
    marginLeft: 10,
  },
  selectFrame: {
    width: '100%',
    height: 53,
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 26,
    paddingRight: 20,
    marginTop: 23,
  },
  selectFrameActive: {
    position: 'relative',
    zIndex: 1002,
  },
  selectPlaceholder: {
    width: 170,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    color: '#cdcdcd',
    textAlign: 'left',
    height: 23,
    flex: 1,
  },
  chevronDown: { width: 14, height: 7 },

  dim: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.14)',
    zIndex: 1000,
  },
  dropdownPanel: {
    position: 'absolute',
    left: 24,
    right: 24,
    top: 420,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    zIndex: 1200,
  },
  globalDim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.14)',
    zIndex: 800,
  },
  dropdownRow: {
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  dropdownText: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Pretendard',
    color: '#323232',
  },
  separator: { height: 1, backgroundColor: '#f2f2f2', marginHorizontal: 14 },

  footerButton: {
    height: 57,
    backgroundColor: '#aaa',
    borderRadius: 20,
    marginHorizontal: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 214,
  },
  footerButtonText: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#fff',
    textAlign: 'center',
  },
  footerButtonActive: {
    backgroundColor: '#ff805f',
  },
});


