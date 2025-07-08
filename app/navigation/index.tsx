import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from '../screens/loading';
import tw from '../tailwind';

export default function Navigation() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Chuyển hướng dựa trên trạng thái xác thực
  React.useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace('/screens/home');
      } else {
        router.replace('/screens/login');
      }
    }
  }, [user, isLoading, router]);

  // Hiển thị màn hình loading trong khi kiểm tra trạng thái xác thực
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Màn hình trống trong khi chuyển hướng
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text>Đang chuyển hướng...</Text>
    </View>
  );
} 