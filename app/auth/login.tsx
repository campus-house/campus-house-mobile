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
  Image,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { BackIcon } from '@/components/Icon/BackIcon';
import { LoginButton } from '@/components/Button/LoginButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function LoginScreen() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idFocused, setIdFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = () => {
    console.log('로그인 시도:', { id, password });
    // 실제 로그인 로직 구현 예정
    // 로그인 성공 시 메인 화면으로 이동
    router.replace('/main');
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
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.view}>
          {/* 뒤로가기 버튼 */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <BackIcon size={16} color={COLORS.neutral.grey4} />
          </TouchableOpacity>

          {/* 앱 제목 */}
          <Image
            source={require('@/assets/images/app_title.png')}
            style={styles.title}
            resizeMode="contain"
          />

          {/* 아이디 입력 필드 */}
          <View style={styles.idInputContainer}>
            <TextInput
              style={styles.inputText}
              value={id}
              onChangeText={setId}
              onFocus={() => setIdFocused(true)}
              onBlur={() => setIdFocused(false)}
              placeholder="아이디 입력"
              placeholderTextColor={COLORS.neutral.grey3}
            />
            <View style={[styles.inputUnderline, idFocused && styles.inputUnderlineFocused]} />
          </View>

          {/* 비밀번호 입력 필드 */}
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.inputText}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              placeholder="비밀번호 입력"
              placeholderTextColor={COLORS.neutral.grey3}
              secureTextEntry
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
            />
            <View
              style={[styles.inputUnderline, passwordFocused && styles.inputUnderlineFocused]}
            />
          </View>

          {/* 로그인 버튼 */}
          <LoginButton
            onPress={handleLogin}
            enabled={id.length > 0 && password.length > 0}
            title="로그인하기"
          />

          {/* 하단 링크 */}
          <View style={styles.bottomLinks}>
            <TouchableOpacity style={styles.findIdLink} onPress={goToFindId}>
              <Text style={styles.linkText}>아이디 찾기</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.findPasswordLink} onPress={goToFindPassword}>
              <Text style={styles.linkText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
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
  },
  view: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  backButton: {
    left: screenWidth * (32 / 393), // 32/393 비율로 반응형
    top: screenHeight * (83 / 852), // 83/852 비율로 반응형
    width: 40, // 터치 영역 확대
    height: 40, // 터치 영역 확대
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: screenWidth * (-101.5 / 393), // Locofy: marginLeft: -101.5px
    top: screenHeight * (183 / 852), // Locofy: top: 183px
    width: 203, // Locofy: width: 203px (픽셀 고정)
    height: 34, // Locofy: height: 34px (픽셀 고정)
    left: '50%', // Locofy: left: "50%"
    position: 'absolute',
  },
  idInputContainer: {
    height: 30, // Locofy: height: 30px (픽셀 고정)
    width: 301, // Locofy: width: 301px (픽셀 고정)
    left: screenWidth * (46 / 393), // Locofy: left: 46px
    top: screenHeight * (297 / 852), // Locofy: top: 297px
    position: 'absolute',
  },
  passwordInputContainer: {
    height: 30, // Locofy: height: 30px (픽셀 고정)
    width: 301, // Locofy: width: 301px (픽셀 고정)
    left: screenWidth * (46 / 393), // Locofy: left: 46px
    top: screenHeight * (356 / 852), // Locofy: top: 356px
    position: 'absolute',
  },
  inputText: {
    left: 0,
    fontSize: 16, // 피그마: 16px → 실제 디바이스에서도 16px 사용
    lineHeight: 23, // 피그마: 23px → 실제 디바이스에서도 23px 사용
    color: COLORS.neutral.black, // 입력 텍스트는 검은색
    height: 21, // 피그마: 21px → 실제 디바이스에서도 21px 사용
    textAlign: 'left',
    fontFamily: 'Pretendard', // Locofy: FontFamily.pretendard
    top: 0,
    width: 301, // 피그마: 301px → 실제 디바이스에서도 301px 사용
    position: 'absolute',
    padding: 0, // 기본 패딩 제거
    margin: 0, // 기본 마진 제거
  },
  inputUnderline: {
    top: 29, // Locofy: top: 29px
    left: -1, // Locofy: left: -1px
    borderStyle: 'solid',
    borderColor: COLORS.neutral.grey3, // 입력 전 기본 색상: #CDCDCD
    borderTopWidth: 1.5, // Locofy: borderTopWidth: 1.5
    width: 302, // Locofy: width: 302px
    height: 2, // Locofy: height: 2px
    position: 'absolute',
  },
  inputUnderlineFocused: {
    borderColor: COLORS.neutral.black, // 포커스시 검은색으로 변경
  },
  bottomLinks: {
    marginLeft: screenWidth * (-98.5 / 393), // Locofy: marginLeft: -98.5px
    top: screenHeight * (491 / 852), // Locofy: top: 491px
    left: '50%', // Locofy: left: "50%"
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between', // 양쪽 끝으로 배치
    width: 197, // Locofy: width 계산
  },
  findIdLink: {
    padding: 8, // Locofy: padding: 8
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  findPasswordLink: {
    padding: 8, // Locofy: padding: 8
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  linkText: {
    fontSize: 14, // Locofy: fontSize: 14
    lineHeight: 24, // Locofy: lineHeight: 24
    color: COLORS.neutral.grey4, // 아이디 찾기, 비밀번호 찾기 텍스트: #AAAAAA
    textAlign: 'center',
    fontFamily: 'Pretendard', // Locofy: FontFamily.pretendard
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: COLORS.neutral.grey3, // 구분선 색상: #CDCDCD
    alignSelf: 'center', // 세로 중앙 정렬
  },
});
