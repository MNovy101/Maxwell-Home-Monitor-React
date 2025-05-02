// src/components/GraphCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import useWeeklyMetrics from '../hooks/useWeeklyMetrics';
import styles from './KpiCard.module.css';

export default function GraphCard({ title, dataPath, color }) {
  const chartData = useWeeklyMetrics(dataPath);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(val) => val.toFixed(2)} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2} 
            dot={{ r: 3 }} 
            activeDot={{ r: 5 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

GraphCard.propTypes = {
  title: PropTypes.string.isRequired,
  dataPath: PropTypes.string.isRequired,
  color: PropTypes.string
};

GraphCard.defaultProps = {
  color: '#8884d8'
};
