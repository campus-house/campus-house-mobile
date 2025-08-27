import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../../constants/colors';

interface CheckIconProps {
  size?: number;
  color?: string;
}

export const CheckIcon: React.FC<CheckIconProps> = ({
  size = 14.84,
  color = COLORS.neutral.white,
}) => {
  return (
    <Svg width={size} height={size * (9.9 / 14.84)} viewBox="0 0 14.84 9.9" fill="none">
      <Path
        d="M1.5 4.5L5.5 8.5L13.34 0.66"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
