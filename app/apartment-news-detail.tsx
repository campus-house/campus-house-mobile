import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { router } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

// 댓글 타입 정의
type Comment = {
  id: number;
  author: string;
  profileImage: any;
  time: string;
  content: string;
  replies?: Comment[];
};

export default function ApartmentNewsDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(18);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [commentInputVisible, setCommentInputVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: '말하는감자',
      profileImage: require('@/assets/images/ramjui.png'),
      time: '10분 전',
      content: '저요!!!!!!!!!!!!!',
      replies: [
        {
          id: 3,
          author: '찹쌀떡',
          profileImage: require('@/assets/images/ramjui.png'),
          time: '5분 전',
          content: '저 지금 가겠습니다.',
        },
      ],
    },
    {
      id: 2,
      author: '찹쌀떡',
      profileImage: require('@/assets/images/ramjui.png'),
      time: '5분 전',
      content: '저 지금 가겠습니다.',
    },
  ]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setBookmarkCount(isBookmarked ? bookmarkCount - 1 : bookmarkCount + 1);
  };

  // 전체 댓글 개수 계산 (대댓글 포함)
  const getTotalCommentCount = () => {
    return comments.reduce((total, comment) => {
      return total + 1 + (comment.replies ? comment.replies.length : 0);
    }, 0);
  };

  // 키보드 이벤트 리스너
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now(),
        author: '나',
        profileImage: require('@/assets/images/ramjui.png'),
        time: '방금 전',
        content: commentText.trim(),
      };

      if (replyingTo) {
        // 대댓글 추가
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === replyingTo
              ? {
                  ...comment,
                  replies: [...(comment.replies || []), newComment],
                }
              : comment
          )
        );
        setReplyingTo(null);
      } else {
        // 일반 댓글 추가
        setComments((prev) => [...prev, newComment]);
      }

      setCommentText('');
      setCommentInputVisible(false);
    }
  };

  const handleReplyPress = (commentId: number) => {
    setReplyingTo(commentId);
    setCommentInputVisible(true);
  };

  const renderComment = (comment: Comment, isReply = false, isNestedReply = false) => (
    <View key={comment.id} style={[styles.commentWrapper, isReply && styles.replyWrapper]}>
      <View style={styles.commentContainer}>
        {/* 대댓글 화살표 */}
        {isReply && (
          <View style={styles.replyArrowContainer}>
            <Svg width="20" height="24" viewBox="0 0 20 24" fill="none">
              <Path
                d="M0.850098 0.849609V16.4825C0.850098 18.1521 2.20356 19.5055 3.87313 19.5055H18.1958"
                stroke="#AAAAAA"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <Path
                d="M15.3491 15.7363L18.1839 18.976C18.5502 19.3947 18.5044 20.0318 18.0821 20.3938L15.3491 22.7363"
                stroke="#AAAAAA"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </Svg>
          </View>
        )}
        
        {/* 프로필 사진 */}
        <View style={styles.commentProfileContainer}>
          <Image source={comment.profileImage} style={styles.commentProfileImage} />
        </View>
        
        {/* 댓글 내용 */}
        <View style={styles.commentContentContainer}>
          {/* 닉네임과 시간 */}
          <View style={styles.commentHeaderRow}>
            <Text style={styles.commentAuthorName}>{comment.author}</Text>
            <Text style={styles.commentTimeText}>{comment.time}</Text>
          </View>
          
          {/* 댓글 내용과 댓글 달기 버튼 */}
          <View style={styles.commentTextRow}>
            <Text style={styles.commentContentText}>{comment.content}</Text>
            {!isReply && (
              <TouchableOpacity 
                style={styles.replyButton}
                onPress={() => handleReplyPress(comment.id)}
              >
                <Text style={styles.replyButtonText}>댓글 달기</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      
      {/* 대댓글들 */}
      {comment.replies && comment.replies.map((reply) => renderComment(reply, true))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

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

        {/* 중앙 타이틀 */}
        <Text style={styles.headerTitle}>아파트소식</Text>

        {/* 점 세개 메뉴 버튼 */}
        <TouchableOpacity style={styles.menuButton}>
          <Svg width="4" height="16" viewBox="0 0 4 16" fill="none">
            <Circle cx="1.68359" cy="1.5" r="1.5" fill="#323232" />
            <Circle cx="1.68359" cy="7.96924" r="1.5" fill="#323232" />
            <Circle cx="1.68359" cy="14.4385" r="1.5" fill="#323232" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* 스크롤 가능한 메인 콘텐츠 */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 메인 이미지 */}
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/donut.png')}
            style={styles.mainImage}
            resizeMode="cover"
          />
        </View>

        {/* 콘텐츠 영역 */}
        <View style={styles.contentContainer}>
          {/* 작성자 정보 */}
          <View style={styles.authorInfo}>
            <View style={styles.profileImage}>
              <Image
                source={require('@/assets/images/ramjui.png')}
                style={styles.profileImageInner}
              />
            </View>
            <View style={styles.authorDetails}>
              <View style={styles.authorNameRow}>
                <Text style={styles.authorName}>빵미오</Text>
                <Text style={styles.timeInfo}>1시간 전</Text>
              </View>
              <Text style={styles.dateInfo}>2025.09.01</Text>
            </View>
            <TouchableOpacity style={styles.chatButton}>
              <Text style={styles.chatButtonText}>채팅</Text>
            </TouchableOpacity>
          </View>

          {/* 제목 */}
          <Text style={styles.title}>도넛 나눔할게요</Text>

          {/* 내용 */}
          <Text style={styles.content}>
            도넛을 너무 많이 구매해서 6분께 드리려고 해요! 오늘까지 아이파크 앞으로 와 주시면
            드리겠습니다!
          </Text>

          {/* 액션 버튼들 */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
              <Svg width="19" height="16" viewBox="0 0 19 16" style={styles.actionIcon}>
                <Path
                  d="M1.94824 1.76562C3.78556 -0.130104 6.76425 -0.130118 8.60156 1.76562L9.50586 2.69922L10.4111 1.7666C12.2485 -0.129148 15.2281 -0.129148 17.0654 1.7666C18.9025 3.66233 18.9026 6.73615 17.0654 8.63184L16.1602 9.56445L16.1621 9.56641L10.8516 15.0469C10.5734 15.3338 10.2302 15.5133 9.87109 15.585C9.27164 15.7062 8.62656 15.527 8.16211 15.0479L2.85059 9.56738L2.85254 9.56445L1.94824 8.63086C0.110923 6.73511 0.110923 3.66137 1.94824 1.76562Z"
                  stroke={isLiked ? '#FF805F' : '#AAAAAA'}
                  strokeWidth="1.483"
                  fill="none"
                />
              </Svg>
              <Text style={[styles.actionText, { color: isLiked ? '#FF805F' : '#AAA' }]}>
                {likeCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleBookmark}>
              <Svg width="14" height="16" viewBox="0 0 14 16" style={styles.actionIcon}>
                <Path
                  d="M11.1297 1H2.76228C2.03516 1 1.44592 1.58985 1.44667 2.31697L1.45845 13.7494C1.45907 14.3576 2.06346 14.7806 2.63509 14.5729L6.73478 13.083C6.86597 13.0353 7.00973 13.0352 7.141 13.0826L11.2701 14.5752C11.8418 14.7819 12.4453 14.3583 12.4453 13.7503V2.31561C12.4453 1.58902 11.8563 1 11.1297 1Z"
                  stroke={isBookmarked ? '#FF805F' : '#AAAAAA'}
                  strokeWidth="1.38133"
                  fill="none"
                />
              </Svg>
              <Text style={[styles.actionText, { color: isBookmarked ? '#FF805F' : '#AAA' }]}>
                {bookmarkCount}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 구분선 */}
          <View style={styles.dividerContainer}>
            <Svg width="394" height="10" viewBox="0 0 394 10" fill="none">
              <Path d="M-10.6562 4.96875L405.709 5.07242" stroke="#F9F9F9" strokeWidth="9.5" />
            </Svg>
          </View>

          {/* 댓글 섹션 */}
          <View style={styles.commentsSection}>
            {/* 댓글 헤더 */}
            <View style={styles.commentsHeader}>
              <View style={styles.commentsTitleContainer}>
                <Text style={styles.commentsTitle}>댓글</Text>
                <Text style={styles.commentsCount}>{getTotalCommentCount()}</Text>
              </View>
            </View>

            {/* 댓글 목록 */}
            <View style={styles.commentsList}>
              {comments.map((comment, index) => (
                <View key={comment.id}>
                  {renderComment(comment)}
                  {index < comments.length - 1 && (
                    <View style={styles.commentDividerContainer}>
                      <Svg width="393" height="2" viewBox="0 0 393 2" fill="none">
                        <Path d="M-11.1562 0.5L405.209 0.603665" stroke="#F2F2F2" strokeWidth="1" />
                      </Svg>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 기본 댓글 입력창 */}
      <View style={[styles.commentInputWrapper, { transform: [{ translateY: -keyboardHeight }] }]}>
        <View style={styles.commentInputContainer}>
          {/* 프로필 사진 */}
          <View style={styles.inputProfileContainer}>
            <Image source={require('@/assets/images/ramjui.png')} style={styles.inputProfileImage} />
          </View>
          
          {/* 댓글 입력 필드 */}
          <TextInput
            style={styles.commentInput}
            placeholder="댓글을 남겨주세요"
            placeholderTextColor="#AAA"
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          
          {/* 보내기 버튼 */}
          <TouchableOpacity style={[styles.sendButton, commentText.trim() ? styles.sendButtonActive : styles.sendButtonInactive]} onPress={handleCommentSubmit}>
            <Svg width="28" height="42" viewBox="0 0 28 42" fill="none">
              <Path
                d="M25.4832 19.0528C25.9407 19.2745 25.7505 20.0227 25.233 20.037L3.99357 20.6233C3.75612 20.6299 3.56152 20.4533 3.53377 20.2061L2.24214 8.70309C2.19642 8.29587 2.60625 7.96861 2.95208 8.13617L25.4832 19.0528Z"
                fill={commentText.trim() ? "#FF805F" : "#AAAAAA"}
              />
              <Path
                d="M25.5373 22.2231C25.9832 21.9721 25.752 21.241 25.2328 21.2606L3.9988 22.0609C3.76126 22.0698 3.57601 22.2569 3.56039 22.5036L2.82786 34.0726C2.80194 34.4821 3.2321 34.783 3.5707 34.5924L25.5373 22.2231Z"
                fill={commentText.trim() ? "#FF805F" : "#AAAAAA"}
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  menuButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    width,
    height: 300,
    backgroundColor: '#F5F5F5',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 20,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFD429',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    marginTop: 5,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginRight: 8,
  },
  timeInfo: {
    fontSize: 12,
    color: '#AAA',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  dateInfo: {
    fontSize: 12,
    color: '#636363',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginTop: -3,
  },
  chatButton: {
    display: 'flex',
    width: 91.395,
    height: 38.171,
    paddingVertical: 8,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
    borderRadius: 16.77,
    backgroundColor: '#FF805F',
  },
  chatButtonText: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 28,
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 24,
    marginBottom: 50,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionIcon: {
    // 아이콘 스타일
  },
  actionText: {
    fontSize: 14,
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    lineHeight: 20,
  },
  dividerContainer: {
    width: 416.365,
    height: 0,
    transform: [{ rotate: '0.014deg' }],
    flexShrink: 0,
    marginTop: 20,
    alignSelf: 'center',
  },
  commentsSection: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 0,
  },
  commentsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: -10,
  },
  commentsTitle: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22.959,
  },
  commentsCount: {
    color: '#FF805F',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22.959,
    marginLeft: 5,
  },
  commentsList: {
    marginBottom: 20,
    marginTop: 10,
  },
  commentWrapper: {
    marginBottom: 16,
  },
  replyWrapper: {
    marginLeft: 20,
    marginBottom: 8,
    marginTop: 16,
  },
  replyArrowContainer: {
    width: 20,
    height: 24,
    marginRight: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  commentProfileContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#FF805F',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  commentProfileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  commentContentContainer: {
    flex: 1,
    marginTop: -2,
  },
  commentHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 2,
  },
  commentAuthorName: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24.822,
    marginRight: 8,
  },
  commentTimeText: {
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24.822,
  },
  commentTextRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: -16,
    position: 'relative',
  },
  commentContentText: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 14.6,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24.822,
    flex: 1,
    marginRight: 8,
    marginTop: 4,
  },
  replyButton: {
    display: 'flex',
    width: 73,
    height: 31,
    padding: 1.212,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12.117,
    flexShrink: 0,
    borderRadius: 11.5,
    backgroundColor: '#F2F2F2',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  replyButtonText: {
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 17.298,
  },
  commentAvatarContainer: {
    width: 45,
    height: 45,
    flexShrink: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  commentHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAuthor: {
    color: '#323232',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24.822,
    marginRight: 8,
  },
  commentTime: {
    color: '#AAA',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24.822,
  },
  commentText: {
    color: '#323232',
    textAlign: 'left',
    fontFamily: 'Pretendard',
    fontSize: 14.6,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 8,
  },
  commentDividerContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  commentInputWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  commentInputContainer: {
    width: '100%',
    height: 65,
    flexShrink: 0,
    borderRadius: 27.715,
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputProfileContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#FF805F',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  inputProfileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  commentInput: {
    flex: 1,
    color: '#323232',
    textAlign: 'left',
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 21.495,
    minHeight: 25.536,
    paddingVertical: 0,
    textAlignVertical: 'center',
  },
  sendButton: {
    width: 27.39,
    height: 41.513,
    marginLeft: 10,
  },
  commentInputActive: {
    color: '#323232',
  },
  sendButtonActive: {
    // 활성화 상태 (주황색)
  },
  sendButtonInactive: {
    // 비활성화 상태 (회색)
  },
});