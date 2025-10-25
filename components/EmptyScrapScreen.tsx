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

        {/* 텍스트 컨테이너 */}
        <View style={styles.textContainer}>
          {/* 메인 메시지 */}
          <Text style={styles.mainMessage}>스크랩한 집이 없어요</Text>
          
          {/* 서브 메시지 */}
          <Text style={styles.subMessage}>저장하신 걸 바탕으로 집 추천도 해줘요!</Text>
        </View>

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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  characterContainer: {
    marginBottom: 20,
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 64,
    zIndex: 1,
    elevation: 1,
  },
  characterImage: {
    width: 335,
    height: 225,
    flexShrink: 0,
    aspectRatio: 67/45,
    zIndex: 1,
  },
  textContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 12,
    marginBottom: -23,
    marginTop: -38,
    marginLeft: 0,
    zIndex: 10,
    elevation: 10,
    minHeight: 100,
  },
  mainMessage: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 8,
    zIndex: 10,
    elevation: 10,
  },
  subMessage: {
    color: '#636363',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 40,
    zIndex: 10,
    elevation: 10,
  },
  browseButton: {
    display: 'flex',
    width: 110,
    padding: 7.34,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7.34,
    backgroundColor: '#FF805F',
    borderRadius: 73.4021,
    borderWidth: 0,
    marginTop: 2,
    shadowColor: '#FF805F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  browseButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 26.718,
  },
});
