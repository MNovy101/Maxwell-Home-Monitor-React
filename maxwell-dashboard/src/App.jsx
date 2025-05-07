// src/App.jsx
import React from 'react';
import KpiGrid from './components/KpiGrid';
import GraphCard from './components/GraphCard';
import useRealtimeMetrics from './hooks/useRealtimeMetrics';
import useWeeklyMetrics from './hooks/useWeeklyMetrics';
import MainIcon from './assets/icons/MainIcon.svg';
import './App.css';

export default function App() {
  const { power, voltage, current } = useRealtimeMetrics();
  const weeklyMetrics = useWeeklyMetrics('/energy_data');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          <img src={MainIcon} alt="Maxwell Logo" className="app-title-icon" />
          Maxwell Home Energy Dashboard
        </h1>
        <p className="app-subtitle">
          Real-time monitoring of household energy metrics
        </p>
      </header>

      <section className="section">
      <h2 className="section-title">Monthly Measurements</h2>
        <GraphCard metrics={weeklyMetrics} />
      </section>

      <section className="section">
        <h2 className="section-title">Current Measurements</h2>
        <KpiGrid metrics={{ power, voltage, current }} />
      </section>
    </div>
  );
}
