    <link rel="import" href="./js/load.js" >


fetch('./elements/navbar.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('#navbar').innerHTML = data;

	
			    function displayUserInfoNav() {
  const userInfo = getUserInfo();
//  document.getElementById('userNameQ').innerHTML = userInfo.userName;
//  document.getElementById('profile-name').innerHTML = userInfo.rank;
//  document.getElementById('userPointsQ').innerHTML = userInfo.points;
          
  document.getElementById('profile-pic').src = userInfo.profilePic;

  // Display additional user information as needed
}
		    
		    displayUserInfoNav();

	
	
    $(document).ready(function() {
      console.log($('.navbar-toggler'));
      $('.navbar-toggler').click(function() {
        $('#navbarNav').toggleClass('collapse');
      });
    });
  });

fetch('./elements/footer.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('#mainFooter').innerHTML = data;
});


	
