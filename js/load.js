
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
    //console.log('Rank:', userInfo.rank);
   // console.log('Points:', userInfo.points);
 //   console.log('Quizzes Taken:', userInfo.quizzesTaken);

    // Display additional user information as needed
    //const profilePicElement = document.getElementById('profile-pic').src;
    const profileNameElement = document.getElementById('profile-name');

    if (userInfo[PROFILE_PIC_KEY]) {
     // profilePicElement.src = userInfo[PROFILE_PIC_KEY];
    }

    if (userInfo[USER_NAME_KEY]) {
    //  profileNameElement.textContent = userInfo[USER_NAME_KEY];
    }
  }
  
  function updateRank(rank) {
  const userInfo = getUserInfo();
  userInfo.rank = rank;
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
}

function updatePoints(points) {
  const userInfo = getUserInfo();
  userInfo.points += points;
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
}

function updateQuizzesTaken(quizzesTaken) {
  const userInfo = getUserInfo();
  userInfo.quizzesTaken += quizzesTaken;
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
}
  
      displayUserInfo();


  let pointsRewards;



function updatePointsAndRank() {
  const userInfo = getUserInfo();

  if (userInfo.points <= 100) {
    updateRank('Beginner');
    pointsRewards = 2;
  } else if (userInfo.points > 100 && userInfo.points < 250) {
    updateRank('Novice');
    pointsRewards = 3;
  } else if (userInfo.points >= 250 && userInfo.points < 500) {
    updateRank('Enthusiast');
    pointsRewards = 4;
  } else if (userInfo.points >= 500 && userInfo.points < 1000) {
    updateRank('Prodigy');
    pointsRewards = 5;
  } else if (userInfo.points >= 1000 && userInfo.points < 2500) {
    updateRank('Expert');
    pointsRewards = 6;
  } else if (userInfo.points >= 2500 && userInfo.points < 5000) {
    updateRank('Master');
    pointsRewards = 7;
  } else if (userInfo.points >= 5000 && userInfo.points < 10000) {
    updateRank('Grandmaster');
    pointsRewards = 8;
  } else {
    updateRank('Ultimate Grandmaster');
    pointsRewards = 9;
  }

  // Update the user's points rewards
 //userInfo.pointsRewards = pointsRewards;
 // saveUserInfo(userInfo);
}

