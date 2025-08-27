import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../../../constants/colors';

export interface BackIconProps {
  size?: number;
  color?: string;
}

export const BackIcon: React.FC<BackIconProps> = ({
  size = 13,
  color = COLORS.neutral.grey4,
}) => {
  // 크기에 따른 비율 계산
  const scale = size / 13;
  const height = 23 * scale;

  return (
    <Svg width={size} height={height} viewBox="0 0 13 23" fill="none">
      <Path 
        d="M11 2L1.37618 11.3274C1.17132 11.5259 1.17384 11.8554 1.38173 12.0508L11 21.0909" 
        stroke={color} 
        strokeWidth="2.27273" 
        strokeLinecap="round"
      />
    </Svg>
  );
};
