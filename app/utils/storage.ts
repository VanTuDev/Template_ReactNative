import AsyncStorage from '@react-native-async-storage/async-storage';

// Khóa lưu trữ
const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
};

/**
 * Lưu token xác thực
 */
export const saveAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.error('Lỗi khi lưu token:', error);
    throw error;
  }
};

/**
 * Lấy token xác thực
 */
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Lỗi khi lấy token:', error);
    return null;
  }
};

/**
 * Xóa token xác thực
 */
export const removeAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Lỗi khi xóa token:', error);
    throw error;
  }
};

/**
 * Lưu dữ liệu người dùng
 */
export const saveUserData = async (userData: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, jsonValue);
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu người dùng:', error);
    throw error;
  }
};

/**
 * Lấy dữ liệu người dùng
 */
export const getUserData = async (): Promise<any | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    return null;
  }
};

/**
 * Xóa dữ liệu người dùng
 */
export const removeUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
  } catch (error) {
    console.error('Lỗi khi xóa dữ liệu người dùng:', error);
    throw error;
  }
};

/**
 * Xóa tất cả dữ liệu người dùng khi đăng xuất
 */
export const clearUserSession = async (): Promise<void> => {
  try {
    await Promise.all([
      removeAuthToken(),
      removeUserData(),
    ]);
  } catch (error) {
    console.error('Lỗi khi xóa phiên người dùng:', error);
    throw error;
  }
}; 