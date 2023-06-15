// Global Variables
let questionTime = 0; // seconds
let currentQuestion = 0;
let questionCorrect = 0;
let quizStarted = false;
let timer = 0;
let countdownPerQuestion = false; // set to true if the countdown should happen for each question
let totalTime = 0; // seconds
let totalQuestions = questions.length;
let timerEnabled = false;

var quizAdPattern;
// Array to store the question numbers where the ad should be shown
let adQuestionNumbers;

// Array to store test information
let quizInfo = [];

// Function to set quiz time
function setQuizTime() {
  const quizTimeInput = document.getElementById("quiz-time");
  const newQuizTime = parseInt(quizTimeInput.value);

  if (timerEnabled == true) {
    questionTime = newQuizTime;
    totalTime = newQuizTime;

    startTimer();
  }
}





// Check if quizCode matches and retrieve or save quiz info
function setUpandSaveQuizInfo(quizCodeNS, quizNameNS, numberOfQuestionsNS) {
  const savedQuizInfo = localStorage.getItem(`quizInfo_${quizCode}`);
  let quizInfo;
  let timestamp = new Date().toLocaleString();

  if (!savedQuizInfo) {
    // Quiz info doesn't exist, save new quiz info to storage
    quizInfo = {
      quizCode: quizCodeNS,
      quizName: quizNameNS,
      numberOfQuestions: numberOfQuestionsNS,
      questionCorrect: 0,
      timestamp: timestamp,
      quizLink: q  // Add the "q" parameter to the quizInfo object
    };

    localStorage.setItem(`quizInfo_${quizCode}`, JSON.stringify(quizInfo));
  } else {
    // Quiz info exists, retrieve existing quiz info from storage
    quizInfo = JSON.parse(savedQuizInfo);
    quizInfo.quizName = quizName;
    quizInfo.numberOfQuestions = numberOfQuestions;
    quizInfo.timestamp = timestamp;
    quizInfo.quizLink = q;  // Add the "q" parameter to the quizInfo object
    localStorage.setItem(`quizInfo_${quizCode}`, JSON.stringify(quizInfo));
  }

  return quizInfo;
}











// Function to start the quiz
async function startQuiz() {
 var divElement = document.getElementById("testInfo");
	// Call the function when needed, e.g., after completing a quiz
	
//showLoginPopupIfNeeded();
			    showLoginPopupIfNeeded();

	
	    if (newQuizCount > QUIZ_COUNT_THRESHOLD && loggedIn == false) {
      // Show the login popup
     			slideIn("loginPopupBody");
openPopup();switchTab('login');
    }else{
	
	
if (  q === null || q === '') {
    console.log("empty.");
	  location.reload();
	 // window.location.href = "https://quizzatopia.com/quiz/?q="+q;

  } else {
 
	 questionTime = 0; // seconds
 currentQuestion = 0;
 questionCorrect = 0;
 quizStarted = false;
 timer = 0;
 countdownPerQuestion = false; // set to true if the countdown should happen for each question
 totalTime = 0; // seconds
 totalQuestions = questions.length;
 timerEnabled = false;
	
   quizStarted = true;
  updatePointsAndRank();
	  
slideIn("quiz-container");

  document.getElementById("start-btn").classList.add("d-none");
  document.getElementById("quiz-container").classList.remove("d-none");
  document.getElementById("optionContainer").classList.add("d-none");
  totalQuestions = questions.length;

  // Hide the MessageBoard
  document.getElementById("MessageBoard").classList.add("d-none");

  // Retrieve the quizInfo from the array quiz
  
const quizInfo = setUpandSaveQuizInfo(quizCode, quizName, numberOfQuestions);


	      quizCode = quizInfo.quizCode;
        quizName = quizInfo.quizName;
        numberOfQuestions = quizInfo.numberOfQuestions;
	  
	  
	  
	  
	  const db2 = firebase.firestore();



// Check if quiz already exists in Firestore
const querySnapshot2 = await db2.collection('quizzes').where('quizCodeDB', '==', quizCode).get();
	  if (!querySnapshot2.empty) {
  console.log(quizCode + " was updated"); // Output: <quizCode> was updated

}

if (!querySnapshot2.empty) {
  const quizDoc = querySnapshot2.docs[0]; // Assuming there's only one document with the matching quizCodeDB

  // Update the quizStartedCount field by 1
  await quizDoc.ref.update({
    quizStartedCount: firebase.firestore.FieldValue.increment(1)
  });

  console.log(quizCode + " was updated"); // Output: <quizCode> was updated

} else {
	/*
  // Save quiz information to Firestore with an automatically generated document ID
  await db.collection('quizzes').add({
    quizCodeDB: quizCode,
    quizStartedCount: 1 // Initialize the quizStartedCount to 1
  });
*/
  console.log(quizCode + " was not added"); // Output: <quizCode> was added
}
 
	  
	  
	  
  var numAd;

  if (totalQuestions <= 15) {
    numAds = 2;
      if (totalQuestions <= 5) {
            numAds = 1;
      }
  } else {
    numAds = totalQuestions / 2;
  }

  var intvalue = Math.round(numAds);

  quizAdPattern = generateQuizAdPattern(totalQuestions, intvalue);
  adQuestionNumbers = quizAdPattern;
  //console.log(adQuestionNumbers + "   ?????xx???????adQuestionNumbers????"); // Output: 3

  // Array to store the question numbers where the ad should be shown
  adQuestionNumbers = quizAdPattern; // Example: Show ad after questions 3, 7, and 11

  setQuizTime();
   updateQuestionNumber();

  updateProgressBar(currentQuestion);
    showQuestion();
  }
}


}



const quizTimeInput = document.querySelector('#quiz-time');

// Add an event listener to the timer checkbox to update the timerEnabled variable
const timerCheckbox = document.getElementById("timer-checkbox");
const timeGroup = document.getElementById("timer-timeGroup");
const perQtimeCheckbox = document.getElementById("countdown-per-question");

timerCheckbox.addEventListener("change", function () {
  timerEnabled = timerCheckbox.checked;

  if (timerCheckbox.checked) {
    timeGroup.style.display = 'block';
  } else {
    timeGroup.style.display = 'none';
    perQtimeCheckbox.checked = 0;
  }
});

const countdownCheckbox = document.getElementById("countdown-per-question");
countdownCheckbox.addEventListener("change", function () {
  countdownPerQuestion = countdownCheckbox.checked;
  timerCheckbox.checked = true;
  timerEnabled = true;

  if (timerCheckbox.checked) {
    timeGroup.style.display = 'block';
  } else {
    timeGroup.style.display = 'none';
  }
});



// Function to generate a random pattern with ads placed between questions
// Function to generate a random pattern with ads placed between questions
function generateQuizAdPattern(numQuestions, numAds) {
  const adInterval = Math.floor(numQuestions / (numAds + 1));
  const pattern = [];

  let currentPosition = adInterval;
  while (pattern.length < numAds) {
    pattern.push(currentPosition);
    currentPosition += adInterval;
  }

  return pattern;
}


let adDuration;
 let adCount;
  let userInfo = getUserInfo();

	   console.log('userInfo.userName ????????????????? ', userInfo.userName);

if (userInfo.userName === "admin" || userInfo.userName === "Admin" ) {
  console.log("   ???????no ads???"); // Output: 
  adDuration = 0; // Duration of each ad in seconds
  adCount = 0; // Counter for the number of ads shown 
} else {
  console.log("   ???????view ads???"); // Output: 
  adDuration = 10; // Duration of each ad in seconds
  adCount = 0; // Counter for the number of ads shown
}


// Function to display ads
function showAdsFunc() {

  let countdown = adDuration;

  function displayAd() {
    adCount++;
    // Insert code here to display the ad (e.g., show a modal, render an ad component, etc.)

    // Show the hidden div
    document.getElementById("ad-container").style.display = 'block';
    document.getElementById("ad-text").innerHTML = "This will be an ad <br> Ad ends in " + countdown + " seconds";

    // Start the countdown timer for the ad duration
    const countdownInterval = setInterval(() => {
      console.log("Ad " + adCount + " is being shown.");
   //   console.log("Ad ends in " + countdown + " seconds.");
      countdown--;

      if (countdown < 0) {
        clearInterval(countdownInterval);
        document.getElementById("ad-container").style.display = 'none';
        showQuestion(); // Call the showQuestion function after the ad ends
      } else {
	      
	      
        document.getElementById("ad-text").innerHTML = "This will be an ad <br> Ad ends in " + countdown + " seconds <p id=\'adButton\' ></p>";
	      // document.getElementById("adButton").innerHTML = scriptCode;
	      
      }
    }, 1000);
  }

  displayAd();
}




// Function to shuffle an array using Fisher-Yates algorithm
// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArrayAnswers(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}



function showQuestion() {
//  console.log(adQuestionNumbers + "  adQuestionNumbers??????????currentQuestion????   " + currentQuestion);

  // Check if the current question number is in the adQuestionNumbers array
  if (adQuestionNumbers.includes(currentQuestion)) {
    const index = adQuestionNumbers.indexOf(currentQuestion);
    if (index !== -1) {
      adQuestionNumbers.splice(index, 1);
    }
    // Call the showAdsFunc() to start displaying ads

    showAdsFunc();
    return;
  }


 const questionObj = questions[currentQuestion];
document.getElementById("question").innerHTML = questionObj.question;
	//  console.log(questionObj.questionType + "  questionObj.questionType   ??????????    currenquestionObj.imageURL   " + questionObj.imageURL);

if (questionObj.imageURL === "" || questionObj.imageURL === null || questionObj.imageURL === undefined) {
  document.getElementById("questionImageArea").style.display = "none";
		console.log("inside No pic     "); 

} else {
			console.log("inside  pic     "); 
	document.getElementById("questionImage").src = questionObj.imageURL;
  document.getElementById("questionImageArea").style.display = "block"; 
}
	
	
  document.getElementById("difficulty").innerHTML = questionObj.difficulty;
  document.getElementById("realQustionNum").innerHTML = questionObj.questionNumber;
	
 console.log(questionObj.questionType + "  questionType");
	
	if (questionObj.questionType) {

if (questionObj.questionType === "True/False") {
	//console.log("inside True/False     "); 
	document.getElementById("option_3").style.display= "none";
	document.getElementById("option_4").style.display= "none";

}else{
	document.getElementById("option_3").style.display= "initial";
	document.getElementById("option_4").style.display= "initial";
		//console.log("inside Multi-Choice     "); 

}
	}
	
	
  // Randomize the order of the answer options
  const options = questionObj.options;
  const shuffledOptions = shuffleArrayAnswers(options);
	
  // console.log(shuffledOptions[1]+"  options   "+options[1]); // Output: 3
	
	
  const answerButtons = document.getElementsByClassName("answer-option");
  for (let i = 0; i < shuffledOptions.length; i++) {
    answerButtons[i].innerHTML = shuffledOptions[i];
    answerButtons[i].addEventListener("click", checkAnswer);
  }
  document.getElementById("explanation").innerHTML = "";
  if (countdownPerQuestion && timerEnabled) {
    totalTime = questionTime;
    startTimer();
  }
  
    // Update the label of the skip-next-btn
  const skipNextBtn = document.getElementById('skip-next-btn');
  skipNextBtn.innerHTML = questionCorrect > currentQuestion ? 'Next' : 'Skip';
}



  // Get the progress bar element
var progressBar = document.getElementById('progress-bar');

// Update the progress bar
function updateProgressBar(currentQuestion) {
  let QuestionNewNum  = currentQuestion === 0 ? 1 : currentQuestion;
  var percentage = (currentQuestion / totalQuestions) * 100;
  progressBar.style.width = percentage + '%';
  //      console.log(QuestionNewNum+"  updateProgressBar??????????currentQuestion????"); // Output: 3
    //    console.log(totalQuestions+"  totalQuestions??????????totalQuestions????"); // Output: 3

}   
// Function to check the user's answer
// Function to check the user's answer
function checkAnswer() {
  document.getElementById("skip-next-btn").innerHTML = "Next";

  const selectedOption = this;
  const optionContainers = document.querySelectorAll("#optionContainers button.answer-option");
  const selectedAnswer = selectedOption.innerHTML;
  const questionObj = questions[currentQuestion];
  const options = optionContainers[currentQuestion]?.children;

  // Disable all options and apply appropriate classes
  if (options) {
    for (let i = 0; i < options.length; i++) {
      options[i].classList.add('disabled');
      if (options[i].innerHTML === questionObj.answer) {
        options[i].classList.add('correct');
      } else {
        options[i].classList.add('incorrect');
      }
    }
  }

  // Check if the selected answer is correct
  let correct_bool;
  if (selectedAnswer === questionObj.answer) {
    selectedOption.classList.add('correct');
    correct_bool = "Correct";
    questionCorrect++; // Increment the questionCorrect variable
    quizInfo.questionCorrect = questionCorrect; // Update the questionCorrect value in quizInfo

    saveQuizInfo(quizCode, quizInfo);
  } else {
    selectedOption.classList.add('incorrect');
    correct_bool = "incorrect";

    // Highlight the missed answer
    const answerOptions = document.getElementsByClassName("answer-option");
    for (let i = 0; i < answerOptions.length; i++) {
      if (answerOptions[i].innerHTML === questionObj.answer) {
        answerOptions[i].classList.add('missed');
      }
    }
  }

  // Update the question number
  quizInfo.questionNumber = currentQuestion;

  // Show the explanation
  showExplanation(questionObj.explanation);
  logStorageContents(quizCode);
}


// Function to show the explanation for the current question
function showExplanation(explanation) {
  document.getElementById("explanation").innerHTML = explanation;
  disableAnswerButtons();
  showExplanationPopup();
document.getElementById('show-explanation-btn').classList.remove("d-none");

}

// Function to show the explanation popup
function showExplanationPopup() {
  const explanationContainer = document.querySelector('.explanation-container');
  const closeButton = document.getElementById('close-btn');


  closeButton.addEventListener('click', function() {
    explanationContainer.style.display = 'none';
	  

  });
}



// Function to disable answer buttons after user answers
function disableAnswerButtons() {
  const answerButtons = document.getElementsByClassName("answer-option");
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].removeEventListener("click", checkAnswer);
    answerButtons[i].classList.add("disabled");
  }
}

// Function to enable answer buttons for next question
function enableAnswerButtons() {
  const answerButtons = document.getElementsByClassName("answer-option");
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].addEventListener("click", checkAnswer);
    answerButtons[i].classList.remove("disabled", "correct", "incorrect", "missed");
  }
}

// Function to show the next question
function nextQuestion() {
		 console.log("nextQuestion:   ");

  currentQuestion++;
document.getElementById('show-explanation-btn').classList.add("d-none");

	  const explanationContainer = document.querySelector('.explanation-container');
if(explanationContainer.style.display == 'block'){
	
		explanationContainer.style.display = 'none';

}
	 console.log("currentQuestion:   "+currentQuestion);

	
	
  if (currentQuestion < totalQuestions) {
    enableAnswerButtons();
    showQuestion();
      console.log("currentQuestion " + currentQuestion + " is being shown.");
         // document.getElementById("skip-next-btn").innerHTML = "Next";

  } else {
    endQuiz();
  }
  updateProgressBar(currentQuestion);
  updateQuestionNumber();
}

function skipQuestion() {
  currentQuestion++;

  if (currentQuestion < totalQuestions) {
    enableAnswerButtons();
    showQuestion();

  } else {
    endQuiz();
  }
  updateProgressBar(currentQuestion);
  updateQuestionNumber();
}



// Function to handle skip or next action
function skipOrNext() {
	 console.log("skipOrNext:   ");
  if (this.innerHTML === 'Skip') {
    skipQuestion();
  } else {
    nextQuestion();
  }
}





// Function to update the question number and progress bar
function updateQuestionNumber() {
  const questionNumberDisplay = document.getElementById("question-number");
const currentQuestionNumber = currentQuestion === 0 ? 1 : currentQuestion;
  questionNumberDisplay.innerHTML = `Question ${currentQuestionNumber}/${totalQuestions}`;

  // Update the progress bar
  updateProgressBar(currentQuestionNumber);
}





  const userStartPoints = userInfo.userPoints;
let initialPoints = userStartPoints;



function calculateEarnedPoints() {
  const userInfo = getUserInfo();
  let currentPoints = userInfo.userPoints;
  let currentPoint = currentPoints;
  let earnedPoints = currentPoint - initialPoints;
	

  return earnedPoints > 0 ? earnedPoints : 0;
	
}

// Function to check if a badge has been earned
 const oldBadges = JSON.parse(localStorage.getItem('earnedBadges')) || [];
	console.log('oldBadges:', oldBadges);






function addBadgeToUser(userId, badgeId) {
  const usersCollection = firebase.firestore().collection('usersBadges');

  usersCollection.doc(userId).get().then((doc) => {
    if (doc.exists) {
      // Document exists, update the badgeId field
      usersCollection.doc(userId).update({ badgeId: badgeId })
        .then(() => {
          console.log("Badge ID updated successfully for user:", userId);
        })
        .catch((error) => {
          console.error("Error updating badge ID for user:", userId, error);
        });
    } else {
      // Document doesn't exist, create a new document with badgeId
      usersCollection.doc(userId).set({ badgeId: badgeId })
        .then(() => {
          console.log("New user document created with badge ID:", userId);
        })
        .catch((error) => {
          console.error("Error creating user document with badge ID:", userId, error);
        });
    }
  }).catch((error) => {
    console.error("Error checking user document:", userId, error);
  });
}


function displayEarnedPoints(start, end, duration) {
  let current = start;
  const increment = Math.ceil((end - start) / duration * 10); // Adjust the speed of animation by changing the increment value
  const counterElement = document.getElementById("earnedPoints");
  
  const intervalId = setInterval(() => {
    current += increment;
    counterElement.textContent = "+"+current+" Points!";

    if (current >= end ) {
      clearInterval(intervalId);
    }
  }, 100); // Adjust the interval duration to control the speed of animation
}

 function endFucs() {

document.getElementById("retake-btn").addEventListener("click", () => {
location.href = "/quiz/?q="+q;
});

	
 }


function endQuiz() {
	
  clearInterval(timer);
  quizStarted = false;

  // Clear the timer display
  const timerDisplay = document.getElementById("timer");
  timerDisplay.innerHTML = "";
	
 const userInfo = JSON.parse(localStorage.getItem('userInfo')) || [];
const userId =	userInfo.firebaseId;
 const userBadges = JSON.parse(localStorage.getItem('earnedBadges')) || [];

addBadgeToUser(userId, userBadges);
	
	
  
  // Calculate feedback and display it
  const feedback = calculateFeedback();
  document.getElementById("feedback").innerHTML = feedback;

  // Calculate and display the score 
  const percentageScore = Math.round((questionCorrect / totalQuestions) * 100);
  const resultMsg = `You scored ${questionCorrect}/${totalQuestions} (${percentageScore}%)`;
  document.getElementById("score").innerHTML = resultMsg;
 
	updatePointsAndRank();
	// bonus
if (percentageScore === 100) {
  let halfQuestionTotal = totalQuestions / 2;
  let allRightBonus = pointsRewards * halfQuestionTotal;
  
  updatePoints(allRightBonus);
}
  updateQuizzesTaken(1);
	checkTier();
rewardPointsForReturningDays();
	awardQuizzesTakenBadges();

const earnedPoints = calculateEarnedPoints();
console.log("earnedPoints:", earnedPoints);
	// Usage example:
const startValue = 0;
const animationDuration = 2000; // Duration in milliseconds (2 seconds)
  console.log('earnedPoints:', earnedPoints);

	if(earnedPoints > 0){
displayEarnedPoints(startValue, earnedPoints, animationDuration);
	}
	
  // Hide the quiz container and show the end container
  document.getElementById("quiz-container").classList.add("d-none");
  document.getElementById("end-container").classList.remove("d-none");

  // Show the badge if all answers are correct
  if (questionCorrect === totalQuestions || questionCorrect == 0 ) {
  
  } else {
    // Show the pie chart for correct and incorrect answers
    showPieChartEnd();
  }
endFucs();
   const newBadges = JSON.parse(localStorage.getItem('earnedBadges')) || [];
const uniqueArray = newBadges.filter(item => !oldBadges.some(element => element.id === item.id));

	/*
  console.log('newBadges inside:', newBadges);
  console.log('oldBadges inside:', oldBadges);


*/	

	

	
	
	if(uniqueArray.length > 0){
  document.getElementById("badgebox").classList.remove("d-none");
// Function to display badges
function displayBadges() {
  const savedBadges = uniqueArray || [];
  const badgesContainer = document.getElementById("badgeView");
  badgesContainer.innerHTML = savedBadges.map(newBadge => `
   <div class="card awardBadge">
  <div class="badge-layer-1">
  <div class="badge-layer-2">
    <img src="${newBadge.imageUrl}" alt="${newBadge.id}" class="badge-image">
    </div>
  </div>
  <div class="card-body">
  <br>
    <h5 class="card-title">${newBadge.name}</h5><hr>
    <p class="card-text">${newBadge.description}</p>
  </div>
</div>

  `).join("");
}

displayBadges();  
	}
	
	
	
  // Unhide the message board
 // document.getElementById("MessageBoard").classList.remove("d-none");
}









// Function to show the pie chart of correct and incorrect answers
function  showPieChartEnd(){

  
const chartCanvas2 = document.createElement('canvas');
chartCanvas2.id = 'pie-chart2';

// Set the width and height of the chartCanvas2 element
chartCanvas2.style.width = '300px';
chartCanvas2.style.height = '300px';
   
     const correctAnswers = questionCorrect;
  const incorrectAnswers = totalQuestions - questionCorrect;
   
   // Create the data for the pie chart
 let pieData2 = {
  labels: ['Correct', 'Incorrect'],
  datasets: [{
    data: [correctAnswers, incorrectAnswers],
    backgroundColor: ['#36a2eb', '#ff6384']
  }]
};
   // Append the canvas to the chart container
const chartContainer2 = document.getElementById('score');
chartContainer2.appendChild(chartCanvas2);
   
  
  // Get the 2D context of the canvas
const ctx2 = chartCanvas2.getContext('2d');

// Configure the options for the pie chart
const options2 = {
  responsive: true
};

// Create the pie chart using Chart.js
new Chart(ctx2, {
  type: 'pie',
  data: pieData2,
  options: options2
});
  
 
}


// Function to calculate the feedback for the quiz taker
function calculateFeedback() {
  let feedback = "";

  if (questionCorrect === totalQuestions) {
    feedback = "Great job! You got all the questions right!";
  } else if (questionCorrect > totalQuestions / 2) {
    feedback = "Good job! You did well, but there is room for improvement.";
  } else {
    feedback = "Keep practicing. You'll get there!";
  }
  return feedback;
}

// Function to start the timer
function startTimer() {
      

        if (timerEnabled == true) {
            clearInterval(timer);
  timer = setInterval(function() {
    const timerEl = document.getElementById("timer");
      if (totalTime < 5) {
    timerEl.style.color = "red";
  } else {
    timerEl.style.color = "black";
  }

        let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;
    timerEl.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      if (totalTime <= 0) {
          if (countdownPerQuestion == true && timerEnabled == true) { // start timer only if countdown is per question and timer is enabled
     totalTime = questionTime;
    skipQuestion();
  }else{
   
      endQuiz();
  }
    }
        totalTime--;
  }, 1000);

        }
}





// Add event listener to the skip-next-btn
//const skipNextBtn = document.getElementById('skip-next-btn');
//skipNextBtn.addEventListener('click', skipOrNext);


// Event Listeners
//document.getElementById("start-btn").addEventListener("click", startQuiz);


// Add click event listener to the "Show Explanation" button
//const showExplanationButton = document.getElementById('show-explanation-btn');
//showExplanationButton.addEventListener('click', 

function showExplanationFunc() {
  // Replace this with your explanation content
 //const explanation = "This is the explanation for the question.";
//  showExplanation(explanation);
document.getElementById('show-explanation-btn').classList.remove("d-none");
  const explanationContainer = document.querySelector('.explanation-container');

	explanationContainer.style.display = 'block';
///});
}

