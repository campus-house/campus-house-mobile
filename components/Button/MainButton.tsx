import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS } from '@/constants/colors';

interface LoginButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  title?: string;
  style?: StyleProp<ViewStyle>;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  onPress,
  disabled = false,
  title = '버튼',
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled, style]}
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
    width: '100%',
    height: 56,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    marginHorizontal: 0,
  },
  buttonDisabled: {
    backgroundColor: COLORS.neutral.grey4,
  },
  buttonText: {
    fontWeight: '700',
    color: COLORS.neutral.white,
    fontFamily: 'Pretendard',
    fontSize: 17,
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: COLORS.neutral.white,
  },
});

export default LoginButton;
