import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

interface LoginButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  title?: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  onPress,
  disabled = false,
  title = '로그인',
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    width: 318,
    height: 56,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
    borderRadius: 800, // 매우 둥근 모양
    backgroundColor: COLORS.primary, // #FF805F
  },
  buttonDisabled: {
    backgroundColor: COLORS.neutral.grey4, // #AAAAAA
  },
  buttonText: {
    color: COLORS.text.inverse,
    fontFamily: 'Pretendard',
    fontSize: 16.5,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: undefined, // normal
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: COLORS.text.inverse, // 비활성화 상태에서도 흰색 유지
  },
});
