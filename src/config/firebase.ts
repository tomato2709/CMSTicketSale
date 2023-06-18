import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCusF0oaqSWFKM8MdjGjKX8ypmV5mxMob0",
  authDomain: "cms-ticket-a496f.firebaseapp.com",
  projectId: "cms-ticket-a496f",
  storageBucket: "cms-ticket-a496f.appspot.com",
  messagingSenderId: "13960928633",
  appId: "1:13960928633:web:69c6bbe8154e3baf46a3a8",
  measurementId: "G-TQV4HX25ZW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);