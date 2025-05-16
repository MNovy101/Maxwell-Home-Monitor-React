// src/components/KpiGrid.jsx
import React from 'react';
import KpiCard from './KpiCard';
import useRealtimeMetrics from '../hooks/useRealtimeMetrics';
import CurrentIcon from '../assets/icons/current.svg';
import styles from './KpiGrid.module.css';

export default function Dashboard() {
  const { current } = useRealtimeMetrics();

  return (
    <div className={styles.grid}>
      <KpiCard
        title="Current"
        value={current.toFixed(2)}
        unit="A"
        icon={<CurrentIcon />}
      />
    </div>
  );
}
