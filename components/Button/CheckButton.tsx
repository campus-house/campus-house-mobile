// 원형 배경이 있는 체크 버튼
// 클릭하면 회색 배경 → 주황색 배경으로 변경
// 사용 위치: signup/index.tsx (전체 동의하기 버튼)
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

interface GreyCheckButtonProps {
  onPress?: () => void;
  isSelected?: boolean;
}

export const GreyCheckButton: React.FC<GreyCheckButtonProps> = ({
  onPress,
  isSelected = false,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Svg width="31" height="30" viewBox="0 0 31 30" fill="none">
        <Rect 
          x="0.660156" 
          y="0.199951" 
          width="29.68" 
          height="29.687" 
          rx="14.84" 
          fill={isSelected ? COLORS.primary : COLORS.neutral.grey3}
        />
        <Path 
          d="M8.08008 14.1366L14.0912 19.7913L22.9201 9.89563" 
          stroke="white" 
          strokeWidth="2.47368" 
          strokeLinecap="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
