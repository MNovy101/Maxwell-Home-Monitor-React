// src/components/GraphView.jsx
import { useState, useEffect } from 'react';
import { ref, onValue, onChildAdded } from 'firebase/database';
import { database } from '../firebase';
import KpiGrid from './KpiGrid';
import GraphCard from './GraphCard';
import useWeeklyMetrics from '../hooks/useWeeklyMetrics';
import useRealtimeMetrics from '../hooks/useRealtimeMetrics';
import './GraphView.module.css';

export default function GraphView() {
  const [dataPoints, setDataPoints] = useState([]);
  const { power, voltage, current } = useRealtimeMetrics();
  const weeklyMetrics = useWeeklyMetrics('/energy_data');

  useEffect(() => {
    const dataRef = ref(database, 'energy_data/voltage');

    const unsubscribeFull = onValue(dataRef, (snapshot) => {
      const raw = snapshot.val() || {};
      const formatted = Object.entries(raw).map(([key, { value, timestamp }]) => ({
        id: key,
        value,
        timestamp,
      }));
      formatted.sort((a, b) => a.timestamp - b.timestamp);
      setDataPoints(formatted);
    });

    const unsubscribeChild = onChildAdded(dataRef, (snapshot) => {
      const { value, timestamp } = snapshot.val();
      setDataPoints((prev) => {
        const next = [...prev, { id: snapshot.key, value, timestamp }];
        next.sort((a, b) => a.timestamp - b.timestamp);
        return next;
      });
    });

    return () => {
      unsubscribeFull();
      unsubscribeChild();
    };
  }, []);

  return (
    <div className="graph-view-container">
      <section className="section">
        <h2 className="section-title">Previous Week</h2>
        <GraphCard metrics={weeklyMetrics} />
      </section>

      <section className="section">
        <h2 className="section-title">Latest Measurements</h2>
        <KpiGrid metrics={{ voltage, current, power }} />
      </section>
    </div>
  );
}
