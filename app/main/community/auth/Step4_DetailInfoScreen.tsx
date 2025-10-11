import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { BackIcon } from '@/components/Icon/BackIcon';

export default function Step4_DetailInfoScreen() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [infoNameInput, setInfoNameInput] = useState('');
  const [infoPhoneInput, setInfoPhoneInput] = useState('');
  const [infoIdNumberInput, setInfoIdNumberInput] = useState('');
  const [infoIdNumberSecond, setInfoIdNumberSecond] = useState('');
  const [selectedAuth, setSelectedAuth] = useState('');
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showDistrictModal, setShowDistrictModal] = useState(false);

  const getIdNumberSecondDisplay = () => {
    if (infoIdNumberSecond.length === 0) return '';
    return '*'.repeat(infoIdNumberSecond.length);
  };

  const isFormValid = 
    selectedRegion &&
    selectedDistrict &&
    infoNameInput &&
    infoPhoneInput &&
    infoIdNumberInput &&
    infoIdNumberSecond &&
    selectedAuth;

  return (
    <View style={styles.container}>
      <View style={styles.addressModal}>
        {/* 뒤로가기 버튼 */}
        <TouchableOpacity
          style={styles.addressBackButton}
          onPress={() => router.back()}
        >
          <BackIcon />
        </TouchableOpacity>

        {/* 제목 */}
        <Text style={styles.addressHeaderTitle}>주소 불러오기</Text>

        {/* 질문 */}
        <Text style={styles.infoInputQuestion}>정보를 입력해주세요</Text>

        {/* 안내 */}
        <Text style={styles.infoInputGuide}>
          *입력하신 정보는 정부24 주소 연동 이외에{'\n'}일절 사용되지 않아요.
        </Text>

        {/* 지역 필드 */}
        <TouchableOpacity
          style={styles.infoFieldContainer}
          onPress={() => setShowRegionModal(true)}
        >
          <Text
            style={[styles.infoFieldLabel, selectedRegion && styles.infoFieldLabelSelected]}
          >
            {selectedRegion || '지역'}
          </Text>
          <Svg width="11" height="7" viewBox="0 0 11 7" fill="none" style={styles.dropdownIcon}>
            <Path
              d="M1 1.5L5.3536 5.85352L9.70703 1.5"
              stroke="#CDCDCD"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
        <View style={[styles.infoFieldLine, selectedRegion && styles.infoInputLineActive]} />

        {/* 시/군/구 필드 */}
        <TouchableOpacity
          style={styles.infoFieldContainer2}
          onPress={() => setShowDistrictModal(true)}
        >
          <Text
            style={[styles.infoFieldLabel, selectedDistrict && styles.infoFieldLabelSelected]}
          >
            {selectedDistrict || '시/군/구 선택'}
          </Text>
          <Svg width="11" height="7" viewBox="0 0 11 7" fill="none" style={styles.dropdownIcon}>
            <Path
              d="M1 1.5L5.3536 5.85352L9.70703 1.5"
              stroke="#CDCDCD"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
        <View style={[styles.infoFieldLine2, selectedDistrict && styles.infoInputLineActive]} />

        {/* 이름 필드 */}
        <View style={styles.infoInputContainer}>
          <TextInput
            style={[styles.infoInput, infoNameInput.length > 0 && styles.infoInputActive]}
            placeholder="이름"
            placeholderTextColor="#CDCDCD"
            value={infoNameInput}
            onChangeText={setInfoNameInput}
          />
        </View>
        <View
          style={[styles.infoInputLine, infoNameInput.length > 0 && styles.infoInputLineActive]}
        />

        {/* 휴대폰 번호 필드 */}
        <View style={styles.infoInputContainer2}>
          <TextInput
            style={[styles.infoInput, infoPhoneInput.length > 0 && styles.infoInputActivePhone]}
            placeholder="휴대폰 11자리 입력하기"
            placeholderTextColor="#CDCDCD"
            value={infoPhoneInput}
            onChangeText={setInfoPhoneInput}
            keyboardType="numeric"
            maxLength={11}
          />
        </View>
        <View
          style={[
            styles.infoInputLine2,
            infoPhoneInput.length > 0 && styles.infoInputLineActive,
          ]}
        />

        {/* 주민등록번호 필드 */}
        <View style={styles.infoInputContainer3}>
          <View style={styles.idNumberRow}>
            <TextInput
              style={[
                styles.idNumberInput1,
                infoIdNumberInput.length > 0 && styles.infoInputActive,
              ]}
              placeholder="생년월일 6자리"
              placeholderTextColor="#CDCDCD"
              value={infoIdNumberInput}
              onChangeText={setInfoIdNumberInput}
              keyboardType="numeric"
              maxLength={6}
            />
            <Svg width="18" height="2" viewBox="0 0 18 2" style={styles.dashIcon}>
              <Path d="M1.37891 1H17.3789" stroke="#AAAAAA" strokeLinecap="round" />
            </Svg>
            <TextInput
              style={[
                styles.idNumberSecond,
                infoIdNumberSecond.length > 0 && {
                  color: '#323232',
                  fontSize: 20,
                  fontWeight: '400',
                  fontFamily: 'Pretendard',
                  lineHeight: 22.519,
                },
              ]}
              placeholder="*******"
              placeholderTextColor="#CDCDCD"
              value={getIdNumberSecondDisplay()}
              onChangeText={setInfoIdNumberSecond}
              keyboardType="numeric"
              maxLength={7}
              secureTextEntry={false}
            />
          </View>
        </View>
        <View style={styles.idNumberLines}>
          <View
            style={[
              styles.idNumberLine1,
              infoIdNumberInput.length > 0 && styles.infoInputLineActive,
            ]}
          />
          <View
            style={[
              styles.idNumberLine2,
              infoIdNumberSecond.length > 0 && styles.infoInputLineActive,
            ]}
          />
        </View>

        {/* 인증수단 선택 */}
        <Text style={styles.authMethodTitle}>인증수단을 선택해주세요</Text>

        {/* 인증 옵션들 */}
        <View style={styles.authOptionsContainer}>
          <TouchableOpacity
            style={styles.authOptionWithText}
            onPress={() => setSelectedAuth('카카오')}
          >
            <Image
              source={require('@/assets/images/kakao_logo.png')}
              style={styles.authImage}
              resizeMode="cover"
            />
            <Text
              style={[
                styles.authOptionTextNew,
                selectedAuth === '카카오' && styles.authOptionTextSelected,
              ]}
            >
              카카오
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.authOptionWithText}
            onPress={() => setSelectedAuth('네이버')}
          >
            <Image
              source={require('@/assets/images/naver_logo.png')}
              style={styles.authImage}
              resizeMode="cover"
            />
            <Text
              style={[
                styles.authOptionTextNew,
                selectedAuth === '네이버' && styles.authOptionTextSelected,
              ]}
            >
              네이버
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.authOptionWithText}
            onPress={() => setSelectedAuth('토스')}
          >
            <Image
              source={require('@/assets/images/toss.png')}
              style={styles.authImage}
              resizeMode="cover"
            />
            <Text
              style={[
                styles.authOptionTextNew,
                selectedAuth === '토스' && styles.authOptionTextSelected,
              ]}
            >
              토스
            </Text>
          </TouchableOpacity>
        </View>

        {/* 인증하기 버튼 */}
        <TouchableOpacity
          style={[
            styles.infoSubmitButton,
            isFormValid && styles.infoSubmitButtonActive,
          ]}
          onPress={() => {
            if (isFormValid) {
              router.push('/main/community/auth/Step5_VerificationScreen');
            }
          }}
        >
          <Text
            style={[
              styles.infoSubmitButtonText,
              isFormValid && styles.infoSubmitButtonTextActive,
            ]}
          >
            인증하기
          </Text>
        </TouchableOpacity>
      </View>

      {/* 지역 선택 모달 */}
      {showRegionModal && (
        <View style={styles.regionModalOverlay}>
          <View style={styles.regionModal}>
            <Text style={styles.regionModalTitle}>지역을 선택해주세요</Text>

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedRegion('서울특별시');
                setShowRegionModal(false);
              }}
            >
              <Text style={styles.regionOptionText}>서울특별시</Text>
            </TouchableOpacity>
            <View style={styles.regionOptionLine} />

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedRegion('경기도');
                setShowRegionModal(false);
              }}
            >
              <Text style={styles.regionOptionTextSelected}>경기도</Text>
            </TouchableOpacity>
            <View style={styles.regionOptionLine} />

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedRegion('인천');
                setShowRegionModal(false);
              }}
            >
              <Text style={styles.regionOptionText}>인천</Text>
            </TouchableOpacity>
            <View style={styles.regionOptionLine} />

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedRegion('강원도');
                setShowRegionModal(false);
              }}
            >
              <Text style={styles.regionOptionText}>강원도</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 시/군/구 선택 모달 */}
      {showDistrictModal && (
        <View style={styles.regionModalOverlay}>
          <View style={styles.regionModal}>
            <Text style={styles.regionModalTitle}>시/군/구를 선택해주세요</Text>

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedDistrict('기흥구');
                setShowDistrictModal(false);
              }}
            >
              <Text style={styles.regionOptionText}>기흥구</Text>
            </TouchableOpacity>
            <View style={styles.regionOptionLine} />

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedDistrict('영통구');
                setShowDistrictModal(false);
              }}
            >
              <Text style={styles.regionOptionText}>영통구</Text>
            </TouchableOpacity>
            <View style={styles.regionOptionLine} />

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedDistrict('수지구');
                setShowDistrictModal(false);
              }}
            >
              <Text style={styles.regionOptionText}>수지구</Text>
            </TouchableOpacity>
            <View style={styles.regionOptionLine} />

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedDistrict('팔달구');
                setShowDistrictModal(false);
              }}
            >
              <Text style={styles.regionOptionText}>팔달구</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666666',
  },
  addressModal: {
    width: 393,
    height: 852,
    backgroundColor: '#FCFCFC',
    position: 'relative',
  },
  addressBackButton: {
    position: 'absolute',
    left: 20,
    top: 70,
    padding: 8,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  addressHeaderTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 78,
    color: '#323232',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 17.76,
    textAlign: 'center',
  },
  infoInputQuestion: {
    position: 'absolute',
    left: 37,
    right: 37,
    top: 140,
    color: '#323232',
    fontSize: 25.246,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 30,
    textAlign: 'left',
  },
  infoInputGuide: {
    position: 'absolute',
    left: 37,
    top: 180,
    color: '#AAA',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
    width: 320,
  },
  infoFieldContainer: {
    position: 'absolute',
    left: 37,
    top: 255,
    width: 135,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoFieldContainer2: {
    position: 'absolute',
    left: 200,
    top: 255,
    width: 135,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoFieldLabel: {
    color: '#CDCDCD',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
  },
  infoFieldLabelSelected: {
    color: '#323232',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  infoFieldLine: {
    position: 'absolute',
    left: 37,
    top: 290,
    width: 134,
    height: 1.2,
    backgroundColor: '#CDCDCD',
  },
  infoFieldLine2: {
    position: 'absolute',
    left: 200,
    top: 290,
    width: 134,
    height: 1.2,
    backgroundColor: '#CDCDCD',
  },
  infoInputContainer: {
    position: 'absolute',
    left: 37,
    top: 320,
    width: 320,
    height: 30,
  },
  infoInputContainer2: {
    position: 'absolute',
    left: 37,
    top: 390,
    width: 320,
    height: 30,
  },
  infoInputContainer3: {
    position: 'absolute',
    left: 37,
    top: 458,
    width: 320,
    height: 30,
  },
  infoInput: {
    color: '#CDCDCD',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  infoInputActive: {
    color: '#323232',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
  },
  infoInputActivePhone: {
    color: '#323232',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
  },
  infoInputLine: {
    position: 'absolute',
    left: 37,
    top: 355,
    width: 330,
    height: 1.23,
    backgroundColor: '#CDCDCD',
  },
  infoInputLine2: {
    position: 'absolute',
    left: 37,
    top: 425,
    width: 330,
    height: 1.2,
    backgroundColor: '#CDCDCD',
  },
  infoInputLineActive: {
    backgroundColor: '#323232',
  },
  idNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  idNumberInput1: {
    color: '#CDCDCD',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
    paddingVertical: 5,
    paddingHorizontal: 0,
    width: 131,
  },
  dashIcon: {
    marginHorizontal: 8,
  },
  idNumberSecond: {
    color: '#CDCDCD',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
    width: 127,
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  idNumberLines: {
    position: 'absolute',
    left: 37,
    top: 493,
    flexDirection: 'row',
  },
  idNumberLine1: {
    width: 131,
    height: 1.2,
    backgroundColor: '#CDCDCD',
    marginRight: 24,
  },
  idNumberLine2: {
    width: 131,
    height: 1.2,
    backgroundColor: '#CDCDCD',
  },
  authMethodTitle: {
    position: 'absolute',
    left: 37,
    top: 545,
    color: '#323232',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 21.105,
    textAlign: 'left',
  },
  authOptionsContainer: {
    position: 'absolute',
    left: 37,
    top: 600,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  },
  authOptionWithText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  authImage: {
    width: 55.961,
    height: 57.058,
    borderRadius: 23,
  },
  authOptionTextNew: {
    color: '#636363',
    fontSize: 16.459,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 24.709,
    marginTop: 12,
    textAlign: 'center',
  },
  authOptionTextSelected: {
    color: '#FF805F',
  },
  infoSubmitButton: {
    position: 'absolute',
    left: 37,
    bottom: 50,
    width: 318,
    height: 56,
    backgroundColor: '#AAA',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSubmitButtonActive: {
    backgroundColor: '#FF805F',
  },
  infoSubmitButtonText: {
    color: '#FFFFFF',
    fontSize: 16.5,
    fontWeight: '700',
    fontFamily: 'Pretendard',
  },
  infoSubmitButtonTextActive: {
    color: '#FFFFFF',
  },
  regionModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 1002,
  },
  regionModal: {
    width: 393,
    height: 393,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26.5,
    borderTopRightRadius: 26.5,
    paddingTop: 40,
    paddingHorizontal: 33,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 5,
  },
  regionModalTitle: {
    color: '#323232',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
    marginBottom: 30,
    width: 339,
  },
  regionOption: {
    width: 342,
    paddingVertical: 15,
  },
  regionOptionText: {
    color: '#636363',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  regionOptionTextSelected: {
    color: '#636363',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  regionOptionLine: {
    width: 342,
    height: 1,
    backgroundColor: '#F2F2F2',
    marginVertical: 5,
  },
});