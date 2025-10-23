import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text, TouchableOpacity, TextInput, Animated, Alert } from 'react-native';
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
import { getBuildings, searchBuildings, getNearbyBuildings, getBuildingById } from '@/api/buildings';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  
  // 로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  
  // 상단 UI 애니메이션
  const topUIOffset = useRef(new Animated.Value(0)).current;

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
   * 테스트 로그인 함수
   */
  const testLogin = async () => {
    try {
      Alert.alert('로그인 테스트', '아이디: 1, 비밀번호: 1로 로그인 시도...');
      
      const loginSuccess = await simpleLogin('1', '1');
      
      if (loginSuccess) {
        Alert.alert('성공!', `로그인 완료!\n사용자: ${(userInfo as any)?.nickname || '테스트유저'}`);
      } else {
        Alert.alert('실패', '로그인에 실패했습니다.');
      }
    } catch (error: any) {
      console.error('로그인 테스트 에러:', error);
      Alert.alert('에러', `로그인 테스트 실패: ${error.message}`);
    }
  };

  /**
   * API 테스트 함수들
   */
  const testBuildingAPI = async () => {
    try {
      Alert.alert('API 테스트', '건물 API 테스트를 시작합니다...');
      
      // 1. 모든 건물 조회 테스트
      const buildings = await getBuildings({ page: 0, size: 10 });
      console.log('건물 목록:', buildings);
      
      // 2. 키워드 검색 테스트
      const searchResults = await searchBuildings('경희대', { page: 0, size: 5 });
      console.log('검색 결과:', searchResults);
      
      // 3. 위치 기반 검색 테스트 (경희대학교 좌표)
      const nearbyResults = await getNearbyBuildings(37.2415169034264, 127.071726204875, { radiusKm: 1.0 });
      console.log('주변 건물:', nearbyResults);
      
      Alert.alert('성공!', `건물 ${buildings.content?.length || 0}개 조회 완료`);
    } catch (error: any) {
      console.error('API 테스트 에러:', error);
      Alert.alert('에러', `API 테스트 실패: ${error.message}`);
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
            deposit: building.deposit || 0,
            monthly: building.monthlyRent || 0,
          },
          // 서버에서 받은 추가 정보들
          address: building.address,
          scrapCount: building.scrapCount || 0,
          buildingUsage: building.buildingUsage,
          // 나중에 상세 정보 로드용
          buildingId: building.id,
        }));
        
        setProperties(serverProperties);
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
    
    // 서버에서 상세 정보 로드 (buildingId가 있는 경우)
    if ((property as any).buildingId) {
      try {
        console.log(`건물 ${(property as any).buildingId} 상세 정보 로드 중...`);
        const buildingDetail = await getBuildingById((property as any).buildingId);
        
        // 상세 정보를 property에 병합
        const enrichedProperty = {
          ...property,
          ...buildingDetail,
          // 추가 상세 정보들
          reviews: buildingDetail.reviews || [],
          questions: buildingDetail.questions || [],
          transfers: buildingDetail.transfers || [],
        };
        
        setSelectedProperty(enrichedProperty);
        console.log('건물 상세 정보 로드 완료:', enrichedProperty);
        } catch (error) {
        console.error('건물 상세 정보 로드 실패:', error);
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
        onSearchResult={handleSearchResult}
      />

      {/* 테스트 버튼들 */}
      <View style={styles.testButtonsContainer}>
        <TouchableOpacity 
          style={styles.testButton}
          onPress={testLogin}
        >
          <Text style={styles.testButtonText}>로그인 테스트</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.testButton}
          onPress={testBuildingAPI}
        >
          <Text style={styles.testButtonText}>API 테스트</Text>
        </TouchableOpacity>
      </View>
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
      testButtonsContainer: {
        position: 'absolute',
        right: 20,
        bottom: 100,
        flexDirection: 'column',
        gap: 10,
      },
      testButton: {
        backgroundColor: '#FF805F',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      testButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
      },
});
