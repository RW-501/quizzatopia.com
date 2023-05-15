
 const USER_INFO_KEY = 'userInfo';
  const USER_NAME_KEY = 'userName';
  const PROFILE_PIC_KEY = 'profilePic';
const RANK_KEY = 'rank';
const POINTS_KEY = 'points';
const QUIZZES_TAKEN_KEY = 'quizzesTaken';
// Add more keys for additional user information as needed
  
  
  function getUserInfo() {
  let userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY));
  if (!userInfo) {
    userInfo = {
      userName: 'John Doe',
      profilePic: '/images/pics/2.png',
      rank: 'Rookie',
      points: 0,
      quizzesTaken: 0
      // Add more properties for additional user information as needed
    };
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  }
  return userInfo;
}

  
  
  
    function displayUserInfo() {
    const userInfo = getUserInfo();
    console.log('Rank:', userInfo.rank);
    console.log('Points:', userInfo.points);
    console.log('Quizzes Taken:', userInfo.quizzesTaken);

    // Display additional user information as needed
    const profilePicElement = document.getElementById('profile-pic');
    const profileNameElement = document.getElementById('profile-name');

    if (userInfo[PROFILE_PIC_KEY]) {
      profilePicElement.src = userInfo[PROFILE_PIC_KEY];
    }

    if (userInfo[USER_NAME_KEY]) {
      profileNameElement.textContent = userInfo[USER_NAME_KEY];
    }
  }
  
  
  
      displayUserInfo();
