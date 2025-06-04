/**
 * USER API SERVICE
 * 
 * THIS SERVICE HANDLES ALL USER-RELATED API CALLS
 * IT PROVIDES A CLEAN INTERFACE FOR COMPONENTS TO INTERACT WITH THE USER API
 */

import apiClient from './apiClient';

// USER TYPES
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  profileImage?: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

// USER SERVICE CLASS
class UserService {
  // ENDPOINT PATHS
  private static ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/users/profile',
    USERS: '/users',
  };

  // USER LOGIN
  public login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(UserService.ENDPOINTS.LOGIN, credentials);
  };

  // USER REGISTRATION
  public register = async (userData: RegisterRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(UserService.ENDPOINTS.REGISTER, userData);
  };

  // GET USER PROFILE
  public getProfile = async (): Promise<User> => {
    return apiClient.get<User>(UserService.ENDPOINTS.PROFILE);
  };

  // UPDATE USER PROFILE
  public updateProfile = async (profileData: Partial<User>): Promise<User> => {
    return apiClient.put<User>(UserService.ENDPOINTS.PROFILE, profileData);
  };

  // GET USER BY ID
  public getUserById = async (userId: string): Promise<User> => {
    return apiClient.get<User>(`${UserService.ENDPOINTS.USERS}/${userId}`);
  };

  // SEARCH USERS
  public searchUsers = async (query: string): Promise<User[]> => {
    return apiClient.get<User[]>(`${UserService.ENDPOINTS.USERS}/search`, {
      params: { query }
    });
  };
}

// EXPORT A SINGLETON INSTANCE
const userService = new UserService();
export default userService;
