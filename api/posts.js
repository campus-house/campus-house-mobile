import { apiRequest } from './config.js';

// ========== 게시글 관련 API ==========

/**
 * 게시글 목록 조회
 */
export const getPosts = async (boardType, params = {}) => {
  const { page = 0, size = 20 } = params;
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  
  return await apiRequest(`/api/boards/${boardType}/posts?${queryParams}`);
};

/**
 * 게시글 작성
 */
export const createPost = async (boardType, postData) => {
  return await apiRequest(`/api/boards/${boardType}/posts`, {
    method: 'POST',
    body: JSON.stringify(postData),
  });
};

/**
 * 게시글 상세 조회
 */
export const getPostById = async (postId) => {
  return await apiRequest(`/api/posts/${postId}`);
};

/**
 * 게시글 수정
 */
export const updatePost = async (postId, postData) => {
  return await apiRequest(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(postData),
  });
};

/**
 * 게시글 삭제
 */
export const deletePost = async (postId) => {
  return await apiRequest(`/api/posts/${postId}`, {
    method: 'DELETE',
  });
};

/**
 * 게시글 좋아요 토글
 */
export const togglePostLike = async (postId) => {
  return await apiRequest(`/api/posts/${postId}/like`, {
    method: 'POST',
  });
};

/**
 * 게시글 북마크 토글
 */
export const togglePostBookmark = async (postId, userId) => {
  return await apiRequest(`/api/posts/${postId}/bookmark?userId=${userId}`, {
    method: 'POST',
  });
};

/**
 * 게시글 북마크 상태 확인
 */
export const getPostBookmarkStatus = async (postId, userId) => {
  return await apiRequest(`/api/posts/${postId}/bookmark/status?userId=${userId}`);
};

// ========== 댓글 관련 API ==========

/**
 * 댓글 작성
 */
export const createComment = async (postId, commentData) => {
  return await apiRequest(`/api/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify(commentData),
  });
};

/**
 * 댓글 수정
 */
export const updateComment = async (commentId, commentData) => {
  return await apiRequest(`/api/comments/${commentId}`, {
    method: 'PUT',
    body: JSON.stringify(commentData),
  });
};

/**
 * 댓글 삭제
 */
export const deleteComment = async (commentId) => {
  return await apiRequest(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });
};
