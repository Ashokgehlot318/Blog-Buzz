// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "blog-buzz-e92c5.firebaseapp.com",
  projectId: "blog-buzz-e92c5",
  storageBucket: "blog-buzz-e92c5.appspot.com",
  messagingSenderId: "1086822867492",
  appId: "1:1086822867492:web:e87849135df7e5ca40aeb1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);