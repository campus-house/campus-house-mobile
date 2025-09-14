import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { GreyCheckButton } from '@/components/Button/CheckButton';
import { GreyCheckIcon } from '@/components/Button/GreyCheckIcon';
import { HouseLogo } from '@/components/Icon/HouseLogo';

interface TermItem {
  id: string;
  title: string;
  isRequired: boolean;
  isSelected: boolean;
}

export default function TermsAgreementScreen() {
  const [terms, setTerms] = useState<TermItem[]>([
    { id: 'campus-house', title: '캠퍼스하우스 이용약관', isRequired: true, isSelected: false },
    { id: 'location', title: '위치기반 서비스 이용약관', isRequired: true, isSelected: false },
    { id: 'privacy', title: '개인정보 수집 및 이용 안내', isRequired: false, isSelected: false },
    {
      id: 'third-party',
      title: '개인정보 제3자 정보제공 동의',
      isRequired: false,
      isSelected: false,
    },
  ]);

  const [isAllAgreed, setIsAllAgreed] = useState(false);

  const handleAllAgree = () => {
    const newAllAgreed = !isAllAgreed;
    setIsAllAgreed(newAllAgreed);
    setTerms((prev) => prev.map((term) => ({ ...term, isSelected: newAllAgreed })));
  };

  const handleTermToggle = (id: string) => {
    setTerms((prev) => {
      const newTerms = prev.map((term) =>
        term.id === id ? { ...term, isSelected: !term.isSelected } : term,
      );

      // 모든 약관이 선택되었는지 확인
      const allSelected = newTerms.every((term) => term.isSelected);
      setIsAllAgreed(allSelected);

      return newTerms;
    });
  };

  const isRequiredTermsAgreed = terms
    .filter((term) => term.isRequired)
    .every((term) => term.isSelected);
  const isAgreeButtonEnabled = isRequiredTermsAgreed;

  const handleAgree = () => {
    if (isAgreeButtonEnabled) {
      // 이메일 인증 페이지로 이동
      router.push('/auth/signup/email-verification');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* 로고 영역 */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBackground}>
          <HouseLogo size={137} />
        </View>
      </View>

      {/* 안내 문구 */}
      <Text style={styles.guideText}>아래 이용약관에{'\n'}동의하시면 가입이 시작됩니다.</Text>

      {/* 약관 동의 섹션 */}
      <View style={styles.termsContainer}>
        {/* 전체 동의 */}
        <TouchableOpacity style={styles.allAgreeContainer} onPress={handleAllAgree}>
          <GreyCheckButton onPress={handleAllAgree} isSelected={isAllAgreed} />
          <Text style={styles.allAgreeText}>약관 전체 동의하기</Text>
        </TouchableOpacity>

        {/* 개별 약관 목록 */}
        {terms.map((term) => (
          <TouchableOpacity
            key={term.id}
            style={styles.termItem}
            onPress={() => handleTermToggle(term.id)}
          >
            <GreyCheckIcon onPress={() => handleTermToggle(term.id)} isSelected={term.isSelected} />
            <Text style={styles.termText}>
              ({term.isRequired ? '필수' : '선택'}) {term.title}
            </Text>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 동의하기 버튼 */}
      <TouchableOpacity
        style={[styles.agreeButton, isAgreeButtonEnabled && styles.agreeButtonEnabled]}
        onPress={handleAgree}
        disabled={!isAgreeButtonEnabled}
      >
        <Text
          style={[styles.agreeButtonText, isAgreeButtonEnabled && styles.agreeButtonTextEnabled]}
        >
          동의하기
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBackground: {
    width: 168,
    height: 168,
    borderRadius: 84,
    backgroundColor: '#FFFBFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideText: {
    color: COLORS.text.primary,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 21,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24.5,
    marginBottom: 40,
  },
  termsContainer: {
    marginBottom: 40,
  },
  allAgreeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  allAgreeText: {
    color: COLORS.text.primary,
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 27.211,
    marginLeft: 12,
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral.grey2,
  },
  termText: {
    color: COLORS.neutral.grey4,
    fontFamily: 'Pretendard',
    fontSize: 15.364,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 26,
    flex: 1,
    marginLeft: 12,
  },
  arrowText: {
    color: COLORS.neutral.grey4,
    fontSize: 18,
    fontWeight: '300',
  },
  agreeButton: {
    width: 318,
    height: 53,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 800,
    backgroundColor: COLORS.neutral.grey4,
    alignSelf: 'center',
  },
  agreeButtonEnabled: {
    backgroundColor: COLORS.primary,
  },
  agreeButtonText: {
    color: COLORS.text.inverse,
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
  },
  agreeButtonTextEnabled: {
    color: COLORS.text.inverse,
  },
});
