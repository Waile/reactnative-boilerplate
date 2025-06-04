/**
 * APP CONFIGURATION
 * 
 * THIS FILE CONTAINS ENVIRONMENT-SPECIFIC CONFIGURATION
 * IT CENTRALIZES APP SETTINGS FOR DIFFERENT ENVIRONMENTS
 */

// ENVIRONMENT DETECTION
const getEnvironment = () => {
  if (__DEV__) {
    return 'development';
  } else if (process.env.NODE_ENV === 'staging') {
    return 'staging';
  }
  return 'production';
};

// ENVIRONMENT CONFIGS
const configs = {
  development: {
    apiUrl: 'https://api-dev.example.com/v1',
    timeout: 30000,
    logLevel: 'debug',
    enableAnalytics: false,
    enableCrashReporting: false,
  },
  staging: {
    apiUrl: 'https://api-staging.example.com/v1',
    timeout: 30000,
    logLevel: 'warn',
    enableAnalytics: true,
    enableCrashReporting: true,
  },
  production: {
    apiUrl: 'https://api.example.com/v1',
    timeout: 30000,
    logLevel: 'error',
    enableAnalytics: true,
    enableCrashReporting: true,
  },
};

// CURRENT ENVIRONMENT CONFIG
const currentEnv = getEnvironment();
const config = configs[currentEnv as keyof typeof configs];

// EXPORT CONFIGURATION
export default {
  ...config,
  env: currentEnv,
  
  // APP INFORMATION
  app: {
    name: 'ReactNativeBoilerPlate',
    version: '1.0.0',
    buildNumber: '1',
  },
  
  // AUTH SETTINGS
  auth: {
    tokenStorageKey: '@app_auth_token',
    refreshTokenStorageKey: '@app_refresh_token',
    tokenExpirationKey: '@app_token_expiration',
  },
  
  // FEATURE FLAGS
  features: {
    enablePushNotifications: true,
    enableDeepLinking: true,
    enableBiometricAuth: true,
  },
  
  // CACHE CONFIG
  cache: {
    defaultTTL: 3600, // 1 HOUR IN SECONDS
  },
};
