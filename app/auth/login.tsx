import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/colors';


export default function LoginScreen() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('로그인 시도:', { id, password });
    // 실제 로그인 로직 구현 예정
  };

  const goToFindId = () => {
    router.push('/auth/find-id');
  };

  const goToFindPassword = () => {
    router.push('/auth/find-password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {/* 뒤로가기 버튼 */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>＜</Text>
        </TouchableOpacity>

        {/* 앱 제목 */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>캠퍼스하우스</Text>
        </View>

        {/* 입력 필드들 */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="아이디 입력"
            placeholderTextColor="#999"
            value={id}
            onChangeText={setId}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호 입력"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* 로그인 버튼 */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인하기</Text>
        </TouchableOpacity>

        {/* 하단 링크 */}
        <View style={styles.bottomLinks}>
          <TouchableOpacity onPress={goToFindId}>
            <Text style={styles.linkText}>아이디 찾기</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={goToFindPassword}>
            <Text style={styles.linkText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 10,
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B35',
    fontFamily: 'Pretendard',
  },
  inputContainer: {
    marginBottom: 40,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 15,
    paddingHorizontal: 0,
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Pretendard',
  },
  loginButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard',
  },
  bottomLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 50,
  },
  linkContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  linkText: {
    color: '#636363',
    fontSize: 16,
    fontFamily: 'Pretendard',
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: '#636363',
    marginHorizontal: 15,
  },
});
