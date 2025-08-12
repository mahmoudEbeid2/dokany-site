import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for optimized data fetching with Promise.all
 * @param {Function} fetchFunction - Function that returns a promise
 * @param {Array} dependencies - Dependencies array for useEffect
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useDataFetching = (fetchFunction, dependencies = [], options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const { 
    enableCache = true, 
    cacheTimeout = 5 * 60 * 1000, // 5 minutes
    retryCount = 3,
    retryDelay = 1000
  } = options;

  // Cache for storing fetched data
  const cache = useRef(new Map());

  const fetchData = useCallback(async (retryAttempt = 0) => {
    try {
      // Check cache first if enabled
      if (enableCache && cache.current.has(fetchFunction.toString())) {
        const cachedData = cache.current.get(fetchFunction.toString());
        if (Date.now() - cachedData.timestamp < cacheTimeout) {
          setData(cachedData.data);
          setLoading(false);
          return;
        }
      }

      // Abort previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();
      
      setLoading(true);
      setError(null);

      const result = await fetchFunction(abortControllerRef.current.signal);
      
      // Cache the result if enabled
      if (enableCache) {
        cache.current.set(fetchFunction.toString(), {
          data: result,
          timestamp: Date.now()
        });
      }

      setData(result);
      setLoading(false);
    } catch (err) {
      if (err.name === 'AbortError') {
        return; // Request was aborted, don't show error
      }

      // Retry logic
      if (retryAttempt < retryCount) {
        setTimeout(() => {
          fetchData(retryAttempt + 1);
        }, retryDelay * (retryAttempt + 1));
        return;
      }

      setError(err.message);
      setLoading(false);
    }
  }, [fetchFunction, enableCache, cacheTimeout, retryCount, retryDelay]);

  // Refetch function
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Clear cache function
  const clearCache = useCallback(() => {
    cache.current.clear();
  }, []);

  useEffect(() => {
    fetchData();
    
    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, dependencies);

  return { 
    data, 
    loading, 
    error, 
    refetch, 
    clearCache,
    abortController: abortControllerRef.current 
  };
};

/**
 * Hook for fetching multiple data sources concurrently using Promise.all
 * @param {Array} fetchFunctions - Array of fetch functions
 * @param {Array} dependencies - Dependencies array for useEffect
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useConcurrentDataFetching = (fetchFunctions, dependencies = [], options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const { 
    enableCache = true, 
    cacheTimeout = 5 * 60 * 1000,
    retryCount = 3,
    retryDelay = 1000
  } = options;

  // Cache for storing fetched data
  const cache = useRef(new Map());

  const fetchAllData = useCallback(async (retryAttempt = 0) => {
    try {
      // Check cache first if enabled
      const cacheKey = fetchFunctions.map(fn => fn.toString()).join('|');
      if (enableCache && cache.current.has(cacheKey)) {
        const cachedData = cache.current.get(cacheKey);
        if (Date.now() - cachedData.timestamp < cacheTimeout) {
          setData(cachedData.data);
          setLoading(false);
          return;
        }
      }

      // Abort previous requests if exist
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();
      
      setLoading(true);
      setError(null);

      // Fetch all data concurrently using Promise.all
      const promises = fetchFunctions.map(fn => fn(abortControllerRef.current.signal));
      const results = await Promise.all(promises);
      
      // Cache the results if enabled
      if (enableCache) {
        cache.current.set(cacheKey, {
          data: results,
          timestamp: Date.now()
        });
      }

      setData(results);
      setLoading(false);
    } catch (err) {
      if (err.name === 'AbortError') {
        return; // Request was aborted, don't show error
      }

      // Retry logic
      if (retryAttempt < retryCount) {
        setTimeout(() => {
          fetchAllData(retryAttempt + 1);
        }, retryDelay * (retryAttempt + 1));
        return;
      }

      setError(err.message);
      setLoading(false);
    }
  }, [fetchFunctions, enableCache, cacheTimeout, retryCount, retryDelay]);

  // Refetch function
  const refetch = useCallback(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Clear cache function
  const clearCache = useCallback(() => {
    cache.current.clear();
  }, []);

  useEffect(() => {
    fetchAllData();
    
    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, dependencies);

  return { 
    data, 
    loading, 
    error, 
    refetch, 
    clearCache,
    abortController: abortControllerRef.current 
  };
};
