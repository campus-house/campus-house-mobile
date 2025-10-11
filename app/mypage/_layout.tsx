import { Stack } from 'expo-router';

export default function MyPageLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="profile_edit" />
      <Stack.Screen name="alerts" />
      <Stack.Screen name="badges" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="posts" />
      <Stack.Screen name="review" />
      <Stack.Screen name="review_points" />
      <Stack.Screen name="review_success" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
