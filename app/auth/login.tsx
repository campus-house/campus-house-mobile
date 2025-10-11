import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { BackIcon } from '@/components/Icon/BackIcon';
import { LoginButton } from '@/components/Button/LoginButton';
import { NameInputField } from '@/components/Input/NameInputField';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLayoutScale, LAYOUT_SIZES } from '@/utils/layout';

// Title block from design
const TITLE = LAYOUT_SIZES.TITLE.LOGIN;

// Input rows height (text 16, underline 1.5 etc.)
const ROW_H = 30; // matches previous design container height

// Vertical anchors from Figma (frame-top Y values)
const ID_TOP = 297; // id input container top
const PW_TOP = 356; // password input container top
const LINKS_TOP = 491; // bottom links row top

export default function LoginScreen() {
  const { y, insets, figma } = useLayoutScale();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('로그인 시도:', { id, password });
    router.replace('/main');
  };

  const goToFindId = () => router.push('/auth/find-id');
  const goToFindPassword = () => router.push('/auth/find-password');

  // spacers computed from Figma anchors
  const spacerTitleToId = ID_TOP - (TITLE.Y + TITLE.H); // gap between title and id
  const spacerIdToPw = PW_TOP - (ID_TOP + ROW_H); // gap between id bottom and pw top
  const spacerPwToLinks = LINKS_TOP - (PW_TOP + ROW_H); // gap between pw bottom and links top

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.view}>
          {/* 뒤로가기 버튼 */}
          <TouchableOpacity
            style={[styles.backButton, { top: insets.top + y(65 - figma.SAFE_TOP) }]}
            onPress={() => router.replace('/')}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel="뒤로 가기"
          >
            <BackIcon />
          </TouchableOpacity>

          <ScrollView
            contentContainerStyle={{
              paddingTop: insets.top + y(TITLE.Y - figma.SAFE_TOP) - 10,
              paddingHorizontal: 47,
              paddingBottom: insets.bottom + 24,
            }}
            keyboardShouldPersistTaps="handled"
          >
            {/* 앱 제목 */}
            <Image
              source={require('@/assets/images/app_title.png')}
              style={{ width: TITLE.W, height: TITLE.H, alignSelf: 'center' }}
              resizeMode="contain"
            />

            {/* Spacer: Title -> ID input */}
            <View style={{ height: y(73) }} />

            {/* 아이디 입력 필드 */}
            <NameInputField
              placeholder="아이디 입력"
              value={id}
              onChangeText={setId}
              width={290}
              marginLeft={0}
              autoCapitalize="none"
              inputTextStyle={styles.loginInputText}
              placeholderTextColor={COLORS.neutral.grey3}
            />

            {/* Spacer: ID -> PW */}
            <View style={{ height: y(25) }} />

            {/* 비밀번호 입력 필드 */}
            <NameInputField
              placeholder="비밀번호 입력"
              value={password}
              onChangeText={setPassword}
              width={290}
              marginLeft={0}
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry
              inputTextStyle={styles.loginInputText}
              placeholderTextColor={COLORS.neutral.grey3}
            />

            {/* 로그인 버튼 */}
            <LoginButton
              onPress={handleLogin}
              disabled={!(id.length > 0 && password.length > 0)}
              title="로그인하기"
              style={{ width: 312, alignSelf: 'center', marginTop: y(42) }}
            />

            {/* Spacer: PW -> Links (from Figma LINKS_TOP) */}
            <View style={{ height: y(17) }} />

            {/* 하단 링크 (구분선 중앙 고정) */}
            <View style={styles.linksRow}>
              <View style={[styles.linkCol, styles.linkColLeft, { paddingRight: 20 }]}>
                <TouchableOpacity style={styles.linkBtn} onPress={goToFindId}>
                  <Text style={styles.linkText} numberOfLines={1}>
                    아이디 찾기
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.divider, { height: y(16) }]} />
              <View style={[styles.linkCol, styles.linkColRight, { paddingLeft: 19 }]}>
                <TouchableOpacity style={styles.linkBtn} onPress={goToFindPassword}>
                  <Text style={styles.linkText} numberOfLines={1}>
                    비밀번호 찾기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  keyboardAvoidingView: { flex: 1 },
  view: { flex: 1, width: '100%', backgroundColor: '#fff', position: 'relative' },

  backButton: {
    position: 'absolute',
    left: 31,
    zIndex: 10,
    width: 44,
    height: 60,
    padding: 4,
  },

  loginInputText: {
    fontSize: 16.38,
    lineHeight: 22.519,
    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontStyle: 'normal',
  },

  // bottom links
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  linkCol: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  linkColLeft: {
    justifyContent: 'flex-end',
  },
  linkColRight: {
    justifyContent: 'flex-start',
  },
  linkBtn: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    fontSize: 14,
    lineHeight: 24,
    color: COLORS.neutral.grey4,
    textAlign: 'center',
    fontFamily: 'Pretendard',
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: COLORS.neutral.grey3,
  },
});
