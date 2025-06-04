/**
 * STORAGE UTILITY
 * 
 * THIS UTILITY WRAPS ASYNCSTORAGE WITH TYPE SAFETY AND ADDITIONAL FEATURES
 * IT PROVIDES CONSISTENT DATA PERSISTENCE PATTERNS THROUGHOUT THE APP
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleError, createError, ErrorType } from './errorHandler';

// STORAGE CLASS WITH TYPE SAFETY
class Storage {
  /**
   * STORE A VALUE IN ASYNC STORAGE
   * 
   * @param key - Storage key
   * @param value - Value to store (will be JSON stringified)
   */
  static async set<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      handleError(
        createError(
          ErrorType.APP,
          `Failed to store data for key: ${key}`,
          error,
          undefined,
          'Storage.set'
        )
      );
      throw error;
    }
  }

  /**
   * RETRIEVE A VALUE FROM ASYNC STORAGE
   * 
   * @param key - Storage key
   * @returns - Parsed value or null if not found
   */
  static async get<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) as T : null;
    } catch (error) {
      handleError(
        createError(
          ErrorType.APP,
          `Failed to retrieve data for key: ${key}`,
          error,
          undefined,
          'Storage.get'
        )
      );
      return null;
    }
  }

  /**
   * REMOVE A VALUE FROM ASYNC STORAGE
   * 
   * @param key - Storage key to remove
   */
  static async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      handleError(
        createError(
          ErrorType.APP,
          `Failed to remove data for key: ${key}`,
          error,
          undefined,
          'Storage.remove'
        )
      );
      throw error;
    }
  }

  /**
   * CLEAR ALL APP DATA FROM ASYNC STORAGE
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      handleError(
        createError(
          ErrorType.APP,
          'Failed to clear storage',
          error,
          undefined,
          'Storage.clear'
        )
      );
      throw error;
    }
  }

  /**
   * STORE A VALUE WITH EXPIRATION TIME
   * 
   * @param key - Storage key
   * @param value - Value to store
   * @param ttlSeconds - Time to live in seconds
   */
  static async setWithExpiry<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    const item = {
      value,
      expiry: Date.now() + (ttlSeconds * 1000),
    };
    await this.set(key, item);
  }

  /**
   * RETRIEVE A VALUE WITH EXPIRATION CHECK
   * 
   * @param key - Storage key
   * @returns - Value if exists and not expired, otherwise null
   */
  static async getWithExpiry<T>(key: string): Promise<T | null> {
    try {
      const itemStr = await AsyncStorage.getItem(key);
      if (!itemStr) {
        return null;
      }

      const item = JSON.parse(itemStr);
      
      // CHECK IF ITEM IS EXPIRED
      if (item.expiry && Date.now() > item.expiry) {
        // ITEM IS EXPIRED - REMOVE IT AND RETURN NULL
        await this.remove(key);
        return null;
      }
      
      return item.value as T;
    } catch (error) {
      handleError(
        createError(
          ErrorType.APP,
          `Failed to retrieve data with expiry for key: ${key}`,
          error,
          undefined,
          'Storage.getWithExpiry'
        )
      );
      return null;
    }
  }

  /**
   * GET ALL KEYS FROM STORAGE
   * 
   * @returns - Array of all storage keys
   */
  static async getAllKeys(): Promise<string[]> {
    try {
      // Convert readonly string[] to mutable string[] with Array.from
      const keys = await AsyncStorage.getAllKeys();
      return Array.from(keys);
    } catch (error) {
      handleError(
        createError(
          ErrorType.APP,
          'Failed to get all storage keys',
          error,
          undefined,
          'Storage.getAllKeys'
        )
      );
      return [];
    }
  }

  /**
   * MULTI-GET ITEMS FROM STORAGE
   * 
   * @param keys - Array of keys to retrieve
   * @returns - Object with key-value pairs for found items
   */
  static async multiGet(keys: string[]): Promise<Record<string, any>> {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      return pairs.reduce((result, [key, value]) => {
        if (value) {
          try {
            result[key] = JSON.parse(value);
          } catch {
            result[key] = value;
          }
        }
        return result;
      }, {} as Record<string, any>);
    } catch (error) {
      handleError(
        createError(
          ErrorType.APP,
          'Failed to multi-get storage items',
          error,
          undefined,
          'Storage.multiGet'
        )
      );
      return {};
    }
  }
}

export default Storage;
