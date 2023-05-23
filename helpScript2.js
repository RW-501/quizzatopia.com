

fetch('/elements/navbar2.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('#navbar').innerHTML = data;



      const navUserInfo = JSON.parse(localStorage.getItem("userInfo"));
 console.log('navUserInfo.profilePic 1 ', navUserInfo.profilePic);
  document.getElementById('profile-pic').src = navUserInfo.profilePic;
   
// Check if user is logged in
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is logged in
    document.getElementById('navLoggedin').innerHTML = "<button onclick=\"logOutFunction()\">Log Out</button>";
  } else {
    // User is not logged in
    document.getElementById('navLoggedin').innerHTML = "<button onclick=\"openPopup()\">Log In</button>";
  }
});

// Log out function
function logOutFunction() {
  firebase.auth().signOut().then(function() {
    // Log out successful
    console.log("User logged out.");
  }).catch(function(error) {
    // An error occurred
    console.log("Error logging out:", error);
  });
}

	
    $(document).ready(function() {
      console.log($('.navbar-toggler'));
      $('.navbar-toggler').click(function() {
        $('#navbarNav').toggleClass('collapse');
      });
    });
  });

fetch('/elements/footer2.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('#mainFooter').innerHTML = data;
});



  
