import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export const PasswordResetSuccess: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* 제목 */}
      <Text style={styles.title}>비밀번호 재설정 성공</Text>
      
      {/* 비밀번호 입력 필드 */}
      <View style={styles.passwordField}>
        {/* 검은색 점들 */}
        <View style={styles.dotsContainer}>
          {[...Array(8)].map((_, index) => (
            <Svg key={index} width="9" height="9" viewBox="0 0 9 9" fill="none">
              <Circle cx="4.02813" cy="4.49981" r="4.02813" fill="#323232" />
            </Svg>
          ))}
        </View>
      </View>
      
      {/* 초록색 구분선 */}
      <View style={styles.divider} />
      
      {/* 성공 메시지 */}
      <Text style={styles.successMessage}>
        사용가능한 비밀번호입니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    color: '#3F3A2F',
    fontFamily: 'Pretendard',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: undefined,
    marginBottom: 30,
  },
  passwordField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 3.34,
  },
  divider: {
    width: 308,
    height: 1.5,
    backgroundColor: '#86D382',
    marginBottom: 12,
  },
  successMessage: {
    color: '#86D382',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'center',
  },
});
