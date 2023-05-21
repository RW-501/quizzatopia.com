// auth.js
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


// Function to handle Google sign-in
export function signInWithGoogle() {
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
      const firebaseId = user.uid;

      // Perform any additional actions or redirect the user

      // Example: Show a success message and user info
      alert('Google Login successful');
      console.log('User display name:', displayName);
      console.log('User email:', email);
         console.log('Firebase ID:', firebaseId);
    })
    .catch((error) => {
      // Handle errors during sign-in
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle the error appropriately
    });
}

// Function to handle Facebook sign-in
export function signInWithFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // Retrieve the user information
      const user = result.user;

      // Get the user's display name and email
      const displayName = user.displayName;
      const firebaseId = user.uid;
      const email = user.email;

      // Perform any additional actions or redirect the user

      // Example: Show a success message and user info
      alert('Facebook Login successful');
      console.log('User display name:', displayName);
      console.log('Firebase ID:', firebaseId);
          console.log('User email:', email);

    })
    .catch((error) => {
      // Handle errors during sign-in
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle the error appropriately
    });
}

// Function to handle the signup form submission
export function createUserWithEmailAndPassword() {
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User creation successful, return the user object
      const user = userCredential.user;

      // Get the user's display name and Firebase ID
      const displayName = user.displayName;
      const firebaseId = user.uid;

      // Example: Show a success message and user info
      alert('Signup successful');
      console.log('Username:', username);
      console.log('User email:', email);
      console.log('Firebase ID:', firebaseId);

      return user;
    })
    .catch((error) => {
      // Handle any errors that occurred during user creation
      throw error;
    });
}

