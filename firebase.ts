// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk3Q3EZ3COsbPJztLT94H3jGVWCrCnLp4",
  authDomain: "escombro-f1b2f.firebaseapp.com",
  projectId: "escombro-f1b2f",
  storageBucket: "escombro-f1b2f.firebasestorage.app",
  messagingSenderId: "330822541707",
  appId: "1:330822541707:web:79a34e7d645474b8d84f8e",
  measurementId: "G-R4Y2QEEM68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);