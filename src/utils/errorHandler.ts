/**
 * ERROR HANDLER
 * 
 * THIS UTILITY PROVIDES CENTRALIZED ERROR HANDLING
 * IT ENABLES CONSISTENT ERROR LOGGING, TRACKING, AND USER FEEDBACK
 */

import { Alert } from 'react-native';
import config from '../config/config';

// ERROR TYPES
export enum ErrorType {
  NETWORK = 'NETWORK',
  API = 'API',
  AUTH = 'AUTH',
  VALIDATION = 'VALIDATION',
  APP = 'APP',
  UNKNOWN = 'UNKNOWN'
}

// ERROR INTERFACE
export interface AppError {
  type: ErrorType;
  message: string;
  code?: string | number;
  source?: string;
  timestamp: Date;
  originalError?: any;
}

// CREATE FORMATTED ERROR OBJECT
export const createError = (
  type: ErrorType,
  message: string,
  originalError?: any,
  code?: string | number,
  source?: string
): AppError => ({
  type,
  message,
  code,
  source,
  timestamp: new Date(),
  originalError,
});

// LOG ERROR TO CONSOLE IN DEVELOPMENT
const logErrorToConsole = (error: AppError) => {
  if (__DEV__ || config.logLevel === 'debug') {
    console.group('APPLICATION ERROR');
    console.error(`Type: ${error.type}`);
    console.error(`Message: ${error.message}`);
    console.error(`Source: ${error.source || 'Not specified'}`);
    console.error(`Code: ${error.code || 'Not specified'}`);
    console.error(`Timestamp: ${error.timestamp.toISOString()}`);
    if (error.originalError) {
      console.error('Original error:', error.originalError);
    }
    console.groupEnd();
  }
};

// SEND ERROR TO ANALYTICS/MONITORING SERVICE
const reportErrorToService = (error: AppError) => {
  // IMPLEMENT INTEGRATION WITH ERROR REPORTING SERVICE
  // SUCH AS SENTRY, FIREBASE CRASHLYTICS, ETC.
  // Example:
  // if (config.enableCrashReporting) {
  //   Sentry.captureException(error.originalError || error);
  // }
  
  // THIS IS A PLACEHOLDER FOR ACTUAL IMPLEMENTATION
  console.log('Error would be reported to monitoring service:', error.type);
};

// SHOW ERROR MESSAGE TO USER
export const showErrorAlert = (
  title: string = 'Error',
  message: string = 'An unexpected error occurred. Please try again.',
  onPress?: () => void
) => {
  Alert.alert(title, message, [
    {
      text: 'OK',
      onPress: onPress,
    },
  ]);
};

// HANDLE NETWORK ERRORS
export const handleNetworkError = (error: any, source?: string) => {
  // EXTRACT RELEVANT INFORMATION FROM NETWORK ERROR
  const isTimeout = error.code === 'ECONNABORTED';
  const isOffline = !isTimeout && error.message?.includes('Network Error');
  
  let message = 'Network connection issue. Please check your internet connection.';
  if (isTimeout) {
    message = 'Request timed out. Please try again.';
  }
  
  const appError = createError(
    ErrorType.NETWORK,
    message,
    error,
    error.code,
    source
  );
  
  // PROCESS THE ERROR
  handleError(appError);
  
  return appError;
};

// HANDLE API ERRORS
export const handleApiError = (error: any, source?: string) => {
  // EXTRACT RELEVANT INFORMATION FROM API ERROR
  const statusCode = error.response?.status;
  const apiMessage = error.response?.data?.message || error.message;
  
  let message = 'Server error. Please try again later.';
  let type = ErrorType.API;
  
  // CATEGORIZE ERRORS BASED ON STATUS CODE
  if (statusCode === 401 || statusCode === 403) {
    message = 'Authentication error. Please log in again.';
    type = ErrorType.AUTH;
  } else if (statusCode === 400) {
    message = apiMessage || 'Invalid request. Please check your data.';
    type = ErrorType.VALIDATION;
  } else if (statusCode === 404) {
    message = 'Resource not found.';
  } else if (statusCode >= 500) {
    message = 'Server is currently unavailable. Please try again later.';
  }
  
  const appError = createError(
    type,
    message,
    error,
    statusCode,
    source
  );
  
  // PROCESS THE ERROR
  handleError(appError);
  
  return appError;
};

// MAIN ERROR HANDLER
export const handleError = (error: AppError): AppError => {
  // LOG ERROR
  logErrorToConsole(error);
  
  // REPORT TO SERVICE
  reportErrorToService(error);
  
  // RETURN THE ERROR FOR FURTHER HANDLING
  return error;
};

// EXPORT DEFAULT FUNCTIONS
export default {
  handleError,
  handleNetworkError,
  handleApiError,
  showErrorAlert,
  createError,
};
