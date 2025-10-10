import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';
import Svg, { Path } from 'react-native-svg';
import { BackIcon } from '@/components/Icon/BackIcon';
import { CarrierSelectionModal } from '@/components/Modal/CarrierSelectionModal';
import { NameInputField } from '@/components/Input/NameInputField';
import { CarrierSelectField } from '@/components/Input/CarrierSelectField';
import { VerifyRequestButton } from '@/components/Button/VerifyRequestButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLayoutScale } from '@/utils/layout';

export default function IdentityVerificationScreen() {
  const { y, insets, figma } = useLayoutScale();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [rrnFirstDigit, setRrnFirstDigit] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isBirthDateFocused, setIsBirthDateFocused] = useState(false);
  const [isRrnFirstDigitFocused, setIsRrnFirstDigitFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isCarrierModalVisible, setIsCarrierModalVisible] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState('');
  const [isVerificationRequested, setIsVerificationRequested] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationCodeFocused, setIsVerificationCodeFocused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5분 = 300초
  const [isVerificationError, setIsVerificationError] = useState(false);

  const isFormValid =
    name.length > 0 &&
    birthDate.length === 6 &&
    rrnFirstDigit.length === 1 &&
    phoneNumber.length === 11 &&
    selectedCarrier.length > 0 &&
    verificationCode.length === 6;

  // 타이머 로직
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVerificationRequested && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isVerificationRequested, timeLeft]);

  // 시간을 MM:SS 형식으로 변환
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVerifyRequest = () => {
    // 인증 요청 로직 - 임시로 성공 처리
    // 실제로는 API 호출 후 결과에 따라 성공/실패 처리
    setIsVerificationRequested(true);
    setTimeLeft(300); // 5분으로 리셋
  };

  const handleCarrierSelect = (carrier: string) => {
    setSelectedCarrier(carrier);
  };

  const handleNext = () => {
    if (isFormValid) {
      // 인증번호 검증 로직 (임시로 000000으로 설정)
      // 실제로는 API 호출로 인증번호 검증
      if (verificationCode === '123456') {
        // 인증 성공 - 다음 단계로 이동
        router.push('/auth/signup/register');
      } else {
        // 인증 실패 - 오류 메시지 표시
        setIsVerificationError(true);
      }
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
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={{
          paddingTop: insets.top + y(65),
          paddingHorizontal: 35,
          paddingBottom: insets.bottom + 40,
        }}
      >
        {/* 제목 */}
        <Text style={[styles.title, { marginTop: y(48) }]}>본인인증</Text>
        <Text style={[styles.subtitle, { marginTop: y(8) }]}>*계정 도용을 막기 위한 본인인증 절차입니다.</Text>

        {/* 이름 입력 */}
        <View style={[styles.inputSection, { marginTop: y(55) }]}>
          <Text style={styles.label}>이름</Text>
          <NameInputField
            placeholder="이름 입력"
            value={name}
            onChangeText={setName}
            onFocus={() => setIsNameFocused(true)}
            onBlur={() => setIsNameFocused(false)}
            autoCapitalize="words"
            textContentType="name"
            width={296}
            marginLeft={3}
          />
        </View>

        {/* 주민등록번호 입력 */}
        <View style={[styles.inputSection, { marginTop: y(21.2) }]}>
          <Text style={styles.label}>주민등록번호</Text>
          <View style={styles.rrnContainer}>
            {/* 생년월일 6자리 */}
            <View style={styles.rrnInputContainer}>
              <TextInput
                style={[
                  styles.rrnTextInput,
                  (isBirthDateFocused || birthDate.length > 0) && styles.rrnTextInputFocused,
                ]}
                value={birthDate}
                onChangeText={setBirthDate}
                onFocus={() => setIsBirthDateFocused(true)}
                onBlur={() => setIsBirthDateFocused(false)}
                placeholder={isBirthDateFocused || birthDate.length > 0 ? '' : '생년월일 6자리'}
                placeholderTextColor={COLORS.neutral.grey3}
                keyboardType="numeric"
                maxLength={6}
              />
              <View
                style={[styles.rrnUnderline, isBirthDateFocused && styles.rrnUnderlineFocused]}
              />
            </View>

            {/* 하이픈 */}
            <View style={styles.hyphenContainer}>
              <Svg width={8} height={2} viewBox="0 0 8 2" fill="none">
                <Path d="M0.544922 1H6.54492" stroke="#CDCDCD" strokeLinecap="round" />
              </Svg>
            </View>

            {/* 주민등록번호 첫자리 */}
            <View style={styles.rrnFirstDigitContainer}>
              <TextInput
                style={[
                  styles.rrnFirstDigitInput,
                  (isRrnFirstDigitFocused || rrnFirstDigit.length > 0) &&
                    styles.rrnFirstDigitInputFocused,
                ]}
                value={rrnFirstDigit}
                onChangeText={setRrnFirstDigit}
                onFocus={() => setIsRrnFirstDigitFocused(true)}
                onBlur={() => setIsRrnFirstDigitFocused(false)}
                keyboardType="numeric"
                maxLength={1}
              />
              <View
                style={[
                  styles.rrnFirstDigitUnderline,
                  isRrnFirstDigitFocused && styles.rrnFirstDigitUnderlineFocused,
                ]}
              />
            </View>

            {/* 별표 표시 */}
            <Text style={styles.asterisks}>******</Text>
          </View>
        </View>

        {/* 휴대폰 입력 */}
        <View style={[styles.inputSection, { marginTop: y(21.2) }]}>
          <Text style={styles.label}>휴대폰</Text>
          <View style={styles.phoneRow}>
            {/* 통신사 선택 */}
            <CarrierSelectField
              selectedCarrier={selectedCarrier}
              onPress={() => setIsCarrierModalVisible(true)}
              width={71}
              marginLeft={3}
            />

            {/* 휴대폰 번호 */}
            <NameInputField
              placeholder="휴대폰 번호"
              value={phoneNumber}
              onChangeText={(text) => {
                if (text.length <= 11) {
                  setPhoneNumber(text);
                }
              }}
              onFocus={() => setIsPhoneFocused(true)}
              onBlur={() => setIsPhoneFocused(false)}
              autoCapitalize="none"
              textContentType="telephoneNumber"
              keyboardType="numeric"
              width={126}
              marginLeft={3}
              maxLength={11}
            />

            {/* 인증요청 버튼 */}
            <VerifyRequestButton
              onPress={handleVerifyRequest}
              disabled={phoneNumber.length !== 11}
              isRequested={isVerificationRequested}
            />
          </View>

          {/* 인증번호 입력 필드 */}
          {isVerificationRequested && (
            <View style={styles.verificationCodeContainer}>
              <View style={styles.verificationCodeInputWrapper}>
                <NameInputField
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  onChangeText={(text) => {
                    if (text.length <= 6) {
                      setVerificationCode(text);
                      if (isVerificationError) {
                        setIsVerificationError(false);
                      }
                    }
                  }}
                  onFocus={() => setIsVerificationCodeFocused(true)}
                  onBlur={() => setIsVerificationCodeFocused(false)}
                  keyboardType="numeric"
                  autoCorrect={false}
                  spellCheck={false}
                  width={298}
                  marginLeft={3}
                  hasError={isVerificationError}
                  errorMessage="인증 번호를 다시 확인해주세요"
                  maxLength={6}
                />
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
              </View>
            </View>
          )}

        </View>
      </ScrollView>

      {/* 다음 버튼 */}
      <TouchableOpacity
        style={[styles.nextButton, isFormValid && styles.nextButtonActive, { marginBottom: insets.bottom + 18 }]}
        onPress={handleNext}
        disabled={!isFormValid}
      >
        <Text style={[styles.nextButtonText, isFormValid && styles.nextButtonTextActive]}>
          다음
        </Text>
      </TouchableOpacity>

      {/* 통신사 선택 모달 */}
      <CarrierSelectionModal
        visible={isCarrierModalVisible}
        onClose={() => setIsCarrierModalVisible(false)}
        onSelect={handleCarrierSelect}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    // 하이브리드 좌표 시스템으로 동적 적용
  },
  backButton: {
    position: 'absolute',
    left: 31,
    width: 44,
    height: 60,
    padding: 4,
    zIndex: 10,
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
    width: '50%',
    height: 3,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
  },
  progressInactive: {
    width: '50%',
    height: 3,
    backgroundColor: COLORS.neutral.grey2,
  },
  title: {
    color: COLORS.text.primary,
    fontFamily: 'Pretendard',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 40,
  },
  subtitle: {
    color: COLORS.primary,
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 17,
  },
  inputSection: {
    marginBottom: 10,
  },
  label: {
    ...TYPOGRAPHY.caption3,
    color: COLORS.neutral.grey4,
    marginBottom: 3.2,
    textAlign: 'left',
  },
  inputContainer: {
    position: 'relative',
    marginLeft: 3,
  },
  textInput: {
    ...TYPOGRAPHY.body2,
    width: 300,
    color: COLORS.text.primary,
    paddingVertical: 4,
    textAlign: 'left',
  },
  textInputFocused: {
    color: COLORS.text.primary,
  },
  inputUnderline: {
    width: 308,
    height: 1.5,
    backgroundColor: COLORS.neutral.grey3,
    marginTop: 4,
  },
  inputUnderlineFocused: {
    backgroundColor: COLORS.text.primary,
  },
  rrnContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginLeft: 3,
  },
  rrnInputContainer: {
    position: 'relative',
  },
  rrnTextInput: {
    ...TYPOGRAPHY.body2,
    width: 127,
    color: COLORS.text.primary,
    letterSpacing: 0.555,
    paddingVertical: 4,
    textAlign: 'left',
  },
  rrnTextInputFocused: {
    color: COLORS.text.primary,
  },
  rrnUnderline: {
    width: '100%',
    height: 1.5,
    backgroundColor: COLORS.neutral.grey3,
    marginTop: 4,
  },
  rrnUnderlineFocused: {
    backgroundColor: COLORS.text.primary,
  },
  hyphenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  rrnFirstDigitContainer: {
    position: 'relative',
  },
  rrnFirstDigitInput: {
    ...TYPOGRAPHY.body2,
    width: 23,
    color: COLORS.neutral.grey3,
    paddingVertical: 4,
    textAlign: 'center',
  },
  rrnFirstDigitInputFocused: {
    color: COLORS.text.primary,
  },
  rrnFirstDigitUnderline: {
    width: 23,
    height: 1.5,
    backgroundColor: COLORS.neutral.grey3,
    marginTop: 8,
  },
  rrnFirstDigitUnderlineFocused: {
    backgroundColor: COLORS.text.primary,
  },
  asterisks: {
    ...TYPOGRAPHY.caption1,
    color: COLORS.neutral.grey3,
    letterSpacing: 1.12,
    marginBottom: 8,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  verificationCodeContainer: {
    marginTop: 24,
    marginLeft: 0,
  },
  verificationCodeInputWrapper: {
    position: 'relative',
  },
  timerText: {
    position: 'absolute',
    right: 24,
    top: 5,
    color: COLORS.primary,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
  },
  nextButton: {
    width: 312,
    height: 56,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 20,
    backgroundColor: COLORS.neutral.grey4,
    alignSelf: 'center',
  },
  nextButtonActive: {
    backgroundColor: COLORS.primary,
  },
  nextButtonText: {
    color: COLORS.text.inverse,
    fontFamily: 'Pretendard',
    fontSize: 16.5,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 16.5,
  },
  nextButtonTextActive: {
    color: COLORS.text.inverse,
  },
});
