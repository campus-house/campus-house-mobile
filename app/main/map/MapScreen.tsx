import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import { NaverMapView, type Camera, type NaverMapViewRef } from '@mj-studio/react-native-naver-map';
import { COLORS } from '@/constants/colors';
import { PropertyMarker } from '@/components/map/PropertyMarker';
import PropertyModal from '@/components/map/PropertyModal';
import { PropertyMarker as PropertyMarkerType } from '@/src/types/property';
import { loadMockProperties } from '@/src/data/mockProperties';

const { width, height } = Dimensions.get('window');

/**
 * 지도 화면 컴포넌트
 * 네이버 맵을 사용하여 매물 마커를 표시하고 상호작용을 처리
 */
export default function MapScreen() {
  const mapRef = useRef<NaverMapViewRef>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 매물 데이터 state
  const [properties, setProperties] = useState<PropertyMarkerType[]>([]);
  const [isLoadingProperties, setIsLoadingProperties] = useState(false);

  // 모달 state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyMarkerType | null>(null);

  /**
   * 매물 데이터 로드 함수
   */
  const loadProperties = async () => {
    try {
      setIsLoadingProperties(true);
      const mockData = await loadMockProperties();
      setProperties(mockData);
    } catch (error) {
      console.error('매물 데이터 로드 실패:', error);
    } finally {
      setIsLoadingProperties(false);
    }
  };

  /**
   * 지도 초기화 완료 시 호출
   */
  const handleMapReady = () => {
    setIsLoading(false);
    // 지도 준비 완료 후 매물 데이터 로드
    loadProperties();
  };

  /**
   * 컴포넌트 마운트 시 초기 데이터 로드
   */
  useEffect(() => {
    // 지도가 준비되면 자동으로 loadProperties() 호출됨
  }, []);

  /**
   * 매물 마커 클릭 시 호출
   * @param property 클릭된 매물 정보
   */
  const handleMarkerPress = (property: PropertyMarkerType) => {
    console.log('매물 클릭:', property);
    setSelectedProperty(property);
    setModalVisible(true);
  };

  /**
   * 모달 닫기
   */
  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedProperty(null);
  };

  const initialCamera: Camera = {
    latitude: 37.2518069000003, // mockProperties와 일치
    longitude: 127.0774401000001, // mockProperties와 일치
    zoom: 16,
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>지도를 불러오는 중...</Text>
        </View>
      )}
      <NaverMapView
        ref={mapRef}
        style={styles.map}
        initialCamera={initialCamera}
        customStyleId="922c3502-bc54-427b-a1fa-f99887a68a64"
        onCustomStyleLoaded={() => {
          console.log('커스텀 스타일 로드 완료');
        }}
        onCustomStyleLoadFailed={(params) => {
          console.log('커스텀 스타일 로드 실패:', params.message);
        }}
        onInitialized={handleMapReady}
        isShowLocationButton={false}
        isShowScaleBar={false}
        isShowCompass={false}
        isShowZoomControls={true}
      >
        {/* 매물 마커들 렌더링 */}
        {properties.map((property) => (
          <PropertyMarker key={property.id} property={property} onPress={handleMarkerPress} />
        ))}
      </NaverMapView>

      {/* 매물 상세 모달 */}
      <PropertyModal
        visible={modalVisible}
        property={selectedProperty}
        onClose={handleModalClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  map: {
    flex: 1,
    width,
    height,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.text.secondary,
    fontFamily: 'Pretendard',
  },
});
