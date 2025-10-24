import { apiRequest } from './config';

// 스크랩 목록 조회 API
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

// 스크랩 삭제 API
export const deleteScrap = async (scrapId) => {
  try {
    const response = await apiRequest(`/api/scraps/${scrapId}`, {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error('스크랩 삭제 실패:', error);
    throw error;
  }
};

