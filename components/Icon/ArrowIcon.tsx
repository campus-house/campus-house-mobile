// 화살표 아이콘 (오른쪽 방향)
// 사용 위치: signup/index.tsx (약관 항목 오른쪽 화살표)
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

export const ArrowIcon: React.FC = () => {
  return (
    <Svg width="22" height="26" viewBox="0 0 22 26" fill="none">
      <Path
        d="M8.7998 8.5L13.3896 12.6943C13.6088 12.8946 13.6062 13.2406 13.384 13.4376L8.7998 17.5"
        stroke={COLORS.neutral.grey3}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
