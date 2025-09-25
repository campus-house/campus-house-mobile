import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

interface IdFindResultScreenProps {
  foundId: string;
  onBack: () => void;
}

export default function IdFindResultScreen({ foundId, onBack }: IdFindResultScreenProps) {
  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleFindPassword = () => {
    router.push('/auth/find-password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Svg width="13" height="23" viewBox="0 0 13 23" fill="none">
            <Path
              d="M11.1777 2L1.55391 11.3274C1.34905 11.5259 1.35158 11.8554 1.55946 12.0508L11.1777 21.0909"
              stroke="#AAAAAA"
              strokeWidth="2.27273"
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>
          회원님의 아이디는{'\n'}
          <Text style={styles.foundId}>{foundId}</Text> 입니다.
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.findPasswordButton} onPress={handleFindPassword}>
          <Text style={styles.findPasswordText}>비밀번호 찾기 {'>'}</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    color: '#636363',
    fontFamily: 'Pretendard',
    fontSize: 26,
    fontWeight: '500',
    lineHeight: 35,
    textAlign: 'center',
    marginBottom: 10,
  },
  foundId: {
    color: '#FF805F',
    fontFamily: 'Pretendard',
    fontSize: 26,
    fontWeight: '500',
    lineHeight: 35,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 34,
    alignItems: 'center',
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#ffffff',
    fontFamily: 'Pretendard',
    fontSize: 16.5,
    fontWeight: '700',
  },
  findPasswordButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  findPasswordText: {
    color: '#636363',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
  },
});
