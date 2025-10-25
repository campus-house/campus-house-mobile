import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';
import { BackIcon } from '@/components/Icon/BackIcon';
import Step1_IntroScreen from './auth/Step1_IntroScreen';
import VillageScrollModal from '@/components/VillageScrollModal';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// 실거주 후기 샘플 데이터
const samplePosts = [
  {
    id: 1,
    author: '방미오',
    profileImage: '🦉',
    time: '1시간 전',
    date: '2025.09.01',
    title: '아이파크 후기',
    content: '가격 빼고 다 좋은 아이파크입니다! 마음에 들어요! 보안도 괜찮고, 건물 밑에 다양한 음식점들과 편의점, 카페가 있어서 편리해요...',
    image: '🏠',
    comments: 12,
    likes: 5,
    shares: 0,
    rating: '오피스텔 ★5.0',
  },
  {
    id: 2,
    author: '감자떡',
    profileImage: '🥔',
    time: '2시간 전',
    date: '2025.09.01',
    title: '마크타워 후기',
    content: '편의점이랑 3분 거리여서 접근성이 굉장히 좋아요. 급하게 구한 집이라 걱정을 많이 했는데 굿굿',
    image: '🏢',
    comments: 8,
    likes: 12,
    shares: 1,
    rating: '마크타워 ★5.0',
  },
  {
    id: 3,
    author: '우주맛밤',
    profileImage: '🚀',
    time: '3시간 전',
    date: '2025.09.01',
    title: '마이온 후기',
    content: '이 근처에 주차 가능한 곳이 많이 없는데, 주차장도 있고 주차도 굉장히 편해서 좋았어요. 다만 학교까지 걸어가기에는 거리가 꽤 있는 편인듯',
    image: '🏘️',
    comments: 6,
    likes: 8,
    shares: 2,
    rating: '오피스텔 ★5.0',
  },
  {
    id: 4,
    author: '후기요정',
    profileImage: '🧚',
    time: '4시간 전',
    date: '2025.09.01',
    title: '하이파크 후기',
    content: '하이파크에서 1년 살았는데 정말 만족해요. 관리사무소도 친절하고...',
    image: '🏡',
    comments: 4,
    likes: 15,
    shares: 3,
    rating: '하이파크 ★4.5',
  },
];


export default function VillageBoard() {
  const [showBackButton, setShowBackButton] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [cardPosition, setCardPosition] = useState(screenHeight * 0.6);
  const [showAuthIntro, setShowAuthIntro] = useState(false); // 잠금 모달 숨김
  const { authCompleted } = useLocalSearchParams();

  // 세션 기반 인증 상태 관리
  useEffect(() => {
    if (authCompleted === 'true') {
      setShowAuthIntro(false);
    }
  }, [authCompleted]);

  const scrollViewRef = useRef<ScrollView>(null);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 5;
    },
    onPanResponderGrant: () => {
      pan.setOffset({
        x: (pan.x as any)._value,
        y: (pan.y as any)._value,
      });
    },
    onPanResponderMove: (evt, gestureState) => {
      const newY = cardPosition + gestureState.dy;

      if (newY < 100) {
        setShowBackButton(true);
      } else {
        setShowBackButton(false);
      }

      setCardPosition(newY);
      pan.setValue({ x: 0, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      pan.flattenOffset();
      const newY = cardPosition + gestureState.dy;

      const minY = 0;
      const maxY = screenHeight * 0.8;

      let finalY = newY;
      if (newY < minY) {
        finalY = minY;
      }
      if (newY > maxY) {
        finalY = maxY;
      }

      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();

      setCardPosition(finalY);
    },
  });

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    setScrollOffset(currentOffset);
  };

  const renderPost = (post: (typeof samplePosts)[0]) => (
    <TouchableOpacity
      key={post.id}
      style={styles.postCard}
      onPress={() => {
        // 아무 동작도 하지 않음
      }}
    >
      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          <View style={styles.profileImage}>
            <Text style={styles.profileImageText}>{post.profileImage}</Text>
          </View>
          <View style={styles.authorDetails}>
            <View style={styles.nameTimeRow}>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
            <Text style={styles.postDate}>{post.date}</Text>
          </View>
        </View>
      </View>

      <View style={styles.postContent}>
        <View style={styles.contentLeft}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postDescription}>{post.content}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {post.rating && (
            <Text style={styles.postRatingRight}>{post.rating}</Text>
          )}
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.postActions}>
        <View style={styles.actionItem}>
          <View style={styles.speechBubbleContainer}>
            <Svg width="22" height="18" viewBox="0 0 22 18" style={styles.speechBubble}>
              <Path
                d="M15.9326 0.478516C19.0464 0.4787 21.5703 3.00334 21.5703 6.11719V8.43457C21.5703 11.5484 19.0464 14.0731 15.9326 14.0732H13.4951L11.624 17.1582C11.372 17.5738 10.7686 17.5738 10.5166 17.1582L8.64648 14.0732H6.20898C3.09503 14.0732 0.570327 11.5485 0.570312 8.43457V6.11719C0.570312 3.00323 3.09503 0.478516 6.20898 0.478516H15.9326Z"
                stroke="#AAAAAA"
                strokeWidth="1.485"
                fill="none"
              />
            </Svg>
            <View style={styles.dotsContainer}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
          <Text style={styles.actionText}>4</Text>
        </View>
        <View style={styles.actionItem}>
          <Svg width="19" height="16" viewBox="0 0 19 16" style={styles.actionIcon}>
            <Path
              d="M1.94824 1.76562C3.78556 -0.130104 6.76425 -0.130118 8.60156 1.76562L9.50586 2.69922L10.4111 1.7666C12.2485 -0.129148 15.2281 -0.129148 17.0654 1.7666C18.9025 3.66233 18.9026 6.73615 17.0654 8.63184L16.1602 9.56445L16.1621 9.56641L10.8516 15.0469C10.5734 15.3338 10.2302 15.5133 9.87109 15.585C9.27164 15.7062 8.62656 15.527 8.16211 15.0479L2.85059 9.56738L2.85254 9.56445L1.94824 8.63086C0.110923 6.73511 0.110923 3.66137 1.94824 1.76562Z"
              stroke="#AAAAAA"
              strokeWidth="1.483"
              fill="none"
            />
          </Svg>
          <Text style={styles.actionText}>5</Text>
        </View>
        <View style={styles.actionItem}>
          <Svg width="14" height="16" viewBox="0 0 14 16" style={styles.actionIcon}>
            <Path
              d="M11.1297 1H2.76228C2.03516 1 1.44592 1.58985 1.44667 2.31697L1.45845 13.7494C1.45907 14.3576 2.06346 14.7806 2.63509 14.5729L6.73478 13.083C6.86597 13.0353 7.00973 13.0352 7.141 13.0826L11.2701 14.5752C11.8418 14.7819 12.4453 14.3583 12.4453 13.7503V2.31561C12.4453 1.58902 11.8563 1 11.1297 1Z"
              stroke="#AAAAAA"
              strokeWidth="1.38133"
              fill="none"
            />
          </Svg>
          <Text style={styles.actionText}>0</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#D7F0FF" />

      {/* Sky hero with simple header, clouds and background images */}
      <View style={styles.heroContainer} pointerEvents="box-none">
        {/* background hills/grass - 맨 뒤 */}
        <Image
          source={require('@/assets/images/grasshouse.png')}
          style={styles.grass}
          resizeMode="contain"
        />
        
        {/* 가운데 집 추가 */}
        <Image
          source={require('@/assets/images/houseleft.png')}
          style={styles.houseCenter}
          resizeMode="contain"
        />
        
        {/* 집 위에 말풍선과 작은 원 */}
        <View style={styles.speechBubbleWrap}>
          <Image
            source={require('@/assets/images/speechbubble.png')}
            style={styles.speechBubbleImg}
            resizeMode="stretch"
          />
          <Text style={styles.speechBubbleText} numberOfLines={2}>
            집 후기가 하나{'\n'}올라왔어요!
          </Text>
          {/* 작은 원 */}
          <View style={styles.smallCircle} />
        </View>

        {/* clouds - 배경보다 앞에, 사진처럼 4개 배치 */}
        <Image
          source={require('@/assets/images/image 210.png')}
          style={styles.cloud1}
          resizeMode="contain"
        />
        <Image
          source={require('@/assets/images/image 207.png')}
          style={styles.cloud2}
          resizeMode="contain"
        />
        <Image
          source={require('@/assets/images/image 212.png')}
          style={styles.cloud3}
          resizeMode="contain"
        />
        <Image
          source={require('@/assets/images/image 211.png')}
          style={styles.cloud4}
          resizeMode="contain"
        />


        {/* header row - 맨 앞 */}
        <View style={styles.heroHeader} pointerEvents="none">
          <View style={styles.headerLeft}>
            <Image
              source={require('@/assets/images/apart.png')}
              style={styles.apartmentIcon}
              resizeMode="contain"
            />
            <Text style={styles.apartmentTitle} numberOfLines={1}>
              경희마을
            </Text>
          </View>
        </View>
      </View>


      <VillageScrollModal
        showBackButton={showBackButton}
        posts={samplePosts as any}
        cardPosition={0}
        pan={null}
        panResponder={null}
        onScroll={() => {}}
        isVillageBoard={true}
      />

      {/* 독립적인 채팅/동네로 가기 버튼들 - 최상위 레이어에 배치 */}
      <View style={styles.floatingActions} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.pill}
          onPress={() => {
            router.push('/chatting/chat-list');
          }}
          activeOpacity={0.8}
        >
          <Image
            source={require('@/assets/images/comumu.png')}
            style={styles.pillIcon}
            resizeMode="contain"
          />
          <Text style={styles.pillText}>채팅하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pill, { marginTop: 10 }]}
          onPress={() => {
            router.back();
          }}
          activeOpacity={0.8}
        >
          <Image
            source={require('@/assets/images/houselogo3.png')}
            style={styles.pillIcon}
            resizeMode="contain"
          />
          <Text style={styles.pillText}>마을로가기</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Action Button */}
      {showBackButton && (
        <TouchableOpacity style={styles.fab} onPress={() => router.push('/main/community/write')}>
          <View style={styles.fabIcon}>
            <View style={styles.fabCrossHorizontal} />
            <View style={styles.fabCrossVertical} />
          </View>
        </TouchableOpacity>
      )}

      {/* Step1 인증 인트로 오버레이 - 맨 마지막에 렌더링 */}
      {showAuthIntro && (
        <Step1_IntroScreen
          onStart={() => {
            setShowAuthIntro(false);
            router.push('/main/community/auth/Step2_AddressScreen');
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7F0FF',
  },
  heroContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 420,
  },
  heroHeader: {
    marginTop: 69,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  apartmentIcon: { width: 36, height: 36, marginRight: 8 },
  apartmentTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#323232',
  },
  heroActions: { alignItems: 'flex-end', marginTop: 5 },
  floatingActions: {
    position: 'absolute',
    top: 74,
    right: 30,
    alignItems: 'flex-end',
    // 스크롤 카드(draggableCard) 뒤로 보내어 첫 화면에서는 가리도록 낮은 zIndex/elevation 사용
    zIndex: 0,
    elevation: 0,
  },
  pill: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 120,
    justifyContent: 'center',
  },
  pillIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  pillText: {
    fontSize: 13,
    lineHeight: 14,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'center',
  },
  cloud1: { position: 'absolute', top: 220, right: 20, width: 180, height: 50 },
  cloud2: { position: 'absolute', top: 280, left: 30, width: 90, height: 35 },
  cloud3: { position: 'absolute', top: 290, right: 40, width: 60, height: 15 },
  cloud4: { position: 'absolute', top: 330, right: 140, width: 50, height: 15 },
  grass: {
    position: 'absolute',
    bottom: -870,
    left: -200,
    // 오른쪽 고정 해제: width 증가가 눈에 띄도록 left 기준으로만 배치
    width: screenWidth + 390,
    height: 1450,
  },
  houseCenter: {
    position: 'absolute',
    bottom: -200,
    left: screenWidth / 2 - 100,
    width: 200,
    height: 200,
  },
  speechBubbleWrap: {
    position: 'absolute',
    left: screenWidth / 2 + 20,
    bottom: -20,
    width: 150,
    height: 80,
    zIndex: 3000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechBubbleImg: {
    position: 'absolute',
    inset: 0 as any,
    width: '100%',
    height: '100%',
  },
  speechBubbleText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    color: '#636363',
    textAlign: 'center',
    paddingHorizontal: 12,
    marginTop: -8,
  },
  smallCircle: {
    position: 'absolute',
    bottom: -10,
    left: 20,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  leftHouse: { position: 'absolute', bottom: -55, left: 21, width: 110, height: 80 },
  rightHouse: { position: 'absolute', bottom: -60, right: 223, width: 155, height: 115 },
  backButtonContainer: {
    position: 'absolute',
    top: 75,
    left: 20,
    zIndex: 1000,
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
  },
  draggableCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: screenWidth,
    height: screenHeight + 100,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 10,
    shadowColor: 'rgba(194, 224, 242, 0.20)',
    shadowOffset: {
      width: 0,
      height: -12,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 12,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 18,
    marginTop: 20,
  },
  headerTitleFullScreen: {
    marginTop: 60,
  },
  dragHandle: {
    width: 102,
    height: 4,
    backgroundColor: '#CDCDCD',
    borderRadius: 2,
    marginBottom: 32,
    alignSelf: 'center',
  },
  postsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 300,
  },
  notificationCardContainer: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
    position: 'relative',
    width: 347,
    height: 72,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationCardSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 347,
    height: 72,
  },
  notificationContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  notificationIcon: {
    width: 25,
    height: 23,
    marginRight: 12,
  },
  notificationText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FF805F',
    fontFamily: 'Pretendard',
    flex: 1,
    lineHeight: 17,
  },
  grayLine: {
    width: 393,
    height: 5,
    backgroundColor: '#F2F2F2',
    marginTop: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 23,
    marginTop: 10,
  },
  communityPosts: {
    paddingBottom: 100,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFD429',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    overflow: 'hidden',
  },
  profileImageText: {
    fontSize: 24,
  },
  authorDetails: {
    flex: 1,
  },
  nameTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginRight: 8,
  },
  postTime: {
    fontSize: 12,
    color: '#AAA',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  postDate: {
    fontSize: 12,
    color: '#636363',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  postContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  contentLeft: {
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 15,
    color: '#636363',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  postRating: {
    color: '#FF805F',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
  },
  postRatingRight: {
    color: '#FF805F',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '500',
  },
  contentImage: {
    width: 70,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImageText: {
    fontSize: 30,
  },
  divider: {
    width: 321,
    height: 1.5,
    backgroundColor: '#F2F2F2',
    marginBottom: 12,
    alignSelf: 'center',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  actionIcon: {
    marginRight: 4,
  },
  speechBubbleContainer: {
    position: 'relative',
    marginRight: 4,
  },
  speechBubble: {},
  dotsContainer: {
    position: 'absolute',
    top: 7,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 2.4,
    height: 2.4,
    borderRadius: 1.2,
    backgroundColor: '#AAAAAA',
    marginRight: 2.4,
  },
  actionText: {
    fontSize: 13,
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    lineHeight: 28.992,
  },
  fab: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FF805F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.07)',
    shadowOffset: {
      width: 0,
      height: 3.5,
    },
    shadowOpacity: 1,
    shadowRadius: 4.9,
    elevation: 8,
  },
  fabIcon: {
    width: 28.531,
    height: 28.531,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabCrossHorizontal: {
    position: 'absolute',
    width: 28.531,
    height: 3.241,
    backgroundColor: '#FFFFFF',
    borderRadius: 1.5,
  },
  fabCrossVertical: {
    position: 'absolute',
    width: 3.241,
    height: 28.531,
    backgroundColor: '#FFFFFF',
    borderRadius: 1.5,
  },
});
