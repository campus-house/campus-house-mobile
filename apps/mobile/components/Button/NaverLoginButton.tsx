import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { NaverLogo } from './NaverLogo';

interface NaverLoginButtonProps {
  onPress?: () => void;
  disabled?: boolean;
}

export const NaverLoginButton: React.FC<NaverLoginButtonProps> = ({
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <NaverLogo />
        <Text style={styles.buttonText}>네이버로 로그인</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 313,
    height: 57,
    flexShrink: 0,
    backgroundColor: '#00C73C', // 네이버 초록색
    borderRadius: 800, // 매우 둥근 모양
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: COLORS.neutral.grey4, // 비활성화 시 회색
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    width: 118,
    height: 23,
    flexShrink: 0,
    color: COLORS.text.inverse,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 23.62, // 138.939%
  },
});
