/**
 * PERMISSIONS UTILITY
 * 
 * THIS UTILITY MANAGES DEVICE PERMISSION REQUESTS
 * IT SIMPLIFIES REQUESTING AND CHECKING PERMISSION STATUS
 */

import { Platform } from 'react-native';
import { check, request, RESULTS, Permission, openSettings } from 'react-native-permissions';
import { showErrorAlert } from './errorHandler';

// PERMISSION RESULT TYPE
export type PermissionResult = 'granted' | 'denied' | 'blocked' | 'unavailable';

/**
 * CHECK PERMISSION STATUS
 * 
 * @param permission - The permission to check
 * @returns Permission status
 */
export const checkPermission = async (
  permission: Permission
): Promise<PermissionResult> => {
  try {
    const result = await check(permission);
    
    switch (result) {
      case RESULTS.GRANTED:
        return 'granted';
      case RESULTS.DENIED:
        return 'denied';
      case RESULTS.BLOCKED:
        return 'blocked';
      case RESULTS.UNAVAILABLE:
        return 'unavailable';
      default:
        return 'denied';
    }
  } catch (error) {
    console.error('Error checking permission:', error);
    return 'denied';
  }
};

/**
 * REQUEST PERMISSION
 * 
 * @param permission - The permission to request
 * @returns Permission status after request
 */
export const requestPermission = async (
  permission: Permission
): Promise<PermissionResult> => {
  try {
    const result = await request(permission);
    
    switch (result) {
      case RESULTS.GRANTED:
        return 'granted';
      case RESULTS.DENIED:
        return 'denied';
      case RESULTS.BLOCKED:
        return 'blocked';
      case RESULTS.UNAVAILABLE:
        return 'unavailable';
      default:
        return 'denied';
    }
  } catch (error) {
    console.error('Error requesting permission:', error);
    return 'denied';
  }
};

/**
 * CHECK AND REQUEST PERMISSION
 * If permission is not granted, request it
 * 
 * @param permission - The permission to check and request
 * @param rationale - Message explaining why the permission is needed
 * @returns Permission status after check/request
 */
export const checkAndRequestPermission = async (
  permission: Permission,
  rationale?: string
): Promise<PermissionResult> => {
  // FIRST CHECK CURRENT STATUS
  const currentStatus = await checkPermission(permission);
  
  if (currentStatus === 'granted') {
    return 'granted';
  }
  
  // IF BLOCKED, INFORM USER TO ENABLE IT IN SETTINGS
  if (currentStatus === 'blocked') {
    showErrorAlert(
      'Permission Required',
      rationale || 'This feature requires permission that is currently blocked. Please enable it in app settings.',
      () => openSettings()
    );
    return 'blocked';
  }
  
  // IF DENIED BUT NOT BLOCKED, REQUEST PERMISSION
  return await requestPermission(permission);
};

/**
 * HELPER FUNCTIONS FOR COMMON PERMISSIONS
 */

// CAMERA PERMISSION
export const requestCameraPermission = async (
  rationale?: string
): Promise<PermissionResult> => {
  const permission = Platform.select({
    ios: 'ios.permission.CAMERA',
    android: 'android.permission.CAMERA',
  }) as Permission;
  
  return await checkAndRequestPermission(
    permission, 
    rationale || 'Camera access is required for this feature'
  );
};

// PHOTO LIBRARY PERMISSION
export const requestPhotoLibraryPermission = async (
  rationale?: string
): Promise<PermissionResult> => {
  const permission = Platform.select({
    ios: 'ios.permission.PHOTO_LIBRARY',
    android: 'android.permission.READ_EXTERNAL_STORAGE',
  }) as Permission;
  
  return await checkAndRequestPermission(
    permission, 
    rationale || 'Photo library access is required for this feature'
  );
};

// LOCATION PERMISSION
export const requestLocationPermission = async (
  rationale?: string
): Promise<PermissionResult> => {
  const permission = Platform.select({
    ios: 'ios.permission.LOCATION_WHEN_IN_USE',
    android: 'android.permission.ACCESS_FINE_LOCATION',
  }) as Permission;
  
  return await checkAndRequestPermission(
    permission, 
    rationale || 'Location access is required for this feature'
  );
};

// MICROPHONE PERMISSION
export const requestMicrophonePermission = async (
  rationale?: string
): Promise<PermissionResult> => {
  const permission = Platform.select({
    ios: 'ios.permission.MICROPHONE',
    android: 'android.permission.RECORD_AUDIO',
  }) as Permission;
  
  return await checkAndRequestPermission(
    permission, 
    rationale || 'Microphone access is required for this feature'
  );
};

// NOTIFICATIONS PERMISSION
export const requestNotificationsPermission = async (
  rationale?: string
): Promise<PermissionResult> => {
  const permission = Platform.select({
    ios: 'ios.permission.NOTIFICATIONS',
    android: 'android.permission.POST_NOTIFICATIONS',
  }) as Permission;
  
  return await checkAndRequestPermission(
    permission, 
    rationale || 'Notification permissions are required for this feature'
  );
};

export default {
  checkPermission,
  requestPermission,
  checkAndRequestPermission,
  requestCameraPermission,
  requestPhotoLibraryPermission,
  requestLocationPermission,
  requestMicrophonePermission,
  requestNotificationsPermission,
};
