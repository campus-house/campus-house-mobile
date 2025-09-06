import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { COLORS } from '../../constants/colors';
import Svg, { Rect, Path } from 'react-native-svg';

interface VerificationCompleteModalProps {
  visible: boolean;
  onClose?: () => void;
}

export const VerificationCompleteModal: React.FC<VerificationCompleteModalProps> = ({ 
  visible, 
  onClose 
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* 주황색 원형 배경 + 체크 아이콘 */}
          <View style={styles.iconContainer}>
            <Svg width={39} height={38} viewBox="0 0 39 38" fill="none">
              <Rect 
                x="0.660156" 
                y="0" 
                width="37.471" 
                height="37.4798" 
                rx="18.7355" 
                fill={COLORS.primary}
              />
              <Path 
                d="M10.0273 17.8477L17.6164 24.9867L28.7628 12.4934" 
                stroke="white" 
                strokeWidth="2.525" 
                strokeLinecap="round"
              />
            </Svg>
          </View>

          {/* 텍스트 */}
          <Text style={styles.title}>인증완료!</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 184,
    height: 184,
    borderRadius: 15.41,
    backgroundColor: COLORS.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    color: COLORS.text.primary,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 32.87,
  },
});
