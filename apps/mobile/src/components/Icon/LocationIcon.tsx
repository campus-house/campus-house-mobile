import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../../../constants/colors';

export interface LocationIconProps {
  size?: number;
  color?: string;
}

export const LocationIcon: React.FC<LocationIconProps> = ({
  size = 15,
  color = COLORS.primary,
}) => {
  // 크기에 따른 비율 계산
  const scale = size / 15;
  const height = 19 * scale;

  return (
    <Svg width={size} height={height} viewBox="0 0 15 19" fill="none">
      <Path 
        d="M7.33203 0.5C11.1723 0.500163 13.9806 2.80862 14.2842 7.4541C14.5818 12.0123 10.1045 17.0822 7.48047 18.501C7.38625 18.5519 7.27709 18.5524 7.18164 18.5039C4.41879 17.0956 0.263695 12.1804 0.37793 7.4541C0.470155 3.64603 3.49158 0.5 7.33203 0.5ZM7.33301 3.81152C5.68743 3.81172 4.35352 5.14637 4.35352 6.79199C4.35376 8.43741 5.68758 9.77129 7.33301 9.77148C8.9786 9.77148 10.3132 8.43753 10.3135 6.79199C10.3135 5.14625 8.97875 3.81152 7.33301 3.81152Z" 
        fill={color}
      />
    </Svg>
  );
};
