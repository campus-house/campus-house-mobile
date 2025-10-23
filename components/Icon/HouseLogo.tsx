import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface HouseLogoProps {
  width?: number;
  height?: number;
}

export default function HouseLogo({ width = 95, height = 53 }: HouseLogoProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 95 53" fill="none">
      <Path
        d="M92.4388 41.072L79.5333 29.9161C79.2699 29.6883 79.1185 29.3573 79.1185 29.0091V9.94484C79.1185 7.793 77.3741 6.04859 75.2223 6.04859H68.4054C66.2536 6.04859 64.5091 7.793 64.5091 9.94483V14.4733C64.5091 15.4982 63.3066 16.0505 62.5292 15.3828L48.5325 3.36108C48.0832 2.97521 47.4195 2.97521 46.9703 3.36108L3.06396 41.072"
        stroke="#FF805F"
        strokeWidth="4.49566"
        strokeLinecap="round"
      />
      <Rect
        x="1.10889"
        y="47.7898"
        width="92.7823"
        height="4.51995"
        rx="2.25998"
        fill="#FF805F"
      />
      <Path
        d="M27.1279 31.6123C27.7316 33.2555 30.4263 36.5418 36.1177 36.5418C41.809 36.5418 44.1784 33.4562 45.1122 31.6123"
        stroke="#FF805F"
        strokeWidth="3.78235"
        strokeLinecap="round"
      />
    </Svg>
  );
}
