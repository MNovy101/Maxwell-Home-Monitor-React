// src/components/KpiGrid.jsx
import KpiCard from './KpiCard';
import useRealtimeMetrics from '../hooks/useRealtimeMetrics';
import CurrentIcon from '../assets/icons/current.svg';
import PowerIcon from '../assets/icons/power.svg';
import styles from './KpiGrid.module.css';

export default function Dashboard() {
  const { power, current } = useRealtimeMetrics();

  return (
    <div className={styles.grid}>
      <KpiCard
        title="Current"
        value={current.toFixed(2)}
        unit="A"
        icon={<CurrentIcon />}
      />
      <KpiCard
        title="Power"
        value={power.toFixed(2)}
        unit="W"
        icon={<PowerIcon />}
      />
    </div>
  );
}
