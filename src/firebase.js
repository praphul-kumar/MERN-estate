// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-dc00a.firebaseapp.com",
  projectId: "mern-estate-dc00a",
  storageBucket: "mern-estate-dc00a.appspot.com",
  messagingSenderId: "446937649072",
  appId: "1:446937649072:web:06600162cdbd5dad7c9075"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);