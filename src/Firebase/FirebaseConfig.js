// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { Firestore, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'



const firebaseConfig = {
  apiKey: "AIzaSyA9EKKprYMJa5hGHjVOUJEZno4c_xGvMMs",
  authDomain: "foodapp-6fb8f.firebaseapp.com",
  projectId: "foodapp-6fb8f",
  storageBucket: "foodapp-6fb8f.appspot.com",
  messagingSenderId: "404956137673",
  appId: "1:404956137673:web:ae8c6604592e04ac8e2518"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const storage = getStorage(app);

export {db, storage}