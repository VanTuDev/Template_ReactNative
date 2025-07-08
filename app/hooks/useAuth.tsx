import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';
import logger from '../utils/logger';
import { getUserData } from '../utils/storage';

// Định nghĩa kiểu dữ liệu cho người dùng
interface User {
  id: string;
  email: string;
  name: string;
  // Các trường khác của user
}

// Định nghĩa kiểu dữ liệu cho context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Tạo context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Kiểm tra trạng thái đăng nhập khi khởi động
  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ storage
    const checkLoginStatus = async () => {
      try {
        logger.debug('Đang kiểm tra trạng thái đăng nhập');
        const userData = await getUserData();
        if (userData) {
          logger.info('Người dùng đã đăng nhập:', userData.email);
          setUser(userData);
        } else {
          logger.info('Chưa đăng nhập');
          setUser(null);
        }
      } catch (error) {
        logger.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Hàm đăng nhập
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Gọi API đăng nhập
      const response = await authService.login({ email, password });
      
      // Cập nhật state
      setUser(response.user);
      setIsLoading(false);
      return true;
    } catch (error) {
      logger.error('Lỗi đăng nhập trong hook:', error);
      setIsLoading(false);
      return false;
    }
  };

  // Hàm đăng xuất
  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      logger.error('Lỗi khi đăng xuất trong hook:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook để sử dụng auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  
  return context;
} 