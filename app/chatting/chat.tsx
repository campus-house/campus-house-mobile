import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import { COLORS } from '@/constants/colors';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeartButton from '@/components/HeartButton';
import FeedbackText from '@/components/FeedbackText';
import HeartRewardModal from '@/components/HeartRewardModal';
import ChatRewardModal from '@/components/ChatRewardModal';
import ProfileScreen from '@/components/ProfileScreen';
import AttachmentOptionText from '@/components/AttachmentOptionText';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  readCount?: number;
}

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '안녕하세요~!',
      isUser: false,
      timestamp: '오후 18:24',
    },
    {
      id: '2',
      text: '도넛 다 나눔하셨나요?',
      isUser: false,
      timestamp: '오후 18:24',
    },
    {
      id: '3',
      text: '안녕하세용',
      isUser: true,
      timestamp: '오후 18:24',
      readCount: 1,
    },
    {
      id: '4',
      text: '아직 3개 남았습니다!',
      isUser: true,
      timestamp: '오후 18:24',
      readCount: 1,
    },
    {
      id: '5',
      text: '네!!!! 금방 가겠습니다!!',
      isUser: false,
      timestamp: '오후 18:26',
    },
  ]);
  const [showHeartFeedback, setShowHeartFeedback] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showChatRewardModal, setShowChatRewardModal] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  React.useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      },
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? '오후' : '오전';
    const displayHours = hours > 12 ? hours - 12 : hours;
    return `${period} ${displayHours}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        isUser: true,
        timestamp: getCurrentTime(),
        readCount: 1,
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessage('');

      if (!showHeartFeedback) {
        console.log('첫 번째 메시지 전송 - 하트 피드백 표시');
        setShowHeartFeedback(true);
        await AsyncStorage.setItem('hasSentFirstMessage', 'true');
        console.log('hasSentFirstMessage 저장 완료');
      }

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  // 사용자 프로필 화면
  if (showUserProfile) {
    return (
      <ProfileScreen
        onBack={() => {
          console.log('프로필 화면에서 뒤로가기 호출됨');
          setShowUserProfile(false);
        }}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: '#fff' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
        bounces={true}
      >
        <View style={{ width: '100%', paddingTop: 82, paddingBottom: 12, paddingHorizontal: 20 }}>
          <View
            style={{
              position: 'absolute',
              left: 5,
              top: 87,
              height: 32,
              width: 32,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Pressable
              style={{ height: 32, width: 32, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => {
                console.log('채팅 화면에서 뒤로가기 - 모달 표시');
                setShowChatRewardModal(true);
              }}
            >
              <Image
                source={require('@/assets/images/backbutton.png')}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </Pressable>
          </View>
          <Text
            style={{
              width: 78,
              alignSelf: 'center',
              marginTop: 2,
              fontSize: 18,
              lineHeight: 22,
              fontWeight: '600',
              fontFamily: 'Pretendard',
              color: '#000',
              textAlign: 'center',
            }}
          >
            라쿤인데요
          </Text>
          <Pressable
            style={{
              position: 'absolute',
              right: 5,
              top: 89,
              height: 22,
              width: 22,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {}}
          >
            <Image
              source={require('@/assets/images/jum3.png')}
              style={{ width: 18, height: 15 }}
              resizeMode="contain"
            />
          </Pressable>
          <Text
            style={{
              width: 80,
              alignSelf: 'center',
              marginTop: 4,
              fontSize: 14,
              lineHeight: 21,
              fontWeight: '300',
              fontFamily: 'Pretendard',
              color: '#323232',
              textAlign: 'center',
            }}
          >
            보유하트 70개
          </Text>

          {/* 도넛 나눔할게요 카드 */}
          <View style={styles.offerBox}>
            <Image
              source={require('@/assets/images/donut.png')}
              style={styles.offerImage}
              resizeMode="cover"
            />
            <Text style={[styles.offerTitle, { marginTop: -2, marginLeft: -8 }]}>
              도넛 나눔할게요
            </Text>
          </View>

          {/* 구분선 */}
          <View style={styles.offerSeparator} />

          {/* 공지 박스 */}
          <View style={styles.noticeBox}>
            <Image
              source={require('@/assets/images/loudspeaker.png')}
              style={styles.noticeIcon}
              resizeMode="contain"
            />
            <Text style={styles.noticeText}>대화 중 폭언과 비하발언은 삼가해주세요.</Text>
          </View>

          {/* 날짜 텍스트 */}
          <Text style={styles.dateText}>2025년 9월 1일</Text>

          {/* 첫 채팅 버블 - 라쿤 */}
          <View style={[styles.chatRow, { paddingLeft: -22, paddingRight: 50, marginTop: 19 }]}>
            <TouchableOpacity
              onPress={() => {
                console.log('라쿤 아바타 클릭됨 - 프로필 화면으로 이동');
                setShowUserProfile(true);
              }}
              style={{ padding: 10 }}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <View
                style={[
                  styles.greenCircle,
                  { width: 48, height: 48, borderRadius: 24, marginTop: -3 },
                ]}
              >
                <Image
                  source={require('@/assets/images/real-racoon-4x.png')}
                  style={[styles.avatarImage, { width: 47, height: 47 }]}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <View style={[styles.chatBubbleLeft, { marginTop: 5 }]}>
              <Text style={styles.chatBubbleText}>안녕하세요~!</Text>
            </View>
          </View>

          {/* 두 번째 채팅 버블 - 라쿤 */}
          <View style={[styles.chatRow, { paddingLeft: 13, paddingRight: 20, marginTop: 8 }]}>
            <View style={{ width: 54 }} />
            <View style={styles.bubbleWithTime}>
              <View style={[styles.chatBubbleLeft, { marginLeft: -10, marginRight: -10 }]}>
                <Text style={styles.chatBubbleTextWide}>도넛 다 나눔하셨나요?</Text>
              </View>
              <Text style={[styles.timeTextSmallRight, { marginLeft: 10, marginBottom: 0 }]}>
                오후 18:24
              </Text>
            </View>
          </View>

          {/* 사용자 메시지 1 */}
          <View
            style={[
              styles.chatRow,
              { paddingLeft: 50, paddingRight: -22, marginTop: 13, justifyContent: 'flex-end' },
            ]}
          >
            <View style={styles.bubbleWithTimeUser}>
              <Text style={[styles.timeTextSmallLeft, { marginRight: 10, marginBottom: 0 }]}>
                오후 18:24
              </Text>
              <View style={styles.chatBubbleRight}>
                <Text style={styles.chatBubbleTextUser}>안녕하세용</Text>
              </View>
            </View>
          </View>

          {/* 사용자 메시지 2 */}
          <View
            style={[
              styles.chatRow,
              { paddingLeft: 50, paddingRight: -22, marginTop: 13, justifyContent: 'flex-end' },
            ]}
          >
            <View style={styles.bubbleWithTimeUser}>
              <Text style={[styles.timeTextSmallLeft, { marginRight: 10, marginBottom: 0 }]}>
                오후 18:24
              </Text>
              <View style={styles.chatBubbleRight}>
                <Text style={styles.chatBubbleTextUser}>아직 3개 남았습니다!</Text>
              </View>
            </View>
          </View>

          {/* 라쿤 마지막 메시지 */}
          <View style={[styles.chatRow, { paddingLeft: -22, paddingRight: 50, marginTop: 13 }]}>
            <TouchableOpacity
              onPress={() => {
                console.log('라쿤 아바타 클릭됨 - 프로필 화면으로 이동');
                setShowUserProfile(true);
              }}
              style={{ padding: 10 }}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <View style={[styles.greenCircle, { width: 48, height: 48, borderRadius: 24 }]}>
                <Image
                  source={require('@/assets/images/real-racoon-4x.png')}
                  style={[styles.avatarImage, { width: 47, height: 47 }]}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <View style={styles.bubbleWithTime}>
              <View style={styles.chatBubbleLeft}>
                <Text style={styles.chatBubbleTextWide}>네!!!! 금방 가겠습니다!!</Text>
              </View>
              <Text style={[styles.timeTextSmallRight, { marginLeft: 10, marginBottom: 0 }]}>
                오후 18:26
              </Text>
            </View>
          </View>

          {/* 새로 추가되는 사용자 메시지들 */}
          {messages
            .filter((msg) => msg.isUser && parseInt(msg.id) > 5)
            .map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.chatRow,
                  { paddingLeft: 50, paddingRight: -22, marginTop: 13, justifyContent: 'flex-end' },
                ]}
              >
                <View style={styles.bubbleWithTimeUser}>
                  <View style={{ alignItems: 'flex-end' }}>
                    <View
                      style={{
                        width: 8,
                        height: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5,
                        marginRight: 6,
                        transform: [{ translateX: -3 }, { translateY: 9 }],
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          lineHeight: 16,
                          fontFamily: 'Pretendard',
                          color: '#FF805F',
                          textAlign: 'center',
                        }}
                      >
                        1
                      </Text>
                    </View>
                    <Text style={[styles.timeTextSmallLeft, { marginRight: 10, marginBottom: 0 }]}>
                      {msg.timestamp}
                    </Text>
                  </View>
                  <View style={[styles.chatBubbleRight, { maxWidth: '80%' }]}>
                    <Text style={styles.chatBubbleTextUser}>{msg.text}</Text>
                  </View>
                </View>
              </View>
            ))}

          {/* 하트 피드백 시스템 - 첫 번째 사용자 메시지 전송 후에만 표시 */}
          {showHeartFeedback && (
            <View style={styles.heartFeedbackContainer}>
              <View style={styles.heartFeedbackContent}>
                <View style={styles.heartButtonContainer}>
                  <HeartButton
                    onPress={() => {
                      console.log('하트 버튼 클릭됨');
                      setShowRewardModal(true);
                    }}
                  />
                </View>
                <FeedbackText />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 하트 리워드 모달 */}
      <HeartRewardModal visible={showRewardModal} onClose={() => setShowRewardModal(false)} />

      {/* 채팅 리워드 모달 */}
      <ChatRewardModal
        visible={showChatRewardModal}
        onClose={() => {
          setShowChatRewardModal(false);
          setTimeout(() => {
            router.back();
          }, 100);
        }}
      />

      {/* 입력 바 */}
      <View
        style={[
          styles.inputBar,
          {
            bottom: showAttachmentOptions
              ? isKeyboardVisible
                ? 125
                : 130
              : isKeyboardVisible
                ? 25
                : 30,
          },
        ]}
      >
        <Pressable
          style={styles.plusButton}
          onPress={() => setShowAttachmentOptions(!showAttachmentOptions)}
        >
          {showAttachmentOptions ? (
            <Text style={styles.xText}>×</Text>
          ) : (
            <Text style={styles.plusText}>+</Text>
          )}
        </Pressable>
        <View style={styles.inputFieldBox}>
          <TextInput
            style={styles.textInput}
            placeholder="메시지를 입력해주세요."
            placeholderTextColor="#aaa"
            value={message}
            onChangeText={setMessage}
            multiline={false}
            returnKeyType="send"
            onSubmitEditing={handleSendMessage}
          />
          <Pressable style={styles.sendButton} onPress={handleSendMessage}>
            <Image
              source={require('@/assets/images/sendbutton2x.png')}
              style={{ width: 42, height: 42 }}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>

      {/* 첨부 옵션들 */}
      {showAttachmentOptions && (
        <View style={styles.attachmentOptions}>
          <View style={styles.attachmentRow}>
            <View style={styles.attachmentItem}>
              <View style={styles.attachmentIconContainer}>
                <Image
                  source={require('@/assets/images/camerabutton.png')}
                  style={styles.attachmentIcon}
                  resizeMode="contain"
                />
              </View>
              <AttachmentOptionText text="카메라" />
            </View>

            <View style={styles.attachmentItem}>
              <View style={styles.attachmentIconContainer}>
                <Image
                  source={require('@/assets/images/picturebutton.png')}
                  style={styles.attachmentIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.albumTextContainer}>
                <AttachmentOptionText text="앨범" style={{ marginLeft: 6 }} />
              </View>
            </View>

            <View style={styles.attachmentItem}>
              <View style={styles.attachmentIconContainer}>
                <Image
                  source={require('@/assets/images/mapbutton.png')}
                  style={styles.attachmentIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.locationTextContainer}>
                <AttachmentOptionText text="장소" style={{ marginLeft: 6 }} />
              </View>
            </View>

            <View style={styles.attachmentItem}>
              <View style={styles.attachmentIconContainer}>
                <Image
                  source={require('@/assets/images/schedulebutton.png')}
                  style={styles.attachmentIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.appointmentTextContainer}>
                <AttachmentOptionText text="약속" style={{ marginLeft: 6 }} />
              </View>
            </View>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
  },
  offerBox: {
    marginTop: 18,
    height: 55,
    borderWidth: 1.2,
    borderColor: '#f2f2f2',
    backgroundColor: '#fcfcfc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 43,
    alignSelf: 'center',
  },
  offerImage: {
    width: 41,
    height: 41,
    borderRadius: 8,
    marginRight: 23,
    marginTop: 4,
  },
  offerTitle: {
    width: 102,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'center',
  },
  noticeBox: {
    marginTop: 24,
    height: 45,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  noticeIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  noticeText: {
    width: 208,
    fontSize: 13,
    lineHeight: 22,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
  },
  dateText: {
    width: '100%',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Pretendard',
    color: '#636363',
    textAlign: 'center',
    alignSelf: 'stretch',
    marginTop: 22,
  },
  offerSeparator: {
    height: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 20,
    marginHorizontal: -20,
    width: 'auto',
    alignSelf: 'stretch',
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 14,
  },
  greenCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#86d382',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 55,
    height: 55,
    transform: [{ translateY: 5 }, { translateX: 0 }],
  },
  chatBubbleLeft: {
    backgroundColor: '#f2f2f2',
    height: 42,
    borderRadius: 21,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginLeft: 12,
    justifyContent: 'center',
  },
  chatBubbleText: {
    width: 79,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
  },
  chatBubbleTextWide: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
  },
  bubbleWithTime: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bubbleWithTimeUser: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  timeTextSmallRight: {
    width: 54,
    fontSize: 12,
    lineHeight: 22,
    fontFamily: 'Pretendard',
    color: '#aaa',
    textAlign: 'left',
    marginLeft: 10,
    marginBottom: 0,
  },
  timeTextSmallLeft: {
    width: 54,
    fontSize: 12,
    lineHeight: 22,
    fontFamily: 'Pretendard',
    color: '#aaa',
    textAlign: 'right',
    marginRight: 10,
    marginBottom: 0,
  },
  chatBubbleRight: {
    backgroundColor: '#FF805F',
    height: 42,
    borderRadius: 21,
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  chatBubbleTextUser: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Pretendard',
    color: '#fff',
    textAlign: 'left',
  },
  inputBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },
  plusButton: {
    width: 51,
    height: 51,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: 36,
    lineHeight: 36,
    color: '#aaa',
  },
  xText: {
    fontSize: 36,
    lineHeight: 36,
    color: '#aaa',
  },
  inputFieldBox: {
    flex: 1,
    height: 62,
    backgroundColor: '#f2f2f2',
    borderRadius: 31,
    marginHorizontal: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
    height: 26,
    flex: 1,
    marginRight: 8,
    marginTop: -2,
    marginLeft: 7,
  },
  sendButton: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachmentOptions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  attachmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  attachmentItem: {
    alignItems: 'center',
    flex: 1,
  },
  attachmentIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#f2f2f2',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  attachmentIcon: {
    width: 45,
    height: 45,
  },
  albumTextContainer: {
    marginLeft: 7,
  },
  locationTextContainer: {
    marginLeft: 7,
  },
  appointmentTextContainer: {
    marginLeft: 7,
  },
  heartFeedbackContainer: {
    backgroundColor: 'rgba(255, 204, 0, 0.22)',
    width: '100%',
    height: 79,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 60,
    borderRadius: 12,
  },
  heartFeedbackContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartButtonContainer: {
    marginRight: 10,
    marginLeft: -40,
    width: 25,
    height: 25,
  },
});
