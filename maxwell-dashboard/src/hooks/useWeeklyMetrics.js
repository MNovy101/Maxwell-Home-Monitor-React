// src/hooks/useWeeklyMetrics.js
import { useState, useEffect } from 'react';
import { database } from '../firebase';
import {
  ref,
  query,
  orderByChild,
  startAt,
  get
} from 'firebase/database';

export default function useWeeklyMetrics() {
  const [metrics, setMetrics] = useState({
    timestamps: [],
    voltage: [],
    current: [],
    power: []
  });

  useEffect(() => {
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    const weeklyQuery = query(
      ref(database, 'energy_data'),
      orderByChild('timestamp'),
      startAt(sevenDaysAgo)
    );

    get(weeklyQuery)
      .then(snapshot => {
        if (!snapshot.exists()) {
          setMetrics({ timestamps: [], voltage: [], current: [], power: [] });
          return;
        }
        const entries = Object.values(snapshot.val())
          .filter(e => e.timestamp >= sevenDaysAgo)
          .sort((a, b) => a.timestamp - b.timestamp);

        setMetrics({
          timestamps: entries.map(e =>
            new Date(e.timestamp).toLocaleDateString()
          ),
          voltage: entries.map(e => e.voltage),
          current: entries.map(e => e.current),
          power: entries.map(e => e.power)
        });
      })
      .catch(err => {
        console.error('Error fetching weekly metrics:', err);
      });
  }, []);

  return metrics;
}
