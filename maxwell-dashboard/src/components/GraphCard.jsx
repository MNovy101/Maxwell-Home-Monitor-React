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
  const { timestamps, voltage, current, power } = metrics;
  const data = timestamps.map((date, i) => ({
    date,
    Voltage: voltage[i],
    Current: current[i],
    Power:   power[i]
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
          <Line type="monotone" dataKey="Voltage" stroke="#8884d8" />
          <Line type="monotone" dataKey="Current" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Power"   stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}