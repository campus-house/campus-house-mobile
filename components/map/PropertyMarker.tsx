import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import { PropertyMarker as PropertyMarkerType } from '@/src/types/property';
import { COLORS } from '@/constants/colors';

interface PropertyMarkerProps {
  property: PropertyMarkerType;
  onPress?: (property: PropertyMarkerType) => void;
  zoomLevel?: number;
  isClustered?: boolean;
}

export const PropertyMarker: React.FC<PropertyMarkerProps> = ({ 
  property, 
  onPress, 
  zoomLevel = 15, 
  isClustered = false 
}) => {
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

  // 줌 레벨에 따른 투명도 계산 (클러스터 모드가 아닐 때만 불투명하게)
  const getOpacity = () => {
    if (isClustered) return 1.0; // 클러스터 모드에서는 항상 불투명
    return 1.0; // 개별 마커는 항상 불투명하게 표시
  };

  // 줌 레벨에 따른 크기 조정 (일괄적으로 줄임)
  const getMarkerSize = () => {
    if (zoomLevel < 14) return { width: 80, height: 44 }; // 20px씩 줄임
    if (zoomLevel < 15) return { width: 90, height: 50 }; // 25px씩 줄임
    return { width: 100, height: 55 }; // 31px씩 줄임
  };

  const opacity = getOpacity();
  const size = getMarkerSize();

  return (
    <NaverMapMarkerOverlay
      latitude={property.latitude}
      longitude={property.longitude}
      onTap={() => onPress?.(property)}
      width={size.width}
      height={size.height}
      anchor={{ x: 0.0, y: 1.0 }}
    >
      <View style={[styles.card, { width: size.width, height: size.height, opacity }]}>
        {/* 위쪽 절반 (흰색) */}
        <View style={[styles.topHalf, { width: size.width, height: size.height / 2 }]}>
          <Text style={[styles.titleText, { fontSize: size.width < 100 ? 10 : 12 }]} numberOfLines={1}>
            {property.buildingName ?? ''}
          </Text>
        </View>

        {/* 아래쪽 절반 (주황색) */}
        <View style={[styles.bottomHalf, { width: size.width, height: size.height / 2 }]}>
          <Text style={[styles.priceText, { fontSize: size.width < 100 ? 10 : 12 }]}>{formatPriceText()}</Text>
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
    paddingHorizontal: 5, // 11 → 8로 줄임
    paddingVertical: 1, // 4 → 2로 줄임
  },
  bottomHalf: {
    width: 131,
    height: 36,
    backgroundColor: COLORS.primary,
    justifyContent: 'center', // flex-start → center로 변경
    alignItems: 'center',
    paddingHorizontal: 8, // 11 → 8로 줄임
    paddingTop: 0, // 6 → 0으로 줄임
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
