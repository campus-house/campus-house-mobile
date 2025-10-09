import React from 'react';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function ProfileMainScreen() {
  useEffect(() => {
    // 마이페이지 탭을 누르면 새로운 마이페이지로 이동
    router.replace('/mypage');
  }, []);

  return null;
}

