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

    const unsubscribe = onValue(metricsRef, (snapshot) => {
     const raw = snapshot.val();

      const entries = Object.values(raw)
        .sort((a, b) => a.timestamp - b.timestamp);

      const timestamps = entries.map(e =>
        new Date(e.timestamp).toLocaleDateString()
      );
      const voltage = entries.map(e => e.voltage);
      const current = entries.map(e => e.current);
      const power   = entries.map(e => e.power);

      setMetrics({ timestamps, voltage, current, power });

      setMetrics({ timestamps, voltage, current, power });
    });

    return () => unsubscribe();
  }, []);

  return metrics;
}
