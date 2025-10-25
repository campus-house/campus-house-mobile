// API 기본 설정
export const API_BASE_URL = "http://192.168.253.24:8080";

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 10000, // 10초
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';

// JWT 토큰 관리
export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    console.log('Retrieved token:', token);
    return token;
  } catch (error) {
    console.error('토큰 가져오기 실패:', error);
    return null;
  }
};

export const setAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
    console.log('Token saved:', token);
  } catch (error) {
    console.error('토큰 저장 실패:', error);
  }
};

// API 요청 헬퍼 함수
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const token = await getAuthToken();
  
  const config = {
    ...options,
    headers: {
      ...API_CONFIG.HEADERS,
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    console.log('API Request:', {
      url: url,
      method: config.method,
      headers: config.headers,
      body: config.body
    });
    
    const response = await fetch(url, config);
    
    if (!response.ok) {
      console.log('Response error:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // 응답이 비어있는지 확인
    const responseText = await response.text();
    console.log('Response text:', responseText);
    
    // 빈 응답인 경우 빈 객체 반환
    if (!responseText || responseText.trim() === '') {
      return {};
    }
    
    // JSON 파싱 시도
    try {
      const data = JSON.parse(responseText);
      return data;
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Response text:', responseText);
      throw new Error(`JSON Parse error: ${parseError.message}`);
    }
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};
