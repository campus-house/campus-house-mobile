import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function QuestionWrite() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isFormValid = title.trim().length > 0 && content.trim().length > 0;

  const handleComplete = () => {
    if (isFormValid) {
      // 질문 작성 완료 로직
      console.log('질문 작성 완료:', { title, content });
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
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
          <Text style={styles.headerTitle}>질문 남기기</Text>

          {/* 완료 버튼 */}
          <TouchableOpacity
            style={[styles.completeButton, isFormValid && styles.completeButtonActive]}
            onPress={handleComplete}
            disabled={!isFormValid}
          >
            <Text
              style={[styles.completeButtonText, isFormValid && styles.completeButtonTextActive]}
            >
              완료
            </Text>
          </TouchableOpacity>
        </View>

        {/* 콘텐츠 영역 */}
        <View style={styles.contentContainer}>
          {/* 제목 입력 */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>제목</Text>
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              placeholder="제목을 입력해주세요"
              placeholderTextColor="#AAA"
              maxLength={50}
            />
          </View>

          {/* 내용 입력 */}
          <View style={styles.inputSection}>
            <TextInput
              style={styles.contentInput}
              value={content}
              onChangeText={setContent}
              placeholder="자세한 내용을 입력해주세요."
              placeholderTextColor="#AAA"
              multiline
              textAlignVertical="top"
              maxLength={500}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
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
  completeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  completeButtonActive: {
    // 활성화 상태일 때 추가 스타일
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#AAA',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  completeButtonTextActive: {
    color: '#FF805F',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  inputSection: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginBottom: 12,
  },
  titleInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Pretendard',
    color: '#323232',
    backgroundColor: '#FFF',
  },
  contentInput: {
    width: '100%',
    minHeight: 200,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Pretendard',
    color: '#323232',
    backgroundColor: '#FFF',
  },
});
