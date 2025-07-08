import React from 'react';
import { Text, View } from 'react-native';
import tw from '../tailwind';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'My App' }) => {
  return (
    <View style={tw`bg-blue-500 p-4`}>
      <Text style={tw`text-white text-xl font-bold`}>{title}</Text>
    </View>
  );
};

export default Header; 