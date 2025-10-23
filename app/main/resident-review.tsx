import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { COLORS } from '@/constants/colors';
import Svg, { Path, Circle, Rect, Mask } from 'react-native-svg';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

type TabType = '실거주자 후기' | '기본 정보' | '질문하기' | '양도';

export default function ResidentReview() {
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
      image: require('@/assets/images/donut.png'),
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
    {
      id: 3,
      author: '방미오',
      profileImage: require('@/assets/images/real-racoon-4x.png'),
      time: '3시간 전',
      date: '2025.09.01',
      title: '도넛 나눔할게요',
      content: '도넛을 너무 많이 샀어요. 나눔해요!',
      image: require('@/assets/images/donut.png'),
      comments: 2,
      likes: 15,
      bookmarks: 3,
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
    {
      id: 3,
      author: '구운찹쌀떡',
      profileImage: require('@/assets/images/ramjui.png'),
      date: '2025.09.01',
      title: '주변에 맛집이 있나요??',
      content: '점심을 맨날 같은 곳만 가게 되어서,,, 추천해주세요!',
      comments: 4,
      likes: 0,
      bookmarks: 0,
    },
  ];

  // 양도 카드 렌더링 함수
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
            <View style={styles.transferDotsContainer}>
              <View style={styles.transferDot} />
              <View style={styles.transferDot} />
              <View style={styles.transferDot} />
            </View>
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

  // 질문하기 카드 렌더링 함수 (이미지 없이)
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
            <View style={styles.questionDotsContainer}>
              <View style={styles.questionDot} />
              <View style={styles.questionDot} />
              <View style={styles.questionDot} />
            </View>
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

  return (
    <View style={styles.container}>
      {/* 상단 네비게이션 바 */}
      <View style={styles.topNavBar}>
        {/* 뒤로가기 버튼 */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
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

      {/* 스크롤 가능한 메인 컨텐츠 */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 지도 영역 (나중에 추가) */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>지도 영역</Text>
        </View>

        {/* 흰색 박스 */}
        <View style={styles.whiteBox}>
          {/* 건물 이름 */}
          <Text style={styles.buildingName}>아이파크</Text>

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
                  style={[styles.tabText, selectedTab === '실거주자 후기' && styles.tabTextActive]}
                >
                  실거주자 후기
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedTab('기본 정보')}>
                <Text style={[styles.tabText, selectedTab === '기본 정보' && styles.tabTextActive]}>
                  기본 정보
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedTab('질문하기')}>
                <Text style={[styles.tabText, selectedTab === '질문하기' && styles.tabTextActive]}>
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
              <Svg width="393" height="4" viewBox="0 0 393 4" fill="none" style={styles.grayLine}>
                <Path d="M0 2.02002H397.398" stroke="#F2F2F2" strokeWidth="3" />
              </Svg>

              {/* 주황색 줄 - 선택된 탭에 따라 위치 이동 */}
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

              {/* 주소 */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>주소</Text>
                <View style={styles.infoContent}>
                  <Text style={styles.infoValue}>경기 수원시 영통구 영통동 1012-1</Text>
                  <Text style={styles.infoValue}>반달로35번길 30</Text>
                </View>
              </View>

              {/* 가격 */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>가격</Text>
                <Text style={styles.infoValue}>월세 2000만원/ 40만원</Text>
              </View>

              {/* 세대수 */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>세대수</Text>
                <Text style={styles.infoValue}>-</Text>
              </View>

              {/* 난방방식 */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>난방방식</Text>
                <Text style={styles.infoValue}>-</Text>
              </View>

              {/* 주차대수 */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>주차대수</Text>
                <Text style={styles.infoValue}>총 715대</Text>
              </View>

              {/* 승강기대수 */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>승강기대수</Text>
                <Text style={styles.infoValue}>7대 (일반 5대, 비상용 2대)</Text>
              </View>

              {/* 건축물용도 */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>건축물용도</Text>
                <View>
                  <Text style={styles.infoValue}>오피스텔 84.1%</Text>
                  <Text style={styles.infoValue}>기타제2종근린생활시설 15.8%</Text>
                </View>
              </View>

              {/* 사용승인일 */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>사용승인일</Text>
                <Text style={styles.infoValue}>2017.09.26</Text>
              </View>

              {/* 준공일 */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>준공일</Text>
                <Text style={styles.infoValue}>2017.09</Text>
              </View>

              {/* 기타 섹션 */}
              <Text style={styles.etcTitle}>기타</Text>
              <View style={styles.etcContainer}>
                {/* 주차가능 */}
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

                {/* 엘리베이터 */}
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
                      x="1.45"
                      y="0.95"
                      width="25.2095"
                      height="25.2095"
                      rx="3.28586"
                      stroke="#323232"
                      strokeWidth="1.9"
                    />
                    <Path
                      d="M8.04199 11.1162H19.9023C20.7811 11.1164 21.4932 11.8292 21.4932 12.708V26.1592H6.4502V12.708C6.4502 11.829 7.16302 11.1162 8.04199 11.1162Z"
                      stroke="#323232"
                      strokeWidth="1.9"
                    />
                  </Svg>
                  <Text style={styles.etcText}>엘리베이터</Text>
                </View>

                {/* 경비대 도보 15분 */}
                <View style={styles.etcItem}>
                  <Svg width="30" height="29" viewBox="0 0 30 29" fill="none">
                    <Rect
                      x="1.11464"
                      y="14.4086"
                      width="27.5871"
                      height="12.6702"
                      rx="2.0189"
                      fill="white"
                      stroke="#323232"
                      strokeWidth="2.01052"
                    />
                    <Path
                      d="M24.1605 8.74667C24.1622 8.74818 24.1643 8.74902 24.1666 8.74902C24.1717 8.74902 24.1758 8.75313 24.1758 8.7582V27.085C24.1758 27.6372 23.7281 28.085 23.1758 28.085H6.82031C6.26803 28.085 5.82031 27.6372 5.82031 27.085V8.75608C5.82031 8.75218 5.82347 8.74902 5.82737 8.74902C5.82911 8.74902 5.8308 8.74838 5.83209 8.74721L14.328 1.09849C14.7083 0.756063 15.2858 0.756078 15.6662 1.09853L24.1605 8.74667Z"
                      fill="white"
                      stroke="#323232"
                      strokeWidth="2"
                    />
                    <Path
                      d="M10.7422 19.5072C10.7422 18.5521 11.5164 17.7778 12.4715 17.7778H17.529C18.484 17.7778 19.2583 18.5521 19.2583 19.5072V28.0845H10.7422V19.5072Z"
                      fill="white"
                      stroke="#323232"
                      strokeWidth="2"
                    />
                    <Circle
                      cx="14.995"
                      cy="10.6459"
                      r="2.63431"
                      fill="white"
                      stroke="#323232"
                      strokeWidth="2.01052"
                    />
                  </Svg>
                  <Text style={styles.etcText}>경비대{'\n'}도보 15분</Text>
                </View>

                {/* 영통역 도보 8분 */}
                <View style={styles.etcItem}>
                  <Svg width="30" height="28" viewBox="0 0 30 28" fill="none">
                    <Path
                      d="M8.69359 23.8926L7.09961 26.6524"
                      stroke="#323232"
                      strokeWidth="2.00866"
                      strokeLinecap="round"
                    />
                    <Path
                      d="M22.8964 26.6524L21.3033 23.8921"
                      stroke="#323232"
                      strokeWidth="2.00866"
                      strokeLinecap="round"
                    />
                    <Path
                      d="M10.0986 1.00391H19.626C22.1606 1.00391 24.3439 2.79089 24.8457 5.27539L27.1934 16.8994C27.8592 20.1973 25.3381 23.2783 21.9736 23.2783H7.91797C4.58363 23.2781 2.06987 20.2489 2.68457 16.9717L4.86426 5.34766C5.3367 2.82918 7.53622 1.00391 10.0986 1.00391Z"
                      stroke="#323232"
                      strokeWidth="2.00866"
                    />
                    <Path
                      d="M11.2627 5.5791H18.5771C19.2425 5.57921 19.8308 6.01106 20.0312 6.64551L21.1523 10.1934C21.4626 11.1765 20.7282 12.1777 19.6973 12.1777H10.2227C9.20478 12.1777 8.4725 11.2004 8.75879 10.2236L9.79883 6.67578C9.98941 6.02602 10.5856 5.57913 11.2627 5.5791Z"
                      stroke="#323232"
                      strokeWidth="2.00866"
                    />
                    <Rect
                      x="7.39666"
                      y="17.7121"
                      width="4.10067"
                      height="1.00817"
                      rx="0.504086"
                      fill="#323232"
                      stroke="#323232"
                      strokeWidth="1.00817"
                    />
                    <Rect
                      x="18.5451"
                      y="17.7121"
                      width="4.10067"
                      height="1.00817"
                      rx="0.504086"
                      fill="#323232"
                      stroke="#323232"
                      strokeWidth="1.00817"
                    />
                  </Svg>
                  <Text style={styles.etcText}>영통역{'\n'}도보 8분</Text>
                </View>
              </View>

              {/* 주변 생활시설 섹션 */}
              <View style={styles.surroundingFacilitiesHeader}>
                <Text style={styles.surroundingFacilitiesTitle}>주변 생활시설</Text>
                <Text style={styles.radiusText}>반경 1km 이내</Text>
              </View>

              <View style={styles.facilitiesContainer}>
                {/* 편의점 */}
                <View style={styles.facilityItem}>
                  <Svg width="27" height="28" viewBox="0 0 27 28" fill="none">
                    <Rect
                      x="3.23125"
                      y="8.57549"
                      width="20.5977"
                      height="17.8784"
                      rx="2.90535"
                      fill="white"
                      stroke="#323232"
                      strokeWidth="1.9"
                    />
                    <Path
                      d="M11.3428 17.9014H15.7178C16.3694 17.9015 16.8972 18.4294 16.8975 19.0811V26.4541H10.1631V19.0811C10.1633 18.4295 10.6913 17.9016 11.3428 17.9014Z"
                      stroke="#323232"
                      strokeWidth="1.9"
                    />
                    <Rect
                      x="1.03789"
                      y="0.95"
                      width="24.9828"
                      height="11.9037"
                      rx="2.05"
                      fill="white"
                      stroke="#323232"
                      strokeWidth="1.9"
                    />
                    <Path
                      d="M18 6.24658L18 10.2466"
                      stroke="#323232"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                    <Path
                      d="M8.84225 5.22551C9.06637 4.80512 9.76689 3.96436 10.7759 3.96436C11.9388 3.96436 12.639 4.94705 12.4352 5.91726C12.1194 7.42003 7.28243 9.88294 8.84225 9.88294C9.68874 9.88294 11.7152 9.88294 12.6707 9.88294"
                      stroke="#323232"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                    <Path
                      d="M16.1069 3.77002L14.8819 7.84307C14.8249 8.0325 14.9668 8.22326 15.1646 8.22326H19.5"
                      stroke="#323232"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </Svg>
                  <Text style={styles.facilityName}>편의점</Text>
                  <Text style={styles.facilityCount}>22개</Text>
                </View>

                {/* 마트 */}
                <View style={styles.facilityItem}>
                  <Svg width="27" height="25" viewBox="0 0 27 25" fill="none">
                    <Rect
                      x="3.23125"
                      y="5.95"
                      width="20.5977"
                      height="17.8784"
                      rx="2.90535"
                      fill="white"
                      stroke="#323232"
                      strokeWidth="1.9"
                    />
                    <Path
                      d="M11.3428 15.2759H15.7178C16.3694 15.276 16.8972 15.804 16.8975 16.4556V23.8286H10.1631V16.4556C10.1633 15.804 10.6913 15.2761 11.3428 15.2759Z"
                      stroke="#323232"
                      strokeWidth="1.9"
                    />
                    <Mask id="path-3-inside-1_4329_40071" fill="white">
                      <Path d="M23.5498 0.404297C24.1156 0.404297 24.6128 0.779319 24.7686 1.32324L26.4443 7.17871C26.4596 7.23206 26.4706 7.28539 26.4783 7.33848C26.4897 7.41769 26.5082 7.496 26.5392 7.56978C26.6999 7.95223 26.7891 8.36398 26.7891 8.79395C26.7891 10.7923 24.9002 12.412 22.5703 12.4121C20.3591 12.4121 18.5451 10.9532 18.3661 9.09629C18.3501 8.93047 18.2165 8.79492 18.05 8.79492C17.8844 8.79492 17.7513 8.92887 17.7341 9.09354C17.5414 10.9386 15.7345 12.3847 13.5332 12.3848C11.3326 12.3848 9.5262 10.9396 9.33249 9.09533C9.3151 8.92969 9.1812 8.79492 9.01464 8.79492C8.84809 8.79492 8.71419 8.92967 8.69678 9.09531C8.50298 10.9395 6.69664 12.3847 4.49609 12.3848C2.16633 12.3848 0.277613 10.7648 0.277344 8.7666C0.277344 8.33622 0.365311 7.9232 0.52612 7.54029C0.555431 7.4705 0.573548 7.39663 0.585578 7.32189C0.593397 7.27331 0.604094 7.22455 0.618164 7.17578L2.30762 1.32031C2.46429 0.777753 2.96163 0.404297 3.52637 0.404297H23.5498Z" />
                    </Mask>
                    <Path
                      d="M23.5498 0.404297C24.1156 0.404297 24.6128 0.779319 24.7686 1.32324L26.4443 7.17871C26.4596 7.23206 26.4706 7.28539 26.4783 7.33848C26.4897 7.41769 26.5082 7.496 26.5392 7.56978C26.6999 7.95223 26.7891 8.36398 26.7891 8.79395C26.7891 10.7923 24.9002 12.412 22.5703 12.4121C20.3591 12.4121 18.5451 10.9532 18.3661 9.09629C18.3501 8.93047 18.2165 8.79492 18.05 8.79492C17.8844 8.79492 17.7513 8.92887 17.7341 9.09354C17.5414 10.9386 15.7345 12.3847 13.5332 12.3848C11.3326 12.3848 9.5262 10.9396 9.33249 9.09533C9.3151 8.92969 9.1812 8.79492 9.01464 8.79492C8.84809 8.79492 8.71419 8.92967 8.69678 9.09531C8.50298 10.9395 6.69664 12.3847 4.49609 12.3848C2.16633 12.3848 0.277613 10.7648 0.277344 8.7666C0.277344 8.33622 0.365311 7.9232 0.52612 7.54029C0.555431 7.4705 0.573548 7.39663 0.585578 7.32189C0.593397 7.27331 0.604094 7.22455 0.618164 7.17578L2.30762 1.32031C2.46429 0.777753 2.96163 0.404297 3.52637 0.404297H23.5498Z"
                      fill="white"
                    />
                    <Path
                      d="M24.7686 1.32324L26.5952 0.800467L26.5952 0.800234L24.7686 1.32324ZM26.4443 7.17871L28.2711 6.65643L28.271 6.65594L26.4443 7.17871ZM26.7891 8.79395H28.6891V8.7939L26.7891 8.79395ZM22.5703 12.4121V14.3121H22.5704L22.5703 12.4121ZM13.5332 12.3848V14.2848H13.5332L13.5332 12.3848ZM4.49609 12.3848V14.2848H4.49611L4.49609 12.3848ZM0.277344 8.7666H-1.62266V8.76686L0.277344 8.7666ZM0.618164 7.17578L-1.20737 6.64907L-1.20739 6.64913L0.618164 7.17578ZM2.30762 1.32031L0.482197 0.793205L0.482084 0.793599L2.30762 1.32031ZM0.52612 7.54029L-1.22567 6.8046L0.52612 7.54029ZM0.585578 7.32189L-1.29028 7.01994L0.585578 7.32189ZM8.69678 9.09531L10.5864 9.29389L8.69678 9.09531ZM9.33249 9.09533L7.44289 9.2938L9.33249 9.09533ZM17.7341 9.09354L15.8444 8.89616L17.7341 9.09354ZM18.3661 9.09629L16.4748 9.27865L18.3661 9.09629ZM26.4783 7.33848L24.5978 7.60979L26.4783 7.33848ZM26.5392 7.56978L24.7876 8.30604L26.5392 7.56978ZM23.5498 0.404297V2.3043C23.2672 2.3043 23.0195 2.11706 22.942 1.84625L24.7686 1.32324L26.5952 0.800234C26.2061 -0.558417 24.964 -1.4957 23.5498 -1.4957V0.404297ZM24.7686 1.32324L22.9419 1.84602L24.6177 7.70149L26.4443 7.17871L28.271 6.65594L26.5952 0.800467L24.7686 1.32324ZM26.4443 7.17871L24.6175 7.701C24.6074 7.66556 24.6013 7.63459 24.5978 7.60979L26.4783 7.33848L28.3588 7.06717C28.3399 6.9362 28.3118 6.79856 28.2711 6.65643L26.4443 7.17871ZM26.5392 7.56978L24.7876 8.30604C24.8558 8.46833 24.8891 8.63051 24.8891 8.79399L26.7891 8.79395L28.6891 8.7939C28.689 8.09744 28.544 7.43613 28.2907 6.83352L26.5392 7.56978ZM26.7891 8.79395H24.8891C24.8891 9.47959 24.1352 10.5121 22.5703 10.5121L22.5703 12.4121L22.5704 14.3121C25.6652 14.312 28.6891 12.105 28.6891 8.79395H26.7891ZM22.5703 12.4121V10.5121C21.1015 10.5121 20.3214 9.57816 20.2573 8.91393L18.3661 9.09629L16.4748 9.27865C16.7689 12.3283 19.6166 14.3121 22.5703 14.3121V12.4121ZM17.7341 9.09354L15.8444 8.89616C15.7751 9.5592 14.9935 10.4848 13.5332 10.4848L13.5332 12.3848L13.5332 14.2848C16.4756 14.2847 19.3076 12.318 19.6238 9.29092L17.7341 9.09354ZM13.5332 12.3848V10.4848C12.0735 10.4848 11.2917 9.55981 11.2221 8.89687L9.33249 9.09533L7.44289 9.2938C7.76066 12.3193 10.5916 14.2848 13.5332 14.2848V12.3848ZM8.69678 9.09531L6.80719 8.89674C6.73751 9.55978 5.95558 10.4848 4.49608 10.4848L4.49609 12.3848L4.49611 14.2848C7.4377 14.2847 10.2685 12.3192 10.5864 9.29389L8.69678 9.09531ZM4.49609 12.3848V10.4848C2.93166 10.4848 2.17744 9.45231 2.17734 8.76635L0.277344 8.7666L-1.62266 8.76686C-1.62221 12.0773 1.401 14.2848 4.49609 14.2848V12.3848ZM0.277344 8.7666H2.17734C2.17734 8.59859 2.21109 8.43509 2.27791 8.27598L0.52612 7.54029L-1.22567 6.8046C-1.48046 7.41131 -1.62266 8.07385 -1.62266 8.7666H0.277344ZM0.585578 7.32189L2.46143 7.62384C2.45773 7.64687 2.4521 7.67337 2.44371 7.70244L0.618164 7.17578L-1.20739 6.64913C-1.24391 6.77573 -1.27093 6.89976 -1.29028 7.01994L0.585578 7.32189ZM0.618164 7.17578L2.4437 7.70249L4.13315 1.84703L2.30762 1.32031L0.482084 0.793599L-1.20737 6.64907L0.618164 7.17578ZM2.30762 1.32031L4.13304 1.84742C4.05452 2.11933 3.80655 2.3043 3.52637 2.3043V0.404297V-1.4957C2.11671 -1.4957 0.874052 -0.563823 0.482197 0.793205L2.30762 1.32031ZM3.52637 0.404297V2.3043H23.5498V0.404297V-1.4957H3.52637V0.404297ZM0.52612 7.54029L2.27791 8.27598C2.38306 8.0256 2.43381 7.79545 2.46143 7.62384L0.585578 7.32189L-1.29028 7.01994C-1.28671 6.9978 -1.2722 6.9154 -1.22567 6.8046L0.52612 7.54029ZM9.01464 8.79492V6.89492C7.76314 6.89492 6.91403 7.88008 6.80719 8.89674L8.69678 9.09531L10.5864 9.29389C10.5144 9.97927 9.93303 10.6949 9.01464 10.6949V8.79492ZM9.33249 9.09533L11.2221 8.89687C11.1153 7.88017 10.2662 6.89492 9.01464 6.89492V8.79492V10.6949C8.0962 10.6949 7.51488 9.97921 7.44289 9.2938L9.33249 9.09533ZM18.05 8.79492V6.89492C16.7996 6.89492 15.9506 7.87933 15.8444 8.89616L17.7341 9.09354L19.6238 9.29092C19.552 9.97842 18.9692 10.6949 18.05 10.6949V8.79492ZM18.3661 9.09629L20.2573 8.91393C20.1586 7.89084 19.3084 6.89492 18.05 6.89492V8.79492V10.6949C17.1247 10.6949 16.5415 9.97011 16.4748 9.27865L18.3661 9.09629ZM26.4783 7.33848L24.5978 7.60979C24.6245 7.7949 24.676 8.04037 24.7876 8.30604L26.5392 7.56978L28.2907 6.83352C28.3404 6.95164 28.355 7.04049 28.3588 7.06717L26.4783 7.33848Z"
                      fill="#323232"
                      mask="url(#path-3-inside-1_4329_40071)"
                    />
                  </Svg>
                  <Text style={styles.facilityName}>마트</Text>
                  <Text style={styles.facilityCount}>2개</Text>
                </View>

                {/* 병원 */}
                <View style={styles.facilityItemLast}>
                  <Svg width="27" height="26" viewBox="0 0 27 26" fill="none">
                    <Mask id="path-1-inside-1_4329_40093" fill="white">
                      <Path d="M19.0947 0.778809C20.7648 0.778809 22.1191 2.13314 22.1191 3.80322V5.03662H23.1787C24.8467 5.03662 26.1992 6.38914 26.1992 8.05713V22.7622C26.1992 24.4302 24.8467 25.7827 23.1787 25.7827H3.88184C2.21384 25.7827 0.861328 24.4302 0.861328 22.7622V8.05713C0.861328 6.38914 2.21384 5.03662 3.88184 5.03662H4.94141V3.80322C4.94141 2.13314 6.29574 0.778809 7.96582 0.778809H19.0947Z" />
                    </Mask>
                    <Path
                      d="M19.0947 0.778809C20.7648 0.778809 22.1191 2.13314 22.1191 3.80322V5.03662H23.1787C24.8467 5.03662 26.1992 6.38914 26.1992 8.05713V22.7622C26.1992 24.4302 24.8467 25.7827 23.1787 25.7827H3.88184C2.21384 25.7827 0.861328 24.4302 0.861328 22.7622V8.05713C0.861328 6.38914 2.21384 5.03662 3.88184 5.03662H4.94141V3.80322C4.94141 2.13314 6.29574 0.778809 7.96582 0.778809H19.0947Z"
                      fill="white"
                    />
                    <Path
                      d="M22.1191 5.03662H20.2191V6.93662H22.1191V5.03662ZM4.94141 5.03662V6.93662H6.84141V5.03662H4.94141ZM19.0947 0.778809V2.67881C19.7155 2.67881 20.2191 3.18248 20.2191 3.80322H22.1191H24.0191C24.0191 1.0838 21.8141 -1.12119 19.0947 -1.12119V0.778809ZM22.1191 3.80322H20.2191V5.03662H22.1191H24.0191V3.80322H22.1191ZM22.1191 5.03662V6.93662H23.1787V5.03662V3.13662H22.1191V5.03662ZM23.1787 5.03662V6.93662C23.7974 6.93662 24.2992 7.43848 24.2992 8.05713H26.1992H28.0992C28.0992 5.33979 25.896 3.13662 23.1787 3.13662V5.03662ZM26.1992 8.05713H24.2992V22.7622H26.1992H28.0992V8.05713H26.1992ZM26.1992 22.7622H24.2992C24.2992 23.3809 23.7974 23.8827 23.1787 23.8827V25.7827V27.6827C25.896 27.6827 28.0992 25.4795 28.0992 22.7622H26.1992ZM23.1787 25.7827V23.8827H3.88184V25.7827V27.6827H23.1787V25.7827ZM3.88184 25.7827V23.8827C3.26318 23.8827 2.76133 23.3809 2.76133 22.7622H0.861328H-1.03867C-1.03867 25.4795 1.1645 27.6827 3.88184 27.6827V25.7827ZM0.861328 22.7622H2.76133V8.05713H0.861328H-1.03867V22.7622H0.861328ZM0.861328 8.05713H2.76133C2.76133 7.43848 3.26318 6.93662 3.88184 6.93662V5.03662V3.13662C1.1645 3.13662 -1.03867 5.33979 -1.03867 8.05713H0.861328ZM3.88184 5.03662V6.93662H4.94141V5.03662V3.13662H3.88184V5.03662ZM4.94141 5.03662H6.84141V3.80322H4.94141H3.04141V5.03662H4.94141ZM4.94141 3.80322H6.84141C6.84141 3.18248 7.34508 2.67881 7.96582 2.67881V0.778809V-1.12119C5.2464 -1.12119 3.04141 1.0838 3.04141 3.80322H4.94141ZM7.96582 0.778809V2.67881H19.0947V0.778809V-1.12119H7.96582V0.778809Z"
                      fill="#323232"
                      mask="url(#path-1-inside-1_4329_40093)"
                    />
                    <Mask id="path-3-inside-2_4329_40093" fill="white">
                      <Path d="M8.45117 16.1997C8.45117 15.2459 9.22439 14.4727 10.1782 14.4727H16.8833C17.8372 14.4727 18.6104 15.2459 18.6104 16.1997V25.7828H8.45117V16.1997Z" />
                    </Mask>
                    <Path
                      d="M8.45117 16.1997C8.45117 15.2459 9.22439 14.4727 10.1782 14.4727H16.8833C17.8372 14.4727 18.6104 15.2459 18.6104 16.1997V25.7828H8.45117V16.1997Z"
                      fill="white"
                      stroke="#323232"
                      strokeWidth="3.8"
                      mask="url(#path-3-inside-2_4329_40093)"
                    />
                    <Path
                      d="M10.5508 8.50342H16.5129"
                      stroke="#323232"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                    />
                    <Path
                      d="M13.5332 5.52344L13.5332 11.4856"
                      stroke="#323232"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                    />
                  </Svg>
                  <Text style={styles.facilityName}>병원</Text>
                  <Text style={styles.facilityCount}>103개</Text>
                </View>
              </View>
            </View>
          )}

          {/* 실거주자 후기 섹션 */}
          {selectedTab === '실거주자 후기' && (
            <View style={styles.reviewSection}>
              <Text style={styles.reviewSectionTitle}>실거주자 후기</Text>

              {/* 후기 카드 */}
              <View style={styles.reviewCard}>
                {/* 프로필 영역 */}
                <View style={styles.reviewHeader}>
                  <View style={styles.profileCircle}>
                    <Image
                      source={require('@/assets/images/real-racoon-4x.png')}
                      style={styles.profileImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>방마오</Text>
                    <Text style={styles.reviewerPeriod}>2025년까지 거주</Text>
                  </View>
                </View>

                {/* 별점과 날짜 */}
                <View style={styles.ratingRow}>
                  <Svg width="87" height="18" viewBox="0 0 87 18" fill="none">
                    <Path
                      d="M7.5551 2.7345C7.78307 2.03287 8.7757 2.03286 9.00367 2.7345L9.96724 5.70006C10.0692 6.01384 10.3616 6.22629 10.6915 6.22629H13.8097C14.5474 6.22629 14.8542 7.17033 14.2573 7.60396L11.7347 9.43678C11.4678 9.63071 11.3561 9.97445 11.458 10.2882L12.4216 13.2538C12.6496 13.9554 11.8465 14.5389 11.2497 14.1052L8.72702 12.2724C8.4601 12.0785 8.09867 12.0785 7.83175 12.2724L5.30909 14.1052C4.71225 14.5389 3.9092 13.9554 4.13717 13.2538L5.10074 10.2882C5.2027 9.97445 5.09101 9.63071 4.82409 9.43678L2.30143 7.60396C1.70459 7.17033 2.01132 6.22629 2.74906 6.22629H5.86724C6.19717 6.22629 6.48958 6.01384 6.59153 5.70006L7.5551 2.7345Z"
                      fill="#FEB71F"
                    />
                    <Path
                      d="M24.9731 2.7345C25.201 2.03287 26.1937 2.03286 26.4216 2.7345L27.3852 5.70006C27.4872 6.01384 27.7796 6.22629 28.1095 6.22629H31.2277C31.9654 6.22629 32.2722 7.17033 31.6753 7.60396L29.1527 9.43678C28.8857 9.63071 28.774 9.97445 28.876 10.2882L29.8396 13.2538C30.0675 13.9554 29.2645 14.5389 28.6676 14.1052L26.145 12.2724C25.8781 12.0785 25.5166 12.0785 25.2497 12.2724L22.7271 14.1052C22.1302 14.5389 21.3272 13.9554 21.5551 13.2538L22.5187 10.2882C22.6207 9.97445 22.509 9.63071 22.2421 9.43678L19.7194 7.60396C19.1226 7.17033 19.4293 6.22629 20.167 6.22629H23.2852C23.6151 6.22629 23.9075 6.01384 24.0095 5.70006L24.9731 2.7345Z"
                      fill="#FEB71F"
                    />
                    <Path
                      d="M42.3891 2.7345C42.6171 2.03287 43.6097 2.03286 43.8377 2.7345L44.8012 5.70006C44.9032 6.01384 45.1956 6.22629 45.5255 6.22629H48.6437C49.3814 6.22629 49.6882 7.17033 49.0913 7.60396L46.5687 9.43678C46.3018 9.63071 46.1901 9.97445 46.292 10.2882L47.2556 13.2538C47.4836 13.9554 46.6805 14.5389 46.0837 14.1052L43.561 12.2724C43.2941 12.0785 42.9327 12.0785 42.6657 12.2724L40.1431 14.1052C39.5462 14.5389 38.7432 13.9554 38.9712 13.2538L39.9347 10.2882C40.0367 9.97445 39.925 9.63071 39.6581 9.43678L37.1354 7.60396C36.5386 7.17033 36.8453 6.22629 37.583 6.22629H40.7012C41.0312 6.22629 41.3236 6.01384 41.4255 5.70006L42.3891 2.7345Z"
                      fill="#FEB71F"
                    />
                    <Path
                      d="M59.8071 2.7345C60.035 2.03287 61.0277 2.03286 61.2556 2.7345L62.2192 5.70006C62.3211 6.01384 62.6136 6.22629 62.9435 6.22629H66.0617C66.7994 6.22629 67.1061 7.17033 66.5093 7.60396L63.9866 9.43678C63.7197 9.63071 63.608 9.97445 63.71 10.2882L64.6736 13.2538C64.9015 13.9554 64.0985 14.5389 63.5016 14.1052L60.979 12.2724C60.7121 12.0785 60.3506 12.0785 60.0837 12.2724L57.561 14.1052C56.9642 14.5389 56.1612 13.9554 56.3891 13.2538L57.3527 10.2882C57.4546 9.97445 57.343 9.63071 57.076 9.43678L54.5534 7.60396C53.9565 7.17033 54.2633 6.22629 55.001 6.22629H58.1192C58.4491 6.22629 58.7415 6.01384 58.8435 5.70006L59.8071 2.7345Z"
                      fill="#FEB71F"
                    />
                    <Path
                      d="M77.225 2.7345C77.453 2.03287 78.4456 2.03286 78.6736 2.7345L79.6372 5.70006C79.7391 6.01384 80.0315 6.22629 80.3615 6.22629H83.4796C84.2174 6.22629 84.5241 7.17033 83.9273 7.60396L81.4046 9.43678C81.1377 9.63071 81.026 9.97445 81.128 10.2882L82.0915 13.2538C82.3195 13.9554 81.5164 14.5389 80.9196 14.1052L78.3969 12.2724C78.13 12.0785 77.7686 12.0785 77.5017 12.2724L74.979 14.1052C74.3822 14.5389 73.5791 13.9554 73.8071 13.2538L74.7707 10.2882C74.8726 9.97445 74.7609 9.63071 74.494 9.43678L71.9714 7.60396C71.3745 7.17033 71.6812 6.22629 72.419 6.22629H75.5372C75.8671 6.22629 76.1595 6.01384 76.2615 5.70006L77.225 2.7345Z"
                      fill="#FEB71F"
                    />
                  </Svg>
                  <Text style={styles.reviewDate}>2025.09.15</Text>
                </View>

                {/* 후기 내용 */}
                <Text style={styles.reviewContent}>
                  편의점이랑 3분 거리여서 접근성이 괜찮히 좋아요. 급하게 구한 집이라 걱정을 많이
                  했는데 생각보다 만족스러워요. 벌레는 가끔 나오지만 바퀴벌레는 아직 안나왔어요 ^^
                </Text>
              </View>

              {/* 12개의 후기 더보기 버튼 */}
              <TouchableOpacity
                style={styles.moreReviewButton}
                onPress={() => router.push('/main/review-detail')}
              >
                <Text style={styles.moreReviewText}>12개의 후기 더보기</Text>
              </TouchableOpacity>

              {/* 하단 구분선 */}
              <View style={styles.bottomLine} />

              {/* 이런 점이 좋았어요 섹션 */}
              <View style={styles.goodPointsSection}>
                <Text style={styles.goodPointsTitle}>이런 점이 좋았어요</Text>

                {/* 청결해요 - 90% */}
                <View style={[styles.pointBox, styles.pointBox90]}>
                  <Text style={styles.pointText}>청결해요</Text>
                  <Text style={styles.pointPercentage}>90%</Text>
                </View>

                {/* 주차가 편해요 - 70% */}
                <View style={[styles.pointBox, styles.pointBox70]}>
                  <Text style={styles.pointText}>주차가 편해요</Text>
                  <Text style={styles.pointPercentage}>70%</Text>
                </View>

                {/* 채광이 좋아요 - 40% */}
                <View style={[styles.pointBox, styles.pointBox40]}>
                  <Text style={styles.pointText}>채광이 좋아요</Text>
                  <Text style={styles.pointPercentage}>40%</Text>
                </View>
              </View>

              {/* 이런 점이 아쉬워요 섹션 */}
              <View style={styles.badPointsSection}>
                <Text style={styles.badPointsTitle}>이런 점이 아쉬워요</Text>

                {/* 학교에서 멀어요 - 90% */}
                <View style={[styles.badPointBox, styles.badPointBox90]}>
                  <Text style={styles.badPointText}>학교에서 멀어요</Text>
                  <Text style={styles.badPointPercentage}>90%</Text>
                </View>

                {/* 역이랑 멀어요 - 80% */}
                <View style={[styles.badPointBox, styles.badPointBox80]}>
                  <Text style={styles.badPointText}>역이랑 멀어요</Text>
                  <Text style={styles.badPointPercentage}>80%</Text>
                </View>

                {/* 소음 - 20% (그라데이션) */}
                <View style={[styles.badPointBox, styles.badPointBox20]}>
                  <Text style={styles.badPointText20}>소음</Text>
                  <Text style={styles.badPointPercentage20}>20%</Text>
                </View>
              </View>

              {/* 구분선 */}
              <View style={styles.dividerLine} />

              {/* 후기 작성 섹션 */}
              <View style={styles.writeReviewSection}>
                <Text style={styles.writeReviewTitle}>후기 작성으로{'\n'}경험을 공유해요!</Text>

                <TouchableOpacity style={styles.writeReviewButton}>
                  <Svg
                    width="13"
                    height="14"
                    viewBox="0 0 13 14"
                    fill="none"
                    style={styles.pencilIcon}
                  >
                    <Path
                      d="M7.80309 1.04381C8.61389 0.105539 10.0756 -0.0527729 11.0682 0.690473L11.313 0.874257C12.3055 1.61785 12.4525 2.98161 11.6417 3.92005L4.9662 11.6457C4.9656 11.6466 4.96568 11.6479 4.96651 11.6486C4.96726 11.6496 4.96705 11.6511 4.96585 11.6516L1.15126 13.2027C0.700995 13.3858 0.229356 12.9906 0.330586 12.5153L1.12847 8.77723C1.12868 8.77624 1.12799 8.77501 1.12718 8.77442C1.12582 8.77361 1.12573 8.77174 1.12676 8.77054L7.80309 1.04381Z"
                      fill="#F2F2F2"
                      stroke="#323232"
                      strokeWidth="1.011"
                    />
                  </Svg>
                  <Text style={styles.writeReviewButtonText}>후기 작성하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 질문하기 섹션 */}
          {selectedTab === '질문하기' && (
            <View style={styles.questionSection}>
              {/* 질문 목록 */}
              <View style={styles.questionList}>{questionData.map(renderQuestionCard)}</View>
            </View>
          )}

          {/* 양도 섹션 */}
          {selectedTab === '양도' && (
            <View style={styles.transferSection}>
              {/* 최신순 정렬 버튼 */}
              <TouchableOpacity style={styles.sortButton} onPress={() => setSortModalVisible(true)}>
                <View style={styles.sortArrowsContainer}>
                  {/* 위쪽 화살표 */}
                  <Svg width="7" height="13" viewBox="0 0 7 13" fill="none" style={styles.upArrow}>
                    <Path
                      d="M3.43945 1.55825L3.43945 11.7227"
                      stroke="#323232"
                      strokeWidth="1.36277"
                      strokeLinecap="round"
                    />
                    <Path
                      d="M1 3.82999L3.37562 1.45438C3.4111 1.4189 3.46862 1.4189 3.5041 1.45438L5.87971 3.82999"
                      stroke="#323232"
                      strokeWidth="1.18107"
                      strokeLinecap="round"
                    />
                  </Svg>
                  {/* 아래쪽 화살표 */}
                  <Svg
                    width="7"
                    height="13"
                    viewBox="0 0 7 13"
                    fill="none"
                    style={styles.downArrow}
                  >
                    <Path
                      d="M3.43945 11.7227L3.43945 1.55825"
                      stroke="#636363"
                      strokeWidth="1.36277"
                      strokeLinecap="round"
                    />
                    <Path
                      d="M5.87971 9.45096L3.5041 11.8266C3.46862 11.8621 3.4111 11.8621 3.37562 11.8266L1 9.45096"
                      stroke="#636363"
                      strokeWidth="1.18107"
                      strokeLinecap="round"
                    />
                  </Svg>
                </View>
                <Text style={styles.sortText}>{selectedSort}</Text>
                <Svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                  <Path
                    d="M10.582 1.09091L6.18708 5.81292C6.09346 5.9135 5.93378 5.91228 5.84171 5.81027L1.58203 1.09091"
                    stroke="#636363"
                    strokeWidth="1.48776"
                    strokeLinecap="round"
                  />
                </Svg>
              </TouchableOpacity>

              {/* 양도 목록 */}
              <View style={styles.transferList}>{transferData.map(renderTransferCard)}</View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 플러스 버튼 - 질문하기 탭일 때만 표시 */}
      {selectedTab === '질문하기' && (
        <TouchableOpacity style={styles.plusButton} onPress={() => router.push('/question-write')}>
          {/* 세로선 */}
          <Svg width="4" height="33" viewBox="0 0 4 33" fill="none" style={styles.plusVerticalLine}>
            <Path
              d="M2.01367 1.99365L2.01367 30.5243"
              stroke="white"
              strokeWidth="3.24058"
              strokeLinecap="round"
            />
          </Svg>
          {/* 가로선 */}
          <Svg
            width="32"
            height="4"
            viewBox="0 0 32 4"
            fill="none"
            style={styles.plusHorizontalLine}
          >
            <Path
              d="M1.74219 2.25879H30.2728"
              stroke="white"
              strokeWidth="3.24058"
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
      )}

      {/* 정렬 모달 */}
      {sortModalVisible && (
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSortModalVisible(false)}
        >
          <View style={styles.sortModal}>
            {sortOptions.map((option, index) => (
              <View key={option}>
                <TouchableOpacity
                  style={styles.sortOption}
                  onPress={() => {
                    setSelectedSort(option);
                    setSortModalVisible(false);
                  }}
                >
                  <Text style={styles.sortOptionText}>{option}</Text>
                </TouchableOpacity>
                {index < sortOptions.length - 1 && (
                  <Svg width="109" height="1" viewBox="0 0 109 1" fill="none">
                    <Path d="M0 0.5L109 0.500017" stroke="#F2F2F2" />
                  </Svg>
                )}
              </View>
            ))}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  topNavBar: {
    width,
    height: 113,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    zIndex: 10,
  },
  backButton: {
    width: 10,
    height: 19.091,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  scrapButton: {
    width: 17.945,
    height: 23.316,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    width: 3,
    height: 15.938,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  mapPlaceholder: {
    width,
    height: 250,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontSize: 18,
    color: '#999',
    fontFamily: 'Pretendard',
  },
  whiteBox: {
    width: 393.004,
    minHeight: 1776,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40.5,
    borderTopRightRadius: 40.5,
    marginTop: -40,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 125,
  },
  buildingName: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 35,
    marginBottom: 10,
    marginTop: 30,
    textAlign: 'center',
  },
  rating: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 22.909,
    fontWeight: '700',
    lineHeight: 28,
    marginTop: 10,
    textAlign: 'center',
  },
  starsContainer: {
    width: 102.553,
    height: 19.311,
    alignSelf: 'center',
    marginTop: 10,
  },
  reviewCount: {
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 2,
  },
  tabContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  tabText: {
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
  tabTextActive: {
    color: '#FF805F',
    fontWeight: '500',
  },
  tabUnderlineContainer: {
    position: 'relative',
    width: '100%',
    height: 4,
  },
  grayLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  orangeLineContainer: {
    position: 'absolute',
    top: 0,
    height: 4,
  },
  basicInfoSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  basicInfoTitle: {
    color: '#000',
    fontFamily: 'Pretendard',
    fontSize: 21,
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: 40,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 22,
    width: 100,
  },
  infoValue: {
    flex: 1,
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 22,
  },
  etcTitle: {
    color: '#000',
    fontFamily: 'Pretendard',
    fontSize: 21,
    fontWeight: '700',
    lineHeight: 28,
    marginTop: 50,
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  etcContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  etcItem: {
    alignItems: 'center',
    width: 70,
    marginHorizontal: 5,
  },
  etcText: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  ratingsSection: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingLabel: {
    color: '#636363',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 22,
    width: 60,
  },
  ratingText: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 22,
    width: 90,
  },
  ratingBarContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  reviewSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  reviewSectionTitle: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 20.864,
    fontWeight: '600',
    lineHeight: 27,
    marginBottom: 20,
  },
  reviewCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginLeft: -16,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 0,
  },
  profileCircle: {
    width: 40.025,
    height: 40.861,
    backgroundColor: '#86D382',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileImage: {
    width: 50.453,
    height: 30.662,
  },
  reviewerInfo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  reviewerName: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    textAlign: 'left',
    marginBottom: -5,
  },
  reviewerPeriod: {
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'left',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },
  reviewDate: {
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
  },
  reviewContent: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'left',
  },
  moreReviewButton: {
    width: 320,
    height: 55,
    backgroundColor: '#F2F2F2',
    borderRadius: 14.559,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3.651,
    },
    shadowOpacity: 0.02,
    shadowRadius: 3.651,
    elevation: 2,
  },
  moreReviewText: {
    width: 112.83,
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 14.602,
    fontWeight: '600',
    lineHeight: 20.078,
    textAlign: 'center',
  },
  bottomLine: {
    width: 310,
    height: 1.5,
    backgroundColor: '#F2F2F2',
    borderRadius: 30,
    marginTop: 20,
  },
  goodPointsSection: {
    marginTop: 50,
  },
  goodPointsTitle: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 16,
  },
  pointBox: {
    height: 43,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  pointBox90: {
    width: 297.932,
    backgroundColor: 'rgba(134, 211, 130, 0.95)',
  },
  pointBox70: {
    width: 237,
    backgroundColor: 'rgba(134, 211, 130, 0.70)',
  },
  pointBox40: {
    width: 180,
    backgroundColor: 'rgba(134, 211, 130, 0.45)',
  },
  pointText: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
  pointPercentage: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
  badPointsSection: {
    marginTop: 30,
  },
  badPointsTitle: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 16,
  },
  badPointBox: {
    height: 43,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  badPointBox90: {
    width: 297.932,
    backgroundColor: 'rgba(255, 128, 95, 0.90)',
  },
  badPointBox80: {
    width: 237,
    backgroundColor: 'rgba(255, 128, 95, 0.70)',
  },
  badPointBox20: {
    width: 150,
    backgroundColor: 'rgba(255, 128, 95, 0.30)',
  },
  badPointText: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
  badPointPercentage: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
  badPointText20: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
  badPointPercentage20: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
  dividerLine: {
    width: 337,
    height: 1.5,
    backgroundColor: '#F2F2F2',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 40,
  },
  writeReviewSection: {
    marginTop: 50,
    alignItems: 'flex-start',
    paddingHorizontal: 0,
  },
  writeReviewTitle: {
    color: '#323232',
    textAlign: 'left',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21,
    marginBottom: 25,
  },
  writeReviewButton: {
    width: 337,
    height: 55,
    backgroundColor: '#F2F2F2',
    borderRadius: 14.559,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3.651,
    },
    shadowOpacity: 0.02,
    shadowRadius: 3.651,
    elevation: 2,
  },
  pencilIcon: {
    width: 12.879,
    height: 12.034,
    transform: [{ rotate: '-6.159deg' }],
    marginRight: 8,
  },
  writeReviewButtonText: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 14.602,
    fontWeight: '600',
    lineHeight: 20.078,
  },
  surroundingFacilitiesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  surroundingFacilitiesTitle: {
    color: '#000',
    fontFamily: 'Pretendard',
    fontSize: 21,
    fontWeight: '700',
    lineHeight: 28,
  },
  radiusText: {
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
  },
  facilitiesContainer: {
    paddingHorizontal: 5,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 8,
  },
  facilityItemLast: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    paddingVertical: 8,
  },
  facilityName: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
    marginLeft: 16,
    flex: 1,
  },
  facilityCount: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 22,
  },
  transferSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 20,
    gap: 6,
  },
  sortArrowsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  upArrow: {
    marginRight: 0,
  },
  downArrow: {
    marginLeft: 0,
  },
  sortText: {
    color: '#323232',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '500',
  },
  transferList: {
    marginTop: 20,
  },
  transferCard: {
    width: 347,
    minHeight: 180,
    backgroundColor: '#FCFCFC',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(242, 242, 242, 0.50)',
    padding: 16,
    marginBottom: 12,
    alignSelf: 'center',
  },
  transferHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  transferAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transferProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFD429',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    overflow: 'hidden',
  },
  transferProfileImageInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  transferAuthorDetails: {
    flex: 1,
  },
  transferNameTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  transferAuthorName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginRight: 8,
  },
  transferTime: {
    fontSize: 12,
    color: '#AAA',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  transferDate: {
    fontSize: 12,
    color: '#636363',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  transferContent: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  transferContentLeft: {
    flex: 1,
    marginRight: 12,
  },
  transferTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginBottom: 8,
  },
  transferDescription: {
    fontSize: 15,
    color: '#636363',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  transferImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
  },
  transferImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  transferDivider: {
    width: 321,
    height: 1.5,
    backgroundColor: '#F2F2F2',
    marginBottom: 20,
    alignSelf: 'center',
  },
  transferActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -8,
  },
  transferActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  transferActionIcon: {
    marginRight: 4,
    position: 'relative',
  },
  transferDotsContainer: {
    position: 'absolute',
    top: 7,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferDot: {
    width: 2.4,
    height: 2.4,
    borderRadius: 1.2,
    backgroundColor: '#AAAAAA',
    marginRight: 2.4,
  },
  transferActionText: {
    fontSize: 13,
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    lineHeight: 28.992,
  },
  questionSection: {
    marginTop: 20,
    paddingHorizontal: 20,
    position: 'relative',
    flex: 1,
  },
  questionList: {
    marginTop: 20,
  },
  questionCard: {
    width: 347,
    minHeight: 180,
    backgroundColor: '#FCFCFC',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(242, 242, 242, 0.50)',
    padding: 16,
    marginBottom: 12,
    alignSelf: 'center',
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  questionProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFD429',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    overflow: 'hidden',
  },
  questionProfileImageInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  questionAuthorDetails: {
    flex: 1,
  },
  questionNameTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  questionAuthorName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginRight: 8,
  },
  questionDate: {
    fontSize: 12,
    color: '#636363',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  questionContent: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  questionContentLeft: {
    flex: 1,
  },
  questionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginBottom: 8,
  },
  questionDescription: {
    fontSize: 15,
    color: '#636363',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  questionDivider: {
    width: 321,
    height: 1.5,
    backgroundColor: '#F2F2F2',
    marginBottom: 20,
    alignSelf: 'center',
  },
  questionActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -8,
  },
  questionActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  questionActionIcon: {
    marginRight: 4,
    position: 'relative',
  },
  questionDotsContainer: {
    position: 'absolute',
    top: 7,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionDot: {
    width: 2.4,
    height: 2.4,
    borderRadius: 1.2,
    backgroundColor: '#AAAAAA',
    marginRight: 2.4,
  },
  questionActionText: {
    fontSize: 13,
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    lineHeight: 28.992,
  },
  plusButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 62.016,
    height: 62.016,
    borderRadius: 62.016,
    backgroundColor: '#FF805F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3.522,
    },
    shadowOpacity: 0.07,
    shadowRadius: 9.863,
    elevation: 4.227,
    zIndex: 1000,
  },
  plusVerticalLine: {
    position: 'absolute',
  },
  plusHorizontalLine: {
    position: 'absolute',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortModal: {
    width: 125,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 12.5,
    elevation: 5,
    paddingVertical: 8,
  },
  sortOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortOptionText: {
    color: '#323232',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
});
