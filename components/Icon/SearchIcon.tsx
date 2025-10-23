import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

export interface SearchIconProps {
  size?: number;
  active?: boolean;
  color?: string;
}

export const SearchIcon: React.FC<SearchIconProps> = ({ size = 22, active = false, color }) => {
  // 색상 결정: color prop이 있으면 사용, 없으면 상태에 따라 결정
  const iconColor = color || (active ? COLORS.primary : COLORS.neutral.grey5);

  // 크기에 따른 viewBox 조정
  const viewBox = size === 22 ? '0 0 22 22' : '0 0 22 23';
  const height = size === 22 ? size : size + 1;

  return (
    <Svg width={size} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.70312 0.892578C14.605 0.892578 18.5146 4.69382 18.5146 9.30469C18.5144 13.9153 14.6048 17.7158 9.70312 17.7158C4.80148 17.7157 0.892841 13.9153 0.892578 9.30469C0.892578 4.69386 4.80131 0.892649 9.70312 0.892578Z"
        stroke={iconColor}
        strokeWidth="1.78448"
      />
      <Rect
        width="2.29258"
        height="11.0842"
        rx="1.14629"
        transform="matrix(0.721793 -0.69211 0.721793 0.69211 14.3438 16.3286)"
        fill={iconColor}
      />
    </Svg>
  );
};
