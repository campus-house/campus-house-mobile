import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Vector124 from '@/components/Vector124';
import Vector123 from '@/components/Vector123';
import Vector119 from '@/components/Vector119';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';
import { useProfile } from '@/contexts/ProfileContext';

export default function MyPageScreen() {
  const navigation: any = useNavigation();
  const { width: screenWidth } = Dimensions.get('window');
  const { name, intro } = useProfile();

  useEffect(() => {
    const parent = navigation?.getParent?.();
    parent?.setOptions?.({
      tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 76,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: -1.5, height: -4.5 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 5,
        display: 'flex',
        zIndex: 999,
      },
    });
    parent?.setOptions?.({ tabBarVisible: true });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* 상단 헤더 영역 */}
        <View style={styles.headerSection}>
          {/* 주소 정보 */}
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>아이파크 803호</Text>
            <Text style={styles.addressSubtitle}>영통구 효원로 407</Text>
          </View>
          
          {/* 우측 아이콘들 */}
          <View style={styles.headerIcons}>
            <TouchableOpacity style={[styles.iconButton, styles.bellWrapper]} onPress={() => router.push('/mypage/alerts')}>
              <Image source={require('@/assets/images/bell.png')} style={[styles.headerIcon, { width: 20, height: 20 }]} resizeMode="contain" />
              <View style={styles.bellBadge} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, styles.bellWrapper]}>
              <Image source={require('@/assets/images/shop.png')} style={[styles.headerIcon, { width: 30, height: 30 }]} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconButton, styles.bellWrapper, { zIndex: 10000 }]}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => router.push('/mypage/settings')}
            >
              <Image source={require('@/assets/images/setting.png')} style={[styles.headerIcon, { width: 30, height: 30 }]} resizeMode="contain" />
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
              <Text style={styles.inviteButtonLabel}>친구 초대하기</Text>
            </TouchableOpacity>
            {/* 툴팁 */}
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>첫 친구 초대시 50c리워드 지급</Text>
              <View style={styles.tooltipTail} />
            </View>
          </View>
        </View>

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
                onPress={() => router.push('/mypage/profile_edit')}
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
              <TouchableOpacity style={styles.badgeArrow} onPress={() => router.push('/mypage/badges')}>
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
                  <Image source={require('@/assets/images/lock.png')} style={[styles.badgeLock, { width: 64, height: 64 }]} resizeMode="contain" />
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
              <TouchableOpacity style={styles.activityItem} onPress={() => router.push({ pathname: '/mypage/posts', params: { list: 'mine' } })}>
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
              <TouchableOpacity style={styles.activityItem} onPress={() => router.push({ pathname: '/mypage/posts', params: { list: 'scrap' } })}>
                <View style={styles.activityItemContent}>
                  <View style={styles.activityLeft}>
                  <View style={styles.activityIconBox}>
                    <Image source={require('@/assets/images/스크랩.png')} style={[styles.activityIcon, { width: 17, height: 17 }]} resizeMode="contain" />
                  </View>
                  </View>
                  <Text style={[styles.activityItemText, { marginLeft: -150 }]}>스크랩한 글</Text>
                  <Image source={require('@/assets/images/arrowright.png')} style={styles.activityArrow} resizeMode="contain" />
                </View>
              </TouchableOpacity>
              
              {/* 후기 작성하기 */}
              <TouchableOpacity style={styles.activityItem} onPress={() => router.push('/mypage/review')}>
                <View style={styles.activityItemContent}>
                  <View style={styles.activityLeft}>
                    <View style={styles.activityIconBox}>
                      <Image source={require('@/assets/images/Group 1171280881.png')} style={[styles.activityIcon, { width: 17, height: 17 }]} resizeMode="contain" />
                    </View>
                  </View>
                  <Text style={[styles.activityItemText, { marginLeft: -135 }]}>후기 작성하기</Text>
                  <TouchableOpacity onPress={() => router.push('/mypage/review')}>
                    <Image source={require('@/assets/images/arrowright.png')} style={styles.activityArrow} resizeMode="contain" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* 하단 네비게이션 바 */}
      <View style={styles.bottomTabBar}>
        {/* 커뮤니티 탭 */}
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/main')}>
          <CommunityIcon focused={false} color="#636363" />
          <Text style={[styles.tabLabel, { color: '#636363' }]}>커뮤</Text>
        </TouchableOpacity>

        {/* 지도 탭 */}
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/main/map')}>
          <MapIcon focused={false} color="#636363" />
          <Text style={[styles.tabLabel, { color: '#636363' }]}>지도</Text>
        </TouchableOpacity>

        {/* 스크랩 탭 */}
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/main/scrap')}>
          <ScrapIcon focused={false} color="#636363" />
          <Text style={[styles.tabLabel, { color: '#636363' }]}>스크랩</Text>
        </TouchableOpacity>

        {/* 마이페이지 탭 */}
        <TouchableOpacity style={styles.tabItem}>
          <ProfileIcon focused={true} color="#FF805F" />
          <Text style={[styles.tabLabel, { color: '#FF805F' }]}>마이페이지</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingBottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  
  // 상단 헤더 영역
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
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
    color: 'rgba(0,0,0,0.85)',
    textAlign: 'left',
  },
  addressSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    color: 'rgba(0,0,0,0.75)',
    textAlign: 'left',
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  bellWrapper: {
    width: 34,
    height: 34,
    borderRadius: 17,
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
    height: 770,
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
    width: '90%',
    height: 650,
  },
  rightWallContainer: {
    position: 'absolute',
    right: -190,
    top: -400,
    width: '70%',
    height: 590,
  },
  bottomWallContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 70,
    height: 800,
  },
  characterContainer: {
    position: 'absolute',
    top: -250,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
    transform: [{ translateX: 90 }],
    // 라쿤 레이어가 아래 UI 터치를 막지 않도록 비활성화
    pointerEvents: 'none',
  },
  characterImage: {
    width: 825,
    height: 825,
  },
  
  // 보유 리워드/하트 카드
  rewardSection: {
    paddingHorizontal: 20,
    marginTop: -360,
    zIndex: 20,
  },
  rewardCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: -120,
  },
  rewardCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 45,
  },
  rewardLabel: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: -3,
    fontFamily: 'Pretendard',
    color: '#000000',
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
    marginTop: 0,
  },
  inviteButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 21,
    paddingHorizontal: 20,
    minHeight: 41,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    marginHorizontal: 21,
  },
  inviteButtonText: {
    width: 92,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#636363',
    textAlign: 'left',
    zIndex: 1,
    marginTop: 20,
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
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 20,
    position: 'relative',
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
    padding: 16,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 6,
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
  },
  profileHandle: {
    width: 86,
    fontSize: 13,
    lineHeight: 23,
    fontFamily: 'Pretendard',
    color: '#cdcdcd',
    textAlign: 'left',
    height: 24,
    marginTop: 4,
  },
  profileDescription: {
    width: 218,
    fontSize: 16,
    lineHeight: 23,
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
    height: 24,
    marginTop: 8,
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
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  badgeCard: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 20,
    height: 180,
    marginHorizontal: 12,
  },
  badgeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 20,
    height: 304,
    marginHorizontal: 12,
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
  },
  activityIcon: {
    width: 24,
    height: 24,
  },
  activityArrow: {
    width: 13,
    height: 13,
  },
  
  // 하단 탭바 스타일
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 76,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: -1.5, height: -4.5 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 4,
  },
});

// 아이콘 컴포넌트들
function CommunityIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ width: 30.245, height: 25.72, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="31" height="26" viewBox="0 0 31 26" fill="none">
        <Path
          d="M24.9873 0C28.2062 0 30.8163 2.60931 30.8164 5.82812V14.7383C30.8164 17.9572 28.2062 20.5674 24.9873 20.5674H19.1855L16.4697 25.2715C16.1245 25.8688 15.2621 25.8689 14.917 25.2715L12.2012 20.5674H6.39844C3.17963 20.5672 0.570312 17.9571 0.570312 14.7383V5.82812C0.570464 2.60941 3.17972 0.000152403 6.39844 0H24.9873Z"
          fill={focused ? color : '#636363'}
        />
      </Svg>
      <View style={{ position: 'absolute', top: 8, left: 0, right: 0, alignItems: 'center' }}>
        <Svg width="17" height="5" viewBox="0 0 17 5" fill="none">
          <Circle cx="2.64385" cy="2.2835" r="1.81475" fill="white" />
          <Circle cx="8.69292" cy="2.2835" r="1.81475" fill="white" />
          <Circle cx="14.7425" cy="2.2835" r="1.81475" fill="white" />
        </Svg>
      </View>
    </View>
  );
}

function MapIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ width: 27.012, height: 20.624, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="28" height="22" viewBox="0 0 28 22" fill="none">
        <Path
          d="M18.5038 2.48242L25.3397 1.11523C26.4447 0.894296 27.4768 1.73551 27.4843 2.8623L27.5819 17.6572C27.5873 18.4866 27.0229 19.2115 26.2177 19.4102L18.5038 21.3135L9.53796 19.5195L2.71472 20.8838C1.60525 21.1054 0.570366 20.2574 0.57019 19.126V3.98047C0.57019 3.12793 1.17035 2.39273 2.00574 2.22266L9.53699 0.689453H9.54089L18.5038 2.48242ZM10.4335 18.0518L18.2343 19.6123V4.07422L18.1874 4.06543L10.4335 2.51367V18.0518ZM25.6561 2.69824L19.4003 3.94922V19.4287L25.8309 17.8428C25.9119 17.8228 25.9681 17.7502 25.9677 17.668L25.87 2.87305C25.8692 2.75947 25.7657 2.67633 25.6561 2.69824ZM2.328 3.80469C2.24506 3.82157 2.18445 3.89461 2.18445 3.98047V19.126C2.18462 19.2384 2.287 19.3229 2.39832 19.3008L9.22156 17.9365L9.26746 17.9268V2.3916L2.328 3.80469Z"
          fill={focused ? color : '#636363'}
        />
      </Svg>
    </View>
  );
}

function ScrapIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ width: 18, height: 23, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="21" height="24" viewBox="0 0 21 24" fill="none">
        <Path
          d="M17.5703 1H3.57237C2.46699 1 1.57123 1.89668 1.57237 3.00205L1.59098 21.1445C1.59241 22.5324 2.97259 23.497 4.27649 23.0213L9.87439 20.9788C10.316 20.8177 10.8003 20.8173 11.2422 20.9777L16.888 23.0266C18.1922 23.4999 19.5703 22.5339 19.5703 21.1466V3C19.5703 1.89543 18.6749 1 17.5703 1Z"
          stroke={focused ? color : '#636363'}
          strokeWidth="1.61402"
        />
      </Svg>
    </View>
  );
}

function ProfileIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ width: 19.653, height: 23.1, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="22" height="25" viewBox="0 0 22 25" fill="none">
        <Circle
          cx="11.327"
          cy="5.72138"
          r="4.8249"
          stroke={focused ? color : '#636363'}
          strokeWidth="1.61402"
        />
        <Path
          d="M1.53357 19.5129C1.53357 16.5415 3.94231 14.1328 6.91364 14.1328H15.8069C18.7782 14.1328 21.1869 16.5416 21.1869 19.5129V22.2029C21.1869 23.1934 20.384 23.9963 19.3936 23.9963H3.32692C2.33648 23.9963 1.53357 23.1934 1.53357 22.2029V19.5129Z"
          stroke={focused ? color : '#636363'}
          strokeWidth="1.61402"
        />
      </Svg>
    </View>
  );
}
