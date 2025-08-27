import React from 'react';
import { View, StyleSheet } from 'react-native';

interface GoogleLogoProps {
  width?: number;
  height?: number;
}

export const GoogleLogo: React.FC<GoogleLogoProps> = ({ width = 32.506, height = 35.292 }) => {
  return (
    <View style={[styles.logo, { width, height }]}>
      {/* 여기에 실제 구글 로고 이미지가 들어갈 예정 */}
      {/* 현재는 placeholder로 lightgray 배경만 적용 */}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    flexShrink: 0,
    aspectRatio: 35 / 38,
    backgroundColor: 'lightgray',
    borderRadius: 2, // 약간의 둥근 모서리
    justifyContent: 'center',
    alignItems: 'center',
  },
});
