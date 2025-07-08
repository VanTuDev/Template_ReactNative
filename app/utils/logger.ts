/**
 * Tiện ích ghi log
 * Chỉ ghi log khi ở môi trường phát triển hoặc được cấu hình
 */

class Logger {
  private enabled: boolean;
  
  constructor() {
    this.enabled = process.env.ENABLE_LOGS === 'true';
  }

  /**
   * Ghi log thông tin
   */
  info(message: string, ...data: any[]): void {
    if (this.enabled) {
      if (data.length > 0) {
        console.log(`[INFO] ${message}`, ...data);
      } else {
        console.log(`[INFO] ${message}`);
      }
    }
  }

  /**
   * Ghi log cảnh báo
   */
  warn(message: string, ...data: any[]): void {
    if (this.enabled) {
      if (data.length > 0) {
        console.warn(`[WARN] ${message}`, ...data);
      } else {
        console.warn(`[WARN] ${message}`);
      }
    }
  }

  /**
   * Ghi log lỗi
   * Luôn ghi log lỗi ngay cả khi disabled
   */
  error(message: string, ...data: any[]): void {
    if (data.length > 0) {
      console.error(`[ERROR] ${message}`, ...data);
    } else {
      console.error(`[ERROR] ${message}`);
    }
  }

  /**
   * Ghi log debug
   * Chỉ ghi khi ở môi trường phát triển
   */
  debug(message: string, ...data: any[]): void {
    if (this.enabled && __DEV__) {
      if (data.length > 0) {
        console.debug(`[DEBUG] ${message}`, ...data);
      } else {
        console.debug(`[DEBUG] ${message}`);
      }
    }
  }

  /**
   * Ghi log thời gian thực hiện
   */
  time(label: string): void {
    if (this.enabled) {
      console.time(`[TIME] ${label}`);
    }
  }

  /**
   * Kết thúc ghi log thời gian
   */
  timeEnd(label: string): void {
    if (this.enabled) {
      console.timeEnd(`[TIME] ${label}`);
    }
  }
}

// Export instance logger
export const logger = new Logger();

export default logger; 