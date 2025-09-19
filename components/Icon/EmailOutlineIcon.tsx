import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

export interface EmailOutlineIconProps {
  size?: number;
  color?: string;
}

export const EmailOutlineIcon: React.FC<EmailOutlineIconProps> = ({
  size = 30,
  color = COLORS.neutral.grey5,
}) => {
  // 크기에 따른 비율 계산
  const scale = size / 30;
  const height = 21 * scale;

  return (
    <Svg width={size} height={height} viewBox="0 0 30 21" fill="none">
      <Rect
        x="1.5219"
        y="0.611739"
        width="27.6515"
        height="19.7765"
        rx="2.64913"
        fill="white"
        stroke={color}
        strokeWidth="1.22348"
      />
      <Path
        d="M4.26953 3.97102L15.4555 9.58286C15.5519 9.63119 15.6659 9.62879 15.7601 9.57644L26.9495 3.36011"
        stroke={color}
        strokeWidth="1.22283"
        strokeLinecap="round"
      />
      <Path
        d="M5.47559 12.7825L11.8669 8.21729"
        stroke={color}
        strokeWidth="1.22348"
        strokeLinecap="round"
      />
      <Path
        d="M25.5625 12.7825L19.1712 8.21729"
        stroke={color}
        strokeWidth="1.22348"
        strokeLinecap="round"
      />
    </Svg>
  );
};
