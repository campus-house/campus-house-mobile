import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

interface MapIconProps {
  focused: boolean;
  color: string;
}

export default function MapIcon({ focused, color }: MapIconProps) {
  return (
    <View style={{ width: 27.012, height: 21.5513, alignItems: 'center', justifyContent: 'center' }}>
      {focused ? (
        // 활성화 상태: 주황색 채움 + 흰색 세로선
        <Svg width="27" height="22" viewBox="0 0 27 22" fill="none">
          <Path
            d="M17.9258 2.69385L24.5117 1.37451C25.7441 1.12757 26.8958 2.06496 26.9043 3.32178L26.999 17.73C27.0049 18.6544 26.376 19.4622 25.4785 19.6841L17.9258 21.5513L8.96387 19.7554L2.39258 21.0718C1.15495 21.3195 7.52221e-05 20.373 0 19.1108V4.35986C0 3.4093 0.669189 2.5898 1.60059 2.3999L8.96289 0.897949L17.9258 2.69385Z"
            fill={color}
          />
          <Path d="M8.96289 0V20.2041" stroke={COLORS.neutral.white} strokeWidth="1" />
          <Path d="M17.9258 1.7959V22" stroke={COLORS.neutral.white} strokeWidth="1" />
        </Svg>
      ) : (
        // 비활성화 상태: 회색 아웃라인만
        <Svg width="28" height="22" viewBox="0 0 28 22" fill="none">
          <Path
            d="M18.5038 2.48242L25.3397 1.11523C26.4447 0.894296 27.4768 1.73551 27.4843 2.8623L27.5819 17.6572C27.5873 18.4866 27.0229 19.2115 26.2177 19.4102L18.5038 21.3135L9.53796 19.5195L2.71472 20.8838C1.60525 21.1054 0.570366 20.2574 0.57019 19.126V3.98047C0.57019 3.12793 1.17035 2.39273 2.00574 2.22266L9.53699 0.689453H9.54089L18.5038 2.48242ZM10.4335 18.0518L18.2343 19.6123V4.07422L18.1874 4.06543L10.4335 2.51367V18.0518ZM25.6561 2.69824L19.4003 3.94922V19.4287L25.8309 17.8428C25.9119 17.8228 25.9681 17.7502 25.9677 17.668L25.87 2.87305C25.8692 2.75947 25.7657 2.67633 25.6561 2.69824ZM2.328 3.80469C2.24506 3.82157 2.18445 3.89461 2.18445 3.98047V19.126C2.18462 19.2384 2.287 19.3229 2.39832 19.3008L9.22156 17.9365L9.26746 17.9268V2.3916L2.328 3.80469Z"
            fill={COLORS.neutral.grey5}
          />
        </Svg>
      )}
    </View>
  );
}

