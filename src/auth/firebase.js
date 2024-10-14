// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZaWUSugvyq-5ZnzsiOdDw347AP0r6HyI",
  authDomain: "sinusoidcms-2024.firebaseapp.com",
  projectId: "sinusoidcms-2024",
  storageBucket: "sinusoidcms-2024.appspot.com",
  messagingSenderId: "844535693028",
  appId: "1:844535693028:web:075817955ba45f8199f6f1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
