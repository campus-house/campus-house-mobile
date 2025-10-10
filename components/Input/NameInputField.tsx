import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { COLORS } from '@/constants/colors';

interface NameInputFieldProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  returnKeyType?: 'done' | 'next' | 'search' | 'send' | 'go' | 'default' | 'none';
  onSubmitEditing?: () => void;
  editable?: boolean;
  selectTextOnFocus?: boolean;
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode';
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  autoCorrect?: boolean;
  spellCheck?: boolean;
  secureTextEntry?: boolean;
  width?: number;
  marginLeft?: number;
  errorMessage?: string;
  hasError?: boolean;
  maxLength?: number;
  inputTextStyle?: any;
  placeholderTextColor?: string;
}

export const NameInputField: React.FC<NameInputFieldProps> = ({
  placeholder = '이름 입력',
  value = '',
  onChangeText,
  onFocus,
  onBlur,
  autoCapitalize = 'words',
  returnKeyType = 'none',
  onSubmitEditing,
  editable = true,
  selectTextOnFocus = true,
  textContentType = 'name',
  keyboardType = 'default',
  autoCorrect = false,
  spellCheck = false,
  secureTextEntry = false,
  width = 300,
  marginLeft = 3,
  errorMessage,
  hasError = false,
  maxLength,
  inputTextStyle,
  placeholderTextColor = COLORS.neutral.grey3,
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

  return (
    <View style={[styles.inputContainer, { marginLeft }]}>
      <TextInput
        style={[
          styles.textInput,
          { width },
          inputTextStyle,
          isFocused && styles.textInputFocused,
          hasError && styles.textInputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={isFocused || value.length > 0 ? '' : placeholder}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize={autoCapitalize}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        editable={editable}
        selectTextOnFocus={selectTextOnFocus}
        textContentType={textContentType}
        keyboardType={keyboardType}
        autoCorrect={autoCorrect}
        spellCheck={spellCheck}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
      />
      <View
        style={[
          styles.inputUnderline,
          { width: width + 8 },
          isFocused && styles.inputUnderlineFocused,
          hasError && styles.inputUnderlineError,
        ]}
      />
      {hasError && errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
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
  textInputFocused: {
    color: COLORS.text.primary,
  },
  textInputError: {
    color: COLORS.primary,
  },
  inputUnderline: {
    height: 1.5,
    backgroundColor: COLORS.neutral.grey3,
    marginTop: 4,
  },
  inputUnderlineFocused: {
    backgroundColor: COLORS.text.primary,
  },
  inputUnderlineError: {
    backgroundColor: COLORS.primary,
  },
  errorText: {
    color: COLORS.primary,
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 7,
    textAlign: 'left',
  },
});
