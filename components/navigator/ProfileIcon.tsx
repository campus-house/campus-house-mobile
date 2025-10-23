import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

interface ProfileIconProps {
  focused: boolean;
  color: string;
}

export default function ProfileIcon({ focused, color }: ProfileIconProps) {
  return (
    <View style={{ width: 22, height: 25, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="22" height="25" viewBox="0 0 22 25" fill="none">
        <Circle
          cx="10.7214"
          cy="5.72138"
          r="4.8249"
          fill={focused ? color : 'none'}
          stroke={focused ? color : COLORS.neutral.grey5}
          strokeWidth="1.61402"
        />
        <Path
          d="M0.927734 19.5129C0.927734 16.5415 3.33647 14.1328 6.3078 14.1328H15.201C18.1724 14.1328 20.5811 16.5416 20.5811 19.5129V22.2029C20.5811 23.1934 19.7782 23.9963 18.7877 23.9963H2.72109C1.73065 23.9963 0.927734 23.1934 0.927734 22.2029V19.5129Z"
          fill={focused ? color : 'none'}
          stroke={focused ? color : COLORS.neutral.grey5}
          strokeWidth="1.61402"
        />
      </Svg>
    </View>
  );
}




