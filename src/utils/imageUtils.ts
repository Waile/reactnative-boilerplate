/**
 * IMAGE UTILITY
 * 
 * THIS UTILITY PROVIDES IMAGE HANDLING FUNCTIONALITY
 * IT SIMPLIFIES IMAGE OPERATIONS THROUGHOUT THE APP
 */

import { Image, ImageURISource, Platform, Dimensions } from 'react-native';
import { requestPhotoLibraryPermission } from './permissions';
import { handleError, createError, ErrorType } from './errorHandler';

// GET SCREEN DIMENSIONS
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// IMAGE SIZE TYPE
export interface ImageSize {
  width: number;
  height: number;
}

/**
 * GET IMAGE SIZE FROM URI
 * 
 * @param uri - Image URI to check
 * @returns Promise with image dimensions
 */
export const getImageSize = (uri: string): Promise<ImageSize> => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => {
        resolve({ width, height });
      },
      (error) => {
        handleError(
          createError(
            ErrorType.APP,
            `Failed to get image size for URI: ${uri}`,
            error,
            undefined,
            'getImageSize'
          )
        );
        reject(error);
      }
    );
  });
};

/**
 * CALCULATE IMAGE DIMENSIONS TO MAINTAIN ASPECT RATIO
 * 
 * @param originalWidth - Original image width
 * @param originalHeight - Original image height
 * @param maxWidth - Maximum width constraint
 * @param maxHeight - Maximum height constraint
 * @returns Calculated dimensions that preserve aspect ratio
 */
export const calculateAspectRatio = (
  originalWidth: number,
  originalHeight: number,
  maxWidth: number = screenWidth,
  maxHeight: number = screenHeight
): ImageSize => {
  // IF IMAGE IS SMALLER THAN MAX DIMENSIONS, RETURN ORIGINAL
  if (originalWidth <= maxWidth && originalHeight <= maxHeight) {
    return { width: originalWidth, height: originalHeight };
  }
  
  const widthRatio = maxWidth / originalWidth;
  const heightRatio = maxHeight / originalHeight;
  
  // USE THE SMALLER RATIO TO FIT WITHIN CONSTRAINTS
  const ratio = Math.min(widthRatio, heightRatio);
  
  return {
    width: Math.floor(originalWidth * ratio),
    height: Math.floor(originalHeight * ratio),
  };
};

/**
 * FORMAT IMAGE SOURCE FROM URI OR REQUIRE
 * 
 * @param source - URI string or require('./image.png')
 * @returns Properly formatted image source for React Native Image
 */
export const formatImageSource = (
  source: string | number | ImageURISource
): ImageURISource => {
  if (typeof source === 'string') {
    return { uri: source };
  }
  
  if (typeof source === 'number') {
    return { uri: Image.resolveAssetSource(source).uri };
  }
  
  return source;
};

/**
 * GET PLACEHOLDER IMAGE BASED ON TYPE
 * 
 * @param type - Type of placeholder (avatar, product, etc.)
 * @returns URI or require for placeholder image
 */
export const getPlaceholderImage = (
  type: 'avatar' | 'product' | 'banner' | 'thumbnail' = 'thumbnail'
): any => {
  switch (type) {
    case 'avatar':
      return require('../assets/images/placeholder/avatar.png');
    case 'product':
      return require('../assets/images/placeholder/product.png');
    case 'banner':
      return require('../assets/images/placeholder/banner.png');
    case 'thumbnail':
    default:
      return require('../assets/images/placeholder/thumbnail.png');
  }
};

/**
 * GET BASE64 DATA FROM IMAGE URI
 * 
 * @param uri - Image URI
 * @returns Promise with base64 string
 */
export const getBase64FromUri = async (uri: string): Promise<string> => {
  try {
    // REQUEST PHOTO LIBRARY PERMISSIONS IF NEEDED
    if (uri.startsWith('ph://') || uri.startsWith('content://')) {
      await requestPhotoLibraryPermission('Photo library access is required to process this image');
    }
    
    // IMPLEMENTATION DEPENDS ON PLATFORM AND IMAGE SOURCE
    // THIS IS A PLACEHOLDER - REAL IMPLEMENTATION WOULD USE REACT NATIVE FS
    // OR SIMILAR LIBRARY TO READ THE IMAGE DATA
    throw new Error('getBase64FromUri needs implementation with react-native-fs');
    
    // EXAMPLE WITH REACT-NATIVE-FS:
    // const base64 = await RNFS.readFile(uri, 'base64');
    // return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    handleError(
      createError(
        ErrorType.APP,
        'Failed to convert image to base64',
        error,
        undefined,
        'getBase64FromUri'
      )
    );
    throw error;
  }
};

/**
 * NORMALIZE IMAGE URI BASED ON PLATFORM
 * 
 * @param uri - Image URI from picker or other source
 * @returns Normalized URI that can be used across the app
 */
export const normalizeImageUri = (uri: string): string => {
  // HANDLE PLATFORM-SPECIFIC URI FORMATS
  if (Platform.OS === 'ios') {
    // IOS SOMETIMES RETURNS FILE URLS WITH FILE://
    // OR PHOTOS URLS LIKE PH://
    if (uri.startsWith('file://')) {
      return uri;
    }
    
    if (uri.startsWith('ph://')) {
      // CONVERT PHOTOS URI TO USABLE URI
      // THIS IS PLACEHOLDER - MIGHT NEED RN-FETCH-BLOB OR SIMILAR
      return uri;
    }
    
    // ENSURE URI HAS FILE:// PREFIX IF IT'S A LOCAL PATH
    if (uri.startsWith('/')) {
      return `file://${uri}`;
    }
  }
  
  if (Platform.OS === 'android') {
    // HANDLE CONTENT:// URIS OR FILE:/// URIS ON ANDROID
    if (uri.startsWith('content://') || uri.startsWith('file:///')) {
      return uri;
    }
  }
  
  // FOR REMOTE URIS OR IF NO TRANSFORMATION NEEDED
  return uri;
};

export default {
  getImageSize,
  calculateAspectRatio,
  formatImageSource,
  getPlaceholderImage,
  getBase64FromUri,
  normalizeImageUri,
};
