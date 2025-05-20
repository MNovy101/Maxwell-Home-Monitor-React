// src/components/OverThresholdList.jsx
import React, { useState, useEffect } from 'react';
import {
  ref,
  onValue,
  query,
  orderByChild,
  startAt
} from 'firebase/database';
import { database } from '../firebase';
import './OverThresholdList.css';
import GraphCard from './GraphCard';
import UseCumalativeMetrics from '../hooks/UseCumalativeMetrics';

const THRESHOLD = 5.0;

export default function OverThresholdList() {
  const [readings, setReadings] = useState([]);
  const [error, setError] = useState(null);
  const allMetrics = UseCumalativeMetrics('/energy_data');

  useEffect(() => {
    const readingsRef = ref(database, 'readings/current');
    const overThresholdQuery = query(
      readingsRef,
      orderByChild('value'),
      startAt(THRESHOLD)
    );

    const unsubscribe = onValue(
      overThresholdQuery,
      snapshot => {
        const data = snapshot.val() || {};
        const list = Object.entries(data).map(([id, entry]) => ({
          id,
          value: entry.value,
          timestamp: entry.timestamp
        }));
        list.sort((a, b) => b.timestamp - a.timestamp);
        setReadings(list);
      },
      err => {
        console.error('Firebase read error:', err);
        setError('Could not fetch readings');
      }
    );

    return () => unsubscribe();
  }, []);

  if (error) {
    return (
      <div className="over-threshold-container">
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="over-threshold-container">
      <section className="graph-section">
         <h2 className="section-title">Previous Week</h2>
        <GraphCard metrics={allMetrics} />
      </section>
     
      <h2>Readings Above {THRESHOLD}</h2>

      {readings.length === 0 ? (
        <p className="no-readings">No readings exceed the threshold.</p>
      ) : (
        <ul className="readings-list">
          {readings.map(({ id, value, timestamp }) => (
            <li key={id} className="reading-item">
              <span className="reading-value">
                {value.toFixed(2)}
              </span>
              <span className="reading-time">
                {new Date(timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
