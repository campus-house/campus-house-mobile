import { request } from './config';

// ========== 스크랩 관련 API ==========

/**
 * 내 건물 스크랩 목록
 */
export const getMyBuildingScraps = async (params = {}) => {
  const { page = 0, size = 20 } = params;
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  
  return await request(`/api/scraps/buildings?${queryParams}`, 'GET', null, true);
};

/**
 * 건물 스크랩
 */
export const scrapBuilding = async (buildingId) => {
  return await request(`/api/scraps/buildings/${buildingId}`, 'POST', null, true);
};

/**
 * 건물 스크랩 취소
 */
export const unscrapBuilding = async (buildingId) => {
  return await request(`/api/scraps/buildings/${buildingId}`, 'DELETE', null, true);
};

/**
 * 건물 스크랩 상태 확인
 */
export const getBuildingScrapStatus = async (buildingId) => {
  return await request(`/api/scraps/buildings/${buildingId}/status`, 'GET', null, true);
};
