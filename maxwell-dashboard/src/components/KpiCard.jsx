// src/components/KpiCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './KpiCard.module.css';

export default function KpiCard({ title, value, unit, icon }) {
  return (
    <div className={styles.card}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.value}>
          {value} <span className={styles.unit}>{unit}</span>
        </p>
      </div>
    </div>
  );
}

KpiCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  unit: PropTypes.string,
  icon: PropTypes.node,
};

KpiCard.defaultProps = {
  unit: '',
  icon: null,
};
