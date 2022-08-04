// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAlctz-nWRGyB3E94GuItO50DKZ-qNMW-I",
    authDomain: "react-todo-web-app-firebase.firebaseapp.com",
    projectId: "react-todo-web-app-firebase",
    storageBucket: "react-todo-web-app-firebase.appspot.com",
    messagingSenderId: "663965471013",
    appId: "1:663965471013:web:579fbe3a6c9fd9a99f4acc",
    measurementId: "G-XWF2HX29R6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);