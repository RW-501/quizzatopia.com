// auth.js

import firebase from './app.js';

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

// Function to handle signup form submission
export function createUserWithEmailAndPassword(email, password) {
  // Your authentication logic here
  // This function should handle the process of creating a new user with the provided email and password

  // For example, using Firebase Authentication:
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User creation successful, return the user object
      return userCredential.user;
    })
    .catch((error) => {
      // Handle any errors that occurred during user creation
      throw error;
    });
}

// Rest of the code...
