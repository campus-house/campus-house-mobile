import React from 'react';
import Svg, { Rect, Path, Circle } from 'react-native-svg';
import { COLORS } from '../../../constants/colors';

export interface PhoneIconProps {
  size?: number;
  color?: string;
}

export const PhoneIcon: React.FC<PhoneIconProps> = ({
  size = 26,
  color = COLORS.neutral.grey5,
}) => {
  // 크기에 따른 비율 계산
  const scale = size / 26;
  const height = 35 * scale;

  return (
    <Svg width={size} height={height} viewBox="0 0 26 35" fill="none">
      <Rect 
        x="1.46562" 
        y="0.715621" 
        width="22.9671" 
        height="33.5688" 
        rx="4.29998" 
        stroke={color} 
        strokeWidth="1.39999"
      />
      <Path 
        d="M8.7666 4.01587H17.6064" 
        stroke={color} 
        strokeWidth="0.999995" 
        strokeLinecap="round"
      />
      <Circle 
        cx="12.9482" 
        cy="30.0154" 
        r="1.49999" 
        stroke={color} 
        strokeWidth="0.999995"
      />
    </Svg>
  );
};
