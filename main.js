function loadScreenFunc(){
// Create the <style> element
var styleElement = document.createElement("style");

// Set the CSS styles
var cssStyles = `
  /* CSS styles for the overlay and loader */

  html{
width: 100% !important;
  }
  body{
width: 100% !important;
  }
  
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
    border-top-color: #ff8c00;
    animation: loader-spin 1s infinite linear;
  }

  @keyframes loader-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }

.btnFX {
  /* Default styles */

  transition: background-color 0.3s ease;

  /* Hover effect */
  &:hover {
    background-color: #ff0000;
  }

  /* Click effect */
  &:active {
    transform: scale(0.95);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  /* Custom animation */
  animation: fade-in 0.5s ease-in-out forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}





    
  }
`;
/*
div.loading-icon {
    color: #646569;
    overflow: visible;
    width: 49px;
    height: 49px;
    max-width: 49px;
    max-height: 49px;
    margin: 0 auto;
    border-radius: 50%;
    border-top-color: #646569;
    border-left-color: #646569;
    border-right-color: #646569;
    box-shadow: 3px 3px 1px #646569;
    -moz-animation: cssload-spin 690ms infinite linear;
    -o-animation: cssload-spin 690ms infinite linear;
    -webkit-animation: cssload-spin 690ms infinite linear;
    animation: cssload-spin 690ms infinite linear;
}

*/
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

   overlay.classList.add("loaded");


	  	  console.log('Load');




}




	
// Function to remove the overlay with a timer (3 seconds delay)
function removeOverlayWithTimer() {
  setTimeout(function() {
    console.log('removeOverlayWithTimer overlay ???');
    const overlay = document.getElementById('overlay'); // Assuming the overlay element has the ID "overlay"
    if (overlay) {
      overlay.remove();
      overlay.style.display = 'none'; // Hide the overlay if it exists
      console.log('overlay Removed');
    }
    document.documentElement.scrollTop = 0; // For modern browsers
    document.body.scrollTop = 0; // For older browsers
  }, 3000); // Delay in milliseconds before removing the overlay
}

// Function to remove the overlay immediately without a timer
function removeOverlayWithoutTimer() {
  console.log('removeOverlayWithoutTimer overlay ???');
  const overlay = document.getElementById('overlay'); // Assuming the overlay element has the ID "overlay"
  if (overlay) {
    overlay.remove();
    overlay.style.display = 'none'; // Hide the overlay if it exists
    console.log('overlay Removed');
  }
  document.documentElement.scrollTop = 0; // For modern browsers
  document.body.scrollTop = 0; // For older browsers
}

	
loadScreenFunc();



// Function to revert images back to normal resolution
function revertImagesToNormalResolution() {
  // Select all <img> elements on the page
  const images = document.querySelectorAll('img');

  // Iterate over each image
  images.forEach(function(image) {
    // Check if the image has a stored original source URL
    if (image.dataset.originalSrc) {
      // Set the original source URL back to the image
      image.src = image.dataset.originalSrc;

      // Clear the data attribute
      delete image.dataset.originalSrc;

      // Log the resolution value
      console.log('Image is high resolution:', image.width, image.height);
    }
  });
}

// Call the function to convert images to low resolution when the page has finished loading
//window.onload = function() {
  convertImagesToLowResolution();
  console.log('Start high resolution: ???');
//};

// Example usage to revert images back to normal resolution after some event
// Call revertImagesToNormalResolution() when needed
// For example, on a button click or after a certain time period
setTimeout(function() {
  revertImagesToNormalResolution();
  console.log('End high resolution: ???');
}, 10000);  // Revert after 5 seconds (adjust the duration as needed)





// Function to convert images to low resolution
function convertImagesToLowResolution() {
  // Select all <img> elements on the page
  const images = document.querySelectorAll('img');

  // Iterate over each image
  images.forEach(function(image) {
    // Store the original source URL in a data attribute
    image.dataset.originalSrc = image.src;

    // Create a new <canvas> element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set the canvas dimensions to match the image dimensions
    canvas.width = image.width;
    canvas.height = image.height;

    // Create an ImageBitmap object from the original image
    createImageBitmap(image)
      .then(function(bitmap) {
        // Draw the ImageBitmap on the canvas with lower resolution
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

        // Set the canvas image data as the new image source
        image.src = canvas.toDataURL();

        // Log the resolution value
        console.log('Image is low resolution:', image.width, image.height);
      })
      .catch(function(error) {
        console.error('Error converting image to low resolution:', error);
      });
  });
}

// Function to revert images back to normal resolution
function revertImagesToNormalResolution() {
  // Select all <img> elements on the page
  const images = document.querySelectorAll('img');

  // Iterate over each image
  images.forEach(function(image) {
    // Check if the image has a stored original source URL
    if (image.dataset.originalSrc) {
      // Set the original source URL back to the image
      image.src = image.dataset.originalSrc;

      // Clear the data attribute
      delete image.dataset.originalSrc;

      // Log the resolution value
      console.log('Image is high resolution:', image.width, image.height);
    }
  });
}





// Function to set the loggedIn cookie with a 3-day expiration date
function setLoggedInCookie() {
    localStorage.setItem('loggedIn', 'true'); // Set the authentication status in local storage
    loggedIn = true;
}




function isLoggedIn() {
  const loggedInStatus = localStorage.getItem('loggedIn');
  return loggedInStatus;
}



var loggedIn = false;
// Example usage of getCookieValue with a callback

var cookieValue = localStorage.getItem('loggedIn');
	
if (cookieValue === 'true') {
    // User is logged in
    console.log('User is logged in');
    loggedIn = true;
  } else {
    // User is not logged in
    console.log('User is not logged in');
    loggedIn = false;
  }






function logOutFunction() {
  firebase.auth().signOut().then(function() {
    localStorage.setItem('loggedIn', 'false'); // Set the authentication status in local storage
    loggedIn = false;

    var navbarNav = document.querySelector('#navbarNav');
    navbarNav.classList.toggle('collapse');
    updateNavBar();

    displayUserInfo();
    console.log(" openPopup:");

    const cookieValue = getCookieValue('loggedIn');
    console.log(" cookieValue: "+cookieValue);

    if (cookieValue === 'false') {
      // Add a timeout before redirecting
      setTimeout(function() {
      console.log("User logged out.");
        window.location.href = '/';
      }, 3000); // Adjust the delay time as needed
    }else{

logOutFunction();

    }
  }).catch(function(error) {
    // An error occurred
    console.log("Error logging out:", error);
  });
}







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
      userState: '',
      userLongitude: '',
      userLatitude: '',
      userCountry: '',
      userProfilePic: '/images/avatar/w1.png',
      userTagLine: 'Unlock Your Knowledge Potential with Quizzatopia!',
      userRank: 'Beginner',
      userPoints: 0,
      userQuizzesTaken: 0,
 animationEnabled: true,
              userIP: ipAddress,
	    userAds: ''
    };
console.log('userInfo main: ', userInfo);
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  }

  cachedUserInfo = userInfo;
  return userInfo;
}

// Global variables
let pointsRewards;
var userDashboard;
let navbarPath, footerPath;
const currentPagePath = window.location.pathname;
//console.log("currentPagePath:", currentPagePath);








const restrictedPathsRegex = /^(\/user\/|\/backend\/|\/friends\/|\/challenge\/)/;
  setTimeout(function() {
if (loggedIn === false && restrictedPathsRegex.test(currentPagePath)) {
  console.log('Redirecting to homepage...');
 window.location.href = '/';
} 
      }, 3000); // Adjust the delay time as needed





function isQuizURL(url) {
  const pattern = /quizzatopia\.com\/quiz\/.*/;
  return pattern.test(url);
}
const currentURL = window.location.href;

if(isQuizURL(currentURL)){
removeOverlayWithoutTimer();	
}else{
removeOverlayWithTimer();
}




// Function to fetch and insert HTML based on the page level
function fetchAndInsertContent() {
  // Determine the path of the navbar HTML based on the current page
  if (currentPagePath === '/' || currentPagePath === '/index.html') {
    navbarPath = './elements/navbar.html';
  } else {
    navbarPath = '/elements/navbar2.html';
  }

  // Fetch the navbar HTML and insert it into the page
  fetch(navbarPath)
    .then(response => response.text())
    .then(data => {
      document.querySelector('#navbar').innerHTML = data;
      initializeNavbarToggler();
    });
}
let uID ;


// Function to initialize the navbar toggler and update user-related elements
function initializeNavbarToggler() {
  const loggedInDiv = document.getElementById('navLoggedin');
  const navbarNav = document.querySelector('#navbarNav');
  navbarNav.classList.add('collapse');

if(loggedIn === true){	
  const userInfo = getUserInfo();

  // Set user profile picture and log the Firebase ID to the console
  document.getElementById('profile-pic').src = userInfo.userProfilePic;
  console.log('userInfo firebaseId:', userInfo.firebaseId);
 uID = userInfo.firebaseId;
}	
  // Update the navigation bar elements based on login status
  updateNavBar();
  displayUserInfo();

}
const userID = uID;

// Function to display user information fetched from local storage
function displayUserInfo() {
	
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
 userDashboard = document.getElementById("user-dashboard");

  if (loggedIn === true && userDashboard !== null) {
	  
  const profilePicElement = document.getElementById('profile-pic');
  if (profilePicElement) {
    profilePicElement.src = userInfo.userProfilePic;
  }

  const taglineElement = document.getElementById('tagline');
  if (taglineElement) {
    taglineElement.textContent = userInfo.userTagLine;
  }

 
    userDashboard.innerHTML = "Dashboard"; // Clear previous content and set to "Dashboard"
  } else {
    if (userDashboard !== null) {
      userDashboard.innerHTML = "Login"; // Clear previous content and set to "Login"
    }
  }
}

// Function to update the navigation bar based on login status
function updateNavBar() {
  // Check if the user is logged in
  if (loggedIn === true) {
    // User is logged in, show logout button
    document.getElementById('navLoggedin').innerHTML = '<div onclick="logOutFunction()">Log Out</div>';

    var navLoggedinElement = document.getElementById('navLoggedin');
    if (!navLoggedinElement) {
      // Create the navLoggedin element if it doesn't exist
      navLoggedinElement = document.createElement('div');
      navLoggedinElement.id = 'navLoggedin';
      // Append the new element to the appropriate parent element in your HTML markup
      // For example, if it should be part of a navigation bar, find the parent element of the navigation bar and append it there.
      var parentElement = document.getElementById('auth-buttons');
      parentElement.appendChild(navLoggedinElement);
      navLoggedinElement.innerHTML = '<div onclick="logOutFunction()">Log Out</div>';
    }
  } else {
    // User is not logged in, show login button
    document.getElementById('navLoggedin').innerHTML = '<div onclick="viewDashboard();">Log In</div>';

    var navLoggedinElement = document.getElementById('navLoggedin');
    if (!navLoggedinElement) {
      // Create the navLoggedin element if it doesn't exist
      navLoggedinElement = document.createElement('div');
      navLoggedinElement.id = 'navLoggedin';
      // Append the new element to the appropriate parent element in your HTML markup
      // For example, if it should be part of a navigation bar, find the parent element of the navigation bar and append it there.
      var parentElement = document.getElementById('auth-buttons');
      parentElement.appendChild(navLoggedinElement);
      navLoggedinElement.innerHTML = '<div onclick="viewDashboard();">Log In</div>';
    }
  }
}

// Event listener to close the navbar dropdown when clicking outside of it
document.addEventListener('click', function(event) {
  const navbar = document.getElementById('navbar');
  const navbarNav = document.querySelector('#navbarNav');
  if (!navbarNav.classList.contains('show')) {
    if (!navbar.contains(event.target)) {
      navbarNav.classList.remove('show');
    }
  }
});

// Function to toggle the navbar
function navbarToggler() {
  var navbarNav = document.querySelector('#navbarNav');
  navbarNav.classList.toggle('collapse');
}

// Call the function to fetch and insert the HTML based on the page level when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  fetchAndInsertContent();
});

































function loadDB(){


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
	
/*
 // Enable Firestore offline persistence
    if (firebase.firestore().enablePersistence) {
      firebase.firestore().enablePersistence({ synchronizeTabs: false })
        .catch((err) => {
          console.error("Error enabling Firestore offline persistence:", err);
        });
    }
*/	
} else {
  // The Firebase scripts are not loaded
  // Handle the situation accordingly
  console.log('Firebase scripts not found.');

	  const firebaseAppScript = document.createElement('script');
  firebaseAppScript.src = 'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js';

  const firestoreScript = document.createElement('script');
  firestoreScript.src = 'https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js';

  const firebaseAuthScript = document.createElement('script');
  firebaseAuthScript.src = 'https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js';

  // Append the scripts to the <head> or <body> section of your HTML
  document.head.appendChild(firebaseAppScript);
  document.head.appendChild(firestoreScript);
  document.head.appendChild(firebaseAuthScript);


	loadDB();


}


}
	loadDB();

      var userRegion ="";
      var userCountry ="";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
 //   alert("Geolocation is not supported by this browser.");
  }
}

function onSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Now that you have the latitude and longitude, you can proceed with reverse geocoding.
  reverseGeocode(latitude, longitude);
}

function onError(error) {
//  alert("Error occurred while trying to get your location.");
}

async function reverseGeocode(latitude, longitude) {
  try {
    // Fetch the state data from the provided URL
    const response = await fetch("https://www.quizzatopia.com/geo/usa_states.json");
    const stateData = await response.json();

    // Filter the "stateData" to find the state based on latitude and longitude
    const stateInfo = stateData.find(
      (data) => data.latitude === latitude && data.longitude === longitude
    );

    if (stateInfo) {
       userRegion = stateInfo.region;
       userCountry = stateInfo.country;
      console.log("region:", region);
      console.log("country:", country);
	    
      // Now you have the state information based on the latitude and longitude.
      // You can use this state data for further processing.
    } else {
      console.log("State not found for the given coordinates.");
    }
  } catch (error) {
    console.error("Error while performing reverse geocoding:", error);
  }
}


//getLocation();



 var ipAddress = '';

async function getIPAddress() {
  // This approach uses a third-party API to fetch the user's IP address
  if (ipAddress === '') {
    return fetch('https://api.ipify.org')
      .then(response => response.text())
      .then(data => {
        // Extract the IP address from the response
        ipAddress = data.trim();
        console.log("IP Address:", ipAddress);

        return ipAddress;
      })
      .catch(error => {
        console.error('Error:', error);
        return null;
      });
  } else {
    return ipAddress;
  }
}

getIPAddress();








	










function slideIn(xxx,zzz) {
  var myDiv = document.getElementById(xxx);
	if(zzz === "right"){
  var keyframes = [
    { transform: "translateX(100%)" },
    { transform: "translateX(0)" }
  ];

	}else{
  var keyframes = [
    { transform: "translateX(-100%)" },
    { transform: "translateX(0)" }
  ];

	}
  var options = {
    duration: 500,
    easing: "ease"
  };
  myDiv.animate(keyframes, options);
}

function slideOut(xxx,zzz) {
  var myDiv = document.getElementById(xxx);
		if(zzz === "right"){
  var keyframes = [
    { transform: "translateX(0)" },
    { transform: "translateX(100%)" }
  ];
		}else{
  var keyframes = [
    { transform: "translateX(0)" },
    { transform: "translateX(-100%)" }
  ];
		}
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


		function elementExists(elementId) {
  const element = document.getElementById(elementId);
  return element !== null;
}
		  
if (elementExists('loginPopup')) {
  // The element exists, you can proceed with accessing it
    openPopup();
}
 



document.addEventListener('DOMContentLoaded', function() {
  var script = document.createElement('script');
  script.src = '/elements/lateLoad.js';
  document.head.appendChild(script);

  script.onload = function() {
    lateLoad();
	  		//    console.log("  ?????????     Next    ??????????999        ");

  };
});




		 //   console.log("  ?????????????????????????    ^   Main.js ^   ????????????????????????999        ");

