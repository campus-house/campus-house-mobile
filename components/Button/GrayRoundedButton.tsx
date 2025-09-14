import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';

interface GrayRoundedButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  title?: string;
}

export const GrayRoundedButton: React.FC<GrayRoundedButtonProps> = ({
  onPress,
  disabled = false,
  title = '버튼',
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
    height: 53,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
    borderRadius: 800,
    backgroundColor: COLORS.neutral.grey4, // #AAA
  },
  buttonDisabled: {
    backgroundColor: COLORS.neutral.grey3, // 더 어두운 회색
  },
  buttonText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.inverse, // 흰색 텍스트
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: COLORS.text.inverse, // 비활성화 상태에서도 흰색 유지
  },
});
