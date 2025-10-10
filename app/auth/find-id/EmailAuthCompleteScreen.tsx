import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

interface EmailAuthCompleteScreenProps {
  onBack?: () => void;
}

export default function EmailAuthCompleteScreen({ onBack }: EmailAuthCompleteScreenProps) {
  const handleBackPress = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleConfirm = () => {
    router.push('/auth/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Svg width="13" height="23" viewBox="0 0 13 23" fill="none">
            <Path
              d="M11.1777 2L1.55391 11.3274C1.34905 11.5259 1.35158 11.8554 1.55946 12.0508L11.1777 21.0909"
              stroke="#AAAAAA"
              strokeWidth="2.27273"
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>아이디 찾기</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>
          인증메일이 전송되었어요.
        </Text>
        
        <Text style={styles.description}>
          받으신 링크로 접속해{'\n'}아이디를 확인해 주세요.
        </Text>
      </View>

      {/* Bottom Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>
            확인
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#323232',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 32,
    marginBottom: 20,
  },
  description: {
    color: '#636363',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 23,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 34,
    alignItems: 'center',
  },
  confirmButton: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FF6B35',
  },
  confirmButtonText: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 16.5,
    fontWeight: '700',
  },
});
