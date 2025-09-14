import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { COLORS } from '@/constants/colors';
import Svg, { Path } from 'react-native-svg';

export default function RegisterScreen() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUserIdFocused, setIsUserIdFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [isUserIdError, setIsUserIdError] = useState(false);
  const [isUserIdSuccess, setIsUserIdSuccess] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isPasswordSuccess, setIsPasswordSuccess] = useState(false);
  const [showLastChar, setShowLastChar] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  const [showConfirmLastChar, setShowConfirmLastChar] = useState(false);

  const isFormValid =
    userId.length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword &&
    !isPasswordError &&
    !isConfirmPasswordError;

  // 비밀번호 검증 함수
  const checkPasswordValidity = (pwd: string) => {
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    return hasLetter && hasNumber;
  };

  const handleLogin = () => {
    if (isFormValid) {
      // 아이디 중복 검사 (임시로 'im_mio1'을 중복 아이디로 처리)
      if (userId === 'im_mio1') {
        setIsUserIdError(true);
        setIsUserIdSuccess(false);
        return;
      }

      // 사용 가능한 아이디
      setIsUserIdSuccess(true);
      setIsUserIdError(false);

      // 회원가입 로직
      console.log('회원가입 완료');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton}>
        <Svg width="10" height="19.091" viewBox="0 0 10 19.091" fill="none">
          <Path
            d="M8.5 1L1 9.5455L8.5 18.091"
            stroke={COLORS.neutral.grey4}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>

      {/* 진행률 표시줄 */}
      <View style={styles.progressBar}>
        <View style={styles.progressBarActive} />
        <View style={styles.progressBarInactive} />
      </View>

      {/* 제목 */}
      <Text style={styles.title}>회원가입</Text>

      {/* 아이디 입력 */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>아이디</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.textInput,
              (isUserIdFocused || userId.length > 0) && styles.textInputFocused,
            ]}
            value={userId}
            onChangeText={(text) => {
              setUserId(text);
              if (isUserIdError) {
                setIsUserIdError(false);
              }
              if (isUserIdSuccess) {
                setIsUserIdSuccess(false);
              }
            }}
            onFocus={() => setIsUserIdFocused(true)}
            onBlur={() => setIsUserIdFocused(false)}
            placeholder={isUserIdFocused || userId.length > 0 ? '' : '아이디를 입력해주세요'}
            placeholderTextColor={COLORS.neutral.grey3}
            autoCapitalize="none"
            keyboardType="default"
          />
          <View
            style={[
              styles.inputUnderline,
              isUserIdFocused && styles.inputUnderlineFocused,
              isUserIdSuccess && styles.inputUnderlineSuccess,
            ]}
          />
        </View>

        {/* 아이디 오류 메시지 */}
        {isUserIdError && <Text style={styles.userIdErrorText}>이미 존재하는 아이디입니다.</Text>}

        {/* 아이디 성공 메시지 */}
        {isUserIdSuccess && <Text style={styles.userIdSuccessText}>사용 가능한 아이디입니다!</Text>}
      </View>

      {/* 비밀번호 입력 */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>비밀번호</Text>
        <View style={styles.inputContainer}>
          <View style={styles.passwordInputContainer}>
            {password.length > 0 && (
              <View style={styles.passwordDisplay}>
                {password.split('').map((char, index) => {
                  if (index === password.length - 1 && showLastChar) {
                    return (
                      <Text key={index} style={styles.passwordLastChar}>
                        {char}
                      </Text>
                    );
                  } else {
                    return (
                      <View key={index} style={styles.passwordDot}>
                        <Svg width="8.056" height="8.056" viewBox="0 0 9 9" fill="none">
                          <circle cx="4.02813" cy="4.49981" r="4.02813" fill="#323232" />
                        </Svg>
                      </View>
                    );
                  }
                })}
              </View>
            )}
            <TextInput
              style={[
                styles.passwordTextInput,
                (isPasswordFocused || password.length > 0) && styles.passwordTextInputFocused,
              ]}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                const isValid = checkPasswordValidity(text);
                setIsPasswordError(!isValid && text.length > 0);
                setIsPasswordSuccess(isValid && text.length > 0);
                // 비밀번호 재입력 필드의 오류 상태도 업데이트
                if (confirmPassword.length > 0) {
                  setIsConfirmPasswordError(confirmPassword !== text);
                }
                if (text.length > 0) {
                  setShowLastChar(true);
                  setTimeout(() => setShowLastChar(false), 2000);
                }
              }}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              placeholder={isPasswordFocused || password.length > 0 ? '' : '비밀번호'}
              placeholderTextColor={COLORS.neutral.grey3}
              secureTextEntry={false}
              autoCapitalize="none"
              keyboardType="default"
            />
          </View>
          <View
            style={[
              styles.inputUnderline,
              isPasswordFocused && styles.inputUnderlineFocused,
              isPasswordError && styles.inputUnderlineError,
              isPasswordSuccess && styles.inputUnderlineSuccess,
            ]}
          />
        </View>

        {/* 비밀번호 오류 메시지 */}
        {isPasswordError && (
          <Text style={styles.passwordErrorText}>영문과 숫자만 혼합하여 입력해 주세요</Text>
        )}

        {/* 비밀번호 성공 메시지 */}
        {isPasswordSuccess && (
          <Text style={styles.passwordSuccessText}>사용 가능한 비밀번호입니다!</Text>
        )}
      </View>

      {/* 비밀번호 재입력 */}
      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <View style={styles.passwordInputContainer}>
            {confirmPassword.length > 0 && (
              <View style={styles.passwordDisplay}>
                {confirmPassword.split('').map((char, index) => {
                  if (index === confirmPassword.length - 1 && showConfirmLastChar) {
                    return (
                      <Text key={index} style={styles.passwordLastChar}>
                        {char}
                      </Text>
                    );
                  } else {
                    return (
                      <View key={index} style={styles.passwordDot}>
                        <Svg width="8.056" height="8.056" viewBox="0 0 9 9" fill="none">
                          <circle cx="4.02813" cy="4.49981" r="4.02813" fill="#323232" />
                        </Svg>
                      </View>
                    );
                  }
                })}
              </View>
            )}
            <TextInput
              style={[
                styles.passwordTextInput,
                (isConfirmPasswordFocused || confirmPassword.length > 0) &&
                  styles.passwordTextInputFocused,
              ]}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                // 비밀번호가 일치하면 오류 상태 해제, 일치하지 않으면 오류 상태 설정
                if (text.length > 0) {
                  setIsConfirmPasswordError(text !== password);
                } else {
                  setIsConfirmPasswordError(false);
                }
                if (text.length > 0) {
                  setShowConfirmLastChar(true);
                  setTimeout(() => setShowConfirmLastChar(false), 2000);
                }
              }}
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() => setIsConfirmPasswordFocused(false)}
              placeholder={
                isConfirmPasswordFocused || confirmPassword.length > 0 ? '' : '비밀번호 재입력'
              }
              placeholderTextColor={COLORS.neutral.grey3}
              secureTextEntry={false}
              autoCapitalize="none"
              keyboardType="default"
            />
          </View>
          <View
            style={[
              styles.inputUnderline,
              isConfirmPasswordFocused && styles.inputUnderlineFocused,
              isConfirmPasswordError && styles.inputUnderlineError,
            ]}
          />

        {/* 비밀번호 재입력 오류 메시지 */}
        {isConfirmPasswordError && (
          <Text style={styles.confirmPasswordErrorText}>비밀번호가 일치하지 않습니다!</Text>
        )}
        </View>
      </View>

      {/* 로그인 버튼 */}
      <TouchableOpacity
        style={[styles.loginButton, isFormValid && styles.loginButtonActive]}
        onPress={handleLogin}
        disabled={!isFormValid}
        activeOpacity={isFormValid ? 0.8 : 1}
      >
        <Text style={[styles.loginButtonText, isFormValid && styles.loginButtonTextActive]}>
          로그인
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral.white,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    flexDirection: 'row',
    height: 3,
    marginBottom: 40,
  },
  progressBarActive: {
    width: 252,
    height: 3,
    backgroundColor: COLORS.primary,
  },
  progressBarInactive: {
    flex: 1,
    height: 3,
    backgroundColor: COLORS.neutral.grey2,
  },
  title: {
    color: COLORS.text.primary,
    fontFamily: 'Pretendard',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 34,
    marginBottom: 40,
  },
  inputSection: {
    marginBottom: 30,
  },
  label: {
    color: COLORS.neutral.grey4,
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
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
  textInputFocused: {
    color: COLORS.text.primary,
  },
  inputUnderline: {
    width: 308,
    height: 1.5,
    backgroundColor: COLORS.neutral.grey3,
    marginTop: 8,
  },
  inputUnderlineFocused: {
    backgroundColor: COLORS.text.primary,
  },
  userIdErrorText: {
    color: COLORS.primary,
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 8,
  },
  userIdSuccessText: {
    color: '#86D382',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 8,
  },
  inputUnderlineSuccess: {
    backgroundColor: '#86D382',
  },
  inputUnderlineError: {
    backgroundColor: COLORS.primary,
  },
  passwordInputContainer: {
    position: 'relative',
  },
  passwordDisplay: {
    position: 'absolute',
    top: 8,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  passwordDot: {
    marginRight: 3.34,
  },
  passwordLastChar: {
    color: COLORS.text.primary,
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22.519,
    marginRight: 3.34,
  },
  passwordTextInput: {
    width: 300.934,
    color: 'transparent',
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22.519,
    paddingVertical: 8,
  },
  passwordTextInputFocused: {
    color: 'transparent',
  },
  passwordErrorText: {
    color: COLORS.primary,
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 8,
  },
  passwordSuccessText: {
    color: '#86D382',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 8,
  },
  confirmPasswordErrorText: {
    color: COLORS.primary,
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 8,
  },
  loginButton: {
    width: 318,
    height: 56,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: COLORS.neutral.grey4,
    alignSelf: 'center',
    marginTop: 40,
  },
  loginButtonActive: {
    backgroundColor: COLORS.primary,
  },
  loginButtonText: {
    color: COLORS.text.inverse,
    fontFamily: 'Pretendard',
    fontSize: 16.5,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: undefined,
  },
  loginButtonTextActive: {
    color: COLORS.text.inverse,
  },
});
