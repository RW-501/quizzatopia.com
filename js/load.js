
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



// Function to check if a badge has been earned
function hasEarnedBadge(badgeId) {
  const earnedBadges = JSON.parse(localStorage.getItem('earnedBadges')) || [];
  return earnedBadges.includes(badgeId);
}






function awardBadge(badgeId) {
  const earnedBadges = JSON.parse(localStorage.getItem('earnedBadges')) || [];
//  const maxQuantity = getBadgeMaxQuantity(badgeId.id);

  console.log('badgeId:', badgeId);

  if (!earnedBadges.some(eb => eb.id === badgeId.id) && earnedBadges.length < badgeId.maxQuantity) {
     console.log('???????????????????????????????????????????:');

    earnedBadges.push({
      id: badgeId.id,
      earnedDate: getCurrentDate(),
      name: badgeId.name,
      description: badgeId.description,
      quantity: badgeId.quantity,
      imageUrl: badgeId.imageUrl,
      maxQuantity: badgeId.maxQuantity
    });

    console.log('earnedBadges:', earnedBadges);
    localStorage.setItem('earnedBadges', JSON.stringify(earnedBadges));
  }
}

















function getCurrentDate() {
  const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return now.toLocaleDateString(undefined, options);
}

// Helper function to get the maximum quantity of a badge
function getBadgeMaxQuantity(badgeId) {
  const badge = badges.find(badge => badge.id === badgeId);
  return badge ? badge.maxQuantity || 1 : 1;
}








function awardQuizzesTakenBadges() {
  const userInfo = getUserInfo();
  const quizzesTaken = userInfo.quizzesTaken;

  // Define the milestones and corresponding badge information
const milestones = [
  { count: 1, badge: { id: 2, name: "Quiz Enthusiast", description: "Awarded for taking 5 quizzes", quantity: 1, imageUrl: "/images/badges/badge-qcount-1.png", maxQuantity: 1 } },
  { count: 2, badge: { id: 3, name: "Quiz Aficionado", description: "Awarded for taking 10 quizzes", quantity: 1, imageUrl: "/images/badges/badge-qcount-2.png", maxQuantity: 1 } },
  { count: 3, badge: { id: 4, name: "Quiz Master", description: "Awarded for taking 20 quizzes", quantity: 1, imageUrl: "/images/badges/badge-qcount-3.png", maxQuantity: 1 } },
  { count: 4, badge: { id: 5, name: "Quiz Guru", description: "Awarded for taking 30 quizzes", quantity: 1, imageUrl: "/images/badges/badge-qcount-4.png", maxQuantity: 1 } },
  { count: 0, badge: { id: 6, name: "Quiz Legend", description: "Awarded for taking 40 quizzes", quantity: 1, imageUrl: "/images/badges/badge-qcount-5.png", maxQuantity: 1 } },
  { count: 50, badge: { id: 7, name: "Quiz Champion", description: "Awarded for taking 50 quizzes", quantity: 1, imageUrl: "/images/badges/badge-qcount-6.png", maxQuantity: 1 } }
];


 // Check if the user has reached any of the milestones and hasn't already earned the corresponding badge
  for (const milestone of milestones) {
    if (quizzesTaken >= milestone.count && !hasEarnedBadge(milestone.badge.id)) {
      awardBadge(milestone.badge);
    }
  }
}

const badges = [
  { id: 1, name: "5- Day Badge", description: "Visiting 5 Consecutive Days", quantity: 1, maxQuantity: 10, imageUrl: "/images/badges/xxx-1.png", earnedDate: "" },
  {
    id: 8,
    name: "Bronze Tier Badge",
    description: "Earned by reaching the Bronze Tier (0-100 points).",
    quantity: 1,
    maxQuantity: 1,
    imageUrl: "/images/badges/badge-qcount-8.png",
    earnedDate: ""
  },
  {
    id: 9,
    name: "Silver Tier Badge",
    description: "Earned by reaching the Silver Tier (101-250 points).",
    quantity: 1,
    maxQuantity: 1,
    imageUrl: "/images/badges/badge-qcount-9.png",
    earnedDate: ""
  },
  {
    id: 10,
    name: "Gold Tier Badge",
    description: "Earned by reaching the Gold Tier (251-500 points).",
    quantity: 1,
    maxQuantity: 1,
    imageUrl: "/images/badges/badge-qcount-10.png",
    earnedDate: ""
  },
  {
    id: 11,
    name: "Platinum Tier Badge",
    description: "Earned by reaching the Platinum Tier (501-1000 points).",
    quantity: 1,
    maxQuantity: 1,
    imageUrl: "/images/badges/badge-qcount-11.png",
    earnedDate: ""
  },
  {
    id: 12,
    name: "Diamond Tier Badge",
    description: "Earned by reaching the Diamond Tier (1001+ points).",
    quantity: 1,
    maxQuantity: 1,
    imageUrl: "/images/badges/badge-qcount-12.png",
    earnedDate: ""
  },
  {
    id: 13,
    name: "Perfect Score",
    description: "Scored 100% on Quiz",
    quantity: 1,
    maxQuantity: 100,
    imageUrl: "/images/badges/xxx-1.png",
    earnedDate: ""
  }
];






function getUserPoints() {
  const userInfo = getUserInfo();
  return userInfo.points;
}

function checkTier() {
  const userPoints = getUserPoints();
  
  if (userPoints >= 0 && userPoints <= 100) {
    return badges.find(badge => badge.id === 8);
  } else if (userPoints > 100 && userPoints <= 250) {
    return badges.find(badge => badge.id === 9);
  } else if (userPoints > 250 && userPoints <= 500) {
    return badges.find(badge => badge.id === 10);
  } else if (userPoints > 500 && userPoints <= 1000) {
    return badges.find(badge => badge.id === 11);
  } else if (userPoints > 1000) {
    return badges.find(badge => badge.id === 12);
  } else {
    return null;
  }
}




// Function to get the current date and time from API
async function getCurrentDateTime() {
  try {
    const response = await fetch('https://worldtimeapi.org/api/ip');
    const data = await response.json();
    return data.datetime; // Assuming the API returns date and time in ISO 8601 format
  } catch (error) {
    console.error('Error fetching current date and time:', error);
    return null;
  }
}

// Function to check if the user has visited the page before
function hasVisitedPage() {
  const lastVisit = localStorage.getItem('lastVisit');
  return !!lastVisit;
}

// Function to track consecutive days of visits
function trackConsecutiveDays() {
  const lastVisit = localStorage.getItem('lastVisit');
  const currentDate = new Date();

  if (lastVisit) {
    const prevVisitDate = new Date(lastVisit);
    const timeDiff = currentDate.getTime() - prevVisitDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      const consecutiveDays = parseInt(localStorage.getItem('consecutiveDays') || '0');
      localStorage.setItem('consecutiveDays', consecutiveDays + 1);
    } else if (daysDiff > 1) {
      localStorage.removeItem('consecutiveDays');
    }
  }

  localStorage.setItem('lastVisit', currentDate.toISOString());
}







// Function to reward points for each returning day up to 5 days
// Function to reward points for each returning day up to 5 days
function rewardPointsForReturningDays() {
  const consecutiveDays = parseInt(localStorage.getItem('consecutiveDays') || '0');
  const pointsPerDay = 10; // Points to be awarded per day

  if (consecutiveDays < 5) {
    const pointsEarned = consecutiveDays * pointsPerDay;
    updatePoints(pointsEarned);
    console.log(`Earned ${pointsEarned} points for returning ${consecutiveDays} day(s).`);
  } else if (consecutiveDays === 5) {
    const pointsEarned = consecutiveDays * pointsPerDay;
    updatePoints(pointsEarned);
    console.log(`Earned ${pointsEarned} points and the 5-Day badge.`);
    awardBadge(1); // Assuming badge with ID 1 is the 5-Day badge
  }
}

// Usage example
async function checkUserVisit() {
  const currentDateTime = new Date();
  const lastVisitDateTime = localStorage.getItem('lastVisitDateTime');
  const hasVisitedToday = lastVisitDateTime && isSameDay(currentDateTime, new Date(lastVisitDateTime));

  if (!hasVisitedToday) {
    // Increment consecutive days
    const consecutiveDays = parseInt(localStorage.getItem('consecutiveDays') || '0');
    localStorage.setItem('consecutiveDays', consecutiveDays + 1);

    // Update last visit date/time
    localStorage.setItem('lastVisitDateTime', currentDateTime.toString());

    // Reward points for returning days
    rewardPointsForReturningDays();
  } else {
    console.log('Already visited today.');
  }
}

// Function to check if two dates are the same day
function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
