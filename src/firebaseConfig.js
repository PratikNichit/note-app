// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAn8BiOpF-rQrqEGQEkfWNwiN4L4aja7J4",
  authDomain: "note-app-8d371.firebaseapp.com",
  projectId: "note-app-8d371",
  storageBucket: "note-app-8d371.firebasestorage.app",
  messagingSenderId: "271497942747",
  appId: "1:271497942747:web:5d8bc3cb0405b14789defe",
  measurementId: "G-HTZBT64TB3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
