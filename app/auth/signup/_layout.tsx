import { Stack } from 'expo-router';

export default function SignupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="email-verification" />
      <Stack.Screen name="identity-verification" />
      <Stack.Screen name="register" />
    </Stack>
  );
}


