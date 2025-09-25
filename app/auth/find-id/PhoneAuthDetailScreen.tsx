import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import CarrierSelectModal from './CarrierSelectModal';
import IdFindResultScreen from './IdFindResultScreen';

interface PhoneAuthDetailScreenProps {
  onBack?: () => void;
}

export default function PhoneAuthDetailScreen({ onBack }: PhoneAuthDetailScreenProps) {
  const [isAllTermsAgreed, setIsAllTermsAgreed] = useState(false);
  const [individualTerms, setIndividualTerms] = useState({
    service: false,
    carrier: false,
    privacy: false,
    identity: false,
  });
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [residentNumber, setResidentNumber] = useState('');
  const [carrier, setCarrier] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Focus states for input fields
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const residentNumberRef = useRef<TextInput>(null);
  
  // Modal state
  const [isCarrierModalVisible, setIsCarrierModalVisible] = useState(false);
  
  // Auth request state
  const [isAuthRequested, setIsAuthRequested] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showResult, setShowResult] = useState(false);
  const [foundId, setFoundId] = useState('');

  const handleAllTermsToggle = () => {
    const newValue = !isAllTermsAgreed;
    setIsAllTermsAgreed(newValue);
    setIndividualTerms({
      service: newValue,
      carrier: newValue,
      privacy: newValue,
      identity: newValue,
    });
  };

  const handleIndividualTermToggle = (term: keyof typeof individualTerms) => {
    const newTerms = {
      ...individualTerms,
      [term]: !individualTerms[term],
    };
    setIndividualTerms(newTerms);
    
    // 모든 개별 약관이 체크되면 전체 동의도 체크
    const allChecked = Object.values(newTerms).every(Boolean);
    setIsAllTermsAgreed(allChecked);
  };

  const handleNext = () => {
    // 다음 단계로 이동하는 로직
    if (authCode.length === 6) {
      setFoundId('bangmiooo1'); // 임시 아이디
      setShowResult(true);
    } else {
      console.log('Phone auth detail completed');
    }
  };

  // 인증번호 입력 완료 감지 (자동 넘어가기 제거)
  // useEffect(() => {
  //   if (authCode.length === 6) {
  //     // 인증번호가 6자리 입력되면 아이디 찾기 결과 표시
  //     setTimeout(() => {
  //       setFoundId('bangmiooo1'); // 임시 아이디
  //       setShowResult(true);
  //     }, 1000);
  //   }
  // }, [authCode]);

  const handleCarrierSelect = (selectedCarrier: string) => {
    setCarrier(selectedCarrier);
  };

  const handleBirthDateChange = (text: string) => {
    setBirthDate(text);
    // 6자리 입력 완료되면 주민등록번호 뒷자리로 포커스 이동
    if (text.length === 6) {
      setTimeout(() => {
        residentNumberRef.current?.focus();
      }, 100);
    }
  };

  const handleAuthRequest = () => {
    if (phoneNumber.length < 8) {
      alert('휴대폰 번호를 올바르게 입력해주세요.');
      return;
    }
    
    setIsAuthRequested(true);
    setTimeLeft(300); // Reset to 5 minutes
    // 인증 요청 후 화면이 바뀌도록 처리
    alert('인증번호가 발송되었습니다.');
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAuthRequested && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAuthRequested, timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isFormValid = isAllTermsAgreed && name && birthDate && residentNumber && carrier && phoneNumber;
  const isPhoneNumberComplete = phoneNumber.length >= 8;

  if (showResult) {
    return <IdFindResultScreen foundId={foundId} onBack={() => setShowResult(false)} />;
  }

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
        <Text style={styles.headerTitle}>아이디 찾기</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Title */}
        <Text style={styles.title}>
          본인 확인을 위해{'\n'}인증을 진행해 주세요
        </Text>
        
        {/* Terms and Conditions */}
        <View style={styles.termsSection}>
          <TouchableOpacity 
            style={styles.allTermsContainer}
            onPress={handleAllTermsToggle}
          >
            <View style={[styles.checkbox, isAllTermsAgreed && styles.checkboxChecked]}>
              {isAllTermsAgreed ? (
                <Svg width="31" height="31" viewBox="0 0 31 31" fill="none">
                  <Rect x="0.660156" y="0.522949" width="29.68" height="29.687" rx="14.84" fill="#FF6B35"/>
                  <Path d="M8.08008 14.6596L14.0912 20.3142L22.9201 10.4186" stroke="white" strokeWidth="2.43685" strokeLinecap="round"/>
                </Svg>
              ) : (
                <Svg width="31" height="31" viewBox="0 0 31 31" fill="none">
                  <Rect x="0.660156" y="0.522949" width="29.68" height="29.687" rx="14.84" fill="#CDCDCD"/>
                  <Path d="M8.08008 14.6596L14.0912 20.3142L22.9201 10.4186" stroke="white" strokeWidth="2.43685" strokeLinecap="round"/>
                </Svg>
              )}
            </View>
            <Text style={styles.allTermsText}>약관 전체 동의하기</Text>
          </TouchableOpacity>
          
          {/* Separator line - only show when all terms are agreed */}
          {isAllTermsAgreed && (
            <View style={styles.termsSeparator} />
          )}

          {!isAllTermsAgreed && (
            <View style={styles.individualTerms}>
            <TouchableOpacity 
              style={styles.termItem}
              onPress={() => handleIndividualTermToggle('service')}
            >
              <View style={styles.termCheckbox}>
                {individualTerms.service ? (
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Path
                      d="M2 6L8 12L18 2"
                      stroke="#FF6B35"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                ) : (
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Path
                      d="M2 6L8 12L18 2"
                      stroke="#CDCDCD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                )}
              </View>
              <Text style={styles.termText}>휴대폰 본인인증 서비스 이용약관</Text>
              <Svg width="7" height="11" viewBox="0 0 7 11" fill="none">
                <Path
                  d="M0.800781 0.931152L5.39063 5.12542C5.60982 5.32573 5.60718 5.6718 5.38495 5.86873L0.800781 9.93115"
                  stroke="#CDCDCD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.termItem}
              onPress={() => handleIndividualTermToggle('carrier')}
            >
              <View style={styles.termCheckbox}>
                {individualTerms.carrier ? (
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Path
                      d="M2 6L8 12L18 2"
                      stroke="#FF6B35"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                ) : (
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Path
                      d="M2 6L8 12L18 2"
                      stroke="#CDCDCD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                )}
              </View>
              <Text style={styles.termText}>휴대폰 통신사 이용약관 동의</Text>
                <Svg width="7" height="11" viewBox="0 0 7 11" fill="none">
                  <Path
                    d="M0.800781 0.931152L5.39063 5.12542C5.60982 5.32573 5.60718 5.6718 5.38495 5.86873L0.800781 9.93115"
                    stroke="#CDCDCD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </Svg>
              </TouchableOpacity>

            <TouchableOpacity 
              style={styles.termItem}
              onPress={() => handleIndividualTermToggle('privacy')}
            >
              <View style={styles.termCheckbox}>
                {individualTerms.privacy ? (
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Path
                      d="M2 6L8 12L18 2"
                      stroke="#FF6B35"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                ) : (
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Path
                      d="M2 6L8 12L18 2"
                      stroke="#CDCDCD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                )}
              </View>
              <Text style={styles.termText}>개인정보 제공 및 이용 동의</Text>
              <Svg width="7" height="11" viewBox="0 0 7 11" fill="none">
                <Path
                  d="M0.800781 0.931152L5.39063 5.12542C5.60982 5.32573 5.60718 5.6718 5.38495 5.86873L0.800781 9.93115"
                  stroke="#CDCDCD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.termItem}
              onPress={() => handleIndividualTermToggle('identity')}
            >
              <View style={styles.termCheckbox}>
                {individualTerms.identity ? (
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Path
                      d="M2 6L8 12L18 2"
                      stroke="#FF6B35"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                ) : (
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Path
                      d="M2 6L8 12L18 2"
                      stroke="#CDCDCD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                )}
              </View>
              <Text style={styles.termText}>고유식별정보 처리</Text>
              <Svg width="7" height="11" viewBox="0 0 7 11" fill="none">
                <Path
                  d="M0.800781 0.931152L5.39063 5.12542C5.60982 5.32573 5.60718 5.6718 5.38495 5.86873L0.800781 9.93115"
                  stroke="#CDCDCD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          )}
        </View>

        {/* Input Fields */}
        <View style={styles.inputSection}>
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>이름</Text>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={[
                  styles.inputField,
                  focusedField === 'name' && styles.inputFieldFocused
                ]}
                placeholder={focusedField === 'name' ? '' : '이름 입력'}
                value={name}
                onChangeText={setName}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholderTextColor="#CDCDCD"
              />
              <View style={[
                styles.inputUnderline,
                focusedField === 'name' && styles.inputUnderlineFocused
              ]} />
            </View>
          </View>

          {/* Resident Registration Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>주민등록번호</Text>
            <View style={styles.residentNumberContainer}>
              <View style={styles.residentNumberField}>
                <TextInput
                  style={[
                    styles.residentNumberInput,
                    focusedField === 'birthDate' && styles.inputFieldFocused
                  ]}
                  placeholder={focusedField === 'birthDate' ? '' : '생년월일 6자리'}
                  value={birthDate}
                  onChangeText={handleBirthDateChange}
                  onFocus={() => setFocusedField('birthDate')}
                  onBlur={() => setFocusedField(null)}
                  placeholderTextColor="#CDCDCD"
                  keyboardType="numeric"
                  maxLength={6}
                />
                <View style={[
                  styles.birthDateUnderline,
                  focusedField === 'birthDate' && styles.inputUnderlineFocused
                ]} />
              </View>
              <View style={styles.hyphenContainer}>
                <Svg width="8" height="2" viewBox="0 0 8 2" fill="none">
                  <Path
                    d="M0.722656 0.529297H6.72266"
                    stroke="#CDCDCD"
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
              <View style={styles.residentNumberField}>
                <TextInput
                  ref={residentNumberRef}
                  style={[
                    styles.residentNumberInput,
                    focusedField === 'residentNumber' && styles.inputFieldFocused
                  ]}
                  placeholder={focusedField === 'residentNumber' ? '' : '•------'}
                  value={residentNumber ? residentNumber + '******' : ''}
                  onChangeText={setResidentNumber}
                  onFocus={() => setFocusedField('residentNumber')}
                  onBlur={() => setFocusedField(null)}
                  placeholderTextColor="#CDCDCD"
                  keyboardType="numeric"
                  maxLength={1}
                />
                <View style={[
                  styles.residentNumberUnderline,
                  focusedField === 'residentNumber' && styles.inputUnderlineFocused
                ]} />
              </View>
            </View>
          </View>

          {/* Mobile Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>휴대폰</Text>
            <View style={styles.phoneContainer}>
              <TouchableOpacity 
                style={styles.carrierField}
                onPress={() => setIsCarrierModalVisible(true)}
              >
                <TextInput
                  style={[
                    styles.carrierInput,
                    focusedField === 'carrier' && styles.inputFieldFocused
                  ]}
                  placeholder="통신사"
                  value={carrier}
                  onChangeText={setCarrier}
                  onFocus={() => setFocusedField('carrier')}
                  onBlur={() => setFocusedField(null)}
                  placeholderTextColor="#CDCDCD"
                  editable={false}
                />
                <View style={[
                  styles.carrierUnderline,
                  focusedField === 'carrier' && styles.inputUnderlineFocused
                ]} />
                <Svg width="11" height="7" viewBox="0 0 11 7" fill="none">
                  <Path
                    d="M1.17773 1.5293L5.53134 5.88281L9.88477 1.5293"
                    stroke="#CDCDCD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </Svg>
              </TouchableOpacity>
              <View style={styles.phoneField}>
                <TextInput
                  style={[
                    styles.phoneInput,
                    focusedField === 'phoneNumber' && styles.inputFieldFocused
                  ]}
                  placeholder={focusedField === 'phoneNumber' ? '' : '휴대폰 번호'}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  onFocus={() => setFocusedField('phoneNumber')}
                  onBlur={() => setFocusedField(null)}
                  placeholderTextColor="#CDCDCD"
                  keyboardType="phone-pad"
                />
                <View style={[
                  styles.phoneUnderline,
                  focusedField === 'phoneNumber' && styles.inputUnderlineFocused
                ]} />
              </View>
              <TouchableOpacity 
                style={[
                  styles.authRequestButton, 
                  isPhoneNumberComplete && styles.authRequestButtonActive
                ]}
                onPress={handleAuthRequest}
              >
                <Text style={[
                  styles.authRequestText, 
                  isPhoneNumberComplete && styles.authRequestTextActive
                ]}>
                  {isAuthRequested ? '재요청' : '인증요청'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Auth Code Input - Only show when auth is requested */}
          {isAuthRequested && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>인증번호 입력</Text>
              <View style={styles.authCodeContainer}>
                <View style={styles.authCodeField}>
                  <TextInput
                    style={[
                      styles.authCodeInput,
                      focusedField === 'authCode' && styles.inputFieldFocused
                    ]}
                    placeholder={focusedField === 'authCode' ? '' : '인증번호 입력'}
                    value={authCode}
                    onChangeText={setAuthCode}
                    onFocus={() => setFocusedField('authCode')}
                    onBlur={() => setFocusedField(null)}
                    placeholderTextColor="#CDCDCD"
                    keyboardType="numeric"
                    maxLength={6}
                  />
                  <View style={[
                    styles.authCodeUnderline,
                    focusedField === 'authCode' && styles.inputUnderlineFocused
                  ]} />
                </View>
                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            isFormValid ? styles.nextButtonActive : styles.nextButtonInactive
          ]}
          onPress={handleNext}
          disabled={!isFormValid}
        >
          <Text style={[
            styles.nextButtonText,
            isFormValid ? styles.nextButtonTextActive : styles.nextButtonTextInactive
          ]}>
            다음
          </Text>
        </TouchableOpacity>
      </View>

      {/* Carrier Select Modal */}
      <CarrierSelectModal
        visible={isCarrierModalVisible}
        onClose={() => setIsCarrierModalVisible(false)}
        onSelect={handleCarrierSelect}
      />
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
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 35,
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 20,
  },
  termsSection: {
    marginBottom: 20,
  },
  termsSeparator: {
    width: 345,
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  allTermsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 29.68,
    height: 28.45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 29.68,
    height: 28.45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  allTermsText: {
    color: '#323232',
    textAlign: 'left',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 27.211,
    marginLeft: 12,
  },
  individualTerms: {
    paddingLeft: 0,
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  termCheckbox: {
    width: 31,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  termText: {
    flex: 1,
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontSize: 15.364,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 26,
  },
  inputSection: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    color: '#AAA',
    textAlign: 'left',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
  },
  inputFieldContainer: {
    width: 300.934,
  },
  inputField: {
    color: '#000000',
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22.519,
    paddingVertical: 8,
  },
  inputFieldFocused: {
    color: '#000000',
  },
  inputUnderline: {
    width: 308,
    height: 1,
    backgroundColor: '#CDCDCD',
  },
  inputUnderlineFocused: {
    backgroundColor: '#000000',
  },
  residentNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  residentNumberField: {
    flex: 1,
  },
  hyphenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '42%',
    top: '42%',
    transform: [{ translateX: -4 }],
  },
  residentNumberInput: {
    color: '#000000',
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 1.12,
    paddingVertical: 8,
  },
  birthDateUnderline: {
    width: 127,
    height: 1,
    backgroundColor: '#CDCDCD',
  },
  residentNumberUnderline: {
    width: 15,
    height: 1,
    backgroundColor: '#CDCDCD',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  carrierField: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  carrierInput: {
    color: '#000000',
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    paddingVertical: 8,
    width: 78.104,
  },
  carrierUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 78.104,
    height: 1,
    backgroundColor: '#CDCDCD',
  },
  phoneField: {
    flex: 1,
    position: 'relative',
  },
  phoneInput: {
    color: '#000000',
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    paddingVertical: 8,
  },
  phoneUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 138,
    height: 1,
    backgroundColor: '#CDCDCD',
  },
  authRequestButton: {
    display: 'flex',
    width: 100,
    height: 50,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 128, 95, 0.10)',
  },
  authRequestButtonActive: {
    backgroundColor: '#FF805F',
  },
  authRequestText: {
    color: '#FF805F',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
  },
  authRequestTextActive: {
    color: '#FFF',
  },
  authCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  authCodeField: {
    flex: 1,
    position: 'relative',
  },
  authCodeInput: {
    color: '#000000',
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    paddingVertical: 8,
  },
  authCodeUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    backgroundColor: '#CDCDCD',
  },
  timerContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  timerText: {
    color: '#FF805F',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 34,
    paddingTop: 20,
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
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 20,
  },
  nextButtonTextActive: {
    color: '#ffffff',
  },
  nextButtonTextInactive: {
    color: '#ffffff',
  },
});