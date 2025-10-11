// 통신사 선택 필드
// NameInputField와 비슷한 구조로 만든 통신사 선택 컴포넌트
// 사용 위치: identity-verification.tsx (휴대폰 인증 섹션)
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

interface CarrierSelectFieldProps {
  selectedCarrier?: string;
  onPress?: () => void;
  width?: number;
  marginLeft?: number;
}

export const CarrierSelectField: React.FC<CarrierSelectFieldProps> = ({
  selectedCarrier,
  onPress,
  width = 78,
  marginLeft = 0,
}) => {
  return (
    <View style={[styles.inputContainer, { marginLeft }]}>
      <TouchableOpacity
        style={[styles.carrierButton, { width }]}
        onPress={onPress}
        activeOpacity={0.8}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Text style={[styles.carrierText, selectedCarrier && styles.carrierTextSelected]}>
          {selectedCarrier || '통신사'}
        </Text>
        <View style={styles.chevronContainer}>
          <Svg width={11} height={7} viewBox="0 0 11 7" fill="none">
            <Path
              d="M1 1L5.3536 5.35352L9.70703 1"
              stroke="#CDCDCD"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </TouchableOpacity>
      <View style={[styles.inputUnderline, { width: width + 8 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
  },
  carrierButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    minHeight: 22.519, // lineHeight와 동일
  },
  carrierText: {
    color: COLORS.neutral.grey3,
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22.519,
    textAlign: 'left',
  },
  carrierTextSelected: {
    color: COLORS.neutral.grey5,
  },
  chevronContainer: {
    marginTop: -1,
  },
  inputUnderline: {
    height: 1.5,
    backgroundColor: COLORS.neutral.grey3,
    marginTop: 4,
  },
});
