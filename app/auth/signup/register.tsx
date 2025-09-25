import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/colors';
import Svg, { Path } from 'react-native-svg';

export default function RegisterScreen() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isUserIdFocused, setIsUserIdFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);

  // Validation helpers
  const isUserIdDuplicate = useMemo(() => userId === 'rex2354', [userId]);
  const isUserIdAvailable = useMemo(
    () => userId.length > 0 && !isUserIdDuplicate,
    [userId, isUserIdDuplicate],
  );
  const isPasswordValid = useMemo(
    () => /[a-zA-Z]/.test(password) && /[0-9]/.test(password),
    [password],
  );
  const isConfirmMatch = useMemo(
    () => confirmPassword.length > 0 && confirmPassword === password,
    [confirmPassword, password],
  );

  const isFormValid = isUserIdAvailable && isPasswordValid && isConfirmMatch;

  const handleNext = () => {
    if (!isFormValid) {
      return;
    }
    router.push('/signup-complete');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        activeOpacity={0.7}
      >
        <Svg width={10} height={19.091} viewBox="0 0 13 23" fill="none">
          <Path
            d="M11 2L1.37618 11.3274C1.17132 11.5259 1.17384 11.8554 1.38173 12.0508L11 21.0909"
            stroke="#AAAAAA"
            strokeWidth={2.27273}
            strokeLinecap="round"
          />
        </Svg>
      </TouchableOpacity>

      {/* Top progress bar: left half orange, right half grey */}
      <View style={styles.progressRow}>
        <View style={styles.progressLeft} />
        <View style={styles.progressRight} />
      </View>

      {/* Title */}
      <Text style={styles.title}>회원가입</Text>

      {/* 아이디 */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>아이디</Text>
        <TextInput
          value={userId}
          onChangeText={setUserId}
          onFocus={() => setIsUserIdFocused(true)}
          onBlur={() => setIsUserIdFocused(false)}
          placeholder={isUserIdFocused || userId ? '' : '아이디를 입력해주세요'}
          placeholderTextColor={COLORS.neutral.grey3}
          style={[styles.textInput]}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View
          style={[
            styles.inputUnderline,
            (isUserIdFocused || userId) && styles.inputUnderlineFocused,
          ]}
        />
        {userId.length > 0 && (
          <View style={styles.helperContainer}>
            {isUserIdDuplicate ? (
              <Text style={styles.helperError}>이미 존재하는 아이디입니다.</Text>
            ) : (
              <Text style={styles.helperSuccess}>사용 가능한 아이디 입니다!</Text>
            )}
          </View>
        )}
      </View>

      {/* 비밀번호 */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          placeholder={isPasswordFocused || password ? '' : '비밀번호'}
          placeholderTextColor={COLORS.neutral.grey3}
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="oneTimeCode"
          autoComplete="off"
        />
        <View
          style={[
            styles.inputUnderline,
            (isPasswordFocused || password) && styles.inputUnderlineFocused,
          ]}
        />
        {password.length > 0 && (
          <View style={styles.helperContainer}>
            {isPasswordValid ? (
              <Text style={styles.helperSuccess}>사용 가능한 비밀번호 입니다!</Text>
            ) : (
              <Text style={styles.helperError}>영문과 숫자만 혼합하여 입력해 주세요</Text>
            )}
          </View>
        )}
      </View>

      {/* 비밀번호 재입력 */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>비밀번호 확인</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onFocus={() => setIsConfirmFocused(true)}
          onBlur={() => setIsConfirmFocused(false)}
          placeholder={isConfirmFocused || confirmPassword ? '' : '비밀번호 재입력'}
          placeholderTextColor={COLORS.neutral.grey3}
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="oneTimeCode"
          autoComplete="off"
        />
        <View
          style={[
            styles.inputUnderline,
            (isConfirmFocused || confirmPassword) && styles.inputUnderlineFocused,
          ]}
        />
        {confirmPassword.length > 0 && !isConfirmMatch && (
          <View style={styles.helperContainer}>
            <Text style={styles.helperError}>비밀번호가 일치하지 않습니다!</Text>
          </View>
        )}
      </View>

      {/* 로그인 버튼 */}
      <TouchableOpacity
        style={[styles.loginButton, isFormValid && styles.loginButtonActive]}
        activeOpacity={0.8}
        onPress={handleNext}
        disabled={!isFormValid}
      >
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 80,
  },
  backButton: {
    position: 'absolute',
    top: 76,
    left: 28,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 10,
    height: 19.091,
    flexShrink: 0,
  },
  progressRow: {
    width: '100%',
    height: 3,
    flexDirection: 'row',
    marginTop: 50,
  },
  progressLeft: {
    width: '70%',
    height: 3,
    backgroundColor: COLORS.primary,
  },
  progressRight: {
    width: '30%',
    height: 3,
    backgroundColor: COLORS.neutral.grey2,
  },
  title: {
    color: COLORS.text.primary,
    fontFamily: 'Pretendard',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 34,
    marginTop: 32,
    marginBottom: 40,
  },
  inputSection: {
    marginBottom: 30,
  },
  label: {
    color: COLORS.neutral.grey4,
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 8,
  },
  textInput: {
    color: COLORS.text.primary,
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontWeight: '400',
    lineHeight: 22.5,
    paddingVertical: 8,
  },
  inputUnderline: {
    width: '100%',
    height: 1.5,
    backgroundColor: COLORS.neutral.grey3,
    marginTop: 8,
  },
  inputUnderlineFocused: {
    backgroundColor: COLORS.text.primary,
  },
  helperContainer: {
    marginTop: 6,
  },
  helperError: {
    color: COLORS.primary,
    fontFamily: 'Pretendard',
    fontSize: 13,
    lineHeight: 22,
  },
  helperSuccess: {
    color: '#86D382',
    fontFamily: 'Pretendard',
    fontSize: 13,
    lineHeight: 22,
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: COLORS.neutral.grey4,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 140,
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
