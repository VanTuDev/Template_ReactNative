import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { API_BASE_URL } from '../config/api';
import { useAuth } from '../hooks/useAuth';
import tw from '../tailwind';
import logger from '../utils/logger';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    // Reset error
    setError(null);
    
    // Validate input
    if (!email || !password) {
      logger.warn('Đăng nhập thất bại: Email hoặc mật khẩu trống');
      setError('Vui lòng nhập email và mật khẩu');
      return;
    }

    try {
      logger.debug('Đang xử lý đăng nhập cho:', email);
      const success = await login(email, password);
      
      if (success) {
        logger.info('Đăng nhập thành công, chuyển hướng đến trang chủ');
        router.replace('/screens/home');
      } else {
        logger.warn('Đăng nhập thất bại: Thông tin không chính xác');
        setError('Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.');
      }
    } catch (err) {
      logger.error('Lỗi khi xử lý đăng nhập:', err);
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1`}
    >
      <ScrollView contentContainerStyle={tw`flex-grow`}>
        <View style={tw`flex-1 bg-white p-6 justify-center items-center`}>
          {/* Logo */}
          <View style={tw`mb-10 items-center`}>
            <Image
              source={require('../../assets/images/react-logo.png')}
              style={tw`w-20 h-20 mb-4`}
              resizeMode="contain"
            />
            <Text style={tw`text-2xl font-bold text-blue-600`}>Đăng nhập</Text>
            <Text style={tw`text-sm text-gray-500 mt-2`}>API: {API_BASE_URL}</Text>
          </View>

          {/* Form đăng nhập */}
          <View style={tw`w-full max-w-sm`}>
            {/* Hiển thị lỗi nếu có */}
            {error && (
              <View style={tw`bg-red-100 border border-red-400 rounded-md p-2 mb-4`}>
                <Text style={tw`text-red-700`}>{error}</Text>
              </View>
            )}

            <Text style={tw`text-gray-700 mb-2`}>Email</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-md px-4 py-2 mb-4`}
              placeholder="Nhập email của bạn"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError(null);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
            <Text style={tw`text-gray-700 mb-2`}>Mật khẩu</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-md px-4 py-2 mb-6`}
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError(null);
              }}
              secureTextEntry
              editable={!isLoading}
            />

            <TouchableOpacity
              style={tw`bg-blue-500 rounded-md py-3 items-center ${isLoading ? 'opacity-70' : ''}`}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={tw`text-white font-bold`}>Đăng nhập</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={tw`mt-4 items-center`}>
              <Text style={tw`text-blue-500`}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={tw`mt-10 items-center`}>
            <Text style={tw`text-gray-600`}>Chưa có tài khoản?</Text>
            <TouchableOpacity style={tw`mt-2`}>
              <Text style={tw`text-blue-500 font-bold`}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 