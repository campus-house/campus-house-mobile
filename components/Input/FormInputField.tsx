import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

/**
 * FormInputField
 * 
 * 회원가입, 로그인 등의 폼에서 사용하는 범용 입력 필드 컴포넌트입니다.
 * - 일반 텍스트 입력 및 비밀번호 입력 모두 지원
 * - 에러/성공 상태에 따른 시각적 피드백 제공
 * - placeholder와 밑줄 사이의 여백이 자동으로 일관되게 유지됨
 */

interface FormInputFieldProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  hasError?: boolean;
  hasSuccess?: boolean;
  errorMessage?: string;
  successMessage?: string;
  maxLength?: number;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: any;
}

export const FormInputField: React.FC<FormInputFieldProps> = ({
  placeholder = '입력',
  value,
  onChangeText,
  onFocus,
  onBlur,
  hasError = false,
  hasSuccess = false,
  errorMessage,
  successMessage,
  maxLength,
  secureTextEntry = false,
  autoCapitalize = 'none',
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  // 밑줄 색상 결정
  const getUnderlineColor = () => {
    if (hasError) return COLORS.primary;
    if (hasSuccess) return COLORS.sub.green;
    if (isFocused) return COLORS.text.primary;
    return COLORS.neutral.grey3;
  };

  // 메시지 색상 결정
  const getMessageColor = () => {
    if (hasError) return COLORS.primary;
    if (hasSuccess) return COLORS.sub.green;
    return COLORS.neutral.grey3;
  };

  // 표시할 메시지 결정
  const getMessage = () => {
    if (hasError && errorMessage) return errorMessage;
    if (hasSuccess && successMessage) return successMessage;
    return null;
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.textInput}
        placeholder={isFocused || value.length > 0 ? '' : placeholder}
        placeholderTextColor={COLORS.neutral.grey3}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        spellCheck={false}
        returnKeyType="none"
        maxLength={maxLength}
      />
      <View style={[styles.inputUnderline, { backgroundColor: getUnderlineColor() }]} />
      {getMessage() && (
        <Text style={[styles.messageText, { color: getMessageColor() }]}>
          {getMessage()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  textInput: {
    color: COLORS.text.primary,
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22.519,
    paddingVertical: 4,
    paddingLeft: 3,
    textAlign: 'left',
  },
  inputUnderline: {
    height: 1.5,
    marginTop: 4,
  },
  messageText: {
    position: 'absolute',
    top: 34,
    left: 0,
    color: COLORS.primary,
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'left',
  },
});

