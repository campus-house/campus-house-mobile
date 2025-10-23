import React from 'react';
import { View, Text, StyleSheet, Modal, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

interface AiResultModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AiResultModal({ visible, onClose }: AiResultModalProps) {
  const insets = useSafeAreaInsets();
  const [bookmarkedCards, setBookmarkedCards] = React.useState<Set<number>>(new Set());

  const toggleBookmark = (cardIndex: number) => {
    setBookmarkedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardIndex)) {
        newSet.delete(cardIndex);
      } else {
        newSet.add(cardIndex);
      }
      return newSet;
    });
  };

  const recommendData = [
    { id: 0, title: '아이파크', rating: 4.3, tags: ['#친절한 집주인', '#가성비'] },
    { id: 1, title: '마이온', rating: 4.0, tags: ['#학교 도보 5분 이내'] },
    { id: 2, title: '마크라위', rating: 4.8, tags: ['#주차장 O', '#소음 X'] },
    { id: 3, title: '아이시티', rating: 4.5, tags: ['#편의시설 O', '#가성비'] },
  ];

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        {/* 헤더 */}
        <View style={[styles.header, { paddingTop: 73 }]}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Svg width="13" height="22" viewBox="0 0 13 22" fill="none">
              <Path
                d="M11.8438 1.54883L2.21993 10.8762C2.01507 11.0748 2.01759 11.4042 2.22548 11.5996L11.8438 20.6397"
                stroke="#AAAAAA"
                strokeWidth="2.27273"
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>AI 추천</Text>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
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
          <Text style={styles.title}>미오님만의 집 추천</Text>

          {/* 말풍선과 이미지 영역 */}
          <View style={styles.imageSection}>
            {/* 말풍선 */}
            <View style={styles.speechBubble}>
              <Svg width="167" height="46" viewBox="0 0 167 46" fill="none" style={styles.speechBubbleSvg}>
                <Path
                  d="M147.35 0C158.202 0.000181839 167 8.79788 167 19.6504C167 30.5029 158.202 39.3006 147.35 39.3008H94.3613C94.3156 39.3507 94.269 39.4007 94.2197 39.4492L88.7363 44.8447C86.9624 46.5904 84.0667 46.1523 83.2734 44.0186L81.5195 39.3008H19.6504C8.79776 39.3007 0 30.503 0 19.6504C6.49447e-05 8.79781 8.79781 6.46919e-05 19.6504 0H147.35Z"
                  fill="white"
                />
              </Svg>
              <Text style={styles.speechBubbleText}>이 집은 어떠신가요?</Text>
            </View>

            {/* 고슴도치 이미지 */}
            <Image
              source={require('@/assets/images/hedgehog-scrap2.png')}
              style={styles.hedgehogImage}
              resizeMode="contain"
            />
          </View>

          {/* 추천 카드 영역 */}
          <View style={styles.recommendContainer}>
            <View style={styles.recommendGrid}>
              {recommendData.map((item) => (
                <View key={item.id} style={styles.recommendCard}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.recommendCardTitle}>{item.title}</Text>
                    <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
                      <Svg width="19" height="22" viewBox="0 0 19 22" fill="none">
                        <Path
                          d="M17.1464 1H1.85458C1.38276 1 1.00043 1.38277 1.00095 1.85458L1.02097 19.8141C1.02162 20.3972 1.59369 20.8081 2.14643 20.6224L9.21733 18.2471C9.39326 18.188 9.58365 18.1878 9.75968 18.2466L16.8758 20.6244C17.4287 20.8091 18 20.3977 18 19.8148V1.85363C18 1.38218 17.6178 1 17.1464 1Z"
                          stroke="#FF805F"
                          strokeWidth="1.53654"
                          fill={bookmarkedCards.has(item.id) ? "#FF805F" : "none"}
                        />
                      </Svg>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <Path
                        d="M7.93635 1.68256C8.2271 0.743624 9.55611 0.743621 9.84685 1.68256L11.1189 5.7904C11.2485 6.20913 11.6358 6.4946 12.0741 6.4946L16.289 6.4946C17.246 6.4946 17.6564 7.70964 16.8953 8.28986L13.4039 10.9516C13.0701 11.206 12.9307 11.6417 13.0549 12.0426L14.3687 16.2856C14.6567 17.2155 13.5813 17.9668 12.8072 17.3767L9.49787 14.8538C9.13979 14.5808 8.64341 14.5808 8.28533 14.8538L4.97599 17.3767C4.20188 17.9668 3.12654 17.2155 3.41447 16.2856L4.72832 12.0426C4.85245 11.6417 4.71308 11.206 4.37934 10.9516L0.887932 8.28986C0.126844 7.70963 0.537172 6.4946 1.49421 6.4946L5.70909 6.4946C6.14744 6.4946 6.53468 6.20913 6.66434 5.7904L7.93635 1.68256Z"
                        fill="#FFD429"
                      />
                    </Svg>
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  <View style={styles.tagContainer}>
                    {item.tags.map((tag, index) => (
                      <Text key={index} style={styles.tagText}>{tag}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* 하단 버튼 */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.resetButton}>
                <Svg width="19" height="17" viewBox="0 0 19 17" fill="none">
                  <Path
                    d="M15.3314 9.09303C15.1746 10.5579 14.7027 11.8688 13.7406 12.9845C12.7786 14.1002 11.4995 14.8964 10.0736 15.2669C8.64776 15.6375 7.14286 15.5649 5.75932 15.0588C4.37577 14.5526 3.17924 13.637 2.32906 12.4339C1.47889 11.2308 1.01542 9.79717 1.00038 8.32403C0.985336 6.8509 1.41943 5.40814 2.24486 4.18789C3.07029 2.96763 4.24788 2.0278 5.6208 1.49354C6.99372 0.959282 8.49682 0.855955 9.92994 1.19732"
                    stroke="#FF805F"
                    strokeWidth="1.81"
                    strokeLinecap="round"
                  />
                  <Path
                    d="M11.8148 10.7795L15.8717 7.92577L17.8292 12.1949"
                    stroke="#FF805F"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </Svg>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 15,
    minHeight: 50,
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 35,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 50,
    paddingTop: 5,
  },
  imageSection: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 0,
  },
  speechBubble: {
    position: 'absolute',
    top: 20,
    left: '50%',
    transform: [{ translateX: -37.5 }],
    width: 167,
    height: 46,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    zIndex: 10,
  },
  speechBubbleSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  speechBubbleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 19.874,
    zIndex: 2,
  },
  hedgehogImage: {
    width: '105%',
    height: 310,
    alignSelf: 'center',
    marginTop: 0,
  },
  recommendContainer: {
    width: '100%',
    flex: 1,
    borderRadius: 29.5,
    backgroundColor: '#FFF0EC',
    marginTop: -27,
    paddingHorizontal: 20,
    paddingTop: 58,
    paddingBottom: 54,
  },
  recommendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recommendCard: {
    width: '48%',
    height: 146,
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    marginTop: 8,
    paddingHorizontal: 6,
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
    marginTop: 30,
    paddingHorizontal: 6,
  },
  ratingText: {
    fontSize: 17.851,
    fontWeight: '500',  
    color: '#636363',
    fontFamily: 'Pretendard',
    lineHeight: 28.052,
    marginLeft: 5,
    marginTop: 2,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -2,
    paddingHorizontal: 6,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#636363',
    fontFamily: 'Pretendard',
    lineHeight: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 72,
    gap: 16,
  },
  resetButton: {
    width: 91,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  resetButtonText: {
    fontSize: 16.5,
    fontWeight: '700',
    color: '#FF805F',
    fontFamily: 'Pretendard',
    marginLeft: 8,
  },
  saveButton: {
    width: 232,
    height: 56,
    backgroundColor: '#FF805F',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  saveButtonText: {
    fontSize: 16.5,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Pretendard',
  },
});

