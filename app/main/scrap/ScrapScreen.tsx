import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Line } from 'react-native-svg';
import { COLORS } from '@/constants/colors';
import EditScrapModal from '@/components/scrap/EditScrapModal';
import AiAnalyzingModal from '@/components/scrap/AiAnalyzingModal';
import AiResultModal from '@/components/scrap/AiResultModal';
import EmptyScrapScreen from '@/components/EmptyScrapScreen';
import { getScrapList } from '@/api/scrap';

export default function ScrapScreen() {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [showAiRecommend, setShowAiRecommend] = React.useState(false);
  const [showAiResult, setShowAiResult] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // 스크랩 아이템 데이터 (state로 관리)
  const [scrapItems, setScrapItems] = React.useState([]);

  // 순서 변경 핸들러
  const handleReorder = (newItems: typeof scrapItems) => {
    setScrapItems(newItems);
  };

  // 모달 닫기 핸들러
  const handleCloseEditModal = () => {
    setIsEditMode(false);
  };

  // 스크랩 목록 API 호출
  const loadScrapList = async () => {
    try {
      console.log('스크랩 목록 로드 시작');
      setIsLoading(true);
      const response = await getScrapList();
      console.log('스크랩 목록 로드 성공:', response);
      // API 응답에서 content 배열 추출
      setScrapItems(response.content || []);
    } catch (error) {
      console.error('스크랩 목록 로드 실패:', error);
      setScrapItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 스크랩 목록 로드
  React.useEffect(() => {
    loadScrapList();
  }, []);

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


      {/* 메인 콘텐츠 */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>스크랩 목록을 불러오는 중...</Text>
        </View>
      ) : scrapItems.length === 0 ? (
        <EmptyScrapScreen />
      ) : (
        <>
          {/* 상단 헤더 - 스크랩 목록이 있을 때만 표시 */}
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

      <View style={styles.content}>
            <Text style={styles.mainTitle}>찜 해둔 집</Text>

        {/* 스크랩 리스트 */}
        <ScrollView style={styles.scrapList} showsVerticalScrollIndicator={false}>
              {scrapItems.map((item) => (
                <TouchableOpacity key={item.id} style={styles.scrapCard}>
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
                      <Text style={styles.cardTitle}>{item.buildingName}</Text>
                      <Text style={styles.cardAddress}>{item.buildingAddress}</Text>
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
              ))}
        </ScrollView>
      </View>
        </>
      )}

      {/* 편집 모달 */}
      <EditScrapModal
        visible={isEditMode}
        onClose={handleCloseEditModal}
        scrapItems={scrapItems}
        onReorder={handleReorder}
      />

      {/* AI 추천 분석 중 모달 */}
      <AiAnalyzingModal
        visible={showAiRecommend}
        onClose={() => setShowAiRecommend(false)}
      />

      {/* AI 추천 결과 모달 */}
      <AiResultModal
        visible={showAiResult}
        onClose={() => setShowAiResult(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 32,
    paddingBottom: 13,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiRecommendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 22,
  },
  aiRecommendText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#636363',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginLeft: 8,
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
    marginRight: 20,
  },
  content: {
    flex: 1,
    paddingTop: 42,
  },
  mainTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 35,
    marginBottom: 27,
    paddingHorizontal: 34,
    marginTop: -2,
  },
  scrapList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrapCard: {
    width: 353,
    height: 97,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 25,
    marginBottom: 20,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkIcon: {
    width: 17,
    height: 21,
    marginRight: 29,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#636363',
    fontFamily: 'Pretendard',
  },
});
