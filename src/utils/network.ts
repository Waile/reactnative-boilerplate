/**
 * NETWORK UTILITY
 * 
 * THIS UTILITY HANDLES NETWORK CONNECTIVITY MONITORING
 * IT PROVIDES HOOKS AND FUNCTIONS TO TRACK ONLINE/OFFLINE STATUS
 */

import NetInfo, { NetInfoState, NetInfoSubscription } from '@react-native-community/netinfo';
import { useEffect, useState, useCallback } from 'react';

// NETWORK STATE INTERFACE
export interface NetworkState {
  isConnected: boolean;
  type: string | null;
  isInternetReachable: boolean | null;
  details: any;
}

// DEFAULT NETWORK STATE
const DEFAULT_STATE: NetworkState = {
  isConnected: true, // ASSUME CONNECTED BY DEFAULT
  type: null,
  isInternetReachable: null,
  details: null,
};

// GLOBAL NETWORK STATE
let currentNetworkState: NetworkState = { ...DEFAULT_STATE };
let listeners: ((state: NetworkState) => void)[] = [];

/**
 * INITIALIZE NETWORK MONITORING
 * SETS UP GLOBAL LISTENER AND UPDATES CURRENT STATE
 */
const initNetworkMonitoring = (): NetInfoSubscription => {
  return NetInfo.addEventListener((state: NetInfoState) => {
    // UPDATE CURRENT NETWORK STATE
    currentNetworkState = {
      isConnected: Boolean(state.isConnected),
      type: state.type,
      isInternetReachable: state.isInternetReachable,
      details: state.details,
    };
    
    // NOTIFY ALL LISTENERS
    listeners.forEach(listener => listener(currentNetworkState));
  });
};

// INITIALIZE MONITORING AT IMPORT TIME
const subscription = initNetworkMonitoring();

/**
 * ADD NETWORK STATE LISTENER
 * 
 * @param listener - Function to call when network state changes
 * @returns Unsubscribe function
 */
export const addNetworkListener = (
  listener: (state: NetworkState) => void
): (() => void) => {
  listeners.push(listener);
  
  // IMMEDIATELY NOTIFY WITH CURRENT STATE
  listener(currentNetworkState);
  
  // RETURN UNSUBSCRIBE FUNCTION
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};

/**
 * GET CURRENT NETWORK STATE
 */
export const getNetworkState = async (): Promise<NetworkState> => {
  try {
    const state = await NetInfo.fetch();
    
    return {
      isConnected: Boolean(state.isConnected),
      type: state.type,
      isInternetReachable: state.isInternetReachable,
      details: state.details,
    };
  } catch (error) {
    console.error('Error fetching network state:', error);
    return currentNetworkState;
  }
};

/**
 * CHECK IF DEVICE IS CURRENTLY ONLINE
 */
export const isOnline = async (): Promise<boolean> => {
  const state = await getNetworkState();
  return Boolean(state.isConnected);
};

/**
 * REACT HOOK FOR NETWORK STATE
 * PROVIDES REACTIVE NETWORK STATE IN COMPONENTS
 */
export const useNetwork = (): NetworkState => {
  const [networkState, setNetworkState] = useState<NetworkState>(currentNetworkState);
  
  useEffect(() => {
    // SUBSCRIBE TO NETWORK CHANGES
    const unsubscribe = addNetworkListener(setNetworkState);
    
    // CLEANUP FUNCTION
    return () => {
      unsubscribe();
    };
  }, []);
  
  return networkState;
};

/**
 * HOOK FOR ONLINE STATUS
 * SIMPLIFIED HOOK JUST FOR CONNECTION STATUS
 */
export const useOnlineStatus = (): boolean => {
  const { isConnected } = useNetwork();
  return isConnected;
};

/**
 * RETRY FUNCTION WITH NETWORK CHECK
 * RETRIES A FUNCTION WHEN NETWORK BECOMES AVAILABLE
 * 
 * @param fn - Function to retry
 * @param maxRetries - Maximum number of retries
 * @param retryInterval - Time between retries in ms
 */
export const retryWithNetwork = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  retryInterval: number = 1000
): Promise<T> => {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      // CHECK IF ONLINE BEFORE ATTEMPTING
      const online = await isOnline();
      
      if (!online) {
        console.log(`Network offline. Retry attempt ${retries + 1}/${maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, retryInterval));
        retries++;
        continue;
      }
      
      // TRY TO EXECUTE THE FUNCTION
      return await fn();
    } catch (error) {
      console.error(`Error in retry attempt ${retries + 1}/${maxRetries}:`, error);
      
      // STOP IF MAX RETRIES REACHED
      if (retries >= maxRetries - 1) {
        throw error;
      }
      
      // WAIT BEFORE RETRYING
      await new Promise(resolve => setTimeout(resolve, retryInterval));
      retries++;
    }
  }
  
  throw new Error(`Failed after ${maxRetries} retries`);
};

// CLEANUP FUNCTION FOR APP UNMOUNT/RESTART
export const cleanupNetworkMonitoring = (): void => {
  if (subscription) {
    subscription();
  }
  listeners = [];
};

export default {
  getNetworkState,
  isOnline,
  addNetworkListener,
  useNetwork,
  useOnlineStatus,
  retryWithNetwork,
  cleanupNetworkMonitoring,
};
