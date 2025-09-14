import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

interface IdentityVerificationErrorModalProps {
  visible: boolean;
  onClose: () => void;
}

export const IdentityVerificationErrorModal: React.FC<IdentityVerificationErrorModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Svg width="393" height="855" viewBox="0 0 393 855" fill="none" style={styles.overlaySvg}>
          <Path d="M-17 -14H438V855H-17V-14Z" fill="black" fillOpacity="0.5" />
        </Svg>
        <View style={styles.modalContainer}>
          <Text style={styles.errorMessage}>
            입력정보 오류로 본인인증에{'\n'}실패하였습니다. 다시 시도해 주세요.
          </Text>
          <View style={styles.separator}>
            <Svg width="344" height="2" viewBox="0 0 344 2" fill="none">
              <Path
                d="M0 1L343.479 0.99997"
                stroke={COLORS.background.tertiary}
                strokeWidth="1.35"
              />
            </Svg>
          </View>
          <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
            <Text style={styles.confirmButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlaySvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    width: 343.479,
    height: 154,
    flexShrink: 0,
    borderRadius: 11.5,
    backgroundColor: COLORS.neutral.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorMessage: {
    width: 263,
    height: 55.228,
    flexShrink: 0,
    color: COLORS.neutral.grey5,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    marginBottom: 20,
  },
  separator: {
    width: 343.479,
    height: 0,
    flexShrink: 0,
    marginBottom: 20,
  },
  confirmButton: {
    padding: 10,
  },
  confirmButtonText: {
    width: 28,
    height: 27.698,
    flexShrink: 0,
    color: COLORS.primary,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24.529,
  },
});
