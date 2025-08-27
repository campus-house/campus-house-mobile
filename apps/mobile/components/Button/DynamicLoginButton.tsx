import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface DynamicLoginButtonProps {
  onPress?: () => void;
  isActive: boolean; // 아이디와 비밀번호가 모두 입력되었는지 여부
  title?: string;
}

export const DynamicLoginButton: React.FC<DynamicLoginButtonProps> = ({
  onPress,
  isActive = false,
  title = '로그인하기',
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.buttonActive]}
      onPress={onPress}
      disabled={!isActive}
      activeOpacity={isActive ? 0.8 : 1}
    >
      <Text style={[styles.buttonText, isActive && styles.buttonTextActive]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 318,
    height: 56,
    borderRadius: 800, // 매우 둥근 모양
    backgroundColor: COLORS.neutral.grey4, // 기본 상태: 회색
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  buttonActive: {
    backgroundColor: COLORS.primary, // 활성화 상태: 주황색
  },
  buttonText: {
    color: COLORS.text.inverse, // 기본 상태: 흰색
    fontFamily: 'Pretendard',
    fontSize: 16.5,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonTextActive: {
    color: COLORS.text.inverse, // 활성화 상태: 흰색 (동일)
  },
});
