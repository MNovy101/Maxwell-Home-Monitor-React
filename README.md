# Maxwell Home Monitor React

A lightning-fast, responsive web dashboard built with **React** and **Vite** for visualizing real-time and historical home energy data. It connects to a **Firebase Realtime Database**, streaming voltage, current, and power readings from an ESP32-based sensor node.

---

## 🚀 Features

- **Live Charts**: Real-time line graphs for voltage, current, and power  
- **Weekly Trends**: Seven-day historical view, dynamically filtered in the `useWeeklyMetrics` hook  
- **Over-Threshold Alerts**: Table of readings where current exceeds a configurable threshold (default 7.5 A) via `OverThresholdList.jsx`  
- **Accessible Tabs**: ARIA-compliant `<Tabs>` component for switching between “Recent Data” and “Alerts”  
- **Modular Hooks**: `useRealtimeMetrics`, `useWeeklyMetrics`, and `useCumulativeMetrics` encapsulate data fetching and filtering logic  
- **Secure & Indexed**: Firebase rules with `.indexOn` for `timestamp` and `current` enable server-side filtering and performant queries  

---

## 📋 Table of Contents

1. [Prerequisites](#-prerequisites)  
2. [Installation](#-installation)  
3. [Configuration](#-configuration)  
4. [Running Locally](#-running-locally)
5. [Project Structure](#-project-structure)  
6. [Key Components & Hooks](#-key-components--hooks)
   
---

## 🔧 Prerequisites

- **Node.js** v16+ (includes npm)  
- **Vite** (bundled via devDependencies)  
- Access to the **Firebase** project with Realtime Database enabled  
  - Data under `/energy_data/{timestamp}` in format `{ voltage, current, power }`  
  - Security rules indexed on `timestamp` and `current`  

---

## ⚙️ Installation

```bash
# 1. Clone
git clone https://github.com/MNovy101/Maxwell-Home-Monitor-React.git
cd Maxwell-Home-Monitor-React

# 2. Install dependencies
npm install
````

---

## 🛠 Configuration

1. Copy and rename the example environment file:

   ```bash
   cp .env.example .env.local
   ```
2. Populate `.env.local` with your Firebase credentials:

   ```ini
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_DATABASE_URL=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
3. Ensure `.env.local` is git-ignored to keep secrets safe.

---

## ▶️ Running Locally

Start the development server:

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
Maxwell-Home-Monitor-React/
├─ public/                         # static assets (index.html)
├─ src/
│  ├─ assets/                      # icons, images
│  ├─ components/
│  │  ├─ GraphView.jsx             # historical & live charts
│  │  ├─ OverThresholdList.jsx     # high-current alerts table
│  │  ├─ Tabs.jsx                  # tab container
│  │  └─ GraphCard.jsx             # reusable chart wrapper
│  ├─ hooks/
│  │  ├─ useRealtimeMetrics.js     # live data listener
│  │  ├─ useWeeklyMetrics.js       # 7-day filter hook
│  │  └─ useCumulativeMetrics.js   # full-range data hook
│  ├─ firebase.js                  # Firebase init
│  ├─ App.jsx                      # main layout and tabs
│  └─ main.jsx                     # entry point
├─ tests/                          # Vitest & RTDB rules tests TBD
├─ .env.example                    # example environment variables
├─ database.rules.json             # Firebase Realtime Database rules
├─ package.json                    # scripts & dependencies
├─ vite.config.js                  # Vite configuration
└─ README.md                       # this page =)
```

---

## 🧩 Key Components & Hooks

### `App.jsx`

Sets up the **sticky header**, **Tabs**, and placeholder sections for live charts, weekly trends, and alerts.

### `GraphView.jsx`

* Fetches all `/energy_data` entries via `orderByKey()`
* Parses and sorts by `entry.timestamp`
* Renders a historical `<table>` and a `<GraphCard>` chart for weekly metrics

### `OverThresholdList.jsx`

* Queries `/energy_data` with `orderByChild('current')` & `startAt(threshold)`
* Filters and displays readings exceeding the threshold in a semantic table

### Hooks

* **`useRealtimeMetrics`**: continuous listener for latest `voltage`, `current`, `power`
* **`useWeeklyMetrics`**: filters data within the past 7 days
* **`useCumulativeMetrics`**: retrieves full-range historical data

---
