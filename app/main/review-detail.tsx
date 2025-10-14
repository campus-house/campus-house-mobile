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
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

type TabType = '실거주자 후기' | '기본 정보' | '질문하기' | '양도';

export default function ReviewDetail() {
  const [selectedTab, setSelectedTab] = useState<TabType>('실거주자 후기');
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('최신순');

  const sortOptions = ['최신순', '오래된 순', '높은 별점 순', '낮은 별점 순'];

  return (
    <View style={styles.container}>
      {/* 상단 네비게이션 바 */}
      <View style={styles.topNavBar}>
        {/* 뒤로가기 버튼 */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            console.log('뒤로가기 버튼 클릭');
            router.replace('/main/resident-review');
          }}
        >
          <Svg width="13" height="23" viewBox="0 0 13 23" fill="none">
            <Path
              d="M11.1836 2L1.55977 11.3274C1.35491 11.5259 1.35744 11.8554 1.56532 12.0508L11.1836 21.0909"
              stroke="#AAAAAA"
              strokeWidth="2.27273"
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>

        {/* 중앙 타이틀 */}
        <Text style={styles.headerTitle}>아이파크</Text>

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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 메인 흰색 박스 */}
        <View style={styles.whiteBox}>
          {/* 평점 */}
          <Text style={styles.rating}>4.0</Text>

          {/* 별 5개 */}
          <View style={styles.starsContainer}>
            <Svg
              width="150"
              height="28"
              viewBox="0 0 103 20"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
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

          {/* 후기 리스트 박스 */}
          <View style={styles.reviewListBox}>
            {/* 검색창 */}
            <View style={styles.searchBar}>
              <Svg width="23" height="24" viewBox="0 0 23 24" fill="none">
                <Path
                  d="M9.26465 1.50879C13.8649 1.50882 17.529 5.08997 17.5293 9.42871C17.5293 13.7677 13.8651 17.3496 9.26465 17.3496C4.66422 17.3496 1 13.7677 1 9.42871C1.00027 5.08996 4.66439 1.50879 9.26465 1.50879Z"
                  stroke="#AAAAAA"
                  strokeWidth="2"
                />
                <Rect
                  width="2.19329"
                  height="10.6041"
                  rx="1.09664"
                  transform="matrix(0.720361 -0.693599 0.720361 0.693599 13.6953 16.1636)"
                  fill="#AAAAAA"
                />
              </Svg>
              <Text style={styles.searchPlaceholder}>검색하기</Text>
            </View>

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
                <Svg width="7" height="13" viewBox="0 0 7 13" fill="none" style={styles.downArrow}>
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

            {/* 후기 카드 1 */}
            <View style={styles.reviewCard}>
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
              <Text style={styles.reviewContent}>
                편의점이랑 3분 거리여서 접근성이 괜찮히 좋아요. 급하게 구한 집이라 걱정을 많이
                했는데 생각보다 만족스러워요. 벌레는 가끔 나오지만 바퀴벌레는 아직 안나왔어요 ^^
              </Text>
            </View>

            {/* 후기 카드 2 */}
            <View style={styles.reviewCard}>
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
              <Text style={styles.reviewContent}>
                편의점이랑 3분 거리여서 접근성이 괜찮히 좋아요. 급하게 구한 집이라 걱정을 많이
                했는데 생각보다 만족스러워요. 벌레는 가끔 나오지만 바퀴벌레는 아직 안나왔어요 ^^
              </Text>
            </View>

            {/* 후기 카드 3 */}
            <View style={styles.reviewCard}>
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
              <Text style={styles.reviewContent}>
                편의점이랑 3분 거리여서 접근성이 괜찮히 좋아요. 급하게 구한 집이라 걱정을 많이
                했는데 생각보다 만족스러워요. 벌레는 가끔 나오지만 바퀴벌레는 아직 안나왔어요 ^^
              </Text>
            </View>

            {/* 후기 카드 4 */}
            <View style={styles.reviewCard}>
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
              <Text style={styles.reviewContent}>
                편의점이랑 3분 거리여서 접근성이 괜찮히 좋아요. 급하게 구한 집이라 걱정을 많이
                했는데 생각보다 만족스러워요. 벌레는 가끔 나오지만 바퀴벌레는 아직 안나왔어요 ^^
              </Text>
            </View>
          </View>

          {/* 추가 흰색 박스 */}
          <View style={styles.additionalWhiteBox}>
            <Text style={styles.placeholderText}>추가 콘텐츠 영역</Text>
          </View>
        </View>
      </ScrollView>

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
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },

  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  scrapButton: {
    width: 21,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    width: 4,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  whiteBox: {
    width,
    minHeight: height,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 125,
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 40,
    textAlign: 'center',
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 73,
  },
  rating: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 35,
    fontWeight: '700',
    lineHeight: 42,
    marginTop: 0,
    textAlign: 'center',
  },
  starsContainer: {
    width: 150,
    height: 28,
    alignSelf: 'center',
    marginTop: 12,
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
  reviewListBox: {
    width: 393.004,
    minHeight: 1552,
    backgroundColor: '#FFF',
    borderRadius: 40.5,
    marginTop: 30,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 26.5,
    marginLeft: -20,
    marginRight: -20,
  },
  searchBar: {
    width: 340,
    height: 58,
    backgroundColor: '#F9F9F9',
    borderRadius: 20.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },
  searchPlaceholder: {
    width: 185.97,
    height: 23.037,
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 30,
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
  reviewCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginTop: 20,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  placeholderText: {
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 50,
  },
  additionalWhiteBox: {
    width: 393.004,
    height: 1552,
    backgroundColor: '#FFF',
    borderRadius: 40.5,
    marginTop: 20,
    padding: 20,
    marginLeft: -20,
    marginRight: -20,
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
