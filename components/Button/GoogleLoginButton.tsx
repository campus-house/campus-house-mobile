import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image, Dimensions } from 'react-native';
import { COLORS } from '@/constants/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const figmaWidth = 393;
const figmaHeight = 852; // 피그마 전체 높이

interface GoogleLoginButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  style?: any;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
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
      <View style={styles.rectangleView} />
      <Text style={styles.buttonText}>Google로 로그인</Text>
      <Image
        style={styles.googleLogo}
        source={require('@/assets/images/google_logo.png')}
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
  rectangleView: {
    borderRadius: 59, // 기본 둥근 모서리
    left: '0%',
    bottom: '0%',
    right: '0%',
    top: '0%',
    height: '100%',
    position: 'absolute',
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#F2F2F2', // Locofy: Color.colorWhitesmoke
    borderWidth: 1,
    backgroundColor: '#FFFFFF', // Locofy: Color.colorWhite
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
    width: '40.73%',
    left: '36.74%',
  },
  googleLogo: {
    marginTop: -18.5, // 기본 로고 위치
    width: '10.38%',
    right: '81.31%',
    left: '8.31%',
    height: 35, // 기본 로고 크기
    maxWidth: '100%',
    overflow: 'hidden',
    top: '50%',
    position: 'absolute',
  },
});
