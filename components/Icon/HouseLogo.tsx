import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

interface HouseLogoProps {
  size?: number;
}

export const HouseLogo: React.FC<HouseLogoProps> = ({ size = 137 }) => {
  const height = size * (99 / 137);

  return (
    <Svg width={size} height={height} viewBox="0 0 137 99" fill="none">
      {/* 집 지붕 */}
      <Path d="M68.5 5L125 45H12L68.5 5Z" fill={COLORS.primary} />
      {/* 집 몸체 */}
      <Path d="M12 45H125V85H12V45Z" fill={COLORS.primary} />
      {/* 문 */}
      <Path d="M55 65H82V85H55V65Z" fill={COLORS.neutral.white} />
      {/* 창문들 */}
      <Path d="M25 55H40V70H25V55Z" fill={COLORS.neutral.white} />
      <Path d="M97 55H112V70H97V55Z" fill={COLORS.neutral.white} />
      {/* 위치 핀 */}
      <Circle cx="68.5" cy="25" r="8" fill="#FF0000" />
    </Svg>
  );
};
