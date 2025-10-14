import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import { COLORS } from '@/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatRewardModal from '@/components/ChatRewardModal';
import ProfileScreen from '@/components/ProfileScreen';
import Svg, { Path, Circle } from 'react-native-svg';

export default function ChatListScreen() {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const navigation: any = useNavigation();

  useEffect(() => {
    const parent = navigation?.getParent?.();
    if (parent && typeof parent.setOptions === 'function') {
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
        },
      });
    }
  }, [navigation]);

  // 사용자 프로필 화면
  if (showUserProfile) {
    return <ProfileScreen onBack={() => setShowUserProfile(false)} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Image
            source={require('@/assets/images/backbutton.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={styles.headerTitle}>채팅</Text>
      </View>

      <View style={styles.avatarOnlyContainer}>
        <View style={styles.greenCircle}>
          <Image
            source={require('@/assets/images/real-racoon-4x.png')}
            style={styles.avatarImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.topRow}>
            <Text style={styles.nameText}>삐약이</Text>
            <Text style={styles.timeText}>3분 전</Text>
          </View>
          <Text style={styles.messageText}>공동구매 글 보고 연락드려요! 다음...</Text>
        </View>
        <View style={styles.badgeContainerFirst}>
          <Text style={styles.badgeText}>1</Text>
        </View>
      </View>

      <View style={styles.chatItemContainer}>
        <View style={styles.yellowCircle}>
          <Image
            source={require('@/assets/images/squirrel4x.png')}
            style={[styles.avatarImage, { width: 60, height: 60, marginTop: -3 }]}
            resizeMode="contain"
          />
        </View>
        <Image
          source={require('@/assets/images/donut.png')}
          style={styles.donutImage}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <View style={styles.topRow}>
            <Text style={styles.nameText}>말차맛초코</Text>
            <Text style={styles.timeText}>40분 전</Text>
          </View>
          <Text style={styles.messageText}>안녕하세요! 도넛 혹시 몇 남았나요?</Text>
        </View>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>1</Text>
        </View>
      </View>

      <Pressable style={styles.chatItemContainer2} onPress={() => router.push('/chatting/chat')}>
        <View style={styles.greenCircle}>
          <Image
            source={require('@/assets/images/real-racoon-4x.png')}
            style={styles.avatarImage}
            resizeMode="contain"
          />
        </View>
        <Image
          source={require('@/assets/images/donut.png')}
          style={styles.donutImage2}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <View style={styles.topRow}>
            <Text style={styles.nameText}>라쿤인데요</Text>
            <Text style={styles.timeText}>40분 전</Text>
          </View>
          <Text style={styles.messageText}>도넛 더 남아있나요??</Text>
        </View>
        <View style={styles.badgeContainerThird}>
          <Text style={styles.badgeText}>1</Text>
        </View>
      </Pressable>

      <View style={styles.chatItemContainer3}>
        <View style={styles.orangeCircle}>
          <Image
            source={require('@/assets/images/hedgehog4x.png')}
            style={styles.avatarImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.topRow}>
            <Text style={styles.nameText}>말하는고구마</Text>
            <Text style={styles.timeText}>2일 전</Text>
          </View>
          <Text style={[styles.messageText, { fontWeight: '400', color: COLORS.text.disabled }]}>
            감사합니다!
          </Text>
        </View>
      </View>

      <View style={styles.chatItemContainer4}>
        <View style={styles.yellowCircle}>
          <Image
            source={require('@/assets/images/squirrel4x.png')}
            style={[styles.avatarImage, { width: 60, height: 60, marginTop: -3 }]}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.topRow}>
            <Text style={styles.nameText}>떡살찹</Text>
            <Text style={styles.timeText}>2일 전</Text>
          </View>
          <Text style={[styles.messageText, { fontWeight: '400', color: COLORS.text.disabled }]}>
            오늘 요하게 같이 먹어서 좋...
          </Text>
        </View>
      </View>

      {/* 하단 탭바 */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/main/community')}>
          <Svg width="31" height="26" viewBox="0 0 31 26" fill="none">
            <Path
              d="M24.9873 0C28.2062 0 30.8163 2.60931 30.8164 5.82812V14.7383C30.8164 17.9572 28.2062 20.5674 24.9873 20.5674H19.1855L16.4697 25.2715C16.1245 25.8688 15.2621 25.8689 14.917 25.2715L12.2012 20.5674H6.39844C3.17963 20.5672 0.570312 17.9571 0.570312 14.7383V5.82812C0.570464 2.60941 3.17972 0.000152403 6.39844 0H24.9873Z"
              fill="#FF805F"
            />
            {/* 말풍선 내부 흰점 3개 */}
            <Circle cx="8" cy="8" r="1.8" fill="white" />
            <Circle cx="15.5" cy="8" r="1.8" fill="white" />
            <Circle cx="23" cy="8" r="1.8" fill="white" />
          </Svg>
          <Text style={[styles.tabLabel, { color: '#FF805F' }]}>커뮤</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/main/map')}>
          <Svg width="28" height="22" viewBox="0 0 28 22" fill="none">
            <Path
              d="M18.5038 2.48242L25.3397 1.11523C26.4447 0.894296 27.4768 1.73551 27.4843 2.8623L27.5819 17.6572C27.5873 18.4866 27.0229 19.2115 26.2177 19.4102L18.5038 21.3135L9.53796 19.5195L2.71472 20.8838C1.60525 21.1054 0.570366 20.2574 0.57019 19.126V3.98047C0.57019 3.12793 1.17035 2.39273 2.00574 2.22266L9.53699 0.689453H9.54089L18.5038 2.48242ZM10.4335 18.0518L18.2343 19.6123V4.07422L18.1874 4.06543L10.4335 2.51367V18.0518ZM25.6561 2.69824L19.4003 3.94922V19.4287L25.8309 17.8428C25.9119 17.8228 25.9681 17.7502 25.9677 17.668L25.87 2.87305C25.8692 2.75947 25.7657 2.67633 25.6561 2.69824ZM2.328 3.80469C2.24506 3.82157 2.18445 3.89461 2.18445 3.98047V19.126C2.18462 19.2384 2.287 19.3229 2.39832 19.3008L9.22156 17.9365L9.26746 17.9268V2.3916L2.328 3.80469Z"
              fill="#636363"
            />
          </Svg>
          <Text style={[styles.tabLabel, { color: '#636363' }]}>지도</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/main/scrap')}>
          <Svg width="21" height="24" viewBox="0 0 21 24" fill="none">
            <Path
              d="M17.5703 1H3.57237C2.46699 1 1.57123 1.89668 1.57237 3.00205L1.59098 21.1445C1.59241 22.5324 2.97259 23.497 4.27649 23.0213L9.87439 20.9788C10.316 20.8177 10.8003 20.8173 11.2422 20.9777L16.888 23.0266C18.1922 23.4999 19.5703 22.5339 19.5703 21.1466V3C19.5703 1.89543 18.6749 1 17.5703 1Z"
              stroke="#636363"
              strokeWidth="1.61402"
            />
          </Svg>
          <Text style={[styles.tabLabel, { color: '#636363' }]}>스크랩</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/main/mypage')}>
          <Svg width="22" height="25" viewBox="0 0 22 25" fill="none">
            <Circle cx="11.327" cy="5.72138" r="4.8249" stroke="#636363" strokeWidth="1.61402" />
            <Path
              d="M1.53357 19.5129C1.53357 16.5415 3.94231 14.1328 6.91364 14.1328H15.8069C18.7782 14.1328 21.1869 16.5416 21.1869 19.5129V22.2029C21.1869 23.1934 20.384 23.9963 19.3936 23.9963H3.32692C2.33648 23.9963 1.53357 23.1934 1.53357 22.2029V19.5129Z"
              stroke="#636363"
              strokeWidth="1.61402"
            />
          </Svg>
          <Text style={[styles.tabLabel, { color: '#636363' }]}>마이페이지</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerTitle: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#000',
    textAlign: 'left',
  },
  avatarOnlyContainer: {
    position: 'absolute',
    top: 165,
    left: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatItemContainer: {
    position: 'absolute',
    top: 253,
    left: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatItemContainer2: {
    position: 'absolute',
    top: 345,
    left: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatItemContainer3: {
    position: 'absolute',
    top: 440,
    left: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatItemContainer4: {
    position: 'absolute',
    top: 525,
    left: 24,
    flexDirection: 'row',
    alignItems: 'center',
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
    transform: [{ translateY: 5 }],
  },
  donutImage: {
    position: 'absolute',
    bottom: -12,
    left: 25,
    width: 37,
    height: 37,
    borderRadius: 6,
  },
  donutImage2: {
    position: 'absolute',
    bottom: -12,
    left: 25,
    width: 37,
    height: 37,
    borderRadius: 6,
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
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
  },
  timeText: {
    fontSize: 13,
    lineHeight: 35,
    fontFamily: 'Pretendard',
    color: '#aaa',
    textAlign: 'left',
    marginLeft: 8,
  },
  messageText: {
    width: 203,
    fontSize: 14,
    lineHeight: 27,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
    overflow: 'hidden',
  },
  badgeContainer: {
    backgroundColor: '#ff805f',
    height: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 11,
    paddingVertical: 2,
    borderRadius: 9,
    position: 'absolute',
    top: 8,
    right: -45,
  },
  badgeContainerFirst: {
    backgroundColor: '#ff805f',
    height: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 11,
    paddingVertical: 2,
    borderRadius: 9,
    position: 'absolute',
    top: 8,
    right: -45,
  },
  badgeContainerThird: {
    backgroundColor: '#ff805f',
    height: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 11,
    paddingVertical: 2,
    borderRadius: 9,
    position: 'absolute',
    top: 8,
    right: -45,
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 35,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    color: '#fff',
    textAlign: 'center',
    marginTop: -11,
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 76,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: -1.5, height: -4.5 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 4,
  },
});
