import React from 'react';
import Svg, { Line } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

export interface MenuIconProps {
  size?: number;
  color?: string;
}

export const MenuIcon: React.FC<MenuIconProps> = ({ 
  size = 22, 
  color = COLORS.neutral.grey4 
}) => {
  return (
    <Svg width={size} height={size * (16/22)} viewBox="0 0 23 19" fill="none">
      <Line 
        x1="1.0625" 
        y1="1.5" 
        x2="21.0625" 
        y2="1.5" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <Line 
        x1="1.0625" 
        y1="9.5" 
        x2="21.0625" 
        y2="9.5" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <Line 
        x1="1.0625" 
        y1="17.5" 
        x2="21.0625" 
        y2="17.5" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </Svg>
  );
};

