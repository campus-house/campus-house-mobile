import { API_BASE_URL } from './config';

// 건물 목록 조회 API
export const getBuildings = async ({ page = 0, size = 20 } = {}) => {
  try {
    console.log('건물 목록 조회 API 호출 중...');
    
    const response = await fetch(`${API_BASE_URL}/api/buildings?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('건물 목록 조회 API 응답:', data);
    return data;
  } catch (error) {
    console.error('건물 목록 조회 실패:', error);
    throw error;
  }
};

// 건물 후기 조회 API
export const getBuildingReviews = async (buildingId, page = 0, size = 20) => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
    }
    
    console.log(`건물 ${buildingId} 후기 조회 API 호출 중...`);
    
    const response = await fetch(`${API_BASE_URL}/api/buildings/${buildingId}/reviews?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('건물 후기 조회 API 응답:', data);
    return data;
  } catch (error) {
    console.error('건물 후기 조회 실패:', error);
    throw error;
  }
};

// 건물 정보 조회 API
export const getBuildingInfo = async (buildingId) => {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}/api/buildings/${buildingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('건물 정보 조회 API 응답:', data);
    return data;
  } catch (error) {
    console.error('건물 정보 조회 실패:', error);
    throw error;
  }
};
// 인증 토큰 가져오기 (AsyncStorage에서)
const getAuthToken = async () => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('토큰 가져오기 실패:', error);
    return null;
  }
};

