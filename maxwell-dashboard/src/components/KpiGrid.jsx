// src/components/KpiGrid.jsx
import React from 'react';
import KpiCard from './KpiCard';
import useRealtimeMetrics from '../hooks/useRealtimeMetrics';
import PowerIcon from '../assets/icons/power.svg';
import VoltageIcon from '../assets/icons/voltage.svg';
import CurrentIcon from '../assets/icons/current.svg';
import styles from './KpiGrid.module.css';

export default function Dashboard() {
  const { power, voltage, current } = useRealtimeMetrics();

  return (
    <div className={styles.grid}>
      <KpiCard
        title="Power"
        value={power.toFixed(2)}
        unit="W"
        icon={<PowerIcon />}
      />
      <KpiCard
        title="Voltage"
        value={voltage.toFixed(2)}
        unit="V"
        icon={<VoltageIcon />}
      />
      <KpiCard
        title="Current"
        value={current.toFixed(2)}
        unit="A"
        icon={<CurrentIcon />}
      />
    </div>
  );
}
