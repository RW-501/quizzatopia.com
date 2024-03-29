






function lateLoad() {
  // Code that doesn't need to be called immediately
  // ...

	  	  console.log('LateLoad');



//   console.log("  ?????????????????????????  inside  ^   LateLoad.js ^   ????????????????????????999        ");
 // Create the mainFooter div
  const mainFooter = document.createElement('div');
  mainFooter.id = 'mainFooter';




  if (currentPagePath === '/' || currentPagePath === '/index.html') {
    footerPath = './elements/footer.html';
  } else {
    footerPath = '/elements/footer2.html';   
	  
  }

   // console.log('footerPath   '+footerPath);

	
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

function updatePointsAndRank() {
  const userInfo = getUserInfo();

  if (userInfo.userPoints <= 100) {
    updateRank('Beginner');
    pointsRewards = 2;
  } else if (userInfo.userPoints > 100 && userInfo.userPoints < 250) {
    updateRank('Novice');
    pointsRewards = 3;
  } else if (userInfo.userPoints >= 250 && userInfo.userPoints < 500) {
    updateRank('Enthusiast');
    pointsRewards = 4;
  } else if (userInfo.userPoints >= 500 && userInfo.userPoints < 1000) {
    updateRank('Prodigy');
    pointsRewards = 5;
  } else if (userInfo.userPoints >= 1000 && userInfo.userPoints < 2500) {
    updateRank('Expert');
    pointsRewards = 6;
  } else if (userInfo.userPoints >= 2500 && userInfo.userPoints < 5000) {
    updateRank('Master');
    pointsRewards = 7;
  } else if (userInfo.userPoints >= 5000 && userInfo.userPoints < 10000) {
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

function getUserPoints() {
  const userInfo = getUserInfo();
  return userInfo.userPoints;
}



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



function getCurrentDate() {
  const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return now.toLocaleDateString(undefined, options);
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


// Helper function to get the maximum quantity of a badge
function getBadgeMaxQuantity(badgeId) {
  const badge = badges.find(badge => badge.id === badgeId);
  return badge ? badge.maxQuantity || 1 : 1;
}
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
  const quizzesTaken = userInfo.userQuizzesTaken;

  // Define the milestones and corresponding badge information
const milestones = [
  { count: 5, badge: { id: 2, name: "Quiz Enthusiast", description: "Awarded for taking 5 quizzes", quantity: 0, imageUrl: "/images/badge/wizards/wt1.png", maxQuantity: 1 } },
  { count: 10, badge: { id: 3, name: "Quiz Aficionado", description: "Awarded for taking 10 quizzes", quantity: 0, imageUrl: "/images/badge/wizards/wt2.png", maxQuantity: 1 } },
  { count: 20, badge: { id: 4, name: "Quiz Master", description: "Awarded for taking 20 quizzes", quantity: 0, imageUrl: "/images/badge/wizards/wt3.png", maxQuantity: 1 } },
  { count: 30, badge: { id: 5, name: "Quiz Guru", description: "Awarded for taking 30 quizzes", quantity: 0, imageUrl: "/images/badge/wizards/wt4.png", maxQuantity: 1 } },
  { count: 40, badge: { id: 6, name: "Quiz Legend", description: "Awarded for taking 40 quizzes", quantity: 0, imageUrl: "/images/badge/wizards/wt5.png", maxQuantity: 1 } },
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

var loginPopupDisplayed = false;

function openPopup(xxx) {
  // Check if the loginPopup element already exists
  const loginPopup = document.getElementById('loginPopup');

	
  if (loginPopup) {
    // If the popup exists, show it and slide in the loginPopupBody
    loginPopup.classList.remove('d-none');
    slideIn('loginPopupBody');
  } else {
    // Determine the correct path to the auth index page
    const authIndex = currentPagePath.includes('index.html') ? './auth/index.html' : '/auth/index.html';

    // Fetch the popup HTML dynamically
   fetch(authIndex)
  .then(response => response.text())
  .then(data => {
    const footer_XL = document.getElementById('footer_XL');
    const popupContainer = document.createElement('div');
    popupContainer.innerHTML = data;

    // Append the popup to the body
    footer_XL.appendChild(popupContainer);

    // Determine which tab to switch to based on the xxx parameter
    if (xxx === 'signin') {
      switchTab('signup');
    } else {
      switchTab('login');
    }

    // Setup event handlers for login buttons
    SetupLoginBTNFunc();
	  
      setTimeout(() => {
    // Wait for the popupContainer to be fully loaded before showing it
      console.log("Popup container fully loaded.");
  const loginPopup = document.getElementById('loginPopup');
    loginPopup.classList.remove('d-none');
    slideIn('loginPopupBody');
loginPopupDisplayed = true;
      }, 500);

      
      })
  .catch(error => {
    console.error('Error fetching popup HTML:', error);
  });

  }
}

	




// Function to close the login/signup popup
function closePopup() {
slideOut("loginPopupBody");

  document.getElementById('loginPopup').classList.add('d-none');
}

// Function to switch between login and signup tabs
function switchTab(tabName) {
  document.getElementById('loginTab').style.display = tabName === 'login' ? 'block' : 'none';
  document.getElementById('signupTab').style.display = tabName === 'signup' ? 'block' : 'none';
}




// Function to view the user dashboard or show the login popup
function viewDashboard() {
  if (loggedIn === true) {
    window.location.href = '/user/'; // Redirect to the user dashboard
  } else {
   // console.log(" viewDashboard:");

    // Show the login popup or switch to the login tab in the popup
    openPopup();
  }
}









  // Load in Info....


window.signInAnonymously = async function() {
  try {
    const userCredential = await firebase.auth().signInAnonymously();
    const user = userCredential.user;
    const firebaseId = user.uid;

    showStatusMessage('Sign-in successful', 'success');
    console.log('Firebase ID:', firebaseId);

    const exists = await checkUserExistence(firebaseId);
    let userInfo;

    if (exists) {
      userInfo = await retrieveUserInfoFromFirestore(firebaseId);
    } else {
      userInfo = {
        userName: 'Anonymous',
        userEmail: '',
        userProfilePic: '/images/avatar/w1.png',
        userTagLine: 'Unlock Your Knowledge Potential!',
        userRank: 'Beginner',
        userPoints: 0,
	userLoginType: 'Anonymous',      
        userQuizzesTaken: 0,
        userCountry: '',
        userState: '',
        animationEnabled: true,
        userIP: ipAddress,
        userLatitude: 0,
        userLongitude: 0,
        firebaseId: firebaseId,
        lastUpdated: new Date().getTime(),
      };
      await saveUserInfoToFirestore(userInfo);
    }

    saveUserInfoToLocalStorage(userInfo);
    setLoggedInCookie();
    loggedIn = true;
    updateUserInfo(userInfo);
    checkUserInfoChanges();
    onAuthSuccess(userInfo);
  } catch (error) {
    handleSignInError(error);
  }
};










// Helper function to check if the input is a valid email address
function isValidEmail(email) {
  // Use a simple regular expression to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}












// Update the createUserWithEmailAndPassword function
window.createUserWithEmailAndPassword = function () {
 const username = document.getElementById('susername').value;
 const email = document.getElementById('semail').value;
  const password = document.getElementById('spassword').value;

	
   // Check if email is provided and is a string
  if ( !validateFields(username, email, password)) {
    return;
  }



	const auth = firebase.auth();

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
        userName: username,
        userEmail: userEmail,
        userProfilePic: '/images/avatar/w1.png',
        userTagLine: 'Unlock Your Knowledge Potential with Quizzatopia!',
        userRank: 'Beginner',
        userPoints: 0,
        userQuizzesTaken: 0,
        userCountry: '',
        userState: '',
        userLatitude: 0,
              animationEnabled: true,
              userIP:  ipAddress,
	      userLongitude: 0,
        firebaseId: firebaseId,
        lastUpdated: new Date().getTime(),
      };
      saveUserInfoToFirestore(userInfo); // Save user info to Firestore

                // Set the logged-in cookie
setLoggedInCookie();
  loggedIn = true;



      updateUserInfo(userInfo);

      // Check if user info changes
      checkUserInfoChanges();

      // Sign-up successful
      onAuthSuccess(userInfo);

    })
    .catch((error) => {
      // Handle any errors that occurred during sign-up
      const errorCode = error.code;
      const errorMessage = error.message;
      showStatusMessage(errorMessage, 'error');
    localStorage.setItem('loggedIn', 'false'); // Set the authentication status in local storage
    });
};
	







window.signInWithEmailAndPassword = function() {
  const emailOG = document.getElementById('lemail').value;
  const password = document.getElementById('lpassword').value;

  if (typeof emailOG !== 'string' || emailOG.trim() === '') {
    showStatusMessage('Please enter a valid email address.', 'error');
    return;
  }

  // Trim the email to remove leading/trailing whitespaces
  const email = emailOG.trim();

  // Check if the email is a valid email address
  if (!isValidEmail(email)) {
    showStatusMessage('Invalid email address.', 'error');
    return;
  }
	
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Get the user's display name and Firebase ID
      const displayName = user.displayName;

	    
	    const firebaseId = user.uid;

      // Example: Show a success message and user info
      showStatusMessage('Sign-in successful', 'success');
      console.log('User display name:', displayName);
      console.log('Firebase ID:', firebaseId);

      checkUserExistence(firebaseId)
        .then((exists) => {
          if (exists) {
            retrieveUserInfoFromFirestore(firebaseId)
              .then((userInfo) => {
                saveUserInfoToLocalStorage(userInfo);
setLoggedInCookie();
  loggedIn = true;
		      onAuthSuccess(userInfo);
                updateUserInfo(userInfo);
                checkUserInfoChanges();
              })
              .catch((error) => {
                showStatusMessage('Error retrieving user info', 'error');
              });
          } else {
            const userInfo = {
              userName: displayName,
              userEmail: user.email,
              userProfilePic: user.photoURL,
              userTagLine: 'Unlock Your Knowledge Potential with Quizzatopia!',
              userRank: 'Beginner',
              userPoints: 0,
	userLoginType: 'Email',      
              userQuizzesTaken: 0,
              userCountry: '',
              userState: '',
 animationEnabled: true,
              userIP: ipAddress,
		    userLatitude: 0,
              userLongitude: 0,
              firebaseId: firebaseId,
              lastUpdated: new Date().getTime(),
            };

            // Create a new user in the Firestore database
            createUserInFirestore(userInfo)
              .then(() => {
                saveUserInfoToLocalStorage(userInfo);
                // Set the logged-in cookie
setLoggedInCookie();
  loggedIn = true;

                updateUserInfo(userInfo);
                checkUserInfoChanges();
                onAuthSuccess(userInfo);

              })
              .catch((error) => {
                showStatusMessage('Error creating user', 'error');
              });
          }
        })
        .catch((error) => {
          showStatusMessage('Error checking user existence', 'error');
        });
    })
    .catch((error) => {
      showStatusMessage('Error signing in', 'error');
      console.error('Sign-in error:', error);
    });
}




window.signInWithFacebook = function () {
  const provider = new firebase.auth.FacebookAuthProvider();
      console.log('provider:', provider);

  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log('user:', user);

      // Get the user's display name and Firebase ID
          const name = user.displayName;
	    const nameArray = name.split(" ");
// Get the first name (assuming it's the first word)
const displayName = nameArray[0];
	    
      const firebaseId = user.uid;

      // Example: Show a success message and user info
      showStatusMessage('Sign-in successful', 'success');
      console.log('User display name:', displayName);
      console.log('Firebase ID:', firebaseId);

      // Check if the user already exists in the Firestore database
      checkUserExistence(firebaseId)
        .then((exists) => {
          if (exists) {
            // Existing user
            retrieveUserInfoFromFirestore(firebaseId)
              .then((userInfo) => {
                // Save database info to local storage
                saveUserInfoToLocalStorage(userInfo);

                // Set the logged-in cookie
setLoggedInCookie();
  loggedIn = true;


                updateUserInfo(userInfo);

                // Check if user info changes
                checkUserInfoChanges();

                // Sign-in successful
                onAuthSuccess(userInfo);
              })
              .catch((error) => {
                // Handle error retrieving user info
                showStatusMessage('Error retrieving user info', 'error');
		        console.error('0 Firebase Auth Error:', error.code, error.message);

              });
          } else {
            // New user
            const userInfo = {
              userName: displayName,
              userEmail: user.email,
              userProfilePic: user.photoURL,
              userTagLine: 'Unlock Your Knowledge Potential with Quizzatopia!',
              userRank: 'Beginner',
              userPoints: 0,
	userLoginType: 'Facebook',      
              userQuizzesTaken: 0,
              userCountry: '',
              userState: '',
              animationEnabled: true,
              userIP: ipAddress,
              userLatitude: 0,
              userLongitude: 0,
              firebaseId: firebaseId,
              lastUpdated: new Date().getTime(),
            };

            // Save local storage info to Firestore database
            saveUserInfoToFirestore(userInfo)
              .then(() => {
                // Save user info to local storage
                saveUserInfoToLocalStorage(userInfo);

                // Set the logged-in cookie
setLoggedInCookie();
  loggedIn = true;


                updateUserInfo(userInfo);

                // Check if user info changes
                checkUserInfoChanges();

                // Sign-in successful
                onAuthSuccess(userInfo);
              })
              .catch((error) => {
                // Handle error saving user info to Firestore
                showStatusMessage('Error saving user info', 'error');
		        console.error('1 Firebase Auth Error:', error.code, error.message);

              });
          }
        })
        .catch((error) => {
          // Handle error checking user existence
          showStatusMessage('Error checking user existence', 'error');
		  console.error('2 Firebase Auth Error:', error.code, error.message);

        });
    })
    .catch((error) => {
      // Handle any errors that occurred during sign-in
	     console.error('3 Firebase Auth Error:', error.code, error.message);
 
      const errorCode = error.code;
      const errorMessage = error.message;
      showStatusMessage(errorMessage, 'error');
    localStorage.setItem('loggedIn', 'false'); // Set the authentication status in local storage
    });
};








window.signInWithGoogle = async function () {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;

    const nameArray = user.displayName.split(" ");
    const displayName = nameArray[0];
    const firebaseId = user.uid;

    showStatusMessage('Sign-in successful', 'success');
    console.log('User display name:', displayName);
    console.log('Firebase ID:', firebaseId);

    let userInfo = await checkAndRetrieveUserInfo(firebaseId, displayName, user.email, user.photoURL);

    console.log('userInfo ID:', userInfo);

    saveUserInfoToLocalStorage(userInfo);
    setLoggedInCookie();
    loggedIn = true;
    updateUserInfo(userInfo);
    checkUserInfoChanges();
    onAuthSuccess(userInfo);
  } catch (error) {
    handleSignInError(error);

	  
  }
};

async function checkAndRetrieveUserInfo(firebaseId, displayName, userEmail, userProfilePic) {
  const exists = await checkUserExistence(firebaseId);
  console.log('exists ID:', exists);

  if (exists) {
    return retrieveUserInfoFromFirestore(firebaseId);
  } else {
    return {
      userName: displayName,
      userEmail: userEmail,
      userProfilePic: userProfilePic,
      userTagLine: 'Unlock Your Knowledge Potential with Quizzatopia!',
      userRank: 'Beginner',
      userPoints: 0,
	userLoginType: 'Google',      
      userQuizzesTaken: 0,
      userCountry: '',
      userState: '',
      animationEnabled: true,
      userIP: ipAddress,
      userLatitude: 0,
      userLongitude: 0,
      firebaseId: firebaseId,
      lastUpdated: new Date().getTime(),
    };
  }
}

// Function to check if the user exists in Firestore
function checkUserExistence(firebaseId) {
  return new Promise((resolve, reject) => {
    // Implement the logic to check user existence in Firestore
    // Example code:
    firebase.firestore()
      .collection('users')
      .doc(firebaseId)
      .get()
      .then((doc) => {
        resolve(doc.exists);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Function to retrieve user info from Firestore
function retrieveUserInfoFromFirestore(firebaseId) {
  return new Promise((resolve, reject) => {
    // Implement the logic to retrieve user info from Firestore
    // Example code:
    firebase.firestore()
      .collection('users')
      .doc(firebaseId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject(new Error('User info not found'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}



// Function to save user info to Firestore
function saveUserInfoToFirestore(userInfo) {
  return new Promise((resolve, reject) => {
	      console.log(userInfo); // Log userInfo to the console

    firebase.firestore()
      .collection('users')
      .doc(userInfo.firebaseId)
      .set(userInfo)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}






// Function to save user info to local storage
function saveUserInfoToLocalStorage(userInfo) {
  // Implement the logic to save user info to local storage
  // Example code:
    console.log('saveUserInfoToLocalStorage');

  // Retrieve existing user info from local storage if it exists
  const existingUserInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY));

  // Merge the existing user info with the new user info
  const mergedUserInfo = { ...existingUserInfo, ...userInfo };

  // Save the merged user info to local storage
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(mergedUserInfo));
}








// Function to check if user info changes
function checkUserInfoChanges() {
  // Implement the logic to check if user info changes
  // Example code:

  // Retrieve the current user info from local storage
  const currentUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const previousUserInfo = JSON.parse(localStorage.getItem("previousUserInfo"));



  // Compare the current user info with the previous user info
  const hasUserInfoChanged = JSON.stringify(currentUserInfo) !== JSON.stringify(currentUserInfo);

  if (hasUserInfoChanged) {
    // User info has changed
    console.log('User info has changed');
	  saveUserInfoToFirestore(currentUserInfo); 

	previousUserInfo  = currentUserInfo;
	    localStorage.setItem("previousUserInfo", JSON.stringify(previousUserInfo));
  } else {
    // User info has not changed
    console.log('User info has not changed');
	  
	  
	  
  }
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
//    console.log('updateUserInfo');

  // Update user information in local storage
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));

  // Save updated user information to Firebase
  saveUserInfoToFirestore(userInfo);

  // Display updated user information
  displayUserInfo();
}












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


		
	
function SetupLoginBTNFunc(){
	
  // Get references to the buttons
  const loginButton = document.getElementById('loginButton');
  const signupButton = document.getElementById('signupButton');
  const googleButton = document.getElementById('googleButtonC');
  const facebookButton = document.getElementById('facebookButtonC');


}

		
	
async function onAuthSuccess(userInfo) {
  try {
    checkUserInfoChanges();
    loggedIn = true;
    setLoggedInCookie();

    console.log('Welcome, ' + userInfo.userName + '!');
    showStatusMessage('Welcome, ' + userInfo.userName + '!');

    updateNavBar();
    displayUserInfo();

    // Add a delay using a promise
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    await saveUserInfoToFirestore(userInfo);
    await delay(300); // Adjust the delay time as needed

    closePopup();
  } catch (error) {
    console.error(error);

  }
}





// Cache DOM elements for reuse
const resetPasswordForm = document.getElementById('resetPasswordForm');
const resetEmailInput = document.getElementById('resetEmail');

// Function to show the password reset form
function showResetPasswordForm() {
  resetPasswordForm.classList.remove('d-none');
}


// Function to reset the password
async function resetPassword() {
  const resetEmail = resetEmailInput.value;
  try {
    await firebase.auth().sendPasswordResetEmail(resetEmail);
    // Password reset email sent
    showStatusMessage('Password reset email sent', 'success');
    resetPasswordForm.classList.add('d-none');
  } catch (error) {
    // An error occurred while attempting to send the password reset email
    // Display an error message to the user
    showStatusMessage('Error sending password reset email: ' + error.message, 'error');
    console.error('Error sending password reset email:', error);
  }
}


// Handle sign-in errors
function handleSignInError(error) {
  showStatusMessage(error.message, 'error');
    localStorage.setItem('loggedIn', 'false'); // Set the authentication status in local storage
  console.error('Error signing in:', error);
}

// Display status message
function showStatusMessage(message, status) {
  const statusBar = document.getElementById('statusBar');
  const statusMessage = document.getElementById('statusMessage');
  statusMessage.textContent = message;
  statusBar.classList.remove('d-none', 'success', 'error');
  statusBar.classList.add(status);
}

// Clear status message
function clearStatusMessage() {
  const statusBar = document.getElementById('statusBar');
  statusBar.classList.add('d-none');
}


// Function to hide the status bar
function hideStatusBar() {
  const statusBar = document.getElementById('statusBar');
  statusBar.classList.add('d-none');
}

// Initialization
document.addEventListener('DOMContentLoaded', function () {
  displayUserInfo();
  SetupLoginBTNFunc(); // Call the setup function here
});



function logVisitorInformation(scrollInfo, location) {
  const currentTimestamp = new Date();
  const referralPage = document.referrer;
  const userAgentString = navigator.userAgent;

  const browserMatch = userAgentString.match(/(chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i);
  const browserName = browserMatch ? browserMatch[1] : 'Unknown Browser';
  const browserVersion = browserMatch ? browserMatch[2] : 'Unknown Version';

  const currentPage = getCurrentPage();

  const deviceMatch = userAgentString.match(/\(([^)]+)\)/);
  const deviceInfo = deviceMatch
    ? deviceMatch[1].split(';').map(part => part.trim())
    : ['Unknown Device', 'Unknown Browser'];

  const device = deviceInfo[0];
  const browser = deviceInfo[1];
      const lastVisitTime = currentTimestamp;
      const scrollDepth = scrollInfo || 0;
  const visitorIpPromise = getIPAddress(); // Retrieve the visitor's IP address as a promise

  let db;

  if (typeof db === 'undefined' || db === null || db === '') {
    db = firebase.firestore();
  }

   visitorIpPromise
    .then(visitorIp => {
      // Check if the visitor's IP is already logged in the "guestLog" collection
      const guestLogRef = db.collection('guestLog').doc(visitorIp);



      const logEntry = {
        lastVisitTime,
        currentPage: currentPage,
        scrollDepth,
        location:location || "",
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
      };

      guestLogRef
        .get()
        .then(doc => {
          if (doc.exists) {
            // Guest already exists
          const existingViewed = doc.data().viewed || [];
            existingViewed.push(logEntry);

            guestLogRef.update({
              viewed: existingViewed
            })
            .then(() => {
              console.log("Page view logged successfully.");
            })
            .catch(error => {
              console.error("Error logging page view:", error);
            });
          } else {
            // Create a new guest log entry
            const firstVisitTime = currentTimestamp;

            const guestData = {
              firstVisitTime,
              firstVisitPage: currentPage,
              referralPage,
              banned: 'NO',
              device,
              browser,
              viewed: [logEntry],
            };

            guestLogRef
              .set(guestData)
              .then(() => {
                console.log('New guest log created.');
              })
              .catch(error => {
                console.error('Error creating guest log:', error);
              });
          }
        })
        .catch(error => {
          console.error('Error checking guest log:', error);
        });
    })
    .catch(error => {
      console.error('Error retrieving visitor IP address:', error);
    });
}


/*
// Access different components of the URL
const protocol = currentUrl.protocol; // e.g., "https:"
const host = currentUrl.host; // e.g., "www.example.com"
const pathname = currentUrl.pathname; // e.g., "/path/to/resource"
const searchParams = currentUrl.searchParams; // Access query parameters/
*/

// Function to get current page URL (example implementation, you may need to customize this)
function getCurrentPage() {
  // Get the current page URL
  const currentPageURL = window.location.href;

  // Extract the part of the URL after the .com
  const afterDotCom = currentPageURL.split('.com')[1];

  // Remove leading slash if present
  const currentPage = afterDotCom.startsWith('/') ? afterDotCom.slice(1) : afterDotCom;

  // Return the current page
  return currentPage || "Home";
}


// Function to initialize the navbar toggler event






function getScrollDepth(){
// Define scroll depth thresholds
const fullPageThreshold = 100;
const halfPageThreshold = 50;
const quarterPageThreshold = 25;

// Attach a scroll event listener to the window
window.addEventListener('scroll', () => {
  // Calculate the scroll depth
  const scrollDepth = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

  // Determine the readable format
  let readableDepth;

  if (scrollDepth >= fullPageThreshold) {
    readableDepth = 'Full Page';
  } else if (scrollDepth >= halfPageThreshold) {
    readableDepth = 'Half Page';
  } else if (scrollDepth >= quarterPageThreshold) {
    readableDepth = 'Quarter Page';
  } else {
    readableDepth = 'Not Scrolled Much';
  }

  // Display the scroll depth in your UI
  console.log('Scroll Depth:', scrollDepth.toFixed(2) + '% (' + readableDepth + ')'); 

	return readableDepth;
});


}








	
if(loggedIn === true){
    // Check if user info changes
                checkUserInfoChanges();
}else{
	 // Call the logVisitorInformation function whenever you want to log the visitor's information
logVisitorInformation();
}

	const scrollDepth = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;


window.addEventListener('beforeunload', function(event) {

	

if(loggedIn === true){
    // Check if user info changes
                checkUserInfoChanges();
}else{
let scrollInfo = getScrollDepthlogVisitor();
logVisitorInformation(scrollInfo);
}
});



const ALLOWED_USER = "fM2CtVN59wNwrZeQZrSqlp4rUcr2";
const BACKEND_URL_PATTERN = /^\/backend(\/|$)/;

async function checkUserAndIP() {
  try {

	    const userInfo = getUserInfo();

    const user = userInfo.firebaseId;
	  
 console.log("Admin   " + user );
    if (!user || loggedIn === false) {
      // No authenticated user, handle accordingly (e.g., redirect to login page)
      console.log("No authenticated user");
      // redirectToLogin();
	// window.location.href = '/';

      return;
    }


if (user === ALLOWED_USER || uID === ALLOWED_USER) {
  console.log("Admin");
} else {
	          console.log("Not Admin");
       console.log("Admin   " + user + "|| " + uID);
     //   window.location.href = '/';
    }
  } catch (error) {
    console.error("Error while checking user authentication:", error);
    // Handle the error, e.g., redirect to an error page or display a message.
  }
}


 function redirectToLogin() {
    window.location.href = "/quizzes"; // Replace "/login" with the URL you want to redirect the user to
  }

  // Run the checkUserAndIP function when the page loads
  window.onload = function () {
    const currentURL = window.location.pathname;
    if (BACKEND_URL_PATTERN.test(currentURL)) {
      checkUserAndIP();
    }
  };

  // Function to get the current date in YYYY-MM-DD format
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }




function checkGuestUser(){
  // Check if the user's IP address is available in local storage
  getIPAddress().then((userIP) => {
    const currentDate = getCurrentDate();
    const storedData = JSON.parse(localStorage.getItem(ipAddress)) || { date: '', count: 0 };

    // If the stored date is not the same as the current date, reset the count
    if (storedData.date !== currentDate) {
      storedData.date = currentDate;
      storedData.count = 1;
    } else {
      storedData.count += 1;
    }

    // Store the updated count in local storage
    localStorage.setItem(ipAddress, JSON.stringify(storedData));


if(storedData.count > 100){
// Initialize Firebase Firestore
const db = firebase.firestore();

// Reference the 'questLog' collection and the document with the user's IP address
const questLogRef = db.collection('guestLog').doc(ipAddress);

// Update the 'banned' field to 'YES'
questLogRef.update({
 banned: 'YES'
})
.then(() => {
  console.log('Document updated successfully.');
})
.catch((error) => {
  console.error('Error updating document:', error);
});
}
	  
    // Check if the count exceeds 100 and redirect if needed
    if (storedData.count > 100) {
      window.location.href = 'https://www.google.com';
    }
  });
}
if (!loggedIn) {
 checkGuestUser();
}







// Log user movements
function logUserMovement(ipAddress, firebaseId, url) {
    const now = new Date();
if (typeof firebase !== 'undefined' && typeof firebase.firestore === 'function') {

  const db = firebase.firestore();
  const logEntry = {
    url,
    timestamp: now,
  };

  const usersRef = db.collection('users').doc(firebaseId);

  usersRef.get()
    .then(doc => {
      if (doc.exists) {
        // User already exists
        const existingViewed = doc.data().viewed || [];
        existingViewed.push(logEntry);

        usersRef.update({
          viewed: existingViewed
        })
        .then(() => {
          console.log("User movement logged successfully.");
        })
        .catch(error => {
          console.error("Error logging user movement:", error);
        });
      } else {
        // Create a new user entry
        const userData = {
          viewed: [logEntry]
        };

        usersRef.set(userData)
          .then(() => {
            console.log('New user entry created.');
          })
          .catch(error => {
            console.error('Error creating user entry:', error);
          });
      }
    })
    .catch(error => {
      console.error('Error checking user entry:', error);
    });
}
}


// Example: Log user movement when a page loads
window.addEventListener("load", () => {
		    const userInfo = getUserInfo();

    const firebaseId = userInfo.firebaseId;
    const currentUrl = input(window.location.href);
	
if (!firebaseId || uID !== ALLOWED_USER) {

    logUserMovement(ipAddress, firebaseId, currentUrl);
}
});

/*
*/





// Check if it's a bot and redirect to "/blocked"
function checkForBot() {
    const isBot = isBotUser(); // Implement your bot detection logic here

    if (isBot) {
      window.location.href = 'https://www.google.com';
    }
}

// Function to create a honeypot input field
function createHoneypotInput() {
    const honeypotInput = document.createElement("input");
    honeypotInput.type = "text";
    honeypotInput.name = "email"; // Use a name that bots may interact with
    honeypotInput.style.display = "none"; // Hide the input field using CSS
    honeypotInput.id = "honeypot"; // Add an ID to the honeypot input

    // Add the honeypot input to the body
    document.body.appendChild(honeypotInput);
}

// Event listener for the honeypot input
function honeypotListener() {
    const honeypotInput = document.getElementById("honeypot");

    honeypotInput.addEventListener("input", () => {
        // If the honeypot input receives any input, it's likely a bot
      window.location.href = 'https://www.google.com';
    });
}

// Add an event listener to check for bots when the document is ready
document.addEventListener("DOMContentLoaded", () => {
  //  checkForBot(); // Check for bots on page load
    createHoneypotInput(); // Create the honeypot input field
    honeypotListener(); // Add listener for honeypot input
});







function getBadWords() {
  const db = firebase.firestore();
  const settingsRef = db.collection('settings').doc('general');

  settingsRef.get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        const badWords = data.badWords || [];

        
        // Display or use the retrieved bad words array
        console.log('Retrieved Bad Words:', badWords);
	      return badWords;
      } else {
        console.log('No bad words found in the database.');
      }
    })
    .catch(error => {
      console.error('Error retrieving bad words:', error);
    });
}


var script = document.createElement('script');

// Set the script source to the DOMPurify CDN URL
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.3.3/purify.min.js';

// Append the script element to the document's head
document.head.appendChild(script);

// Import a list of bad words and profanity filter
//const badWords = getBadWords();
  const badWords = ['shit', 's h i t', 'queer', 'q u e e r', 'gay', 'pussy', 'dick', 'nigger', 'n i g g e r', 'nigga', 'damn', 'd a m n', 'God damn', 'fucking','fuck', 'f u c k', 'b i t c h', 'bitch', 'cum'];

function filterContent(content) {
  if (content == null) {
    return '';
  }

  // Convert content to a string if it's not already
let  trimmedStr = String(content);
 content = trimmedStr.trim();

  // Perform case-insensitive matching for bad words
  const caseInsensitiveBadWords = badWords.map((word) => word.toLowerCase());

  // Replace bad words with asterisks
  caseInsensitiveBadWords.forEach((word) => {
    const regex = new RegExp(`\\b(${escapeRegExp(word)})\\b`, 'gi');
    content = content.replace(regex, '***');
  });

  // Regular expression for matching contact information
  const contactInfoRegex = /\b(?:\d{10}|\d{3}[-.\s]\d{3}[-.\s]\d{4}|(?:\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})\b/g;

  // Replace contact information with asterisks
  content = content.replace(contactInfoRegex, '***');

content = sanitizeHTMLscript(content);

  // Sanitize HTML content to remove potentially harmful elements and attributes
  content = sanitizeHTML(content);

  return content;
}

// Sample HTML sanitizer function (replace with a more robust library in your implementation)
function sanitizeHTML(content) {
 const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const sanitizedContent = doc.body.textContent || doc.body.innerText;
  return content;
}
function sanitizeHTMLscript(html) {
  const cleanHTML = DOMPurify.sanitize(html);
  return cleanHTML;
}
/*
// Example usage:
const dirtyHTML = "<script>alert('XSS attack!')</script>";
console.log(sanitizedHTML);
*/

// Helper function to escape special characters in the word
function escapeRegExp(word) {
  return word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/*
// Example usage:
const userInput = "Hello, this is a muthafucking malicious <script>alert('Gotcha hoe ass!');</script> Bitch content!";
const filteredContent = filterContent(userInput);
console.log("filteredContent   "   +filteredContent);

*/

function input(text){

	let userInput = filterContent(text);
	return userInput;
}



		/*
function filterContent(content) {
	 if (content == null) {
    return ''; // Return an empty string if content is null or undefined
  } 

  // Array of bad words const badWords = getBadWords();
  const badWords = ['shit', 's h i t', 'queer', 'q u e e r', 'gay', 'pussy', 'dick', 'nigger', 'n i g g e r', 'nigga', 'damn', 'd a m n', 'God damn', 'fuck', 'f u c k', 'b i t c h', 'bitch', '.com', 'cum'];

  // Regular expression for matching contact information
  const contactInfoRegex = /\b(?:\d{10}|\d{3}[-.\s]\d{3}[-.\s]\d{4}|(?:\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})\b/g;

  // Replace bad words with asterisks
  badWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    content = content.replace(regex, '***');
  });

  // Replace contact information with asterisks
  content = content.replace(contactInfoRegex, '***');

// Remove HTML tags for additional safety
  const tempElement = document.createElement('div');
  tempElement.innerHTML = content;
  content = tempElement.textContent || tempElement.innerText;

  // Prevent script injection by removing JavaScript event handlers
  if (typeof content === 'string') {
    content = content.replace(/<[^>]+? on\w+="[^"]*"[^>]*>/gi, (match) => {
      return match.replace(/ on\w+="[^"]*"/gi, '');
    });
  }
  return content;
}
		

*/












		//    console.log("  ?????????????????????????  outside  ^   LateLoad.js ^   ????????????????????????999        ");
