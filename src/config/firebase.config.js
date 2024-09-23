// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkt5jFB6nRXSyuZFAsOdcKc02EvTzv_sw",
  authDomain: "portfolio-react-dedicated.firebaseapp.com",
  projectId: "portfolio-react-dedicated",
  storageBucket: "portfolio-react-dedicated.appspot.com",
  messagingSenderId: "26708411493",
  appId: "1:26708411493:web:a62cd9618c83b841d3b28c",
  measurementId: "G-V8NLN6D17X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const db = getFirestore(app)
export const itemColRef = collection(db, 'PortfolioItems')
export const storage = getStorage(app)
