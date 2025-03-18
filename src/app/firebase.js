// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for Firebase Authentication
import { getAnalytics } from "firebase/analytics"; // Import getAnalytics for Firebase Analytics
import { getFirestore } from "firebase/firestore"; // Import Firestore


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnbM8uIfbaDW-bH-1n1iU9GfkaG__Oo5k",
  authDomain: "xmtrade-fe53e.firebaseapp.com",
  projectId: "xmtrade-fe53e",
  storageBucket: "xmtrade-fe53e.firebasestorage.app",
  messagingSenderId: "501838768910",
  appId: "1:501838768910:web:70d893644d2f25f963455f",
  measurementId: "G-TSJ4656FF2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Analytics only in the browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const db = getFirestore(app); // Initialize Firestore

export { db }; // Export Firestore

// Export auth and analytics
export { auth, analytics };