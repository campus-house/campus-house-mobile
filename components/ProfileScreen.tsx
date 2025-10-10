import * as React from "react";
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import Vector119 from './Vector119';

interface ProfileScreenProps {
  onBack: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    console.log('뒤로가기 버튼 클릭됨');
    try {
      if (onBack) {
        onBack();
      } else {
        navigation.goBack();
      }
    } catch (error) {
      console.log('뒤로가기 에러:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 파란 배경 */}
      <View style={styles.blueBackground} />
      
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => {
          console.log('버튼 클릭됨!');
          handleBackPress();
        }}
        activeOpacity={0.7}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Image 
          source={require('@/assets/images/backbutton.png')} 
          style={styles.backIcon} 
          resizeMode="contain" 
        />
      </TouchableOpacity>
      
      {/* 라쿤인데요님 텍스트 */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>라쿤인데요님</Text>
      </View>
      
      {/* 구름들 */}
      <View style={styles.cloudContainer}>
        <Image 
          source={require('@/assets/images/cloud.png')} 
          style={styles.cloud1} 
          resizeMode="contain" 
        />
        <Image 
          source={require('@/assets/images/cloud.png')} 
          style={styles.cloud2} 
          resizeMode="contain" 
        />
        <Image 
          source={require('@/assets/images/cloud.png')} 
          style={styles.cloud3} 
          resizeMode="contain" 
        />
      </View>
      
      {/* 말풍선 */}
      <View style={styles.speechBubble}>
        <Text style={styles.speechText}>안녕하세요! 친하게 지내요!!</Text>
        {/* 말풍선 꼬리 */}
        <View style={styles.speechBubbleTail} />
      </View>
      
      {/* 라쿤 캐릭터 */}
      <View style={styles.raccoonContainer}>
        <Image 
          source={require('@/assets/images/helloracoon.png')} 
          style={styles.raccoonImage} 
          resizeMode="contain" 
        />
      </View>
      
      {/* 초록 들판 */}
      <Vector119 />
      
      {/* 하단 정보 카드들 */}
      <View style={styles.bottomCards}>
        <View style={styles.card}>
          <View style={styles.cardIcon}>
            <Text style={styles.cardIconText}>C</Text>
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>보유 리워드</Text>
            <Text style={styles.cardValue}>100C</Text>
          </View>
        </View>
        
        <View style={styles.card}>
          <View style={styles.cardIcon}>
            <Text style={styles.cardIconText}>♥</Text>
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>보유 하트</Text>
            <Text style={styles.cardValue}>70개</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  blueBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: '#4ba2ff',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 15,
    zIndex: 999,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  backText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  titleContainer: {
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  titleText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#fff',
    textAlign: 'center',
  },
  cloudContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  cloud1: {
    position: 'absolute',
    top: 260,
    right: 30,
    width: 130,
    height: 80,
  },
  cloud2: {
    position: 'absolute',
    top: 430,
    left: 20,
    width: 70,
    height: 35,
  },
  cloud3: {
    position: 'absolute',
    top: 440,
    right: 10,
    width: 60,
    height: 30,
  },
  speechBubble: {
    position: 'absolute',
    top: 350,
    left: 80,
    right: 80,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 5,
  },
  speechBubbleTail: {
    position: 'absolute',
    bottom: -13,
    right: 35,
    width: 0,
    height: 0,
    borderLeftWidth: 18,
    borderRightWidth: 18,
    borderTopWidth: 25,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
  },
  speechText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
    marginLeft: 15,
  },
  raccoonContainer: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  },
  raccoonImage: {
    width: 200,
    height: 202,
  },
  grassBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: '#4CAF50',
  },
  bottomCards: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff805f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardIconText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardTextContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 12,
    color: '#ff805f',
    fontFamily: 'Pretendard',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#323232',
    fontFamily: 'Pretendard',
  },
});

export default ProfileScreen;
