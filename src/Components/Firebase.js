// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKeJuWy_gj5v8XwcXu58n9EogJTWKq2Gc",
    authDomain: "todo-react-web-app-firestore.firebaseapp.com",
    projectId: "todo-react-web-app-firestore",
    storageBucket: "todo-react-web-app-firestore.appspot.com",
    messagingSenderId: "752127882052",
    appId: "1:752127882052:web:07e9f60eef88807a879d11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);