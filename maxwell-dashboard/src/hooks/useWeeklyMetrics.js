// src/hooks/useCumalativeMetrics.js
import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

export default function useRealtimeMetrics() {
  const [metrics, setMetrics] = useState({
    timestamps: [],
    voltage: [],
    current: [],
    power: []
  });

  useEffect(() => {
    const metricsRef = ref(database, '/energy_data');
    const now = Date.now();
    const sevenDaysAgo = now - 8 * 24 * 60 * 60 * 1000;

    const unsubscribe = onValue(metricsRef, (snapshot) => {
     const raw = snapshot.val();

      const entries = Object.values(raw).filter(e => e.timestamp >= sevenDaysAgo);


      const timestamps = entries.map(e =>
        new Date(e.timestamp).toLocaleDateString()
      );
      const voltage = entries.map(e => e.voltage);
      const current = entries.map(e => e.current);
      const power   = entries.map(e => e.power);

      setMetrics({ timestamps, voltage, current, power });
    });

    return () => unsubscribe();
  }, []);

  return metrics;
}
