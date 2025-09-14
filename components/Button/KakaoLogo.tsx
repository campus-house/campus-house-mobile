import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface KakaoLogoProps {
  size?: number;
}

export const KakaoLogo: React.FC<KakaoLogoProps> = ({ size = 42.533 }) => {
  return (
    <Image 
      source={require('@/assets/images/kakao_logo.png')} 
      style={[styles.logo, { width: size, height: size }]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    flexShrink: 0,
  },
});
