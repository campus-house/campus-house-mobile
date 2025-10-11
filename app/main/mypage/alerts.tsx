import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function AlertsScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Image source={require('@/assets/images/backbutton.png')} style={{ width: 19, height: 19 }} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.title}>알림</Text>
        <View style={{ width: 19, height: 19 }} />
      </View>

      {/* 붉은색 강조 행 */}
      <View style={[styles.row, styles.rowEmph]}> 
        <Image source={require('@/assets/images/donut.png')} style={styles.thumb} resizeMode="cover" />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.subtle}>내 게시글에 댓글이 달렸어요.</Text>
          <Text style={styles.rowTitle}>혹시 지금 다 팔렸나요?</Text>
        </View>
        <Text style={styles.timeText}>2시간 전</Text>
      </View>

      {/* 일반 행 */}
      <View style={styles.row}> 
        <Image source={require('@/assets/images/donut.png')} style={styles.thumb} resizeMode="cover" />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.subtle}>내 게시글에 댓글이 달렸어요.</Text>
          <Text style={styles.rowTitle}>혹시 지금 다 팔렸나요?</Text>
        </View>
        <Text style={styles.timeText}>3시간 전</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  backBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 16, lineHeight: 32, fontWeight: '600', fontFamily: 'Pretendard', color: '#323232', textAlign: 'center' },

  row: {
    backgroundColor: '#fff',
    borderRadius: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 0,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowEmph: { backgroundColor: 'rgba(255, 128, 95, 0.1)' },
  thumb: { width: 51, height: 51, borderRadius: 8 },
  subtle: { fontSize: 13, lineHeight: 18, color: '#aaa', fontFamily: 'Pretendard' },
  rowTitle: { width: 136, fontSize: 15, lineHeight: 18, fontWeight: '600', fontFamily: 'Pretendard', color: '#323232', textAlign: 'left', marginTop: 4 },
  timeText: { fontSize: 13, lineHeight: 18, color: '#aaa', fontFamily: 'Pretendard' },
});


