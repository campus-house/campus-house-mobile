import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { KakaoLogo } from './KakaoLogo';

interface KakaoLoginButtonProps {
  onPress?: () => void;
  disabled?: boolean;
}

export const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({
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
        <KakaoLogo />
        <Text style={styles.buttonText}>카카오로 로그인</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 313,
    height: 57,
    flexShrink: 0,
    backgroundColor: '#FFEB3B', // 카카오 노란색
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
    width: 117,
    height: 22.8,
    flexShrink: 0,
    color: '#323232',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 23.62, // 138.939%
  },
});
