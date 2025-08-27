import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../../../constants/colors';

export interface NotificationIconProps {
  size?: number;
  color?: string;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  size = 16,
  color = COLORS.primary,
}) => {
  // 크기에 따른 비율 계산
  const scale = size / 16;
  const height = 19 * scale;

  return (
    <Svg width={size} height={height} viewBox="0 0 16 19" fill="none">
      <Path 
        d="M7.77246 0C12.0649 0.000181313 15.5448 3.48001 15.5449 7.77246V15.4092C15.5448 15.9612 15.097 16.409 14.5449 16.4092H11.1914C10.9517 17.8737 9.51246 18.9999 7.77246 19C6.03235 19 4.59317 17.8738 4.35352 16.4092H1C0.447815 16.4092 0.000160785 15.9613 0 15.4092V7.77246C0.000165697 3.47995 3.47994 9.07076e-05 7.77246 0ZM6.31738 16.6982C6.60269 17.0256 7.0915 17.2998 7.77246 17.2998C8.45314 17.2997 8.94128 17.0255 9.22656 16.6982H6.31738ZM7.77246 1.7002C4.41882 1.70029 1.70036 4.41884 1.7002 7.77246V14.709H4.59766V14.6982H10.5977V14.709H13.8447V7.77246C13.8446 4.41885 11.126 1.70038 7.77246 1.7002Z" 
        fill={color}
      />
    </Svg>
  );
};
