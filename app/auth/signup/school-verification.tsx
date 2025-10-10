import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { BackIcon } from '@/components/Icon/BackIcon';
import { LoadingModal } from '@/components/Modal/LoadingModal';
import { VerificationCompleteModal } from '@/components/Modal/VerificationCompleteModal';
import { NameInputField } from '@/components/Input/NameInputField';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLayoutScale } from '@/utils/layout';

export default function EmailVerificationScreen() {
  const { y, insets, figma } = useLayoutScale();
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerificationComplete, setIsVerificationComplete] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setKeyboardVisible(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setKeyboardVisible(false);
  };

  const isEmailValid = email.length > 0 && email.includes('@');

  const handleVerify = () => {
    if (isEmailValid) {
      setIsLoading(true);

      // 3초 후에 로딩 완료 (실제로는 API 호출)
      setTimeout(() => {
        setIsLoading(false);
        setIsVerificationComplete(true);

        // 2초 후에 인증 완료 모달 닫기
        setTimeout(() => {
          setIsVerificationComplete(false);
          // 본인인증 페이지로 이동
          router.push('/auth/signup/identity-verification');
        }, 2000);
      }, 3000); // 3초로 설정
    }
  };

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity 
        style={[styles.backButton, { top: insets.top + y(65 - figma.SAFE_TOP) }]} 
        onPress={() => router.back()}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityLabel="뒤로 가기"
      >
        <BackIcon />
      </TouchableOpacity>

      {/* 진행 바 */}
      <View style={[styles.progressContainer, { top: insets.top + y(116 - figma.SAFE_TOP) }]}>
        <View style={styles.progressBar}>
          <View style={styles.progressActive} />
          <View style={styles.progressInactive} />
        </View>
      </View>

      {/* 메인 콘텐츠 */}
      <View style={[styles.contentContainer, { 
        paddingTop: insets.top + y(118),
        paddingLeft: 32,
        paddingRight: 32,
        paddingBottom: insets.bottom + 40,
      }]}>
        {/* 제목 */}
        <Text style={[styles.title, { marginTop: y(18) }]}>경희대학교에{'\n'}재학 중임을 인증해주세요.</Text>

        {/* 이메일 입력 섹션 */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>이메일</Text>
          <NameInputField
            placeholder="이메일 입력"
            value={email}
            onChangeText={handleEmailChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoCapitalize="none"
            textContentType="emailAddress"
            editable={true}
            selectTextOnFocus={true}
            width={300.934}
            marginLeft={2}
          />
        </View>
      </View>

      {/* 인증하기 버튼 */}
      <TouchableOpacity
        style={[styles.verifyButton, isEmailValid && styles.verifyButtonActive, { marginBottom: insets.bottom + 18 }]}
        onPress={handleVerify}
        disabled={!isEmailValid}
      >
        <Text style={styles.verifyButtonText}>인증하기</Text>
      </TouchableOpacity>

      {/* 로딩 모달 */}
      <LoadingModal visible={isLoading} onClose={() => setIsLoading(false)} />

      {/* 인증 완료 모달 */}
      <VerificationCompleteModal
        visible={isVerificationComplete}
        onClose={() => setIsVerificationComplete(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  backButton: {
    position: 'absolute',
    left: 31,
    zIndex: 10,
    width: 44,
    height: 60,
    padding: 4,
  },
  progressContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 5,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  progressActive: {
    flex: 1,
    height: 3,
    backgroundColor: COLORS.primary,
  },
  progressInactive: {
    flex: 1,
    height: 3,
    backgroundColor: COLORS.neutral.grey2,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.headline2,
    width: 260,
    color: COLORS.text.primary,
    marginBottom: 30,
    textAlign: 'left',
  },
  inputSection: {
    marginBottom: 40,
    width: '100%',
  },
  label: {
    ...TYPOGRAPHY.caption3,
    color: COLORS.neutral.grey4,
    marginBottom: 6,
    textAlign: 'left',
  },
  verifyButton: {
    width: 312,
    height: 56,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 20,
    backgroundColor: COLORS.neutral.grey4,
    alignSelf: 'center',
  },
  verifyButtonActive: {
    backgroundColor: COLORS.primary,
  },
  verifyButtonText: {
    color: COLORS.text.inverse,
    fontFamily: 'Pretendard',
    fontSize: 16.5,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 16.5,
  },
});
