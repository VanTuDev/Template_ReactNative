import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './hooks/useAuth';
import tw from './tailwind';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={tw`flex-1`}>
      <AuthProvider>
        <View style={tw`flex-1`}>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style="auto" />
        </View>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
