// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// importing getAuth
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDEp1PYzKmwoXO7LF1uRjMj6T6RNyJxXnM",
  authDomain: "rotten-tomatoes-clone.firebaseapp.com",
  projectId: "rotten-tomatoes-clone",
  storageBucket: "rotten-tomatoes-clone.appspot.com",
  messagingSenderId: "584811947095",
  appId: "1:584811947095:web:9e655ad397fec440d5ef12",
  measurementId: "G-JBR4598972",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initializing db
const db = getFirestore(app);

// initializing auth
const auth = getAuth(app);

// exporting db and auth
export { db, auth };

// exporting the app
export default app;
