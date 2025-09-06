import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Animated } from 'react-native';
import { COLORS } from '../../constants/colors';
import Svg, { Circle } from 'react-native-svg';

interface LoadingModalProps {
  visible: boolean;
  onClose?: () => void;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({ visible, onClose }) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setCurrentPosition(prev => (prev + 1) % 3);
    }, 500);

    return () => clearInterval(interval);
  }, [visible]);

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < 3; i++) {
      const isActive = i === currentPosition;
      const opacity = isActive ? 1 : (i === (currentPosition + 1) % 3 ? 0.76 : 0.28);
      
      dots.push(
        <Circle
          key={i}
          cx={5.36184 + (i * 25.21586)}
          cy={5.30324}
          r={4.84914}
          fill={COLORS.primary}
          fillOpacity={opacity}
        />
      );
    }
    return dots;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* 로딩 애니메이션 */}
          <View style={styles.loadingContainer}>
            <Svg width={61} height={11} viewBox="0 0 61 11" fill="none">
              {renderDots()}
            </Svg>
          </View>

          {/* 텍스트 */}
          <Text style={styles.title}>잠시만 기다려주세요!</Text>
          <Text style={styles.subtitle}>평균 10~15초 정도 소모돼요</Text>
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
    width: 330.447,
    height: 147.533,
    borderRadius: 12.206,
    backgroundColor: COLORS.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  loadingContainer: {
    marginBottom: 20,
  },
  title: {
    color: COLORS.text.primary,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 26.035,
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.neutral.grey5,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 14.877,
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 26.035,
  },
});
