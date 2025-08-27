import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../../../constants/colors';

export interface EmailIconProps {
  size?: number;
  color?: string;
}

export const EmailIcon: React.FC<EmailIconProps> = ({
  size = 24,
  color = COLORS.primary,
}) => {
  // 크기에 따른 비율 계산
  const scale = size / 24;
  const height = 17 * scale;

  return (
    <Svg width={size} height={height} viewBox="0 0 24 17" fill="none">
      <Path 
        d="M23.3955 13.9521C23.3955 15.6353 22.0308 17 20.3477 17H3.49805C1.81489 17 0.450195 15.6353 0.450195 13.9521V2.6084L11.5342 9.15234C11.773 9.29332 12.0697 9.2932 12.3086 9.15234L23.3955 2.60742V13.9521ZM22.876 0.5C23.4186 0.500379 23.6139 1.21724 23.1465 1.49316L12.3086 7.89062C12.0698 8.03161 11.7731 8.03148 11.5342 7.89062L0.695312 1.49316C0.227986 1.21712 0.424003 0.500091 0.966797 0.5H22.876Z" 
        fill={color}
      />
    </Svg>
  );
};
