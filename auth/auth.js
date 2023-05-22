// Function to show the status message in the status bar
function showStatusMessage(message, status) {
  const statusBar = document.getElementById('statusBar');
  const statusMessage = document.getElementById('statusMessage');
  statusMessage.textContent = message;
  statusBar.classList.remove('d-none');
  statusBar.classList.remove('success');
  statusBar.classList.remove('error');
  statusBar.classList.add(status);
}

// Function to hide the status bar
function hideStatusBar() {
  const statusBar = document.getElementById('statusBar');
  statusBar.classList.add('d-none');
}





		
	


	document.addEventListener("DOMContentLoaded", () => {
		
		
const USER_INFO_KEY = 'userInfo';

function getUserInfo() {
  let userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY));
  if (!userInfo) {
    userInfo = {
      userName: 'New User',
      profilePic: '/images/avatar/w1.png',
      tagLine: 'Unlock Your Knowledge Potential with Quizzatopia!',
      rank: 'Beginner',
      points: 0,
      quizzesTaken: 0
    };
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  }
  return userInfo;
}

function displayUserInfo() {
  const userInfo = getUserInfo();

  // Update profile picture element
  const profilePicElement = document.getElementById('profile-pic');
  if (profilePicElement) {
    profilePicElement.src = userInfo.profilePic;
  }

  // Update profile name element
  const profileNameElement = document.getElementById('profile-name');
  if (profileNameElement) {
    profileNameElement.textContent = userInfo.userName;
  }

  // Update tagline element
  const taglineElement = document.getElementById('tagline');
  if (taglineElement) {
    taglineElement.textContent = userInfo.tagLine;
  }
}

function updateUserInfo(updatedInfo) {
  const userInfo = getUserInfo();
  const updatedKeys = Object.keys(updatedInfo);

  for (const key of updatedKeys) {
    if (userInfo[key] !== updatedInfo[key]) {
      userInfo[key] = updatedInfo[key];
    }
  }

  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  displayUserInfo();
}

function transferAccountToEmailUserInfo(userInfo, email) {
  saveUserInfoToFirebase(userInfo);
  const emailUserInfo = { ...userInfo, email };
  localStorage.setItem('emailUserInfo', JSON.stringify(emailUserInfo));
}

function saveUserInfoToFirebase(userInfo) {
  // Replace this with your own logic to save user info to the Firebase database
  const userRef = firestore.collection('users').doc(userInfo.firebaseId);
  userRef.set(userInfo)
    .then(() => {
      console.log('User info saved to Firebase database');
    })
    .catch((error) => {
      console.log('Error saving user info to Firebase database:', error);
    });
}

	
	
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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

  // Access the necessary functions
const auth = firebase.auth();
  const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
  const FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
const createUserWithEmailAndPassword = firebase.auth().createUserWithEmailAndPassword;
  const signInWithPopup = firebase.auth().signInWithPopup;

	
// Function to handle Google sign-in
window.signInWithGoogle = function() {
  const provider = new GoogleAuthProvider();

  return auth
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      const displayName = user.displayName;
      const email = user.email;
      const firebaseId = user.uid;

      const userInfo = {
        userName: displayName,
        profilePic: user.photoURL,
        tagLine: 'Unlock Your Knowledge Potential with Quizzatopia!',
        rank: 'Beginner',
        points: 0,
        quizzesTaken: 0,
        firebaseId: firebaseId
      };

      if (userInfo.points > 0) {
        if (confirm('Would you like to transfer the current userInfo to emailUserInfo?')) {
          const email = prompt('Please enter your email address:');
          transferAccountToEmailUserInfo(userInfo, email);
        }
      }

      updateUserInfo(userInfo);
      // Set the logged-in cookie
      document.cookie = 'loggedIn=true';
	  
      console.log('User display name:', displayName);
      console.log('User email:', email);
      console.log('Firebase ID:', firebaseId);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode google:', errorCode);
      console.log('errorMessage:', errorMessage);	 
	  // Set the logged-in cookie
      document.cookie = 'loggedIn=false';
	  
    });
};

// Function to handle Facebook sign-in
window.signInWithFacebook = function() {
  const provider = new FacebookAuthProvider();

  return auth
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      const displayName = user.displayName;
      const email = user.email;
      const firebaseId = user.uid;

      const userInfo = {
        userName: displayName,
        profilePic: user.photoURL,
        tagLine: 'Unlock Your Knowledge Potential with Quizzatopia!',
        rank: 'Beginner',
        points: 0,
        quizzesTaken: 0,
        firebaseId: firebaseId
      };

      if (userInfo.points > 0) {
        if (confirm('Would you like to transfer the current userInfo to emailUserInfo?')) {
          const email = prompt('Please enter your email address:');
          transferAccountToEmailUserInfo(userInfo, email);
        }
      }

      updateUserInfo(userInfo);
     // Set the logged-in cookie
      document.cookie = 'loggedIn=true';
	  
     
      console.log('User display name:', displayName);
      console.log('User email:', email);
      console.log('Firebase ID:', firebaseId);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode facebook:', errorCode);
      console.log('errorMessage:', errorMessage);	 
	  // Set the logged-in cookie
      document.cookie = 'loggedIn=false';
	  
    });
};

document.addEventListener('DOMContentLoaded', function() {
  displayUserInfo();
});
		
		
		
		

// Function to handle the sign-in process using email and password
window.signInWithUserWithEmailAndPassword = function(event) {
  event.preventDefault();

  const email = document.getElementById('lemail').value;
  const password = document.getElementById('lpassword').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Sign-in successful, retrieve the user object
      const user = userCredential.user;

      // Get the user's display name and Firebase ID
      const displayName = user.displayName;
      const firebaseId = user.uid;

      // Example: Show a success message and user info
      showStatusMessage('Sign-in successful', 'success');
      console.log('User display name:', displayName);
      console.log('Firebase ID:', firebaseId);
      
      // Update user info
      const userInfo = {
        userName: displayName,
        profilePic: '/images/avatar/w1.png',
        tagLine: 'Unlock Your Knowledge Potential with Quizzatopia!',
        rank: 'Beginner',
        points: 0,
        quizzesTaken: 0,
        firebaseId: firebaseId
      };
       // Set the logged-in cookie
      document.cookie = 'loggedIn=true';
	  
      if (userInfo.points > 0) {
        if (confirm('Would you like to transfer the current userInfo to emailUserInfo?')) {
          const email = prompt('Please enter your email address:');
          transferAccountToEmailUserInfo(userInfo, email);
	
        }
      }

      updateUserInfo(userInfo);
    })
    .catch((error) => {
      // Handle any errors that occurred during sign-in
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle the error appropriately
      console.log('errorCode signInWithEmailAndPassword:', errorCode);
      console.log('errorMessage:', errorMessage);
      showStatusMessage(errorMessage, 'error');	 
	  // Set the logged-in cookie
      document.cookie = 'loggedIn=false';
	  
    });
}

// Function to handle the signup form submission
window.createUserWithEmailAndPassword = function (event) {
  event.preventDefault();

  var username = document.getElementById('susername').value;
  var email = document.getElementById('semail').value;
  var password = document.getElementById('spassword').value;

  auth
    .createUserWithEmailAndPassword(email, password) // Provide email and password as arguments
    .then((userCredential) => {
      // User creation successful, return the user object
      const user = userCredential.user;
     // Set the logged-in cookie
      document.cookie = 'loggedIn=true';
	  
     
      // Get the user's display name and Firebase ID
      const displayName = user.displayName;
      const firebaseId = user.uid;

      // Example: Show a success message and user info
      showStatusMessage('Signup successful', 'success');
      console.log('Username:', username);
      console.log('User email:', email);
      console.log('Firebase ID:', firebaseId);

      return user;
    })
    .catch((error) => {
      // Handle any errors that occurred during user creation
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle the error appropriately
      console.log('errorCode e&p:', errorCode);
      console.log('errorMessage:', errorMessage);
      showStatusMessage(errorMessage, 'error');		 
	  // Set the logged-in cookie
      document.cookie = 'loggedIn=false';
	  
      throw error;
    });
}
	
	
// Get references to the buttons
const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");
const googleButton = document.getElementById("googleButtonC");
const facebookButton = document.getElementById("facebookButtonC");

// Add event listeners to the buttons
loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  signInWithUserWithEmailAndPassword(event);
});

signupButton.addEventListener("click", (event) => {
  event.preventDefault();
  createUserWithEmailAndPassword(event);
});

googleButton.addEventListener("click", () => {
  signInWithGoogle();
});

facebookButton.addEventListener("click", () => {
  signInWithFacebook();
});

});



	
