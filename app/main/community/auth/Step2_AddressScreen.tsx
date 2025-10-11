import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { BackIcon } from '@/components/Icon/BackIcon';

export default function Step2_AddressScreen() {
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <View style={styles.container}>
      {/* 메인 화면 */}
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
        <Text style={styles.addressQuestion}>어디에 거주 중이신가요?</Text>

        {/* 주소 검색 입력 필드 */}
        <TouchableOpacity
          style={styles.addressInputContainer}
          onPress={() => setShowSearchModal(true)}
        >
          <Text style={styles.addressPlaceholder}>거주하고 있는 주소 찾기</Text>
          <Image
            source={require('@/assets/images/magnifier.png')}
            style={styles.searchIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* 안내 문구 */}
        <Text style={styles.addressNotice}>
          *입력하신 정보는 정부24 주소 연동 이외에{'\n'}일절 사용되지 않아요.
        </Text>
      </View>

      {/* 주소 검색 결과 모달 (바텀시트) */}
      {showSearchModal && (
        <View style={styles.addressSearchModalOverlay}>
          <View style={styles.addressSearchModal}>
            {/* 제목 */}
            <Text style={styles.searchModalTitle}>
              <Text style={styles.searchModalTitleOrange}>안전하게</Text>
              <Text style={styles.searchModalTitleBlack}>
                {' '}
                살았던 집의 주소를 불러올 수 있어요!
              </Text>
            </Text>

            {/* 설명 */}
            <Text style={styles.searchModalDescription}>정부24에서 간편하게 정보를 조회해요.</Text>

            {/* 주소 불러오기 버튼 */}
            <TouchableOpacity
              style={styles.addressSearchButton}
              onPress={() => {
                setShowSearchModal(false);
                router.push('/main/community/auth/Step3_NameScreen');
              }}
            >
              <Text style={styles.addressSearchButtonText}>주소 불러오기</Text>
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
  addressQuestion: {
    position: 'absolute',
    left: 37,
    right: 37,
    top: 180,
    color: '#323232',
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 26,
    textAlign: 'left',
  },
  addressInputContainer: {
    position: 'absolute',
    left: 37,
    top: 240,
    width: 323,
    height: 58,
    backgroundColor: '#FFFFFF',
    borderRadius: 20.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  addressPlaceholder: {
    color: '#FF805F',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    flex: 1,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  addressNotice: {
    position: 'absolute',
    left: 37,
    top: 320,
    color: '#AAAAAA',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 19,
    width: 320,
  },
  addressSearchModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 1001,
  },
  addressSearchModal: {
    width: 393,
    height: 212,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26.5,
    borderTopRightRadius: 26.5,
    paddingTop: 30,
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
  searchModalTitle: {
    marginBottom: 10,
  },
  searchModalTitleOrange: {
    color: '#FF805F',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
  },
  searchModalTitleBlack: {
    color: '#323232',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
  },
  searchModalDescription: {
    color: '#AAA',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
    marginBottom: 30,
    width: 259,
  },
  addressSearchButton: {
    width: 327,
    height: 52,
    backgroundColor: '#FF805F',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  addressSearchButtonText: {
    color: '#FFFFFF',
    fontSize: 16.5,
    fontWeight: '600',
    fontFamily: 'Pretendard',
  },
});