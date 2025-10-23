import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

interface ScrapIconProps {
  focused: boolean;
  color: string;
}

export default function ScrapIcon({ focused, color }: ScrapIconProps) {
  return (
    <View style={{ width: 20, height: 24, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="20" height="24" viewBox="0 0 20 24" fill="none">
        <Path
          d="M17 1H3.00205C1.89668 1 1.00092 1.89668 1.00205 3.00205L1.02067 21.1445C1.02209 22.5324 2.40228 23.497 3.70618 23.0213L9.30407 20.9788C9.74569 20.8177 10.23 20.8173 10.6719 20.9777L16.3177 23.0266C17.6219 23.4999 19 22.5339 19 21.1466V3C19 1.89543 18.1046 1 17 1Z"
          fill={focused ? color : 'none'}
          stroke={focused ? color : COLORS.neutral.grey5}
          strokeWidth="1.61402"
        />
      </Svg>
    </View>
  );
}




