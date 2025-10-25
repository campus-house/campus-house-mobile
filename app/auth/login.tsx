import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '@/constants/colors';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

export default function NewScreen3() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idFocused, setIdFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {/* 뒤로가기 버튼 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Svg width="13" height="22" viewBox="0 0 13 22" fill="none">
            <Path 
              d="M10.9121 1.13647L1.28829 10.4639C1.08343 10.6624 1.08595 10.9919 1.29383 11.1872L10.9121 20.2274" 
              stroke="#AAAAAA" 
              strokeWidth="2.27273" 
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* 로그인 폼 */}
      <View style={styles.formContainer}>
        {/* 아이디 입력 */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>아이디</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="아이디 입력"
              placeholderTextColor="#CDCDCD"
              value={id}
              onChangeText={setId}
              onFocus={() => setIdFocused(true)}
              onBlur={() => setIdFocused(false)}
            />
            <Svg width="329" height="2" viewBox="0 0 329 2" fill="none">
              <Path 
                d="M0.75 0.75H327.75" 
                stroke={idFocused ? "#000000" : "#CDCDCD"} 
                strokeWidth="1.5" 
                strokeLinecap="round"
              />
            </Svg>
          </View>
        </View>

        {/* 비밀번호 입력 */}
        <View style={styles.passwordInputGroup}>
          <Text style={styles.inputLabel}>비밀번호</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="비밀번호 입력"
              placeholderTextColor="#CDCDCD"
              value={password}
              onChangeText={setPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              secureTextEntry
            />
            <Svg width="329" height="2" viewBox="0 0 329 2" fill="none">
              <Path 
                d="M0.75 0.75H327.75" 
                stroke={passwordFocused ? "#000000" : "#CDCDCD"} 
                strokeWidth="1.5" 
                strokeLinecap="round"
              />
            </Svg>
          </View>
        </View>

        {/* 아이디찾기/비밀번호찾기와 회원가입 */}
        <View style={styles.linksRow}>
          <View style={styles.findLinksContainer}>
            <TouchableOpacity style={styles.findLinks} onPress={() => router.push('/auth/find-id')}>
              <Text style={styles.findLinksText}>아이디 찾기</Text>
            </TouchableOpacity>
            <Text style={styles.separator}> / </Text>
            <TouchableOpacity style={styles.findLinks} onPress={() => router.push('/auth/find-password')}>
              <Text style={styles.findLinksText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.signupLink} onPress={() => router.push('/auth/signup')}>
            <Text style={styles.signupText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 로그인 버튼 */}
      <View style={[styles.buttonContainer, keyboardVisible && styles.buttonContainerKeyboard]}>
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/main')}>
          <Text style={styles.loginButtonText}>로그인하기</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 87, // 위로 5px 이동 (100 -> 95)
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'flex-start', // 왼쪽 정렬
    paddingLeft: 34, // 오른쪽으로 2px 더 이동 (35 -> 37)
  },
  backButton: {
    width: 10,
    height: 19.091,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingLeft: 30, // 왼쪽 패딩 줄여서 조금 왼쪽으로
    paddingTop: 71, // 아래로 10px 이동 (60 -> 70)
  },
  inputGroup: {
    marginBottom: 20, // 간격 줄임
  },
  passwordInputGroup: {
    marginBottom: 20, // 간격 줄임
    marginTop: 6, // 비밀번호 입력창 아래로 2px 이동
  },
  inputLabel: {
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 3, // 간격 줄임 (10 -> 4)
    marginTop: 8, // 텍스트를 아래로 이동
  },
  inputContainer: {
    width: 320, // 좌우 사이즈 줄임 (327 -> 320)
    marginLeft: 2, // 입력창이 텍스트보다 2px 아래에서 시작
  },
  textInput: {
    width: 295, // 좌우 사이즈 줄임 (300.934 -> 295)
    fontSize: 18.5,
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22.519,
    color: '#000',
    paddingVertical: 5, // 간격 줄임
    marginBottom: 5, // 하단줄과의 간격 줄임
  },
  // 하단 링크들 스타일
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8, // 위로 4px 이동 (20 -> 16)
    marginBottom: 50,
    paddingRight: 20, // 회원가입을 왼쪽으로 이동
  },
  findLinksContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  findLinks: {
    // flex: 1 제거
  },
  findLinksText: {
    color: '#AAA',
    textAlign: 'left',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24.177,
  },
  separator: {
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24.177,
    marginHorizontal: 4,
  },
  signupLink: {
    alignSelf: 'flex-end',
  },
  signupText: {
    color: '#323232',
    textAlign: 'right',
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24.177,
  },
  // 로그인 버튼 스타일
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 36, // 아래로 3px 이동 (50 -> 47)
  },
  buttonContainerKeyboard: {
    position: 'relative',
    bottom: 'auto',
    marginTop: 0,
    paddingBottom: 20,
  },
  loginButton: {
    display: 'flex',
    width: 348,
    height: 56,
    padding: 8.189,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8.578,
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: '#FF805F',
  },
  loginButtonText: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 16,
  },
});