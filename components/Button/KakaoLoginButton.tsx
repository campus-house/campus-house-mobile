import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '@/constants/colors';
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
    justifyContent: 'flex-start', // 왼쪽 정렬로 변경
    paddingLeft: 21, // 왼쪽 패딩 21px (Layer properties 반영)
    paddingTop: 7, // 위쪽 패딩 7px (Layer properties 반영)
    paddingBottom: 7.47, // 아래쪽 패딩 7.47px (Layer properties 반영)
    gap: 8,
  },

  buttonText: {
    width: 117,
    height: 22.8,
    flexShrink: 0,
    color: COLORS.neutral.black,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 23.62, // 138.939%
  },
});
