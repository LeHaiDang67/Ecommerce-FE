// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAq2rqCX-NKlU2_uBdVL2C63tg1vz9hVcQ",
    authDomain: "authentication-f10b9.firebaseapp.com",
    projectId: "authentication-f10b9",
    storageBucket: "authentication-f10b9.appspot.com",
    messagingSenderId: "1035556674625",
    appId: "1:1035556674625:web:946d31f19861ead8d8fac0",
    measurementId: "G-G7EZ0Q65PP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);