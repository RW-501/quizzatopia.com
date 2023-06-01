

		
	


		
function resetPassword() {
  var resetEmail = document.getElementById('resetEmail').value;
  firebase.auth().sendPasswordResetEmail(resetEmail)
    .then(function () {
      // Password reset email sent
      // You can display a success message to the user
      var statusMessage = document.getElementById('statusMessage');
      statusMessage.textContent = 'Password reset email sent';
      statusMessage.classList.remove('error');
      statusMessage.classList.add('success');
    })
    .catch(function (error) {
      // An error occurred while attempting to send the password reset email
      // You can display an error message to the user
      var statusMessage = document.getElementById('statusMessage');
      statusMessage.textContent = 'Error sending password reset email: ' + error.message;
      statusMessage.classList.remove('success');
      statusMessage.classList.add('error');
      console.error('Error sending password reset email:', error);
    });
}

		
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

document.addEventListener('DOMContentLoaded', () => {
  const USER_INFO_KEY = 'userInfo';

  function getUserInfo() {
    let userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY));
    if (!userInfo) {
      userInfo = {
        userName: 'New User',
      userEmail: '',
      userActive: true,
      userJoinedDate: new Date().toISOString(),
      userCity: '',
      userState: '',
      userRegion: '',
      userZipCode: '',
      userProfilePic: '/images/avatar/w1.png',
      userTagLine: 'Unlock Your Knowledge Potential with Quizzatopia!',
      userRank: 'Beginner',
      userPoints: 0,
      userQuizzesTaken: 0,
      userAds: ''
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


// Function to update user information in local storage and Firebase Realtime Database
function updateUserInfo(updatedInfo) {
  const userInfo = getUserInfo();
  const updatedKeys = Object.keys(updatedInfo);

  for (const key of updatedKeys) {
    if (userInfo[key] !== updatedInfo[key]) {
      userInfo[key] = updatedInfo[key];
    }
  }

  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  saveUserInfoToFirebase(userInfo);
  displayUserInfo();
}

	// Function to get user location using their IP address
function getUserLocation() {
  return fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const ipAddress = data.ip;
      // Replace this logic with your own implementation to get user location based on the IP address
      // Here, we're using a mock implementation that sets default values
      const userCity = 'City';
      const userState = 'State';
      const userRegion = 'Region';
      const userZipCode = 'ZipCode';

      return { userCity, userState, userRegion, userZipCode };
    })
    .catch(error => {
      console.error('Error getting user location:', error);
      return null;
    });
}

function checkUserInfoChanges() {
  const userInfo = getUserInfo();

  getUserLocation().then((location) => {
    const { userCity, userState, userRegion, userZipCode } = location;

    if (
      userInfo.userCity !== userCity ||
      userInfo.userState !== userState ||
      userInfo.userRegion !== userRegion ||
      userInfo.userZipCode !== userZipCode
    ) {
      // User location has changed, update user information
      const updatedInfo = {
        userCity,
        userState,
        userRegion,
        userZipCode,
      };
      updateUserInfo(updatedInfo);
    } else {
      // Check timestamp for user info
      const db = firebase.firestore();
      const userId = userInfo.firebaseId;

      db.collection('users')
        .doc(userId)
        .get()
        .then((doc) => {
          const dbUserInfo = doc.data();

          if (dbUserInfo && dbUserInfo.lastUpdated > userInfo.lastUpdated) {
            // Database info is newer, update local storage
            updateUserInfo(dbUserInfo);
          }
        })
        .catch((error) => {
          console.error('Error retrieving user info from Firestore:', error);
        });
    }
  });
}


	
	
	
	
	
function transferAccountToEmailUserInfo(userInfo, email) {
  saveUserInfoToFirestore(userInfo);
  const emailUserInfo = { ...userInfo, email };
  localStorage.setItem('emailUserInfo', JSON.stringify(emailUserInfo));
}


function saveUserInfoToFirestore(userInfo) {
  const db = firebase.firestore();

  db.collection('users')
    .doc(userInfo.firebaseId)
    .set(userInfo)
    .then(() => {
      console.log('User info saved to Firestore database');
    })
    .catch((error) => {
      console.log('Error saving user info to Firestore database:', error);
    });
}





  // Access the necessary functions
  const auth = firebase.auth();
  const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
  const FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
  const createUserWithEmailAndPassword = firebase.auth().createUserWithEmailAndPassword;
  const signInWithPopup = firebase.auth().signInWithPopup;

	// Function to get user information from authentication provider (Google, Facebook, or email)
function getUserInfoFromAuthProvider(user) {
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
//saveUserInfoToFirestore(userInfo)
  return userInfo;
}
	
// Function to handle Google sign-in
window.signInWithGoogle = function() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      const userInfo = getUserInfoFromAuthProvider(user);


      // Check if the user has already transferred the data
      if (!userInfo.transferToEmail) {
        if (userInfo.points > 0) {
          if (confirm('Would you like to transfer the current userInfo to emailUserInfo?')) {
            const email = prompt('Please enter your email address:');
            transferAccountToEmailUserInfo(userInfo, email);
            userInfo.transferToEmail = true; // Mark the transfer as completed
            updateUserInfo(userInfo); // Update user info in the database
          }
        }
      }

      // Update the user info in the UI
      updateUserInfo(userInfo);
      // Set the logged-in cookie
      document.cookie = 'loggedIn=true';

    // Sign-in successful
    onAuthSuccess(userInfo);
  
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
  const provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      const userInfo = getUserInfoFromAuthProvider(user);


      // Check if the user has already transferred the data
      if (!userInfo.transferToEmail) {
        if (userInfo.points > 0) {
          if (confirm('Would you like to transfer the current userInfo to emailUserInfo?')) {
            const email = prompt('Please enter your email address:');
            transferAccountToEmailUserInfo(userInfo, email);
            userInfo.transferToEmail = true; // Mark the transfer as completed
            updateUserInfo(userInfo); // Update user info in the database
          }
        }
      }

      // Update the user info in the UI
      updateUserInfo(userInfo);
      // Set the logged-in cookie
      document.cookie = 'loggedIn=true';

    // Sign-in successful
    onAuthSuccess(userInfo);
  
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

  auth
    .signInWithEmailAndPassword(email, password)
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

  
      
      // Check if the user has already transferred the data
      if (!userInfo.transferToEmail) {
        if (userInfo.points > 0) {
          if (confirm('Would you like to transfer the current userInfo to emailUserInfo?')) {
            const email = prompt('Please enter your email address:');
            transferAccountToEmailUserInfo(userInfo, email);
            userInfo.transferToEmail = true; // Mark the transfer as completed
            updateUserInfo(userInfo); // Update user info in the database
          }
        }
      }

      // Set the logged-in cookie
      document.cookie = 'loggedIn=true';

    // Sign-in successful
    onAuthSuccess(userInfo);
  
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
};


 
	
	// Function to validate the username, email, and password fields
function validateFields(username, email, password) {
  if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
    // Display an error message for empty fields
    showStatusMessage('Please fill in all the fields', 'error');
    return false;
  }

  // Validate email format using a regular expression
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    // Display an error message for invalid email format
    showStatusMessage('Invalid email format', 'error');
    return false;
  }

  // Validate password strength (e.g., minimum length, required characters)
  const passwordMinLength = 8;
  if (password.length < passwordMinLength) {
    // Display an error message for weak password
    showStatusMessage('Password should be at least ' + passwordMinLength + ' characters long', 'error');
    return false;
  }

  // You can add more password strength validation logic based on your requirements

  // All validations passed
  return true;
}

// Function to handle the signup form submission
window.createUserWithEmailAndPassword = function (event) {
  event.preventDefault();

  var username = document.getElementById('susername').value;
  var email = document.getElementById('semail').value;
  var password = document.getElementById('spassword').value;

  // Validate the fields before proceeding
  if (!validateFields(username, email, password)) {
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User creation successful, return the user object
      const user = userCredential.user;
      document.cookie = 'loggedIn=true';

    // Sign-in successful
    onAuthSuccess(userInfo);
  
      // Get the user's display name and Firebase ID
      const displayName = user.displayName;
      const firebaseId = user.uid;

      // Example: Show a success message and user info
      showStatusMessage('Signup successful', 'success');
      console.log('Username:', username);
      console.log('User email:', email);
      console.log('Firebase ID:', firebaseId);

      // Save user info to Firestore database
      const userInfo = {
        userName: username,
        profilePic: '/images/avatar/w1.png',
        tagLine: 'Unlock Your Knowledge Potential with Quizzatopia!',
        rank: 'Beginner',
        points: 0,
        quizzesTaken: 0,
        firebaseId: firebaseId
      };
      transferAccountToEmailUserInfo(userInfo, email); // Transfer account to email if needed
  //    saveUserInfoToFirestore(userInfo); // Save user info to Firestore

      return user;
    })
    .catch((error) => {
      // Handle any errors that occurred during user creation
      const errorCode = error.code;
      const errorMessage = error.message;
      showStatusMessage(errorMessage, 'error');
      document.cookie = 'loggedIn=false';

      throw error;
    });
}


	
	
		document.addEventListener("DOMContentLoaded", () => {

	
  // Get references to the buttons
  const loginButton = document.getElementById('loginButton');
  const signupButton = document.getElementById('signupButton');
  const googleButton = document.getElementById('googleButtonC');
  const facebookButton = document.getElementById('facebookButtonC');

  // Add event listeners to the buttons
  loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    signInWithUserWithEmailAndPassword(event);
  });

  signupButton.addEventListener('click', (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(event);
  });

  googleButton.addEventListener('click', () => {
    signInWithGoogle();
  });

  facebookButton.addEventListener('click', () => {
    signInWithFacebook();
  });

  document.addEventListener('DOMContentLoaded', function () {
    displayUserInfo();
  });


});

		
		
		
	});


function onAuthSuccess(userInfo) {
  // Perform any actions or operations you want to execute after successful authentication
	
  // Call checkUserInfoChanges() after successful login
      checkUserInfoChanges();
	
  // Example: Display a welcome message to the user
  console.log('Welcome, ' + userInfo.userName + '!');

  // Example: Redirect the user to a different page
// window.location.href = '/dashboard.html';

  // Example: Update the UI to show the user as logged in
  const loginButton = document.getElementById('loginButton');
  const signupButton = document.getElementById('signupButton');
  const dashboardLink = document.getElementById('dashboardLink');

  loginButton.style.display = 'none';
  signupButton.style.display = 'none';
  dashboardLink.style.display = 'block';
	
	  document.getElementById('loginPopup').classList.add('d-none');

}

