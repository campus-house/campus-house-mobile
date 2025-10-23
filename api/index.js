// API 모듈들을 하나로 통합
export * from './config.js';
export * from './auth.js';
export * from './buildings.js';
export * from './posts.js';
export * from './scraps.js';
export * from './mypage.js';
export * from './notifications.js';

// 편의를 위한 그룹화된 export
export { default as authAPI } from './auth.js';
export { default as buildingsAPI } from './buildings.js';
export { default as postsAPI } from './posts.js';
export { default as scrapsAPI } from './scraps.js';
export { default as mypageAPI } from './mypage.js';
export { default as notificationsAPI } from './notifications.js';
