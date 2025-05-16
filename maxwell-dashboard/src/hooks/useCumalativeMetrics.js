// src/hooks/useCumalativeMetrics.js
import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

export default function useRealtimeMetrics() {
  const [metrics, setMetrics] = useState({ current: 0 });

  useEffect(() => {
    const metricsRef = ref(database, '/energy_data');

    const unsubscribe = onValue(metricsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setMetrics({ current: 0 });
        return;
      }

      let totalCurrent = 0;

      Object.values(data).forEach((entry) => {
        totalCurrent += Number(entry.current) || 0;
      });

      setMetrics({ current: totalCurrent });
    });

    return () => unsubscribe();
  }, []);

  return metrics;
}
