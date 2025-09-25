import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import EmailPasswordCompleteScreen from './EmailPasswordCompleteScreen';

interface EmailPasswordScreenProps {
  onBack?: () => void;
}

export default function EmailPasswordScreen({ onBack }: EmailPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showComplete, setShowComplete] = useState(false);

  const handleBackPress = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleSendEmail = () => {
    if (email.trim()) {
      console.log('비밀번호 재설정 메일 전송:', email);
      setShowComplete(true);
    }
  };

  const isEmailValid = email.trim().length > 0;

  if (showComplete) {
    return <EmailPasswordCompleteScreen onBack={() => setShowComplete(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Svg width="13" height="23" viewBox="0 0 13 23" fill="none">
            <Path
              d="M11.1777 2L1.55391 11.3274C1.34905 11.5259 1.35158 11.8554 1.55946 12.0508L11.1777 21.0909"
              stroke="#AAAAAA"
              strokeWidth="2.27273"
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>비밀번호 찾기</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>
          이메일 아이디를{'\n'}입력해 주세요.
        </Text>

        {/* Email Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>이메일</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.emailInput,
                focusedField === 'email' && styles.inputFocused
              ]}
              placeholder={focusedField === 'email' ? '' : '이메일 입력'}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholderTextColor="#CDCDCD"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={[
              styles.inputUnderline,
              focusedField === 'email' && styles.inputUnderlineFocused
            ]} />
          </View>
        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.sendButton,
            isEmailValid && styles.sendButtonActive
          ]}
          onPress={handleSendEmail}
        >
          <Text style={[
            styles.sendButtonText,
            isEmailValid && styles.sendButtonTextActive
          ]}>
            인증메일 전송
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },
  headerSpacer: {
    width: 32,
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
    marginTop: 20,
  },
  inputLabel: {
    color: '#AAA',
    textAlign: 'left',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    marginTop: 16,
    marginBottom: 0,
  },
  inputContainer: {
    position: 'relative',
  },
  emailInput: {
    color: '#000000',
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22.519,
    paddingVertical: 12,
    paddingHorizontal: 2.5,
    width: 300.934,
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
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 34,
    alignItems: 'center',
  },
  sendButton: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#CDCDCD',
  },
  sendButtonActive: {
    backgroundColor: '#FF6B35',
  },
  sendButtonText: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 16.5,
    fontWeight: '700',
  },
  sendButtonTextActive: {
    color: '#FFF',
  },
});
