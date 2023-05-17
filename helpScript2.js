

fetch('/elements/navbar2.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('#navbar').innerHTML = data;

	
	
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


