import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../../constants/colors';

interface GreyCheckIconProps {
  onPress?: () => void;
  isSelected?: boolean;
  size?: number;
}

export const GreyCheckIcon: React.FC<GreyCheckIconProps> = ({
  onPress,
  isSelected = false,
  size = 15.5,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Svg width={size} height={size * (10.43 / 15.5)} viewBox="0 0 15.5 10.43" fill="none">
        <Path
          d="M1.5 5.5L6 10L13.5 1"
          stroke={isSelected ? COLORS.primary : COLORS.neutral.grey3}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});
