import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '@/constants/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface LoginButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  title?: string;
  enabled?: boolean; // 입력 상태에 따른 활성화
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  onPress,
  disabled = false,
  title = '로그인하기',
  enabled = true, // 기본값은 활성화
}) => {
  const isButtonEnabled = enabled && !disabled;

  return (
    <TouchableOpacity
      style={[styles.button, !isButtonEnabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={!isButtonEnabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, !isButtonEnabled && styles.buttonTextDisabled]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: screenWidth * (-158.5 / 393), // Locofy: marginLeft: -158.5px
    top: screenHeight * (426 / 852), // Locofy: top: 426px
    borderRadius: 15, // Locofy: borderRadius: 15px
    backgroundColor: COLORS.primary, // 활성화시 오렌지색
    width: 318, // Locofy: width: 318px (픽셀 고정)
    height: 56, // Locofy: height: 56px (픽셀 고정)
    left: '50%', // Locofy: left: "50%"
    position: 'absolute',
    padding: 8, // Locofy: padding: 8
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonDisabled: {
    backgroundColor: COLORS.neutral.grey4, // 비활성화시 회색
  },
  buttonText: {
    fontWeight: '700', // Locofy: fontWeight: "700"
    color: COLORS.neutral.white, // Locofy: Color.colorWhite → #FFFFFF
    fontFamily: 'Pretendard', // Locofy: FontFamily.pretendard
    fontSize: 17, // Locofy: fontSize: 17
    textAlign: 'left',
  },
  buttonTextDisabled: {
    color: COLORS.neutral.white, // 비활성화 상태에서도 흰색 유지
  },
});
