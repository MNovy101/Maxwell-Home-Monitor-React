import React from 'react';
import KpiGrid from './components/KpiGrid';
import useRealtimeMetrics from './hooks/useRealtimeMetrics';
import GraphCard from './components/GraphCard';
import MainIcon from './assets/icons/MainIcon.svg';

export default function App() {
  // Pull live metrics from Firebase
  const { power, voltage, current } = useRealtimeMetrics();

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#324643' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img 
          src={MainIcon} 
          alt="Maxwell Logo" 
          style={{ width: '50px', height: '50px' }} 
        />
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fdfcf8', margin: 0 }}>
          Maxwell Home Energy Dashboard
        </h1>

      </header>
      <h2 style={{ fontSize: '1rem', color: '#fdfcf8' }}>

Real-time monitoring of household energy metrics
</h2>
      <p style={{ color: '#fdfcf8' }}>
           
           Previous Week
        </p>
      <GraphCard metrics={{ power, voltage, current }} />
      <p style={{ color: '#fdfcf8' }}>
           
           Current Measurements
        </p>
      <KpiGrid metrics={{  power, voltage, current }} />
    </div>
  );
}
