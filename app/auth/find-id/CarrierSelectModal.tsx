import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface CarrierSelectModalProps {
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
  'LGU+ 알뜰폰',
];

export default function CarrierSelectModal({ visible, onClose, onSelect }: CarrierSelectModalProps) {
  const handleSelect = (carrier: string) => {
    onSelect(carrier);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>통신사를 선택해주세요</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#323232"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Carrier List */}
          <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
            {carriers.map((carrier, index) => (
              <View key={carrier}>
                <TouchableOpacity
                  style={styles.carrierItem}
                  onPress={() => handleSelect(carrier)}
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
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    height: 400,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    width: '100%',
  },
  title: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22.519,
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  carrierItem: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  carrierText: {
    color: '#323232',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 0,
  },
});