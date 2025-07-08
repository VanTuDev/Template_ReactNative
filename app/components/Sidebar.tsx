import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from '../tailwind';

interface MenuItem {
  title: string;
  onPress?: () => void;
}

interface SidebarProps {
  items?: MenuItem[];
}

const defaultItems: MenuItem[] = [
  { title: 'Dashboard', onPress: () => console.log('Dashboard pressed') },
  { title: 'Settings', onPress: () => console.log('Settings pressed') },
  { title: 'Profile', onPress: () => console.log('Profile pressed') },
];

const Sidebar: React.FC<SidebarProps> = ({ items = defaultItems }) => {
  return (
    <View style={tw`bg-gray-800 w-1/4 h-full p-4`}>
      {items.map((item, index) => (
        <TouchableOpacity key={index} onPress={item.onPress}>
          <Text style={tw`text-white text-lg mb-4`}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Sidebar; 