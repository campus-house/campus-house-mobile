// 인증요청 버튼
// 비활성 상태: 반투명 주황색 배경 + 주황색 텍스트
// 활성 상태: 진한 주황색 배경 + 흰색 텍스트
// 사용 위치: identity-verification.tsx (휴대폰 인증 섹션)
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '@/constants/colors';

interface VerifyRequestButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  isRequested?: boolean; // 이미 요청했는지 여부 (재요청 텍스트 표시용)
  style?: ViewStyle;
}

export const VerifyRequestButton: React.FC<VerifyRequestButtonProps> = ({
  onPress,
  disabled = false,
  isRequested = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, !disabled && styles.buttonActive, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.8}
    >
      <Text style={[styles.buttonText, !disabled && styles.buttonTextActive]}>
        {isRequested ? '재요청' : '인증요청'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 40,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 128, 95, 0.10)',
  },
  buttonActive: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.primary,
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
  },
  buttonTextActive: {
    color: COLORS.text.inverse,
  },
});

