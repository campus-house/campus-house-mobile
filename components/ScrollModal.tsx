import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
  Image,
  PanResponder,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { router } from 'expo-router';
import { BackIcon } from '@/components/Icon/BackIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLayoutScale } from '@/utils/layout';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type Post = {
  id: number;
  author: string;
  profileImage: string;
  time: string;
  date: string;
  title: string;
  content: string;
  image: string;
  comments: number;
  likes: number;
  shares: number;
};

type Props = {
  showBackButton: boolean;
  posts: Post[];
};

export default function ScrollModal({
  showBackButton,
  posts,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const modalHeightAnim = useRef(new Animated.Value(screenHeight * 0.18)).current;
  const { y, insets, figma } = useLayoutScale();
  
  // 모달 높이 상수 (3개 스냅 위치)
  const MIN_HEIGHT = screenHeight * 0.16; // 18% - 시작/최하단 위치
  const MID_HEIGHT = screenHeight * 0.4; // 40% - 중간 위치
  const MAX_HEIGHT = screenHeight; // 100% - 최대 위치
  
  useEffect(() => {
    modalHeightAnim.setValue(MIN_HEIGHT);
    setIsExpanded(false); // 명시적으로 false로 초기화
  }, []);
  
  // PanResponder 설정 - 드래그로 모달 높이 조절
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (evt, gestureState) => {
        // 드래그 중 - 높이 동적 조절 (PropertyModal 방식)
        if (gestureState.dy < 0) {
          // 위로 드래그하면 높이 증가
          const dragRatio = Math.abs(gestureState.dy) / (screenHeight * 0.85);
          const newHeight = MIN_HEIGHT + (MAX_HEIGHT - MIN_HEIGHT) * Math.min(dragRatio, 1);
          modalHeightAnim.setValue(newHeight);
        } else {
          // 아래로 드래그하면 높이 감소
          modalHeightAnim.setValue(MIN_HEIGHT);
        }
      },
            onPanResponderRelease: (evt, gestureState) => {
              const dragDistance = gestureState.dy;
              
              if (dragDistance < -screenHeight * 0.27) {
                // 27% 이상 위로 드래그: 100%로 스냅 (PropertyModal과 동일)
                setIsExpanded(true);
                Animated.timing(modalHeightAnim, {
                  toValue: MAX_HEIGHT,
                  duration: 300,
                  useNativeDriver: false,
                }).start();
              } else if (dragDistance > screenHeight * 0.23) {
                // 23% 이상 아래로 드래그: 15%로 스냅 (PropertyModal과 동일)
                setIsExpanded(false);
                Animated.timing(modalHeightAnim, {
                  toValue: MIN_HEIGHT,
                  duration: 300,
                  useNativeDriver: false,
                }).start();
              } else {
                // 그 외: 15%로 스냅 (PropertyModal과 동일)
                setIsExpanded(false);
                Animated.timing(modalHeightAnim, {
                  toValue: MIN_HEIGHT,
                  duration: 300,
                  useNativeDriver: false,
                }).start();
              }
            },
    })
  ).current;
  
  const renderPost = (post: Post) => (
    <TouchableOpacity
      key={post.id}
      style={styles.postCard}
      onPress={() => {
        router.push('/apartment-news-detail');
      }}
    >
      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          <View style={styles.profileImage}>
            <Image
              source={require('@/assets/images/ramjui.png')}
              style={styles.profileImageInner}
              resizeMode="cover"
            />
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
        <View style={styles.contentImage}>
          <Image
            source={require('@/assets/images/cuffie.png')}
            style={styles.coffeeImage}
            resizeMode="cover"
          />
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
    <View style={styles.modalOverlay} pointerEvents="box-none">
      <Animated.View
        style={[
          styles.modalContainer,
          {
            height: modalHeightAnim,
          },
        ]}
      >
        {/* 헤더 - 확장된 상태에서만 표시 */}
        {isExpanded && (
          <View style={styles.topNavBar}>
            <TouchableOpacity 
              style={[
                styles.backButton, 
                { 
                  top: insets.top + y(60 - figma.SAFE_TOP),
                  left: 20
                }
              ]} 
              onPress={() => router.push('/main/community')}
            >
              <BackIcon />
            </TouchableOpacity>
          </View>
        )}

        <View
          style={[styles.header, isExpanded && { marginTop: 80 }]}
          {...panResponder.panHandlers}
        >
          {!isExpanded && <View style={styles.dragHandle} />}
          <Text style={[styles.headerTitle, isExpanded && styles.headerTitleFullScreen]}>
            질문 게시판
          </Text>
        </View>

        <TouchableOpacity
          style={styles.notificationCardContainer}
          onPress={() => router.push('/main/community/questions')}
        >
          <Svg width="356" height="80" viewBox="0 0 356 80" style={styles.notificationCardSvg}>
            <Path
              d="M4.5 17C4.5 7.61116 12.1112 0 21.5 0H334.5C343.889 0 351.5 7.61116 351.5 17V55C351.5 64.3888 343.889 72 334.5 72H21.5C12.1112 72 4.5 64.3888 4.5 55V17Z"
              fill="#FF805F"
              fillOpacity="0.05"
            />
          </Svg>
          <View style={styles.notificationContent}>
            <Svg width="25" height="23" viewBox="0 0 25 23" style={styles.notificationIcon}>
              <Path
                d="M18.8616 2.47949L11.8447 6.52643V15.5413L18.8616 19.5916V2.47949Z"
                fill="#FF805F"
              />
              <Path
                d="M0.167969 9.89754C0.167969 8.63921 1.18804 7.61914 2.44636 7.61914H3.85965V14.3924H2.44636C1.18804 14.3924 0.167969 13.3723 0.167969 12.114V9.89754Z"
                fill="#C3C3C3"
              />
              <Path
                d="M18.6088 3.36888C18.6088 1.79577 19.884 0.520508 21.4571 0.520508C23.0302 0.520508 24.3055 1.79576 24.3055 3.36887V18.7028C24.3055 20.2759 23.0302 21.5512 21.4571 21.5512C19.884 21.5512 18.6088 20.2759 18.6088 18.7028V3.36888Z"
                fill="#FF592E"
              />
              <Path
                d="M5.92334 15.1611H9.56417V21.4809C9.56417 22.3197 8.88412 22.9998 8.04524 22.9998H7.44227C6.60339 22.9998 5.92334 22.3197 5.92334 21.4809V15.1611Z"
                fill="#C3C3C3"
              />
              <Path d="M5.92029 15.4775H9.55812V16.6171H5.92029V15.4775Z" fill="#8C8C8C" />
              <Path
                d="M2.98633 8.00428C2.98633 7.1654 3.66638 6.48535 4.50526 6.48535H12.496V15.5259H4.50526C3.66638 15.5259 2.98633 14.8458 2.98633 14.0069V8.00428Z"
                fill="#FF805F"
              />
            </Svg>
            <Text style={styles.notificationText}>똑똑! 새로운 질문이 들어왔어요!</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.grayLine} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>내 집 소식</Text>
          <TouchableOpacity style={styles.searchIconContainer}>
            <Svg width="23" height="24" viewBox="0 0 23 24" fill="none" style={{ transform: [{ rotate: '-15deg' }] }}>
              <Path d="M9.26465 1C13.8649 1.00003 17.529 4.58118 17.5293 8.91992C17.5293 13.2589 13.8651 16.8408 9.26465 16.8408C4.66422 16.8408 1 13.2589 1 8.91992C1.00027 4.58117 4.66439 1 9.26465 1Z" stroke="#AAAAAA" strokeWidth="2"/>
              <Path d="M13.6953 15.6553L15.8886 25.2594" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round"/>
            </Svg>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.postsContainer}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={true}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        >
          <View style={styles.communityPosts}>{posts.map(renderPost)}</View>
        </ScrollView>

        {/* 플로팅 액션 버튼 - 전체화면일 때만 표시 */}
        {isExpanded && (
          <TouchableOpacity 
            style={styles.fab}
            onPress={() => router.push('/main/community/write')}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </Svg>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  topNavBar: {
    width: screenWidth,
    height: 113,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    zIndex: 10,
    position: 'absolute',
    top: 0,
  },
  backButton: {
    position: 'absolute',
    left: 31,
    width: 44,
    height: 60,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10000,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: screenWidth,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 34.5,
    borderTopRightRadius: 34.5,
    zIndex: 10001,
    shadowColor: 'rgba(194, 224, 242, 0.20)',
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 12,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 34.5,
    borderTopRightRadius: 34.5,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 18,
    marginTop: 20,
    paddingLeft: 20,
  },
  headerTitleFullScreen: { marginTop: 60 },
  dragHandle: {
    width: 102,
    height: 4,
    backgroundColor: '#CDCDCD',
    borderRadius: 2,
    marginBottom: 8,
    marginTop: -8,
    alignSelf: 'center',
  },
  postsContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 300 },
  notificationCardContainer: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
    position: 'relative',
    width: 347,
    height: 72,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationCardSvg: { position: 'absolute', top: 0, left: 0, width: 347, height: 72 },
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
  notificationIcon: { width: 25, height: 23, marginRight: 12 },
  notificationText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FF805F',
    fontFamily: 'Pretendard',
    flex: 1,
    lineHeight: 17,
  },
  grayLine: { width: 393, height: 5, backgroundColor: '#F2F2F2', marginTop: 10, marginBottom: 30 },
  sectionHeader: { 
    paddingHorizontal: 20, 
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 23,
    marginTop: 10,
  },
  searchIconContainer: {
    width: 22.914,
    height: 23.01,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  communityPosts: { paddingBottom: 100 },
  postCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 17,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(242, 242, 242, 0.50)',
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  authorInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
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
  profileImageInner: { width: 40, height: 40, borderRadius: 20 },
  authorDetails: { flex: 1 },
  nameTimeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 1 },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginRight: 8,
  },
  postTime: { fontSize: 12, color: '#AAA', fontFamily: 'Pretendard', lineHeight: 22 },
  postDate: { fontSize: 12, color: '#636363', fontFamily: 'Pretendard', lineHeight: 22 },
  postContent: { flexDirection: 'row', marginBottom: 20 },
  contentLeft: { flex: 1, marginRight: 12 },
  postTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginBottom: 8,
  },
  postDescription: { fontSize: 15, color: '#636363', fontFamily: 'Pretendard', lineHeight: 22 },
  contentImage: { width: 70, height: 80, borderRadius: 8, overflow: 'hidden' },
  coffeeImage: { width: 70, height: 80, borderRadius: 8 },
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
  actionItem: { flexDirection: 'row', alignItems: 'center', marginLeft: 16 },
  actionIcon: { marginRight: 4 },
  speechBubbleContainer: { position: 'relative', marginRight: 4 },
  speechBubble: {},
  dotsContainer: {
    position: 'absolute',
    top: 7,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: { width: 2.4, height: 2.4, borderRadius: 1.2, backgroundColor: '#AAAAAA', marginRight: 2.4 },
  actionText: {
    fontSize: 13,
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    lineHeight: 28.992,
  },
  fab: {
    position: 'absolute',
    bottom: 150,
    right: 20,
    width: 62.016,
    height: 62.016,
    borderRadius: 62.016,
    backgroundColor: '#F17656',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3.522,
    },
    shadowOpacity: 0.07,
    shadowRadius: 4.227,
    elevation: 8,
    zIndex: 1000,
  },
});
