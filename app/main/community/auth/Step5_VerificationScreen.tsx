import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { BackIcon } from '@/components/Icon/BackIcon';

export default function Step5_VerificationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.authCompleteModal}>
        {/* 뒤로가기 버튼 */}
        <TouchableOpacity
          style={styles.authCompleteBackButton}
          onPress={() => router.back()}
        >
          <BackIcon />
        </TouchableOpacity>

        {/* 제목 */}
        <Text style={styles.authCompleteHeaderTitle}>간편 인증하기</Text>

        {/* 메인 텍스트 */}
        <Text style={styles.authCompleteMainText}>앱에서 인증해 주세요</Text>

        {/* 설명 텍스트 */}
        <Text style={styles.authCompleteDescription}>
          앱에서 인증 후 완료 버튼을 눌러주세요.
        </Text>

        {/* 문제 발생 시 텍스트 */}
        <Text style={styles.authCompleteIssueText}>인증 문자가 오지 않아요</Text>

        {/* 완료 버튼 */}
        <TouchableOpacity
          style={styles.authCompleteButton}
          onPress={() => router.push('/main/community/auth/Step6_LoadingScreen')}
        >
          <Text style={styles.authCompleteButtonText}>앱에서 인증을 완료했어요</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  authCompleteModal: {
    width: 393,
    height: 852,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  authCompleteBackButton: {
    position: 'absolute',
    left: 20,
    top: 70,
    padding: 8,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  authCompleteHeaderTitle: {
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
  authCompleteMainText: {
    position: 'absolute',
    left: 37,
    right: 37,
    top: 140,
    color: '#323232',
    fontSize: 24.706,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 30,
    textAlign: 'left',
    paddingTop: 5,
  },
  authCompleteDescription: {
    position: 'absolute',
    left: 37,
    right: 37,
    top: 190,
    color: '#AAA',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
    textAlign: 'left',
    width: 259,
  },
  authCompleteIssueText: {
    position: 'absolute',
    left: 37,
    right: 37,
    top: 230,
    color: '#FF805F',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
  authCompleteButton: {
    position: 'absolute',
    left: 37,
    bottom: 50,
    width: 318,
    height: 56,
    backgroundColor: '#FF805F',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authCompleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16.5,
    fontWeight: '700',
    fontFamily: 'Pretendard',
  },
});