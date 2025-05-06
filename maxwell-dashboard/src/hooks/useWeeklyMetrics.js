// src/hooks/useWeeklyMetrics.js
import { useState, useEffect } from 'react';
import { database } from '../firebase';
import {
  ref,
  query,
  orderByKey,
  limitToLast,
  get
} from 'firebase/database';

export default function useWeeklyMetrics(path) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const weekQuery = query(
          ref(database, path),
          orderByKey(),
          limitToLast(7)
        );
        const snapshot = await get(weekQuery);
        if (snapshot.exists()) {
          const raw = snapshot.val();
          const chartData = Object.entries(raw).map(([ts, vals]) => ({
            date: new Date(+ts).toLocaleDateString(),
            value: vals[path.split('/').pop()]
          }));
          setData(chartData);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error('Error fetching weekly metrics:', err);
        setData([]);
      }
    }

    if (path) {
      fetchData();
    }
  }, [path]);

  return data;
}
