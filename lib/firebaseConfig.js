import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCgwBNwiiQ--CMh9xSJ4tCWxQOLxo6e45g",
  authDomain: "tmdb-collection.firebaseapp.com",
  projectId: "tmdb-collection",
  storageBucket: "tmdb-collection.firebasestorage.app",
  messagingSenderId: "1046425169737",
  appId: "1:1046425169737:web:c169e21e4b2ee8e8153498",
  measurementId: "G-87KQWP85YB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider }