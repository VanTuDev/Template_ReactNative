import { API_ENDPOINTS } from '../config/api';
import logger from '../utils/logger';
import { clearUserSession, saveAuthToken, saveUserData } from '../utils/storage';
import apiService from './api';

// Định nghĩa kiểu dữ liệu
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    // Các trường khác của user
  };
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * Service xử lý các thao tác xác thực
 */
export const authService = {
  /**
   * Đăng nhập
   * @param credentials Thông tin đăng nhập
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      logger.info('Đang đăng nhập với email:', credentials.email);
      logger.time('login');
      
      // Gọi API đăng nhập
      const response = await apiService.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      // Lưu token và thông tin người dùng
      if (response.token) {
        await saveAuthToken(response.token);
        await saveUserData(response.user);
        logger.info('Đăng nhập thành công:', response.user.email);
      }

      logger.timeEnd('login');
      return response;
    } catch (error) {
      logger.error('Lỗi đăng nhập:', error);
      throw error;
    }
  },

  /**
   * Đăng ký
   * @param userData Thông tin đăng ký
   */
  register: async (userData: RegisterRequest): Promise<any> => {
    try {
      logger.info('Đang đăng ký tài khoản:', userData.email);
      
      const response = await apiService.post(
        API_ENDPOINTS.AUTH.REGISTER,
        userData
      );
      
      logger.info('Đăng ký thành công:', userData.email);
      return response;
    } catch (error) {
      logger.error('Lỗi đăng ký:', error);
      throw error;
    }
  },

  /**
   * Đăng xuất
   */
  logout: async (): Promise<void> => {
    try {
      logger.info('Đang đăng xuất');
      
      // Gọi API đăng xuất (nếu cần)
      try {
        await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
      } catch (error) {
        // Bỏ qua lỗi khi gọi API đăng xuất
        logger.warn('Lỗi khi gọi API đăng xuất:', error);
      }

      // Xóa dữ liệu người dùng khỏi storage
      await clearUserSession();
      logger.info('Đăng xuất thành công');
    } catch (error) {
      logger.error('Lỗi khi đăng xuất:', error);
      throw error;
    }
  },
};

export default authService; 