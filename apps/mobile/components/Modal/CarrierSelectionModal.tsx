import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../../constants/colors';
import Svg, { Path } from 'react-native-svg';

interface CarrierSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (carrier: string) => void;
}

const carriers = [
  'SKT',
  'KT',
  'LGU+',
  'SKT 알뜰폰',
  'KT 알뜰폰',
  'LGU+ 알뜰폰'
];

export const CarrierSelectionModal: React.FC<CarrierSelectionModalProps> = ({ 
  visible, 
  onClose, 
  onSelect 
}) => {
  const handleCarrierSelect = (carrier: string) => {
    onSelect(carrier);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* 헤더 */}
          <View style={styles.header}>
            <Text style={styles.title}>통신사를 선택해주세요</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Svg width={15} height={15} viewBox="0 0 15 15" fill="none">
                <Path
                  d="M13.5 1L1 13.5"
                  stroke="#636363"
                  strokeWidth="1.39031"
                  strokeLinecap="round"
                />
                <Path
                  d="M0.999999 0.99999L13.5 13.5"
                  stroke="#636363"
                  strokeWidth="1.39031"
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* 통신사 목록 */}
          <ScrollView style={styles.carrierList}>
            {carriers.map((carrier, index) => (
              <View key={carrier}>
                <TouchableOpacity 
                  style={styles.carrierItem} 
                  onPress={() => handleCarrierSelect(carrier)}
                >
                  <Text style={styles.carrierText}>{carrier}</Text>
                </TouchableOpacity>
                {index < carriers.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.background.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    width: 213,
    color: COLORS.text.primary,
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22.519,
    textAlign: 'center',
    flex: 1,
  },
  closeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carrierList: {
    flex: 1,
  },
  carrierItem: {
    width: 333,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  carrierText: {
    width: 333,
    height: 36,
    color: COLORS.text.primary,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 27.2,
  },
  separator: {
    width: 333,
    height: 1.5,
    backgroundColor: COLORS.neutral.grey2,
    marginVertical: 8,
  },
});
