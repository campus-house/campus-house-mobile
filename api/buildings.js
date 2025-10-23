import { apiRequest } from './config.js';

// ========== 건물 관련 API ==========

/**
 * 모든 건물 조회 (페이징)
 */
export const getBuildings = async (params = {}) => {
  const { page = 0, size = 20, sort = 'createdAt,desc' } = params;
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  });
  
  return await apiRequest(`/api/buildings?${queryParams}`);
};

/**
 * 키워드로 건물 검색
 */
export const searchBuildings = async (keyword, params = {}) => {
  const { page = 0, size = 20 } = params;
  const queryParams = new URLSearchParams({
    keyword,
    page: page.toString(),
    size: size.toString(),
  });
  
  return await apiRequest(`/api/buildings/search?${queryParams}`);
};

/**
 * 건물명으로 검색
 */
export const searchBuildingsByName = async (buildingName, params = {}) => {
  const { page = 0, size = 20 } = params;
  const queryParams = new URLSearchParams({
    buildingName,
    page: page.toString(),
    size: size.toString(),
  });
  
  return await apiRequest(`/api/buildings/search/building?${queryParams}`);
};

/**
 * 주소로 검색
 */
export const searchBuildingsByAddress = async (address, params = {}) => {
  const { page = 0, size = 20 } = params;
  const queryParams = new URLSearchParams({
    address,
    page: page.toString(),
    size: size.toString(),
  });
  
  return await apiRequest(`/api/buildings/search/address?${queryParams}`);
};

/**
 * 위치 기반 검색 (반경 내 건물)
 */
export const getNearbyBuildings = async (latitude, longitude, params = {}) => {
  const { radiusKm = 1.0, page = 0, size = 20 } = params;
  const queryParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    radiusKm: radiusKm.toString(),
    page: page.toString(),
    size: size.toString(),
  });
  
  return await apiRequest(`/api/buildings/nearby?${queryParams}`);
};

/**
 * 필터링 검색
 */
export const getFilteredBuildings = async (filters = {}) => {
  const {
    minDeposit,
    maxDeposit,
    minMonthlyRent,
    maxMonthlyRent,
    minJeonse,
    maxJeonse,
    elevatorRequired,
    maxWalkingTime,
    buildingUsage,
    page = 0,
    size = 20
  } = filters;
  
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  
  // 필터 파라미터 추가
  if (minDeposit !== undefined) queryParams.append('minDeposit', minDeposit);
  if (maxDeposit !== undefined) queryParams.append('maxDeposit', maxDeposit);
  if (minMonthlyRent !== undefined) queryParams.append('minMonthlyRent', minMonthlyRent);
  if (maxMonthlyRent !== undefined) queryParams.append('maxMonthlyRent', maxMonthlyRent);
  if (minJeonse !== undefined) queryParams.append('minJeonse', minJeonse);
  if (maxJeonse !== undefined) queryParams.append('maxJeonse', maxJeonse);
  if (elevatorRequired !== undefined) queryParams.append('elevatorRequired', elevatorRequired);
  if (maxWalkingTime !== undefined) queryParams.append('maxWalkingTime', maxWalkingTime);
  if (buildingUsage) queryParams.append('buildingUsage', buildingUsage);
  
  return await apiRequest(`/api/buildings/search/filters?${queryParams}`);
};

/**
 * 최근 등록된 건물 조회
 */
export const getRecentBuildings = async (params = {}) => {
  const { page = 0, size = 20 } = params;
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  
  return await apiRequest(`/api/buildings/recent?${queryParams}`);
};

/**
 * 인기 건물 조회
 */
export const getPopularBuildings = async (params = {}) => {
  const { page = 0, size = 20 } = params;
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  
  return await apiRequest(`/api/buildings/popular?${queryParams}`);
};

/**
 * 건물 용도 목록 조회
 */
export const getBuildingUsages = async () => {
  return await apiRequest('/api/buildings/building-usages');
};

/**
 * 건물 상세 조회
 */
export const getBuildingById = async (buildingId) => {
  return await apiRequest(`/api/buildings/${buildingId}`);
};

/**
 * 건물 스크랩
 */
export const scrapBuilding = async (buildingId) => {
  return await apiRequest(`/api/buildings/${buildingId}/scrap`, {
    method: 'POST',
  });
};

/**
 * 건물 스크랩 취소
 */
export const unscrapBuilding = async (buildingId) => {
  return await apiRequest(`/api/buildings/${buildingId}/scrap`, {
    method: 'DELETE',
  });
};

/**
 * 건물 스크랩 상태 확인
 */
export const getBuildingScrapStatus = async (buildingId) => {
  return await apiRequest(`/api/buildings/${buildingId}/scrap/status`);
};

/**
 * 건물 후기 조회
 */
export const getBuildingReviews = async (buildingId, params = {}) => {
  const { sort = 'newest', page = 0, size = 20 } = params;
  const queryParams = new URLSearchParams({
    sort,
    page: page.toString(),
    size: size.toString(),
  });
  
  return await apiRequest(`/api/buildings/${buildingId}/reviews?${queryParams}`);
};

/**
 * 건물 후기 작성
 */
export const createBuildingReview = async (buildingId, reviewData) => {
  return await apiRequest(`/api/buildings/${buildingId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
};

/**
 * 건물 질문 조회
 */
export const getBuildingQuestions = async (buildingId, params = {}) => {
  const { page = 0, size = 20 } = params;
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  
  return await apiRequest(`/api/buildings/${buildingId}/qnas?${queryParams}`);
};

/**
 * 건물 질문 작성
 */
export const createBuildingQuestion = async (buildingId, questionData) => {
  return await apiRequest(`/api/buildings/${buildingId}/qnas`, {
    method: 'POST',
    body: JSON.stringify(questionData),
  });
};

/**
 * 건물 양도 조회
 */
export const getBuildingTransfers = async (buildingId, params = {}) => {
  const { page = 0, size = 20 } = params;
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  
  return await apiRequest(`/api/buildings/${buildingId}/transfers?${queryParams}`);
};

/**
 * 건물 양도 작성
 */
export const createBuildingTransfer = async (buildingId, transferData) => {
  return await apiRequest(`/api/buildings/${buildingId}/transfers`, {
    method: 'POST',
    body: JSON.stringify(transferData),
  });
};
