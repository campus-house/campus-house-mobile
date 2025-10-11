import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function MyPostsScreen() {
  const router = useRouter();
  const { list } = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Image source={require('@/assets/images/backbutton.png')} style={{ width: 19, height: 19 }} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{list === 'mine' ? '내가 작성한 글' : '스크랩한 글'}</Text>
        <View style={{ width: 19, height: 19 }} />
      </View>

      <View style={styles.row}>
        <Image source={require('@/assets/images/donut.png')} style={styles.thumb} resizeMode="cover" />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={[styles.postTitle, { marginBottom: 10 }]}>{list === 'mine' ? '같이 배달 시켜 먹을 분 구해요!' : '도넛 나눌게요'}</Text>
          <Text numberOfLines={1} style={[styles.postBody, { fontSize: 14 }]}>{list === 'mine' ? '배민으로 배달하려고 하는데...' : '도넛을 너무 많이 구매해서...'}</Text>
        </View>
        <Text style={styles.dateText}>09/01</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  backBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { width: 91, fontSize: 16, lineHeight: 22, fontWeight: '500', fontFamily: 'Pretendard', color: '#000', textAlign: 'center' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 29,
  },
  thumb: { width: 56, height: 56, borderRadius: 8 },
  postTitle: { width: 155, fontSize: 13, lineHeight: 18, fontWeight: '600', fontFamily: 'Pretendard', color: '#323232', textAlign: 'left' },
  postBody: { width: 174, fontSize: 15, lineHeight: 18, fontFamily: 'Pretendard', color: '#636363', textAlign: 'left', overflow: 'hidden' },
  dateText: { width: 34, fontSize: 13, lineHeight: 18, fontFamily: 'Pretendard', color: '#636363', textAlign: 'center' },
});


