import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@/constants/colors';
import { router } from 'expo-router';

export default function SignupCompleteScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/auth/login');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={[styles.view, styles.viewBg]}>
        {/* 체크 아이콘 컨테이너 */}
        <View style={styles.view2}>
          <View style={[styles.child, styles.childPosition]} />
          {/* 흰색 체크 (새 SVG) */}
          <Svg style={styles.checkIcon} width={32} height={24} viewBox="0 0 32 24" fill="none">
            <Path
              d="M2.11719 10.1428L13.2334 20.5998L29.5604 2.30005"
              stroke="white"
              strokeWidth={3.69854}
              strokeLinecap="round"
            />
          </Svg>
        </View>

        {/* 회원가입 완료 텍스트 */}
        <Text style={[styles.text, styles.textTypo1]}>회원가입 완료</Text>

        {/* 메인 환영 메시지 */}
        <Text style={[styles.text2, styles.textTypo1]}>회원이 되신 걸 환영해요!</Text>

        {/* 너구리 이미지 (racoon-real) */}
        <Image
          source={require('@/assets/images/racoon-real.png')}
          style={styles.raccoon}
          resizeMode="contain"
        />

        {/* 말풍선 ('반가워요!') */}
        <View style={styles.speechContainer}>
          {/* 말풍선 원형 */}
          <Svg width={140} height={70} viewBox="0 0 125 66" fill="none">
            <Path
              d="M99.5 0C113.583 0 125 11.4167 125 25.5C125 39.5833 113.583 51 99.5 51H96.3691L78.7734 65.4863C76.8809 67.0442 74.304 64.8052 75.0557 62.2559L78.375 51H25.5C11.4167 51 0 39.5833 0 25.5C0 11.4167 11.4167 0 25.5 0H99.5Z"
              fill="#FCFCFC"
            />
            <Path
              d="M96.3691 51V50.1286H96.0566L95.8153 50.3272L96.3691 51ZM78.7734 65.4863L79.3273 66.1591L79.3273 66.1591L78.7734 65.4863ZM75.0557 62.2559L74.2198 62.0094L74.2198 62.0094L75.0557 62.2559ZM78.375 51L79.2108 51.2465L79.5405 50.1286H78.375V51ZM99.5 0V0.871429C113.102 0.871429 124.129 11.898 124.129 25.5H125H125.871C125.871 10.9355 114.065 -0.871429 99.5 -0.871429V0ZM125 25.5H124.129C124.129 39.102 113.102 50.1286 99.5 50.1286V51V51.8714C114.065 51.8714 125.871 40.0645 125.871 25.5H125ZM99.5 51V50.1286H96.3691V51V51.8714H99.5V51ZM96.3691 51L95.8153 50.3272L78.2196 64.8136L78.7734 65.4863L79.3273 66.1591L96.923 51.6728L96.3691 51ZM78.7734 65.4863L78.2196 64.8135C77.6571 65.2766 77.0174 65.2078 76.4945 64.7535C75.9538 64.2836 75.6164 63.4355 75.8915 62.5023L75.0557 62.2559L74.2198 62.0094C73.7433 63.6255 74.3185 65.1716 75.3514 66.0691C76.4022 66.9821 77.9973 67.2539 79.3273 66.1591L78.7734 65.4863ZM75.0557 62.2559L75.8915 62.5023L79.2108 51.2465L78.375 51L77.5392 50.7535L74.2198 62.0094L75.0557 62.2559ZM78.375 51V50.1286H25.5V51V51.8714H78.375V51ZM25.5 51V50.1286C11.898 50.1286 0.871429 39.102 0.871429 25.5H0H-0.871429C-0.871429 40.0645 10.9355 51.8714 25.5 51.8714V51ZM0 25.5H0.871429C0.871429 11.898 11.898 0.871429 25.5 0.871429V0V-0.871429C10.9355 -0.871429 -0.871429 10.9355 -0.871429 25.5H0ZM25.5 0V0.871429H99.5V0V-0.871429H25.5V0Z"
              fill="#F2F2F2"
            />
          </Svg>

          <Text style={styles.speechText}>반가워요!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewBg: {
    backgroundColor: '#fff',
    flex: 1,
  },
  textTypo1: {
    textAlign: 'left',
    fontFamily: 'Pretendard',
    left: '50%',
    position: 'absolute',
  },
  childPosition: {
    top: '50%',
    position: 'absolute',
  },
  unionLayout: {
    height: 66,
    width: 125,
  },
  textTypo: {
    fontSize: 17,
    textAlign: 'left',
    fontWeight: '600',
  },
  timeFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  areaFlexBox: {
    flex: 1,
    height: 44,
  },
  barPosition: {
    width: 3,
    backgroundColor: '#000',
    borderRadius: 1,
    top: '50%',
    left: '50%',
    position: 'absolute',
  },
  view: {
    height: 852,
    overflow: 'hidden',
    width: '100%',
  },
  raccoon: {
    position: 'absolute',
    bottom: -535,
    left: -540,
    width: 1386,
    height: 1298,
    transform: [{ rotate: '20.818deg' }],
  },
  text: {
    marginLeft: -48.5,
    top: 198,
    fontSize: 18,
    lineHeight: 27.2,
    color: '#ff805f',
    fontWeight: '600',
    textAlign: 'left',
  },
  homeIndicatorLightOnDark: {
    top: 818,
    left: 0,
    width: 393,
    height: 34,
    position: 'absolute',
  },
  homeIndicator: {
    marginLeft: -66.5,
    bottom: 8,
    borderRadius: 100,
    backgroundColor: '#636363',
    width: 134,
    height: 5,
    left: '50%',
    position: 'absolute',
  },
  view2: {
    top: 121,
    left: 168,
    borderRadius: 73,
    width: 55,
    height: 53,
    position: 'absolute',
  },
  checkIcon: {
    position: 'absolute',
    top: 18,
    left: 12,
  },
  speechContainer: {
    position: 'absolute',
    top: 365,
    left: 85,
    width: 160,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    zIndex: 2,
  },
  speechText: {
    position: 'absolute',
    top: 22,
    left: 0,
    right: 0,
    color: '#636363',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
  child: {
    marginTop: -26.19,
    right: '0%',
    left: '0%',
    borderRadius: 277,
    backgroundColor: '#ff805f',
    height: 55,
    width: '100%',
  },
  item: {
    height: '34.79%',
    width: '49.91%',
    top: '34.79%',
    right: '25.1%',
    bottom: '30.42%',
    left: '24.99%',
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'absolute',
    overflow: 'hidden',
  },
  unionParent: {
    display: 'none',
  },
  safeAreaViewText: {
    marginLeft: -31.5,
    top: 17,
    lineHeight: 16,
    color: '#636363',
    fontFamily: 'Pretendard',
    fontSize: 17,
    left: '50%',
    position: 'absolute',
  },
  text2: {
    marginLeft: -115.5,
    top: 230,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '500',
    color: '#323232',
  },
});
