import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { BackIcon } from '@/components/Icon/BackIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLayoutScale } from '@/utils/layout';
import { FormInputField } from '@/components/Input/FormInputField';

export default function RegisterScreen() {
  const { y, insets, figma } = useLayoutScale();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation helpers
  const isUserIdDuplicate = useMemo(() => userId === 'im_mio1', [userId]);
  const isUserIdAvailable = useMemo(
    () => userId.length > 0 && !isUserIdDuplicate,
    [userId, isUserIdDuplicate],
  );
  const isPasswordValid = useMemo(
    () => /[a-zA-Z]/.test(password) && /[0-9]/.test(password),
    [password],
  );
  const isPasswordMatch = useMemo(
    () => confirmPassword.length > 0 && password === confirmPassword,
    [password, confirmPassword],
  );
  const isPasswordMismatch = useMemo(
    () => confirmPassword.length > 0 && password !== confirmPassword,
    [password, confirmPassword],
  );
  const isFormValid = isUserIdAvailable && isPasswordValid && isPasswordMatch;

  const handleNext = () => {
    if (!isFormValid) {
      return;
    }
    router.push('/auth/signup/complete');
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + y(65 - figma.SAFE_TOP) }]}
        onPress={() => router.back()}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityLabel="뒤로 가기"
      >
        <BackIcon />
      </TouchableOpacity>

      {/* Progress bar */}
      <View style={[styles.progressContainer, { top: insets.top + y(116 - figma.SAFE_TOP) }]}>
        <View style={styles.progressBar}>
          <View style={styles.progressActive} />
          <View style={styles.progressInactive} />
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{
          paddingTop: insets.top + y(65),
          paddingHorizontal: 35,
          paddingBottom: insets.bottom + 40,
        }}
        keyboardShouldPersistTaps="handled"
      >

      {/* Title */}
      <Text style={styles.title}>회원가입</Text>

      {/* 아이디 */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>아이디</Text>
        <FormInputField
          placeholder="아이디를 입력해주세요"
          value={userId}
          onChangeText={setUserId}
          hasError={userId.length > 0 && isUserIdDuplicate}
          hasSuccess={userId.length > 0 && isUserIdAvailable}
          errorMessage="이미 존재하는 아이디입니다."
          successMessage="사용 가능한 아이디 입니다!"
        />
      </View>

      {/* 비밀번호 */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>비밀번호</Text>
        <FormInputField
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          hasError={password.length > 0 && !isPasswordValid}
          hasSuccess={password.length > 0 && isPasswordValid}
          errorMessage="영문과 숫자만 혼합하여 입력해 주세요"
          successMessage="사용 가능한 비밀번호 입니다!"
          secureTextEntry={true}
        />
      </View>

      {/* 비밀번호 재입력 */}
      <View style={styles.confirmPasswordSection}>
        <FormInputField
          placeholder="비밀번호 재입력"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          hasError={isPasswordMismatch}
          hasSuccess={isPasswordMatch}
          errorMessage="비밀번호가 일치하지 않습니다."
          successMessage="비밀번호가 일치합니다!"
          secureTextEntry={true}
        />
      </View>

      </ScrollView>

      {/* 로그인 버튼 */}
      <TouchableOpacity
        style={[styles.loginButton, isFormValid && styles.loginButtonActive, { marginBottom: insets.bottom + 18 }]}
        activeOpacity={0.8}
        onPress={handleNext}
        disabled={!isFormValid}
      >
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  scrollContainer: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 31,
    zIndex: 10,
    width: 44,
    height: 60,
    padding: 4,
  },
  progressContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 5,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  progressActive: {
    flex: 1,
    height: 3,
    backgroundColor: COLORS.primary,
  },
  progressInactive: {
    flex: 1,
    height: 3,
    backgroundColor: COLORS.neutral.grey2,
  },
  title: {
    color: COLORS.text.primary,
    fontFamily: 'Pretendard',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 34,
    marginTop: 55,
    marginBottom: 52,
  },
  inputSection: {
    marginBottom: 38,
  },
  confirmPasswordSection: {
    marginBottom: 30,
  },
  label: {
    ...TYPOGRAPHY.caption3,
    color: '#AAA',
    marginBottom: 4,
  },
  loginButton: {
    width: 312,
    height: 56,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 20,
    backgroundColor: COLORS.neutral.grey4,
    alignSelf: 'center',
  },
  loginButtonActive: {
    backgroundColor: COLORS.primary,
  },
  loginButtonText: {
    color: COLORS.neutral.white,
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: '700',
  },
});
