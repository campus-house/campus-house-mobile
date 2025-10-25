import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import { COLORS } from '@/constants/colors';

interface ClusterMarkerProps {
  cluster: {
    id: string;
    latitude: number;
    longitude: number;
    count: number;
    markers: any[];
  };
  onPress?: (cluster: any) => void;
}

export const ClusterMarker: React.FC<ClusterMarkerProps> = ({ cluster, onPress }) => {
  // 숫자에 따른 크기 조정 (건물 개수에 비례)
  const getClusterSize = (count: number) => {
    // 최소 크기 40px, 최대 크기 90px로 제한 (10px씩 증가)
    const baseSize = 40;
    const maxSize = 90;
    const increment = 5; // 건물 개수당 5px씩 증가
    
    const calculatedSize = baseSize + (count * increment);
    return Math.min(calculatedSize, maxSize); // 최대 크기 제한
  };

  const getFontSize = (count: number) => {
    // 마커 크기에 비례하여 폰트 크기 조정
    const baseFontSize = 10;
    const maxFontSize = 18;
    const increment = 0.8; // 건물 개수당 0.8px씩 증가
    
    const calculatedFontSize = baseFontSize + (count * increment);
    return Math.min(calculatedFontSize, maxFontSize); // 최대 폰트 크기 제한
  };

  const size = getClusterSize(cluster.count);
  const fontSize = getFontSize(cluster.count);

  return (
    <NaverMapMarkerOverlay
      latitude={cluster.latitude}
      longitude={cluster.longitude}
      onTap={() => onPress?.(cluster)}
      width={size}
      height={size}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <TouchableOpacity
        style={[
          styles.clusterContainer,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          }
        ]}
        onPress={() => onPress?.(cluster)}
      >
        <Text style={[styles.clusterText, { fontSize }]}>
          {cluster.count}
        </Text>
      </TouchableOpacity>
    </NaverMapMarkerOverlay>
  );
};

const styles = StyleSheet.create({
  clusterContainer: {
    backgroundColor: '#FF805FB2', // 70% 투명도의 주황색
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 0, // 테두리 제거
    // borderRadius는 동적으로 size / 2로 설정되어 완벽한 원형
  },
  clusterText: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 16,
    textAlign: 'center',
  },
});

export default ClusterMarker;
