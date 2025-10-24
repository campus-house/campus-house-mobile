import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import { PropertyMarker as PropertyMarkerType } from '@/src/types/property';
import { COLORS } from '@/constants/colors';

interface PropertyMarkerProps {
  property: PropertyMarkerType;
  onPress?: (property: PropertyMarkerType) => void;
}

export const PropertyMarker: React.FC<PropertyMarkerProps> = ({ property, onPress }) => {
  const formatPriceText = () => {
    const deposit = property?.price?.deposit ?? 0;
    const monthly = property?.price?.monthly ?? 0;
    
    // 보증금 포맷팅 (원 단위 → 만원 단위)
    const formatDeposit = (amount: number) => {
      const manwon = Math.floor(amount / 10000); // 만원 단위로 변환
      if (manwon >= 10000) {
        const eok = Math.floor(manwon / 10000);
        const cheon = Math.floor((manwon % 10000) / 1000);
        if (cheon > 0) {
          return `${eok}억 ${cheon}천`;
        }
        return `${eok}억`;
      } else if (manwon >= 1000) {
        const cheon = Math.floor(manwon / 1000);
        return `${cheon}천`;
      } else {
        return `${manwon}`;
      }
    };
    
    // 월세 포맷팅 (원 단위 → 만원 단위)
    const formatMonthly = (amount: number) => {
      const manwon = Math.floor(amount / 10000); // 만원 단위로 변환
      if (manwon >= 10000) {
        const eok = Math.floor(manwon / 10000);
        const cheon = Math.floor((manwon % 10000) / 1000);
        if (cheon > 0) {
          return `${eok}억 ${cheon}천`;
        }
        return `${eok}억`;
      } else if (manwon >= 1000) {
        const cheon = Math.floor(manwon / 1000);
        return `${cheon}천`;
      } else {
        return `${manwon}`;
      }
    };
    
    return `${formatDeposit(deposit)} / ${formatMonthly(monthly)}만원`;
  };

  return (
    <NaverMapMarkerOverlay
      latitude={property.latitude}
      longitude={property.longitude}
      onTap={() => onPress?.(property)}
      width={131}
      height={72}
      anchor={{ x: 0.0, y: 1.0 }}
    >
      <View style={styles.card}>
        {/* 위쪽 절반 (흰색) */}
        <View style={styles.topHalf}>
          <Text style={styles.titleText} numberOfLines={1}>
            {property.buildingName ?? ''}
          </Text>
        </View>

        {/* 아래쪽 절반 (주황색) */}
        <View style={styles.bottomHalf}>
          <Text style={styles.priceText}>{formatPriceText()}</Text>
        </View>
      </View>
    </NaverMapMarkerOverlay>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 131,
    height: 72,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
  },
  topHalf: {
    width: 131,
    height: 36,
    backgroundColor: COLORS.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 4,
  },
  bottomHalf: {
    width: 131,
    height: 36,
    backgroundColor: COLORS.primary,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingTop: 6,
  },
  titleText: {
    fontFamily: 'Pretendard',
    fontSize: 15.2,
    lineHeight: 20,
    fontWeight: '600',
    color: COLORS.neutral.grey5,
    textAlign: 'center',
  },
  priceText: {
    fontFamily: 'Pretendard',
    fontSize: 15.2,
    lineHeight: 20,
    fontWeight: '500',
    color: COLORS.neutral.white,
    textAlign: 'center',
  },
});

export default PropertyMarker;
