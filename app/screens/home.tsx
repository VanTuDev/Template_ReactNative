import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import MainLayout from '../layouts/MainLayout';
import tw from '../tailwind';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/screens/login');
  };

  return (
    <MainLayout 
      headerTitle="Trang chủ" 
      title={`Chào mừng, ${user?.name || 'Người dùng'}`}
    >
      <Text style={tw`text-lg mb-4`}>Đây là trang chủ của ứng dụng.</Text>
      <Text style={tw`text-lg mb-4`}>Bạn có thể điều hướng bằng cách sử dụng thanh bên.</Text>
      <Text style={tw`text-lg mb-4`}>Chúng tôi đã tổ chức mã nguồn theo cấu trúc thư mục rõ ràng để dễ dàng bảo trì.</Text>
      
      <TouchableOpacity 
        style={tw`bg-red-500 py-2 px-4 rounded-md mt-4`}
        onPress={handleLogout}
      >
        <Text style={tw`text-white font-bold`}>Đăng xuất</Text>
      </TouchableOpacity>
    </MainLayout>
  );
} 