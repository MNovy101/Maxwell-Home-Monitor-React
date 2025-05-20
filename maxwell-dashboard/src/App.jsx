// src/App.jsx
import React, { useState } from 'react';
import MainIcon from './assets/icons/MainIcon.svg';
import './App.css';
import GraphView from './components/GraphView';
import OverThresholdList from './components/OverThresholdList';

export default function App() {
  const [activeTab, setActiveTab] = useState('graphs');

  return (
    <div>
  <header className="app-header">
    <h1 className="app-title">
      <img src={MainIcon} alt="Maxwell Logo" className="app-title-icon" />
      Maxwell Home Energy Dashboard
    </h1>
    <p className="app-subtitle">
      Real-time monitoring of household energy metrics
    </p>

    <section className="buttons-section">
       <div className="tab-buttons">
         <button
            className={activeTab === 'graphs' ? 'active-tab' : ''}
           onClick={() => setActiveTab('graphs')}
          >
          Recent Data
        </button>
        <button
           className={activeTab === 'list' ? 'active-tab' : ''}
          onClick={() => setActiveTab('list')}
          >
          Alerts
        </button>
       </div>
    </section>
  </header>
    <section className="tabs-section">
     <div className="tab-content">
      {activeTab === 'graphs' && <GraphView />}
      {activeTab === 'list' && <OverThresholdList />}
      </div>
    </section>
    </div>
  );
}
