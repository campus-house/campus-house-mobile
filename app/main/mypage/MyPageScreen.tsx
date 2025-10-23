import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Vector124 from '@/components/Vector124';
import Vector123 from '@/components/Vector123';
import Vector119 from '@/components/Vector119';
import { router } from 'expo-router';
import BellIcon from '@/components/Icon/BellIcon';
import ShopIcon from '@/components/Icon/ShopIcon';
import SettingIcon from '@/components/Icon/SettingIcon';

export default function MyPageScreen() {
  const { width: screenWidth } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  
  // 하단바 스타일을 메인과 동일하게 설정
  useFocusEffect(
    React.useCallback(() => {
      const parent = navigation.getParent?.();
      parent?.setOptions({ 
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 105,
          width: 393,
          backgroundColor: '#FFF',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          shadowColor: '#000',
          shadowOffset: { width: -1.5, height: -4.5 },
          shadowOpacity: 0.03,
          shadowRadius: 4,
          elevation: 5,
          justifyContent: 'space-evenly',
          paddingHorizontal: 14,
        }
      });
      return () => {
        parent?.setOptions({ tabBarStyle: undefined });
      };
    }, [navigation])
  );
  
  // 하드코딩된 프로필 데이터
  const name = '방미오';
  const intro = '이번에 이사온 미오라고해요!! ^~^';
  
  // 알림 상태 (true면 주황색 점 표시)
  const [hasNotification, setHasNotification] = React.useState(true);


  return (
    <View style={styles.root}>
      {/* 상단을 좌/우 배경대로 덮는 스플릿 노란 배경 (안전영역 포함) */}
      <View style={[styles.topBackgroundWalls, { top: 0, height: insets.top + 240 }]} pointerEvents="none">
        <View style={styles.leftTopBackground}><Vector124 /></View>
        <View style={styles.rightTopBackground}><Vector123 /></View>
      </View>
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 60, paddingBottom: 120 }}>
        {/* 상단 헤더 영역 */}
        <View style={styles.headerSection}>
          {/* 주소 정보 */}
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle} numberOfLines={1} ellipsizeMode="clip">아이파크 803호</Text>
            <Text style={styles.addressSubtitle}>영통구 효원로 407</Text>
          </View>
          
          {/* 우측 아이콘들 */}
          <View style={styles.headerIcons}>
            <TouchableOpacity style={[styles.iconButton, styles.iconWrapper]} onPress={() => router.push('/main/mypage/alerts')}>
              <BellIcon hasNotification={hasNotification} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, styles.iconWrapper]}>
              <ShopIcon />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconButton, styles.iconWrapper, { zIndex: 10000 }]}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => router.push('/main/mypage/settings')}
            >
              <SettingIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* 라쿤 캐릭터와 배경 */}
        <View style={styles.characterSection}>
          {/* 배경 벽들 */}
          <View style={styles.backgroundWalls}>
            <View style={styles.leftWallContainer}>
              <Vector124 />
            </View>
            <View style={styles.rightWallContainer}>
              <Vector123 />
            </View>
            <View style={styles.bottomWallContainer}>
              <Vector119 />
            </View>
          </View>
          
          {/* 라쿤 캐릭터 */}
          <View style={styles.characterContainer}>
            <Image source={require('@/assets/images/racoon-real.png')} style={styles.characterImage} resizeMode="contain" />
          </View>
        </View>

        {/* 보유 리워드/하트 카드 */}
        <View style={styles.rewardSection}>
          <View style={styles.rewardCards}>
            {/* 보유 리워드 카드 */}
            <View style={styles.rewardCard}>
            <View style={styles.rewardIconContainer}>
              <View style={styles.rewardIcon} />
              <Text style={styles.rewardIconText}>C</Text>
            </View>
            <View style={styles.rewardTextContainer}>
                <Text style={[styles.rewardLabel, { marginLeft: -36 }]}>보유 리워드</Text>
                <Text style={styles.rewardValue}>2,000C</Text>
            </View>
            </View>
            
            {/* 보유 하트 카드 */}
            <View style={styles.rewardCard}>
            <View style={styles.rewardIconContainer}>
              <View style={styles.rewardIcon} />
              <Image source={require('@/assets/images/whiteheart.png')} style={styles.rewardIconImage} resizeMode="contain" />
            </View>
            <View style={styles.rewardTextContainer}>
                <Text style={[styles.rewardLabel, { marginLeft: -34 }]}>보유 하트</Text>
                <Text style={styles.rewardValue}>60개</Text>
            </View>
            </View>
          </View>
          
          {/* 친구 초대 버튼 */}
          <View style={styles.inviteButtonContainer}>
            <TouchableOpacity style={styles.inviteButton}>
              <Text style={styles.inviteButtonText}>친구 초대하기</Text>
            </TouchableOpacity>
            {/* 툴팁 */}
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>첫 친구 초대시 50c리워드 지급</Text>
              <View style={styles.tooltipTail} />
            </View>
          </View>
        </View>

        {/* 초록 배경과 아래 영역의 경계를 부드럽게 만드는 라운드 전환 */}
        <View style={styles.roundedTransition} />

        {/* 프로필 정보 섹션 */}
        <View style={[styles.profileSection, { pointerEvents: 'box-none' }]}>
          {/* 사진처럼 흰색 카드 컨테이너 */}
          <View style={[styles.profileWhiteCard, { pointerEvents: 'box-none' }]}>
            <View style={[styles.profileCard, { pointerEvents: 'box-none' }]}>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileHandle}>@bangmioo_1</Text>
              <Text style={styles.profileDescription}>{intro}</Text>
            </View>
            {/* 프로필 편집 - 카드 우측의 회색 pill 버튼 (터치 가능) */}
            <View style={{ pointerEvents: 'auto' }}>
              <TouchableOpacity
                style={styles.editPill}
                activeOpacity={0.85}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                onPress={() => router.push('/main/mypage/profile_edit')}
              >
                <Text style={styles.editButtonText}>프로필 편집</Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
        </View>

        {/* 나의 뱃지 섹션 */}
        <View style={styles.badgeSection}>
          <View style={styles.badgeCard}>
            <View style={styles.badgeHeader}>
              <Text style={styles.badgeTitle}>나의 뱃지</Text>
              <TouchableOpacity style={styles.badgeArrow} onPress={() => router.push('/main/mypage/badges')}>
                <Image source={require('@/assets/images/arrowright.png')} style={styles.arrowIcon} resizeMode="contain" />
              </TouchableOpacity>
            </View>
            <Text style={styles.badgeSubtitle}>뱃지를 모아보아요!</Text>
            
            <View style={styles.badgeList}>
              {/* 초록 라쿤 뱃지 */}
              <View style={styles.badgeItem}>
                <View style={[styles.badgeCircle, styles.badgeClip] }>
                  {/* clip exactly to dashed circle bounds */}
                  <View style={styles.badgeInnerClip}>
                    <Image source={require('@/assets/images/racoon-real.png')} style={[styles.badgeCharacter, { width: 215, height: 215, transform: [{ translateX: 27 }, { translateY: 13 }] }]} resizeMode="contain" />
                  </View>
                  <Image source={require('@/assets/images/jumcircle.png')} style={styles.badgeDashed} resizeMode="contain" />
                  <Image source={require('@/assets/images/pencil.png')} style={styles.badgePencil} resizeMode="contain" />
                </View>
              </View>
              
              {/* 노랑 다람쥐 뱃지 */}
              <View style={styles.badgeItem}>
                <View style={[styles.badgeCircle, styles.badgeClip, { backgroundColor: '#ffd429' }]}> 
                  {/* clip exactly to dashed circle bounds */}
                  <View style={styles.badgeInnerClip}>
                    <Image source={require('@/assets/images/squirrielfull.png')} style={[styles.badgeCharacter, { width: 50, height: 50, transform: [{ translateX: 5 }, { translateY: 10 }] }]} resizeMode="contain" />
                  </View>
                  <Image source={require('@/assets/images/jumcircle.png')} style={styles.badgeDashed} resizeMode="contain" />
                </View>
              </View>
              
              {/* 회색 잠금 뱃지 */}
              <View style={styles.badgeItem}>
                <View style={[styles.badgeCircle, { backgroundColor: '#d9d9d9' }]}>
                  <Image source={require('@/assets/images/small_lock.png')} style={[styles.badgeLock, { width: 64, height: 64 }]} resizeMode="contain" />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 나의 활동 섹션 */}
        <View style={styles.activitySection}>
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>나의 활동</Text>
            
            <View style={styles.activityList}>
              {/* 내가 작성한 글 */}
              <TouchableOpacity style={styles.activityItem} onPress={() => router.push({ pathname: '/main/mypage/posts', params: { list: 'mine' } })}>
                <View style={styles.activityItemContent}>
                  <View style={styles.activityLeft}>
                    <View style={styles.activityIconBox}>
                      <Image source={require('@/assets/images/Group 1171280701.png')} style={[styles.activityIcon, { width: 27, height: 27 }]} resizeMode="contain" />
                    </View>
                  </View>
                  <Text style={[styles.activityItemText, { marginLeft: -130 }]}>내가 작성한 글</Text>
                  <Image source={require('@/assets/images/arrowright.png')} style={styles.activityArrow} resizeMode="contain" />
                </View>
              </TouchableOpacity>
              
              {/* 내가 작성한 댓글 */}
              <TouchableOpacity style={styles.activityItem}>
                <View style={styles.activityItemContent}>
                  <View style={styles.activityLeft}>
                    <View style={styles.activityIconBox}>
                      <Image source={require('@/assets/images/Group 1171280702.png')} style={[styles.activityIcon, { width: 27, height: 27 }]} resizeMode="contain" />
                    </View>
                  </View>
                  <Text style={[styles.activityItemText, { marginLeft: -115 }]}>내가 작성한 댓글</Text>
                  <Image source={require('@/assets/images/arrowright.png')} style={styles.activityArrow} resizeMode="contain" />
                </View>
              </TouchableOpacity>
              
              {/* 스크랩한 글 */}
              <TouchableOpacity style={styles.activityItem} onPress={() => router.push({ pathname: '/main/mypage/posts', params: { list: 'scrap' } })}>
                <View style={styles.activityItemContent}>
                  <View style={styles.activityLeft}>
                    <View style={styles.activityIconBox}>
                      <Image source={require('@/assets/images/scrap.png')} style={[styles.activityIcon, { width: 17, height: 17 }]} resizeMode="contain" />
                    </View>
                  </View>
                  <Text style={[styles.activityItemText, { marginLeft: -150 }]}>스크랩한 글</Text>
                  <Image source={require('@/assets/images/arrowright.png')} style={styles.activityArrow} resizeMode="contain" />
                </View>
              </TouchableOpacity>
              
              {/* 후기 작성하기 */}
              <TouchableOpacity style={styles.activityItem} onPress={() => router.push('/main/mypage/review')}>
                <View style={styles.activityItemContent}>
                  <View style={styles.activityLeft}>
                    <View style={styles.activityIconBox}>
                      <Image source={require('@/assets/images/Group 1171280881.png')} style={[styles.activityIcon, { width: 17, height: 17 }]} resizeMode="contain" />
                    </View>
                  </View>
                  <Text style={[styles.activityItemText, { marginLeft: -135 }]}>후기 작성하기</Text>
                  <TouchableOpacity onPress={() => router.push('/main/mypage/review')}>
                    <Image source={require('@/assets/images/arrowright.png')} style={styles.activityArrow} resizeMode="contain" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingBottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  // 최상단에서 좌/우 배경을 그대로 보여주기 위한 오버레이
  topBackgroundWalls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160, // 기본값 (실제 높이는 insets.top으로 덮어쓰기)
    zIndex: 1,
    pointerEvents: 'none',
  },
  leftTopBackground: {
    position: 'absolute',
    left: 0,
    width: '75%',
    height: '100%',
    overflow: 'hidden',
    transform: [{ translateY: -400 }],
  },
  rightTopBackground: {
    position: 'absolute',
    left: '75%',
    width: '25%',
    height: '100%',
    overflow: 'hidden',
    transform: [{ translateY: -400 }, { translateX: -5 }],
  },
  borderLineContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 1000,
  },
  borderLine: {
    position: 'absolute',
    left: '75%',
    top: 0,
    bottom: 73,
    width: 2,
    backgroundColor: '#FFE19066',
    transform: [{ translateX: -5 }],
  },
  
  // 상단 헤더 영역
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 26,
    paddingRight: 29,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
    zIndex: 5000,
    elevation: 12,
    position: 'relative',
    pointerEvents: 'auto',
  },
  addressContainer: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#636363',
    paddingLeft: 2,
    textAlign: 'left',
  },
  addressSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    color: '#636363',
    textAlign: 'left',
    marginTop: 8,
    paddingLeft: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
    gap: 10,
  },
  iconButton: {
    marginLeft: 0,
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  iconWrapper: {
    width: 35.544,
    height: 35.544,
    borderRadius: 17.772,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexShrink: 0,
  },
  bellWrapper: {
    width: 39,
    height: 39,
    borderRadius: 19.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bellBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff805f',
  },
  
  // 라쿤 캐릭터와 배경
  characterSection: {
    position: 'relative',
    height: 700,
    marginTop: 20,
    overflow: 'visible',
    pointerEvents: 'box-none',
  },
  backgroundWalls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  leftWallContainer: {
    position: 'absolute',
    left: 0,
    top: -400,
    width: '75%',
    height: 650,
  },
  rightWallContainer: {
    position: 'absolute',
    left: '75%',
    top: -400,
    width: '25%',
    height: 590,
    transform: [{ translateX: -5 }],
  },
  bottomWallContainer: {
    position: 'absolute',
    left: -50,
    right: 0,
    bottom: 20,
    height: 800,
  },
  characterContainer: {
    position: 'absolute',
    top: -265,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
    transform: [{ translateX: 80 }],
    // 라쿤 레이어가 아래 UI 터치를 막지 않도록 비활성화
    pointerEvents: 'none',
  },
  characterImage: {
    width: 750,
    height: 750,
  },
  
  // 보유 리워드/하트 카드
  rewardSection: {
    paddingHorizontal: 26,
    marginTop: -364,
    zIndex: 100,
  },
  rewardCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 20,
    marginTop: -120,
  },
  rewardCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 11,
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
  },
  rewardIconContainer: {
    marginRight: 12,
    marginTop: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardIcon: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#ff805f',
  },
  rewardIconText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  rewardIconImage: {
    position: 'absolute',
    width: 14,
    height: 14,
  },
  rewardTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 35,
  },
  rewardLabel: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: -3,
    fontFamily: 'Pretendard',
    color: '#636363',
    textAlign: 'left',
    fontWeight: '400',
  },
  rewardValue: {
    fontSize: 15,
    lineHeight: 15,
    marginTop: -3,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    color: '#636363',
    textAlign: 'right',
  },
  inviteButtonContainer: {
    position: 'relative',
    marginTop: -5,
  },
  inviteButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: 336,
    height: 46,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexShrink: 0,
  },
  inviteButtonText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#636363',
    textAlign: 'center',
    zIndex: 1,
  },
  inviteButtonLabel: {
    position: 'absolute',
    width: 92,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#636363',
    textAlign: 'left',
    top: 20,
  },
  tooltip: {
    position: 'absolute',
    top: -15,
    left: '50%',
    transform: [{ translateX: -25 }],
    backgroundColor: '#ff805f',
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 10,
    // 말풍선 꼬리
    shadowColor: 'transparent',
  },
  tooltipTail: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: 60,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ff805f',
  },
  tooltipText: {
    fontSize: 13,
    color: '#fff',
    fontFamily: 'Pretendard',
  },
  
  // 프로필 정보 섹션
  profileSection: {
    paddingHorizontal: 0,
    marginTop: -80,
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 100,
    position: 'relative',
  },
  // 초록색 배경과 회색 배경의 경계 라운드 처리용 전환 뷰
  roundedTransition: {
    height: 118,
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 100,
    marginTop: 33, // 친구 초대하기 버튼과의 여백 증가
    marginBottom: -6, // 아래 섹션과 간격 없이 맞닿도록 조정 (겹침 완화)
    paddingTop: -100, // 영역 내 첫 번째 카드의 상단 여백 줄임
  },
  profileCard: {
    backgroundColor: 'transparent',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileWhiteCard: {
    backgroundColor: '#fff',
    borderRadius: 28,
    width: 344,
    height: 122,
    padding: 16,
    paddingLeft: 11, // left -5px
    paddingTop: 11,  // up -5px
    marginHorizontal: 26, // keep card bounds; edges controlled by section padding
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    width: 68,
    fontSize: 24,
    lineHeight: 26,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
    height: 27,
    marginTop: -5,
  },
  profileHandle: {
    width: 86,
    fontSize: 13,
    lineHeight: 23,
    fontFamily: 'Pretendard',
    color: '#cdcdcd',
    textAlign: 'left',
    height: 24,
    marginTop: -1,
  },
  profileDescription: {
    width: 218,
    fontSize: 16,
    lineHeight: 23,
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
    height: 24,
    marginTop: 3,
  },
  editButton: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 5,
  },
  editPill: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 5,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    width: 53,
    fontSize: 11,
    lineHeight: 18,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    color: '#636363',
    textAlign: 'left',
    height: 19,
  },
  
  // 나의 뱃지 섹션
  badgeSection: {
    paddingHorizontal: 0,
    marginTop: 10,
    marginBottom: 10,
  },
  badgeCard: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 20,
    paddingLeft: 15, // left -5px
    paddingTop: 23,  // top space larger like profile
    height: 180,
    marginHorizontal: 26,
  },
  badgeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 0,
  },
  badgeTitle: {
    width: 116,
    fontSize: 20,
    lineHeight: 22,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
  },
  badgeArrow: {
    width: 13,
    height: 13,
  },
  arrowIcon: {
    width: 13,
    height: 13,
  },
  badgeSubtitle: {
    width: 104,
    fontSize: 14,
    lineHeight: 23,
    fontFamily: 'Pretendard',
    color: '#636363',
    textAlign: 'left',
    marginBottom: 20,
    marginTop: 0,
  },
  badgeList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  badgeItem: {
    alignItems: 'center',
  },
  badgeCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#86d382',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'visible',
  },
  badgeClip: {},
  badgeDashed: {
    position: 'absolute',
    width: 58,
    height: 58,
    zIndex: 2,
  },
  badgeInnerClip: {
    width: 58,
    height: 58,
    borderRadius: 29,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 3,
  },
  badgeCharacter: {
    width: 50,
    height: 50,
    zIndex: 1,
    position: 'relative',
  },
  badgePencil: {
    position: 'absolute',
    bottom: 18,
    right: 36,
    width: 20,
    height: 20,
  },
  badgeLock: {
    width: 20,
    height: 20,
  },
  
  // 나의 활동 섹션
  activitySection: {
    paddingHorizontal: 0,
    marginTop: 10,
    marginBottom: 10,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 20,
    paddingLeft: 15, // left -5px
    paddingTop: 23,  // top space larger like profile
    height: 304,
    marginHorizontal: 26,
    shadowColor: '#000',
    shadowOffset: { width: -1.5, height: 1 },
    shadowOpacity: 0.01,
    shadowRadius: 31.4,
    elevation: 31.4,
    marginBottom: 60,
  },
  activityTitle: {
    width: 74,
    fontSize: 20,
    lineHeight: 22,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
    marginBottom: 20,
    marginTop: 0,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    paddingVertical: 8,
  },
  activityItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityIconBox: {
    width: 29,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityItemText: {
    width: 'auto',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
    marginLeft: -130,
    marginTop: -5, // texts +5px up additionally
  },
  activityIcon: {
    width: 24,
    height: 24,
  },
  activityArrow: {
    width: 13,
    height: 13,
  },
});