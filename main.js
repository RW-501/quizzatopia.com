// Create the <style> element
var styleElement = document.createElement("style");

// Set the CSS styles
var cssStyles = `
  /* CSS styles for the overlay and loader */
  #overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    transition: opacity 0.5s ease;
    z-index: 9999;
  }

  #loader {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 6px solid #aaaaaa;
    border-top-color: #000000;
    animation: loader-spin 1s infinite linear;
  }

  @keyframes loader-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Set the CSS code as the content of the <style> element
styleElement.textContent = cssStyles;

// Append the <style> element to the <head> section of the document
document.head.appendChild(styleElement);


// Create the overlay div
var overlay = document.createElement("div");
overlay.setAttribute("id", "overlay");

// Create the loader div
var loader = document.createElement("div");
loader.setAttribute("id", "loader");

// Append the loader to the overlay
overlay.appendChild(loader);

// Append the overlay to the body
document.body.appendChild(overlay);

window.addEventListener("load", function() {
  overlay.classList.add("loaded");

  setTimeout(function() {
    overlay.remove(); // Remove the overlay after a delay (adjust as needed)
  }, 1000); // Delay in milliseconds before removing the overlay
});

function setLoggedInCookie() {
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 3);

  document.cookie = "loggedIn=true; expires=" + expirationDate.toUTCString() + "; path=/;";
}


function getCookieValue(cookieName) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + '=')) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
}

const cookieValue = getCookieValue('loggedIn');
//console.log(cookieValue);

var loggedIn;
if (cookieValue === 'true') {
  // User is logged in
  console.log('User is logged in');
  loggedIn = true;
} else {
  // User is not logged in
  console.log('User is not logged in');
  loggedIn = false;
}

//console.log('loggedIn:', loggedIn);



// load.js
const USER_INFO_KEY = 'userInfo';

let cachedUserInfo = null;

function getUserInfo() {
  if (cachedUserInfo) {
    return cachedUserInfo;
  }

  let userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY));

  if (!userInfo) {
    userInfo = {
      userName: 'New User',
      userEmail: '',
      userActive: true,
      userJoinedDate: new Date().toISOString(),
      userCity: '',
      userLongitude: '',
      userLatitude: '',
      userCountry: '',
      userProfilePic: '/images/avatar/w1.png',
      userTagLine: 'Unlock Your Knowledge Potential with Quizzatopia!',
      userRank: 'Beginner',
      userPoints: 0,
      userQuizzesTaken: 0,
      userAds: ''
    };
console.log('userInfo main: ', userInfo);
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  }

  cachedUserInfo = userInfo;
  return userInfo;
}


function displayUserInfo() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const profilePicElement = document.getElementById('profile-pic');
  if (profilePicElement) {
    profilePicElement.src = userInfo.userProfilePic;
  }

//  const profileNameElement = document.getElementById('profile-name');
//  if (profileNameElement) {
//    profileNameElement.textContent = userInfo.userName;
//  }

  const taglineElement = document.getElementById('tagline');
  if (taglineElement) {
    taglineElement.textContent = userInfo.userTagLine;
  }
}




  displayUserInfo();







function updateUserInfo(updatedInfo) {
  const userInfo = getUserInfo();
  const updatedKeys = Object.keys(updatedInfo);

  for (const key of updatedKeys) {
    if (userInfo[key] !== updatedInfo[key]) {
      userInfo[key] = updatedInfo[key];
    }
  }

  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  displayUserInfo();
}

function updateProfilePic(userProfilePic) {
  updateUserInfo({ userProfilePic });
}

function updateTagline(userTagLine) {
  updateUserInfo({ userTagLine });
}

function updateUserName(userName) {
  updateUserInfo({ userName });
}

function updateRank(userRank) {
  updateUserInfo({ userRank });
}

function updatePoints(userPoints) {
  const userInfo = getUserInfo();
  userInfo.userPoints += userPoints;
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  displayUserInfo();
}

function updateQuizzesTaken(userQuizzesTaken) {
  const userInfo = getUserInfo();
  userInfo.userQuizzesTaken += userQuizzesTaken;
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  displayUserInfo();
}







let pointsRewards;

function updatePointsAndRank() {
  const userInfo = getUserInfo();

  if (userInfo.points <= 100) {
    updateRank('Beginner');
    pointsRewards = 2;
  } else if (userInfo.points > 100 && userInfo.points < 250) {
    updateRank('Novice');
    pointsRewards = 3;
  } else if (userInfo.points >= 250 && userInfo.points < 500) {
    updateRank('Enthusiast');
    pointsRewards = 4;
  } else if (userInfo.points >= 500 && userInfo.points < 1000) {
    updateRank('Prodigy');
    pointsRewards = 5;
  } else if (userInfo.points >= 1000 && userInfo.points < 2500) {
    updateRank('Expert');
    pointsRewards = 6;
  } else if (userInfo.points >= 2500 && userInfo.points < 5000) {
    updateRank('Master');
    pointsRewards = 7;
  } else if (userInfo.points >= 5000 && userInfo.points < 10000) {
    updateRank('Grandmaster');
    pointsRewards = 8;
  } else {
    updateRank('Ultimate Grandmaster');
    pointsRewards = 9;
  }
  // Update the user's points rewards
 //userInfo.pointsRewards = pointsRewards;
 // saveUserInfo(userInfo);
}









function getCurrentDate() {
  const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return now.toLocaleDateString(undefined, options);
}

// Helper function to get the maximum quantity of a badge
function getBadgeMaxQuantity(badgeId) {
  const badge = badges.find(badge => badge.id === badgeId);
  return badge ? badge.maxQuantity || 1 : 1;
}






// Function to check if a badge has been earned
// Function to check if a badge has been earned
function hasEarnedBadge(badgeId) {
  const earnedBadges = JSON.parse(localStorage.getItem('earnedBadges')) || [];
  return earnedBadges.some(eb => eb.id === badgeId.id);
}



function awardBadge(badgeId) {
  const earnedBadges = JSON.parse(localStorage.getItem('earnedBadges')) || [];
  const maxQuantity = getBadgeMaxQuantity(badgeId.id);

  //console.log('badgeId:', badgeId);
//  console.log('badgeId:id  ', badgeId.id);

  //if (earnedBadges.length < maxQuantity) {
    //console.log(earnedBadges.length+'  ???????????????????????????????????????????:   '+maxQuantity);

    earnedBadges.push({
      id: badgeId.id,
      earnedDate: getCurrentDate(),
      name: badgeId.name,
      description: badgeId.description,
      quantity: badgeId.quantity += 1,
      imageUrl: badgeId.imageUrl,
      maxQuantity: badgeId.maxQuantity
    });

  //  console.log('earnedBadges:', earnedBadges);
    localStorage.setItem("earnedBadges", JSON.stringify(earnedBadges));

    const earnedBadgesFromStorage = JSON.parse(localStorage.getItem('earnedBadges')) || [];
//  console.log('earnedBadges:', earnedBadgesFromStorage);
//  }
}


















function awardQuizzesTakenBadges() {
  const userInfo = getUserInfo();
  const quizzesTaken = userInfo.quizzesTaken;

  // Define the milestones and corresponding badge information
const milestones = [
  { count: 0, badge: { id: 2, name: "Quiz Enthusiast", description: "Awarded for taking 5 quizzes", quantity: 0, imageUrl: "/images/badge/wizards/wt1.png", maxQuantity: 1 } },
  { count: 1, badge: { id: 3, name: "Quiz Aficionado", description: "Awarded for taking 10 quizzes", quantity: 0, imageUrl: "/images/badge/wizards/wt2.png", maxQuantity: 1 } },
  { count: 2, badge: { id: 4, name: "Quiz Master", description: "Awarded for taking 20 quizzes", quantity: 0, imageUrl: "/images/badge/wizards/wt3.png", maxQuantity: 1 } },
  { count: 3, badge: { id: 5, name: "Quiz Guru", description: "Awarded for taking 30 quizzes", quantity: 0, imageUrl: "/images/badge/wizards/wt4.png", maxQuantity: 1 } },
  { count: 4, badge: { id: 6, name: "Quiz Legend", description: "Awarded for taking 40 quizzes", quantity: 0, imageUrl: "/images/badge/wizards/wt5.png", maxQuantity: 1 } },
  { count: 50, badge: { id: 7, name: "Quiz Champion", description: "Awarded for taking 50 quizzes", quantity: 0, imageUrl: "/images/badge/wizards/wt6.png", maxQuantity: 1 } }
];


 // Check if the user has reached any of the milestones and hasn't already earned the corresponding badge
  for (const milestone of milestones) {
    if (quizzesTaken >= milestone.count && !hasEarnedBadge(milestone.badge)) {
      awardBadge(milestone.badge);
    }
  }
}

const badges = [
  { id: 1, name: "5- Day Badge", description: "Visiting 5 Consecutive Days", quantity: 0, maxQuantity: 10, imageUrl: "/images/badges/xxx-1.png", earnedDate: "" },
  {
    id: 8,
    name: "Bronze Tier Badge",
    description: "Earned by reaching the Bronze Tier (0-100 points).",
    quantity: 0,
    maxQuantity: 1,
    imageUrl: "/images/badge/b1.png",
    earnedDate: ""
  },
  {
    id: 9,
    name: "Silver Tier Badge",
    description: "Earned by reaching the Silver Tier (101-250 points).",
    quantity: 0,
    maxQuantity: 1,
    imageUrl: "/images/badge/s1.png",
    earnedDate: ""
  },
  {
    id: 10,
    name: "Gold Tier Badge",
    description: "Earned by reaching the Gold Tier (251-500 points).",
    quantity: 0,
    maxQuantity: 1,
    imageUrl: "/images/badge/g1.png",
    earnedDate: ""
  },
  {
    id: 11,
    name: "Platinum Tier Badge",
    description: "Earned by reaching the Platinum Tier (501-1000 points).",
    quantity: 0,
    maxQuantity: 1,
    imageUrl: "/images/badge/p1.png",
    earnedDate: ""
  },
  {
    id: 12,
    name: "Diamond Tier Badge",
    description: "Earned by reaching the Diamond Tier (1001+ points).",
    quantity: 0,
    maxQuantity: 1,
    imageUrl: "/images/badge/d1.png",
    earnedDate: ""
  },
  {
    id: 13,
    name: "Perfect Score",
    description: "Scored 100% on Quiz",
    quantity: 0,
    maxQuantity: 100,
    imageUrl: "/images/badge/ps.png",
    earnedDate: ""
  }
];






function getUserPoints() {
  const userInfo = getUserInfo();
  return userInfo.userPoints;
}

function checkTier() {
  const userPoints = getUserPoints();
  
  if (userPoints >= 0 && userPoints <= 100) {
    return badges.find(badge => badge.id === 8);
  } else if (userPoints > 100 && userPoints <= 250) {
    return badges.find(badge => badge.id === 9);
  } else if (userPoints > 250 && userPoints <= 500) {
    return badges.find(badge => badge.id === 10);
  } else if (userPoints > 500 && userPoints <= 1000) {
    return badges.find(badge => badge.id === 11);
  } else if (userPoints > 1000) {
    return badges.find(badge => badge.id === 12);
  } else {
    return null;
  }
}




// Function to get the current date and time from API
async function getCurrentDateTime() {
  try {
    const response = await fetch('https://worldtimeapi.org/api/ip');
    const data = await response.json();
    return data.datetime; // Assuming the API returns date and time in ISO 8601 format
  } catch (error) {
    console.error('Error fetching current date and time:', error);
    return null;
  }
}

// Function to check if the user has visited the page before
function hasVisitedPage() {
  const lastVisit = localStorage.getItem('lastVisit');
  return !!lastVisit;
}

// Function to track consecutive days of visits
function trackConsecutiveDays() {
  const lastVisit = localStorage.getItem('lastVisit');
  const currentDate = new Date();

  if (lastVisit) {
    const prevVisitDate = new Date(lastVisit);
    const timeDiff = currentDate.getTime() - prevVisitDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      const consecutiveDays = parseInt(localStorage.getItem('consecutiveDays') || '0');
      localStorage.setItem('consecutiveDays', consecutiveDays + 1);
    } else if (daysDiff > 1) {
      localStorage.removeItem('consecutiveDays');
    }
  }

  localStorage.setItem('lastVisit', currentDate.toISOString());
}







// Function to reward points for each returning day up to 5 days
// Function to reward points for each returning day up to 5 days
function rewardPointsForReturningDays() {
  const consecutiveDays = parseInt(localStorage.getItem('consecutiveDays') || '0');
  const pointsPerDay = 10; // Points to be awarded per day

  if (consecutiveDays < 5) {
    const pointsEarned = consecutiveDays * pointsPerDay;
    updatePoints(pointsEarned);
    console.log(`Earned ${pointsEarned} points for returning ${consecutiveDays} day(s).`);
  } else if (consecutiveDays === 5) {
    const pointsEarned = consecutiveDays * pointsPerDay;
    updatePoints(pointsEarned);
    console.log(`Earned ${pointsEarned} points and the 5-Day badge.`);
    awardBadge(1); // Assuming badge with ID 1 is the 5-Day badge
  }
}

// Usage example
async function checkUserVisit() {
  const currentDateTime = new Date();
  const lastVisitDateTime = localStorage.getItem('lastVisitDateTime');
  const hasVisitedToday = lastVisitDateTime && isSameDay(currentDateTime, new Date(lastVisitDateTime));

  if (!hasVisitedToday) {
    // Increment consecutive days
    const consecutiveDays = parseInt(localStorage.getItem('consecutiveDays') || '0');
    localStorage.setItem('consecutiveDays', consecutiveDays + 1);

    // Update last visit date/time
    localStorage.setItem('lastVisitDateTime', currentDateTime.toString());

    // Reward points for returning days
    rewardPointsForReturningDays();
  } else {
   // console.log('Already visited today.');
  }
}

// Function to check if two dates are the same day
function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}


// auth.js




		
// Function to open the login/signup popup
function openPopup() {
  document.getElementById('loginPopup').classList.remove('d-none');
}

// Function to close the login/signup popup
function closePopup() {
  document.getElementById('loginPopup').classList.add('d-none');
}

// Function to switch between login and signup tabs
function switchTab(tabName) {
  document.getElementById('loginTab').style.display = tabName === 'login' ? 'block' : 'none';
  document.getElementById('signupTab').style.display = tabName === 'signup' ? 'block' : 'none';
}


  const currentPagePath = window.location.pathname;
    console.log("currentPagePath:", currentPagePath);
let authIndex;
  if (currentPagePath === '/' || currentPagePath === '/index.html') {
    authIndex = './auth/index.html';
  } else {
    authIndex = '/auth/index.html';
  }



// Fetch the popup HTML dynamically and append it to the signupLoginArea element
fetch(authIndex)
  .then(response => response.text())
  .then(data => {
    const signupLoginArea = document.querySelector('#signupLoginArea');
	signupLoginArea.innerHTML += data;
signupLoginArea.display = "none";
  });






const firebaseConfig = {
  apiKey: "AIzaSyC8PYJV5-E6hIYbElsgb5e7MOS0faCiLM4",
  authDomain: "quizzatopia-bdfc9.firebaseapp.com",
  projectId: "quizzatopia-bdfc9",
  storageBucket: "quizzatopia-bdfc9.appspot.com",
  messagingSenderId: "828105067102",
  appId: "1:828105067102:web:76afb989ed7c03ebb542cf",
  measurementId: "G-J3QK9V5480"
};

// Check if the Firebase scripts are loaded
if (typeof firebase !== 'undefined' && typeof firebase.firestore === 'function') {
  // The Firebase scripts are loaded
  // Initialize Firebase and get a reference to the Firestore database
  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();
  
  // Your Firestore code here
    console.log('Firebase found.');

	  // Access the necessary functions
  const auth = firebase.auth();
  const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
  const FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
  const createUserWithEmailAndPassword = firebase.auth().createUserWithEmailAndPassword;
  const signInWithPopup = firebase.auth().signInWithPopup;
	
	
} else {
  // The Firebase scripts are not loaded
  // Handle the situation accordingly
  console.log('Firebase scripts not found.');
}


		 // Get a reference to the Firestore database
//  const db = firebase.firestore();

  // Create a collection called "users" (if it doesn't exist already)
  //const usersCollection = db.collection('users');

// Function to retrieve user location using a geolocation API
var ipAddress;
	function getUserIP(){
// This approach uses a third-party API to fetch the user's IP address
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
     ipAddress = data.ip;
    console.log(ipAddress);
    // Use the IP address as needed
  })
  .catch(error => {
    console.error('Error:', error);
  });
	}
	


		function getUserLocation() {
  const USER_INFO_KEY = 'user_location';
  const savedUserInfo = localStorage.getItem(USER_INFO_KEY);

  if (savedUserInfo) {
    // User location is already saved in local storage, return the parsed object
    return JSON.parse(savedUserInfo);
  }

  const apiKey = 'f26dee18c273451e8622b5c4bb618167';

  // Make a request to the IP Geolocation API
  return fetch(`https://api.ipgeolocationapi.com/geolocate/${ipAddress}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const userCountry = data.country_name;
      const userCity = data.city;
      const userLatitude = data.latitude;
      const userLongitude = data.longitude;

      const userInfo = {
        userCountry,
        userCity,
        userLatitude,
        userLongitude
      };

      // Save the user location in local storage
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));

      return userInfo;
    })
    .catch(error => {
      console.error('Error:', error);
      return null;
    });
}

	

// Function to save user information to Firestore
function saveUserInfoToFirestore(userInfo) {
  const db = firebase.firestore();
  const userId = userInfo.firebaseId;

  db.collection('users')
    .doc(userId)
    .set(userInfo)
    .then(() => {
      console.log('User information saved to Firestore');
    })
    .catch((error) => {
      console.error('Error saving user information to Firestore:', error);
    });
}

// Function to check if user info has changed and update if necessary
function checkUserInfoChanges() {
  const userInfo = getUserInfo();

  getUserLocation()
    .then((location) => {
      const { userCountry, userCity, userLatitude, userLongitude } = location;

      if (
        userInfo.userCity !== userCity ||
        userInfo.userCountry !== userCountry ||
        userInfo.userLatitude !== userLatitude ||
        userInfo.userLongitude !== userLongitude
      ) {
        // User location has changed, update user information
        const updatedInfo = {
          userCity,
          userCountry,
          userLatitude,
          userLongitude,
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
    })
    .catch((error) => {
      console.error('Error retrieving user location:', error);
    });
}




// Update the signInWithGoogle function
// Update the signInWithGoogle function
window.signInWithGoogle = function () {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;

      // Get the user's display name and Firebase ID
      const displayName = user.displayName;
      const firebaseId = user.uid;

      // Example: Show a success message and user info
      showStatusMessage('Sign-in successful', 'success');
      console.log('User display name:', displayName);
      console.log('Firebase ID:', firebaseId);

      // Save user info to Firestore database
      const userInfo = {
        userName: displayName,
        userEmail: user.email,
        userProfilePic: user.photoURL,
        userTagLine: 'Unlock Your Knowledge Potential with Quizzatopia!',
        userRank: 'Beginner',
        userPoints: 0,
        userQuizzesTaken: 0,
        userCountry: '',
        userCity: '',
        userLatitude: 0,
        userLongitude: 0,
        firebaseId: firebaseId,
        lastUpdated: new Date().getTime(),
      };
      saveUserInfoToFirestore(userInfo); // Save user info to Firestore

      // Set the logged-in cookie
      document.cookie = 'loggedIn=true';

      // Sign-in successful
      onAuthSuccess(userInfo);

      updateUserInfo(userInfo);

      // Check if user info changes
      checkUserInfoChanges();
    })
    .catch((error) => {
      // Handle any errors that occurred during sign-in
      const errorCode = error.code;
      const errorMessage = error.message;
      showStatusMessage(errorMessage, 'error');
      document.cookie = 'loggedIn=false';
    });
};







// Update the createUserWithEmailAndPassword function
window.createUserWithEmailAndPassword = function (email, password) {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Get the user's email and Firebase ID
      const userEmail = user.email;
      const firebaseId = user.uid;

      // Example: Show a success message and user info
      showStatusMessage('Signup successful', 'success');
      console.log('User email:', userEmail);
      console.log('Firebase ID:', firebaseId);

      // Save user info to Firestore database
      const userInfo = {
        userName: '',
        userEmail: userEmail,
        userProfilePic: '/images/avatar/w1.png',
        userTagLine: 'Unlock Your Knowledge Potential with Quizzatopia!',
        userRank: 'Beginner',
        userPoints: 0,
        userQuizzesTaken: 0,
        userCountry: '',
        userCity: '',
        userLatitude: 0,
        userLongitude: 0,
        firebaseId: firebaseId,
        lastUpdated: new Date().getTime(),
      };
      saveUserInfoToFirestore(userInfo); // Save user info to Firestore

      // Set the logged-in cookie
      document.cookie = 'loggedIn=true';

      // Sign-up successful
      onAuthSuccess(userInfo);

      updateUserInfo(userInfo);

      // Check if user info changes
      checkUserInfoChanges();
    })
    .catch((error) => {
      // Handle any errors that occurred during sign-up
      const errorCode = error.code;
      const errorMessage = error.message;
      showStatusMessage(errorMessage, 'error');
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



function checkUserInfoChanges() {
  const userInfo = getUserInfo();

  getUserLocation().then((location) => {
	      const { userCountry, userCity, userLatitude, userLongitude } = location;

    if (
      userInfo.userCity !== userCity ||
      userInfo.userCountry !== userCountry ||
      userInfo.userLatitude !== userLatitude ||
      userInfo.userLongitude !== userLongitude
    ) {
      // User location has changed, update user information
      const updatedInfo = {
        userCity,
        userCountry,
        userLatitude,
        userLongitude,
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

		
	
		
	

function onAuthSuccess(userInfo) {
  // Perform any actions or operations you want to execute after successful authentication
	
  // Call checkUserInfoChanges() after successful login
      checkUserInfoChanges();
		  loggedIn = true;
	setLoggedInCookie(); 
 slideOut("loginPopup");
	
	
	
	// Example: Display a welcome message to the user
  console.log('Welcome, ' + userInfo.userName + '!');

  // Example: Redirect the user to a different page
// window.location.href = '/dashboard.html';

  // Example: Update the UI to show the user as logged in

	  saveUserInfoToFirebase(userInfo);

	  document.getElementById('loginPopup').classList.add('d-none');

}

 // Function to save user information to Firestore

function saveUserInfoToFirebase(userInfo) {
  // Access the Firestore database
  const db = firebase.firestore();

  // Save the user information to the "userInfo" collection in Firebase
  db.collection('users').add(userInfo)
    .then((docRef) => {
      console.log('User information saved to Firebase with document ID:', docRef.id);
    })
    .catch((error) => {
      console.error('Error saving user information to Firebase:', error);
    });
}


		
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






// Function to update user information in local storage and Firestore Database
function updateUserInfo(updatedInfo) {
  const userInfo = getUserInfo();
  const updatedKeys = Object.keys(updatedInfo);

  for (const key of updatedKeys) {
    if (userInfo[key] !== updatedInfo[key]) {
      userInfo[key] = updatedInfo[key];
    }
  }

  // Update user information in local storage
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));

  // Save updated user information to Firebase
  saveUserInfoToFirebase(userInfo);

  // Display updated user information
  displayUserInfo();
}

	

	
	















	  let navbarPath, footerPath;

// Function to fetch and insert HTML based on the page level
function fetchAndInsertContent() {

  if (currentPagePath === '/' || currentPagePath === '/index.html') {
    navbarPath = './elements/navbar.html';
    footerPath = './elements/footer.html';
	  	    //  console.log("footerPath 1.... ");

  } else {
    navbarPath = window.location.origin +'/elements/navbar2.html';
    footerPath = window.location.origin +'/elements/footer2.html';
	  
	  
	  //    console.log(footerPath+"    footerPath 2.... "+ window.location.origin);

  }

	

  fetch(navbarPath)
    .then(response => response.text())
    .then(data => {
      document.querySelector('#navbar').innerHTML = data;
      initializeNavbarToggler();
    });

}
	
	
window.addEventListener('load', function() {
  // Create the mainFooter div
  const mainFooter = document.createElement('div');
  mainFooter.id = 'mainFooter';

  // Fetch and insert the footer HTML
  fetch(footerPath)
    .then(response => response.text())
    .then(data => {
      mainFooter.innerHTML = data;
      document.body.appendChild(mainFooter);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
});



function initializeNavbarToggler() {
    var navbarNav = document.querySelector('#navbarNav');
    navbarNav.classList.add('collapse');
    var loggedInDiv = document.querySelector('#navLoggedin');
    loggedInDiv.style.display = 'none';

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    document.getElementById('profile-pic').src = userInfo.userProfilePic;

    console.log('userInfo firebaseId:', userInfo.firebaseId);

    console.log('collapse btn last main.js:');
}





// Call the function to fetch and insert the HTML based on the page level
document.addEventListener('DOMContentLoaded', function() {
  fetchAndInsertContent();
});


window.onload = function() {
  var navbarNav = document.querySelector('#navbarNav');
  navbarNav.classList.toggle('collapse');
    // Check if the navbar is collapsed or not
    if (navbarNav.classList.contains('collapse')) {
      // Navbar is collapsed, hide the "logged in" div
      loggedInDiv.style.display = 'none';
    } else {
      // Navbar is not collapsed, show the "logged in" div
      loggedInDiv.style.display = 'block';
    }
};



// Log out function
function logOutFunction() {
  firebase.auth().signOut().then(function() {
    // Log out successful
      // Set the logged-in cookie
      document.cookie = 'loggedIn=false';
	  loggedIn = false;
	  console.log("User logged out.");
  }).catch(function(error) {
    // An error occurred
    console.log("Error logging out:", error);
  });
}


window.onload = function() {
  function updateNavBar() {
    // Check if user is logged in
    if (loggedIn === true) {
      // User is logged in
     // document.getElementById('navLoggedin').innerHTML = '<div onclick="logOutFunction()">Log Out</div>';
	        var navLoggedinElement = document.getElementById('navLoggedin');
      if (!navLoggedinElement) {
        // Create the navLoggedin element if it doesn't exist
        navLoggedinElement = document.createElement('div');
        navLoggedinElement.id = 'navLoggedin';
        // Append the new element to the appropriate parent element in your HTML markup
        // For example, if it should be part of a navigation bar, find the parent element of the navigation bar and append it there.
        var parentElement = document.querySelector('.auth-buttons');
        parentElement.appendChild(navLoggedinElement);
      }
      navLoggedinElement.innerHTML = '<div onclick="logOutFunction()">Log Out</div>';
	    
	    
    } else {
      // User is not logged in
      var navLoggedinElement = document.getElementById('navLoggedin');
      if (!navLoggedinElement) {
        // Create the navLoggedin element if it doesn't exist
        navLoggedinElement = document.createElement('div');
        navLoggedinElement.id = 'navLoggedin';
        // Append the new element to the appropriate parent element in your HTML markup
        // For example, if it should be part of a navigation bar, find the parent element of the navigation bar and append it there.
        var parentElement = document.querySelector('.auth-buttons');
        parentElement.appendChild(navLoggedinElement);
      }
      navLoggedinElement.innerHTML = '<div onclick="openPopup(); switchTab(\'login\');">Log In</div>';
    }
  }

  updateNavBar();
}


function slideIn(xxx) {
  var myDiv = document.getElementById(xxx);
  var keyframes = [
    { transform: "translateX(-100%)" },
    { transform: "translateX(0)" }
  ];
  var options = {
    duration: 500,
    easing: "ease"
  };
  myDiv.animate(keyframes, options);
}

function slideOut(xxx) {
  var myDiv = document.getElementById(xxx);
  var keyframes = [
    { transform: "translateX(0)" },
    { transform: "translateX(-100%)" }
  ];
  var options = {
    duration: 500,
    easing: "ease"
  };
  myDiv.animate(keyframes, options);
}


  var  QUIZ_COUNT_THRESHOLD = 2;
 var newQuizCount;
function showLoginPopupIfNeeded() {

  var  quizCount = localStorage.getItem('quizCount');

  if (!quizCount) {
    // First time user, set the quiz count to 1
    localStorage.setItem('quizCount', '1');
  } else {
    // Increment the quiz count and update the localStorage
     newQuizCount = parseInt(quizCount) + 1;
    localStorage.setItem('quizCount', newQuizCount.toString());


  }
}

function navbarToggler() {
  var navbarNav = document.querySelector('#navbarNav');
  navbarNav.classList.toggle('collapse');
}

		function elementExists(elementId) {
  const element = document.getElementById(elementId);
  return element !== null;
}
		  
if (elementExists('loginPopup')) {
  // The element exists, you can proceed with accessing it
 slideIn("loginPopup");

}

   
		    console.log("  ?????????????????????????    ^   Main.js ^   ????????????????????????999        ");
