// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC20lMw8PlqoUAyXuEgb0f7znIx3i2OcYA",
  authDomain: "augmentedrealitywardrobe.firebaseapp.com",
  projectId: "augmentedrealitywardrobe",
  storageBucket: "augmentedrealitywardrobe.appspot.com",
  messagingSenderId: "755827731259",
  appId: "1:755827731259:web:54841180f70dae0b90a51e",
  measurementId: "G-2NX71NDRQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

