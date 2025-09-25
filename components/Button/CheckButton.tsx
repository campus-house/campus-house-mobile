import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';
import { CheckIcon } from '@/components/Icon/CheckIcon';

interface GreyCheckButtonProps {
  onPress?: () => void;
  isSelected?: boolean;
}

export const GreyCheckButton: React.FC<GreyCheckButtonProps> = ({
  onPress,
  isSelected = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.buttonSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <CheckIcon color={COLORS.neutral.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 29.68,
    height: 28.45,
    borderRadius: 14.225, // height / 2 for perfect circle
    backgroundColor: COLORS.neutral.grey3, // 기본 상태: 회색
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: COLORS.primary, // 선택 상태: 주황색
  },
});
