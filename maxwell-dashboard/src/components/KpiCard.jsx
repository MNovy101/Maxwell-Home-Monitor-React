// src/components/KpiCard.jsx
import PropTypes from 'prop-types';
import styles from './KpiCard.module.css';

export default function KpiCard({ title, value, unit, Icon }) {
  return (
    <div className={styles.card}>
        {Icon && (
          <div className={styles.Icon}>
           <Icon className={styles.svgIcon} />
         </div>
       )}
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
  Icon: PropTypes.elementType,
};

KpiCard.defaultProps = {
  unit: '',
  Icon: null, 
};