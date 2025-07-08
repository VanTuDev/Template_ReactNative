import { Redirect } from 'expo-router';

export default function Index() {
  // Chuyển hướng đến màn hình đăng nhập
  return <Redirect href="/screens/login" />;
} 