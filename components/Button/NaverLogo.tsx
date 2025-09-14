import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface NaverLogoProps {
  size?: number;
}

export const NaverLogo: React.FC<NaverLogoProps> = ({ size = 42.533 }) => {
  return (
    <Image 
      source={require('@/assets/images/naver_logo.png')} 
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
