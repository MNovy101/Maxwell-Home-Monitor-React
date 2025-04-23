// Import the functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBL9TMABrAFQDSf8kVA79DzjcT8HcmhXBc",
    authDomain: "maxwell-home-power-monitor.firebaseapp.com",
    databaseURL: "https://maxwell-home-power-monitor-default-rtdb.firebaseio.com",
    projectId: "maxwell-home-power-monitor",
    storageBucket: "maxwell-home-power-monitor.firebasestorage.app",
    messagingSenderId: "989558132534",
    appId: "1:989558132534:web:003e302bb56aebee436d97",
    measurementId: "G-M2ZP078KJE"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
