// src/hooks/useRealtimeMetrics.jsx
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase'; // your initialized firebase/app

export default function useRealtimeMetrics() {
  const [metrics, setMetrics] = useState({ power: 0, voltage: 0, current: 0 });

  useEffect(() => {
    const db = getDatabase(app);
    const dataRef = ref(db, 'energy_data/latest'); // assume you push latest under this path
    return onValue(dataRef, snapshot => {
      const { power = 0, voltage = 0, current = 0 } = snapshot.val() || {};
      setMetrics({ power, voltage, current });
    });
  }, []);

  return metrics;
}
