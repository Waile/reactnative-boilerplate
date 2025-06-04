/**
 * API HOOK
 * 
 * THIS HOOK SIMPLIFIES API CALLS WITH LOADING AND ERROR STATES
 * IT PROVIDES A CONSISTENT PATTERN FOR HANDLING API REQUESTS
 */

import { useState, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseApiResult<T, P extends any[]> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  execute: (...params: P) => Promise<T | null>;
  reset: () => void;
}

const useApi = <T, P extends any[]>(
  apiFunc: (...params: P) => Promise<T>
): UseApiResult<T, P> => {
  // STATE FOR API CALL
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });
  
  // EXECUTE THE API CALL
  const execute = useCallback(
    async (...params: P): Promise<T | null> => {
      try {
        // SET LOADING STATE
        setState({ data: null, isLoading: true, error: null });
        
        // MAKE THE API CALL
        const response = await apiFunc(...params);
        
        // UPDATE STATE WITH RESPONSE
        setState({ data: response, isLoading: false, error: null });
        
        return response;
      } catch (error) {
        // HANDLE ERROR
        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error : new Error('Unknown error occurred'),
        });
        
        return null;
      }
    },
    [apiFunc]
  );
  
  // RESET STATE
  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);
  
  return {
    ...state,
    execute,
    reset,
  };
};

export default useApi;
