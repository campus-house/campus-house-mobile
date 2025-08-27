import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { COLORS } from '../../../constants/colors';

export interface PlusIconProps {
  size?: number;
  color?: string;
}

export const PlusIcon: React.FC<PlusIconProps> = ({
  size = 14,
  color = COLORS.neutral.grey5,
}) => {
  // 크기에 따른 비율 계산
  const scale = size / 14;
  const height = 15 * scale;

  return (
    <Svg width={size} height={height} viewBox="0 0 14 15" fill="none">
      <Path 
        d="M7 1.09473V3.42806" 
        stroke={color} 
        strokeLinecap="round"
      />
      <Path 
        d="M7 11.2056L7 13.5389" 
        stroke={color} 
        strokeLinecap="round"
      />
      <Path 
        d="M3.11133 7.31689H0.777995" 
        stroke={color} 
        strokeLinecap="round"
      />
      <Path 
        d="M13.2227 7.31689H10.8893" 
        stroke={color} 
        strokeLinecap="round"
      />
      <Circle 
        cx="7" 
        cy="7.31689" 
        r="6.5" 
        stroke={color}
      />
    </Svg>
  );
};
