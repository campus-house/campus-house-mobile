import React from 'react';
import { Stack } from 'expo-router';

export default function CommunityLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: '커뮤니티' }} />
      <Stack.Screen name="write" options={{ title: '글 작성' }} />
      <Stack.Screen name="auth" options={{ title: '인증' }} />
      <Stack.Screen name="questions" options={{ title: '질문 게시판' }} />
    </Stack>
  );
}
