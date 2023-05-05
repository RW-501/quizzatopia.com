

fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('#navbar').innerHTML = data;

    $(document).ready(function() {
      console.log($('.navbar-toggler')); // add this line
      $('.navbar-toggler').click(function() {
        $('#navbarNav').toggleClass('collapse');
      });
    });
  });
