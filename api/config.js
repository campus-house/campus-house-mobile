// API 기본 설정
export const API_CONFIG = {
  BASE_URL: "http://172.30.1.54:8080",
  TIMEOUT: 10000, // 10초
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

// JWT 토큰 관리
export const getAuthToken = () => {
  // AsyncStorage에서 토큰 가져오기
  return null; // 임시
};

export const setAuthToken = (token) => {
  // AsyncStorage에 토큰 저장
  console.log('Token saved:', token);
};

// API 요청 헬퍼 함수
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
  const config = {
    ...options,
    headers: {
      ...API_CONFIG.HEADERS,
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};
