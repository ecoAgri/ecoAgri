import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbdqfn0Xc0tjlsicoPzTbnCzRmakq4Ddw",
  authDomain: "echoagri-84301.firebaseapp.com",
  projectId: "echoagri-84301",
  storageBucket: "echoagri-84301.appspot.com",
  messagingSenderId: "63733488939",
  appId: "1:63733488939:web:64e4e4ee1816be79cab96e",
  measurementId: "G-DCZTSQJNM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);