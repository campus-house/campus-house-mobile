import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { KakaoLoginButton } from '@/components/Button/KakaoLoginButton';
import { NaverLoginButton } from '@/components/Button/NaverLoginButton';
import { GoogleLoginButton } from '@/components/Button/GoogleLoginButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const { height: fullScreenHeight } = Dimensions.get('screen'); // Status Bar 포함 전체 높이

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

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
            <Image
              source={require('@/assets/images/kakao_logo.png')}
              style={styles.kakaoLogo}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>카카오로 로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.naverButton} onPress={handleNaverLogin}>
            <Image
              source={require('@/assets/images/naver_logo.png')}
              style={styles.naverLogo}
              resizeMode="contain"
            />
            <Text style={styles.naverButtonText}>네이버로 로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <Image
              source={require('@/assets/images/google_logo.png')}
              style={styles.googleLogo}
              resizeMode="contain"
            />
            <Text style={styles.googleButtonText}>Google로 로그인</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomLinks}>
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={goToIdLogin}>
            <Text style={styles.linkText}>아이디 로그인</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={goToSignup}>
            <Text style={styles.linkText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    paddingHorizontal: 40,
  },
  flexContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    width: 254.09, // Swift: 254.08981 (정확한 픽셀값)
    height: 42.506, // Swift: 42.50573 (정확한 픽셀값)
    flexShrink: 0, // Swift: frame 고정
    alignSelf: 'center',
    marginTop: screenHeight * (232 / 852), // 공식: (yFigma - statusBarHeight) / (figmaFullHeight - statusBarHeight)
    marginHorizontal: screenWidth * (69.5 / 393), // 좌우 여백: 69.5px / 393px = 17.7%
  },
  buttonContainer: {
    width: 313, // Layer properties: 313px
    flexShrink: 0,
    alignItems: 'center',
    alignSelf: 'center',
    gap: screenHeight * (14 / 852), // 버튼 간 간격 비율: 14px / 852px = 1.64%
    marginTop: screenHeight * (252.494 / 852), // 제목과 버튼 사이 거리: (527 - 232 - 42.506) / 852 = 252.494 / 852
  },
  bottomLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: screenHeight * (761 / 852), // 이미지 위치 정보: 위에서 761px 위치
    left: 0,
    right: 0,
  },
  linkContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: screenWidth * (0 / 393), // Figma 기준: 30px / 393px = 7.6%
  },
  linkText: {
    color: 'rgba(99, 99, 99, 1)', // Swift: Color(red: 0.39, green: 0.39, blue: 0.39)
    fontFamily: 'Pretendard', // Swift: Font.custom("Pretendard", size: 16)
    fontSize: 16, // Swift: size: 16
    fontWeight: '400',
    textAlign: 'center', // Swift: .multilineTextAlignment(.center)
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(99, 99, 99, 1)', // 텍스트와 동일한 색상
    marginHorizontal: 20, // 구분선 자체에는 여백 없음
  },
  kakaoButton: {
    width: 313, // Layer properties: 313px
    height: 57, // Layer properties: 57px
    backgroundColor: '#FFEB3B', // 카카오 노란색 (#FFEB3B)
    borderRadius: 28.5, // 높이의 절반으로 완전한 둥근 모양
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0, // Layer properties: flex-shrink: 0
    position: 'relative', // 절대 위치 자식 요소를 위한 relative
  },
  naverButton: {
    width: 313, // Layer properties: 313px
    height: 57, // Layer properties: 57px
    backgroundColor: '#00C73C', // 네이버 초록색 (Layer properties 색상 반영)
    borderRadius: 28.5, // 높이의 절반으로 완전한 둥근 모양
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0, // Layer properties: flex-shrink: 0
    position: 'relative', // 절대 위치 자식 요소를 위한 relative
  },
  googleButton: {
    width: 313, // Layer properties: 313px
    height: 57, // Layer properties: 57px
    backgroundColor: '#FFFFFF', // 구글 흰색
    borderRadius: 28.5, // 높이의 절반으로 완전한 둥근 모양
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0, // Layer properties: flex-shrink: 0
    position: 'relative', // 절대 위치 자식 요소를 위한 relative
  },
  buttonText: {
    fontSize: 17, // Swift: size: 17
    fontWeight: '600', // Swift: .weight(.semibold)
    color: 'rgba(51, 51, 51, 1)', // Swift: Color(red: 0.2, green: 0.2, blue: 0.2) = rgb(51, 51, 51)
    textAlign: 'center', // Swift: .multilineTextAlignment(.center)
    width: 117, // Swift: width: 117
    height: 22.8, // Swift: height: 22.8
    position: 'absolute',
    left: 120, // 이미지 위치 정보: 로고 영역 다음부터
    top: 17, // 이미지 위치 정보: 위쪽에서 17px
    fontFamily: 'Pretendard', // Swift: Font.custom("Pretendard")
  },
  naverButtonText: {
    fontSize: 17, // Swift: size: 17
    fontWeight: '600', // Swift: .weight(.semibold)
    color: '#FFFFFF', // Swift: .foregroundColor(.white)
    textAlign: 'center', // Swift: .multilineTextAlignment(.center)
    width: 118, // Swift: width: 118
    height: 23, // Swift: height: 23
    position: 'absolute',
    left: 120, // 카카오와 동일한 위치 기준
    top: 17, // 카카오와 동일한 위치 기준
    fontFamily: 'Pretendard', // Swift: Font.custom("Pretendard")
  },
  googleButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    position: 'absolute',
    left: 120, // 카카오와 동일한 위치 기준
    top: 17, // 카카오와 동일한 위치 기준
    fontFamily: 'Pretendard',
  },
  kakaoLogo: {
    width: 42.533, // Swift: 42.53294 (정확한 크기)
    height: 42.533, // Swift: 42.53294 (정확한 크기)
    position: 'absolute',
    left: 21, // 이미지 위치 정보: 왼쪽에서 21px
    top: 7, // 이미지 위치 정보: 위쪽에서 7px
  },
  naverLogo: {
    width: 42.533, // 카카오와 동일한 크기
    height: 42.533,
    position: 'absolute',
    left: 21, // 카카오와 동일한 위치
    top: 7,
  },
  googleLogo: {
    width: 42.533, // 카카오와 동일한 크기
    height: 42.533,
    position: 'absolute',
    left: 21, // 카카오와 동일한 위치
    top: 7,
  },
});
