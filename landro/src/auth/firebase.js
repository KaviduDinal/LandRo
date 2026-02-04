import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNe70WLGnFX64yZprj9FqMOMqHmn0ziY8",
  authDomain: "landro-a3754.firebaseapp.com",
  projectId: "landro-a3754",
  storageBucket: "landro-a3754.firebasestorage.app",
  messagingSenderId: "69028002139",
  appId: "1:69028002139:web:8d3fd6d7f2b22365c6427e",
  measurementId: "G-6EPCHES405"
};
console.log(import.meta.env.VITE_FIREBASE_API_KEY);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
