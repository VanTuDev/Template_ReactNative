import React, { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import tw from '../tailwind';

interface MainContentProps {
  title?: string;
  children?: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ 
  title = 'Hello World with Tailwind CSS',
  children 
}) => {
  return (
    <ScrollView style={tw`flex-1`}>
      <View style={tw`flex-1 p-4`}>
        <Text style={tw`text-2xl text-red-500 font-bold mb-4`}>{title}</Text>
        {children || (
          <>
            <Text style={tw`text-lg mb-4`}>This is the main content area.</Text>
            <Text style={tw`text-lg mb-4`}>Here you can place any content you like.</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default MainContent; 