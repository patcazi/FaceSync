// src/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDaHkzMFW_0bQ9WsGzTJw2oOYUCFGfmgQA",
  authDomain: "facesync-24817.firebaseapp.com",
  projectId: "facesync-24817",
  storageBucket: "facesync-24817.firebasestorage.app",
  messagingSenderId: "1095267012998",
  appId: "1:1095267012998:web:1b04ec9de8af3fa7025c07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services for use in your application
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);