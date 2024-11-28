import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Import the functions you need from the SDKs you need
export const firebaseConfig = {
  apiKey: "AIzaSyCfZP0BxwmTphqu8EyuaxGBCtfmp13ayRE",
  authDomain: "albuquerque-tattoo.firebaseapp.com",
  projectId: "albuquerque-tattoo",
  storageBucket: "albuquerque-tattoo.firebasestorage.app",
  messagingSenderId: "541620912191",
  appId: "1:541620912191:web:fff47a8ba52a846d7c388a",
  measurementId: "G-RL1CB6W099"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);