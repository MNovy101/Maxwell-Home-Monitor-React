# Maxwell Home Monitor React

A React + Vite web dashboard for the Maxwell Home Energy Monitor system. Visualize live and historical energy usage data streamed from Firebase Realtime Database.

---

## Table of Contents

1. Features
2. Prerequisites
3. Installation
4. Configuration
5. Running Locally
6. Building for Production
7. Testing
8. Project Structure
9. Contributing
10. License

---

## Features

* Live Charts: Real-time voltage, current, and power graphs
* Usage History: Daily, weekly, and monthly trends
* Alert Panel: High-usage alerts streamed from Firebase
* Responsive Layout: Mobile and desktop ready
* Secure Access: Firebase rules ensure users see only their data

---

## Prerequisites

* Node.js v16 or later (includes npm)
* Vite (installed via `npm install`)
* A Firebase project with Realtime Database enabled and security rules deployed
* Data being written to the `/energy_data` and `/alerts` paths in your Firebase Realtime Database

---

## Installation

1. Clone the repository

```bash
git clone https://github.com/MNovy101/Maxwell-Home-Monitor-React.git
cd Maxwell-Home-Monitor-React
```

2. Install dependencies

```bash
npm install
```

---

## Configuration

1. Copy the example environment file and rename it:

```bash
cp .env.example .env.local
```

2. Open `.env.local` in your text editor and replace its contents with:

```
VITE_FIREBASE_API_KEY=<YOUR_API_KEY>
VITE_FIREBASE_AUTH_DOMAIN=maxwell-home-power-monitor.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://maxwell-home-power-monitor-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=maxwell-home-power-monitor
VITE_FIREBASE_STORAGE_BUCKET=maxwell-home-power-monitor.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=989558132534
VITE_FIREBASE_APP_ID=1:989558132534:web:003e302bb56aebee436d97
VITE_FIREBASE_MEASUREMENT_ID=G-M2ZP078KJE
```

> **Important:**
>
> * Never commit `.env.local` (contains secrets).
> * Ensure `.env.local` is listed in `.gitignore`.

3. If you need to adjust database rules, edit `database.rules.json` and then deploy:

```bash
firebase deploy --only database
```

---

## Running Locally

Start the development server:

```bash
npm run dev
```

Open in your browser to view the dashboard.

---

## Building for Production

1. Build optimized assets:

```bash
npm run build
```

2. Preview the production build locally:

```bash
npm run serve
```

---

## Testing

This project uses Vitest for unit/component tests and @firebase/rules-unit-testing for security-rules validation.

* Run unit tests:

```bash
npm test
```

* Run Realtime Database rules tests (launches emulator automatically):

```bash
npm run test:rtdb
```

---

## Project Structure

```
Maxwell-Home-Monitor-React/
├── public/                  # Static assets (index.html)
├── src/                     # Source code
│   ├── App.jsx              # Main React component
│   ├── firebase.js          # Firebase initialization
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   └── main.jsx             # App entry point
├── tests/                   # Test suites
│   ├── App.test.jsx         # Vitest component tests
│   └── security.rules.test.spec.jsx  # Security rules tests
├── .env.example             # Environment variables example
├── database.rules.json      # Firebase Realtime Database rules
├── package.json             # NPM dependencies & scripts
├── vite.config.js           # Vite configuration
└── README.md                # Project documentation
```

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/xyz`).
3. Make your changes and add tests.
4. Commit with clear messages.
5. Push and open a pull request.

---

## License

This project is licensed under the MIT License. See `LICENSE` for details.
