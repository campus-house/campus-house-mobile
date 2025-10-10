import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { COLORS } from '@/constants/colors';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLayoutScale } from '@/utils/layout';

interface CarrierSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (carrier: string) => void;
}

const carriers = ['SKT', 'KT', 'LGU+', 'SKT 알뜰폰', 'KT 알뜰폰', 'LGU+ 알뜰폰'];

export const CarrierSelectionModal: React.FC<CarrierSelectionModalProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const { y, insets, figma } = useLayoutScale();
  const { height: screenHeight } = useWindowDimensions();

  const handleCarrierSelect = (carrier: string) => {
    onSelect(carrier);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent>
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContainer,
            {
              height: Math.max(0, screenHeight - 362),
              paddingBottom: insets.bottom + 20,
            },
          ]}
        >
          {/* 헤더 */}
          <View style={[styles.header, { marginTop: y(5) }]}>
            <Text style={styles.title} maxFontSizeMultiplier={1.2}>
              통신사를 선택해주세요
            </Text>
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
          <ScrollView contentContainerStyle={styles.carrierList} showsVerticalScrollIndicator={false}>
            {carriers.map((carrier, index) => (
              <View key={carrier}>
                <TouchableOpacity
                  style={styles.carrierItem}
                  onPress={() => handleCarrierSelect(carrier)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.carrierText} maxFontSizeMultiplier={1.2}>
                    {carrier}
                  </Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.neutral.white,
    borderTopLeftRadius: 34.5,
    borderTopRightRadius: 34.5,
    width: '100%',
    flexShrink: 0,
    paddingHorizontal: 32,
    paddingTop: 30,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.01,
    shadowRadius: 1,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  title: {
    color: COLORS.text.primary,
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22.519,
    textAlign: 'left',
    flex: 1,
  },
  closeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -8,
  },
  carrierList: {
    paddingBottom: 16,
  },
  carrierItem: {
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    width: '100%',
  },
  carrierText: {
    color: COLORS.text.primary,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 27.2,
    width: '100%',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.neutral.grey2,
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    width: '100%',
  },
});
