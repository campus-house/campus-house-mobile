/**
 * 타이포그래피 시스템
 * Pretendard 폰트 기반 텍스트 스타일 정의
 */

export const TYPOGRAPHY = {
  // Headline 스타일
  headline1: {
    fontSize: 26,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 35,
    fontWeight: '700',
  },
  headline2: {
    fontSize: 25,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 35,
    fontWeight: '700',
  },

  // Body 스타일
  body1: {
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 27.2,
    fontWeight: '600',
  },
  body2: {
    fontSize: 18.5,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 22.5,
    fontWeight: '400',
  },
  body3: {
    fontSize: 17,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 22.5,
    fontWeight: '500',
  },
  body4: {
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 22,
    fontWeight: '700',
  },

  // Caption 스타일
  caption1: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 22,
    fontWeight: '400',
  },
  caption2: {
    fontSize: 13,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 22,
    fontWeight: '400',
  },
  caption3: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 22,
    fontWeight: '500',
  },
} as const;

// 타입 정의
export type TypographyKey = keyof typeof TYPOGRAPHY;
