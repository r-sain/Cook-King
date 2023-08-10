// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdWnP89wJGxYqfQvISHjvQWEEYwPkgXeQ",
  authDomain: "recipe-app-ffc3b.firebaseapp.com",
  projectId: "recipe-app-ffc3b",
  storageBucket: "recipe-app-ffc3b.appspot.com",
  messagingSenderId: "624901917378",
  appId: "1:624901917378:web:530b879ed0b7466068895b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
