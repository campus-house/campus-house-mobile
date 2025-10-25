import { apiRequest } from './config';

// 스크랩 목록 조회 API (기본 순서)
export const getScrapList = async (page = 0, size = 20) => {
  try {
    const response = await apiRequest(`/api/scraps/buildings?page=${page}&size=${size}`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('스크랩 목록 조회 실패:', error);
    throw error;
  }
};

// 순서가 저장된 스크랩 목록 조회 API
export const getScrapListOrdered = async () => {
  try {
    const response = await apiRequest('/api/scraps/buildings/ordered', {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('순서 저장된 스크랩 목록 조회 실패:', error);
    throw error;
  }
};

// 스크랩 추가 API
export const addScrap = async (buildingId) => {
  try {
    const response = await apiRequest(`/api/scraps/buildings/${buildingId}`, {
      method: 'POST',
    });
    return response;
  } catch (error) {
    console.error('스크랩 추가 실패:', error);
    throw error;
  }
};

// 스크랩 삭제 API (buildingId로 삭제)
export const deleteScrap = async (buildingId) => {
  try {
    const response = await apiRequest(`/api/scraps/buildings/${buildingId}`, {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error('스크랩 삭제 실패:', error);
    throw error;
  }
};

// 스크랩 순서 저장 API
export const updateScrapOrder = async (buildingIds) => {
  try {
    const response = await apiRequest('/api/scraps/buildings/order', {
      method: 'PUT',
      body: JSON.stringify({ buildingIds }),
    });
    return response;
  } catch (error) {
    console.error('스크랩 순서 저장 실패:', error);
    throw error;
  }
};




