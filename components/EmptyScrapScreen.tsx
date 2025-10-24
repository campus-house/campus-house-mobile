import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Tabs } from 'expo-router';

export default function EmptyScrapScreen() {
  const router = useRouter();

  const handleBrowseHouses = () => {
    // 집 둘러보기 버튼 클릭 시 집찾기 탭으로 이동
    router.push('/main/map/');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.content}>
        {/* 우는 라쿤 캐릭터 */}
        <View style={styles.characterContainer}>
          <Image 
            source={require('@/assets/images/crying_racoon.png')} 
            style={styles.characterImage} 
            resizeMode="contain" 
          />
        </View>

        {/* 메인 메시지 */}
        <Text style={styles.mainMessage}>스크랩한 집이 없어요</Text>
        
        {/* 서브 메시지 */}
        <Text style={styles.subMessage}>저장하신걸 바탕으로 집 추천도 해줘요!</Text>

        {/* 집 둘러보기 버튼 */}
        <TouchableOpacity 
          style={styles.browseButton} 
          onPress={handleBrowseHouses}
          activeOpacity={0.8}
        >
          <Text style={styles.browseButtonText}>집 둘러보기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  characterContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  characterImage: {
    width: 335,
    height: 225,
    flexShrink: 0,
    aspectRatio: 67/45,
  },
  mainMessage: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 28,
  },
  subMessage: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    color: '#636363',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  browseButton: {
    backgroundColor: '#FF805F',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    minWidth: 160,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF805F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#fff',
    textAlign: 'center',
  },
});
