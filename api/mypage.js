import { apiRequest } from './config.js';

// ========== 마이페이지 관련 API ==========

/**
 * 사용자 프로필 조회
 */
export const getMyProfile = async () => {
  return await apiRequest('/api/mypage/profile');
};

/**
 * 사용자 프로필 수정
 */
export const updateMyProfile = async (profileData) => {
  return await apiRequest('/api/mypage/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};

/**
 * 내가 작성한 게시글 조회
 */
export const getMyPosts = async (params = {}) => {
  const { page = 0, size = 20 } = params;
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  
  return await apiRequest(`/api/mypage/posts?${queryParams}`);
};

/**
 * 내가 작성한 댓글 조회
 */
export const getMyComments = async () => {
  return await apiRequest('/api/mypage/comments');
};

/**
 * 내가 저장한 게시글 조회
 */
export const getMyBookmarks = async () => {
  return await apiRequest('/api/mypage/bookmarks');
};

/**
 * 보유 캐릭터 조회
 */
export const getMyCharacters = async () => {
  return await apiRequest('/api/mypage/characters');
};

/**
 * 대표 캐릭터 설정
 */
export const setMainCharacter = async (characterId) => {
  return await apiRequest(`/api/mypage/characters/${characterId}/set-main`, {
    method: 'POST',
  });
};

/**
 * 캐릭터 가챠
 */
export const gachaCharacter = async () => {
  return await apiRequest('/api/mypage/characters/gacha', {
    method: 'POST',
  });
};

/**
 * 캐릭터 구매
 */
export const purchaseCharacter = async (characterId) => {
  return await apiRequest(`/api/mypage/characters/${characterId}/purchase`, {
    method: 'POST',
  });
};

/**
 * 포인트 내역 조회
 */
export const getMyPointHistory = async (params = {}) => {
  const { page = 0, size = 20 } = params;
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  
  return await apiRequest(`/api/mypage/points/history?${queryParams}`);
};

/**
 * 포인트 통계 조회
 */
export const getMyPointStats = async () => {
  return await apiRequest('/api/mypage/points/stats');
};

/**
 * 내 거주지 조회
 */
export const getMyResidence = async () => {
  return await apiRequest('/api/mypage/residence');
};
