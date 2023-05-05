


$(document).ready(function(){
    $('.navbar-toggler').click(function(){
        $('#navbarNav').toggleClass('collapse');
    });
});

fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('#navbar').innerHTML = data;
  });
