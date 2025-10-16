/**
 * 테스트용 매물 데이터
 * 실제 서버 API 연동 전까지 사용
 */

import { PropertyMarker } from '../types/property';

/**
 * 테스트용 매물 마커 데이터
 * 영통역 아이파크
 */
export const mockProperties: PropertyMarker[] = [
  {
    id: 'prop_001',
    buildingName: '아이파크',
    latitude: 37.2518069000003,
    longitude: 127.0774401000001,
    price: {
      deposit: 1500, // 1500만원
      monthly: 80, // 80만원
    },
  },
];

/**
 * 테스트 데이터 로드 함수 (나중에 API 호출로 교체)
 * @returns Promise<PropertyMarker[]>
 */
export const loadMockProperties = async (): Promise<PropertyMarker[]> => {
  // 실제 API 호출을 시뮬레이션하기 위한 딜레이
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockProperties;
};

/**
 * 특정 영역의 매물만 필터링하는 함수 (나중에 API 쿼리로 교체)
 * @param bounds 지도 경계 정보
 * @returns Promise<PropertyMarker[]>
 */
export const loadPropertiesByBounds = async (bounds: {
  north: number;
  south: number;
  east: number;
  west: number;
}): Promise<PropertyMarker[]> => {
  // 실제 API 호출을 시뮬레이션하기 위한 딜레이
  await new Promise((resolve) => setTimeout(resolve, 300));

  // 경계 내의 매물만 필터링
  return mockProperties.filter(
    (property) =>
      property.latitude >= bounds.south &&
      property.latitude <= bounds.north &&
      property.longitude >= bounds.west &&
      property.longitude <= bounds.east,
  );
};
