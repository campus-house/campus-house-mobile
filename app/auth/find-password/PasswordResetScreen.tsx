import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { router } from 'expo-router';

interface PasswordResetScreenProps {
  onBack?: () => void;
}

export default function PasswordResetScreen({ onBack }: PasswordResetScreenProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);


  const handlePasswordReset = () => {
    if (newPassword.trim() && confirmPassword.trim()) {
      console.log('비밀번호 재설정:', { newPassword, confirmPassword });
      router.push('/auth/login');
    }
  };

  // 비밀번호 유효성 검사
  const isPasswordOnlyAlphanumeric = /^[a-zA-Z0-9]+$/.test(newPassword);
  const isPasswordLengthValid = newPassword.length >= 10 && newPassword.length <= 20;
  const isPasswordValid = isPasswordOnlyAlphanumeric && isPasswordLengthValid;
  const isPasswordMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const isFormValid = isPasswordValid && isPasswordMatch;

  // 비밀번호 상태 메시지
  const getPasswordMessage = () => {
    if (newPassword.length === 0) return '';
    if (!isPasswordOnlyAlphanumeric) {
      return '영문과 숫자만 입력해주세요';
    }
    if (!isPasswordLengthValid) {
      return '비밀번호는 10~20자로 되어야 합니다.';
    }
    return '사용가능한 비밀번호입니다!';
  };

  // 비밀번호 재입력 상태 메시지
  const getConfirmPasswordMessage = () => {
    if (confirmPassword.length === 0) return '';
    if (newPassword.length > 0 && !isPasswordMatch) {
      return '비밀번호가 일치하지 않습니다!';
    }
    return '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>
          새로운 비밀번호를{'\n'}설정해 주세요.
        </Text>

        {/* New Password Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.passwordInput,
                focusedField === 'newPassword' && styles.inputFocused
              ]}
              placeholder="새 비밀번호"
              value={newPassword}
              onChangeText={setNewPassword}
              onFocus={() => setFocusedField('newPassword')}
              onBlur={() => setFocusedField(null)}
              placeholderTextColor="#CDCDCD"
              secureTextEntry
            />
            <View style={[
              styles.inputUnderline,
              focusedField === 'newPassword' && styles.inputUnderlineFocused,
              newPassword.length > 0 && !isPasswordOnlyAlphanumeric && styles.inputUnderlineError,
              isPasswordValid && styles.inputUnderlineSuccess
            ]} />
          </View>
          {getPasswordMessage() !== '' ? (
            <Text style={[
              styles.validationMessage,
              !isPasswordOnlyAlphanumeric && styles.validationMessageError,
              isPasswordValid && styles.validationMessageSuccess
            ]}>
              {getPasswordMessage()}
            </Text>
          ) : (
            <Text style={[styles.hintText, { color: '#749AFB' }]}>비밀번호는 10~20자로 되어야 합니다.</Text>
          )}
        </View>

        {/* Confirm Password Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.passwordInput,
                focusedField === 'confirmPassword' && styles.inputFocused
              ]}
              placeholder="비밀번호 재입력"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => setFocusedField(null)}
              placeholderTextColor="#CDCDCD"
              secureTextEntry
            />
            <View style={[
              styles.inputUnderline,
              focusedField === 'confirmPassword' && styles.inputUnderlineFocused,
              confirmPassword.length > 0 && !isPasswordMatch && styles.inputUnderlineError
            ]} />
          </View>
          {getConfirmPasswordMessage() !== '' && (
            <Text style={[
              styles.validationMessage,
              styles.validationMessageError
            ]}>
              {getConfirmPasswordMessage()}
            </Text>
          )}
        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.resetButton,
            isFormValid && styles.resetButtonActive
          ]}
          onPress={handlePasswordReset}
        >
          <Text style={[
            styles.resetButtonText,
            isFormValid && styles.resetButtonTextActive
          ]}>
            확인
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 34,
    marginTop: 40,
    marginBottom: 40,
  },
  inputSection: {
    marginTop: 10,
  },
  inputLabel: {
    color: '#749AFB',
    textAlign: 'left',
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
  passwordInput: {
    color: '#000000',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    paddingVertical: 12,
    paddingHorizontal: 2.5,
    width: 301,
    alignSelf: 'stretch',
  },
  inputFocused: {
    color: '#000000',
  },
  inputUnderline: {
    width: 308,
    height: 1.5,
    backgroundColor: '#CDCDCD',
  },
  inputUnderlineFocused: {
    backgroundColor: '#000000',
  },
  hintText: {
    color: '#749AFB',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 8,
  },
  validationMessage: {
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 8,
  },
  validationMessageError: {
    color: '#FF805F',
  },
  validationMessageSuccess: {
    color: '#86D382',
  },
  inputUnderlineError: {
    backgroundColor: '#FF805F',
  },
  inputUnderlineSuccess: {
    backgroundColor: '#86D382',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 34,
    alignItems: 'center',
  },
  resetButton: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#CDCDCD',
  },
  resetButtonActive: {
    backgroundColor: '#FF6B35',
  },
  resetButtonText: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 16.5,
    fontWeight: '700',
  },
  resetButtonTextActive: {
    color: '#FFF',
  },
});
