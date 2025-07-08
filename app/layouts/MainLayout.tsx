import React, { ReactNode } from 'react';
import { View } from 'react-native';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Sidebar from '../components/Sidebar';
import tw from '../tailwind';

interface MainLayoutProps {
  title?: string;
  headerTitle?: string;
  showSidebar?: boolean;
  children?: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  title,
  headerTitle,
  showSidebar = true,
  children
}) => {
  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      <Header title={headerTitle} />

      {/* Main content area */}
      <View style={tw`flex-row flex-1`}>
        {/* Sidebar */}
        {showSidebar && <Sidebar />}

        {/* Main content */}
        <MainContent title={title}>
          {children}
        </MainContent>
      </View>
    </View>
  );
};

export default MainLayout; 