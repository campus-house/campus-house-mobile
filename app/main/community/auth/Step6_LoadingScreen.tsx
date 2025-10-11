import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import { BackIcon } from '@/components/Icon/BackIcon';

export default function Step6_LoadingScreen() {
  const [currentYear, setCurrentYear] = useState(0);
  const [showHedgehog, setShowHedgehog] = useState(false);

  useEffect(() => {
    // 타임라인 애니메이션
    const timer1 = setTimeout(() => setCurrentYear(1), 1500);
    const timer2 = setTimeout(() => setCurrentYear(2), 3000);
    
    // 고슴도치 화면으로 전환
    const timer3 = setTimeout(() => {
      setShowHedgehog(true);
    }, 4500);
    
    // 최종 완료 화면으로 이동
    const timer4 = setTimeout(() => {
      router.replace('/main/community/auth/Step7_CompletionScreen');
    }, 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  if (showHedgehog) {
    // 고슴도치 화면
    return (
      <View style={styles.container}>
        <View style={styles.verificationCompleteModal}>
          {/* 불러오는 중 텍스트와 점 */}
          <View style={styles.completeLoadingTextContainer}>
            <Text style={styles.completeLoadingText}>불러오는 중</Text>
            <View style={styles.completeLoadingDotsContainer}>
              <Svg width="4" height="4" viewBox="0 0 4 4" fill="none">
                <Circle cx="1.8968" cy="1.57258" r="1.57258" fill="#FF805F" />
              </Svg>
              <Svg width="4" height="4" viewBox="0 0 4 4" fill="none" style={{ marginLeft: 4 }}>
                <Circle cx="1.8968" cy="1.57258" r="1.57258" fill="#FF805F" />
              </Svg>
              <Svg width="4" height="4" viewBox="0 0 4 4" fill="none" style={{ marginLeft: 4 }}>
                <Circle cx="1.8968" cy="1.57258" r="1.57258" fill="#FF805F" />
              </Svg>
            </View>
          </View>

          {/* 잠시만 기다려주세요 */}
          <Text style={styles.completeWarningText}>잠시만 기다려주세요!</Text>

          {/* 고슴도치 이미지 */}
          <Image
            source={require('@/assets/images/hedgehog.png')}
            style={styles.hedgehogImage}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }

  // 타임라인 화면
  return (
    <View style={styles.container}>
      <View style={styles.loadingModal}>
        {/* 뒤로가기 버튼 */}
        <TouchableOpacity
          style={styles.loadingBackButton}
          onPress={() => router.back()}
        >
          <BackIcon />
        </TouchableOpacity>

        {/* 제목 */}
        <Text style={styles.loadingHeaderTitle}>간편 인증하기</Text>

        {/* 불러오는 중 텍스트와 점 */}
        <View style={styles.loadingTextContainer}>
          <Text style={styles.loadingText}>불러오는 중</Text>
          <View style={styles.loadingDotsContainer}>
            <Svg width="5" height="4" viewBox="0 0 5 4" fill="none">
              <Circle cx="2.47883" cy="2.07258" r="1.57258" fill="#FF805F" />
            </Svg>
            <Svg width="5" height="4" viewBox="0 0 5 4" fill="none" style={{ marginLeft: 4 }}>
              <Circle cx="2.47883" cy="2.07258" r="1.57258" fill="#FF805F" />
            </Svg>
            <Svg width="5" height="4" viewBox="0 0 5 4" fill="none" style={{ marginLeft: 4 }}>
              <Circle cx="2.47883" cy="2.07258" r="1.57258" fill="#FF805F" />
            </Svg>
          </View>
        </View>

        {/* 페이지를 벗어나지 말아주세요 */}
        <Text style={styles.loadingWarningText}>페이지를 벗어나지 말아주세요!</Text>

        {/* 타임라인 */}
        <View style={styles.timelineContainer}>
          {/* 2019 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineIconContainer}>
              {currentYear === 0 ? (
                <>
                  <Svg
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                    fill="none"
                    style={{ position: 'absolute' }}
                  >
                    <Circle cx="15.5" cy="15.5" r="14.26" stroke="#FF805F" strokeWidth="2.48" />
                  </Svg>
                  <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <Circle cx="9.3" cy="9.3" r="9.3" fill="#FF805F" />
                  </Svg>
                </>
              ) : (
                <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <Circle cx="8.5007" cy="8.7546" r="8.2546" fill="#FF805F" />
                </Svg>
              )}
            </View>
            <Text style={[styles.timelineYear, currentYear === 0 && styles.timelineYearActive]}>
              2019
            </Text>
          </View>

          {/* 점선 */}
          <View style={styles.timelineDots}>
            {[0, 1, 2].map((i) => (
              <Svg
                key={`dots1-${i}`}
                width="5"
                height="5"
                viewBox="0 0 5 5"
                fill="none"
                style={{ marginVertical: 2 }}
              >
                <Circle
                  cx="2.5939"
                  cy="2.32242"
                  r="2.00015"
                  fill={currentYear >= 1 ? '#FF805F' : '#CDCDCD'}
                />
              </Svg>
            ))}
          </View>

          {/* 2021 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineIconContainer}>
              {currentYear === 1 ? (
                <>
                  <Svg
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                    fill="none"
                    style={{ position: 'absolute' }}
                  >
                    <Circle cx="15.5" cy="15.5" r="14.26" stroke="#FF805F" strokeWidth="2.48" />
                  </Svg>
                  <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <Circle cx="9.3" cy="9.3" r="9.3" fill="#FF805F" />
                  </Svg>
                </>
              ) : currentYear > 1 ? (
                <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <Circle cx="8.5007" cy="8.7546" r="8.2546" fill="#FF805F" />
                </Svg>
              ) : (
                <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <Circle cx="8.5007" cy="8.7546" r="8.2546" fill="#CDCDCD" />
                </Svg>
              )}
            </View>
            <Text style={[styles.timelineYear, currentYear === 1 && styles.timelineYearActive]}>
              2021
            </Text>
          </View>

          {/* 점선 */}
          <View style={styles.timelineDots}>
            {[0, 1, 2].map((i) => (
              <Svg
                key={`dots2-${i}`}
                width="5"
                height="5"
                viewBox="0 0 5 5"
                fill="none"
                style={{ marginVertical: 2 }}
              >
                <Circle
                  cx="2.5939"
                  cy="2.50015"
                  r="2.00015"
                  fill={currentYear >= 2 ? '#FF805F' : '#CDCDCD'}
                />
              </Svg>
            ))}
          </View>

          {/* 2025 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineIconContainer}>
              {currentYear === 2 ? (
                <>
                  <Svg
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                    fill="none"
                    style={{ position: 'absolute' }}
                  >
                    <Circle cx="15.5" cy="15.5" r="14.26" stroke="#FF805F" strokeWidth="2.48" />
                  </Svg>
                  <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <Circle cx="9.3" cy="9.3" r="9.3" fill="#FF805F" />
                  </Svg>
                </>
              ) : (
                <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <Circle cx="8.5007" cy="8.7546" r="8.2546" fill="#CDCDCD" />
                </Svg>
              )}
            </View>
            <Text style={[styles.timelineYear, currentYear === 2 && styles.timelineYearActive]}>
              2025
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingModal: {
    width: 393,
    height: 852,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingTop: 0,
  },
  loadingBackButton: {
    position: 'absolute',
    left: 20,
    top: 70,
    padding: 8,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  loadingHeaderTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 78,
    color: '#323232',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 17.76,
    textAlign: 'center',
  },
  loadingTextContainer: {
    position: 'absolute',
    left: 37,
    top: 180,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FF805F',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 22,
    marginRight: 8,
  },
  loadingDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingWarningText: {
    position: 'absolute',
    left: 37,
    top: 235,
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 30,
    paddingTop: 5,
  },
  timelineContainer: {
    position: 'absolute',
    left: 37,
    top: 320,
    alignItems: 'flex-start',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineIconContainer: {
    width: 31,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  timelineYear: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 21,
  },
  timelineYearActive: {
    fontWeight: '700',
  },
  timelineDots: {
    marginLeft: 12,
    marginVertical: 8,
  },
  verificationCompleteModal: {
    width: 393,
    height: 852,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingTop: 0,
    alignItems: 'center',
  },
  completeLoadingTextContainer: {
    position: 'absolute',
    left: 37,
    top: 200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completeLoadingText: {
    color: '#FF805F',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 22,
    marginRight: 8,
  },
  completeLoadingDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completeWarningText: {
    position: 'absolute',
    left: 37,
    top: 250,
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 24.706,
    fontWeight: '600',
    lineHeight: 30,
    paddingTop: 5,
  },
  hedgehogImage: {
    position: 'absolute',
    width: 300,
    height: 200,
    bottom: 100,
  },
});