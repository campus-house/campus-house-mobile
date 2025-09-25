import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image, Dimensions } from 'react-native';
import { COLORS } from '@/constants/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const figmaWidth = 393;
const figmaHeight = 852; // 피그마 전체 높이

interface KakaoLoginButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  style?: any;
}

export const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({
  onPress,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.item} />
      <Image
        style={styles.kakaoLogo}
        source={require('@/assets/images/kakao_logo.png')}
        resizeMode="cover"
      />
      <Text style={styles.buttonText}>카카오로 로그인</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 57, // 기본 크기
    width: 313, // 기본 크기
    position: 'relative',
  },
  buttonDisabled: {
    backgroundColor: COLORS.neutral.grey4,
  },
  item: {
    borderRadius: 59, // 기본 둥근 모서리
    left: '0%',
    bottom: '0%',
    right: '0%',
    top: '0%',
    height: '100%',
    position: 'absolute',
    width: '100%',
    backgroundColor: '#FFEB3B', // Locofy: #ffeb3b
  },
  kakaoLogo: {
    left: '6.71%', // Locofy: left: "6.71%"
    right: '79.71%',
    width: '13.58%',
    height: 43, // 기본 로고 크기
    maxWidth: '100%',
    overflow: 'hidden',
    top: 7, // 기본 로고 위치
    position: 'absolute',
  },
  buttonText: {
    color: '#323232', // Locofy: Color.colorDarkslategray
    height: '40%',
    fontWeight: '600', // Locofy: fontWeight: "600"
    lineHeight: 24, // Locofy: lineHeight: 24 (픽셀 고정)
    fontSize: 17, // Locofy: fontSize: 17 (픽셀 고정)
    top: '29.82%',
    textAlign: 'center',
    fontFamily: 'Pretendard', // Locofy: FontFamily.pretendard
    position: 'absolute',
    marginLeft: -36.5, // 기본 텍스트 위치
    width: 117, // 기본 텍스트 너비
    left: '50%',
  },
});
