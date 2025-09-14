import { Redirect } from 'expo-router';

export default function AuthIndex() {
  // auth 폴더에 접근하면 signup으로 리다이렉트
  return <Redirect href="/auth/signup" />;
}