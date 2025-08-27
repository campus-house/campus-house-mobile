import React from 'react';
import { View, StyleSheet } from 'react-native';

interface KakaoLogoProps {
  size?: number;
}

export const KakaoLogo: React.FC<KakaoLogoProps> = ({ size = 42.533 }) => {
  return (
    <View style={[styles.logo, { width: size, height: size }]}>
      {/* 여기에 실제 카카오톡 로고 이미지가 들어갈 예정 */}
      {/* 현재는 placeholder로 lightgray 배경만 적용 */}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    flexShrink: 0,
    aspectRatio: 1,
    backgroundColor: 'lightgray',
    borderRadius: 4, // 약간의 둥근 모서리
    justifyContent: 'center',
    alignItems: 'center',
  },
});
