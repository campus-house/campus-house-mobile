import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native';
import { COLORS } from '@/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatRewardModal from '@/components/ChatRewardModal';
import ProfileScreen from '@/components/ProfileScreen';

export default function ProfileMainScreen() {
  const [showChatScreen, setShowChatScreen] = useState(false);
  const [showChatList, setShowChatList] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const navigation: any = useNavigation();

  useEffect(() => {
    const parent = navigation?.getParent?.();
    if (parent && typeof parent.setOptions === 'function') {
      // 채팅 화면(showChatScreen)에서만 하단바 숨기기
      if (showChatScreen) {
        parent.setOptions({ 
          tabBarStyle: { 
            display: 'none'
          } 
        });
      } else {
        parent.setOptions({ 
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 76,
            width: 393,
            backgroundColor: '#FFF',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            shadowColor: '#000',
            shadowOffset: { width: -1.5, height: -4.5 },
            shadowOpacity: 0.03,
            shadowRadius: 4,
            elevation: 5,
          }
        });
      }
    }
  }, [showChatScreen, navigation]);



  // 사용자 프로필 화면
  if (showUserProfile) {
    return (
      <ProfileScreen onBack={() => setShowUserProfile(false)} />
    );
  }

  if (showChatList) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => setShowChatList(false)}>
            <Image source={require('@/assets/images/backbutton.png')} style={styles.backIcon} resizeMode="contain" />
          </Pressable>
          <Text style={styles.headerTitle}>채팅</Text>
        </View>
        
        <Pressable style={styles.avatarOnlyContainer} onPress={() => setShowUserProfile(true)}>
          <View style={styles.greenCircle}>
            <Image source={require('@/assets/images/real-racoon-4x.png')} style={styles.avatarImage} resizeMode="contain" />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.topRow}>
              <Text style={styles.nameText}>삐약이</Text>
              <Text style={styles.timeText}>3분 전</Text>
            </View>
            <Text style={styles.messageText}>공동구매 글 보고 연락드려요! 다른...</Text>
          </View>
          <View style={styles.badgeContainerFirst}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        </Pressable>

        <View style={styles.chatItemContainer}>
          <View style={styles.yellowCircle}>
            <Image source={require('@/assets/images/squirrel4x.png')} style={styles.avatarImage} resizeMode="contain" />
          </View>
          <Image source={require('@/assets/images/donut.png')} style={styles.donutImage} resizeMode="cover" />
          <View style={styles.textContainer}>
            <View style={styles.topRow}>
              <Text style={styles.nameText}>말차맛초코</Text>
              <Text style={styles.timeText}>40분 전</Text>
            </View>
            <Text style={styles.messageText}>안녕하세요! 도넛 혹시 몇 개 남았나요?</Text>
          </View>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        </View>

        <Pressable style={styles.chatItemContainer2} onPress={() => router.push('/chat')}>
          <View style={styles.greenCircle}>
            <Image source={require('@/assets/images/real-racoon-4x.png')} style={styles.avatarImage} resizeMode="contain" />
          </View>
          <Image source={require('@/assets/images/donut.png')} style={styles.donutImage2} resizeMode="cover" />
          <View style={styles.textContainer}>
            <View style={styles.topRow}>
              <Text style={styles.nameText}>라쿤인데요</Text>
              <Text style={styles.timeText}>40분 전</Text>
            </View>
            <Text style={styles.messageText}>도넛 다 나눔하셨나요??</Text>
          </View>
          <View style={styles.badgeContainerThird}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        </Pressable>

        <View style={styles.chatItemContainer3}>
          <View style={styles.orangeCircle}>
            <Image source={require('@/assets/images/hedgehog4x.png')} style={styles.avatarImage} resizeMode="contain" />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.topRow}>
              <Text style={styles.nameText}>말하는고구마</Text>
              <Text style={styles.timeText}>2달 전</Text>
            </View>
            <Text style={[styles.messageText, { fontWeight: '400', color: COLORS.text.disabled }]}>감사합니다!</Text>
          </View>
        </View>

        <View style={styles.chatItemContainer4}>
          <View style={styles.yellowCircle}>
            <Image source={require('@/assets/images/squirrel4x.png')} style={styles.avatarImage} resizeMode="contain" />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.topRow}>
              <Text style={styles.nameText}>떡살찹</Text>
              <Text style={styles.timeText}>2달 전</Text>
            </View>
            <Text style={[styles.messageText, { fontWeight: '400', color: COLORS.text.disabled }]}>오늘 요아정 같이 먹어서 즐...</Text>
          </View>
        </View>
      </View>
    );
  }


  if (showChatScreen) {
    return (
      <View style={[styles.container, { backgroundColor: '#fff', justifyContent: 'flex-start' }]}>
        {/* Empty state (first photo) */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
          <Image 
            source={require('@/assets/images/cry_racoon.png')} 
            style={{ width: 290, height: 290, marginBottom: 16, marginTop: 80 }}
            resizeMode="contain"
          />
          <View style={{ alignItems: 'center', marginTop: -30 }}>
            <Text style={{ fontSize: 24, lineHeight: 32, fontWeight: '600', fontFamily: 'Pretendard', color: '#323232', textAlign: 'center', marginBottom: 8 }}>소통한 이웃이 없어요!</Text>
            <Text style={{ fontSize: 16, lineHeight: 22, fontFamily: 'Pretendard', color: '#636363', textAlign: 'center', marginBottom: 24 }}>첫 채팅 시 1000c 리워드를 드려요</Text>
            <TouchableOpacity 
              style={{ backgroundColor: '#4CAF50', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24 }}
              onPress={() => { setShowChatList(true); setShowChatScreen(false); }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600' }}>친구 생성</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* 리워드 모달 */}
        <ChatRewardModal
          visible={showRewardModal}
          onClose={() => setShowRewardModal(false)}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.chatButton}
        onPress={() => { setShowChatScreen(true); setShowChatList(false); }}
      >
        <Text style={styles.chatButtonText}>채팅하기</Text>
      </TouchableOpacity>
      <Text style={styles.title}>마이페이지 화면</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: COLORS.text.primary,
    marginTop: 20,
  },
  friendButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
  },
  friendButtonOnRaccoon: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  friendButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    textAlign: 'center',
  },
  chatButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  chatButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    textAlign: 'center',
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  raccoonImage: {
    width: 320,
    height: 340,
    marginBottom: -40,
  },
  mainText: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
    fontFamily: "Pretendard",
    color: "#323232",
    textAlign: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  subText: {
    fontSize: 17,
    lineHeight: 24,
    fontFamily: "Pretendard",
    color: "#636363",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  // Chat detail header styles
  detailHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 82,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailBackBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailBackIcon: {
    width: 24,
    height: 19,
  },
  detailTitleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  detailTitle: {
    width: 78,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#000',
    textAlign: 'center',
  },
  detailSubtitle: {
    width: 80,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '300',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'center',
    marginTop: 2,
  },
  detailMenuBtn: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailMenuIcon: {
    width: 24,
    height: 20,
  },
  chatBodyPlaceholder: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  // 채팅 목록 스타일
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingTop: 82,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  backButton: {
    height: 32,
    width: 32,
    marginRight: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    marginTop: -3,
  },
  backText: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 26,
    fontWeight: "600",
    fontFamily: "Pretendard",
    color: "#000",
    textAlign: "left",
  },
  chatList: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
  },
  avatarOnlyContainer: {
    position: 'absolute',
    top: 165,
    left: 34,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatItemContainer: {
    position: 'absolute',
    top: 253,
    left: 34,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatItemContainer2: {
    position: 'absolute',
    top: 345,
    left: 34,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatItemContainer3: {
    position: 'absolute',
    top: 440,
    left: 34,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatItemContainer4: {
    position: 'absolute',
    top: 525,
    left: 34,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 12,
    alignItems: 'center',
    minHeight: 80,
  },
  avatarContainer: {
    marginRight: 10,
  },
  greenCircle: {
    width: 59,
    height: 59,
    borderRadius: 29.5,
    backgroundColor: '#86d382',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  yellowCircle: {
    width: 59,
    height: 59,
    borderRadius: 29.5,
    backgroundColor: '#ffd429',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  orangeCircle: {
    width: 59,
    height: 59,
    borderRadius: 29.5,
    backgroundColor: '#ff805f',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 55,
    height: 55,
    transform: [{ translateY: 5 }, { translateX: 0 }],
  },
  donutImage: {
    position: 'absolute',
    bottom: -15,
    right: 235,
    width: 37,
    height: 37,
    borderRadius: 6,
  },
  donutImage2: {
    position: 'absolute',
    bottom: -15,
    right: 155,
    width: 37,
    height: 37,
    borderRadius: 6,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 15,
    marginLeft: 0,
  },
  nameTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 22,
    marginTop: 0,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 17,
    lineHeight: 27,
    fontFamily: "Pretendard",
    color: "#323232",
    textAlign: "left",
  },
  timeText: {
    fontSize: 13,
    lineHeight: 35,
    fontFamily: "Pretendard",
    color: "#aaa",
    textAlign: "left",
    marginLeft: 8,
  },
  messageText: {
    width: 203,
    fontSize: 14,
    lineHeight: 27,
    fontWeight: "600",
    fontFamily: "Pretendard",
    color: "#323232",
    textAlign: "left",
    overflow: "hidden",
  },
  badgeContainer: {
    backgroundColor: "#ff805f",
    height: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 11,
    paddingVertical: 2,
    borderRadius: 9,
    position: 'absolute',
    top: 8,
    right: -24,
  },
  badgeContainerFirst: {
    backgroundColor: "#ff805f",
    height: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 11,
    paddingVertical: 2,
    borderRadius: 9,
    position: 'absolute',
    top: 8,
    right: -35,
  },
  badgeContainerThird: {
    backgroundColor: "#ff805f",
    height: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 11,
    paddingVertical: 2,
    borderRadius: 9,
    position: 'absolute',
    top: 8,
    right: -104,
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 35,
    fontWeight: "500",
    fontFamily: "Pretendard",
    color: "#fff",
    textAlign: "center",
    marginTop: -11,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    fontFamily: "Pretendard",
    color: "#323232",
    textAlign: "left",
    overflow: "hidden",
    marginRight: 10,
  },
  unreadBadge: {
    backgroundColor: '#ff805f',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 2,
  },
  unreadText: {
    fontSize: 12,
    lineHeight: 35,
    fontWeight: "500",
    fontFamily: "Pretendard",
    color: "#fff",
    textAlign: "center",
  },
});
