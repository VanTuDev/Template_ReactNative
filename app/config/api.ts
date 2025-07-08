
// Base URL của API
export const API_BASE_URL = process.env.API_BASE_URL;

// Các endpoint
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
  },
  // User endpoints
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/user/update`,
  },
  // Các endpoint khác có thể được thêm vào đây
};

// Timeout cho các request API (ms)
export const API_TIMEOUT = 15000;

// Headers mặc định
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Cấu hình response
export const RESPONSE_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  API_TIMEOUT,
  DEFAULT_HEADERS,
  RESPONSE_STATUS,
}; 