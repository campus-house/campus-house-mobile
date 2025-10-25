/**
 * 매물(부동산) 관련 타입 정의
 * 지도 마커와 상세 정보에 사용되는 데이터 구조
 */

/**
 * 매물 가격 정보
 */
export interface PropertyPrice {
  /** 보증금 (만원 단위) */
  deposit: number;
  /** 월세 (만원 단위) */
  monthly: number;
  /** 관리비 (만원 단위, 선택사항) */
  maintenance?: number;
}

/**
 * 매물 기본 정보
 */
export interface Property {
  /** 매물 고유 ID */
  id: string;
  /** 건물명 (예: "아이파크", "래미안") */
  buildingName: string;
  /** 위도 (지도 표시용) */
  latitude: number;
  /** 경도 (지도 표시용) */
  longitude: number;
  /** 상세 주소 */
  address: string;
  /** 방 타입 (예: "원룸", "투룸", "쓰리룸") */
  roomType: string;
  /** 가격 정보 */
  price: PropertyPrice;
  /** 매물 이미지 URL (선택사항) */
  imageUrl?: string;
  /** 매물 설명 (선택사항) */
  description?: string;
  /** 등록일 */
  createdAt: string;
  /** 수정일 */
  updatedAt: string;
}

/**
 * 지도에서 사용할 매물 마커 정보 (간소화된 버전)
 * 지도 성능을 위해 필요한 최소 정보만 포함
 */
export interface PropertyMarker {
  /** 매물 고유 ID */
  id: string;
  /** 건물명 */
  buildingName: string;
  /** 위도 */
  latitude: number;
  /** 경도 */
  longitude: number;
  /** 가격 정보 (간소화) */
  price: PropertyPrice;
  /** 서버 건물 ID (서버 연동용) */
  buildingId?: number;
  /** 주소 (서버 연동용) */
  address?: string;
  /** 스크랩 수 (서버 연동용) */
  scrapCount?: number;
  /** 건물 용도 (서버 연동용) */
  buildingUsage?: string;
  /** 평균 평점 (후기 관련) */
  averageRating?: number;
  /** 총 후기 수 (후기 관련) */
  totalReviews?: number;
  /** 후기 목록 (후기 관련) */
  reviews?: any[];
}
