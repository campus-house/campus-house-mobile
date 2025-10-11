import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { COLORS } from '@/constants/colors';

export default function WriteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);
  const [cameraBottom, setCameraBottom] = useState(24);

  React.useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        const kbHeight = e.endCoordinates?.height ?? 0;
        setCameraBottom(kbHeight + 12);
      },
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setCameraBottom(24);
      },
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleBack = () => router.back();

  const isTitleFilled = title.trim().length > 0;
  const isContentFilled = content.trim().length > 0;
  const canSubmit = isTitleFilled && isContentFilled;

  const handleDone = () => {
    if (!canSubmit) {
      return;
    }
    // 완료 동작 (필요 시 교체)
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {/* 사용자가 제공한 벡터 자산을 연결하세요 */}
            <View style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>글쓰기</Text>
          <TouchableOpacity onPress={handleDone} disabled={!canSubmit} style={styles.doneButton}>
            <Text style={[styles.doneText, canSubmit && styles.doneTextActive]}>완료</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleBlock}>
          <Text
            style={[
              styles.titlePlaceholder,
              (isTitleFilled || isTitleFocused) && styles.titlePlaceholderHidden,
            ]}
            pointerEvents="none"
          >
            제목
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.titleInput}
            onFocus={() => setIsTitleFocused(true)}
            onBlur={() => setIsTitleFocused(false)}
            placeholderTextColor={COLORS.neutral.grey4}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <View style={[styles.titleUnderline, isTitleFilled && styles.titleUnderlineActive]} />
        </View>

        {/* Content */}
        <View style={styles.contentBlock}>
          <Text
            style={[
              styles.contentPlaceholder,
              (content.trim().length > 0 || isContentFocused) && styles.contentPlaceholderHidden,
            ]}
            pointerEvents="none"
          >
            자세한 내용을 입력해주세요.
          </Text>
          <TextInput
            value={content}
            onChangeText={setContent}
            style={styles.contentInput}
            multiline
            textAlignVertical="top"
            onFocus={() => setIsContentFocused(true)}
            onBlur={() => setIsContentFocused(false)}
          />
        </View>

        {/* Camera button */}
        <TouchableOpacity
          style={[styles.cameraButton, { bottom: cameraBottom }]}
          activeOpacity={0.7}
        >
          <Image
            source={require('@/assets/images/camera.png')}
            style={styles.cameraIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backIcon: {
    width: 16,
    height: 16,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#AAA',
    transform: [{ rotate: '45deg' }],
    marginLeft: 12,
  },
  headerTitle: {
    width: 42,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#000',
    textAlign: 'center',
    marginLeft: 8,
  },
  doneButton: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginRight: 12,
  },
  doneText: {
    width: 28,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#cdcdcd',
    textAlign: 'center',
  },
  doneTextActive: {
    color: COLORS.primary,
  },
  titleBlock: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  titlePlaceholder: {
    width: 37,
    fontSize: 21,
    lineHeight: 22,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#aaa',
    textAlign: 'left',
    marginTop: 36,
    marginLeft: 6,
  },
  titlePlaceholderHidden: {
    opacity: 0,
  },
  titleInput: {
    position: 'absolute',
    top: 36,
    left: 26,
    right: 20,
    height: 28,
    zIndex: 2,
    fontSize: 21,
    lineHeight: 22,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#323232',
  },
  titleUnderline: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: 22,
  },
  titleUnderlineActive: {
    backgroundColor: '#323232',
  },
  contentBlock: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  contentPlaceholder: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Pretendard',
    color: '#aaa',
    marginTop: 8,
  },
  contentPlaceholderHidden: {
    opacity: 0,
  },
  contentInput: {
    position: 'absolute',
    top: 8,
    left: 20,
    right: 20,
    bottom: 80,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Pretendard',
    color: '#323232',
  },
  cameraButton: {
    position: 'absolute',
    left: 20,
    bottom: 24,
    width: 24,
    height: 24,
  },
  cameraIcon: {
    width: 24,
    height: 24,
  },
});
