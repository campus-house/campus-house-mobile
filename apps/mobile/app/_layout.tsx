import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { COLORS } from '../constants/colors';

// 앱 로딩 중 스플래시 화면 유지
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // 폰트 로딩 완료 후 스플래시 화면 숨김
  SplashScreen.hideAsync();
  return (
    <>
      {' '}
      <StatusBar style="auto" backgroundColor={COLORS.background.primary} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background.primary,
          },
          headerTintColor: COLORS.text.primary,
          headerTitleStyle: {
            fontFamily: 'Pretendard-SemiBold',
            fontSize: 18,
          },
          contentStyle: {
            backgroundColor: COLORS.background.primary,
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: '홈' }} />
        <Stack.Screen name="profile" options={{ title: '프로필' }} />
        <Stack.Screen name="settings" options={{ title: '설정' }} />
      </Stack>
    </>
  );
}
