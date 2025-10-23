import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

export interface FilterIconProps {
  size?: number;
  active?: boolean;
  color?: string;
}

export const FilterIcon: React.FC<FilterIconProps> = ({ size = 25, active = false, color }) => {
  const iconColor = color || COLORS.primary;

  return (
    <Svg width={size} height={size * 0.76} viewBox="0 0 25 19" fill="none">
      <Path
        d="M1 3.71924H23.5263"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Circle
        cx="8.10171"
        cy="3.7189"
        r="2.9689"
        fill="white"
        stroke={iconColor}
        strokeWidth="1.5"
      />
      <Path
        d="M23.5293 14.5728L1.00296 14.5728"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Circle
        cx="16.4237"
        cy="14.5731"
        r="2.9689"
        transform="rotate(-180 16.4237 14.5731)"
        fill="white"
        stroke={iconColor}
        strokeWidth="1.5"
      />
    </Svg>
  );
};
