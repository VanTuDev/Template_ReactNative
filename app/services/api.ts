import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL, API_TIMEOUT, DEFAULT_HEADERS } from '../config/api';
import { getAuthToken } from '../utils/storage';

// Tạo instance axios với cấu hình mặc định
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: DEFAULT_HEADERS,
});

// Hàm log chỉ khi ở môi trường dev
const log = (message: string, data?: any) => {
  if (process.env.ENABLE_LOGS === 'true') {
    if (data) {
      console.log(`[API] ${message}`, data);
    } else {
      console.log(`[API] ${message}`);
    }
  }
};

// Interceptor cho request
apiClient.interceptors.request.use(
  async (config) => {
    // Thêm token vào header nếu có
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request trong môi trường dev
    log(`Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
    
    return config;
  },
  (error) => {
    log('Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor cho response
apiClient.interceptors.response.use(
  (response) => {
    // Log response trong môi trường dev
    log(`Response: ${response.status} ${response.config.url}`, response.data);
    
    // Xử lý response thành công
    return response;
  },
  (error) => {
    // Xử lý lỗi
    if (error.response) {
      // Lỗi từ server với status code
      log(`Error Response: ${error.response.status} ${error.config?.url}`, error.response.data);
      
      // Xử lý token hết hạn (401)
      if (error.response.status === 401) {
        // Có thể thêm logic refresh token hoặc logout ở đây
      }
    } else if (error.request) {
      // Không nhận được response
      log('Error Request:', error.request);
    } else {
      // Lỗi khi thiết lập request
      log('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Các hàm gọi API
export const apiService = {
  /**
   * Gọi API với phương thức GET
   */
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.get(url, config);
    return response.data;
  },

  /**
   * Gọi API với phương thức POST
   */
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.post(url, data, config);
    return response.data;
  },

  /**
   * Gọi API với phương thức PUT
   */
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.put(url, data, config);
    return response.data;
  },

  /**
   * Gọi API với phương thức DELETE
   */
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.delete(url, config);
    return response.data;
  },
};

export default apiService; 