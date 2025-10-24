// 네비게이터 바 공통 스타일 상수
export const TAB_BAR_STYLE = {
  position: 'absolute' as const,
  bottom: 0,
  left: 0,
  right: 0,
  height: 105,
  width: 393,
  backgroundColor: '#FFF',
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  shadowColor: '#000',
  shadowOffset: { width: -1.5, height: -4.5 },
  shadowOpacity: 0.03,
  shadowRadius: 4,
  elevation: 5,
  justifyContent: 'space-evenly' as const,
  paddingHorizontal: 14,
};

export const HIDE_TAB_BAR_STYLE = {
  display: 'none' as const,
};

