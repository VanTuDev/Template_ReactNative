import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import tw from '../tailwind';

export default function LoadingScreen() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text style={tw`mt-4 text-gray-600`}>Đang tải...</Text>
    </View>
  );
} 