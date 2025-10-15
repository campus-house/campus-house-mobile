import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';
import { COLORS } from '@/constants/colors';
import { BackIcon } from '@/components/Icon/BackIcon';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// 댓글 데이터 타입
type Comment = {
  id: number;
  author: string;
  profileImage: any;
  time: string;
  content: string;
  replies?: Comment[];
};

// 샘플 데이터
const sampleQuestions = [
  {
    id: 1,
    author: '말차초콜릿',
    profileImage: require('@/assets/images/ramjui.png'),
    time: '1분 전',
    date: '2025.09.01',
    title: '여기 수질 어때요?',
    content: '저번에 살던 집은 별로여서ㅜ 질문 남깁니다.',
    comments: 3,
    likes: 12,
    bookmarks: 0,
    commentList: [
      {
        id: 1,
        author: '찹쌀떡',
        profileImage: require('@/assets/images/ramjui.png'),
        time: '5분 전',
        content: '저 지금 가겠습니다.',
        replies: [
          {
            id: 2,
            author: '안단팥빵',
            profileImage: require('@/assets/images/squirrel4x.png'),
            time: '2분 전',
            content: '저도 같이 가도 괜찮을까요~~~~?',
            replies: [
              {
                id: 3,
                author: '빵미오',
                profileImage: require('@/assets/images/squirrel4x.png'),
                time: '1분 전',
                content: '넵넵 좋습니다 ㅎ.ㅎ 세 분 남았어요!',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    author: '우주맛밤',
    profileImage: require('@/assets/images/ramjui.png'),
    time: '1시간 전',
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
    time: '1시간 전',
    date: '2025.09.01',
    title: '주변에 맛집이 있나요??',
    content: '점심을 맨날 같은 곳만 가게 되어서,,, 추천해주세요!',
    comments: 4,
    likes: 0,
    bookmarks: 0,
  },
  {
    id: 4,
    author: '라쿤인데요',
    profileImage: require('@/assets/images/ramjui.png'),
    time: '2시간 전',
    date: '2025.09.01',
    title: '아이파크 방음 잘 되는지 궁금합니다!',
    content: '저시은 깨나 가ㅇ 고가 가기 디',
    comments: 4,
    likes: 0,
    bookmarks: 0,
  },
];

export default function QuestionsScreen() {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const handleCommentPress = (questionId: number) => {
    setSelectedQuestionId(questionId);
    setShowCommentInput(true);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      // 댓글 추가 로직
      setCommentText('');
      setShowCommentInput(false);
      setSelectedQuestionId(null);
    }
  };

  const renderQuestion = (question: (typeof sampleQuestions)[0]) => (
    <View key={question.id} style={styles.questionCard}>
      <View style={styles.questionHeader}>
        <View style={styles.authorInfo}>
          <View style={styles.profileImage}>
            <Image source={question.profileImage} style={styles.profileImageInner} />
          </View>
          <View style={styles.authorDetails}>
            <View style={styles.nameTimeRow}>
              <Text style={styles.authorName}>{question.author}</Text>
              <Text style={question.id === 1 ? styles.newQuestionTime : styles.questionTime}>
                {question.time}
              </Text>
            </View>
            <Text style={styles.questionDate}>{question.date}</Text>
          </View>
        </View>
      </View>

      <View style={styles.questionContent}>
        <View style={styles.contentLeft}>
          <Text style={styles.questionTitle}>{question.title}</Text>
          <Text style={styles.questionDescription}>{question.content}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.questionActions}>
        <View style={styles.actionItem}>
          <View style={styles.actionIcon}>
            <Svg width="22" height="18" viewBox="0 0 22 18">
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
          <Text style={styles.actionText}>{question.comments}</Text>
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
          <Text style={styles.actionText}>{question.likes}</Text>
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
          <Text style={styles.actionText}>{question.bookmarks}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 하단바 */}
      <View style={styles.bottomTabBar}>
        <View style={styles.tabItem}>
          <Svg width="31" height="26" viewBox="0 0 31 26" fill="none">
            <Path
              d="M24.9873 0C28.2062 0 30.8163 2.60931 30.8164 5.82812V14.7383C30.8164 17.9572 28.2062 20.5674 24.9873 20.5674H19.1855L16.4697 25.2715C16.1245 25.8688 15.2621 25.8689 14.917 25.2715L12.2012 20.5674H6.39844C3.17963 20.5672 0.570312 17.9571 0.570312 14.7383V5.82812C0.570464 2.60941 3.17972 0.000152403 6.39844 0H24.9873Z"
              fill="#FF805F"
            />
          </Svg>
          <Text style={styles.tabTextActive}>커뮤</Text>
        </View>
        <View style={styles.tabItem}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="#636363"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M2 17L12 22L22 17"
              stroke="#636363"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M2 12L12 17L22 12"
              stroke="#636363"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={styles.tabText}>지도</Text>
        </View>
        <View style={styles.tabItem}>
          <Svg width="19" height="16" viewBox="0 0 19 16" fill="none">
            <Path
              d="M1.94824 1.76562C3.78556 -0.130104 6.76425 -0.130118 8.60156 1.76562L9.50586 2.69922L10.4111 1.7666C12.2485 -0.129148 15.2281 -0.129148 17.0654 1.7666C18.9025 3.66233 18.9026 6.73615 17.0654 8.63184L16.1602 9.56445L16.1621 9.56641L10.8516 15.0469C10.5734 15.3338 10.2302 15.5133 9.87109 15.585C9.27164 15.7062 8.62656 15.527 8.16211 15.0479L2.85059 9.56738L2.85254 9.56445L1.94824 8.63086C0.110923 6.73511 0.110923 3.66137 1.94824 1.76562Z"
              stroke="#636363"
              strokeWidth="1.483"
              fill="none"
            />
          </Svg>
          <Text style={styles.tabText}>스크랩</Text>
        </View>
        <View style={styles.tabItem}>
          <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path
              d="M20 19V17C20 15.9391 19.5786 14.9217 18.8284 14.1716C18.0783 13.4214 17.0609 13 16 13H4C2.93913 13 1.92172 13.4214 1.17157 14.1716C0.421427 14.9217 0 15.9391 0 17V19"
              stroke="#636363"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle
              cx="10"
              cy="7"
              r="4"
              stroke="#636363"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={styles.tabText}>마이페이지</Text>
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>질문게시판</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 새로운 질문 답변하기 */}
        <Text style={styles.sectionTitle}>새로운 질문 답변하기</Text>

        {/* 첫 번째 질문 카드 */}
        {sampleQuestions.slice(0, 1).map(renderQuestion)}

        {/* 이전 질문 */}
        <Text style={styles.sectionTitlePrevious}>이전 질문</Text>

        {/* 나머지 질문 카드들 */}
        <View style={styles.previousQuestionsContainer}>
          {sampleQuestions.slice(1).map(renderQuestion)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 76,
    width: 393,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: -1.5,
      height: -4.5,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 5,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#636363',
    fontFamily: 'Pretendard',
    marginTop: 4,
  },
  tabTextActive: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FF805F',
    fontFamily: 'Pretendard',
    marginTop: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
  },
  backIcon: {
    // SVG 스타일
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitlePrevious: {
    fontSize: 20,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 30,
  },
  previousQuestionsContainer: {
    marginTop: 20,
    paddingBottom: 50,
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
  profileImageInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  questionTime: {
    fontSize: 12,
    color: '#AAA',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  newQuestionTime: {
    fontSize: 12,
    color: '#FF805F',
    fontFamily: 'Pretendard',
    lineHeight: 22,
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
  contentLeft: {
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
  divider: {
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
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  actionIcon: {
    marginRight: 4,
    position: 'relative',
  },
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
});
