import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Svg, { Path, Circle, Rect, Mask } from 'react-native-svg';
import { COLORS } from '@/constants/colors';
import { router } from 'expo-router';
import { PropertyMarker as PropertyMarkerType } from '@/src/types/property';
import { Portal } from 'react-native-portalize';
import { addScrap, deleteScrap } from '@/api/scrap';

const { width, height } = Dimensions.get('window');

type TabType = '실거주자 후기' | '기본 정보' | '질문하기' | '양도';

interface BuildingDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  property?: PropertyMarkerType | null;
  onHeightChange?: (heightRatio: number) => void;
  initialScrapStatus?: boolean;
}

export default function BuildingDetailModal({ isVisible, onClose, property, onHeightChange, initialScrapStatus }: BuildingDetailModalProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>('실거주자 후기');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScraped, setIsScraped] = useState(false);
  const [scrapId, setScrapId] = useState<number | null>(null);
  const modalHeightAnim = useRef(new Animated.Value(height * 0.46)).current;
  
  // 모달 높이 상수
  const COLLAPSED_HEIGHT = height * 0.46;
  const EXPANDED_HEIGHT = height;

  useEffect(() => {
    if (isVisible) {
      // 상태 초기화
      setIsExpanded(false);
      setSelectedTab('실거주자 후기');
      // 스크랩 상태 확인
      checkBuildingScrapStatus();
      // 아래에서 슬라이드 업 애니메이션
      modalHeightAnim.setValue(0);
      Animated.timing(modalHeightAnim, {
        toValue: COLLAPSED_HEIGHT,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      // 모달이 닫힐 때는 즉시 0으로
      modalHeightAnim.setValue(0);
    }
  }, [isVisible, property?.buildingId]);

  // 모달 높이 변경 리스너
  useEffect(() => {
    if (!isVisible) return;
    
    const listenerId = modalHeightAnim.addListener(({ value }) => {
      // 46% ~ 100% 사이의 비율 계산 (0 ~ 1)
      const ratio = (value - COLLAPSED_HEIGHT) / (EXPANDED_HEIGHT - COLLAPSED_HEIGHT);
      const clampedRatio = Math.max(0, Math.min(1, ratio));
      onHeightChange?.(clampedRatio);
    });

    return () => {
      modalHeightAnim.removeListener(listenerId);
    };
  }, [isVisible, onHeightChange]);

  // PanResponder 설정 - 드래그로 모달 높이 조절
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (evt, gestureState) => {
        // 드래그 중 - 높이 동적 조절
        if (gestureState.dy < 0) {
          // 위로 드래그하면 높이 증가
          const dragRatio = Math.abs(gestureState.dy) / (height * 0.54);
          const newHeight = COLLAPSED_HEIGHT + (EXPANDED_HEIGHT - COLLAPSED_HEIGHT) * Math.min(dragRatio, 1);
          modalHeightAnim.setValue(newHeight);
        } else {
          // 아래로 드래그하면 높이 감소
          modalHeightAnim.setValue(COLLAPSED_HEIGHT);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const dragDistance = gestureState.dy;
        
        if (dragDistance < -height * 0.27) {
          // 27% 이상 위로 드래그: 100%로 스냅
          setIsExpanded(true);
          // 부드러운 애니메이션으로 100%로 이동
          Animated.timing(modalHeightAnim, {
            toValue: EXPANDED_HEIGHT,
            duration: 300,
            useNativeDriver: false,
          }).start();
        } else if (dragDistance > height * 0.23) {
          // 23% 이상 아래로 드래그: 닫기
          handleClose();
        } else {
          // 그 외: 46%로 스냅
          setIsExpanded(false);
          // 부드러운 애니메이션으로 46%로 이동
          Animated.timing(modalHeightAnim, {
            toValue: COLLAPSED_HEIGHT,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const handleClose = () => {
    setIsExpanded(false);
    onClose();
  };

  // 건물 스크랩 상태 확인
  const checkBuildingScrapStatus = async () => {
    if (!property?.buildingId) return;
    
    try {
      console.log('스크랩 상태 확인 중...', property.buildingId);
      
      // 스크랩에서 전달된 상태가 있으면 사용
      if (initialScrapStatus !== undefined) {
        console.log('스크랩에서 전달된 상태 사용:', initialScrapStatus);
        setIsScraped(initialScrapStatus);
        setScrapId(initialScrapStatus ? property.buildingId : null);
        return;
      }
      
      // TODO: 스크랩 상태 확인 API 구현 필요
      // 현재는 기본값으로 설정
      setIsScraped(false);
      setScrapId(null);
      console.log('스크랩 상태: 기본값 (스크랩 안됨)');
    } catch (error) {
      console.error('스크랩 상태 확인 실패:', error);
      setIsScraped(false);
      setScrapId(null);
    }
  };

  const handleScrapPress = async () => {
    if (!property?.buildingId) {
      Alert.alert('오류', '건물 정보를 찾을 수 없습니다.');
      return;
    }

    try {
      if (isScraped) {
        // 이미 스크랩된 경우 - 스크랩 삭제
        await deleteScrap(property.buildingId);
        setIsScraped(false);
        setScrapId(null);
      } else {
        // 스크랩되지 않은 경우 - 스크랩 추가
        const response = await addScrap(property.buildingId);
        setIsScraped(true);
        setScrapId(response.id);
      }
    } catch (error: any) {
      console.error('스크랩 처리 실패:', error);
      if (error.message?.includes('이미 스크랩한 건물')) {
        Alert.alert('알림', '이미 스크랩한 건물입니다.');
        setIsScraped(true);
      } else if (error.message?.includes('403')) {
        Alert.alert('권한 오류', '스크랩 삭제 권한이 없습니다. 다시 로그인해주세요.');
      } else if (error.message?.includes('404')) {
        Alert.alert('알림', '스크랩을 찾을 수 없습니다.');
        setIsScraped(false);
        setScrapId(null);
      } else {
        Alert.alert('오류', `스크랩 처리에 실패했습니다: ${error.message}`);
      }
    }
  };


  // 복붙된 데이터 (transferData, questionData 등) — 필요하면 props로 넘기셔도 됨
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

  // 각 카드 렌더링 함수 (ResidentReview에서 가져온 것과 동일)
  const renderTransferCard = (transfer: typeof transferData[0]) => (
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
        </View>ㄱ
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

  const renderQuestionCard = (question: typeof questionData[0]) => (
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

  if (!isVisible) return null;

  return (
    <Portal>
      <View style={styles.modalOverlay} pointerEvents="box-none">
      {/* 배경 영역 - 46% 상태에서만 터치 시 닫힘 */}
      {!isExpanded && (
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>
      )}
      
      <Animated.View 
        style={[
          styles.modalContainer, 
          { 
            height: modalHeightAnim,
          }
        ]}
      >
        {/* 드래그 핸들 - 항상 표시 */}
        <View style={styles.dragHandle} {...panResponder.panHandlers}>
          <View style={styles.dragIndicator} />
        </View>

        {/* 헤더 - 확장된 상태에서만 표시 */}
        {isExpanded && (
          <View style={styles.topNavBar}>
            <TouchableOpacity style={styles.backButton} onPress={handleClose}>
              <Svg width="13" height="23" viewBox="0 0 13 23" fill="none">
                <Path
                  d="M11.1836 2L1.55977 11.3274C1.35491 11.5259 1.35744 11.8554 1.56532 12.0508L11.1836 21.0909"
                  stroke="#AAAAAA"
                  strokeWidth="2.27273"
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
            <View style={styles.rightIcons}>
              <TouchableOpacity style={styles.scrapButton} onPress={handleScrapPress}>
                <Svg width="21" height="26" viewBox="0 0 21 26" fill="none">
                  <Path
                    d="M17.1457 1.59521H3.8019C2.53097 1.59521 1.50104 2.62619 1.50232 3.89711L1.52131 22.7093C1.52238 23.7767 2.5868 24.5164 3.58759 24.1451L10.099 21.7294C10.3322 21.6429 10.5887 21.6427 10.8221 21.7288L17.3815 24.1493C18.3825 24.5186 19.4453 23.778 19.4453 22.711V3.89479C19.4453 2.62477 18.4158 1.59521 17.1457 1.59521Z"
                    stroke={isScraped ? "#FF805F" : "#AAAAAA"}
                    strokeWidth="2.41446"
                    fill={isScraped ? "#FF805F" : "none"}
                  />
                </Svg>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton}>
                <Svg width="4" height="16" viewBox="0 0 4 16" fill="none">
                  <Circle cx="1.68359" cy="1.5" r="1.5" fill="#323232" />
                  <Circle cx="1.68359" cy="7.96924" r="1.5" fill="#323232" />
                  <Circle cx="1.68359" cy="14.4385" r="1.5" fill="#323232" />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <ScrollView 
          style={[styles.scrollView, { marginTop: isExpanded ? 113 : 0 }]} 
          showsVerticalScrollIndicator={false}
          scrollEnabled={isExpanded}
        >
          {/* 지도 공간 제외하고 흰 배경 박스 부분 */}
          <View style={styles.whiteBox}>
            {/* 여기에 기존 ResidentReview에서 흰 카드 내부 전체 JSX를 거의 그대로 넣으면 됩니다 */}
            
            {/* 건물 이름, 평점, 별점 등 */}
            <Text style={styles.buildingName}>{property?.buildingName || '아이파크'}</Text>
            <Text style={styles.rating}>{property?.averageRating ? (property as any).averageRating.toFixed(1) : '0.0'}</Text>
            <View style={styles.starsContainer}>
              {/* 동적 별점 표시 */}
              {[1, 2, 3, 4, 5].map((star) => {
                const rating = (property as any)?.averageRating || 0;
                const isFilled = star <= rating;
                const isHalfFilled = star - 0.5 <= rating && rating < star;
                
                return (
                  <Svg key={star} width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: 1 }}>
                    <Path
                      d="M7.5551 2.7345C7.78307 2.03287 8.7757 2.03286 9.00367 2.7345L9.96724 5.70006C10.0692 6.01384 10.3616 6.22629 10.6915 6.22629H13.8097C14.5474 6.22629 14.8542 7.17033 14.2573 7.60396L11.7347 9.43678C11.4678 9.63071 11.3561 9.97445 11.458 10.2882L12.4216 13.2538C12.6496 13.9554 11.8465 14.5389 11.2497 14.1052L8.72702 12.2724C8.4601 12.0785 8.09867 12.0785 7.83175 12.2724L5.30909 14.1052C4.71225 14.5389 3.9092 13.9554 4.13717 13.2538L5.10074 10.2882C5.2027 9.97445 5.09101 9.63071 4.82409 9.43678L2.30143 7.60396C1.70459 7.17033 2.01132 6.22629 2.74906 6.22629H5.86724C6.19717 6.22629 6.48958 6.01384 6.59153 5.70006L7.5551 2.7345Z"
                      fill={isFilled ? "#FEB71F" : "#E5E5E5"}
                    />
                  </Svg>
                );
              })}
            </View>
            <Text style={styles.reviewCount}>{(property as any)?.totalReviews || 0}개의 후기</Text>

            {/* 평가 항목들 */}
            <View style={styles.ratingsSection}>
              {/* 소음, 편의시설, 주차장, 벌레 항목 복붙 */}
              <View style={styles.ratingItem}>
                <Text style={styles.ratingLabel}>소음</Text>
                <Text style={styles.ratingText}>{(property as any)?.totalReviews > 0 ? '조용해요' : '후기 없음'}</Text>
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
                      width={(property as any)?.totalReviews > 0 ? 163.085 : 0}
                      height="7.96677"
                      rx="3.98339"
                      fill="#FFD429"
                    />
                  </Svg>
                </View>
              </View>
              <View style={styles.ratingItem}>
                <Text style={styles.ratingLabel}>편의시설</Text>
                <Text style={styles.ratingText}>{(property as any)?.totalReviews > 0 ? '접근성 좋아요' : '후기 없음'}</Text>
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
                      width={(property as any)?.totalReviews > 0 ? 163.085 : 0}
                      height="7.96677"
                      rx="3.98339"
                      fill="#FFD429"
                    />
                  </Svg>
                </View>
              </View>
              <View style={styles.ratingItem}>
                <Text style={styles.ratingLabel}>주차장</Text>
                <Text style={styles.ratingText}>{(property as any)?.totalReviews > 0 ? '넓어요' : '후기 없음'}</Text>
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
                      width={(property as any)?.totalReviews > 0 ? 113.3 : 0}
                      height="7.96677"
                      rx="3.98339"
                      fill="#FFD429"
                    />
                  </Svg>
                </View>
              </View>
              <View style={styles.ratingItem}>
                <Text style={styles.ratingLabel}>벌레</Text>
                <Text style={styles.ratingText}>{(property as any)?.totalReviews > 0 ? '가끔 나와요' : '후기 없음'}</Text>
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
                      width={(property as any)?.totalReviews > 0 ? 56.65 : 0}
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
              <View style={styles.tabUnderlineContainer}>
                <Svg width="393" height="4" viewBox="0 0 393 4" fill="none" style={styles.grayLine}>
                  <Path d="M0 2.02002H397.398" stroke="#F2F2F2" strokeWidth="3" />
                </Svg>
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

            {/* 탭별 콘텐츠 */}
            {selectedTab === '기본 정보' && (
              <View style={styles.basicInfoSection}>
                {/* 기존 기본 정보 복사 */}
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
                  <Text style={styles.infoValue}>
                    {property?.price 
                      ? `월세 ${property.price.deposit}만원/ ${property.price.monthly}만원`
                      : '월세 2000만원/ 40만원'
                    }
                  </Text>
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
              </View>
            )}

            {selectedTab === '실거주자 후기' && (
              <View style={styles.reviewSection}>
                {/* 후기 섹션 전체 복사 */}
                <Text style={styles.reviewSectionTitle}>실거주자 후기</Text>
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
                    편의점이랑 3분 거리여서 접근성이 괜찮히 좋아요. 급하게 구한 집이라 걱정을 많이 했는데 생각보다 만족스러워요. 벌레는 가끔 나오지만 바퀴벌레는 아직 안나왔어요 ^^
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.moreReviewButton}
                  onPress={() => router.push('/main/review-detail')}
                >
                  <Text style={styles.moreReviewText}>12개의 후기 더보기</Text>
                </TouchableOpacity>
                <View style={styles.bottomLine} />
                <View style={styles.goodPointsSection}>
                  <Text style={styles.goodPointsTitle}>이런 점이 좋았어요</Text>
                  <View style={[styles.pointBox, styles.pointBox90]}>
                    <Text style={styles.pointText}>청결해요</Text>
                    <Text style={styles.pointPercentage}>90%</Text>
                  </View>
                  <View style={[styles.pointBox, styles.pointBox70]}>
                    <Text style={styles.pointText}>주차가 편해요</Text>
                    <Text style={styles.pointPercentage}>70%</Text>
                  </View>
                  <View style={[styles.pointBox, styles.pointBox40]}>
                    <Text style={styles.pointText}>채광이 좋아요</Text>
                    <Text style={styles.pointPercentage}>40%</Text>
                  </View>
                </View>
                <View style={styles.badPointsSection}>
                  <Text style={styles.badPointsTitle}>이런 점이 아쉬워요</Text>
                  <View style={[styles.badPointBox, styles.badPointBox90]}>
                    <Text style={styles.badPointText}>학교에서 멀어요</Text>
                    <Text style={styles.badPointPercentage}>90%</Text>
                  </View>
                  <View style={[styles.badPointBox, styles.badPointBox80]}>
                    <Text style={styles.badPointText}>역이랑 멀어요</Text>
                    <Text style={styles.badPointPercentage}>80%</Text>
                  </View>
                  <View style={[styles.badPointBox, styles.badPointBox20]}>
                    <Text style={styles.badPointText20}>소음</Text>
                    <Text style={styles.badPointPercentage20}>20%</Text>
                  </View>
                </View>
                <View style={styles.dividerLine} />
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

            {selectedTab === '질문하기' && (
              <View style={styles.questionSection}>
                <View style={styles.questionList}>
                  {questionData.map(renderQuestionCard)}
                </View>
              </View>
            )}

            {selectedTab === '양도' && (
              <View style={styles.transferSection}>
                <TouchableOpacity style={styles.sortButton}>
                  <View style={styles.sortArrowsContainer}>
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
                  <Text style={styles.sortText}>최신순</Text>
                  <Svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <Path
                      d="M10.582 1.09091L6.18708 5.81292C6.09346 5.9135 5.93378 5.91228 5.84171 5.81027L1.58203 1.09091"
                      stroke="#636363"
                      strokeWidth="1.48776"
                      strokeLinecap="round"
                    />
                  </Svg>
                </TouchableOpacity>
                <View style={styles.transferList}>
                  {transferData.map(renderTransferCard)}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </Animated.View>
    </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    zIndex: 99999,
    elevation: 99999,
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40.5,
    borderTopRightRadius: 40.5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 99999,
    zIndex: 99999,
  },
  dragHandle: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40.5,
    borderTopRightRadius: 40.5,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
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
    position: 'absolute',
    top: 0,
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
  whiteBox: {
    // ResidentReview의 whiteBox 스타일 복사
    width: 393.004,
    flex: 1, // 부모 컨테이너 높이에 맞춤
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40.5,
    borderTopRightRadius: 40.5,
    marginTop: -40,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20, // 패딩 줄임
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  infoLabel: {
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 22,
    width: 100,
  },
  infoContent: {
    flex: 1,
  },
  infoValue: {
    flex: 1,
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 22,
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
  
  // … 질문하기, 양도 섹션 스타일도 동일하게 복사
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
    minHeight: 200,
    backgroundColor: '#FCFCFC',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(242, 242, 242, 0.50)',
    padding: 16,
    marginBottom: 12,
    alignSelf: 'center',
  },
  transferHeader: {
    marginBottom: 12,
  },
  transferAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
});