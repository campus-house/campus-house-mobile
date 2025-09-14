import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface GoogleLogoProps {
  width?: number;
  height?: number;
}

export const GoogleLogo: React.FC<GoogleLogoProps> = ({ width = 32.506, height = 35.292 }) => {
  return (
    <Image 
      source={require('@/assets/images/google_logo.png')} 
      style={[styles.logo, { width, height }]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    flexShrink: 0,
  },
});
