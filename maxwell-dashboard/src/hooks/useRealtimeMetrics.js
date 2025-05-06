// src/hooks/useRealtimeMetrics.jsx
import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

export default function useRealtimeMetrics() {
  const [metrics, setMetrics] = useState({ power: 0, voltage: 0, current: 0 });

  useEffect(() => {
    const metricsRef = ref(database, '/energy_data');

    const unsubscribe = onValue(metricsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setMetrics({ power: 0, voltage: 0, current: 0 });
        return;
      }

      let totalPower = 0;
      let totalVoltage = 0;
      let totalCurrent = 0;

      Object.values(data).forEach((entry) => {
        totalPower += Number(entry.power) || 0;
        totalVoltage += Number(entry.voltage) || 0;
        totalCurrent += Number(entry.current) || 0;
      });

      setMetrics({
        power: totalPower,
        voltage: totalVoltage,
        current: totalCurrent,
      });
    });

    return () => unsubscribe();
  }, []);

  return metrics;
}
