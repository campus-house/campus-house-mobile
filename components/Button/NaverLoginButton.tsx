import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image, Dimensions } from 'react-native';
import { COLORS } from '@/constants/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const figmaWidth = 393;
const figmaHeight = 852; // 피그마 전체 높이

interface NaverLoginButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  style?: any;
}

export const NaverLoginButton: React.FC<NaverLoginButtonProps> = ({
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
      <View style={styles.inner} />
      <Text style={styles.buttonText}>네이버로 로그인</Text>
      <Image
        style={styles.naverLogo}
        source={require('@/assets/images/naver_logo.png')}
        resizeMode="cover"
      />
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
  inner: {
    borderRadius: 59, // 기본 둥근 모서리
    left: '0%',
    bottom: '0%',
    right: '0%',
    top: '0%',
    height: '100%',
    position: 'absolute',
    width: '100%',
    backgroundColor: '#00C73C', // Locofy: #00c73c
  },
  buttonText: {
    height: '40.35%',
    width: '37.7%',
    left: '38.34%',
    color: '#FFFFFF', // Locofy: Color.colorWhite
    lineHeight: 24, // Locofy: lineHeight: 24 (픽셀 고정)
    top: '29.82%',
    fontWeight: '600', // Locofy: fontWeight: "600"
    fontSize: 17, // Locofy: fontSize: 17 (픽셀 고정)
    textAlign: 'center',
    fontFamily: 'Pretendard', // Locofy: FontFamily.pretendard
    position: 'absolute',
  },
  naverLogo: {
    marginTop: -21.5, // 기본 로고 위치
    height: 43, // 기본 로고 크기
    left: '6.71%', // Locofy: left: "6.71%"
    right: '79.71%',
    width: '13.58%',
    maxWidth: '100%',
    overflow: 'hidden',
    top: '50%',
    position: 'absolute',
  },
});
