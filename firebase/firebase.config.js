import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCCkK1ShIuGMnCbCarv1RY6jo5OUNRwMzI",
  authDomain: "ocr-college-project.firebaseapp.com",
  projectId: "ocr-college-project",
  storageBucket: "ocr-college-project.appspot.com",
  messagingSenderId: "903237377827",
  appId: "1:903237377827:web:a26a1ea5fd6de7c0e3f696",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
