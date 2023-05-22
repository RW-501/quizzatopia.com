
	
	
	
	  function openPopup() {
    // Function implementation goes here
  document.getElementById('loginPopup').classList.remove('d-none');

  }



// Function to close the login/signup popup
function closePopup() {
  document.getElementById('loginPopup').classList.add('d-none');
}

// Function to switch between login and signup tabs
function switchTab(tabName) {
  document.getElementById('loginTab').style.display = tabName === 'login' ? 'block' : 'none';
  document.getElementById('signupTab').style.display = tabName === 'signup' ? 'block' : 'none';
}

	
