// src/components/GraphCard.jsx
import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import styles from './GraphCard.module.css';

export default function GraphCard({ metrics }) {
  const { timestamps, current } = metrics;

  // Combine into data points
  const data = timestamps.map((date, i) => ({
    date,
    Current: current[i]
  }));

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Line type="monotone" dataKey="Current" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
