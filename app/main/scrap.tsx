import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Line, Path, Circle } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

export default function ScrapScreen() {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [showAiRecommend, setShowAiRecommend] = React.useState(false);
  const [showAiResult, setShowAiResult] = React.useState(false);

  // AI 추천 분석 후 3초 뒤 결과 화면으로 전환
  React.useEffect(() => {
    if (showAiRecommend) {
      const timer = setTimeout(() => {
        setShowAiRecommend(false);
        setShowAiResult(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAiRecommend]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 상단 헤더 */}
      <View style={styles.header}>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.aiRecommendContainer}
            onPress={() => setShowAiRecommend(true)}
          >
            <Svg width="18" height="22" viewBox="0 0 18 22" fill="none" style={styles.starIcon}>
              <Line
                x1="12.2925"
                y1="15.6824"
                x2="16.5994"
                y2="20.7071"
                stroke="#636363"
                strokeWidth="1.83333"
                strokeLinecap="round"
              />
              <Path
                d="M14.6667 10.5417C14.6667 11.8544 14.2909 13.1396 13.5836 14.2455C12.8764 15.3514 11.8674 16.2318 10.6758 16.7825C9.48418 17.3331 8.15983 17.5312 6.85926 17.3531C5.55869 17.1751 4.33627 16.6285 3.33649 15.7778C2.33672 14.9271 1.60138 13.808 1.21738 12.5527C0.833393 11.2975 0.816804 9.95849 1.16958 8.69408C1.52235 7.42967 2.22974 6.29269 3.20814 5.41752C4.18653 4.54235 5.39503 3.96558 6.69079 3.75538"
                stroke="#636363"
                strokeWidth="1.83333"
              />
              <Path
                d="M12.0471 1.31171C12.403 0.717854 13.2636 0.717855 13.6196 1.31171L14.433 2.66873C14.5105 2.79801 14.6187 2.9062 14.7479 2.98369L16.105 3.79709C16.6988 4.15305 16.6988 5.01362 16.105 5.36958L14.7479 6.18298C14.6187 6.26047 14.5105 6.36865 14.433 6.49794L13.6196 7.85496C13.2636 8.44881 12.403 8.44881 12.0471 7.85496L11.2337 6.49794C11.1562 6.36865 11.048 6.26047 10.9187 6.18297L9.56171 5.36958C8.96785 5.01362 8.96785 4.15305 9.56171 3.79709L10.9187 2.98369C11.048 2.9062 11.1562 2.79801 11.2337 2.66873L12.0471 1.31171Z"
                fill="#636363"
              />
            </Svg>
            <Text style={styles.aiRecommendText}>Ai 추천</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsEditMode(true)}>
            <Text style={styles.editText}>편집</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 메인 콘텐츠 */}
      <View style={styles.content}>
        <Text style={styles.mainTitle}>찜해둔 집</Text>

        {/* 스크랩 리스트 */}
        <ScrollView style={styles.scrapList} showsVerticalScrollIndicator={false}>
          {/* 스크랩 카드 1 */}
          <TouchableOpacity style={styles.scrapCard}>
            <View style={styles.cardLeft}>
              {/* 북마크 아이콘 */}
              <Svg
                width="19"
                height="23"
                viewBox="0 0 19 23"
                fill="none"
                style={styles.bookmarkIcon}
              >
                <Path
                  d="M17 1H2.00106C1.44836 1 1.00048 1.44836 1.00106 2.00106L1.02079 20.5885C1.02152 21.2779 1.70326 21.7598 2.35343 21.5305L9.15668 19.1308C9.3714 19.0551 9.60553 19.0549 9.82037 19.1303L16.6689 21.533C17.3192 21.7612 18 21.2786 18 20.5894V2C18 1.44772 17.5523 1 17 1Z"
                  fill="#FF805F"
                  stroke="#FF805F"
                  strokeWidth="1.8"
                />
              </Svg>

              {/* 텍스트 정보 */}
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>아이파크</Text>
                <Text style={styles.cardAddress}>반달로 35번길 30</Text>
              </View>
            </View>

            {/* 오른쪽 화살표 */}
            <Svg width="9" height="17" viewBox="0 0 9 17" fill="none" style={styles.arrowIcon}>
              <Path
                d="M0.998047 15.1465L7.18244 8.41096L0.998049 1.67543"
                stroke="#AAAAAA"
                strokeWidth="1.81"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* 스크랩 카드 2 */}
          <TouchableOpacity style={styles.scrapCard}>
            <View style={styles.cardLeft}>
              <Svg
                width="19"
                height="23"
                viewBox="0 0 19 23"
                fill="none"
                style={styles.bookmarkIcon}
              >
                <Path
                  d="M17 1H2.00106C1.44836 1 1.00048 1.44836 1.00106 2.00106L1.02079 20.5885C1.02152 21.2779 1.70326 21.7598 2.35343 21.5305L9.15668 19.1308C9.3714 19.0551 9.60553 19.0549 9.82037 19.1303L16.6689 21.533C17.3192 21.7612 18 21.2786 18 20.5894V2C18 1.44772 17.5523 1 17 1Z"
                  fill="#FF805F"
                  stroke="#FF805F"
                  strokeWidth="1.8"
                />
              </Svg>

              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>마이온</Text>
                <Text style={styles.cardAddress}>청명로 8</Text>
              </View>
            </View>

            <Svg width="9" height="17" viewBox="0 0 9 17" fill="none" style={styles.arrowIcon}>
              <Path
                d="M0.998047 15.1465L7.18244 8.41096L0.998049 1.67543"
                stroke="#AAAAAA"
                strokeWidth="1.81"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* 스크랩 카드 3 */}
          <TouchableOpacity style={styles.scrapCard}>
            <View style={styles.cardLeft}>
              <Svg
                width="19"
                height="23"
                viewBox="0 0 19 23"
                fill="none"
                style={styles.bookmarkIcon}
              >
                <Path
                  d="M17 1H2.00106C1.44836 1 1.00048 1.44836 1.00106 2.00106L1.02079 20.5885C1.02152 21.2779 1.70326 21.7598 2.35343 21.5305L9.15668 19.1308C9.3714 19.0551 9.60553 19.0549 9.82037 19.1303L16.6689 21.533C17.3192 21.7612 18 21.2786 18 20.5894V2C18 1.44772 17.5523 1 17 1Z"
                  fill="#FF805F"
                  stroke="#FF805F"
                  strokeWidth="1.8"
                />
              </Svg>

              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>마크라위</Text>
                <Text style={styles.cardAddress}>청명로 10</Text>
              </View>
            </View>

            <Svg width="9" height="17" viewBox="0 0 9 17" fill="none" style={styles.arrowIcon}>
              <Path
                d="M0.998047 15.1465L7.18244 8.41096L0.998049 1.67543"
                stroke="#AAAAAA"
                strokeWidth="1.81"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* 스크랩 카드 4 */}
          <TouchableOpacity style={styles.scrapCard}>
            <View style={styles.cardLeft}>
              <Svg
                width="19"
                height="23"
                viewBox="0 0 19 23"
                fill="none"
                style={styles.bookmarkIcon}
              >
                <Path
                  d="M17 1H2.00106C1.44836 1 1.00048 1.44836 1.00106 2.00106L1.02079 20.5885C1.02152 21.2779 1.70326 21.7598 2.35343 21.5305L9.15668 19.1308C9.3714 19.0551 9.60553 19.0549 9.82037 19.1303L16.6689 21.533C17.3192 21.7612 18 21.2786 18 20.5894V2C18 1.44772 17.5523 1 17 1Z"
                  fill="#FF805F"
                  stroke="#FF805F"
                  strokeWidth="1.8"
                />
              </Svg>

              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>아이시티</Text>
                <Text style={styles.cardAddress}>덕영대로 1703</Text>
              </View>
            </View>

            <Svg width="9" height="17" viewBox="0 0 9 17" fill="none" style={styles.arrowIcon}>
              <Path
                d="M0.998047 15.1465L7.18244 8.41096L0.998049 1.67543"
                stroke="#AAAAAA"
                strokeWidth="1.81"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* 편집 모달 */}
      <Modal
        visible={isEditMode}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsEditMode(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModal}>
            {/* 상단 버튼 */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsEditMode(false)}>
                <Text style={styles.modalButton}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsEditMode(false)}>
                <Text style={styles.modalButton}>완료</Text>
              </TouchableOpacity>
            </View>

            {/* 스크랩 리스트 */}
            <ScrollView style={styles.modalScrapList} showsVerticalScrollIndicator={false}>
              {/* 편집 모드 카드 1 */}
              <View style={styles.editCard}>
                <View style={styles.cardLeft}>
                  <Svg
                    width="19"
                    height="23"
                    viewBox="0 0 19 23"
                    fill="none"
                    style={styles.bookmarkIcon}
                  >
                    <Path
                      d="M17 1H2.00106C1.44836 1 1.00048 1.44836 1.00106 2.00106L1.02079 20.5885C1.02152 21.2779 1.70326 21.7598 2.35343 21.5305L9.15668 19.1308C9.3714 19.0551 9.60553 19.0549 9.82037 19.1303L16.6689 21.533C17.3192 21.7612 18 21.2786 18 20.5894V2C18 1.44772 17.5523 1 17 1Z"
                      fill="#FF805F"
                      stroke="#FF805F"
                      strokeWidth="1.8"
                    />
                  </Svg>

                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>아이파크</Text>
                    <Text style={styles.cardAddress}>반달로 35번길 30</Text>
                  </View>
                </View>

                {/* 3줄 아이콘 */}
                <View style={styles.menuIcon}>
                  <View style={styles.menuLine} />
                  <View style={styles.menuLine} />
                  <View style={styles.menuLine} />
                </View>
              </View>

              {/* 편집 모드 카드 2 */}
              <View style={styles.editCard}>
                <View style={styles.cardLeft}>
                  <Svg
                    width="19"
                    height="23"
                    viewBox="0 0 19 23"
                    fill="none"
                    style={styles.bookmarkIcon}
                  >
                    <Path
                      d="M17 1H2.00106C1.44836 1 1.00048 1.44836 1.00106 2.00106L1.02079 20.5885C1.02152 21.2779 1.70326 21.7598 2.35343 21.5305L9.15668 19.1308C9.3714 19.0551 9.60553 19.0549 9.82037 19.1303L16.6689 21.533C17.3192 21.7612 18 21.2786 18 20.5894V2C18 1.44772 17.5523 1 17 1Z"
                      fill="#FF805F"
                      stroke="#FF805F"
                      strokeWidth="1.8"
                    />
                  </Svg>

                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>마이온</Text>
                    <Text style={styles.cardAddress}>청명로 8</Text>
                  </View>
                </View>

                <View style={styles.menuIcon}>
                  <View style={styles.menuLine} />
                  <View style={styles.menuLine} />
                  <View style={styles.menuLine} />
                </View>
              </View>

              {/* 편집 모드 카드 3 */}
              <View style={styles.editCard}>
                <View style={styles.cardLeft}>
                  <Svg
                    width="19"
                    height="23"
                    viewBox="0 0 19 23"
                    fill="none"
                    style={styles.bookmarkIcon}
                  >
                    <Path
                      d="M17 1H2.00106C1.44836 1 1.00048 1.44836 1.00106 2.00106L1.02079 20.5885C1.02152 21.2779 1.70326 21.7598 2.35343 21.5305L9.15668 19.1308C9.3714 19.0551 9.60553 19.0549 9.82037 19.1303L16.6689 21.533C17.3192 21.7612 18 21.2786 18 20.5894V2C18 1.44772 17.5523 1 17 1Z"
                      fill="#FF805F"
                      stroke="#FF805F"
                      strokeWidth="1.8"
                    />
                  </Svg>

                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>마크라위</Text>
                    <Text style={styles.cardAddress}>청명로 10</Text>
                  </View>
                </View>

                <View style={styles.menuIcon}>
                  <View style={styles.menuLine} />
                  <View style={styles.menuLine} />
                  <View style={styles.menuLine} />
                </View>
              </View>

              {/* 편집 모드 카드 4 */}
              <View style={styles.editCard}>
                <View style={styles.cardLeft}>
                  <Svg
                    width="19"
                    height="23"
                    viewBox="0 0 19 23"
                    fill="none"
                    style={styles.bookmarkIcon}
                  >
                    <Path
                      d="M17 1H2.00106C1.44836 1 1.00048 1.44836 1.00106 2.00106L1.02079 20.5885C1.02152 21.2779 1.70326 21.7598 2.35343 21.5305L9.15668 19.1308C9.3714 19.0551 9.60553 19.0549 9.82037 19.1303L16.6689 21.533C17.3192 21.7612 18 21.2786 18 20.5894V2C18 1.44772 17.5523 1 17 1Z"
                      fill="#FF805F"
                      stroke="#FF805F"
                      strokeWidth="1.8"
                    />
                  </Svg>

                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>아이시티</Text>
                    <Text style={styles.cardAddress}>덕영대로 1703</Text>
                  </View>
                </View>

                <View style={styles.menuIcon}>
                  <View style={styles.menuLine} />
                  <View style={styles.menuLine} />
                  <View style={styles.menuLine} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* AI 추천 모달 */}
      <Modal
        visible={showAiRecommend}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setShowAiRecommend(false)}
      >
        <View style={styles.aiRecommendModal}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

          {/* 분석중 텍스트 */}
          <View style={styles.aiAnalyzingContainer}>
            <Text style={styles.aiAnalyzingText}>분석 중</Text>
            <Svg width="20" height="4" viewBox="0 0 20 4" fill="none" style={styles.aiDotsIcon}>
              <Circle cx="2.07258" cy="1.57258" r="1.57258" fill="#FF805F" />
              <Circle cx="10.2503" cy="1.57258" r="1.57258" fill="#FF805F" />
              <Circle cx="18.428" cy="1.57258" r="1.57258" fill="#FF805F" />
            </Svg>
          </View>

          {/* 메인 텍스트 */}
          <Text style={styles.aiMainText}>미우님이 좋아하실만한{'\n'}집을 추천해드릴게요!</Text>

          {/* 고슴도치 이미지 */}
          <Image
            source={require('@/assets/images/hedgehog.png')}
            style={styles.aiHedgehogImage}
            resizeMode="contain"
          />
        </View>
      </Modal>

      {/* AI 추천 결과 모달 */}
      <Modal
        visible={showAiResult}
        transparent={false}
        animationType="fade"
        onRequestClose={() => {
          setShowAiResult(false);
        }}
      >
        <SafeAreaView style={styles.aiResultModal} edges={['top']}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

          {/* 헤더 */}
          <View style={styles.aiResultHeader}>
            <TouchableOpacity style={styles.backButton} onPress={() => setShowAiResult(false)}>
              <Svg width="13" height="22" viewBox="0 0 13 22" fill="none">
                <Path
                  d="M11.8438 1.54883L2.21993 10.8762C2.01507 11.0748 2.01759 11.4042 2.22548 11.5996L11.8438 20.6397"
                  stroke="#AAAAAA"
                  strokeWidth="2.27273"
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>

            <Text style={styles.aiResultHeaderTitle}>Ai 추천</Text>

            <TouchableOpacity style={styles.closeButton} onPress={() => setShowAiResult(false)}>
              <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <Path
                  d="M1 16.2275L16.2275 1"
                  stroke="#636363"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <Path
                  d="M16.2275 16.2275L0.999999 1"
                  stroke="#636363"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* 메인 제목 */}
            <Text style={styles.aiResultTitle}>미우님만의 집 추천</Text>

            {/* 공부핑 이미지 */}
            <Image
              source={require('@/assets/images/study_ping.png')}
              style={styles.studyPingImage}
              resizeMode="contain"
            />

            {/* 추천 카드 영역 */}
            <View style={styles.recommendContainer}>
              <View style={styles.recommendGrid}>
                {/* 카드 1 - 아이파크 */}
                <View style={styles.recommendCard}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.recommendCardTitle}>아이파크</Text>
                    <Svg width="19" height="22" viewBox="0 0 19 22" fill="none">
                      <Path
                        d="M17.1464 1H1.85458C1.38276 1 1.00043 1.38277 1.00095 1.85458L1.02097 19.8141C1.02162 20.3972 1.59369 20.8081 2.14643 20.6224L9.21733 18.2471C9.39326 18.188 9.58365 18.1878 9.75968 18.2466L16.8758 20.6244C17.4287 20.8091 18 20.3977 18 19.8148V1.85363C18 1.38218 17.6178 1 17.1464 1Z"
                        stroke="#FF805F"
                        strokeWidth="1.53654"
                      />
                    </Svg>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <Path
                        d="M7.93635 1.68256C8.2271 0.743624 9.55611 0.743621 9.84685 1.68256L11.1189 5.7904C11.2485 6.20913 11.6358 6.4946 12.0741 6.4946L16.289 6.4946C17.246 6.4946 17.6564 7.70964 16.8953 8.28986L13.4039 10.9516C13.0701 11.206 12.9307 11.6417 13.0549 12.0426L14.3687 16.2856C14.6567 17.2155 13.5813 17.9668 12.8072 17.3767L9.49787 14.8538C9.13979 14.5808 8.64341 14.5808 8.28533 14.8538L4.97599 17.3767C4.20188 17.9668 3.12654 17.2155 3.41447 16.2856L4.72832 12.0426C4.85245 11.6417 4.71308 11.206 4.37934 10.9516L0.887932 8.28986C0.126844 7.70963 0.537172 6.4946 1.49421 6.4946L5.70909 6.4946C6.14744 6.4946 6.53468 6.20913 6.66434 5.7904L7.93635 1.68256Z"
                        fill="#FFD429"
                      />
                    </Svg>
                    <Text style={styles.ratingText}>4.3</Text>
                  </View>
                  <Text style={styles.tagText}>#친절한 집주인 #가성비</Text>
                </View>

                {/* 카드 2 - 마이온 */}
                <View style={styles.recommendCard}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.recommendCardTitle}>마이온</Text>
                    <Svg width="19" height="22" viewBox="0 0 19 22" fill="none">
                      <Path
                        d="M17.1464 1H1.85458C1.38276 1 1.00043 1.38277 1.00095 1.85458L1.02097 19.8141C1.02162 20.3972 1.59369 20.8081 2.14643 20.6224L9.21733 18.2471C9.39326 18.188 9.58365 18.1878 9.75968 18.2466L16.8758 20.6244C17.4287 20.8091 18 20.3977 18 19.8148V1.85363C18 1.38218 17.6178 1 17.1464 1Z"
                        stroke="#FF805F"
                        strokeWidth="1.53654"
                      />
                    </Svg>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <Path
                        d="M7.93635 1.68256C8.2271 0.743624 9.55611 0.743621 9.84685 1.68256L11.1189 5.7904C11.2485 6.20913 11.6358 6.4946 12.0741 6.4946L16.289 6.4946C17.246 6.4946 17.6564 7.70964 16.8953 8.28986L13.4039 10.9516C13.0701 11.206 12.9307 11.6417 13.0549 12.0426L14.3687 16.2856C14.6567 17.2155 13.5813 17.9668 12.8072 17.3767L9.49787 14.8538C9.13979 14.5808 8.64341 14.5808 8.28533 14.8538L4.97599 17.3767C4.20188 17.9668 3.12654 17.2155 3.41447 16.2856L4.72832 12.0426C4.85245 11.6417 4.71308 11.206 4.37934 10.9516L0.887932 8.28986C0.126844 7.70963 0.537172 6.4946 1.49421 6.4946L5.70909 6.4946C6.14744 6.4946 6.53468 6.20913 6.66434 5.7904L7.93635 1.68256Z"
                        fill="#FFD429"
                      />
                    </Svg>
                    <Text style={styles.ratingText}>4.0</Text>
                  </View>
                  <Text style={styles.tagText}>#와고 또도 5분 이내</Text>
                </View>

                {/* 카드 3 - 마크라위 */}
                <View style={styles.recommendCard}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.recommendCardTitle}>마크라위</Text>
                    <Svg width="19" height="22" viewBox="0 0 19 22" fill="none">
                      <Path
                        d="M17.1464 1H1.85458C1.38276 1 1.00043 1.38277 1.00095 1.85458L1.02097 19.8141C1.02162 20.3972 1.59369 20.8081 2.14643 20.6224L9.21733 18.2471C9.39326 18.188 9.58365 18.1878 9.75968 18.2466L16.8758 20.6244C17.4287 20.8091 18 20.3977 18 19.8148V1.85363C18 1.38218 17.6178 1 17.1464 1Z"
                        stroke="#FF805F"
                        strokeWidth="1.53654"
                      />
                    </Svg>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <Path
                        d="M7.93635 1.68256C8.2271 0.743624 9.55611 0.743621 9.84685 1.68256L11.1189 5.7904C11.2485 6.20913 11.6358 6.4946 12.0741 6.4946L16.289 6.4946C17.246 6.4946 17.6564 7.70964 16.8953 8.28986L13.4039 10.9516C13.0701 11.206 12.9307 11.6417 13.0549 12.0426L14.3687 16.2856C14.6567 17.2155 13.5813 17.9668 12.8072 17.3767L9.49787 14.8538C9.13979 14.5808 8.64341 14.5808 8.28533 14.8538L4.97599 17.3767C4.20188 17.9668 3.12654 17.2155 3.41447 16.2856L4.72832 12.0426C4.85245 11.6417 4.71308 11.206 4.37934 10.9516L0.887932 8.28986C0.126844 7.70963 0.537172 6.4946 1.49421 6.4946L5.70909 6.4946C6.14744 6.4946 6.53468 6.20913 6.66434 5.7904L7.93635 1.68256Z"
                        fill="#FFD429"
                      />
                    </Svg>
                    <Text style={styles.ratingText}>4.8</Text>
                  </View>
                  <Text style={styles.tagText}>#주차장 O #소음 X</Text>
                </View>

                {/* 카드 4 - 아이시티 */}
                <View style={styles.recommendCard}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.recommendCardTitle}>아이시티</Text>
                    <Svg width="19" height="22" viewBox="0 0 19 22" fill="none">
                      <Path
                        d="M17.1464 1H1.85458C1.38276 1 1.00043 1.38277 1.00095 1.85458L1.02097 19.8141C1.02162 20.3972 1.59369 20.8081 2.14643 20.6224L9.21733 18.2471C9.39326 18.188 9.58365 18.1878 9.75968 18.2466L16.8758 20.6244C17.4287 20.8091 18 20.3977 18 19.8148V1.85363C18 1.38218 17.6178 1 17.1464 1Z"
                        stroke="#FF805F"
                        strokeWidth="1.53654"
                      />
                    </Svg>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <Path
                        d="M7.93635 1.68256C8.2271 0.743624 9.55611 0.743621 9.84685 1.68256L11.1189 5.7904C11.2485 6.20913 11.6358 6.4946 12.0741 6.4946L16.289 6.4946C17.246 6.4946 17.6564 7.70964 16.8953 8.28986L13.4039 10.9516C13.0701 11.206 12.9307 11.6417 13.0549 12.0426L14.3687 16.2856C14.6567 17.2155 13.5813 17.9668 12.8072 17.3767L9.49787 14.8538C9.13979 14.5808 8.64341 14.5808 8.28533 14.8538L4.97599 17.3767C4.20188 17.9668 3.12654 17.2155 3.41447 16.2856L4.72832 12.0426C4.85245 11.6417 4.71308 11.206 4.37934 10.9516L0.887932 8.28986C0.126844 7.70963 0.537172 6.4946 1.49421 6.4946L5.70909 6.4946C6.14744 6.4946 6.53468 6.20913 6.66434 5.7904L7.93635 1.68256Z"
                        fill="#FFD429"
                      />
                    </Svg>
                    <Text style={styles.ratingText}>4.5</Text>
                  </View>
                  <Text style={styles.tagText}>#편의페이티 O #가성비</Text>
                </View>
              </View>

              {/* 하단 버튼 */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.resetButton}>
                  <Text style={styles.resetButtonText}>다시</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>모두 저장하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiRecommendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  aiRecommendText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#636363',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginLeft: 6,
  },
  starIcon: {
    width: 17.417,
    height: 22,
  },
  editText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#636363',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  mainTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 35,
    marginBottom: 40,
  },
  scrapList: {
    flex: 1,
  },
  scrapCard: {
    width: 353,
    height: 95,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkIcon: {
    width: 17,
    height: 21,
    marginRight: 15,
  },
  cardInfo: {
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginBottom: 4,
  },
  cardAddress: {
    fontSize: 15,
    fontWeight: '500',
    color: '#AAAAAA',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  arrowIcon: {
    width: 6.184,
    height: 13.471,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  editModal: {
    width: '100%',
    height: 785,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#F9F9F9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  modalButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#636363',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  modalScrapList: {
    flex: 1,
    paddingTop: 20,
  },
  editCard: {
    width: '100%',
    height: 95,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIcon: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 14,
  },
  menuLine: {
    width: 22,
    height: 2,
    backgroundColor: '#AAA',
    marginVertical: 2,
  },
  aiRecommendModal: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 220,
  },
  aiAnalyzingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  aiAnalyzingText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#FF805F',
    fontFamily: 'Pretendard',
    lineHeight: 24,
    marginRight: 8,
  },
  aiDotsIcon: {
    width: 19.501,
    height: 3.145,
  },
  aiMainText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 31,
    textAlign: 'center',
    marginBottom: 40,
  },
  aiHedgehogImage: {
    width: '100%',
    height: 300,
    aspectRatio: 237 / 119,
    position: 'absolute',
    bottom: 0,
  },
  aiResultModal: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  aiResultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    minHeight: 50,
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  aiResultHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 24,
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 19.874,
  },
  aiResultTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 35,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 15,
    paddingTop: 5,
  },
  studyPingImage: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  recommendContainer: {
    width: '100%',
    flex: 1,
    borderRadius: 29.5,
    backgroundColor: '#FFF0EC',
    padding: 20,
    marginTop: -20,
    paddingBottom: 40,
  },
  recommendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recommendCard: {
    width: 169,
    height: 145,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    padding: 15,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  recommendCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 17.851,
    fontWeight: '500',
    color: '#636363',
    fontFamily: 'Pretendard',
    lineHeight: 28.052,
    marginLeft: 5,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#636363',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  resetButton: {
    width: 100,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#FF805F',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF805F',
    fontFamily: 'Pretendard',
  },
  saveButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF805F',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Pretendard',
  },
});
