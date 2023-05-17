

fetch('/elements/navbar2.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('#navbar').innerHTML = data;



      const navUserInfo = JSON.parse(localStorage.getItem("userInfo"));
 console.log('navUserInfo.profilePic 1 ', navUserInfo.profilePic);
  document.getElementById('profile-pic').src = navUserInfo.profilePic;
   


	
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


      const navUserInfo = JSON.parse(localStorage.getItem("userInfo"));
 console.log('navUserInfo.profilePic 2 ', navUserInfo.profilePic);
  document.getElementById('profile-pic').src = navUserInfo.profilePic;
   

  
