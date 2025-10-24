import React, { useLayoutEffect } from 'react';
import { Stack, useNavigation } from 'expo-router';

export default function AuthLayout() {
  const navigation = useNavigation();

  // 원래 네비게이터 바 스타일 (main/_layout.tsx와 동일)
  const originalTabBarStyle = {
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
    zIndex: 1000,
    justifyContent: 'space-evenly' as const,
    paddingHorizontal: 14,
  };

  // auth 플로우 전체에서 네비게이터 바 숨기기
  useLayoutEffect(() => {
    const parent = navigation.getParent();
    if (parent) {
      parent.setOptions({
        tabBarStyle: { display: 'none' }
      });
    }

    return () => {
      if (parent) {
        parent.setOptions({
          tabBarStyle: originalTabBarStyle // 원래 스타일로 정확히 복원
        });
      }
    };
  }, [navigation]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="Step2_AddressScreen" 
        options={{ title: '주소 입력' }}
      />
      <Stack.Screen 
        name="Step3_NameScreen" 
        options={{ title: '이름 입력' }}
      />
      <Stack.Screen 
        name="Step4_DetailInfoScreen" 
        options={{ title: '상세정보 입력' }}
      />
      <Stack.Screen 
        name="Step5_VerificationScreen" 
        options={{ title: '인증' }}
      />
      <Stack.Screen 
        name="Step6_LoadingScreen" 
        options={{ title: '로딩' }}
      />
      <Stack.Screen 
        name="Step7_CompletionScreen" 
        options={{ title: '완료' }}
      />
    </Stack>
  );
}

