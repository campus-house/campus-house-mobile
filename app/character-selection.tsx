import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { COLORS } from '@/constants/colors';
import Svg, { Path } from 'react-native-svg';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

// 캐릭터 데이터
const characters = [
  {
    id: 0,
    name: '쿠리',
    image: require('@/assets/images/helloracoon.png'),
    description:
      '안녕, 나는 쿠리야!\n난 호기심이 많고 모험을 좋아해! 집을 찾는 일도 나한텐 거대한 모험 같아! 즐기면서 해야\n진짜 좋은 곳을 발견할 수 있다고 믿어.',
    tutorialNumber: 1,
  },
  {
    id: 1,
    name: '도치',
    image: require('@/assets/images/docci.png'),
    description:
      '안녕, 나는 도치야!\n나는 뭐든지 꼼꼼하게 살펴보고 신중하게 결정하는 스타일이야. 집을 고를 때도 작은 것도 놓치지 않으려고 하나하나 따져봐야해.',
    tutorialNumber: 2,
  },
  {
    id: 2,
    name: '토리',
    image: require('@/assets/images/tori.png'),
    description:
      '안녕 안녕! 나는 토리라고 해!\n나는 새로운 이웃을 만나고 이야기 나누는 걸 정말 좋아해! 집을 찾을 때도, 자취할 때도, 혼자보다는 같이 하는게 훨씬 재밌을거야!',
    tutorialNumber: 3,
  },
];

export default function CharacterSelection() {
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [isCharacterSelected, setIsCharacterSelected] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState('');
  const [isNicknameCompleted, setIsNicknameCompleted] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
  const currentCharacter = characters[currentCharacterIndex];

  useEffect(() => {
    console.log('=== CharacterSelection 화면 로드됨 ===');
    return () => {
      console.log('=== CharacterSelection 화면 언마운트 ===');
    };
  }, []);

  const handleCharacterSelect = () => {
    // 캐릭터 선택 완료 처리
    console.log('캐릭터 선택됨:', currentCharacter.name);
    setIsCharacterSelected(true);

    // 3초 후 닉네임 설정 모달 표시
    setTimeout(() => {
      setShowNicknameModal(true);
    }, 3000);
  };

  const handleNicknameComplete = () => {
    if (nickname.trim()) {
      console.log('닉네임 설정 완료:', nickname);
      setIsNicknameCompleted(true);
      setShowNicknameModal(false);

      // 3초 후 환영 화면 표시
      setTimeout(() => {
        setShowWelcomeScreen(true);

        // 환영 화면 표시 후 3초 뒤에 메인 화면으로 이동
        setTimeout(() => {
          router.replace('/main/mypage');
        }, 3000);
      }, 3000);
    }
  };

  const handleNext = () => {
    // 다음 캐릭터로 이동
    const nextIndex = (currentCharacterIndex + 1) % characters.length;
    setCurrentCharacterIndex(nextIndex);
  };

  const handlePrevious = () => {
    // 이전 캐릭터로 이동
    const prevIndex =
      currentCharacterIndex === 0 ? characters.length - 1 : currentCharacterIndex - 1;
    setCurrentCharacterIndex(prevIndex);
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 */}
      <Image
        source={require('@/assets/images/charselec.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* 캐릭터 이미지 */}
      <View style={styles.characterContainer}>
        {/* 캐릭터 선택 전에만 화살표 표시 */}
        {!isCharacterSelected && (
          <>
            {/* 이전 버튼 */}
            <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
              <Svg width="23" height="42" viewBox="0 0 23 42" fill="none">
                <Path
                  d="M20 3L3.5 21L20 39"
                  stroke="white"
                  strokeWidth="5.42783"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            {/* 다음 버튼 */}
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Svg width="23" height="42" viewBox="0 0 23 42" fill="none">
                <Path
                  d="M3 3L19.5 21L3 39"
                  stroke="white"
                  strokeWidth="5.42783"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </>
        )}

        <Image source={currentCharacter.image} style={styles.characterImage} resizeMode="contain" />
      </View>

      {/* 캐릭터 설명 박스 - 캐릭터 선택 전에만 표시 */}
      {!isCharacterSelected && (
        <View style={styles.descriptionBox}>
          <Text style={styles.characterName}>{currentCharacter.name}</Text>
          <Text style={styles.characterDescription}>{currentCharacter.description}</Text>
        </View>
      )}

      {/* 캐릭터 선택 버튼 - 캐릭터 선택 전에만 표시 */}
      {!isCharacterSelected && (
        <TouchableOpacity
          style={styles.selectButton}
          onPress={handleCharacterSelect}
          activeOpacity={0.8}
        >
          <Text style={styles.selectButtonText}>캐릭터 선택하기</Text>
        </TouchableOpacity>
      )}

      {/* 선택된 캐릭터 하단 박스 */}
      {isCharacterSelected && (
        <View style={styles.selectedCharacterBox}>
          <Text style={styles.selectedCharacterText}>
            {isNicknameCompleted ? (
              <>
                <Text style={styles.nicknameText}>'{nickname}'</Text>
                <Text>
                  {' '}
                  멋진 이름이네!{'\n'}우리 앞으로 집 찾을 때도, 자취할 때도{'\n'}같이 해결해나가자
                  :)
                </Text>
              </>
            ) : (
              '우와! 안녕!\n우리 잘 지내보자! 이름도 정해볼까?'
            )}
          </Text>
        </View>
      )}

      {/* 닉네임 설정 모달 */}
      {showNicknameModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.nicknameContainer}>
            <View style={styles.nicknameBox}>
              <TextInput
                style={styles.nicknameInput}
                placeholder="닉네임 설정하기"
                placeholderTextColor="#AAA"
                value={nickname}
                onChangeText={setNickname}
                autoFocus={true}
              />
              <TouchableOpacity
                style={styles.completeButton}
                onPress={handleNicknameComplete}
                disabled={!nickname.trim()}
              >
                <Text
                  style={[
                    styles.completeButtonText,
                    { color: nickname.trim() ? COLORS.primary : '#636363' },
                  ]}
                >
                  완료
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* 환영 화면 */}
      {showWelcomeScreen && (
        <View style={styles.welcomeOverlay}>
          {/* 환영 텍스트 */}
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeSubtitle}>환영합니다</Text>
            <Text style={styles.welcomeTitle}>캠퍼스하우스에 오신걸 환영해요!</Text>
          </View>

          {/* 캐릭터들 이미지 */}
          <View style={styles.charactersContainer}>
            <Image
              source={require('@/assets/images/helloracoon.png')}
              style={[styles.welcomeCharacterImage, styles.leftCharacter]}
              resizeMode="contain"
            />
            <Image
              source={require('@/assets/images/docci.png')}
              style={[styles.welcomeCharacterImage, styles.centerCharacter]}
              resizeMode="contain"
            />
            <Image
              source={require('@/assets/images/tori.png')}
              style={[styles.welcomeCharacterImage, styles.rightCharacter]}
              resizeMode="contain"
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    width,
    height,
    top: 0,
    left: 0,
  },
  title: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#636363',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  characterContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -109.5 }, { translateY: -101 }], // 캐릭터 이미지의 절반 크기만큼 이동
    alignItems: 'center',
  },
  characterImage: {
    width: 219,
    height: 202,
    flexShrink: 0,
  },
  previousButton: {
    position: 'absolute',
    left: -50,
    top: '50%',
    transform: [{ translateY: -18 }], // 버튼 높이의 절반만큼 이동
    width: 16.5,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    position: 'absolute',
    right: -50,
    top: '50%',
    transform: [{ translateY: -18 }], // 버튼 높이의 절반만큼 이동
    width: 16.5,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionBox: {
    position: 'absolute',
    bottom: 120,
    left: (width - 337) / 2, // 화면 중앙에 위치
    width: 337,
    height: 181,
    backgroundColor: '#FFF',
    borderRadius: 26,
    padding: 20,
    alignItems: 'center',
  },
  characterName: {
    width: 74,
    height: 30,
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 10,
  },
  characterDescription: {
    width: 278,
    height: 100,
    color: '#636363',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 25,
    textAlign: 'left',
  },
  selectButton: {
    position: 'absolute',
    bottom: 40,
    left: (width - 337) / 2, // 화면 중앙에 위치
    width: 337,
    height: 65,
    backgroundColor: '#FFF',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    textAlign: 'center',
  },
  selectedCharacterBox: {
    position: 'absolute',
    bottom: 80,
    left: (width - 337) / 2, // 화면 중앙에 위치
    width: 337,
    height: 127,
    backgroundColor: '#FFF',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedCharacterText: {
    color: '#636363',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 25,
    textAlign: 'left',
  },
  nicknameText: {
    color: '#636363',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: '700', // 볼드체
    lineHeight: 25,
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
  nicknameContainer: {
    width,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  nicknameBox: {
    width: 337,
    height: 64.708,
    backgroundColor: '#FFF',
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nicknameInput: {
    flex: 1,
    height: 25,
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 22,
    color: '#000',
  },
  completeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  completeButtonText: {
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 21.495,
  },
  welcomeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTextContainer: {
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeSubtitle: {
    color: '#FF0000',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  welcomeTitle: {
    color: '#000000',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 32,
  },
  charactersContainer: {
    position: 'absolute',
    bottom: '15%',
    left: 0,
    right: 0,
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: 40,
  },
  welcomeCharacterImage: {
    width: 80,
    height: 80,
  },
  leftCharacter: {
    marginRight: 20,
  },
  centerCharacter: {
    marginHorizontal: 10,
  },
  rightCharacter: {
    marginLeft: 20,
  },
});
