import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/colors';
import Svg, { Path } from 'react-native-svg';
import { CarrierSelectionModal } from '@/components/Modal/CarrierSelectionModal';
import { IdentityVerificationErrorModal } from '@/components/Modal/IdentityVerificationErrorModal';

export default function IdentityVerificationScreen() {
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
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
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
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
      if (verificationCode === '000000') {
        // 인증 성공 - 다음 단계로 이동
        router.push('/auth/signup/register');
      } else {
        // 인증 실패 - 오류 메시지 표시
        setIsErrorModalVisible(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Svg width={13} height={23} viewBox="0 0 13 23" fill="none">
          <Path
            d="M11.6602 2L2.03634 11.3274C1.83148 11.5259 1.834 11.8554 2.04188 12.0508L11.6602 21.0909"
            stroke="#AAAAAA"
            strokeWidth="2.27273"
            strokeLinecap="round"
          />
        </Svg>
      </TouchableOpacity>

      {/* 진행 바 */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressActive} />
          <View style={styles.progressInactive} />
        </View>
      </View>

      {/* 메인 콘텐츠 */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {/* 제목 */}
        <Text style={styles.title}>본인인증</Text>
        <Text style={styles.subtitle}>*계정 도용을 막기 위한 본인인증 절차입니다.</Text>

        {/* 이름 입력 */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>이름</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.textInput,
                (isNameFocused || name.length > 0) && styles.textInputFocused,
              ]}
              value={name}
              onChangeText={setName}
              onFocus={() => setIsNameFocused(true)}
              onBlur={() => setIsNameFocused(false)}
              placeholder={isNameFocused || name.length > 0 ? '' : '이름 입력'}
              placeholderTextColor={COLORS.neutral.grey3}
            />
            <View style={[styles.inputUnderline, isNameFocused && styles.inputUnderlineFocused]} />
          </View>
        </View>

        {/* 주민등록번호 입력 */}
        <View style={styles.inputSection}>
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
        <View style={styles.inputSection}>
          <View style={styles.phoneContainer}>
            <View style={styles.phoneLabelContainer}>
              <Text style={styles.label}>휴대폰</Text>
              {/* 통신사 선택 */}
              <TouchableOpacity
                style={styles.carrierContainer}
                onPress={() => {
                  setIsCarrierModalVisible(true);
                }}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                activeOpacity={0.8}
              >
                <Text style={[styles.carrierText, selectedCarrier && styles.carrierTextSelected]}>
                  {selectedCarrier || '통신사'}
                </Text>
                <View style={{ marginLeft: 36, marginTop: -1 }}>
                  <Svg width={11} height={7} viewBox="0 0 11 7" fill="none">
                    <Path
                      d="M1 1L5.3536 5.35352L9.70703 1"
                      stroke="#CDCDCD"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </Svg>
                </View>
                <View style={styles.carrierUnderline} />
              </TouchableOpacity>
            </View>

            {/* 휴대폰 번호 */}
            <View style={styles.phoneNumberContainer}>
              <TextInput
                style={[
                  styles.phoneTextInput,
                  (isPhoneFocused || phoneNumber.length > 0) && styles.phoneTextInputFocused,
                ]}
                value={phoneNumber}
                onChangeText={(text) => {
                  if (text.length <= 11) {
                    setPhoneNumber(text);
                  }
                }}
                onFocus={() => setIsPhoneFocused(true)}
                onBlur={() => setIsPhoneFocused(false)}
                placeholder={isPhoneFocused || phoneNumber.length > 0 ? '' : '휴대폰 번호'}
                placeholderTextColor={COLORS.neutral.grey3}
                keyboardType="numeric"
                maxLength={11}
              />
              <View
                style={[styles.phoneUnderline, isPhoneFocused && styles.phoneUnderlineFocused]}
              />
            </View>

            {/* 인증요청 버튼 */}
            <TouchableOpacity
              style={[
                styles.verifyRequestButton,
                phoneNumber.length === 11 && styles.verifyRequestButtonActive,
              ]}
              onPress={handleVerifyRequest}
              disabled={phoneNumber.length !== 11}
              activeOpacity={phoneNumber.length === 11 ? 0.8 : 1}
            >
              <Text
                style={[
                  styles.verifyRequestText,
                  phoneNumber.length === 11 && styles.verifyRequestButtonTextActive,
                ]}
              >
                {isVerificationRequested ? '재요청' : '인증요청'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 인증번호 입력 필드 */}
          {isVerificationRequested && (
            <View style={styles.verificationCodeContainer}>
              <View style={styles.verificationCodeInputContainer}>
                <TextInput
                  style={[
                    styles.verificationCodeInput,
                    (isVerificationCodeFocused || verificationCode.length > 0) &&
                      styles.verificationCodeInputFocused,
                  ]}
                  value={verificationCode}
                  onChangeText={(text) => {
                    setVerificationCode(text);
                    if (isVerificationError) {
                      setIsVerificationError(false);
                    }
                    // 오류 모달이 열려있으면 닫기
                    if (isErrorModalVisible) {
                      setIsErrorModalVisible(false);
                    }
                  }}
                  onFocus={() => setIsVerificationCodeFocused(true)}
                  onBlur={() => setIsVerificationCodeFocused(false)}
                  placeholder={
                    isVerificationCodeFocused || verificationCode.length > 0 ? '' : '인증번호 입력'
                  }
                  placeholderTextColor={COLORS.neutral.grey3}
                  keyboardType="numeric"
                  maxLength={6}
                />
                <View
                  style={[
                    styles.verificationCodeUnderline,
                    isVerificationCodeFocused && styles.verificationCodeUnderlineFocused,
                  ]}
                />
              </View>
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            </View>
          )}

          {/* 인증번호 오류 메시지 */}
          {isVerificationRequested && isVerificationError && (
            <View style={styles.verificationErrorContainer}>
              <Text style={styles.verificationErrorText}>인증 번호를 다시 확인해주세요</Text>
              <View style={styles.verificationErrorLine} />
            </View>
          )}
        </View>
      </ScrollView>

      {/* 다음 버튼 */}
      <TouchableOpacity
        style={[styles.nextButton, isFormValid && styles.nextButtonActive]}
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

      <IdentityVerificationErrorModal
        visible={isErrorModalVisible}
        onClose={() => setIsErrorModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    paddingTop: 60,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  progressContainer: {
    marginBottom: 40,
    paddingHorizontal: 0,
    marginLeft: -30,
    marginRight: 0,
    alignSelf: 'stretch',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    transform: [{ translateX: -40 }],
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
    marginBottom: 5,
    marginLeft: 10,
  },
  subtitle: {
    color: COLORS.primary,
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 17,
    marginBottom: 20,
    marginLeft: 10,
  },
  inputSection: {
    marginBottom: 10,
    marginTop: 30,
  },
  label: {
    color: COLORS.neutral.grey4,
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 4,
  },
  inputContainer: {
    position: 'relative',
  },
  textInput: {
    width: 300.934,
    color: COLORS.neutral.grey3,
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22.519,
    paddingVertical: 8,
  },
  textInputFocused: {
    color: COLORS.text.primary,
  },
  inputUnderline: {
    width: 308,
    height: 1.5,
    backgroundColor: COLORS.neutral.grey3,
    marginTop: 6,
  },
  inputUnderlineFocused: {
    backgroundColor: COLORS.text.primary,
  },
  rrnContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  rrnInputContainer: {
    position: 'relative',
  },
  rrnTextInput: {
    width: 127,
    color: COLORS.neutral.grey3,
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0.555,
    paddingTop: 8,
    paddingBottom: 8,
  },
  rrnTextInputFocused: {
    color: COLORS.text.primary,
  },
  rrnUnderline: {
    width: 127,
    height: 1.5,
    backgroundColor: COLORS.neutral.grey3,
    marginTop: 6,
  },
  rrnUnderlineFocused: {
    backgroundColor: COLORS.text.primary,
  },
  hyphenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  rrnFirstDigitContainer: {
    position: 'relative',
  },
  rrnFirstDigitInput: {
    width: 23,
    color: COLORS.neutral.grey3,
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
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
    color: COLORS.neutral.grey3,
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 1.12,
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  phoneLabelContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  carrierContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minHeight: 40,
    paddingVertical: 8,
    marginTop: 4,
  },
  carrierText: {
    color: COLORS.neutral.grey3,
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    paddingTop: 0,
  },
  carrierTextSelected: {
    color: COLORS.neutral.grey5,
  },
  carrierUnderline: {
    position: 'absolute',
    bottom: -6,
    left: 0,
    width: 110,
    height: 1.5,
    backgroundColor: COLORS.neutral.grey3,
  },
  phoneNumberContainer: {
    position: 'relative',
    marginLeft: 24,
  },
  phoneTextInput: {
    width: 150,
    color: COLORS.neutral.grey3,
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0.555,
    paddingTop: 33,
    paddingBottom: 0,
  },
  phoneTextInputFocused: {
    color: COLORS.text.primary,
  },
  phoneUnderline: {
    width: 145,
    height: 1.5,
    backgroundColor: COLORS.neutral.grey3,
    marginTop: 14,
  },
  phoneUnderlineFocused: {
    backgroundColor: COLORS.text.primary,
  },
  verifyRequestButton: {
    width: 80,
    height: 40,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 128, 95, 0.10)',
    marginLeft: -2,
  },
  verifyRequestButtonActive: {
    backgroundColor: COLORS.primary,
  },
  verifyRequestText: {
    color: COLORS.primary,
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
  },
  verifyRequestButtonTextActive: {
    color: COLORS.text.inverse,
  },
  verificationCodeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    marginTop: 20,
  },
  verificationCodeInputContainer: {
    flex: 1,
  },
  verificationCodeInput: {
    width: 300.934,
    color: COLORS.neutral.grey3,
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22.519,
    paddingVertical: 8,
  },
  verificationCodeInputFocused: {
    color: COLORS.text.primary,
  },
  verificationCodeUnderline: {
    width: 308,
    height: 1.5,
    backgroundColor: COLORS.neutral.grey3,
    marginTop: 8,
  },
  verificationCodeUnderlineFocused: {
    backgroundColor: COLORS.text.primary,
  },
  timerText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 8,
  },
  verificationErrorContainer: {
    marginTop: 8,
  },
  verificationErrorText: {
    color: COLORS.primary,
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
  },
  verificationErrorLine: {
    width: 163.5,
    height: 1,
    backgroundColor: COLORS.primary,
    marginTop: 2,
  },
  nextButton: {
    width: 318,
    height: 56,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 20,
    backgroundColor: COLORS.neutral.grey4,
    alignSelf: 'center',
    marginBottom: 60,
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
