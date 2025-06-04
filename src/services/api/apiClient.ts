/**
 * API CLIENT
 * 
 * THIS FILE PROVIDES A CENTRALIZED API CLIENT USING AXIOS
 * IT HANDLES REQUEST/RESPONSE INTERCEPTORS, ERROR HANDLING, AND AUTHENTICATION
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API CONFIGURATION
const API_CONFIG = {
  BASE_URL: 'https://api.example.com/v1', // REPLACE WITH YOUR ACTUAL API URL
  TIMEOUT: 30000, // 30 SECONDS
};

// STORAGE KEYS
const AUTH_TOKEN_KEY = '@app_auth_token';

class ApiClient {
  private axiosInstance: AxiosInstance;
  
  constructor() {
    // INITIALIZE AXIOS INSTANCE WITH DEFAULT CONFIGURATION
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    // SETUP REQUEST INTERCEPTORS
    this.setupRequestInterceptors();
    
    // SETUP RESPONSE INTERCEPTORS
    this.setupResponseInterceptors();
  }
  
  // SETUP REQUEST INTERCEPTORS
  private setupRequestInterceptors = () => {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // GET AUTH TOKEN FROM STORAGE
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        
        // ADD AUTH TOKEN TO HEADERS IF AVAILABLE
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };
  
  // SETUP RESPONSE INTERCEPTORS
  private setupResponseInterceptors = () => {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // SUCCESSFUL RESPONSES
        return response;
      },
      async (error) => {
        // HANDLE ERRORS
        const originalRequest = error.config;
        
        // HANDLE 401 UNAUTHORIZED (TOKEN EXPIRED)
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          // ATTEMPT TOKEN REFRESH (IMPLEMENTATION DEPENDS ON YOUR AUTH SYSTEM)
          try {
            // PERFORM TOKEN REFRESH HERE
            // const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
            // const newToken = await this.refreshAuthToken(refreshToken);
            // await AsyncStorage.setItem(AUTH_TOKEN_KEY, newToken);
            
            // RETRY THE ORIGINAL REQUEST
            // originalRequest.headers.Authorization = `Bearer ${newToken}`;
            // return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            // HANDLE REFRESH ERROR (E.G., LOG OUT USER)
            await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
            // NOTIFY AUTH SERVICE TO LOG OUT USER
            return Promise.reject(refreshError);
          }
        }
        
        // HANDLE OTHER ERRORS
        return Promise.reject(error);
      }
    );
  };
  
  // MAKE A GET REQUEST
  public get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  };
  
  // MAKE A POST REQUEST
  public post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  };
  
  // MAKE A PUT REQUEST
  public put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  };
  
  // MAKE A DELETE REQUEST
  public delete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  };
  
  // CENTRAL ERROR HANDLING
  private handleError = (error: any) => {
    // LOG ERRORS IN DEVELOPMENT
    if (__DEV__) {
      console.error('API Error:', error);
    }
    
    // ADD CUSTOM ERROR HANDLING, ANALYTICS LOGGING, ETC.
    // COULD INTEGRATE WITH A LOGGING SERVICE HERE
  };
}

// EXPORT A SINGLETON INSTANCE OF THE API CLIENT
const apiClient = new ApiClient();
export default apiClient;
