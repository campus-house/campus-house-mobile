import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../../../constants/colors';

export interface PinIconProps {
  size?: number;
  color?: string;
}

export const PinIcon: React.FC<PinIconProps> = ({
  size = 13,
  color = '#FE5959',
}) => {
  // 크기에 따른 비율 계산
  const scale = size / 13;
  const height = 21 * scale;

  return (
    <Svg width={size} height={height} viewBox="0 0 13 21" fill="none">
      <Path 
        d="M5.16699 12.376H8.2402L7.05092 18.1196C6.93814 18.6643 6.15388 18.6454 6.06739 18.096L5.16699 12.376Z" 
        fill="#C3C3C3"
      />
      <Path 
        d="M5.2334 12.6816H8.17871L8.53027 11.1924L4.94727 10.8945L5.2334 12.6816Z" 
        fill="#8C8C8C"
      />
      <Path 
        d="M9.79395 0.808105C11.0298 0.808387 11.6297 2.31951 10.7305 3.16748L9.79297 4.05127H9.79199V7.29443H9.79395L12.2031 9.47021C13.1309 10.3083 12.5381 11.8487 11.2881 11.8491H1.66504C0.414774 11.849 -0.177822 10.3083 0.75 9.47021L3.15918 7.29443H3.17871V4.05029L2.24316 3.16748C1.34391 2.31945 1.94367 0.808185 3.17969 0.808105H9.79395Z" 
        fill={color}
      />
    </Svg>
  );
};
