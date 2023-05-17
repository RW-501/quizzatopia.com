





fetch('./elements/navbar.html')
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

fetch('./elements/footer.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('#mainFooter').innerHTML = data;
});


	/* Reset styles */
      html {
        user-select: none;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
  
  transition-duration: 0.5s; /* 500 milliseconds */
  transition-timing-function: ease-in-out;
}

      /* Global styles */
      html {
        height: 100%;
      }

      body {
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
  
    width: 100% !important;
      }

#footer_XL {
  flex-shrink: 0;
}
      .container {
        flex: 1;
      }

