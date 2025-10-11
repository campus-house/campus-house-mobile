import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { router } from 'expo-router';

export default function Step7_CompletionScreen() {
  useEffect(() => {
    // 2초 후 메인으로 이동
    const timer = setTimeout(() => {
      router.replace('/main/community?authCompleted=true');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.finalCompleteModal}>
        {/* 인증 완료 텍스트 */}
        <Text style={styles.finalCompleteTitle}>인증 완료</Text>

        {/* 환영 메시지 */}
        <Text style={styles.finalWelcomeText}>캠퍼스하우스에 오신걸 환영해요!</Text>

        {/* 마을 이미지 */}
        <Image
          source={require('@/assets/images/village.png')}
          style={styles.villageImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  finalCompleteModal: {
    width: 393,
    height: 852,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingTop: 0,
    alignItems: 'center',
  },
  finalCompleteTitle: {
    position: 'absolute',
    left: 37,
    top: 220,
    color: '#FF805F',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 20,
    paddingTop: 5,
  },
  finalWelcomeText: {
    position: 'absolute',
    left: 37,
    top: 260,
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 35,
  },
  villageImage: {
    position: 'absolute',
    width: 393,
    height: 400,
    bottom: 0,
  },
});