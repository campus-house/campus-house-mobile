// 뒤로 가기 버튼
// 사용 위치: login.tsx, find-id/*, find-password/* 등 모든 화면의 뒤로가기 버튼
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

export const BackIcon: React.FC = () => {
  return (
    <Svg width="13.8" height="23.7" viewBox="0 0 13 23" fill="none">
      <Path
        d="M11.1777 2L1.55391 11.3274C1.34905 11.5259 1.35158 11.8554 1.55946 12.0508L11.1777 21.0909"
        stroke={COLORS.neutral.grey4}
        strokeWidth="2.27273"
        strokeLinecap="round"
      />
    </Svg>
  );
};
