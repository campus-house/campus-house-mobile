import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function AlertsScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  
  // 알림 화면에서 네비게이터 바 숨기기
  useFocusEffect(
    React.useCallback(() => {
      const parent = navigation.getParent?.();
      if (parent) {
        parent.setOptions({
          tabBarStyle: {
            display: 'none'
          }
        });
      }
      return () => {
        // 알림 화면에서 나갈 때 네비게이터 바 복원
        if (parent) {
          parent.setOptions({
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
        }
      };
    }, [navigation])
  );
  
  return (
    <View style={styles.container}>
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

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50, paddingBottom: 100 },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  backBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 16, lineHeight: 32, fontWeight: '600', fontFamily: 'Pretendard', color: '#323232', textAlign: 'center', marginLeft: -5 },

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
  timeText: { fontSize: 13, lineHeight: 18, color: '#aaa', fontFamily: 'Pretendard', marginLeft: -50, marginTop: -15 },
});


