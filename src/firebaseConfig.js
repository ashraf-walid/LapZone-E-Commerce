import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE84Vt-VXGYUsivUOoG5Qr3d_IYKpSXmY",
  authDomain: "lapzone-e-commerce.firebaseapp.com",
  projectId: "lapzone-e-commerce",
  storageBucket: "lapzone-e-commerce.appspot.com",
  messagingSenderId: "1029594646103",
  appId: "1:1029594646103:web:1f7c673326d09ea7dd4512",
  measurementId: "G-650JJV6T2Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

