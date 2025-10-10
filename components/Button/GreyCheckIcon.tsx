
// 체크 아이콘만 있는 버튼 (배경 없음)
// 클릭하면 회색 → 주황색으로 변경
// 사용 위치: signup/index.tsx (개별 약관 동의 버튼들)
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

interface GreyCheckIconProps {
  onPress?: () => void;
  isSelected?: boolean;
}

export const GreyCheckIcon: React.FC<GreyCheckIconProps> = ({
  onPress,
  isSelected = false,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Svg width="31" height="30" viewBox="0 0 31 30" fill="none">
        <Path 
          d="M7.75 14.9069L14.0285 20.8696L23.25 10.4348" 
          stroke={isSelected ? COLORS.primary : COLORS.neutral.grey3} 
          strokeWidth="2" 
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
    padding: 8,
  },
});
