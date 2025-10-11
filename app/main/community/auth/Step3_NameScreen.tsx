import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { BackIcon } from '@/components/Icon/BackIcon';

export default function Step3_NameScreen() {
  const [nameInput, setNameInput] = useState('');

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
        <Text style={styles.nameInputQuestion}>이름을 입력해주세요</Text>

        {/* 안내 */}
        <Text style={styles.nameInputGuide}>이름</Text>

        {/* 이름 입력 필드 */}
        <View style={styles.nameInputContainer}>
          <TextInput
            style={styles.nameInput}
            placeholder="이름 입력"
            placeholderTextColor="#CDCDCD"
            value={nameInput}
            onChangeText={setNameInput}
          />
        </View>

        {/* 하단 줄 */}
        <View
          style={[styles.nameInputLine, nameInput.length > 0 && styles.nameInputLineActive]}
        />

        {/* 안내 문구 */}
        <Text style={styles.nameInputNotice}>
          *입력하신 정보는 정부24 주소 연동 이외에{'\n'}일절 사용되지 않아요.
        </Text>

        {/* 다음 버튼 */}
        <TouchableOpacity
          style={[styles.nextButton, nameInput.length > 0 && styles.nextButtonActive]}
          onPress={() => {
            if (nameInput.length > 0) {
              router.push('/main/community/auth/Step4_DetailInfoScreen');
            }
          }}
        >
          <Text
            style={[styles.nextButtonText, nameInput.length > 0 && styles.nextButtonTextActive]}
          >
            다음
          </Text>
        </TouchableOpacity>
      </View>
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
  nameInputQuestion: {
    position: 'absolute',
    left: 37,
    right: 37,
    top: 180,
    color: '#323232',
    fontSize: 26,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 30,
    textAlign: 'left',
  },
  nameInputGuide: {
    position: 'absolute',
    left: 37,
    top: 250,
    color: '#636363',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    textAlign: 'center',
  },
  nameInputContainer: {
    position: 'absolute',
    left: 37,
    top: 280,
    width: 300.934,
  },
  nameInput: {
    color: '#323232',
    fontSize: 18.5,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  nameInputLine: {
    position: 'absolute',
    left: 37,
    top: 320,
    width: 308,
    height: 1.5,
    backgroundColor: '#CDCDCD',
  },
  nameInputLineActive: {
    backgroundColor: '#323232',
  },
  nameInputNotice: {
    position: 'absolute',
    left: 37,
    top: 335,
    color: '#AAAAAA',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
    width: 297.125,
  },
  nextButton: {
    position: 'absolute',
    left: 37,
    bottom: 100,
    width: 318,
    height: 56,
    backgroundColor: '#AAA',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  nextButtonActive: {
    backgroundColor: '#FF805F',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16.5,
    fontWeight: '700',
    fontFamily: 'Pretendard',
  },
  nextButtonTextActive: {
    color: '#FFFFFF',
  },
});