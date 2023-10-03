// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbuNF9-BWiAi6rFTx86S35Ao6NA9h7dGk",
  authDomain: "gptflix-ba27a.firebaseapp.com",
  projectId: "gptflix-ba27a",
  storageBucket: "gptflix-ba27a.appspot.com",
  messagingSenderId: "868508614169",
  appId: "1:868508614169:web:737b0735ee43f9519cb488",
  measurementId: "G-XMDLS20H93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();