import { useState, useCallback } from 'react';

export const useLoading = (initialLoading = false) => {
  const [loading, setLoading] = useState(initialLoading);

  const setLoadingTrue = useCallback(() => setLoading(true), []);
  const setLoadingFalse = useCallback(() => setLoading(false), []);

  const toggleLoading = useCallback(() => setLoading(prevLoading => !prevLoading), []);

  return {
    loading,
    setLoadingTrue,
    setLoadingFalse,
    toggleLoading
  };
};
