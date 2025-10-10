import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ===== Figma baseline (logic px) =====
export const FIGMA = { WIDTH: 393, HEIGHT: 852, SAFE_TOP: 44, SAFE_BOTTOM: 35 };

// 스케일링 설정
export const SCALE_CONFIG = {
  enabled: true, // false로 설정하면 정확한 Figma 스펙 사용 (스케일링 없음)
  range: { min: 0.9, max: 1.1 } as const, // 스케일링 범위
};

/**
 * 값의 범위를 제한하는 유틸리티 함수
 */
export const clamp = (n: number, min: number, max: number): number => 
  Math.min(max, Math.max(min, n));

/**
 * 화면 높이 기반 스케일링 함수
 * @param value - 스케일링할 픽셀 값
 * @param screenHeight - 화면 높이
 * @param insets - SafeArea insets
 * @returns 스케일링된 픽셀 값
 */
export const getHeightScalePx = (
  value: number,
  screenHeight: number,
  insets: { top: number; bottom: number }
): number => {
  if (!SCALE_CONFIG.enabled) {
    return Math.round(value);
  }

  const usableH = screenHeight - insets.top - insets.bottom;
  const baseUsableH = FIGMA.HEIGHT - FIGMA.SAFE_TOP - FIGMA.SAFE_BOTTOM;
  const scaleY = clamp(usableH / baseUsableH, SCALE_CONFIG.range.min, SCALE_CONFIG.range.max);
  
  return Math.round(value * scaleY);
};

/**
 * React Hook으로 사용할 수 있는 스케일링 함수
 * @returns 스케일링 함수와 관련 값들
 */
export const useLayoutScale = () => {
  const { height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const y = (value: number) => getHeightScalePx(value, screenHeight, insets);

  return {
    y,
    screenHeight,
    insets,
    figma: FIGMA,
  };
};


/**
 * 공통 컴포넌트 크기
 */
export const LAYOUT_SIZES = {
  BUTTON: {
    HEIGHT: 56,
    GAP: 14,
  },
  TITLE: {
    LOGIN: { W: 207, H: 35, Y: 163 },
    SPLASH: { W: 254, H: 43, Y: 232 },
  },
} as const;
