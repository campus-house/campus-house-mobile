import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text, TouchableOpacity, TextInput, Animated, Alert } from 'react-native';
import { NaverMapView, NaverMapMarkerOverlay, type Camera, type NaverMapViewRef } from '@mj-studio/react-native-naver-map';
import { COLORS } from '@/constants/colors';
import { PropertyMarker } from '@/components/map/PropertyMarker';
import { ClusterMarker } from '@/components/map/ClusterMarker';
import PropertyModal from '@/components/map/PropertyModal';
import FilterModal from '@/components/map/FilterModal';
import SearchModal from '@/components/map/SearchModal';
import { PropertyMarker as PropertyMarkerType } from '@/src/types/property';
import { loadMockProperties } from '@/src/data/mockProperties';
import { FilterIcon, SearchIcon } from '@/components/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getBuildings, getBuildingReviews } from '@/api/building';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';

const { width, height } = Dimensions.get('window');

/**
 * 지도 화면 컴포넌트
 * 네이버 맵을 사용하여 매물 마커를 표시하고 상호작용을 처리
 */
export default function MapScreen() {
  const mapRef = useRef<NaverMapViewRef>(null);
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();
  
  // URL 파라미터에서 건물 정보 받기
  const { buildingId, buildingName, isScraped } = useLocalSearchParams();

  // 매물 데이터 state
  const [properties, setProperties] = useState<PropertyMarkerType[]>([]);
  const [isLoadingProperties, setIsLoadingProperties] = useState(false);
  
  // 클러스터링 관련 state
  const [clusteredMarkers, setClusteredMarkers] = useState<any[]>([]);
  const [currentZoomLevel, setCurrentZoomLevel] = useState(15);
  const [showClusters, setShowClusters] = useState(true);

  // 모달 state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyMarkerType | null>(null);
  
  // 건물 후기 state
  const [buildingReviews, setBuildingReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  
  // 필터 모달 state
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  
  // 검색 모달 state
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  
  // 로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  
  // 상단 UI 애니메이션
  const topUIOffset = useRef(new Animated.Value(0)).current;

  /**
   * 평균 별점 계산 함수
   */
  const calculateAverageRating = (reviews: any[]) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return Math.round((totalRating / reviews.length) * 10) / 10; // 소수점 첫째자리까지
  };

  /**
   * 간단한 로그인 함수 (JWT 없이)
   */
  const simpleLogin = async (email: string, password: string) => {
    try {
      // 서버에 로그인 요청 (JWT 없이)
      const response = await global.fetch('http://172.30.1.54:8080/api/auth/simple-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        
        // 로그인 상태 저장
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
        
        setIsLoggedIn(true);
        setUserInfo(userData);
        
        console.log('로그인 성공:', userData);
        return true;
      } else {
        console.log('로그인 실패:', response.status);
        return false;
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      return false;
    }
  };

  /**
   * 마커 클러스터링 함수
   */
  const clusterMarkers = (markers: PropertyMarkerType[], zoomLevel: number) => {
    const clusterDistance = zoomLevel < 14 ? 100 : zoomLevel < 16 ? 50 : 25; // 줌 레벨에 따른 클러스터 거리
    const clusters: any[] = [];
    const processed = new Set<number>();

    markers.forEach((marker, index) => {
      if (processed.has(index)) return;

      const cluster = {
        id: `cluster_${index}`,
        latitude: marker.latitude,
        longitude: marker.longitude,
        markers: [marker],
        count: 1,
      };

      // 주변 마커들을 찾아서 클러스터에 추가
      markers.forEach((otherMarker, otherIndex) => {
        if (index === otherIndex || processed.has(otherIndex)) return;

        const distance = getDistance(
          marker.latitude, marker.longitude,
          otherMarker.latitude, otherMarker.longitude
        );

        if (distance <= clusterDistance) {
          cluster.markers.push(otherMarker);
          cluster.count++;
          processed.add(otherIndex);
        }
      });

      processed.add(index);
      clusters.push(cluster);
    });

    return clusters;
  };

  /**
   * 두 좌표 간의 거리 계산 (미터 단위)
   */
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371000; // 지구 반지름 (미터)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  /**
   * 지도 줌 레벨 변경 처리
   */
  const handleCameraChange = (camera: Camera) => {
    const newZoomLevel = camera.zoom || 15;
    setCurrentZoomLevel(newZoomLevel);
    
    // 줌 레벨에 따른 클러스터링 업데이트
    if (properties.length > 0) {
      const clusters = clusterMarkers(properties, newZoomLevel);
      setClusteredMarkers(clusters);
      
      // 줌 레벨이 높으면 개별 마커 표시, 낮으면 클러스터 표시
      setShowClusters(newZoomLevel < 16);
    }
  };

  /**
   * 로그인 상태 확인
   */
  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const userInfo = await AsyncStorage.getItem('userInfo');
      
      if (isLoggedIn === 'true' && userInfo) {
        setIsLoggedIn(true);
        setUserInfo(JSON.parse(userInfo));
        console.log('로그인 상태 복원:', JSON.parse(userInfo));
          }
        } catch (error) {
      console.error('로그인 상태 확인 에러:', error);
    }
  };


  /**
   * 매물 데이터 로드 함수 (서버 연동)
   */
  const loadProperties = async () => {
    try {
      setIsLoadingProperties(true);
      
      // 방법 1: 전체 데이터 로드 (간단한 방식) - 인증 없이 테스트
      const buildings = await getBuildings({ page: 0, size: 50 });
      
      if (buildings.content) {
        // 서버 데이터를 PropertyMarker 형태로 변환
        const serverProperties = buildings.content.map((building: any, index: number) => ({
          id: `server_${building.id}`,
          buildingName: building.buildingName,
          latitude: building.latitude,
          longitude: building.longitude,
          price: {
            deposit: (building.deposit || 0) * 10000, // 만원 단위를 원 단위로 변환
            monthly: (building.monthlyRent || 0) * 10000, // 만원 단위를 원 단위로 변환
          },
          // 서버에서 받은 추가 정보들
          address: building.address,
          scrapCount: building.scrapCount || 0,
          buildingUsage: building.buildingUsage,
          // 나중에 상세 정보 로드용
          buildingId: building.id,
        }));
        
        setProperties(serverProperties);
        
        // 초기 클러스터링 설정
        const initialClusters = clusterMarkers(serverProperties, currentZoomLevel);
        setClusteredMarkers(initialClusters);
        
        console.log(`서버에서 ${serverProperties.length}개 건물 로드 완료`);
      }
    } catch (error) {
      console.error('매물 데이터 로드 실패:', error);
      // 실패시 Mock 데이터 사용
      const mockData = await loadMockProperties();
      setProperties(mockData);
    } finally {
      setIsLoadingProperties(false);
    }
  };

  /**
   * 지도 초기화 완료 시 호출
   */
  const handleMapReady = () => {
      setIsLoading(false);
    console.log('NaverMap initialized');
    console.log('지도 스타일 ID:', '922c3502-bc54-427b-a1fa-f99887a68a64');
    // 지도 준비 완료 후 매물 데이터 로드
    loadProperties();
  };

  /**
   * 컴포넌트 마운트 시 초기 데이터 로드
   */
  useEffect(() => {
    checkLoginStatus(); // 로그인 상태 확인
    // 지도가 준비되면 자동으로 loadProperties() 호출됨
  }, []);

  /**
   * 스크랩에서 전달된 건물 정보로 건물 포커스 및 상세 정보 표시
   */
  useEffect(() => {
    if ((buildingId || buildingName) && properties.length > 0) {
      console.log('스크랩에서 전달된 정보:', { buildingId, buildingName });
      console.log('현재 properties 개수:', properties.length);
      
      // 건물 이름으로 매칭 (로컬 properties에서 먼저 시도)
      let targetProperty = null;
      
      if (buildingName) {
        console.log('건물 이름으로 매칭 시도:', buildingName);
        
        // 1단계: 로컬 properties에서 매칭 시도
        targetProperty = properties.find(property => {
          const propName = (property as any).buildingName;
          const match = propName === buildingName;
          console.log('로컬 이름 비교:', { propName, buildingName, match });
          return match;
        });
        
        // 2단계: 로컬에서 찾지 못했으면 API 검색 시도 (비활성화)
        if (!targetProperty) {
          console.log('로컬에서 찾지 못함, API 검색은 현재 비활성화');
          // TODO: API 검색 기능 구현 필요
        }
      }
      
      // ID 매칭은 비활성화 (스크랩 ID와 맵 buildingId가 다름)
      if (!targetProperty && buildingId) {
        console.log('ID 매칭 시도 (비활성화됨):', buildingId);
        console.log('스크랩 ID와 맵 buildingId가 다르므로 이름으로만 매칭');
      }
      
      if (targetProperty) {
        console.log('해당 건물 찾음:', targetProperty);
        
        // 건물 위치로 카메라 이동
        if (mapRef.current) {
          const latitudeOffset = 0.001;
          mapRef.current.animateCameraTo({
            latitude: targetProperty.latitude - latitudeOffset,
            longitude: targetProperty.longitude,
            zoom: 16,
          });
        }
        
        // 건물 상세 정보 표시
        setTimeout(() => {
          handleMarkerPress(targetProperty);
        }, 1000); // 카메라 이동 후 1초 뒤에 상세 정보 표시
      } else {
        console.log('해당 건물을 찾을 수 없습니다:', { buildingId, buildingName });
        console.log('사용 가능한 건물들:', properties.map(p => ({
          id: (p as any).id,
          buildingId: (p as any).buildingId,
          buildingName: (p as any).buildingName
        })));
      }
    }
  }, [buildingId, buildingName, properties]);

  /**
   * 매물 마커 클릭 시 호출 (서버 연동)
   * @param property 클릭된 매물 정보
   */
  const handleMarkerPress = async (property: PropertyMarkerType) => {
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
    
    // 건물 후기 조회 (buildingId가 있는 경우)
    if ((property as any).buildingId) {
      try {
        console.log(`건물 ${(property as any).buildingId} 후기 조회 중...`);
        setIsLoadingReviews(true);
        const reviewsData = await getBuildingReviews((property as any).buildingId);
        setBuildingReviews(reviewsData.content || []);
        setIsLoadingReviews(false);
        
        // 후기 정보를 property에 병합
        const enrichedProperty = {
          ...property,
          reviews: reviewsData.content || [],
          totalReviews: reviewsData.totalElements || 0,
          averageRating: calculateAverageRating(reviewsData.content || []),
        };
        
        setSelectedProperty(enrichedProperty);
        console.log('건물 후기 로드 완료:', enrichedProperty);
      } catch (error) {
        console.error('건물 후기 로드 실패:', error);
        setIsLoadingReviews(false);
        
        // 실패시 기본 정보로 표시
        setSelectedProperty(property);
      }
    } else {
      // Mock 데이터인 경우
      setSelectedProperty(property);
    }
    
    setModalVisible(true);
  };

  /**
   * 검색 결과 처리
   */
  const handleSearchResult = (building: any) => {
    console.log('검색 결과 처리:', building);
    
    // 건물 정보를 PropertyMarker 형태로 변환
    const property: PropertyMarkerType = {
      id: `search_${building.id}`,
      buildingName: building.buildingName,
      latitude: building.latitude,
      longitude: building.longitude,
      price: {
        deposit: building.deposit || 0,
        monthly: building.monthlyRent || 0,
      },
      buildingId: building.id,
      address: building.address,
      scrapCount: building.scrapCount || 0,
      buildingUsage: building.buildingUsage,
    };

    // 지도를 해당 위치로 이동
    if (mapRef.current) {
      mapRef.current.animateCameraTo({
        latitude: building.latitude,
        longitude: building.longitude,
        zoom: 16,
      });
    }

    // 오버레이 표시
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
    latitude: 37.2518069000003, // 원래 위치로 복구
    longitude: 127.0774401000001, // 원래 위치로 복구
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
        onCameraChanged={handleCameraChange}
        isShowLocationButton={false}
        isShowScaleBar={false}
        isShowCompass={false}
        isShowZoomControls={true}
      >
        {/* 클러스터링된 마커들 또는 개별 마커들 렌더링 */}
        {showClusters ? (
          // 클러스터 표시 (줌 레벨이 낮을 때) - 클러스터만 표시
          clusteredMarkers.map((cluster) => (
            <ClusterMarker 
              key={cluster.id} 
              cluster={cluster} 
              onPress={(cluster) => {
                // 클러스터 클릭 시 줌 레벨을 높여서 개별 마커들이 보이도록 함
                mapRef.current?.animateRegionTo({
                  latitude: cluster.latitude,
                  longitude: cluster.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                });
              }} 
            />
          ))
        ) : (
          // 개별 마커 표시 (줌 레벨이 높을 때) - 기존처럼 불투명하게
          properties.map((property) => (
            <PropertyMarker 
              key={property.id} 
              property={property} 
              onPress={handleMarkerPress}
              zoomLevel={currentZoomLevel}
              isClustered={false}
            />
          ))
        )}
      </NaverMapView>

      {/* 매물 상세 모달 */}
      <PropertyModal
        isVisible={modalVisible}
        property={selectedProperty}
        onClose={handleModalClose}
        onHeightChange={handleModalHeightChange}
        initialScrapStatus={isScraped === 'true'}
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
        onSearchResult={handleSearchResult}
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
