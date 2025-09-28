/**
 * 색상 팔레트
 * 피그마 디자인 시스템에서 정의된 색상들
 */

export const COLORS = {
  // Primary 색상 (로고 및 아이콘에 사용)
  primary: '#FF805F',

  // Sub 색상들 (배경, 텍스트 등에 사용)
  sub: {
    green: '#86D382',
    yellow: '#FFD429',
  },

  // Neutral 색상들 (명도 순)
  neutral: {
    black: '#323232',
    grey5: '#636363',
    grey4: '#AAAAAA',
    grey3: '#CDCDCD',
    grey2: '#F2F2F2',
    grey1: '#FCFCFC',
    white: '#FFFFFF',
  },

  // 시스템 색상들 (목적 전달 컬러)
  system: {
    error: '#FF805F', // Primary와 동일
    success: '#86D382', // Sub Green과 동일
    selected: '#323232', // Black과 동일
  },

  // 텍스트 색상
  text: {
    primary: '#323232', // Black
    secondary: '#636363', // Grey5
    disabled: '#AAAAAA', // Grey4
    inverse: '#FFFFFF', // White
  },

  // 배경 색상
  background: {
    primary: '#FFFFFF', // White
    secondary: '#F9F9F9', // Grey1
    tertiary: '#F2F2F2', // Grey2
  },
} as const;

// 타입 정의
export type ColorKey = keyof typeof COLORS;
export type SubColorKey = keyof typeof COLORS.sub;
export type NeutralColorKey = keyof typeof COLORS.neutral;
export type SystemColorKey = keyof typeof COLORS.system;
