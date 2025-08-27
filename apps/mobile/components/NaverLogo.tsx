import React from 'react';
import { View, StyleSheet } from 'react-native';

interface NaverLogoProps {
  size?: number;
}

export const NaverLogo: React.FC<NaverLogoProps> = ({ size = 42.533 }) => {
  return (
    <View style={[styles.logo, { width: size, height: size }]}>
      {/* 여기에 실제 네이버 로고 이미지가 들어갈 예정 */}
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
