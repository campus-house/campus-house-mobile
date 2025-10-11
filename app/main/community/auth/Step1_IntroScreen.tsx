import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

interface Step1_IntroScreenProps {
  onStart: () => void;
}

export default function Step1_IntroScreen({ onStart }: Step1_IntroScreenProps) {
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.authModal}>
        {/* 자물쇠 아이콘 */}
        <Image
          source={require('@/assets/images/big_lock.png')}
          style={styles.lockIcon}
          resizeMode="contain"
        />

        {/* 리워드 배너 */}
        <View style={styles.rewardBanner}>
          <Text style={styles.rewardText}>인증시 800c리워드 지급</Text>
        </View>

        {/* 설명 텍스트 */}
        <Text style={styles.authDescription}>거주지를 인증하고</Text>
        <Text style={styles.authDescription}>유저들이랑 소통해요</Text>

        {/* 인증 버튼 */}
        <TouchableOpacity
          style={styles.authButton}
          onPress={onStart}
        >
          <Text style={styles.authButtonText}>거주지 인증하러 가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  authModal: {
    width: 253,
    height: 346.55,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  lockIcon: {
    width: 92.719,
    height: 114.663,
    marginBottom: 20,
  },
  rewardBanner: {
    width: 166.136,
    height: 29.91,
    backgroundColor: '#FF805F',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  rewardText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Pretendard',
  },
  authDescription: {
    color: '#636363',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 5,
  },
  authButton: {
    width: 253,
    height: 57,
    backgroundColor: '#FF805F',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 27.2,
    textAlign: 'center',
  },
});