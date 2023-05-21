
  
<!-- Script tag to link the auth.js file -->
<script src="/auth/auth.js"></script>
  
  <div id="loginPopup" class="popup">
    <div class="popup-content">
      <div class="close-btn">
        <button onclick="closePopup()">Close</button>
      </div>
      <div class="tabs">
        <button onclick="switchTab('login')">Log In</button>
        <button onclick="switchTab('signup')">Sign Up</button>
      </div>
      <div id="loginTab" class="tab-content">
        <h2>Log In</h2>
        <form id="loginForm">
          <input type="email" id="email" placeholder="Email" required>
          <input type="password" id="password" placeholder="Password" required>
          <button type="submit">Log In</button>
        </form>
        <div class="social-login">
          <button onclick="signInWithGoogle()">Log In with Google</button>
          <button onclick="signInWithFacebook()">Log In with Facebook</button>
        </div>
      </div>
      <div id="signupTab" class="tab-content">
        <h2>Sign Up</h2>
        <form id="signupForm">
          <input type="text" id="username" placeholder="Username" required>
          <input type="email" id="email" placeholder="Email" required>
          <input type="password" id="password" placeholder="Password" required>
          <button type="submit">Sign Up</button>
        </form>
        <div class="social-login">
          <button onclick="signInWithGoogle()">Sign Up with Google</button>
          <button onclick="signInWithFacebook()">Sign Up with Facebook</button>
        </div>
      </div>
    </div>
  </div>
  
