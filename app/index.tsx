import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';
import { KakaoLoginButton } from '@/components/Button/KakaoLoginButton';
import { NaverLoginButton } from '@/components/Button/NaverLoginButton';
import { GoogleLoginButton } from '@/components/Button/GoogleLoginButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// 피그마 기준: 393 × 852 (전체 화면)
// Dimensions.get('window')는 Status Bar/Home Indicator 제외된 실제 콘텐츠 영역
const figmaWidth = 393;
const figmaHeight = 852; // 피그마 전체 높이와 비교

export default function LoginScreen() {
  const insets = useSafeAreaInsets();

  const handleKakaoLogin = () => {
    // 카카오 로그인 처리
    console.log('카카오 로그인');
  };

  const handleNaverLogin = () => {
    // 네이버 로그인 처리
    console.log('네이버 로그인');
  };

  const handleGoogleLogin = () => {
    // 구글 로그인 처리
    console.log('구글 로그인');
  };

  const goToIdLogin = () => {
    // 아이디 로그인 화면으로 이동
    router.push('/auth/login');
  };

  const goToSignup = () => {
    // 회원가입 화면으로
    router.push('/auth/signup');
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image
          source={require('@/assets/images/app_title.png')}
          style={styles.title}
          resizeMode="contain"
        />

        <KakaoLoginButton style={styles.kakaoButton} onPress={handleKakaoLogin} />
        <NaverLoginButton style={styles.naverButton} onPress={handleNaverLogin} />
        <GoogleLoginButton style={styles.googleButton} onPress={handleGoogleLogin} />
      </View>

      <View style={styles.bottomLinks}>
        <TouchableOpacity onPress={goToIdLogin} style={styles.idLoginLink}>
          <Text style={styles.linkText}>아이디 로그인</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={goToSignup} style={styles.signupLink}>
          <Text style={styles.linkText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    paddingHorizontal: 0, // Locofy: 패딩 제거하고 절대 위치 사용
  },
  flexContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    width: screenWidth * (254 / figmaWidth), // 254/393 비율로 반응형
    height: screenHeight * (43 / figmaHeight), // 43/852 비율로 반응형
    flexShrink: 0,
    alignSelf: 'center',
    marginTop: screenHeight * (232 / figmaHeight), // 232/852 비율로 반응형
    marginHorizontal: screenWidth * (69.5 / figmaWidth), // 69.5/393 비율로 반응형
  },
  bottomLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: screenHeight * (761 / figmaHeight), // 761/852 비율로 반응형 - 측정값 기준 정확한 위치
    left: 0,
    right: 0,
    width: '100%',
  },
  idLoginLink: {
    position: 'absolute',
    right: '50%', // 구분선 기준 오른쪽 절반
    marginRight: screenWidth * (30 / figmaWidth), // 30/393 비율로 반응형
  },
  signupLink: {
    position: 'absolute',
    left: '50%', // 구분선 기준 왼쪽 절반
    marginLeft: screenWidth * (30 / figmaWidth), // 30/393 비율로 반응형
  },
  linkText: {
    color: '#636363', // Locofy: rgba(99, 99, 99, 1)
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22, // Locofy: lineHeight: 22
  },
  divider: {
    width: screenWidth * (1 / figmaWidth), // 1/393 비율로 반응형
    height: screenHeight * (16 / figmaHeight), // 16/852 비율로 반응형
    backgroundColor: COLORS.neutral.grey4, // 구분선 색상: #AAAAAA
    position: 'absolute',
    left: '50%', // 화면 정중앙
    marginLeft: screenWidth * (-0.5 / figmaWidth), // -0.5/393 비율로 반응형
  },
  kakaoButton: {
    position: 'absolute',
    top: screenHeight * (527 / figmaHeight), // 527/852 비율로 반응형
    left: screenWidth * (40 / figmaWidth), // 40/393 비율로 반응형
    height: screenHeight * (57 / figmaHeight), // 57/852 비율로 반응형
    width: screenWidth * (313 / figmaWidth), // 313/393 비율로 반응형
  },
  naverButton: {
    position: 'absolute',
    top: screenHeight * (598 / figmaHeight), // 598/852 비율로 반응형
    left: screenWidth * (40 / figmaWidth), // 40/393 비율로 반응형
    height: screenHeight * (57 / figmaHeight), // 57/852 비율로 반응형
    width: screenWidth * (313 / figmaWidth), // 313/393 비율로 반응형
  },
  googleButton: {
    position: 'absolute',
    top: screenHeight * (669 / figmaHeight), // 669/852 비율로 반응형
    left: screenWidth * (40 / figmaWidth), // 40/393 비율로 반응형
    height: screenHeight * (57 / figmaHeight), // 57/852 비율로 반응형
    width: screenWidth * (313 / figmaWidth), // 313/393 비율로 반응형
  },
  buttonText: {
    fontSize: 17, // Locofy: fontSize: 17 (픽셀 고정)
    fontWeight: '600', // Locofy: fontWeight: "600"
    color: '#323232', // Locofy: #323232
    textAlign: 'center',
    width: 117, // Locofy: width: 117 (픽셀 고정)
    height: 23, // Locofy: height: 23 (픽셀 고정)
    position: 'absolute',
    left: 120, // Locofy: left: 120 (픽셀 고정)
    top: 17, // Locofy: top: 17 (픽셀 고정)
    fontFamily: 'Pretendard',
    lineHeight: 24, // Locofy: lineHeight: 24 (픽셀 고정)
  },
  naverButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF', // Locofy: #fff
    textAlign: 'center',
    width: 118, // Locofy: width: 118 (픽셀 고정)
    height: 23, // Locofy: height: 23 (픽셀 고정)
    position: 'absolute',
    left: 120, // Locofy: left: 120 (픽셀 고정)
    top: 17, // Locofy: top: 17 (픽셀 고정)
    fontFamily: 'Pretendard',
    lineHeight: 24, // Locofy: lineHeight: 24 (픽셀 고정)
  },
  googleButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    position: 'absolute',
    left: 120, // Locofy: left: 120 (픽셀 고정)
    top: 17, // Locofy: top: 17 (픽셀 고정)
    fontFamily: 'Pretendard',
    lineHeight: 24, // Locofy: lineHeight: 24 (픽셀 고정)
  },
  kakaoLogo: {
    width: 42.533, // Locofy: 42.533 (픽셀 고정)
    height: 43, // Locofy: height: 43 (픽셀 고정)
    position: 'absolute',
    left: '6.71%', // Locofy: left: "6.71%" (비율로 반응형)
    top: 7, // Locofy: top: 7 (픽셀 고정)
  },
  naverLogo: {
    width: 42.533, // Locofy: 42.533 (픽셀 고정)
    height: 43, // Locofy: height: 43 (픽셀 고정)
    position: 'absolute',
    left: '6.71%', // Locofy: left: "6.71%" (비율로 반응형)
    top: 7, // Locofy: top: 7 (픽셀 고정)
  },
  googleLogo: {
    width: 35, // Locofy: width: 35 (픽셀 고정)
    height: 35, // Locofy: height: 35 (픽셀 고정)
    position: 'absolute',
    left: '8.31%', // Locofy: left: "8.31%" (비율로 반응형)
    top: 11, // Locofy: marginTop: -18.5 + 29.5 = 11 (픽셀 고정)
  },
});
