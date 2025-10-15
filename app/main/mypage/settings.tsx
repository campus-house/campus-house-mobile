import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const router = useRouter();
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
  
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Image source={require('@/assets/images/backbutton.png')} style={{ width: 19, height: 19 }} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>설정</Text>
        <View style={{ width: 19, height: 19 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        {/* 알림 설정 카드 */}
        <View style={styles.card}>
          <Text style={[styles.sectionTitle, { marginBottom: 5 }]}>알림 설정</Text>
          <TouchableOpacity style={styles.row} onPress={() => router.push('/main/mypage/notification')}>
            <Text style={styles.rowText}>알림 수신 설정</Text>
            <Image source={require('@/assets/images/arrowright.png')} style={styles.arrow} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* 계정 카드 */}
        <View style={styles.cardTall}>
          <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>계정</Text>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>아이디</Text>
            <View style={styles.rightWrap}>
              <Text style={styles.idText}>@bangmiooo1</Text>
              <Image source={require('@/assets/images/arrowright.png')} style={[styles.arrow, { marginLeft: 10 }]} resizeMode="contain" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>비밀번호 변경</Text>
            <Image source={require('@/assets/images/arrowright.png')} style={styles.arrow} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>이메일 변경</Text>
            <Image source={require('@/assets/images/arrowright.png')} style={styles.arrow} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>주소 변경</Text>
            <Image source={require('@/assets/images/arrowright.png')} style={styles.arrow} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* 기타 카드 */}
        <View style={styles.cardTall}>
          <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>기타</Text>
          <TouchableOpacity style={[styles.row, { height: 46 }]}><Text style={styles.rowText}>고객센터</Text><Image source={require('@/assets/images/arrowright.png')} style={styles.arrow} resizeMode="contain" /></TouchableOpacity>
          <TouchableOpacity style={[styles.row, { height: 46 }]}><Text style={styles.rowText}>커뮤니티 정책</Text><Image source={require('@/assets/images/arrowright.png')} style={styles.arrow} resizeMode="contain" /></TouchableOpacity>
          <TouchableOpacity style={[styles.row, { height: 46 }]}><Text style={styles.rowText}>오픈소스 라이선스</Text><Image source={require('@/assets/images/arrowright.png')} style={styles.arrow} resizeMode="contain" /></TouchableOpacity>
          <TouchableOpacity style={[styles.row, { height: 46 }]}><Text style={styles.rowText}>로그아웃</Text><Image source={require('@/assets/images/arrowright.png')} style={styles.arrow} resizeMode="contain" /></TouchableOpacity>
        </View>

        {/* 탈퇴하기 */}
        <View style={styles.cardSmall}>
          <TouchableOpacity style={[styles.row, { height: 61 }]}>
            <Text style={styles.rowText}>탈퇴하기</Text>
            <Image source={require('@/assets/images/arrowright.png')} style={styles.arrow} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <View style={styles.versionRow}>
          <Text style={styles.versionText}>앱 버전 2.2.2 • </Text>
          <View style={styles.updateWrap}>
            <Text style={styles.updateLinkText}>업데이트 하기</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f6f6' },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  backBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { width: 28, fontSize: 16, lineHeight: 32, fontWeight: '600', fontFamily: 'Pretendard', color: '#323232', textAlign: 'left' },

  card: { backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 16, paddingVertical: 10, paddingHorizontal: 16, marginTop: 10, marginBottom: 20 },
  cardTall: { backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 16, paddingVertical: 10, paddingHorizontal: 16, marginTop: 0, marginBottom: 20 },
  cardSmall: { backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 16, paddingHorizontal: 16, marginTop: 20 },

  sectionTitle: { width: 78, fontSize: 17, lineHeight: 32, fontWeight: '700', fontFamily: 'Pretendard', color: '#323232', textAlign: 'left', height: 25, marginBottom: -5 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 51 },
  rowText: { width: 160, fontSize: 17, lineHeight: 22, fontWeight: '400', fontFamily: 'Pretendard', color: '#636363', textAlign: 'left' },
  arrow: { width: 13, height: 13 },
  rightWrap: { flexDirection: 'row', alignItems: 'center' },
  idText: { color: '#ff805f', fontSize: 14, lineHeight: 23, fontFamily: 'Pretendard' },
  versionRow: { flexDirection: 'row', alignItems: 'flex-end', alignSelf: 'flex-start', marginTop: 18, marginLeft: 30 },
  versionText: { fontSize: 15, lineHeight: 22, fontWeight: '400', fontFamily: 'Pretendard', color: '#cdcdcd' },
  updateWrap: { borderBottomWidth: 1, borderBottomColor: '#cdcdcd', paddingBottom: 2 },
  updateLinkText: { fontSize: 15, lineHeight: 22, fontWeight: '400', fontFamily: 'Pretendard', color: '#cdcdcd' },
});


