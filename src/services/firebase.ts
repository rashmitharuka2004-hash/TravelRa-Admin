import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Data copied directly from your Firebase Console screenshot
const firebaseConfig = {
  apiKey: "AIzaSyCTVDBd0LttXtNgBrRjgQ-MdGPDWgedXpo",
  authDomain: "travelraapp.firebaseapp.com",
  projectId: "travelraapp",
  storageBucket: "travelraapp.firebasestorage.app",
  messagingSenderId: "156208406455",
  appId: "1:156208406455:web:2d27a25c1c466ab8c01232"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);