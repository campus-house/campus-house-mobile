import { apiRequest, setAuthToken } from './config.js';

// ========== 인증 관련 API ==========

/**
 * 회원가입
 */
export const register = async (userData) => {
  const response = await apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  
  return response;
};

/**
 * 로그인
 */
export const login = async (credentials) => {
  const response = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password
    }),
  });
  
  // 토큰 저장
  if (response.token) {
    setAuthToken(response.token);
  }
  
  return response;
};

/**
 * 토큰 검증
 */
export const verifyToken = async () => {
  return await apiRequest('/api/auth/verify');
};

/**
 * 이메일 중복 확인
 */
export const checkEmail = async (email) => {
  return await apiRequest(`/api/auth/check-email?email=${encodeURIComponent(email)}`);
};

/**
 * 닉네임 중복 확인
 */
export const checkNickname = async (nickname) => {
  return await apiRequest(`/api/auth/check-nickname?nickname=${encodeURIComponent(nickname)}`);
};

/**
 * 비밀번호 변경
 */
export const changePassword = async (passwordData) => {
  return await apiRequest('/api/auth/change-password', {
    method: 'POST',
    body: JSON.stringify(passwordData),
  });
};

/**
 * 프로필 수정
 */
export const updateProfile = async (profileData) => {
  return await apiRequest('/api/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};