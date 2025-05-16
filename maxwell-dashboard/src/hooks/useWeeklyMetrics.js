// src/hooks/useWeeklyMetrics.js
import { useState, useEffect } from 'react';
import { database } from '../firebase';
import {
  ref,
  query,
  orderByChild,
  limitToLast,
  get
} from 'firebase/database';

export default function useWeeklyMetrics() {
  const [metrics, setMetrics] = useState({
    timestamps: [],
    current: []
  });

  useEffect(() => {
    const weekQuery = query(
      ref(database, 'energy_data'),
      orderByChild('timestamp'),
      limitToLast(7)
    );

    get(weekQuery).then(snapshot => {
      if (!snapshot.exists()) return;
      const raw = snapshot.val();

      const entries = Object.values(raw)
        .sort((a, b) => a.timestamp - b.timestamp);

      const timestamps = entries.map(e =>
        new Date(e.timestamp).toLocaleDateString()
      );
      const current = entries.map(e => e.current);

      setMetrics({ timestamps, current });
    })
    .catch(console.error);
  }, []);

  return metrics;
}
