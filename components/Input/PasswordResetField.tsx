import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

interface PasswordResetFieldProps {
  initialPassword?: string;
}

export const PasswordResetField: React.FC<PasswordResetFieldProps> = ({ initialPassword = '' }) => {
  const [password, setPassword] = useState(initialPassword);
  const [showLastChar, setShowLastChar] = useState(false);

  // 비밀번호 유효성 검사 (영문과 숫자 혼합)
  const checkPasswordValidity = (pwd: string) => {
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    return hasLetter && hasNumber && pwd.length >= 8;
  };

  const isPasswordValid = checkPasswordValidity(password);
  const dotCount = Math.max(0, password.length - 1); // 마지막 글자 제외한 점 개수
  const lastChar = password.length > 0 ? password[password.length - 1] : '';

  // 2초 후 마지막 글자를 점으로 숨기는 타이머
  useEffect(() => {
    if (showLastChar && lastChar) {
      const timer = setTimeout(() => {
        setShowLastChar(false);
      }, 2000); // 2초

      return () => clearTimeout(timer);
    }
  }, [showLastChar, lastChar]);

  // 키 입력 처리
  const handleKeyPress = (key: string) => {
    setPassword((prev) => prev + key);
    setShowLastChar(true);
  };

  // 삭제 처리
  const handleDelete = () => {
    if (password.length > 0) {
      setPassword((prev) => prev.slice(0, -1));
      // 삭제 후에도 마지막 글자가 있다면 다시 보여주기
      if (password.length > 1) {
        setShowLastChar(true);
      } else {
        setShowLastChar(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* 비밀번호 입력 필드 */}
      <View style={styles.passwordField}>
        {/* 검은색 점들 (이전 글자들) */}
        <View style={styles.dotsContainer}>
          {[...Array(dotCount)].map((_, index) => (
            <Svg key={index} width="9" height="9" viewBox="0 0 9 9" fill="none">
              <Circle cx="4.02813" cy="4.49981" r="4.02813" fill={COLORS.neutral.black} />
            </Svg>
          ))}
        </View>

        {/* 마지막 입력 문자 */}
        {showLastChar && lastChar && <Text style={styles.koreanChar}>{lastChar}</Text>}
      </View>

      {/* 구분선 */}
      <View
        style={[
          styles.divider,
          { backgroundColor: isPasswordValid ? COLORS.sub.green : COLORS.primary },
        ]}
      />

      {/* 메시지 */}
      <Text
        style={[styles.message, { color: isPasswordValid ? COLORS.sub.green : COLORS.primary }]}
      >
        {isPasswordValid ? '사용가능한 비밀번호입니다!' : '영문과 숫자를 혼합하여 입력해주세요.'}
      </Text>

      {/* 테스트용 키보드 (실제로는 별도 키보드 컴포넌트 사용) */}
      <View style={styles.testKeyboard}>
        <View style={styles.keyRow}>
          {['1', '2', '3', '4', '5'].map((key) => (
            <TouchableOpacity key={key} style={styles.testKey} onPress={() => handleKeyPress(key)}>
              <Text style={styles.testKeyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.keyRow}>
          {['a', 'b', 'c', 'd', 'e'].map((key) => (
            <TouchableOpacity key={key} style={styles.testKey} onPress={() => handleKeyPress(key)}>
              <Text style={styles.testKeyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.deleteKey} onPress={handleDelete}>
          <Text style={styles.deleteKeyText}>삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  passwordField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 3.34,
    marginRight: 8,
  },
  koreanChar: {
    width: 301,
    height: 21,
    flexShrink: 0,
    color: COLORS.neutral.black,
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'left',
  },
  divider: {
    width: 308,
    height: 1.5,
    marginBottom: 12,
  },
  message: {
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  testKeyboard: {
    marginTop: 20,
  },
  keyRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  testKey: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.neutral.grey2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  testKeyText: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteKey: {
    width: 80,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  deleteKeyText: {
    color: COLORS.text.inverse,
    fontSize: 14,
    fontWeight: '600',
  },
});
