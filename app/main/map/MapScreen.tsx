import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text, TouchableOpacity, TextInput, Animated } from 'react-native';
import { NaverMapView, type Camera, type NaverMapViewRef } from '@mj-studio/react-native-naver-map';
import { COLORS } from '@/constants/colors';
import { PropertyMarker } from '@/components/map/PropertyMarker';
import PropertyModal from '@/components/map/PropertyModal';
import FilterModal from '@/components/map/FilterModal';
import SearchModal from '@/components/map/SearchModal';
import { PropertyMarker as PropertyMarkerType } from '@/src/types/property';
import { loadMockProperties } from '@/src/data/mockProperties';
import { FilterIcon, SearchIcon } from '@/components/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

/**
 * 지도 화면 컴포넌트
 * 네이버 맵을 사용하여 매물 마커를 표시하고 상호작용을 처리
 */
export default function MapScreen() {
  const mapRef = useRef<NaverMapViewRef>(null);
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();

  // 매물 데이터 state
  const [properties, setProperties] = useState<PropertyMarkerType[]>([]);
  const [isLoadingProperties, setIsLoadingProperties] = useState(false);

  // 모달 state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyMarkerType | null>(null);
  
  // 필터 모달 state
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  
  // 검색 모달 state
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  
  // 상단 UI 애니메이션
  const topUIOffset = useRef(new Animated.Value(0)).current;

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
    // 지도를 실제 건물 위치로 포커스 (화면 상단 1/3에 위치)
    if (mapRef.current) {
      // 실제 건물 위치 (property 객체에서 가져옴)
      const actualLatitude = property.latitude; // 실제 건물 위치
      const actualLongitude = property.longitude; // 실제 건물 위치
      
      // 화면 상단 40% 지점에 위치시키기 위한 위도 오프셋 계산
      // 줌 레벨 16에서의 대략적인 위도 오프셋
      const latitudeOffset = 0.001; // 실제 건물 위치가 화면 상단 40% 지점에 오도록 카메라를 위로 이동
      
      mapRef.current.animateCameraTo({
        latitude: actualLatitude - latitudeOffset, // 카메라를 위로 이동시켜 건물이 상단 1/3에 오게 함
        longitude: actualLongitude, // 실제 건물 위치
        zoom: 16, // 원하는 줌 레벨
      });
    }
    
    setSelectedProperty(property);
    setModalVisible(true);
  };

  /**
   * 모달 닫기
   */
  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedProperty(null);
    // 상단 UI를 원래 위치로 되돌림
    topUIOffset.setValue(0);
  };

  /**
   * 모달 높이 변경 핸들러
   * @param ratio 모달이 확장된 비율 (0 ~ 1)
   */
  const handleModalHeightChange = (ratio: number) => {
    // 모달이 올라갈수록 (ratio가 1에 가까워질수록) 상단 UI를 위로 이동
    // 최대 -150px까지 위로 이동 (화면 밖으로 사라지도록)
    const offset = -150 * ratio;
    topUIOffset.setValue(offset);
  };

  const initialCamera: Camera = {
    latitude: 37.2518069000003, // mockProperties와 일치
    longitude: 127.0774401000001, // mockProperties와 일치
    zoom: 16,
  };

  return (
    <View style={styles.container}>
      {/* 상단 UI - 애니메이션 적용 */}
      <Animated.View 
        style={[
          styles.topContainer,
          {
            transform: [{ translateY: topUIOffset }],
          }
        ]}
      >
        {/* 필터 버튼 */}
        <TouchableOpacity 
          style={[styles.filterButton, { top: insets.top + 20 }]}
          onPress={() => setFilterModalVisible(true)}
        >
          <FilterIcon size={25} color={COLORS.primary} />
        </TouchableOpacity>
        
          {/* 검색창 */}
          <TouchableOpacity 
            style={[styles.searchContainer, { top: insets.top + 14 }]}
            onPress={() => setSearchModalVisible(true)}
            activeOpacity={0.8}
          >
            <TextInput
              style={styles.searchInput}
              placeholder="어느 집이 궁금하세요?"
              placeholderTextColor={COLORS.neutral.grey5}
              editable={false}
              pointerEvents="none"
            />
            <View style={styles.searchIconContainer}>
              <SearchIcon size={23.2878} color={COLORS.neutral.grey5} />
            </View>
          </TouchableOpacity>
      </Animated.View>

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
        isVisible={modalVisible}
        property={selectedProperty}
        onClose={handleModalClose}
        onHeightChange={handleModalHeightChange}
      />
      
      {/* 필터 모달 */}
      <FilterModal
        isVisible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
      />
      
      {/* 검색 모달 */}
      <SearchModal
        isVisible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  topContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  filterButton: {
    position: 'absolute',
    left: 24,
    width: 50,
    height: 46.4286,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    position: 'absolute',
    left: 86, // 24 + 50 + 12 (필터 버튼 + 마진)
    right: 24,
    height: 57,
    backgroundColor: '#FFFFFF',
    borderRadius: 27.5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingLeft: 25,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
    color: '#636363',
    fontFamily: 'Pretendard',
  },
  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
