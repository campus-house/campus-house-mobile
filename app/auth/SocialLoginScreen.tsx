import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';
import { KakaoLoginButton } from '@/components/Button/KakaoLoginButton';
import { NaverLoginButton } from '@/components/Button/NaverLoginButton';
import { GoogleLoginButton } from '@/components/Button/GoogleLoginButton';
import PermissionModal from '@/components/Modal/PermissionModal';
import { useLayoutScale, LAYOUT_SIZES } from '@/utils/layout';
import AppTitle from '@/components/Icon/AppTitle';
import HouseLogo from '@/components/Icon/HouseLogo';

// Title block from design
const TITLE = LAYOUT_SIZES.TITLE.SPLASH;

// Buttons
const BTN = { H: 58, GAP: 14 };

// Vertical gaps from spec
const GAP_TITLE_TO_BTN1 = 252.51; // title bottom -> first button top
const GAP_GOOGLE_TO_LINKS = 35; // Google button bottom -> links top

export default function SocialLoginScreen() {
  const { y, insets, figma } = useLayoutScale();
  const [showPermissionModal, setShowPermissionModal] = useState(true);

  const handleKakaoLogin = () => {
    router.push('/main');
  };
  const handleNaverLogin = () => {
    router.push('/main');
  };
  const handleGoogleLogin = () => {
    router.push('/main');
  };
  const goToIdLogin = () => router.push('/auth/login');
  const goToSignup = () => router.push('/auth/signup');
  const handlePermissionNext = () => {
    setShowPermissionModal(false);
    // 권한 팝업을 한 번만 보여주기 위해 localStorage에 저장
    // (실제로는 AsyncStorage 사용 권장)
  };

  return (
    <View style={styles.root}>
      {/* 권한 팝업 */}
      <PermissionModal visible={showPermissionModal} onNext={handlePermissionNext} />

      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + y(TITLE.Y - figma.SAFE_TOP - 66), // 전체 내용 63 위로
          paddingHorizontal: 40,
          paddingBottom: insets.bottom + 24,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* House Icon */}
        <View style={{ alignSelf: 'center', marginBottom: 24 }}>
          <HouseLogo width={80 * 1.05} height={43 * 1.03} />
        </View>

        {/* Title */}
        <View style={{ alignSelf: 'center' }}>
          <AppTitle width={214.92 * 1.05} height={32.2526 * 1.05} />
        </View>

        {/* Spacer: Title -> First button */}
        <View style={{ height: y(90) }} />

        {/* Buttons */}
        <KakaoLoginButton style={{ height: BTN.H, width: '100%' }} onPress={handleKakaoLogin} />
        <NaverLoginButton
          style={{ height: BTN.H, width: '100%', marginTop: y(BTN.GAP) }}
          onPress={handleNaverLogin}
        />
        <GoogleLoginButton
          style={{ height: BTN.H, width: '100%', marginTop: y(BTN.GAP) }}
          onPress={handleGoogleLogin}
        />

        {/* Bottom links */}
        <View style={{ height: y(GAP_GOOGLE_TO_LINKS + 2.2) }} />
        <View style={styles.linksRow}>
          <View style={[styles.linkCol, styles.linkColLeft]}>
            <TouchableOpacity onPress={goToIdLogin} style={[styles.linkBtn, { marginRight: 1 }]}>
              <Text style={styles.linkText} numberOfLines={1}>
                아이디 로그인
              </Text>
            </TouchableOpacity>
          </View>

          {/* Center divider should be exactly centered regardless of text widths */}
          <View style={styles.divider} />

          <View style={[styles.linkCol, styles.linkColRight]}>
            <TouchableOpacity onPress={goToSignup} style={styles.linkBtn}>
              <Text style={styles.linkText} numberOfLines={1}>
                회원가입
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    marginLeft: 9,
  },
  linkCol: {
    flex: 1,
    alignItems: 'center', // vertical centering
    flexDirection: 'row',
  },
  linkColLeft: {
    paddingRight: 31, // exact gap from divider
    justifyContent: 'flex-end', // push text toward divider
  },
  linkColRight: {
    paddingLeft: 30, // exact gap from divider
    justifyContent: 'flex-start', // push text toward divider
  },
  linkBtn: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    color: '#636363',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: COLORS.neutral.grey4,
  },
});
