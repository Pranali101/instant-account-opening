import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCcBVEQIYzmRNxnmbquTpLBgheZFIJGkSM",
  authDomain: "instant-account-opening.firebaseapp.com",
  projectId: "instant-account-opening",
  storageBucket: "instant-account-opening.appspot.com",
  messagingSenderId: "791083435177",
  appId: "1:791083435177:web:9444bff74334fc40d5d5b8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
