import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useProfile } from '@/contexts/ProfileContext';

export default function ProfileEditScreen() {
  const router = useRouter();
  const { name: profileName, intro: profileIntro, updateProfile } = useProfile();
  const [name, setName] = useState(profileName);
  const [intro, setIntro] = useState(profileIntro);
  const showPlaceholder = intro.length === 0;

  const handleSave = () => {
    updateProfile(name, intro);
    router.back();
  };

  console.log('프로필 편집 화면이 로드되었습니다!');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Text style={styles.cancel}>취소</Text></TouchableOpacity>
        <Text style={styles.title}>프로필 편집</Text>
        <TouchableOpacity onPress={handleSave}><Text style={styles.done}>완료</Text></TouchableOpacity>
      </View>

      <View style={styles.avatarWrap}>
        <View style={styles.greenCircle}>
          <Image source={require('@/assets/images/real-racoon-4x.png')} style={styles.avatar} resizeMode="contain" />
        </View>
        <View style={styles.cameraBadge}>
          <Image source={require('@/assets/images/Ellipse 8971.png')} style={{ width: 47, height: 47, position: 'absolute' }} resizeMode="contain" />
          <Image source={require('@/assets/images/camera2.png')} style={{ width: 22, height: 22 }} resizeMode="contain" />
        </View>
      </View>

      <View style={[styles.field, { marginLeft: 10 }]}>
        <Text style={styles.fieldLabel}>닉네임</Text>
        <View style={styles.inputBox}>
          <TextInput value={name} onChangeText={setName} style={[styles.input, { paddingTop: 10 }]} />
        </View>
      </View>

      <View style={[styles.field, { marginLeft: 10, marginTop: 39, marginBottom: 20 }]}>
        <Text style={styles.fieldLabel}>소개</Text>
        <View style={[styles.inputBox, { height: 55 }] }>
          {showPlaceholder && <Text style={[styles.placeholder, { top: 28 }]}>내용을 입력해주세요</Text>}
          <TextInput value={intro} onChangeText={setIntro} style={[styles.input, { height: '100%', paddingTop: 20 }]} multiline />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  cancel: { width: 32, fontSize: 18, lineHeight: 22, fontFamily: 'Pretendard', color: '#636363', textAlign: 'left' },
  title: { width: 74, fontSize: 16, lineHeight: 22, fontWeight: '500', fontFamily: 'Pretendard', color: '#000', textAlign: 'center' },
  done: { width: 32, fontSize: 18, lineHeight: 22, fontFamily: 'Pretendard', color: '#ff805f', textAlign: 'left' },

  avatarWrap: { alignItems: 'center', marginTop: 24, overflow: 'visible', paddingBottom: 30, paddingHorizontal: 30 },
  greenCircle: { width: 130, height: 130, borderRadius: 65, backgroundColor: '#86d382', overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 130, height: 130, marginTop: 20 },
  cameraBadge: { position: 'absolute', right: 145, top: 105, width: 47, height: 47, borderRadius: 23.5, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', overflow: 'visible', zIndex: 999 },

  field: { marginTop: 24, paddingHorizontal: 16 },
  fieldLabel: { width: 39, fontSize: 15, lineHeight: 20, fontWeight: '600', fontFamily: 'Pretendard', color: '#323232', textAlign: 'left', marginBottom: 10 },
  inputBox: { width: '100%', backgroundColor: '#fff', borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.02, shadowOffset: { width: 0, height: 4 }, elevation: 4, height: 58, justifyContent: 'center', paddingHorizontal: 16 },
  input: { fontSize: 16, color: '#323232', fontFamily: 'Pretendard' },
  placeholder: { position: 'absolute', left: 16, top: 18, width: 129, fontSize: 16, lineHeight: 23, fontWeight: '500', fontFamily: 'Pretendard', color: '#aaa', textAlign: 'left' },
});


