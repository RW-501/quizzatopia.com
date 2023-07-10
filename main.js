
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

   overlay.classList.add("loaded");




	
setTimeout(function() {
// const overlay = document.getElementById('overlay'); // Assuming the overlay element has the ID "overlay"
	  	  console.log('setTimeout 3');
 overlay = document.getElementById('overlay'); // Assuming the overlay element has the ID "overlay"
  if (overlay) {
	overlay.remove();  
overlay.style.display = 'none'; // Hide the overlay if it exists

  }
    document.documentElement.scrollTop = 0; // For modern browsers
  document.body.scrollTop = 0; // For older browsers
	
}, 3000); // Delay in milliseconds before removing the overlay

}


window.addEventListener("load", function() {

	
loadScreenFunc();

});



window.onload = function() {
  var script = document.createElement('script');
  script.src = '/elements/lateLoad.js';
  document.head.appendChild(script);

  script.onload = function() {
    lateLoad();
  };
};




function setLoggedInCookie() {
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 3);

  document.cookie = "loggedIn=true; expires=" + expirationDate.toUTCString() + "; path=/";
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



  var userDashboard;


	  let navbarPath, footerPath;

// Function to fetch and insert HTML based on the page level
function fetchAndInsertContent() {

  if (currentPagePath === '/' || currentPagePath === '/index.html') {
    navbarPath = './elements/navbar.html';
    footerPath = './elements/footer.html';
  } else {
    navbarPath = '/elements/navbar2.html';
    footerPath = '/elements/footer2.html';   
	  
  }

	

  fetch(navbarPath)
    .then(response => response.text())
    .then(data => {
      document.querySelector('#navbar').innerHTML = data;
      initializeNavbarToggler();
    });

}
	








function displayUserInfo() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

	
  const profilePicElement = document.getElementById('profile-pic');
  if (profilePicElement) {
    profilePicElement.src = userInfo.userProfilePic;
  }

  const taglineElement = document.getElementById('tagline');
  if (taglineElement) {
    taglineElement.textContent = userInfo.userTagLine;
  }




	
userDashboard = document.getElementById("user-dashboard");



if (loggedIn === true && userDashboard !== null) {
//  console.log("userDashboard !== null");
  userDashboard.innerHTML = "Dashboard"; // Clear previous content and set to "Dashboard"
} else {
  if (userDashboard !== null) {

    userDashboard.innerHTML = "Login"; // Clear previous content and set to "Login"
  }
}

	

}






	






let pointsRewards;














// Function to check if a badge has been earned


































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
	
// Enable Firestore offline persistence
firebase.firestore().enablePersistence()
  .then(() => {
    // Offline persistence enabled
	//  const savedUserInfoDB = localStorage.getItem("userInfo");
  const savedUserInfoDB = getUserInfo();

	saveUserInfoToFirestore(savedUserInfoDB);
  })
  .catch((error) => {
    // Error enabling offline persistence
    console.error('Error enabling Firestore offline persistence:', error);
  });


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




}

		 // Get a reference to the Firestore database
//  const db = firebase.firestore();

  // Create a collection called "users" (if it doesn't exist already)
  //const usersCollection = db.collection('users');



// Function to retrieve user location using a geolocation API
var locationV;

function getUserLocation(ipAddress) {
  const USER_INFO_KEY = 'user_location';

}




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

	
function viewDashboard() {
 
	if (loggedIn === true) {		
  window.location.href = '/user/';
	}else{
      // Show the login popup
     			slideIn("loginPopupBody");
openPopup();switchTab('login');

	}
}
		



// Function to initialize the navbar toggler event


function initializeNavbarToggler() {
       const loggedInDiv = document.getElementById('navLoggedin');
    const navbarNav = document.querySelector('#navbarNav')
	
	navbarNav.classList.add('collapse');

	const userInfo = getUserInfo();
	
    document.getElementById('profile-pic').src = userInfo.userProfilePic;

    console.log('userInfo firebaseId:', userInfo.firebaseId);

	  updateNavBar();
	  displayUserInfo();
	
 // Call the logVisitorInformation function whenever you want to log the visitor's information
logVisitorInformation();

}




// Call the function to fetch and insert the HTML based on the page level
document.addEventListener('DOMContentLoaded', function() {
  fetchAndInsertContent();
	 //   console.log('DOMContentLoaded 1296 :   ');

});





 document.addEventListener('click', function(event) {
  const navbar = document.getElementById('navbar');
    const navbarNav = document.querySelector('#navbarNav');
	 if (!navbarNav.classList.contains('show')) {
    if (!navbar.contains(event.target)) {
navbarNav.classList.remove('show'); 
    }
  }
});










// Log out function
function logOutFunction() {
  firebase.auth().signOut().then(function() {
    // Log out successful
      // Set the logged-in cookie
      document.cookie = 'loggedIn=false';
	  loggedIn = false;
	  console.log("User logged out.");
	  updateNavBar();
	  
	window.location.href = '/';
	   var navbarNav = document.querySelector('#navbarNav');
//  navbarNav.classList.toggle('collapse');
  }).catch(function(error) {
    // An error occurred
    console.log("Error logging out:", error);
  });
	  displayUserInfo();

}


  function updateNavBar() {
    // Check if user is logged in
    if (loggedIn === true) {
      // User is logged in
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
      // User is not logged in
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
 





//	const db = firebase.firestore();

// 

function logVisitorInformation() {
  const currentTimestamp = new Date();
  const referralPage = document.referrer;
  const userAgentString = navigator.userAgent;

  const browserMatch = userAgentString.match(/(chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i);
  const browserName = browserMatch[1];
  const browserVersion = browserMatch[2];

  // Extract device information using regular expressions
  const deviceMatch = userAgentString.match(/\(([^)]+)\)/);
  const deviceInfo = deviceMatch[1].split(';').map(part => part.trim());
  const device = deviceInfo[0];
  const browser = deviceInfo[1];

  const visitorIpPromise = getIPAddress(); // Retrieve the visitor's IP address as a promise

	let db;
	
if (typeof db === 'undefined' || db === null || db === '' ) {
	 db = firebase.firestore();

} 
	
  visitorIpPromise.then(visitorIp => {
    // Check if the visitor's IP is already logged in the "guestLog" collection
    db.collection('guestLog').doc(visitorIp).get()
      .then(doc => {
        if (doc.exists) {
          const lastVisitTime = currentTimestamp;
          const lastVisitPage = getCurrentPage();

          db.collection('guestLog').doc(visitorIp).update({
            lastVisitTime,
            lastVisitPage
          })
            .catch(error => {
              console.error('Error updating guest log:', error);
            });

          // Increment the user visit count
          const userVisitCountRef = db.collection('guestLog').doc(visitorIp).collection('userVisitCount').doc('count');
          userVisitCountRef.get()
            .then(doc => {
              if (doc.exists) {
                const previousCount = doc.data().count;
                const updatedCount = previousCount + 1;
                userVisitCountRef.update({ count: updatedCount })
                  .catch(error => {
                    console.error('Error updating user visit count:', error);
                  });
              } else {
                // Initialize the user visit count if it doesn't exist
                userVisitCountRef.set({ count: 1 })
                  .catch(error => {
                    console.error('Error initializing user visit count:', error);
                  });
              }
            })
            .catch(error => {
              console.error('Error retrieving user visit count:', error);
            });
        } else {
          // Create a new visitor log entry
          const firstVisitTime = currentTimestamp;
          const lastVisitTime = currentTimestamp;
          const firstVisitPage = getCurrentPage();
          const lastVisitPage = getCurrentPage();
          const banned = 'NO';
          const userVisitCount = 1;

          db.collection('guestLog').doc(visitorIp).set({
            firstVisitTime,
            lastVisitTime,
            firstVisitPage,
            lastVisitPage,
            referralPage,
            userVisitCount,
            banned,
            device,
            browser
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



// Function to get current page URL (example implementation, you may need to customize this)
function getCurrentPage() {
  // Get the current page URL
  const currentPageURL = window.location.href;

  // Extract the part of the URL after the .com
  const afterDotCom = currentPageURL.split('.com')[1];

  // Remove leading slash if present
  const currentPage = afterDotCom.startsWith('/') ? afterDotCom.slice(1) : afterDotCom;

  // Return the current page
  return currentPage;
}

















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
 slideIn("loginPopupBody");

}
     // Check if user info changes
                checkUserInfoChanges();

		    console.log("  ?????????????????????????    ^   Main.js ^   ????????????????????????999        ");

