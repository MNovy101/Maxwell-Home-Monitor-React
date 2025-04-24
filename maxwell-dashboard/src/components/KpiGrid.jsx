// src/components/KpiGrid.jsx
import React from 'react';
import KpiCard from './KpiCard';
import PowerIcon from '../assets/icons/power.svg?react';
import VoltageIcon from '../assets/icons/voltage.svg?react';
import CurrentIcon from '../assets/icons/current.svg?react';
import styles from './KpiGrid.module.css';

export default function KpiGrid({ metrics }) {
  return (
    <div className={styles.grid}>
      <KpiCard
        title="Power"
        value={metrics.power.toFixed(1)}
        unit="W"
        icon={<PowerIcon />}
      />
      <KpiCard
        title="Voltage"
        value={metrics.voltage.toFixed(1)}
        unit="V"
        icon={<VoltageIcon />}
      />
      <KpiCard
        title="Current"
        value={metrics.current.toFixed(2)}
        unit="A"
        icon={<CurrentIcon />}
      />
    </div>
  );
}
