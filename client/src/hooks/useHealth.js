import { useState, useEffect } from 'react';
import { healthService } from '../services/healthService';

export const useHealth = () => {
  const [healthData, setHealthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkHealth = async () => {
    try {
      setIsLoading(true);
      const res = await healthService.getHealth();
      setHealthData(res.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'API unreachable');
      setHealthData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
    // Re-check periodically every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return { healthData, isLoading, error, refetch: checkHealth };
};
