import { apiRequest } from './config.js';

// ========== 알림 관련 API ==========

/**
 * 내 알림 목록 조회
 */
export const getMyNotifications = async (params = {}) => {
  const { page = 0, size = 20 } = params;
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  
  return await apiRequest(`/api/notifications?${queryParams}`);
};

/**
 * 읽지 않은 알림 조회
 */
export const getUnreadNotifications = async () => {
  return await apiRequest('/api/notifications/unread');
};

/**
 * 알림 읽음 처리
 */
export const markNotificationAsRead = async (notificationId) => {
  return await apiRequest(`/api/notifications/${notificationId}/read`, {
    method: 'PUT',
  });
};

/**
 * 모든 알림 읽음 처리
 */
export const markAllNotificationsAsRead = async () => {
  return await apiRequest('/api/notifications/read-all', {
    method: 'PUT',
  });
};
