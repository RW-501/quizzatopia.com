// app.js

import { initializeApp } from 'firebase/app';
//import { signInWithGoogle, signInWithFacebook, createUserWithEmailAndPassword } from '/auth/auth.js';

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyC8PYJV5-E6hIYbElsgb5e7MOS0faCiLM4",
  authDomain: "quizzatopia-bdfc9.firebaseapp.com",
  projectId: "quizzatopia-bdfc9",
  storageBucket: "quizzatopia-bdfc9.appspot.com",
  messagingSenderId: "828105067102",
  appId: "1:828105067102:web:76afb989ed7c03ebb542cf",
  measurementId: "G-J3QK9V5480"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
