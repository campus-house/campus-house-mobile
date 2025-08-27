import React from 'react';
import Svg, { Circle, Rect } from 'react-native-svg';
import { COLORS } from '../../../constants/colors';

export interface SearchIconProps {
  size?: number;
  active?: boolean;
  color?: string;
}

export const SearchIcon: React.FC<SearchIconProps> = ({
  size = 22,
  active = false,
  color,
}) => {
  // 색상 결정: color prop이 있으면 사용, 없으면 상태에 따라 결정
  const iconColor = color || (active ? COLORS.primary : COLORS.neutral.grey5);
  
  // 크기에 따른 viewBox 조정
  const viewBox = size === 22 ? "0 0 22 22" : "0 0 22 23";
  const height = size === 22 ? size : size + 1;

  return (
    <Svg width={size} height={height} viewBox={viewBox} fill="none">
      <Circle 
        cx="8.92899" 
        cy={size === 22 ? "8.51884" : "9.49296"} 
        r="7.51884" 
        stroke={iconColor} 
        strokeWidth="2"
      />
      <Rect 
        x="13.0039" 
        y={size === 22 ? "14.9502" : "15.9243"} 
        width="2.05454" 
        height="9.93332" 
        rx="1.02727" 
        transform="rotate(-45 13.0039 14.9502)" 
        fill={iconColor}
      />
    </Svg>
  );
};
