import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [neighborOn, setNeighborOn] = useState(true);
  const [transferOn, setTransferOn] = useState(false);
  const [snsOn, setSnsOn] = useState(true);
  
  // 하단바 완전히 제거 (독립적인 화면)
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
        // 알림 설정 화면에서 나갈 때 네비게이터 바 복원
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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Image source={require('@/assets/images/backbutton.png')} style={{ width: 19, height: 19 }} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>알림 설정</Text>
        <View style={{ width: 19, height: 19 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30, paddingTop: 25 }}>
        {renderRow('이웃 활동 알람', '이웃들의 활동알람을 받아볼래요', neighborOn, () => setNeighborOn(v => !v))}
        {renderRow('양도', '양도 글이 뜨면 받아볼래요', transferOn, () => setTransferOn(v => !v))}
        {renderRow('SNS 수신', '경희 마을의 소식과 공지사항을 놓치지 마세요!', snsOn, () => setSnsOn(v => !v))}
      </ScrollView>
    </SafeAreaView>
  );
}

function renderRow(title: string, subtitle: string, on: boolean, onToggle: () => void) {
  return (
    <View style={styles.grayCard}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSub}>{subtitle}</Text>
      </View>
      <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
        <Image source={on ? require('@/assets/images/onswitch.png') : require('@/assets/images/offswitch.png')} style={{ width: 44, height: 24 }} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  backBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { width: 60, fontSize: 16, lineHeight: 32, fontWeight: '600', fontFamily: 'Pretendard', color: '#323232', textAlign: 'left' },

  grayCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: { width: 200, fontSize: 18, lineHeight: 22, fontWeight: '600', fontFamily: 'Pretendard', color: '#000', textAlign: 'left' },
  cardSub: { width: 260, fontSize: 15, lineHeight: 22, fontWeight: '400', fontFamily: 'Pretendard', color: '#aaa', textAlign: 'left', marginTop: 6 },
});


