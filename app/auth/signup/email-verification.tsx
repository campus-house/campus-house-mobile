import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { COLORS } from '@/constants/colors';
import Svg, { Path } from 'react-native-svg';
import { LoadingModal } from '@/components/Modal/LoadingModal';
import { VerificationCompleteModal } from '@/components/Modal/VerificationCompleteModal';
import { router } from 'expo-router';

export default function EmailVerificationScreen() {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerificationComplete, setIsVerificationComplete] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setKeyboardVisible(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setKeyboardVisible(false);
  };

  const isEmailValid = email.length > 0 && email.includes('@');

  const handleVerify = () => {
    if (isEmailValid) {
      setIsLoading(true);

      // 3초 후에 로딩 완료 (실제로는 API 호출)
      setTimeout(() => {
        setIsLoading(false);
        setIsVerificationComplete(true);

        // 2초 후에 인증 완료 모달 닫기
        setTimeout(() => {
          setIsVerificationComplete(false);
          // 본인인증 페이지로 이동
          router.push('/auth/signup/identity-verification');
        }, 2000);
      }, 3000); // 3초로 설정
    }
  };

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton}>
        <Svg width={13} height={23} viewBox="0 0 13 23" fill="none">
          <Path
            d="M11.6602 2L2.03634 11.3274C1.83148 11.5259 1.834 11.8554 2.04188 12.0508L11.6602 21.0909"
            stroke="#AAAAAA"
            strokeWidth="2.27273"
            strokeLinecap="round"
          />
        </Svg>
      </TouchableOpacity>

      {/* 진행 바 */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressActive} />
          <View style={styles.progressInactive} />
        </View>
      </View>

      {/* 메인 콘텐츠 */}
      <View style={styles.contentContainer}>
        {/* 제목 */}
        <Text style={styles.title}>경희대학교에{'\n'}재학 중임을 인증해주세요.</Text>

        {/* 이메일 입력 섹션 */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>이메일</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={handleEmailChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="이메일 입력"
              placeholderTextColor={COLORS.neutral.grey3}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={[styles.inputUnderline, isFocused && styles.inputUnderlineActive]} />
          </View>
        </View>
      </View>

      {/* 인증하기 버튼 */}
      <TouchableOpacity
        style={[styles.verifyButton, isEmailValid && styles.verifyButtonActive]}
        onPress={handleVerify}
        disabled={!isEmailValid}
      >
        <Text style={[styles.verifyButtonText, isEmailValid && styles.verifyButtonTextActive]}>
          인증하기
        </Text>
      </TouchableOpacity>

      {/* 로딩 모달 */}
      <LoadingModal visible={isLoading} onClose={() => setIsLoading(false)} />

      {/* 인증 완료 모달 */}
      <VerificationCompleteModal
        visible={isVerificationComplete}
        onClose={() => setIsVerificationComplete(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressActive: {
    width: 252,
    height: 3,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
  },
  progressInactive: {
    width: 396,
    height: 3,
    backgroundColor: COLORS.neutral.grey2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    width: 260,
    color: COLORS.text.primary,
    fontFamily: 'Pretendard',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 35,
    marginBottom: 40,
  },
  inputSection: {
    marginBottom: 40,
  },
  label: {
    color: COLORS.neutral.grey4,
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  textInput: {
    width: 300.934,
    color: COLORS.text.primary,
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22.519,
    paddingVertical: 8,
  },
  inputUnderline: {
    width: 308,
    height: 1.5,
    backgroundColor: COLORS.neutral.grey3,
    marginTop: 8,
  },
  inputUnderlineActive: {
    backgroundColor: COLORS.text.primary,
  },
  verifyButton: {
    width: 318,
    height: 56,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 20,
    backgroundColor: COLORS.neutral.grey4,
    marginBottom: 40,
    alignSelf: 'center',
  },
  verifyButtonActive: {
    backgroundColor: COLORS.primary,
  },
  verifyButtonText: {
    color: COLORS.text.inverse,
    fontFamily: 'Pretendard',
    fontSize: 16.5,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 16.5,
  },
  verifyButtonTextActive: {
    color: COLORS.text.inverse,
  },
});
