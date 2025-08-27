import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { LoginButton } from '../components/Button/LoginButton';
import { GrayButton } from '../components/Button/GrayButton';
import { OrangeButton } from '../components/Button/OrangeButton';
import { GrayRoundedButton } from '../components/Button/GrayRoundedButton';
import { SmallOrangeButton } from '../components/Button/SmallOrangeButton';
import { KakaoLoginButton } from '../components/Button/KakaoLoginButton';
import { NaverLoginButton } from '../components/Button/NaverLoginButton';
import { GoogleLoginButton } from '../components/Button/GoogleLoginButton';

import { NameInputField } from '../components/Input/NameInputField';
import { PasswordResetField } from '../components/Input/PasswordResetField';
import { GreyCheckButton } from '../components/Button/CheckButton';
import { OrangeCheckButton } from '../components/Button/OrangeCheckButton';
import { DynamicLoginButton } from '../components/Button/DynamicLoginButton';
import { GreyCheckIcon } from '../components/Button/GreyCheckIcon';
import { OrangeCheckIcon } from '../components/Button/OrangeCheckIcon';

export default function TapTapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus House</Text>
      <Text style={styles.subtitle}>캠퍼스 라이프를 더 스마트하게</Text>
      <View style={styles.buttonContainer}>
        <LoginButton onPress={() => {}} title="로그인" />
        <LoginButton onPress={() => {}} disabled={true} title="로그인 (비활성화)" />
        <GrayButton onPress={() => {}} title="로그인" />
        <OrangeButton onPress={() => {}} title="버튼" />
        <GrayRoundedButton onPress={() => {}} title="버튼" />
        <SmallOrangeButton onPress={() => {}} title="버튼" />
        <KakaoLoginButton onPress={() => {}} />
        <NaverLoginButton onPress={() => {}} />
        <GoogleLoginButton onPress={() => {}} />

        <NameInputField />
        <PasswordResetField />
        <GreyCheckButton onPress={() => {}} isSelected={false} />
        <GreyCheckButton onPress={() => {}} isSelected={true} />
        <OrangeCheckButton onPress={() => {}} isSelected={false} />
        <OrangeCheckButton onPress={() => {}} isSelected={true} />
        <DynamicLoginButton onPress={() => {}} isActive={false} />
        <DynamicLoginButton onPress={() => {}} isActive={true} />
        <GreyCheckIcon onPress={() => {}} isSelected={false} />
        <GreyCheckIcon onPress={() => {}} isSelected={true} />
        <OrangeCheckIcon onPress={() => {}} isSelected={false} />
        <OrangeCheckIcon onPress={() => {}} isSelected={true} />
        <Link href="/profile" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>프로필 보기</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/settings" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>설정</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: { 
    color: COLORS.text.primary, 
    ...TYPOGRAPHY.headline1,
    marginBottom: 10 
  },
  subtitle: { 
    color: COLORS.text.secondary, 
    ...TYPOGRAPHY.body2,
    marginBottom: 40, 
    textAlign: 'center' 
  },
  buttonContainer: { 
    gap: 15, 
    width: '100%' 
  },
  button: { 
    alignItems: 'center', 
    backgroundColor: COLORS.primary, 
    borderRadius: 10, 
    padding: 15 
  },
  buttonText: { 
    color: COLORS.text.inverse, 
    ...TYPOGRAPHY.body1
  },
});
