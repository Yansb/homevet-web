import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMRHCot9TLjU0rhDiCH3guzFJzpxSFlJU",
  authDomain: "homevet-8ffbc.firebaseapp.com",
  projectId: "homevet-8ffbc",
  storageBucket: "homevet-8ffbc.firebasestorage.app",
  messagingSenderId: "870121260027",
  appId: "1:870121260027:web:b187cd212a8de83ef0c15e",
  measurementId: "G-YKKQ0F94HD",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export { auth, firebaseApp };
