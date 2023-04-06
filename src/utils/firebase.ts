// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxHLjq3KiTTGUOdvSOmP5k_gLVfbU1GNs",
  authDomain: "vidvat-ea464.firebaseapp.com",
  projectId: "vidvat-ea464",
  storageBucket: "vidvat-ea464.appspot.com",
  messagingSenderId: "794106243135",
  appId: "1:794106243135:web:655781bb76001b7963308a",
  measurementId: "G-EZ2SS8FGJV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firestore = getFirestore(app);
