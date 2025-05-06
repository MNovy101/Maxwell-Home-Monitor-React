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
    // Build a query: order by 'timestamp', take the last record only
    const latestQuery = query(
      ref(database, '/energy_data'),
      orderByChild('timestamp'),
      limitToLast(1)
    );

    // Subscribe to the query
    const unsubscribe = onValue(latestQuery, snapshot => {
      const data = snapshot.val();
      if (data) {
        // snapshot.val() is an object with a single key => extract it
        const lastKey = Object.keys(data)[0];
        setMetrics({
          voltage: data[lastKey].voltage,
          current: data[lastKey].current,
          power: data[lastKey].power
        });
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []); // Empty deps → run once on mount

  return metrics;
}
