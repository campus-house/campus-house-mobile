import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { router } from 'expo-router';
import PhoneAuthDetailScreen from './PhoneAuthDetailScreen';
import EmailAuthScreen from './EmailAuthScreen';

type AuthMethod = 'phone' | 'email' | null;

export default function IdFindScreen() {
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
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
        <Text style={styles.title}>본인 확인을 위해{'\n'}인증을 진행해 주세요</Text>

        {/* Auth Options */}
        <View style={styles.authOptions}>
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
                  stroke="#636363"
                  strokeWidth="1.39999"
                />
                <Path
                  d="M8.17773 4.00012H17.0175"
                  stroke="#636363"
                  strokeWidth="0.999995"
                  strokeLinecap="round"
                />
                <Circle
                  cx="12.3613"
                  cy="29.9999"
                  r="1.49999"
                  stroke="#636363"
                  strokeWidth="0.999995"
                />
              </Svg>
              <View style={styles.authOptionTextContainer}>
                <Text
                  style={[
                    styles.authOptionText,
                    selectedAuth === 'phone' && styles.authOptionTextSelected,
                  ]}
                >
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
                  stroke="#636363"
                  strokeWidth="1.40356"
                />
                <Path
                  d="M3.90625 4.55544L16.7387 10.9933C16.8492 11.0487 16.98 11.046 17.0881 10.9859L29.9244 3.85461"
                  stroke="#636363"
                  strokeWidth="1.40281"
                  strokeLinecap="round"
                />
                <Path
                  d="M5.28906 14.6639L12.6211 9.42676"
                  stroke="#636363"
                  strokeWidth="1.40356"
                  strokeLinecap="round"
                />
                <Path
                  d="M28.334 14.6639L21.002 9.42676"
                  stroke="#636363"
                  strokeWidth="1.40356"
                  strokeLinecap="round"
                />
              </Svg>
              <View style={styles.authOptionTextContainer}>
                <Text
                  style={[
                    styles.authOptionText,
                    selectedAuth === 'email' && styles.authOptionTextSelected,
                  ]}
                >
                  이메일 인증
                </Text>
                <Text style={styles.authOptionDescription}>가입된 이메일로 인증할 수 있어요.</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            selectedAuth ? styles.nextButtonActive : styles.nextButtonInactive,
          ]}
          onPress={handleNext}
          disabled={!selectedAuth}
        >
          <Text
            style={[
              styles.nextButtonText,
              selectedAuth ? styles.nextButtonTextActive : styles.nextButtonTextInactive,
            ]}
          >
            다음
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
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 35,
    textAlign: 'left',
    marginBottom: 40,
    paddingLeft: 8,
  },
  authOptions: {
    gap: 16,
    width: '100%',
    alignSelf: 'stretch',
  },
  authOption: {
    width: '100%',
    minHeight: 120,
    borderRadius: 14,
    backgroundColor: '#FFF',
    padding: 20,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  authOptionSelected: {
    borderWidth: 1.7,
    borderColor: 'rgba(255, 128, 95, 0.80)',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  authOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authOptionTextContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  authOptionText: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 6,
  },
  authOptionTextSelected: {
    color: '#FF6B35',
  },
  authOptionDescription: {
    color: '#636363',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 34,
    alignItems: 'center',
  },
  nextButton: {
    display: 'flex',
    width: '100%',
    height: 56,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 20,
  },
  nextButtonActive: {
    backgroundColor: '#FF6B35',
  },
  nextButtonInactive: {
    backgroundColor: '#AAA',
  },
  nextButtonText: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 16.5,
    fontWeight: '700',
  },
  nextButtonTextActive: {
    color: '#ffffff',
  },
  nextButtonTextInactive: {
    color: '#ffffff',
  },
});
