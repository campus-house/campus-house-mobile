import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@/constants/colors';
import { MenuIcon } from '@/components/Icon';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface ScrapItem {
  id: string;
  title: string;
  address: string;
}

interface EditScrapModalProps {
  visible: boolean;
  onClose: () => void;
  scrapItems: ScrapItem[];
  onReorder?: (items: ScrapItem[]) => void;
}

export default function EditScrapModal({ visible, onClose, scrapItems, onReorder }: EditScrapModalProps) {
  const [data, setData] = useState(scrapItems);

  React.useEffect(() => {
    setData(scrapItems);
  }, [scrapItems]);

  const handleComplete = () => {
    onReorder?.(data);
    onClose();
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<ScrapItem>) => {
    return (
      <View style={[styles.editCard, isActive && styles.editCardActive]}>
        <View style={styles.cardLeft}>
          <Svg
            width="19"
            height="23"
            viewBox="0 0 19 23"
            fill="none"
            style={styles.bookmarkIcon}
          >
            <Path
              d="M17 1H2.00106C1.44836 1 1.00048 1.44836 1.00106 2.00106L1.02079 20.5885C1.02152 21.2779 1.70326 21.7598 2.35343 21.5305L9.15668 19.1308C9.3714 19.0551 9.60553 19.0549 9.82037 19.1303L16.6689 21.533C17.3192 21.7612 18 21.2786 18 20.5894V2C18 1.44772 17.5523 1 17 1Z"
              fill="#FF805F"
              stroke="#FF805F"
              strokeWidth="1.8"
            />
          </Svg>

          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardAddress}>{item.address}</Text>
          </View>
        </View>

        {/* 3줄 아이콘 - 드래그 핸들 */}
        <TouchableOpacity
          onPressIn={drag}
          disabled={isActive}
          style={styles.menuIconContainer}
          activeOpacity={0.7}
        >
          <MenuIcon size={27} color={COLORS.neutral.grey4} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.editModal}>
          {/* 상단 버튼 */}
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.modalButton}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
              <Text style={styles.modalButton}>완료</Text>
            </TouchableOpacity>
          </View>

          {/* 드래그 가능한 스크랩 리스트 */}
          <GestureHandlerRootView style={styles.modalScrapList}>
            <DraggableFlatList
              data={data}
              onDragEnd={({ data }) => setData(data)}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          </GestureHandlerRootView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#A0A0A0',
    justifyContent: 'flex-end',
  },
  editModal: {
    width: '100%',
    height: 761,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#F9F9F9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 38,
    paddingBottom: 30,
    paddingHorizontal: 0,
    position: 'relative',
  },
  cancelButton: {
    position: 'absolute',
    left: 35,
    top: 39,
    width: 28,
    height: 22,
  },
  completeButton: {
    position: 'absolute',
    right: 30,
    top: 39,
    width: 28,
    height: 22,
  },
  modalButton: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.neutral.grey5,
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  modalScrapList: {
    flex: 1,
    paddingTop: 41,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  editCard: {
    width: '100%',
    height: 97,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 34,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 4,
  },
  editCardActive: {
    opacity: 0.9,
  },
  menuIconContainer: {
    position: 'absolute',
    right: 34,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkIcon: {
    width: 17,
    height: 21,
    marginRight: 29,
  },
  cardInfo: {
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    marginBottom: 4,
  },
  cardAddress: {
    fontSize: 15,
    fontWeight: '500',
    color: '#AAAAAA',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
});
