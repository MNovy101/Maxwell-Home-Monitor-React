// src/hooks/useRealtimeMetrics.js
import { useState, useEffect } from 'react';
import { database } from '../firebase';
import {
  ref,
  query,
  orderByChild,
  limitToLast,
  onValue
} from 'firebase/database';

export default function useRealtimeMetrics() {
  const [metrics, setMetrics] = useState({
    voltage: 0,
    current: 0,
    power: 0
  });

  useEffect(() => {
    const latestQuery = query(
      ref(database, '/energy_data'),
      orderByChild('timestamp'),
      limitToLast(1)
    );

    const unsubscribe = onValue(latestQuery, snapshot => {
      const data = snapshot.val();
      if (data) {
        const lastKey = Object.keys(data)[0];
        setMetrics({
          voltage: data[lastKey].voltage,
          current: data[lastKey].current,
          power: data[lastKey].power
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return metrics;
}
