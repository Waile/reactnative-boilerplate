/**
 * USER SLICE
 * 
 * THIS REDUX SLICE MANAGES USER STATE AND AUTHENTICATION
 * IT HANDLES USER LOGIN, REGISTRATION, AND PROFILE MANAGEMENT
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginRequest, RegisterRequest } from '../../services/api/userService';
import userService from '../../services/api/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// DEFINE THE AUTH TOKEN STORAGE KEY
const AUTH_TOKEN_KEY = '@app_auth_token';

// STATE INTERFACE
interface UserState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// INITIAL STATE
const initialState: UserState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// ASYNC THUNKS
// LOGIN USER
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await userService.login(credentials);
      // STORE TOKEN IN ASYNC STORAGE
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to login');
    }
  }
);

// REGISTER USER
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await userService.register(userData);
      // STORE TOKEN IN ASYNC STORAGE
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to register');
    }
  }
);

// LOAD USER PROFILE
export const loadUserProfile = createAsyncThunk(
  'user/loadProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getProfile();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load profile');
    }
  }
);

// UPDATE USER PROFILE
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: Partial<User>, { rejectWithValue }) => {
    try {
      return await userService.updateProfile(profileData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

// CHECK AUTH STATUS
export const checkAuthStatus = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        return rejectWithValue('No auth token');
      }
      // LOAD USER PROFILE SINCE WE HAVE A TOKEN
      dispatch(loadUserProfile());
      return { token };
    } catch (error: any) {
      return rejectWithValue('Auth check failed');
    }
  }
);

// LOGOUT USER
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      return true;
    } catch (error: any) {
      return rejectWithValue('Logout failed');
    }
  }
);

// CREATE THE USER SLICE
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // REGISTER USER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // LOAD USER PROFILE
      .addCase(loadUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // UPDATE USER PROFILE
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // CHECK AUTH STATUS
      .addCase(checkAuthStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.token = action.payload.token;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      
      // LOGOUT USER
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

// EXPORT ACTIONS
export const { clearError } = userSlice.actions;

// EXPORT REDUCER
export default userSlice.reducer;
