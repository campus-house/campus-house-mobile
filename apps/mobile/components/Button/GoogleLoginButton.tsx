import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { GoogleLogo } from './GoogleLogo';

interface GoogleLoginButtonProps {
  onPress?: () => void;
  disabled?: boolean;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
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
        <GoogleLogo />
        <Text style={styles.buttonText}>Google로 로그인</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 313,
    height: 57,
    flexShrink: 0,
    backgroundColor: COLORS.neutral.white, // Color/화이트
    borderWidth: 1,
    borderColor: COLORS.neutral.grey2, // Color/그레이 2
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
    width: 127.519,
    height: 22.8,
    flexShrink: 0,
    color: COLORS.neutral.black, // Color/조사병단 블랙
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 23.62, // 138.939%
  },
});
