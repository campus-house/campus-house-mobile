import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  PanResponder,
  Animated,
  TextInput,
} from 'react-native';
import { router, useNavigation } from 'expo-router';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { COLORS } from '@/constants/colors';
import { PlusIcon } from '@/components/Icon/PlusIcon';
import { BackIcon } from '@/components/Icon/BackIcon';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// 샘플 데이터
const samplePosts = [
  {
    id: 1,
    author: '배달요정',
    profileImage: '🐕',
    time: '1시간 전',
    date: '2025.09.01',
    title: '같이 배달 시켜 먹을 사람 구해요!',
    content: '배민으로 배달하려고 하는데 같이 시킬 분 연락 주세요~!',
    image: '☕',
    comments: 12,
    likes: 5,
    shares: 0,
  },
  {
    id: 2,
    author: '방미오',
    profileImage: '🦉',
    time: '1시간 전',
    date: '2025.09.01',
    title: '도넛 나눔할게요',
    content: '도넛을 너무 많이 구매해서 여섯 분께 드리려고 해요! 오늘까지 아이파크 앞으...',
    image: '🍩',
    comments: 12,
    likes: 5,
    shares: 0,
  },
  {
    id: 3,
    author: '말하는감자',
    profileImage: '🥔',
    time: '1시간 전',
    date: '2025.09.01',
    title: '컵 공동구매 하실 분 있나요',
    content: '요즘 분위기 좋은 카페에서 사용한다는 컵을 공동구매 한다는데 관심 있으신 분 계...',
    image: '',
    comments: 18,
    likes: 0,
    shares: 0,
  },
  {
    id: 4,
    author: '책벌레',
    profileImage: '📚',
    time: '2시간 전',
    date: '2025.09.01',
    title: '독서모임 같이 하실 분?',
    content: '매주 토요일 오후에 카페에서 독서모임을 하는데 함께 하실 분 있나요?',
    image: '📖',
    comments: 8,
    likes: 12,
    shares: 2,
  },
  {
    id: 5,
    author: '운동러',
    profileImage: '💪',
    time: '3시간 전',
    date: '2025.09.01',
    title: '헬스장 같이 가실 분',
    content: '혼자 운동하기 심심해서 같이 가실 분 구해요! 초보자도 환영입니다.',
    image: '🏋️',
    comments: 15,
    likes: 8,
    shares: 1,
  },
];

export default function MainScreen() {
  const navigation = useNavigation();
  const [showBackButton, setShowBackButton] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [cardPosition, setCardPosition] = useState(screenHeight * 0.6); // 카드의 Y 위치 (화면의 60% 지점에서 시작)
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddressSearchModal, setShowAddressSearchModal] = useState(false);
  const [showNameInputModal, setShowNameInputModal] = useState(false);
  const [showInfoInputModal, setShowInfoInputModal] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showDistrictModal, setShowDistrictModal] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [idNumberInput, setIdNumberInput] = useState('');
  const [infoNameInput, setInfoNameInput] = useState('');
  const [infoPhoneInput, setInfoPhoneInput] = useState('');
  const [infoIdNumberInput, setInfoIdNumberInput] = useState('');
  const [infoIdNumberSecond, setInfoIdNumberSecond] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedAuth, setSelectedAuth] = useState('');
  const [showAuthCompleteModal, setShowAuthCompleteModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showVerificationCompleteModal, setShowVerificationCompleteModal] = useState(false);
  const [showFinalCompleteModal, setShowFinalCompleteModal] = useState(false);
  const [currentYear, setCurrentYear] = useState(0); // 0: 2019, 1: 2021, 2: 2025

  // 로딩 애니메이션 효과
  useEffect(() => {
    if (showLoadingModal) {
      const interval = setInterval(() => {
        setCurrentYear((prev) => {
          if (prev < 2) {
            return prev + 1;
          }
          return prev;
        });
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [showLoadingModal]);

  // 2025에 도달하면 3초 후 완료 화면으로 전환
  useEffect(() => {
    if (showLoadingModal && currentYear === 2) {
      const completeTimeout = setTimeout(() => {
        setShowLoadingModal(false);
        setShowVerificationCompleteModal(true);
      }, 3000);

      return () => {
        clearTimeout(completeTimeout);
      };
    }
  }, [showLoadingModal, currentYear]);

  // 고슴도치 화면에서 3초 후 최종 완료 화면으로 전환
  useEffect(() => {
    if (showVerificationCompleteModal) {
      const finalTimeout = setTimeout(() => {
        setShowVerificationCompleteModal(false);
        setShowFinalCompleteModal(true);
      }, 3000);

      return () => {
        clearTimeout(finalTimeout);
      };
    }
  }, [showVerificationCompleteModal]);

  // 주민등록번호 뒷자리 마스킹 함수
  const getIdNumberSecondDisplay = () => {
    if (infoIdNumberSecond.length === 0) {
      return '';
    }
    // 첫 번째 글자만 보이고 나머지는 *로 마스킹
    const firstDigit = infoIdNumberSecond.charAt(0);
    return `${firstDigit}******`;
  };
  const scrollViewRef = useRef<ScrollView>(null);
  const pan = useRef(new Animated.ValueXY()).current;

  // 모달이 표시될 때 탭바 숨기기
  useEffect(() => {
    if (
      showAddressModal ||
      showNameInputModal ||
      showInfoInputModal ||
      showAuthCompleteModal ||
      showLoadingModal ||
      showVerificationCompleteModal ||
      showFinalCompleteModal
    ) {
      navigation.setOptions({
        tabBarStyle: { display: 'none' },
      });
    } else {
      navigation.setOptions({
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
          shadowOffset: {
            width: -1.5,
            height: -4.5,
          },
          shadowOpacity: 0.03,
          shadowRadius: 4,
          elevation: 5,
        },
      });
    }
  }, [
    showAddressModal,
    showNameInputModal,
    showInfoInputModal,
    showAuthCompleteModal,
    showLoadingModal,
    showVerificationCompleteModal,
    showFinalCompleteModal,
    navigation,
  ]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // 세로 드래그가 더 크면 카드 드래그, 가로 드래그가 더 크면 스크롤
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

      // 카드가 화면 최상단에 가까우면 뒤로가기 버튼 표시
      if (newY < 100) {
        setShowBackButton(true);
      } else {
        setShowBackButton(false);
      }

      // 실시간으로 카드 위치 업데이트
      setCardPosition(newY);
      pan.setValue({ x: 0, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      pan.flattenOffset();
      const newY = cardPosition + gestureState.dy;

      // 카드 위치 제한
      const minY = 0; // 최상단 (전체 화면 덮음)
      const maxY = screenHeight * 0.8; // 최하단 (화면의 80% 지점으로 더 아래로)

      let finalY = newY;
      if (newY < minY) {
        finalY = minY;
      }
      if (newY > maxY) {
        finalY = maxY;
      }

      // 애니메이션으로 부드럽게 이동
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
    <View key={post.id} style={styles.postCard}>
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
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#D7F0FF" />

      {/* 거주지 인증 모달 */}
      {showAuthModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.authModal}>
            {/* 자물쇠 아이콘 */}
            <Image
              source={require('@/assets/images/자물쇠.png')}
              style={styles.lockIcon}
              resizeMode="contain"
            />

            {/* 리워드 배너 */}
            <View style={styles.rewardBanner}>
              <Text style={styles.rewardText}>인증시 800c리워드 지급</Text>
            </View>

            {/* 설명 텍스트 */}
            <Text style={styles.authDescription}>거주지를 인증하고</Text>
            <Text style={styles.authDescription}>유저들이랑 소통해요</Text>

            {/* 인증 버튼 */}
            <TouchableOpacity
              style={styles.authButton}
              onPress={() => {
                setShowAuthModal(false);
                setShowAddressModal(true);
                setShowAddressSearchModal(true);
              }}
            >
              <Text style={styles.authButtonText}>거주지 인증하러 가기</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 주소 입력 모달 */}
      {showAddressModal && (
        <View style={styles.addressModalOverlay}>
          <View style={styles.addressModal}>
            {/* 뒤로가기 버튼 */}
            <TouchableOpacity
              style={styles.addressBackButton}
              onPress={() => {
                setShowAddressModal(false);
                setShowAddressSearchModal(false);
              }}
            >
              <BackIcon size={16} color={COLORS.neutral.grey4} />
            </TouchableOpacity>

            {/* 제목 */}
            <Text style={styles.addressHeaderTitle}>주소 불러오기</Text>

            {/* 질문 */}
            <Text style={styles.addressQuestion}>어디에 거주 중이신가요?</Text>

            {/* 주소 검색 입력 필드 */}
            <TouchableOpacity
              style={styles.addressInputContainer}
              onPress={() => {
                setShowAddressModal(false);
                setShowAddressSearchModal(true);
              }}
            >
              <Text style={styles.addressPlaceholder}>거주하고 있는 주소 찾기</Text>
              <Image
                source={require('@/assets/images/돋보기.png')}
                style={styles.searchIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* 안내 문구 */}
            <Text style={styles.addressNotice}>
              *입력하신 정보는 정부24 주소 연동 이외에{'\n'}일절 사용되지 않아요.
            </Text>
          </View>
        </View>
      )}

      {/* 주소 검색 결과 모달 */}
      {showAddressSearchModal && (
        <View style={styles.addressSearchModalOverlay}>
          <View style={styles.addressSearchModal}>
            {/* 제목 */}
            <Text style={styles.searchModalTitle}>
              <Text style={styles.searchModalTitleOrange}>안전하게</Text>
              <Text style={styles.searchModalTitleBlack}>
                {' '}
                살았던 집의 주소를 불러올 수 있어요!
              </Text>
            </Text>

            {/* 설명 */}
            <Text style={styles.searchModalDescription}>정부24에서 간편하게 정보를 조회해요.</Text>

            {/* 주소 불러오기 버튼 */}
            <TouchableOpacity
              style={styles.addressSearchButton}
              onPress={() => {
                setShowAddressSearchModal(false);
                setShowAddressModal(false);
                setShowNameInputModal(true);
              }}
            >
              <Text style={styles.addressSearchButtonText}>주소 불러오기</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 이름 입력 모달 */}
      {showNameInputModal && (
        <View style={styles.addressModalOverlay}>
          <View style={styles.addressModal}>
            {/* 뒤로가기 버튼 */}
            <TouchableOpacity
              style={styles.addressBackButton}
              onPress={() => {
                setShowNameInputModal(false);
                setNameInput('');
              }}
            >
              <BackIcon size={16} color={COLORS.neutral.grey4} />
            </TouchableOpacity>

            {/* 제목 */}
            <Text style={styles.addressHeaderTitle}>주소 불러오기</Text>

            {/* 질문 */}
            <Text style={styles.nameInputQuestion}>이름을 입력해주세요</Text>

            {/* 안내 */}
            <Text style={styles.nameInputGuide}>이름</Text>

            {/* 이름 입력 필드 */}
            <View style={styles.nameInputContainer}>
              <TextInput
                style={styles.nameInput}
                placeholder="이름 입력"
                placeholderTextColor="#CDCDCD"
                value={nameInput}
                onChangeText={setNameInput}
              />
            </View>

            {/* 하단 줄 */}
            <View
              style={[styles.nameInputLine, nameInput.length > 0 && styles.nameInputLineActive]}
            />

            {/* 안내 문구 */}
            <Text style={styles.nameInputNotice}>
              *입력하신 정보는 정부24 주소 연동 이외에{'\n'}일절 사용되지 않아요.
            </Text>

            {/* 다음 버튼 */}
            <TouchableOpacity
              style={[styles.nextButton, nameInput.length > 0 && styles.nextButtonActive]}
              onPress={() => {
                if (nameInput.length > 0) {
                  setShowNameInputModal(false);
                  setShowInfoInputModal(true);
                }
              }}
            >
              <Text
                style={[styles.nextButtonText, nameInput.length > 0 && styles.nextButtonTextActive]}
              >
                다음
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 정보 입력 모달 */}
      {showInfoInputModal && (
        <View style={styles.addressModalOverlay}>
          <View style={styles.addressModal}>
            {/* 뒤로가기 버튼 */}
            <TouchableOpacity
              style={styles.addressBackButton}
              onPress={() => {
                setShowInfoInputModal(false);
                setInfoNameInput('');
                setInfoPhoneInput('');
                setInfoIdNumberInput('');
                setInfoIdNumberSecond('');
              }}
            >
              <BackIcon size={16} color={COLORS.neutral.grey4} />
            </TouchableOpacity>

            {/* 제목 */}
            <Text style={styles.addressHeaderTitle}>주소 불러오기</Text>

            {/* 질문 */}
            <Text style={styles.infoInputQuestion}>정보를 입력해주세요</Text>

            {/* 안내 */}
            <Text style={styles.infoInputGuide}>
              *입력하신 정보는 정부24 주소 연동 이외에{'\n'}일절 사용되지 않아요.
            </Text>

            {/* 지역 필드 */}
            <TouchableOpacity
              style={styles.infoFieldContainer}
              onPress={() => setShowRegionModal(true)}
            >
              <Text
                style={[styles.infoFieldLabel, selectedRegion && styles.infoFieldLabelSelected]}
              >
                {selectedRegion || '지역'}
              </Text>
              <Svg width="11" height="7" viewBox="0 0 11 7" fill="none" style={styles.dropdownIcon}>
                <Path
                  d="M1 1.5L5.3536 5.85352L9.70703 1.5"
                  stroke="#CDCDCD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
            <View style={[styles.infoFieldLine, selectedRegion && styles.infoInputLineActive]} />

            {/* 시/군/구 필드 */}
            <TouchableOpacity
              style={styles.infoFieldContainer2}
              onPress={() => setShowDistrictModal(true)}
            >
              <Text
                style={[styles.infoFieldLabel, selectedDistrict && styles.infoFieldLabelSelected]}
              >
                {selectedDistrict || '시/군/구 선택'}
              </Text>
              <Svg width="11" height="7" viewBox="0 0 11 7" fill="none" style={styles.dropdownIcon}>
                <Path
                  d="M1 1.5L5.3536 5.85352L9.70703 1.5"
                  stroke="#CDCDCD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
            <View style={[styles.infoFieldLine2, selectedDistrict && styles.infoInputLineActive]} />

            {/* 이름 필드 */}
            <View style={styles.infoInputContainer}>
              <TextInput
                style={[styles.infoInput, infoNameInput.length > 0 && styles.infoInputActive]}
                placeholder="이름"
                placeholderTextColor="#CDCDCD"
                value={infoNameInput}
                onChangeText={setInfoNameInput}
              />
            </View>
            <View
              style={[styles.infoInputLine, infoNameInput.length > 0 && styles.infoInputLineActive]}
            />

            {/* 휴대폰 번호 필드 */}
            <View style={styles.infoInputContainer2}>
              <TextInput
                style={[styles.infoInput, infoPhoneInput.length > 0 && styles.infoInputActivePhone]}
                placeholder="휴대폰 11자리 입력하기"
                placeholderTextColor="#CDCDCD"
                value={infoPhoneInput}
                onChangeText={setInfoPhoneInput}
                keyboardType="numeric"
                maxLength={11}
              />
            </View>
            <View
              style={[
                styles.infoInputLine2,
                infoPhoneInput.length > 0 && styles.infoInputLineActive,
              ]}
            />

            {/* 주민등록번호 필드 */}
            <View style={styles.infoInputContainer3}>
              <View style={styles.idNumberRow}>
                <TextInput
                  style={[
                    styles.idNumberInput1,
                    infoIdNumberInput.length > 0 && styles.infoInputActive,
                  ]}
                  placeholder="생년월일 6자리"
                  placeholderTextColor="#CDCDCD"
                  value={infoIdNumberInput}
                  onChangeText={setInfoIdNumberInput}
                  keyboardType="numeric"
                  maxLength={6}
                />
                <Svg width="18" height="2" viewBox="0 0 18 2" style={styles.dashIcon}>
                  <Path d="M1.37891 1H17.3789" stroke="#AAAAAA" strokeLinecap="round" />
                </Svg>
                <TextInput
                  style={[
                    styles.idNumberSecond,
                    infoIdNumberSecond.length > 0 && {
                      color: '#323232',
                      fontSize: 20,
                      fontWeight: '400',
                      fontFamily: 'Pretendard',
                      lineHeight: 22.519,
                    },
                  ]}
                  placeholder="*******"
                  placeholderTextColor="#CDCDCD"
                  value={getIdNumberSecondDisplay()}
                  onChangeText={setInfoIdNumberSecond}
                  keyboardType="numeric"
                  maxLength={7}
                  secureTextEntry={false}
                />
              </View>
            </View>
            <View style={styles.idNumberLines}>
              <View
                style={[
                  styles.idNumberLine1,
                  infoIdNumberInput.length > 0 && styles.infoInputLineActive,
                ]}
              />
              <View
                style={[
                  styles.idNumberLine2,
                  infoIdNumberSecond.length > 0 && styles.infoInputLineActive,
                ]}
              />
            </View>

            {/* 인증수단 선택 */}
            <Text style={styles.authMethodTitle}>인증수단을 선택해주세요</Text>

            {/* 인증 옵션들 */}
            <View style={styles.authOptionsContainer}>
              <TouchableOpacity
                style={styles.authOptionWithText}
                onPress={() => setSelectedAuth('카카오')}
              >
                <Image
                  source={require('@/assets/images/카카오.png')}
                  style={styles.authImage}
                  resizeMode="cover"
                />
                <Text
                  style={[
                    styles.authOptionTextNew,
                    selectedAuth === '카카오' && styles.authOptionTextSelected,
                  ]}
                >
                  카카오
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.authOptionWithText}
                onPress={() => setSelectedAuth('네이버')}
              >
                <Image
                  source={require('@/assets/images/네이버.png')}
                  style={styles.authImage}
                  resizeMode="cover"
                />
                <Text
                  style={[
                    styles.authOptionTextNew,
                    selectedAuth === '네이버' && styles.authOptionTextSelected,
                  ]}
                >
                  네이버
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.authOptionWithText}
                onPress={() => setSelectedAuth('토스')}
              >
                <Image
                  source={require('@/assets/images/토스.png')}
                  style={styles.authImage}
                  resizeMode="cover"
                />
                <Text
                  style={[
                    styles.authOptionTextNew,
                    selectedAuth === '토스' && styles.authOptionTextSelected,
                  ]}
                >
                  토스
                </Text>
              </TouchableOpacity>
            </View>

            {/* 인증하기 버튼 */}
            <TouchableOpacity
              style={[
                styles.infoSubmitButton,
                selectedRegion &&
                  selectedDistrict &&
                  infoNameInput &&
                  infoPhoneInput &&
                  infoIdNumberInput &&
                  infoIdNumberSecond &&
                  selectedAuth &&
                  styles.infoSubmitButtonActive,
              ]}
              onPress={() => {
                if (
                  selectedRegion &&
                  selectedDistrict &&
                  infoNameInput &&
                  infoPhoneInput &&
                  infoIdNumberInput &&
                  infoIdNumberSecond &&
                  selectedAuth
                ) {
                  setShowInfoInputModal(false);
                  setShowAuthCompleteModal(true);
                }
              }}
            >
              <Text
                style={[
                  styles.infoSubmitButtonText,
                  selectedRegion &&
                    selectedDistrict &&
                    infoNameInput &&
                    infoPhoneInput &&
                    infoIdNumberInput &&
                    infoIdNumberSecond &&
                    selectedAuth &&
                    styles.infoSubmitButtonTextActive,
                ]}
              >
                인증하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 지역 선택 모달 */}
      {showRegionModal && (
        <View style={styles.regionModalOverlay}>
          <View style={styles.regionModal}>
            <Text style={styles.regionModalTitle}>지역을 선택해주세요</Text>

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedRegion('서울특별시');
                setShowRegionModal(false);
              }}
            >
              <Text style={styles.regionOptionText}>서울특별시</Text>
            </TouchableOpacity>
            <View style={styles.regionOptionLine} />

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedRegion('경기도');
                setShowRegionModal(false);
              }}
            >
              <Text style={styles.regionOptionTextSelected}>경기도</Text>
            </TouchableOpacity>
            <View style={styles.regionOptionLine} />

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedRegion('인천');
                setShowRegionModal(false);
              }}
            >
              <Text style={styles.regionOptionText}>인천</Text>
            </TouchableOpacity>
            <View style={styles.regionOptionLine} />

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedRegion('강원도');
                setShowRegionModal(false);
              }}
            >
              <Text style={styles.regionOptionText}>강원도</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 시/군/구 선택 모달 */}
      {showDistrictModal && (
        <View style={styles.regionModalOverlay}>
          <View style={styles.regionModal}>
            <Text style={styles.regionModalTitle}>시/군/구를 선택해주세요</Text>

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedDistrict('기흥구');
                setShowDistrictModal(false);
              }}
            >
              <Text style={styles.regionOptionText}>기흥구</Text>
            </TouchableOpacity>
            <View style={styles.regionOptionLine} />

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedDistrict('영통구');
                setShowDistrictModal(false);
              }}
            >
              <Text style={styles.regionOptionText}>영통구</Text>
            </TouchableOpacity>
            <View style={styles.regionOptionLine} />

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedDistrict('수지구');
                setShowDistrictModal(false);
              }}
            >
              <Text style={styles.regionOptionText}>수지구</Text>
            </TouchableOpacity>
            <View style={styles.regionOptionLine} />

            <TouchableOpacity
              style={styles.regionOption}
              onPress={() => {
                setSelectedDistrict('팔달구');
                setShowDistrictModal(false);
              }}
            >
              <Text style={styles.regionOptionText}>팔달구</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 간편 인증하기 모달 */}
      {showAuthCompleteModal && (
        <View style={styles.authCompleteModalOverlay}>
          <View style={styles.authCompleteModal}>
            {/* 뒤로가기 버튼 */}
            <TouchableOpacity
              style={styles.authCompleteBackButton}
              onPress={() => {
                setShowAuthCompleteModal(false);
                setShowInfoInputModal(true);
              }}
            >
              <BackIcon size={16} color={COLORS.neutral.grey4} />
            </TouchableOpacity>

            {/* 제목 */}
            <Text style={styles.authCompleteHeaderTitle}>간편 인증하기</Text>

            {/* 메인 텍스트 */}
            <Text style={styles.authCompleteMainText}>앱에서 인증해 주세요</Text>

            {/* 설명 텍스트 */}
            <Text style={styles.authCompleteDescription}>
              앱에서 인증 후 완료 버튼을 눌러주세요.
            </Text>

            {/* 문제 발생 시 텍스트 */}
            <Text style={styles.authCompleteIssueText}>인증 문자가 오지 않아요</Text>

            {/* 완료 버튼 */}
            <TouchableOpacity
              style={styles.authCompleteButton}
              onPress={() => {
                setShowAuthCompleteModal(false);
                setCurrentYear(0); // 애니메이션 초기화
                setShowLoadingModal(true);
              }}
            >
              <Text style={styles.authCompleteButtonText}>앱에서 인증을 완료했어요</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 로딩 모달 */}
      {showLoadingModal && (
        <View style={styles.loadingModalOverlay}>
          <View style={styles.loadingModal}>
            {/* 뒤로가기 버튼 */}
            <TouchableOpacity
              style={styles.loadingBackButton}
              onPress={() => {
                setShowLoadingModal(false);
                setShowAuthCompleteModal(true);
              }}
            >
              <BackIcon size={16} color={COLORS.neutral.grey4} />
            </TouchableOpacity>

            {/* 제목 */}
            <Text style={styles.loadingHeaderTitle}>간편 인증하기</Text>

            {/* 불러오는 중 텍스트와 점 */}
            <View style={styles.loadingTextContainer}>
              <Text style={styles.loadingText}>불러오는 중</Text>
              <View style={styles.loadingDotsContainer}>
                <Svg width="5" height="4" viewBox="0 0 5 4" fill="none">
                  <Circle cx="2.47883" cy="2.07258" r="1.57258" fill="#FF805F" />
                </Svg>
                <Svg width="5" height="4" viewBox="0 0 5 4" fill="none" style={{ marginLeft: 4 }}>
                  <Circle cx="2.47883" cy="2.07258" r="1.57258" fill="#FF805F" />
                </Svg>
                <Svg width="5" height="4" viewBox="0 0 5 4" fill="none" style={{ marginLeft: 4 }}>
                  <Circle cx="2.47883" cy="2.07258" r="1.57258" fill="#FF805F" />
                </Svg>
              </View>
            </View>

            {/* 페이지를 벗어나지 말아주세요 */}
            <Text style={styles.loadingWarningText}>페이지를 벗어나지 말아주세요!</Text>

            {/* 타임라인 */}
            <View style={styles.timelineContainer}>
              {/* 2019 */}
              <View style={styles.timelineItem}>
                <View style={styles.timelineIconContainer}>
                  {currentYear === 0 ? (
                    <>
                      <Svg
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                        fill="none"
                        style={{ position: 'absolute' }}
                      >
                        <Circle cx="15.5" cy="15.5" r="14.26" stroke="#FF805F" strokeWidth="2.48" />
                      </Svg>
                      <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <Circle cx="9.3" cy="9.3" r="9.3" fill="#FF805F" />
                      </Svg>
                    </>
                  ) : (
                    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <Circle cx="8.5007" cy="8.7546" r="8.2546" fill="#FF805F" />
                    </Svg>
                  )}
                </View>
                <Text style={[styles.timelineYear, currentYear === 0 && styles.timelineYearActive]}>
                  2019
                </Text>
              </View>

              {/* 점선 */}
              <View style={styles.timelineDots}>
                {[0, 1, 2].map((i) => (
                  <Svg
                    key={`dots1-${i}`}
                    width="5"
                    height="5"
                    viewBox="0 0 5 5"
                    fill="none"
                    style={{ marginVertical: 2 }}
                  >
                    <Circle
                      cx="2.5939"
                      cy="2.32242"
                      r="2.00015"
                      fill={currentYear >= 1 ? '#FF805F' : '#CDCDCD'}
                    />
                  </Svg>
                ))}
              </View>

              {/* 2021 */}
              <View style={styles.timelineItem}>
                <View style={styles.timelineIconContainer}>
                  {currentYear === 1 ? (
                    <>
                      <Svg
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                        fill="none"
                        style={{ position: 'absolute' }}
                      >
                        <Circle cx="15.5" cy="15.5" r="14.26" stroke="#FF805F" strokeWidth="2.48" />
                      </Svg>
                      <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <Circle cx="9.3" cy="9.3" r="9.3" fill="#FF805F" />
                      </Svg>
                    </>
                  ) : currentYear > 1 ? (
                    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <Circle cx="8.5007" cy="8.7546" r="8.2546" fill="#FF805F" />
                    </Svg>
                  ) : (
                    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <Circle cx="8.5007" cy="8.7546" r="8.2546" fill="#CDCDCD" />
                    </Svg>
                  )}
                </View>
                <Text style={[styles.timelineYear, currentYear === 1 && styles.timelineYearActive]}>
                  2021
                </Text>
              </View>

              {/* 점선 */}
              <View style={styles.timelineDots}>
                {[0, 1, 2].map((i) => (
                  <Svg
                    key={`dots2-${i}`}
                    width="5"
                    height="5"
                    viewBox="0 0 5 5"
                    fill="none"
                    style={{ marginVertical: 2 }}
                  >
                    <Circle
                      cx="2.5939"
                      cy="2.50015"
                      r="2.00015"
                      fill={currentYear >= 2 ? '#FF805F' : '#CDCDCD'}
                    />
                  </Svg>
                ))}
              </View>

              {/* 2025 */}
              <View style={styles.timelineItem}>
                <View style={styles.timelineIconContainer}>
                  {currentYear === 2 ? (
                    <>
                      <Svg
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                        fill="none"
                        style={{ position: 'absolute' }}
                      >
                        <Circle cx="15.5" cy="15.5" r="14.26" stroke="#FF805F" strokeWidth="2.48" />
                      </Svg>
                      <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <Circle cx="9.3" cy="9.3" r="9.3" fill="#FF805F" />
                      </Svg>
                    </>
                  ) : (
                    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <Circle cx="8.5007" cy="8.7546" r="8.2546" fill="#CDCDCD" />
                    </Svg>
                  )}
                </View>
                <Text style={[styles.timelineYear, currentYear === 2 && styles.timelineYearActive]}>
                  2025
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* 인증 완료 모달 */}
      {showVerificationCompleteModal && (
        <View style={styles.verificationCompleteModalOverlay}>
          <View style={styles.verificationCompleteModal}>
            {/* 불러오는 중 텍스트와 점 */}
            <View style={styles.completeLoadingTextContainer}>
              <Text style={styles.completeLoadingText}>불러오는 중</Text>
              <View style={styles.completeLoadingDotsContainer}>
                <Svg width="4" height="4" viewBox="0 0 4 4" fill="none">
                  <Circle cx="1.8968" cy="1.57258" r="1.57258" fill="#FF805F" />
                </Svg>
                <Svg width="4" height="4" viewBox="0 0 4 4" fill="none" style={{ marginLeft: 4 }}>
                  <Circle cx="1.8968" cy="1.57258" r="1.57258" fill="#FF805F" />
                </Svg>
                <Svg width="4" height="4" viewBox="0 0 4 4" fill="none" style={{ marginLeft: 4 }}>
                  <Circle cx="1.8968" cy="1.57258" r="1.57258" fill="#FF805F" />
                </Svg>
              </View>
            </View>

            {/* 잠시만 기다려주세요 */}
            <Text style={styles.completeWarningText}>잠시만 기다려주세요!</Text>

            {/* 고슴도치 이미지 */}
            <Image
              source={require('@/assets/images/고슴.png')}
              style={styles.hedgehogImage}
              resizeMode="contain"
            />
          </View>
        </View>
      )}

      {/* 최종 인증 완료 모달 */}
      {showFinalCompleteModal && (
        <View style={styles.finalCompleteModalOverlay}>
          <View style={styles.finalCompleteModal}>
            {/* 인증 완료 텍스트 */}
            <Text style={styles.finalCompleteTitle}>인증 완료</Text>

            {/* 환영 메시지 */}
            <Text style={styles.finalWelcomeText}>캠퍼스하우스에 오신걸 환영해요!</Text>

            {/* 마을 이미지 */}
            <Image
              source={require('@/assets/images/마을.png')}
              style={styles.villageImage}
              resizeMode="cover"
            />
          </View>
        </View>
      )}

      {/* Back Button - Only show when card is at top */}
      {showBackButton && (
        <View style={styles.backButtonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <BackIcon size={16} color={COLORS.neutral.grey4} />
          </TouchableOpacity>
        </View>
      )}

      {/* Draggable Card */}
      <Animated.View
        style={[
          styles.draggableCard,
          {
            top: cardPosition,
            transform: pan.getTranslateTransform(),
          },
        ]}
      >
        {/* Draggable Header */}
        <View
          style={[styles.header, showBackButton && { marginTop: 80 }]}
          {...panResponder.panHandlers}
        >
          {!showBackButton && <View style={styles.dragHandle} />}
          <Text style={[styles.headerTitle, showBackButton && styles.headerTitleFullScreen]}>
            질문 게시판
          </Text>
        </View>

        {/* Notification Card */}
        <TouchableOpacity
          style={styles.notificationCardContainer}
          onPress={() => router.push('/main/questions')}
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

        {/* Gray Line */}
        <View style={styles.grayLine} />

        {/* Apartment News Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>아파트소식</Text>
        </View>

        {/* Posts */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.postsContainer}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          bounces={true}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        >
          <View style={styles.communityPosts}>{samplePosts.map(renderPost)}</View>
        </ScrollView>
      </Animated.View>

      {/* Floating Action Button - only show when scrolled */}
      {showBackButton && (
        <TouchableOpacity style={styles.fab} onPress={() => router.push('/write')}>
          <View style={styles.fabIcon}>
            <View style={styles.fabCrossHorizontal} />
            <View style={styles.fabCrossVertical} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7F0FF',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 75, // 뒤로가기 버튼을 조금만 내림
    left: 20,
    zIndex: 1000,
  },
  backButton: {
    padding: 8, // SVG 크기에 맞게 조정
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
  },
  draggableCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: screenWidth,
    height: screenHeight + 100, // 하늘색 배경이 보이지 않도록 여유분 추가
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
    paddingTop: 20, // 원래 상태로 복구
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
    marginTop: 20, // 질문게시판 글씨만 아래로 내림
  },
  headerTitleFullScreen: {
    marginTop: 60, // 질문게시판을 더 밑으로 내려감
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
    paddingTop: 20, // 게시물들을 더 아래로
    paddingBottom: 300, // 하단 네비게이션 바 높이 + 충분한 여백
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
    marginBottom: 30, // 회색줄과 아파트소식 사이 간격 늘림
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 20, // 아파트소식과 게시물 사이 간격 늘림
  },
  sectionTitle: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 23,
    marginTop: 10, // 아파트소식 글씨를 조금 더 내림
  },
  tabSection: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FF6B35',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#AAAAAA',
    fontFamily: 'Pretendard',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  communityPosts: {
    paddingBottom: 100,
  },
  newsPosts: {
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
  postImage: {
    fontSize: 24,
  },
  postContent: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  contentLeft: {
    flex: 1,
    marginRight: 12,
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
  contentImage: {
    width: 70,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  coffeeImage: {
    width: 70,
    height: 80,
    borderRadius: 8,
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
  speechBubble: {
    // SVG 스타일
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
  fab: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    width: 62, // SVG 스펙에 맞춰 62px
    height: 62, // SVG 스펙에 맞춰 62px
    borderRadius: 31, // 원형으로 만들기 위해 반지름
    backgroundColor: '#FF805F', // SVG 색상에 맞춰 변경
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.07)', // SVG 그림자 색상에 맞춰 변경
    shadowOffset: {
      width: 0,
      height: 3.5, // SVG 그림자 offset에 맞춰 조정
    },
    shadowOpacity: 1,
    shadowRadius: 4.9, // SVG 그림자 blur에 맞춰 조정
    elevation: 8,
  },
  fabIcon: {
    width: 28.531, // SVG 스펙에 맞춰
    height: 28.531, // SVG 스펙에 맞춰
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabCrossHorizontal: {
    position: 'absolute',
    width: 28.531, // SVG 가로선 길이
    height: 3.241, // SVG stroke-width
    backgroundColor: '#FFFFFF', // SVG stroke 색상
    borderRadius: 1.5, // stroke-linecap: round 효과
  },
  fabCrossVertical: {
    position: 'absolute',
    width: 3.241, // SVG stroke-width
    height: 28.531, // SVG 세로선 길이
    backgroundColor: '#FFFFFF', // SVG stroke 색상
    borderRadius: 1.5, // stroke-linecap: round 효과
  },
  // 거주지 인증 모달 스타일
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  addressModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#666666',
    zIndex: 1000,
  },
  authModal: {
    width: 253,
    height: 346.55,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  lockIcon: {
    width: 92.719,
    height: 114.663,
    marginBottom: 20,
  },
  rewardBanner: {
    width: 166.136,
    height: 29.91,
    backgroundColor: '#FF805F',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  rewardText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Pretendard',
  },
  authDescription: {
    color: '#636363',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 5,
  },
  authButton: {
    width: 253,
    height: 57,
    backgroundColor: '#FF805F',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 27.2,
    textAlign: 'center',
  },
  // 주소 입력 모달 스타일
  addressModal: {
    width: 393,
    height: 852,
    backgroundColor: '#FCFCFC',
    position: 'relative',
  },
  addressHeader: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 393,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  addressBackButton: {
    position: 'absolute',
    left: 20,
    top: 70,
    padding: 8,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  addressHeaderTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 78,
    color: '#323232',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 17.76,
    textAlign: 'center',
  },
  addressQuestion: {
    position: 'absolute',
    left: 37,
    right: 37,
    top: 180,
    color: '#323232',
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 26,
    textAlign: 'left',
  },
  addressInputContainer: {
    position: 'absolute',
    left: 37,
    top: 240,
    width: 323,
    height: 58,
    backgroundColor: '#FFFFFF',
    borderRadius: 20.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  addressPlaceholder: {
    color: '#FF805F',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    flex: 1,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  addressNotice: {
    position: 'absolute',
    left: 37,
    top: 320,
    color: '#AAAAAA',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 19,
    width: 320,
  },
  homeIndicator: {
    position: 'absolute',
    left: 0,
    top: 818,
    width: 393,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIndicatorBar: {
    width: 134,
    height: 5,
    backgroundColor: '#636363',
    borderRadius: 100,
  },
  // 주소 검색 결과 모달 스타일
  addressSearchModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 1001,
  },
  addressSearchModal: {
    width: 393,
    height: 212,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26.5,
    borderTopRightRadius: 26.5,
    paddingTop: 30,
    paddingHorizontal: 33,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 5,
  },
  searchModalTitle: {
    marginBottom: 10,
  },
  searchModalTitleOrange: {
    color: '#FF805F',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
  },
  searchModalTitleBlack: {
    color: '#323232',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
  },
  searchModalDescription: {
    color: '#AAA',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
    marginBottom: 30,
    width: 259,
  },
  addressSearchButton: {
    width: 327,
    height: 52,
    backgroundColor: '#FF805F',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  addressSearchButtonText: {
    color: '#FFFFFF',
    fontSize: 16.5,
    fontWeight: '600',
    fontFamily: 'Pretendard',
  },
  // 이름 입력 모달 스타일
  nameInputQuestion: {
    position: 'absolute',
    left: 37,
    right: 37,
    top: 180,
    color: '#323232',
    fontSize: 26,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 30,
    textAlign: 'left',
  },
  nameInputGuide: {
    position: 'absolute',
    left: 37,
    top: 250,
    color: '#636363',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    textAlign: 'center',
  },
  nameInputContainer: {
    position: 'absolute',
    left: 37,
    top: 280,
    width: 300.934,
  },
  nameInput: {
    color: '#323232',
    fontSize: 18.5,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  nameInputLine: {
    position: 'absolute',
    left: 37,
    top: 320,
    width: 308,
    height: 1.5,
    backgroundColor: '#CDCDCD',
  },
  nameInputLineActive: {
    backgroundColor: '#323232',
  },
  nameInputNotice: {
    position: 'absolute',
    left: 37,
    top: 335,
    color: '#AAAAAA',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
    width: 297.125,
  },
  nextButton: {
    position: 'absolute',
    left: 37,
    bottom: 100,
    width: 318,
    height: 56,
    backgroundColor: '#AAA',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  nextButtonActive: {
    backgroundColor: '#FF805F',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16.5,
    fontWeight: '700',
    fontFamily: 'Pretendard',
  },
  nextButtonTextActive: {
    color: '#FFFFFF',
  },
  // 정보 입력 모달 스타일
  infoInputQuestion: {
    position: 'absolute',
    left: 37,
    right: 37,
    top: 140,
    color: '#323232',
    fontSize: 25.246,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 30,
    textAlign: 'left',
  },
  infoInputGuide: {
    position: 'absolute',
    left: 37,
    top: 180,
    color: '#AAA',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
    width: 320,
  },
  infoFieldContainer: {
    position: 'absolute',
    left: 37,
    top: 255,
    width: 135,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoFieldContainer2: {
    position: 'absolute',
    left: 200,
    top: 255,
    width: 135,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoFieldLabel: {
    color: '#CDCDCD',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  infoFieldLine: {
    position: 'absolute',
    left: 37,
    top: 290,
    width: 134,
    height: 1.2,
    backgroundColor: '#CDCDCD',
  },
  infoFieldLine2: {
    position: 'absolute',
    left: 200,
    top: 290,
    width: 134,
    height: 1.2,
    backgroundColor: '#CDCDCD',
  },
  infoInputContainer: {
    position: 'absolute',
    left: 37,
    top: 320,
    width: 320,
    height: 30,
  },
  infoInputContainer2: {
    position: 'absolute',
    left: 37,
    top: 390,
    width: 320,
    height: 30,
  },
  infoInputContainer3: {
    position: 'absolute',
    left: 37,
    top: 458,
    width: 320,
    height: 30,
  },
  infoInputLabel: {
    color: '#636363',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginBottom: 5,
  },
  infoInput: {
    color: '#CDCDCD',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  infoInputActive: {
    color: '#323232',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
  },
  infoInputActivePhone: {
    color: '#323232',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
  },
  infoInputLine: {
    position: 'absolute',
    left: 37,
    top: 355,
    width: 330,
    height: 1.23,
    backgroundColor: '#CDCDCD',
  },
  infoInputLine2: {
    position: 'absolute',
    left: 37,
    top: 425,
    width: 330,
    height: 1.2,
    backgroundColor: '#CDCDCD',
  },
  infoInputLineActive: {
    backgroundColor: '#323232',
  },
  idNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  idNumberInput1: {
    color: '#CDCDCD',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
    paddingVertical: 5,
    paddingHorizontal: 0,
    width: 131,
  },
  dashIcon: {
    marginHorizontal: 8,
  },
  idNumberSecond: {
    color: '#CDCDCD',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
    width: 127,
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  idNumberLines: {
    position: 'absolute',
    left: 37,
    top: 493,
    flexDirection: 'row',
  },
  idNumberLine1: {
    width: 131,
    height: 1.2,
    backgroundColor: '#CDCDCD',
    marginRight: 24,
  },
  idNumberLine2: {
    width: 131,
    height: 1.2,
    backgroundColor: '#CDCDCD',
  },
  authMethodTitle: {
    position: 'absolute',
    left: 37,
    top: 545,
    color: '#323232',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 21.105,
    textAlign: 'left',
  },
  authOptionsContainer: {
    position: 'absolute',
    left: 37,
    top: 600,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  },
  authOption: {
    width: 90,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  authOptionText: {
    color: '#636363',
    fontSize: 16.459,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 24.709,
  },
  authOptionImage: {
    width: 55.961,
    height: 57.058,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  authImage: {
    width: 55.961,
    height: 57.058,
    borderRadius: 23,
  },
  authOptionWithText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  authOptionTextNew: {
    color: '#636363',
    fontSize: 16.459,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 24.709,
    marginTop: 12,
    textAlign: 'center',
  },
  authOptionTextSelected: {
    color: '#FF805F',
  },
  infoSubmitButton: {
    position: 'absolute',
    left: 37,
    bottom: 50,
    width: 318,
    height: 56,
    backgroundColor: '#AAA',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSubmitButtonActive: {
    backgroundColor: '#FF805F',
  },
  infoSubmitButtonText: {
    color: '#FFFFFF',
    fontSize: 16.5,
    fontWeight: '700',
    fontFamily: 'Pretendard',
  },
  infoSubmitButtonTextActive: {
    color: '#FFFFFF',
  },
  // 지역 선택 관련 스타일
  infoFieldLabelSelected: {
    color: '#323232',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22.519,
  },
  regionModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 1002,
  },
  regionModal: {
    width: 393,
    height: 393,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26.5,
    borderTopRightRadius: 26.5,
    paddingTop: 40,
    paddingHorizontal: 33,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 5,
  },
  regionModalTitle: {
    color: '#323232',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
    marginBottom: 30,
    width: 339,
  },
  regionOption: {
    width: 342,
    paddingVertical: 15,
  },
  regionOptionText: {
    color: '#636363',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  regionOptionTextSelected: {
    color: '#636363',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  regionOptionLine: {
    width: 342,
    height: 1,
    backgroundColor: '#F2F2F2',
    marginVertical: 5,
  },
  // 간편 인증하기 모달 스타일
  authCompleteModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 1003,
  },
  authCompleteModal: {
    width: 393,
    height: 852,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  authCompleteBackButton: {
    position: 'absolute',
    left: 20,
    top: 70,
    padding: 8,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  authCompleteHeaderTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 78,
    color: '#323232',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 17.76,
    textAlign: 'center',
  },
  authCompleteMainText: {
    position: 'absolute',
    left: 37,
    right: 37,
    top: 140,
    color: '#323232',
    fontSize: 24.706,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: 30,
    textAlign: 'left',
    paddingTop: 5,
  },
  authCompleteDescription: {
    position: 'absolute',
    left: 37,
    right: 37,
    top: 190,
    color: '#AAA',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 17.756,
    textAlign: 'left',
    width: 259,
  },
  authCompleteIssueText: {
    position: 'absolute',
    left: 37,
    right: 37,
    top: 230,
    color: '#FF805F',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
  authCompleteButton: {
    position: 'absolute',
    left: 37,
    bottom: 50,
    width: 318,
    height: 56,
    backgroundColor: '#FF805F',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authCompleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16.5,
    fontWeight: '700',
    fontFamily: 'Pretendard',
  },
  // 로딩 모달 스타일
  loadingModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 1004,
  },
  loadingModal: {
    width: 393,
    height: 852,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingTop: 0,
  },
  loadingBackButton: {
    position: 'absolute',
    left: 20,
    top: 70,
    padding: 8,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  loadingHeaderTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 78,
    color: '#323232',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 17.76,
    textAlign: 'center',
  },
  loadingTextContainer: {
    position: 'absolute',
    left: 37,
    top: 180,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FF805F',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 22,
    marginRight: 8,
  },
  loadingDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingWarningText: {
    position: 'absolute',
    left: 37,
    top: 235,
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 30,
    paddingTop: 5,
  },
  timelineContainer: {
    position: 'absolute',
    left: 37,
    top: 320,
    alignItems: 'flex-start',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineIconContainer: {
    width: 31,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  timelineYear: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 21,
  },
  timelineYearActive: {
    fontWeight: '700',
  },
  timelineDots: {
    marginLeft: 12,
    marginVertical: 8,
  },
  // 인증 완료 모달 스타일
  verificationCompleteModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 1005,
  },
  verificationCompleteModal: {
    width: 393,
    height: 852,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingTop: 0,
    alignItems: 'center',
  },
  completeLoadingTextContainer: {
    position: 'absolute',
    left: 37,
    top: 200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completeLoadingText: {
    color: '#FF805F',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 22,
    marginRight: 8,
  },
  completeLoadingDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completeWarningText: {
    position: 'absolute',
    left: 37,
    top: 250,
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 24.706,
    fontWeight: '600',
    lineHeight: 30,
    paddingTop: 5,
  },
  hedgehogImage: {
    position: 'absolute',
    width: 300,
    height: 200,
    bottom: 100,
  },
  // 최종 인증 완료 모달 스타일
  finalCompleteModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 1006,
  },
  finalCompleteModal: {
    width: 393,
    height: 852,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingTop: 0,
    alignItems: 'center',
  },
  finalCompleteTitle: {
    position: 'absolute',
    left: 37,
    top: 220,
    color: '#FF805F',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 20,
    paddingTop: 5,
  },
  finalWelcomeText: {
    position: 'absolute',
    left: 37,
    top: 260,
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 35,
  },
  villageImage: {
    position: 'absolute',
    width: 393,
    height: 400,
    bottom: 0,
  },
});
