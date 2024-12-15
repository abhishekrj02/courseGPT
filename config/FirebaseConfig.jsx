  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "studyai-c4872.firebaseapp.com",
  projectId: "studyai-c4872",
  storageBucket: "studyai-c4872.appspot.com",
  messagingSenderId: "614453073145",
  appId: "1:614453073145:web:5c3e941337bba907ff3e28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);