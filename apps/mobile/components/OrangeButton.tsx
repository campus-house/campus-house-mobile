import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface OrangeButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  title?: string;
}

export const OrangeButton: React.FC<OrangeButtonProps> = ({
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
    backgroundColor: COLORS.primary, // #FF805F
  },
  buttonDisabled: {
    backgroundColor: COLORS.neutral.grey4, // #AAAAAA
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: undefined, // normal
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: COLORS.text.inverse, // 비활성화 상태에서도 흰색 유지
  },
});
