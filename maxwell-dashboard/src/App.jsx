import React from 'react';
import KpiGrid from './components/KpiGrid';
import useRealtimeMetrics from './hooks/useRealtimeMetrics';

export default function App() {
  const { power, voltage, current } = useRealtimeMetrics();

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Maxwell Home Energy Dashboard
        </h1>
        <p style={{ color: '#666' }}>
          Real-time monitoring of household energy metrics
        </p>
      </header>

      <KpiGrid metrics={{ power, voltage, current }} />

      {/* Future components: LiveChart, HistoryPanel, AlertsPanel, etc. */}
    </div>
  );
}
