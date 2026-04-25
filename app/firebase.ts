// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu9Sl3gslogdUsMQ4CYq77k4HNru_zaoI",
  authDomain: "simulador-inventario-1cdec.firebaseapp.com",
  projectId: "simulador-inventario-1cdec",
  storageBucket: "simulador-inventario-1cdec.firebasestorage.app",
  messagingSenderId: "973248145072",
  appId: "1:973248145072:web:d5ae74980fac4fca183d75",
  measurementId: "G-Y1L1NFQMJT"
};

// Inicializa Firebase (evita duplicados)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { db };

