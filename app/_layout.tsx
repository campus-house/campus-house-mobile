import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { COLORS } from '@/constants/colors';
import { ProfileProvider } from '@/contexts/ProfileContext';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Regular': require('@/assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-SemiBold': require('@/assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Bold': require('@/assets/fonts/Pretendard-Bold.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ProfileProvider>
      <StatusBar style="auto" backgroundColor={COLORS.background.primary} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        {/* <Stack.Screen name="auth" /> */}
        <Stack.Screen name="main" />
        <Stack.Screen name="mypage" />
      </Stack>
    </ProfileProvider>
  );
}
