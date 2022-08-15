import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkhO5DsPMS_BQ0_PFCCTwYTlCtI3q1Pkg",
    authDomain: "react-todo-web-app-firestore.firebaseapp.com",
    projectId: "react-todo-web-app-firestore",
    storageBucket: "react-todo-web-app-firestore.appspot.com",
    messagingSenderId: "810341860619",
    appId: "1:810341860619:web:da1b27c9e0cd1364208e0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);