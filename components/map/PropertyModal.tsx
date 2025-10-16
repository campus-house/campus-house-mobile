import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
  Image,
} from 'react-native';
import { PropertyMarker as PropertyMarkerType } from '@/src/types/property';
import { COLORS } from '@/constants/colors';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

type TabType = '실거주자 후기' | '기본 정보' | '질문하기' | '양도';

interface PropertyModalProps {
  visible: boolean;
  property: PropertyMarkerType | null;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ visible, property, onClose }) => {
  const translateY = useRef(new Animated.Value(height)).current;
  const [selectedTab, setSelectedTab] = useState<TabType>('실거주자 후기');
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('최신순');

  const sortOptions = ['최신순', '오래된 순', '높은 별점 순', '낮은 별점 순'];

  // 양도 관련 샘플 데이터
  const transferData = [
    {
      id: 1,
      author: '이틀부센체고',
      profileImage: require('@/assets/images/squirrel4x.png'),
      time: '1시간 전',
      date: '2025.09.01',
      title: '1년동안 거주하실 분 찾아요!',
      content: '1년 동안 아이파크 거주하실 까요?',
      image: require('@/assets/images/house-logo.png'),
      comments: 3,
      likes: 12,
      bookmarks: 0,
    },
    {
      id: 2,
      author: '배달요정',
      profileImage: require('@/assets/images/ramjui.png'),
      time: '2시간 전',
      date: '2025.09.01',
      title: '같이 배달 시켜 먹을 사람 구해요!',
      content: '혼자 먹기엔 양이 너무 많아서...',
      image: require('@/assets/images/donut.png'),
      comments: 5,
      likes: 8,
      bookmarks: 1,
    },
  ];

  // 질문하기 관련 샘플 데이터
  const questionData = [
    {
      id: 1,
      author: '말차초콜릿',
      profileImage: require('@/assets/images/ramjui.png'),
      date: '2025.09.01',
      title: '여기 수질 어때요?',
      content: '저번에 살던 집은 별로여서ㅜ 질문 남깁니다.',
      comments: 3,
      likes: 12,
      bookmarks: 0,
    },
    {
      id: 2,
      author: '우주맛밤',
      profileImage: require('@/assets/images/ramjui.png'),
      date: '2025.09.01',
      title: '벌레 많이 나오나요?',
      content: '바퀴벌레 진짜 싫어하는데 혹시 여기 벌레가 많이 나오나요?',
      comments: 18,
      likes: 12,
      bookmarks: 1,
    },
  ];

  useEffect(() => {
    if (visible) {
      // 모달이 열릴 때 아래에서 위로 올라오는 애니메이션
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      // 모달이 닫힐 때 위에서 아래로 내려가는 애니메이션
      Animated.timing(translateY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const formatPriceText = () => {
    if (!property) {
      return '';
    }
    const deposit = property?.price?.deposit ?? 0;
    const monthly = property?.price?.monthly ?? 0;
    const depositK = deposit / 1000;
    return `${depositK}천 / ${monthly}만원`;
  };

  // 양도 카드 렌더링
  const renderTransferCard = (transfer: (typeof transferData)[0]) => (
    <View key={transfer.id} style={styles.transferCard}>
      <View style={styles.transferHeader}>
        <View style={styles.transferAuthorInfo}>
          <View style={styles.transferProfileImage}>
            <Image source={transfer.profileImage} style={styles.transferProfileImageInner} />
          </View>
          <View style={styles.transferAuthorDetails}>
            <View style={styles.transferNameTimeRow}>
              <Text style={styles.transferAuthorName}>{transfer.author}</Text>
            </View>
            <Text style={styles.transferDate}>{transfer.date}</Text>
          </View>
        </View>
      </View>

      <View style={styles.transferContent}>
        <View style={styles.transferContentLeft}>
          <Text style={styles.transferTitle}>{transfer.title}</Text>
          <Text style={styles.transferDescription}>{transfer.content}</Text>
        </View>
        <View style={styles.transferImageContainer}>
          <Image source={transfer.image} style={styles.transferImage} />
        </View>
      </View>

      <View style={styles.transferDivider} />

      <View style={styles.transferActions}>
        <View style={styles.transferActionItem}>
          <View style={styles.transferActionIcon}>
            <Svg width="22" height="18" viewBox="0 0 22 18">
              <Path
                d="M15.9326 0.478516C19.0464 0.4787 21.5703 3.00334 21.5703 6.11719V8.43457C21.5703 11.5484 19.0464 14.0731 15.9326 14.0732H13.4951L11.624 17.1582C11.372 17.5738 10.7686 17.5738 10.5166 17.1582L8.64648 14.0732H6.20898C3.09503 14.0732 0.570327 11.5485 0.570312 8.43457V6.11719C0.570312 3.00323 3.09503 0.478516 6.20898 0.478516H15.9326Z"
                stroke="#AAAAAA"
                strokeWidth="1.485"
                fill="none"
              />
            </Svg>
          </View>
          <Text style={styles.transferActionText}>{transfer.comments}</Text>
        </View>
        <View style={styles.transferActionItem}>
          <Svg width="19" height="16" viewBox="0 0 19 16" style={styles.transferActionIcon}>
            <Path
              d="M1.94824 1.76562C3.78556 -0.130104 6.76425 -0.130118 8.60156 1.76562L9.50586 2.69922L10.4111 1.7666C12.2485 -0.129148 15.2281 -0.129148 17.0654 1.7666C18.9025 3.66233 18.9026 6.73615 17.0654 8.63184L16.1602 9.56445L16.1621 9.56641L10.8516 15.0469C10.5734 15.3338 10.2302 15.5133 9.87109 15.585C9.27164 15.7062 8.62656 15.527 8.16211 15.0479L2.85059 9.56738L2.85254 9.56445L1.94824 8.63086C0.110923 6.73511 0.110923 3.66137 1.94824 1.76562Z"
              stroke="#AAAAAA"
              strokeWidth="1.483"
              fill="none"
            />
          </Svg>
          <Text style={styles.transferActionText}>{transfer.likes}</Text>
        </View>
        <View style={styles.transferActionItem}>
          <Svg width="14" height="16" viewBox="0 0 14 16" style={styles.transferActionIcon}>
            <Path
              d="M11.1297 1H2.76228C2.03516 1 1.44592 1.58985 1.44667 2.31697L1.45845 13.7494C1.45907 14.3576 2.06346 14.7806 2.63509 14.5729L6.73478 13.083C6.86597 13.0353 7.00973 13.0352 7.141 13.0826L11.2701 14.5752C11.8418 14.7819 12.4453 14.3583 12.4453 13.7503V2.31561C12.4453 1.58902 11.8563 1 11.1297 1Z"
              stroke="#AAAAAA"
              strokeWidth="1.38133"
              fill="none"
            />
          </Svg>
          <Text style={styles.transferActionText}>{transfer.bookmarks}</Text>
        </View>
      </View>
    </View>
  );

  // 질문 카드 렌더링
  const renderQuestionCard = (question: (typeof questionData)[0]) => (
    <View key={question.id} style={styles.questionCard}>
      <View style={styles.questionHeader}>
        <View style={styles.questionAuthorInfo}>
          <View style={styles.questionProfileImage}>
            <Image source={question.profileImage} style={styles.questionProfileImageInner} />
          </View>
          <View style={styles.questionAuthorDetails}>
            <View style={styles.questionNameTimeRow}>
              <Text style={styles.questionAuthorName}>{question.author}</Text>
            </View>
            <Text style={styles.questionDate}>{question.date}</Text>
          </View>
        </View>
      </View>

      <View style={styles.questionContent}>
        <View style={styles.questionContentLeft}>
          <Text style={styles.questionTitle}>{question.title}</Text>
          <Text style={styles.questionDescription}>{question.content}</Text>
        </View>
      </View>

      <View style={styles.questionDivider} />

      <View style={styles.questionActions}>
        <View style={styles.questionActionItem}>
          <View style={styles.questionActionIcon}>
            <Svg width="22" height="18" viewBox="0 0 22 18">
              <Path
                d="M15.9326 0.478516C19.0464 0.4787 21.5703 3.00334 21.5703 6.11719V8.43457C21.5703 11.5484 19.0464 14.0731 15.9326 14.0732H13.4951L11.624 17.1582C11.372 17.5738 10.7686 17.5738 10.5166 17.1582L8.64648 14.0732H6.20898C3.09503 14.0732 0.570327 11.5485 0.570312 8.43457V6.11719C0.570312 3.00323 3.09503 0.478516 6.20898 0.478516H15.9326Z"
                stroke="#AAAAAA"
                strokeWidth="1.485"
                fill="none"
              />
            </Svg>
          </View>
          <Text style={styles.questionActionText}>{question.comments}</Text>
        </View>
        <View style={styles.questionActionItem}>
          <Svg width="19" height="16" viewBox="0 0 19 16" style={styles.questionActionIcon}>
            <Path
              d="M1.94824 1.76562C3.78556 -0.130104 6.76425 -0.130118 8.60156 1.76562L9.50586 2.69922L10.4111 1.7666C12.2485 -0.129148 15.2281 -0.129148 17.0654 1.7666C18.9025 3.66233 18.9026 6.73615 17.0654 8.63184L16.1602 9.56445L16.1621 9.56641L10.8516 15.0469C10.5734 15.3338 10.2302 15.5133 9.87109 15.585C9.27164 15.7062 8.62656 15.527 8.16211 15.0479L2.85059 9.56738L2.85254 9.56445L1.94824 8.63086C0.110923 6.73511 0.110923 3.66137 1.94824 1.76562Z"
              stroke="#AAAAAA"
              strokeWidth="1.483"
              fill="none"
            />
          </Svg>
          <Text style={styles.questionActionText}>{question.likes}</Text>
        </View>
        <View style={styles.questionActionItem}>
          <Svg width="14" height="16" viewBox="0 0 14 16" style={styles.questionActionIcon}>
            <Path
              d="M11.1297 1H2.76228C2.03516 1 1.44592 1.58985 1.44667 2.31697L1.45845 13.7494C1.45907 14.3576 2.06346 14.7806 2.63509 14.5729L6.73478 13.083C6.86597 13.0353 7.00973 13.0352 7.141 13.0826L11.2701 14.5752C11.8418 14.7819 12.4453 14.3583 12.4453 13.7503V2.31561C12.4453 1.58902 11.8563 1 11.1297 1Z"
              stroke="#AAAAAA"
              strokeWidth="1.38133"
              fill="none"
            />
          </Svg>
          <Text style={styles.questionActionText}>{question.bookmarks}</Text>
        </View>
      </View>
    </View>
  );

  if (!property) {
    return null;
  }

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>
        {/* 배경 터치 시 모달 닫기 */}
        <TouchableOpacity style={styles.backgroundTouchable} activeOpacity={1} onPress={onClose} />

        {/* 모달 컨텐츠 */}
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          {/* 모달 핸들 */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* 상단 네비게이션 바 */}
          <View style={styles.topNavBar}>
            {/* 닫기 버튼 */}
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <Svg width="13" height="23" viewBox="0 0 13 23" fill="none">
                <Path
                  d="M11.1836 2L1.55977 11.3274C1.35491 11.5259 1.35744 11.8554 1.56532 12.0508L11.1836 21.0909"
                  stroke="#AAAAAA"
                  strokeWidth="2.27273"
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>

            {/* 오른쪽 아이콘들 */}
            <View style={styles.rightIcons}>
              {/* 스크랩 버튼 */}
              <TouchableOpacity style={styles.scrapButton}>
                <Svg width="21" height="26" viewBox="0 0 21 26" fill="none">
                  <Path
                    d="M17.1457 1.59521H3.8019C2.53097 1.59521 1.50104 2.62619 1.50232 3.89711L1.52131 22.7093C1.52238 23.7767 2.5868 24.5164 3.58759 24.1451L10.099 21.7294C10.3322 21.6429 10.5887 21.6427 10.8221 21.7288L17.3815 24.1493C18.3825 24.5186 19.4453 23.778 19.4453 22.711V3.89479C19.4453 2.62477 18.4158 1.59521 17.1457 1.59521Z"
                    stroke="#FF805F"
                    strokeWidth="2.41446"
                  />
                </Svg>
              </TouchableOpacity>

              {/* 점 세개 메뉴 버튼 */}
              <TouchableOpacity style={styles.menuButton}>
                <Svg width="4" height="16" viewBox="0 0 4 16" fill="none">
                  <Circle cx="1.68359" cy="1.5" r="1.5" fill="#323232" />
                  <Circle cx="1.68359" cy="7.96924" r="1.5" fill="#323232" />
                  <Circle cx="1.68359" cy="14.4385" r="1.5" fill="#323232" />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>

          {/* 스크롤 가능한 컨텐츠 */}
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} bounces={true}>
            {/* 건물 정보 섹션 */}
            <View style={styles.whiteBox}>
              {/* 건물 이름 */}
              <Text style={styles.buildingName}>{property.buildingName}</Text>

              {/* 평점 */}
              <Text style={styles.rating}>4.0</Text>

              {/* 별점 */}
              <View style={styles.starsContainer}>
                <Svg width="103" height="20" viewBox="0 0 103 20" fill="none">
                  <Path
                    d="M9.11733 2.81088C9.35681 2.07383 10.3995 2.07383 10.639 2.81088L11.8664 6.58825C11.9735 6.91787 12.2806 7.14104 12.6272 7.14104H16.599C17.3739 7.14104 17.6962 8.13273 17.0692 8.58825L13.856 10.9228C13.5756 11.1265 13.4583 11.4876 13.5654 11.8172L14.7927 15.5946C15.0322 16.3316 14.1886 16.9445 13.5616 16.489L10.3484 14.1545C10.068 13.9508 9.68834 13.9508 9.40795 14.1545L6.19472 16.489C5.56775 16.9445 4.72417 16.3316 4.96365 15.5946L6.19099 11.8172C6.29809 11.4876 6.18076 11.1265 5.90037 10.9228L2.68715 8.58825C2.06018 8.13273 2.3824 7.14104 3.15738 7.14104H7.12914C7.47572 7.14104 7.78289 6.91787 7.88999 6.58825L9.11733 2.81088Z"
                    fill="#FEB71F"
                  />
                  <Path
                    d="M29.9279 2.81088C30.1674 2.07383 31.2101 2.07383 31.4496 2.81088L32.6769 6.58825C32.784 6.91787 33.0912 7.14104 33.4378 7.14104H37.4095C38.1845 7.14104 38.5067 8.13273 37.8797 8.58825L34.6665 10.9228C34.3861 11.1265 34.2688 11.4876 34.3759 11.8172L35.6032 15.5946C35.8427 16.3316 34.9991 16.9445 34.3722 16.489L31.1589 14.1545C30.8786 13.9508 30.4989 13.9508 30.2185 14.1545L27.0053 16.489C26.3783 16.9445 25.5347 16.3316 25.7742 15.5946L27.0015 11.8172C27.1086 11.4876 26.9913 11.1265 26.7109 10.9228L23.4977 8.58825C22.8707 8.13273 23.1929 7.14104 23.9679 7.14104H27.9397C28.2863 7.14104 28.5934 6.91787 28.7005 6.58825L29.9279 2.81088Z"
                    fill="#FEB71F"
                  />
                  <Path
                    d="M50.7384 2.81088C50.9779 2.07383 52.0206 2.07383 52.2601 2.81088L53.4875 6.58825C53.5946 6.91787 53.9017 7.14104 54.2483 7.14104H58.2201C58.995 7.14104 59.3173 8.13273 58.6903 8.58825L55.4771 10.9228C55.1967 11.1265 55.0794 11.4876 55.1865 11.8172L56.4138 15.5946C56.6533 16.3316 55.8097 16.9445 55.1827 16.489L51.9695 14.1545C51.6891 13.9508 51.3094 13.9508 51.029 14.1545L47.8158 16.489C47.1888 16.9445 46.3453 16.3316 46.5847 15.5946L47.8121 11.8172C47.9192 11.4876 47.8019 11.1265 47.5215 10.9228L44.3082 8.58825C43.6813 8.13273 44.0035 7.14104 44.7785 7.14104H48.7502C49.0968 7.14104 49.404 6.91787 49.5111 6.58825L50.7384 2.81088Z"
                    fill="#FEB71F"
                  />
                  <Path
                    d="M71.549 2.81088C71.7885 2.07383 72.8312 2.07383 73.0707 2.81088L74.298 6.58825C74.4051 6.91787 74.7123 7.14104 75.0588 7.14104H79.0306C79.8056 7.14104 80.1278 8.13273 79.5008 8.58825L76.2876 10.9228C76.0072 11.1265 75.8899 11.4876 75.997 11.8172L77.2243 15.5946C77.4638 16.3316 76.6202 16.9445 75.9933 16.489L72.78 14.1545C72.4997 13.9508 72.12 13.9508 71.8396 14.1545L68.6264 16.489C67.9994 16.9445 67.1558 16.3316 67.3953 15.5946L68.6226 11.8172C68.7297 11.4876 68.6124 11.1265 68.332 10.9228L65.1188 8.58825C64.4918 8.13273 64.814 7.14104 65.589 7.14104H69.5608C69.9074 7.14104 70.2145 6.91787 70.3216 6.58825L71.549 2.81088Z"
                    fill="#FEB71F"
                  />
                  <Path
                    d="M92.3595 2.81088C92.599 2.07383 93.6417 2.07383 93.8812 2.81088L95.1085 6.58825C95.2156 6.91787 95.5228 7.14104 95.8694 7.14104H99.8412C100.616 7.14104 100.938 8.13273 100.311 8.58825L97.0982 10.9228C96.8178 11.1265 96.7004 11.4876 96.8075 11.8172L98.0349 15.5946C98.2744 16.3316 97.4308 16.9445 96.8038 16.489L93.5906 14.1545C93.3102 13.9508 92.9305 13.9508 92.6501 14.1545L89.4369 16.489C88.8099 16.9445 87.9664 16.3316 88.2058 15.5946L89.4332 11.8172C89.5403 11.4876 89.423 11.1265 89.1426 10.9228L85.9293 8.58825C85.3024 8.13273 85.6246 7.14104 86.3996 7.14104H90.3713C90.7179 7.14104 91.0251 6.91787 91.1322 6.58825L92.3595 2.81088Z"
                    fill="#F2F2F2"
                  />
                </Svg>
              </View>

              {/* 후기 개수 */}
              <Text style={styles.reviewCount}>12개의 후기</Text>

              {/* 평가 항목들 */}
              <View style={styles.ratingsSection}>
                {/* 소음 */}
                <View style={styles.ratingItem}>
                  <Text style={styles.ratingLabel}>소음</Text>
                  <Text style={styles.ratingText}>조용해요</Text>
                  <View style={styles.ratingBarContainer}>
                    <Svg width="170" height="9" viewBox="0 0 170 9" fill="none">
                      <Rect
                        x="0.9375"
                        y="0.895996"
                        width="168.99"
                        height="7.96677"
                        rx="3.98339"
                        fill="#F2F2F2"
                      />
                      <Rect
                        x="0.9375"
                        y="0.895996"
                        width="163.085"
                        height="7.96677"
                        rx="3.98339"
                        fill="#FFD429"
                      />
                    </Svg>
                  </View>
                </View>

                {/* 편의시설 */}
                <View style={styles.ratingItem}>
                  <Text style={styles.ratingLabel}>편의시설</Text>
                  <Text style={styles.ratingText}>접근성 좋아요</Text>
                  <View style={styles.ratingBarContainer}>
                    <Svg width="170" height="9" viewBox="0 0 170 9" fill="none">
                      <Rect
                        x="0.9375"
                        y="0.895996"
                        width="168.99"
                        height="7.96677"
                        rx="3.98339"
                        fill="#F2F2F2"
                      />
                      <Rect
                        x="0.9375"
                        y="0.895996"
                        width="155"
                        height="7.96677"
                        rx="3.98339"
                        fill="#FFD429"
                      />
                    </Svg>
                  </View>
                </View>

                {/* 주차장 */}
                <View style={styles.ratingItem}>
                  <Text style={styles.ratingLabel}>주차장</Text>
                  <Text style={styles.ratingText}>넓어요</Text>
                  <View style={styles.ratingBarContainer}>
                    <Svg width="170" height="9" viewBox="0 0 170 9" fill="none">
                      <Rect
                        x="0.9375"
                        y="0.895996"
                        width="168.99"
                        height="7.96677"
                        rx="3.98339"
                        fill="#F2F2F2"
                      />
                      <Rect
                        x="0.9375"
                        y="0.895996"
                        width="110"
                        height="7.96677"
                        rx="3.98339"
                        fill="#FFD429"
                      />
                    </Svg>
                  </View>
                </View>

                {/* 벌레 */}
                <View style={styles.ratingItem}>
                  <Text style={styles.ratingLabel}>벌레</Text>
                  <Text style={styles.ratingText}>가끔 나와요</Text>
                  <View style={styles.ratingBarContainer}>
                    <Svg width="170" height="9" viewBox="0 0 170 9" fill="none">
                      <Rect
                        x="0.9375"
                        y="0.895996"
                        width="168.99"
                        height="7.96677"
                        rx="3.98339"
                        fill="#F2F2F2"
                      />
                      <Rect
                        x="0.9375"
                        y="0.895996"
                        width="30"
                        height="7.96677"
                        rx="3.98339"
                        fill="#FFD429"
                      />
                    </Svg>
                  </View>
                </View>
              </View>

              {/* 탭 메뉴 */}
              <View style={styles.tabContainer}>
                <View style={styles.tabsRow}>
                  <TouchableOpacity onPress={() => setSelectedTab('실거주자 후기')}>
                    <Text
                      style={[
                        styles.tabText,
                        selectedTab === '실거주자 후기' && styles.tabTextActive,
                      ]}
                    >
                      실거주자 후기
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedTab('기본 정보')}>
                    <Text
                      style={[styles.tabText, selectedTab === '기본 정보' && styles.tabTextActive]}
                    >
                      기본 정보
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedTab('질문하기')}>
                    <Text
                      style={[styles.tabText, selectedTab === '질문하기' && styles.tabTextActive]}
                    >
                      질문하기
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedTab('양도')}>
                    <Text style={[styles.tabText, selectedTab === '양도' && styles.tabTextActive]}>
                      양도
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* 하단 회색 줄 */}
                <View style={styles.tabUnderlineContainer}>
                  <Svg
                    width="393"
                    height="4"
                    viewBox="0 0 393 4"
                    fill="none"
                    style={styles.grayLine}
                  >
                    <Path d="M0 2.02002H397.398" stroke="#F2F2F2" strokeWidth="3" />
                  </Svg>

                  {/* 주황색 줄 */}
                  <View
                    style={[
                      styles.orangeLineContainer,
                      selectedTab === '실거주자 후기' && { left: 10, width: 92 },
                      selectedTab === '기본 정보' && { left: 122, width: 70 },
                      selectedTab === '질문하기' && { left: 217, width: 70 },
                      selectedTab === '양도' && { left: 312, width: 45 },
                    ]}
                  >
                    <Svg
                      width="100%"
                      height="4"
                      viewBox="0 0 127 4"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <Path
                        d="M-2.81641 2H125.086"
                        stroke="#FF805F"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </Svg>
                  </View>
                </View>
              </View>

              {/* 기본 정보 섹션 */}
              {selectedTab === '기본 정보' && (
                <View style={styles.basicInfoSection}>
                  <Text style={styles.basicInfoTitle}>기본 정보</Text>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>주소</Text>
                    <View style={styles.infoContent}>
                      <Text style={styles.infoValue}>경기 수원시 영통구 영통동 1012-1</Text>
                      <Text style={styles.infoValue}>반달로35번길 30</Text>
                    </View>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>가격</Text>
                    <Text style={styles.infoValue}>{formatPriceText()}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>세대수</Text>
                    <Text style={styles.infoValue}>-</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>난방방식</Text>
                    <Text style={styles.infoValue}>-</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>주차대수</Text>
                    <Text style={styles.infoValue}>총 715대</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>승강기대수</Text>
                    <Text style={styles.infoValue}>7대 (일반 5대, 비상용 2대)</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>건축물용도</Text>
                    <View>
                      <Text style={styles.infoValue}>오피스텔 84.1%</Text>
                      <Text style={styles.infoValue}>기타제2종근린생활시설 15.8%</Text>
                    </View>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>사용승인일</Text>
                    <Text style={styles.infoValue}>2017.09.26</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>준공일</Text>
                    <Text style={styles.infoValue}>2017.09</Text>
                  </View>

                  <Text style={styles.etcTitle}>기타</Text>
                  <View style={styles.etcContainer}>
                    <View style={styles.etcItem}>
                      <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <Circle
                          cx="14.0546"
                          cy="13.5546"
                          r="12.6046"
                          stroke="#323232"
                          strokeWidth="1.9"
                        />
                        <Path
                          d="M15.9023 7.0874C17.9137 7.18914 19.5137 8.85251 19.5137 10.8892L19.5088 11.0845C19.4103 13.0311 17.8489 14.5915 15.9023 14.6899L15.707 14.6948H12.1777V18.9751C12.1777 19.4997 11.7522 19.9253 11.2275 19.9253C10.7029 19.9253 10.2774 19.4997 10.2773 18.9751V8.13135C10.2773 7.88541 10.371 7.66143 10.5244 7.49268C10.6857 7.24579 10.9644 7.08263 11.2812 7.08252H15.707L15.9023 7.0874ZM12.2783 12.7954H15.707C16.7597 12.7953 17.6131 11.9419 17.6133 10.8892C17.6133 9.83634 16.7598 8.98299 15.707 8.98291H12.2783V12.7954Z"
                          fill="#323232"
                        />
                      </Svg>
                      <Text style={styles.etcText}>주차가능</Text>
                    </View>

                    <View style={styles.etcItem}>
                      <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <Path
                          d="M10 5.08252H17.9717"
                          stroke="#323232"
                          strokeWidth="1.9"
                          strokeLinecap="round"
                        />
                        <Path d="M14.0527 11.8604V25.4151" stroke="#323232" strokeWidth="1.9" />
                        <Rect
                          x="1.95"
                          y="1.45"
                          width="24.1053"
                          height="24.1053"
                          rx="12.0526"
                          stroke="#323232"
                          strokeWidth="1.9"
                        />
                      </Svg>
                      <Text style={styles.etcText}>엘리베이터</Text>
                    </View>
                  </View>
                </View>
              )}

              {/* 질문하기 섹션 */}
              {selectedTab === '질문하기' && (
                <View style={styles.contentSection}>
                  {questionData.map(renderQuestionCard)}

                  {/* 질문하기 버튼 */}
                  <TouchableOpacity
                    style={styles.writeButton}
                    onPress={() => {
                      onClose();
                      router.push('/main/map/question-write');
                    }}
                  >
                    <Text style={styles.writeButtonText}>질문하기</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* 양도 섹션 */}
              {selectedTab === '양도' && (
                <View style={styles.contentSection}>{transferData.map(renderTransferCard)}</View>
              )}

              {/* 실거주자 후기 섹션 */}
              {selectedTab === '실거주자 후기' && (
                <View style={styles.contentSection}>
                  <TouchableOpacity
                    style={styles.reviewDetailButton}
                    onPress={() => {
                      onClose();
                      router.push('/main/map/review-detail');
                    }}
                  >
                    <Text style={styles.reviewDetailButtonText}>실거주자 후기 전체보기</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backgroundTouchable: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: COLORS.neutral.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.9, // 화면의 90% 높이
  },
  handleContainer: {
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.neutral.grey3,
    borderRadius: 2,
  },
  topNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral.grey2,
  },
  backButton: {
    padding: 8,
  },
  rightIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  scrapButton: {
    padding: 4,
  },
  menuButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  whiteBox: {
    backgroundColor: COLORS.neutral.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  buildingName: {
    fontFamily: 'Pretendard',
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.neutral.black,
    marginBottom: 12,
  },
  rating: {
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.neutral.black,
    marginBottom: 8,
  },
  starsContainer: {
    marginBottom: 8,
  },
  reviewCount: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.neutral.grey5,
    marginBottom: 24,
  },
  ratingsSection: {
    marginBottom: 24,
  },
  ratingItem: {
    marginBottom: 16,
  },
  ratingLabel: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.neutral.black,
    marginBottom: 4,
  },
  ratingText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.neutral.grey5,
    marginBottom: 8,
  },
  ratingBarContainer: {
    width: 170,
  },
  tabContainer: {
    marginTop: 24,
    marginBottom: 0,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  tabText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.neutral.grey5,
    paddingVertical: 8,
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  tabUnderlineContainer: {
    position: 'relative',
    height: 4,
    marginBottom: 20,
  },
  grayLine: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  orangeLineContainer: {
    position: 'absolute',
    top: 0,
    height: 4,
  },
  basicInfoSection: {
    paddingTop: 20,
  },
  basicInfoTitle: {
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.neutral.black,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral.grey2,
  },
  infoLabel: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.neutral.grey5,
    width: 100,
  },
  infoContent: {
    flex: 1,
  },
  infoValue: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.neutral.black,
  },
  etcTitle: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.neutral.black,
    marginTop: 24,
    marginBottom: 16,
  },
  etcContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  etcItem: {
    alignItems: 'center',
    gap: 8,
  },
  etcText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.neutral.black,
  },
  contentSection: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  transferCard: {
    backgroundColor: COLORS.neutral.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.neutral.grey2,
  },
  transferHeader: {
    marginBottom: 12,
  },
  transferAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
  },
  transferProfileImageInner: {
    width: '100%',
    height: '100%',
  },
  transferAuthorDetails: {
    flex: 1,
  },
  transferNameTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  transferAuthorName: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.neutral.black,
  },
  transferDate: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.neutral.grey5,
  },
  transferContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  transferContentLeft: {
    flex: 1,
    paddingRight: 12,
  },
  transferTitle: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.neutral.black,
    marginBottom: 8,
  },
  transferDescription: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.neutral.grey5,
  },
  transferImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  transferImage: {
    width: '100%',
    height: '100%',
  },
  transferDivider: {
    height: 1,
    backgroundColor: COLORS.neutral.grey2,
    marginVertical: 12,
  },
  transferActions: {
    flexDirection: 'row',
    gap: 16,
  },
  transferActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  transferActionIcon: {
    marginRight: 4,
  },
  transferActionText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.neutral.grey5,
  },
  questionCard: {
    backgroundColor: COLORS.neutral.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.neutral.grey2,
  },
  questionHeader: {
    marginBottom: 12,
  },
  questionAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
  },
  questionProfileImageInner: {
    width: '100%',
    height: '100%',
  },
  questionAuthorDetails: {
    flex: 1,
  },
  questionNameTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  questionAuthorName: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.neutral.black,
  },
  questionDate: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.neutral.grey5,
  },
  questionContent: {
    marginBottom: 12,
  },
  questionContentLeft: {
    flex: 1,
  },
  questionTitle: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.neutral.black,
    marginBottom: 8,
  },
  questionDescription: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.neutral.grey5,
  },
  questionDivider: {
    height: 1,
    backgroundColor: COLORS.neutral.grey2,
    marginVertical: 12,
  },
  questionActions: {
    flexDirection: 'row',
    gap: 16,
  },
  questionActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  questionActionIcon: {
    marginRight: 4,
  },
  questionActionText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.neutral.grey5,
  },
  writeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  writeButtonText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.neutral.white,
  },
  reviewDetailButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  reviewDetailButtonText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.neutral.white,
  },
});

export default PropertyModal;
