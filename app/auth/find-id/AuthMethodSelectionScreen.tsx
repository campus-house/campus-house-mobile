import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { router } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { BackIcon } from '@/components/Icon/BackIcon';
import { LoginButton } from '@/components/Button/MainButton';
import { useLayoutScale } from '@/utils/layout';
import PhoneAuthDetailScreen from './PhoneAuthDetailScreen';
import EmailAuthScreen from './EmailAuthScreen';

type AuthMethod = 'phone' | 'email' | null;

export default function AuthMethodSelectionScreen() {
  const { y, insets, figma } = useLayoutScale();
  const [selectedAuth, setSelectedAuth] = useState<AuthMethod>(null);
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);
  const [showEmailAuth, setShowEmailAuth] = useState(false);

  const handleAuthSelect = (method: AuthMethod) => {
    setSelectedAuth(method);
  };

  const handleNext = () => {
    if (selectedAuth === 'phone') {
      // 휴대폰 인증 상세 화면으로 이동
      setShowPhoneAuth(true);
    } else if (selectedAuth === 'email') {
      // 이메일 인증 화면으로 이동
      setShowEmailAuth(true);
    }
  };

  const handleBack = () => {
    setShowPhoneAuth(false);
    setShowEmailAuth(false);
  };

  if (showPhoneAuth) {
    return <PhoneAuthDetailScreen onBack={handleBack} />;
  }

  if (showEmailAuth) {
    return <EmailAuthScreen onBack={handleBack} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />

      {/* 뒤로가기 버튼 */}
      <TouchableOpacity 
        style={[styles.backButton, { top: insets.top + y(65 - figma.SAFE_TOP) }]} 
        onPress={() => router.back()}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityLabel="뒤로 가기"
      >
        <BackIcon />
      </TouchableOpacity>

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{
          paddingTop: insets.top + y(135 - figma.SAFE_TOP),
          paddingHorizontal: 37,
        }}
      >
        <Text style={styles.title}>본인 확인을 위해{'\n'}인증을 진행해 주세요</Text>

        {/* Auth Options */}
        <View style={[styles.authOptions, { marginTop: y(13) }]}>
          {/* Phone Auth */}
          <TouchableOpacity
            style={[styles.authOption, selectedAuth === 'phone' && styles.authOptionSelected]}
            onPress={() => handleAuthSelect('phone')}
          >
            <View style={styles.authOptionContent}>
              <Svg width="25" height="35" viewBox="0 0 25 35" fill="none">
                <Rect
                  x="0.877731"
                  y="0.700118"
                  width="22.9671"
                  height="33.5688"
                  rx="4.29998"
                  stroke={COLORS.text.secondary}
                  strokeWidth="1.39999"
                />
                <Path
                  d="M8.17773 4.00012H17.0175"
                  stroke={COLORS.text.secondary}
                  strokeWidth="0.999995"
                  strokeLinecap="round"
                />
                <Circle
                  cx="12.3613"
                  cy="29.9999"
                  r="1.49999"
                  stroke={COLORS.text.secondary}
                  strokeWidth="0.999995"
                />
              </Svg>
              <View style={styles.authOptionTextContainer}>
                <Text style={styles.authOptionText}>
                  휴대폰 인증
                </Text>
                <Text style={styles.authOptionDescription}>본인 명의 휴대폰으로 인증할 수 있어요.</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Email Auth */}
          <TouchableOpacity
            style={[styles.authOption, selectedAuth === 'email' && styles.authOptionSelected]}
            onPress={() => handleAuthSelect('email')}
          >
            <View style={styles.authOptionContent}>
              <Svg width="34" height="25" viewBox="0 0 34 25" fill="none">
                <Rect
                  x="0.754513"
                  y="0.701779"
                  width="31.7214"
                  height="22.6874"
                  rx="3.03905"
                  fill="white"
                  stroke={COLORS.text.secondary}
                  strokeWidth="1.40356"
                />
                <Path
                  d="M3.90625 4.55544L16.7387 10.9933C16.8492 11.0487 16.98 11.046 17.0881 10.9859L29.9244 3.85461"
                  stroke={COLORS.text.secondary}
                  strokeWidth="1.40281"
                  strokeLinecap="round"
                />
                <Path
                  d="M5.28906 14.6639L12.6211 9.42676"
                  stroke={COLORS.text.secondary}
                  strokeWidth="1.40356"
                  strokeLinecap="round"
                />
                <Path
                  d="M28.334 14.6639L21.002 9.42676"
                  stroke={COLORS.text.secondary}
                  strokeWidth="1.40356"
                  strokeLinecap="round"
                />
              </Svg>
              <View style={styles.authOptionTextContainer}>
                <Text style={styles.authOptionText}>
                  이메일 인증
                </Text>
                <Text style={styles.authOptionDescription}>가입된 이메일로 인증할 수 있어요.</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={[styles.buttonContainer, { marginBottom: insets.bottom + 18 }]}>
        <LoginButton
          title="다음"
          onPress={handleNext}
          disabled={!selectedAuth}
          style={styles.nextButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 31,
    width: 44,
    height: 60,
    padding: 4,
    zIndex: 1,
  },
  title: {
    ...TYPOGRAPHY.headline2,
    color: COLORS.text.primary,
    textAlign: 'left',
    marginBottom: 40,
    paddingLeft: 8,
  },
  authOptions: {
    gap: 26,
    width: '100%',
    alignSelf: 'stretch',
  },
  authOption: {
    width: '100%',
    minHeight: 108,
    borderRadius: 14,
    backgroundColor: COLORS.background.primary,
    paddingVertical: 28,
    paddingLeft: 28,
    paddingRight: 20,
    borderWidth: 0,
    overflow: 'visible',
    shadowColor: COLORS.neutral.grey4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  authOptionSelected: {
    borderWidth: 1.7,
    borderColor: 'rgba(255, 128, 95, 0.80)',
    backgroundColor: COLORS.background.primary,
    shadowColor: COLORS.neutral.grey4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  authOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authOptionTextContainer: {
    flex: 1,
    marginLeft: 26,
    justifyContent: 'center',
    paddingTop: 0,
  },
  authOptionText: {
    ...TYPOGRAPHY.body1,
    marginBottom: 6,
  },
  authOptionDescription: {
    ...TYPOGRAPHY.caption2,
    fontSize: 14,
    lineHeight: 17,
  },
  buttonContainer: {
    paddingHorizontal: 37,
    alignItems: 'center',
  },
  nextButton: {
    width: 312,
  },
});
