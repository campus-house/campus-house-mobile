import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useRouter } from 'expo-router';

// Back icon component: gray chevron (no background)
const BackIcon = () => (
  <View style={{ width: 28, height: 28, justifyContent: 'center', alignItems: 'center' }}>
    <Svg width={15} height={23} viewBox="0 0 10 18" fill="none">
      <Path d="M8.5 1.5L1.5 9l7 7.5" stroke="#AAAAAA" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  </View>
);

export default function BadgesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.title}>모은 뱃지</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Section Title */}
        <Text style={styles.sectionTitle}>기본 뱃지</Text>

        {/* Badges row - sizes/spacing to mirror MyPage card */}
        <View style={styles.row}>
          {/* Raccoon badge */}
          <View style={styles.badgeItem}> 
            <View style={[styles.badgeCircle, { backgroundColor: '#86d382' }]}> 
              <View style={styles.badgeInnerClip}>
                <Image source={require('@/assets/images/racoon-real.png')} style={{ width: 285, height: 285, transform: [{ translateX: 37 }, { translateY: 18 }] }} resizeMode="contain" />
              </View>
              <Image source={require('@/assets/images/jumcircle.png')} style={styles.badgeDashed} resizeMode="contain" />
              <Image source={require('@/assets/images/pencil.png')} style={styles.badgePencil} resizeMode="contain" />
            </View>
            <Text style={styles.caption}>첫 글 쓰기</Text>
          </View>

          {/* Squirrel badge */}
          <View style={styles.badgeItem}>
            <View style={[styles.badgeCircle, { backgroundColor: '#ffd429' }]}> 
              <View style={styles.badgeInnerClip}>
                <Image source={require('@/assets/images/squirrielfull.png')} style={{ width: 65, height: 65, transform: [{ translateX: 8 }, { translateY: 15 }] }} resizeMode="contain" />
              </View>
              <Image source={require('@/assets/images/whiteheart.png')} style={styles.heartIcon} resizeMode="contain" />
              <Image source={require('@/assets/images/jumcircle.png')} style={styles.badgeDashed} resizeMode="contain" />
            </View>
            <Text style={styles.caption}>첫 하트</Text>
          </View>

          {/* Lock badge */}
          <View style={styles.badgeItem}>
            <View style={[styles.badgeCircle, { backgroundColor: '#d9d9d9' }]}> 
              <Image source={require('@/assets/images/small_lock.png')} style={{ width: 84, height: 84 }} resizeMode="contain" />
            </View>
            <Text style={[styles.caption, { color: '#aaa' }]}>첫 댓글</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backBtn: { padding: 4 },
  title: {
    width: 60,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'center',
  },
  sectionTitle: {
    width: 107,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'left',
    height: 21,
    marginTop: 23,
    marginLeft: 24,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    marginTop: 30,
  },
  badgeItem: { alignItems: 'center', justifyContent: 'center' },
  badgeCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -25,
    marginBottom: 8,
  },
  badgeDashed: { position: 'absolute', width: 78, height: 78, zIndex: 2 },
  badgeInnerClip: {
    width: 78,
    height: 78,
    borderRadius: 39,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 3,
  },
  badgePencil: { position: 'absolute', bottom: 25, right: 49, width: 20, height: 20 },
  heartIcon: { position: 'absolute', top: 13, width: 14, height: 14 },
  caption: {
    width: 60,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    color: '#323232',
    textAlign: 'center',
    marginTop: 10,
  },
});


