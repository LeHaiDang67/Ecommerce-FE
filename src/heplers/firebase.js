// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN_FIREBASE,
    projectId: process.env.REACT_APP_PROJECT_ID_FIREBASE,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET_FIREBASE,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_FIREBASE,
    appId: process.env.REACT_APP_APP_ID_FIREBASE,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID_FIREBASE
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);