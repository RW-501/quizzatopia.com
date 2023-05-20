// auth/auth.js

// This file contains the authentication functionality for the login/signup pop-up

// Firebase app configuration
var firebaseConfig = {
  apiKey: "AIzaSyC8PYJV5-E6hIYbElsgb5e7MOS0faCiLM4",
  authDomain: "quizzatopia-bdfc9.firebaseapp.com",
  projectId: "quizzatopia-bdfc9",
  storageBucket: "quizzatopia-bdfc9.appspot.com",
  messagingSenderId: "828105067102",
  appId: "1:828105067102:web:76afb989ed7c03ebb542cf",
  measurementId: "G-J3QK9V5480"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to open the login/signup popup
function openPopup() {
  document.getElementById('loginPopup').style.display = 'block';
}

// Function to close the login/signup popup
function closePopup() {
  document.getElementById('loginPopup').style.display = 'none';
}

// Function to switch between login and signup tabs
function switchTab(tabName) {
  document.getElementById('loginTab').style.display = tabName === 'login' ? 'block' : 'none';
  document.getElementById('signupTab').style.display = tabName === 'signup' ? 'block' : 'none';
}

// Function to handle login form submission
function handleLogin(event) {
  event.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Firebase authentication logic for email/password login
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Retrieve the user information
      var user = userCredential.user;

      // Get the user's display name and email
      var displayName = user.displayName;
      var email = user.email;

      // Perform any additional actions or redirect the user

      // Example: Show a success message and user info
      alert('Email Login successful');
      console.log('User display name:', displayName);
      console.log('User email:', email);
    })
    .catch((error) => {
      // Handle errors during login
      var errorCode = error.code;
      var errorMessage = error.message;
      // Handle the error appropriately
    });
}

// Function to handle signup form submission
function handleSignup(event) {
  event.preventDefault();
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  // Firebase authentication logic for email/password signup
  // Use Firebase Auth API to create a new user with email and password
}

// Function to handle Google sign-in
export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // Retrieve the user information
      const user = result.user;

      // Get the user's display name and email
      const displayName = user.displayName;
      const email = user.email;

      // Perform any additional actions or redirect the user

      // Example: Show a success message and user info
      alert('Google Login successful');
      console.log('User display name:', displayName);
      console.log('User email:', email);
    })
    .catch((error) => {
      // Handle errors during sign-in
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle the error appropriately
    });
};

// Function to handle Facebook sign-in
export const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // Retrieve the user information
      const user = result.user;

      // Get the user's display name and email
      const displayName = user.displayName;
      const email = user.email;

      // Perform any additional actions or redirect the user

      // Example: Show a success message and user info
      alert('Facebook Login successful');
      console.log('User display name:', displayName);
      console.log('User email:', email);
    })
    .catch((error) => {
      // Handle errors during sign-in
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle the error appropriately
    });
};

// Function to initialize the login/signup functionality
function initializeAuth() {
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('signupForm').addEventListener('submit', handleSignup);
}

// Call the initializeAuth function when the window finishes loading
window.onload = initializeAuth;











/*
  <link rel="stylesheet" href="auth/style.css">

<!-- HTML code to display the login/signup pop-up -->
<div id="loginPopup" class="popup">
  <!-- Login and Signup forms go here -->
</div>

<!-- Script tag to link the auth.js file -->
<script src="auth/auth.js"></script>


    openPopup();



<button id="openPopupButton">Open Login/Sign Up</button>

<script>
  document.getElementById('openPopupButton').addEventListener('click', function() {
    openPopup();
  });
</script>


*/



