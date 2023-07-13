// Global Variables
let questionTime = 0; // seconds
let currentQuestion = 0;
let questionCorrect = 0;
let questionIncorrect = 0;
let questionsCompleted = 0;
let quizStarted = false;
let timer = 0;
let countdownPerQuestion = false; // set to true if the countdown should happen for each question
let totalTime = 0; // seconds
let totalQuestions = questions.length;
let timerEnabled = false;
let timerDisplay;
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
      questionsCompleted: 0,
      questionCorrect: 0,
      questionIncorrect: 0,
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










async function startQuiz() {
  loadScreenFunc();

  const divElement = document.getElementById("testInfo");
  // Call the function when needed, e.g., after completing a quiz
  showLoginPopupIfNeeded();

  if (newQuizCount > QUIZ_COUNT_THRESHOLD && loggedIn == false) {
    // Show the login popup
    openPopup();
    switchTab('login');
  } else {
    if (q === null || q === '') {
      location.reload();
    } else {
      questionTime = 0; // seconds
      currentQuestion = 0;
      questionCorrect = 0;
	questionIncorrect = 0;    
      quizStarted = false;
      timer = 0;
	    questionsCompleted = [];
      countdownPerQuestion = false; // set to true if the countdown should happen for each question
      totalTime = 0; // seconds
      totalQuestions = questions.length;
      timerEnabled = false;

      quizStarted = true;
      updatePointsAndRank();
      const animations = ["right", ""];
      const randomIndex = Math.floor(Math.random() * animations.length);
      const selectedAnimation = animations[randomIndex];

      slideIn("quiz-container", selectedAnimation);

      document.getElementById("quiz-container").classList.remove("d-none");
      totalQuestions = questions.length;

      // Retrieve the quizInfo from the array quiz
      const quizInfo = setUpandSaveQuizInfo(quizCode, quizName, numberOfQuestions);

      quizCode = quizInfo.quizCode;
      quizName = quizInfo.quizName;
      numberOfQuestions = quizInfo.numberOfQuestions;


      document.getElementById("optionContainer").classList.add("d-none");

      // Hide the MessageBoard info
      document.getElementById("otherQuizzes").classList.add("d-none");


 var numAd;

  if (totalQuestions <= 15) {
    numAds = 2;
      if (totalQuestions <= 5) {
            numAds = 1;
      }
  } else {
    numAds = totalQuestions / 5;
  }

  var intvalue = Math.round(numAds);

  quizAdPattern = generateQuizAdPattern(totalQuestions, intvalue);
  adQuestionNumbers = quizAdPattern;

  // Array to store the question numbers where the ad should be shown
  adQuestionNumbers = quizAdPattern; // Example: Show ad after questions 3, 7, and 11

  setQuizTime();
   updateQuestionNumber();

  updateProgressBar(currentQuestion);
    showQuestion();
  
	          await updateQuizStartedCount(quizCode);

    }
  }
}

async function updateQuizStartedCount(quizCode) {
  const db2 = firebase.firestore();

  try {
    // Check if quiz already exists in Firestore
    const querySnapshot2 = await db2.collection('quizzes').where('quizCodeDB', '==', quizCode).get();

    if (!querySnapshot2.empty) {
      const quizDoc = querySnapshot2.docs[0]; // Assuming there's only one document with the matching quizCodeDB

      // Update the quizStartedCount field by 1
      const quizId = quizDoc.id; // Get the document ID
      const quizRef = db2.collection('quizzes').doc(quizId); // Create a reference to the document

      await quizRef.update({
        quizStartedCount: firebase.firestore.FieldValue.increment(1)
      });
    }
  } catch (error) {
    console.error('Error updating quizStartedCount:', error);
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

	 //  console.log('userInfo.userName ????????????????? ', userInfo.userName);

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
    document.getElementById("ad-text").innerHTML = "Help keep Quizzatopia Free.<br> Returns in " + countdown + " seconds";

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
	      
	      
        document.getElementById("ad-text").innerHTML = "Help keep Quizzatopia Free.<br> Returns in " + countdown + " seconds";
	      // document.getElementById("adButton").innerHTML = scriptCode;
	      
      }
    }, 1000);
  }

  displayAd();
}


// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArrayAnswers(array) {
  const shuffledArray = [...array];

  // Words to search for
  const searchWords = ['All', 'above'];

  // Find the array that contains the search words
  const foundArray = shuffledArray.find(array => {
    return searchWords.some(word => array.includes(word));
  });

  const indexOfAllOfTheAbove = shuffledArray.indexOf(foundArray);

  if (indexOfAllOfTheAbove !== -1) {
    shuffledArray.splice(indexOfAllOfTheAbove, 1);
  }

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  shuffledArray.push(foundArray);

  return shuffledArray;
}





// Function to show the question
function showQuestion() {
  const animations = ["right", ""];
  const randomIndex = Math.floor(Math.random() * animations.length);
  const selectedAnimation = animations[randomIndex];

  slideIn("quizContainer", selectedAnimation);

  if (adQuestionNumbers.includes(currentQuestion)) {
    const index = adQuestionNumbers.indexOf(currentQuestion);
    if (index !== -1) {
      adQuestionNumbers.splice(index, 1);
    }
    showAdsFunc();
    return;
  }

  const questionObj = questions[currentQuestion];
  document.getElementById("question").innerHTML = questionObj.question;

  if (questionObj.imageURL === "" || questionObj.imageURL === null || questionObj.imageURL === undefined) {
    document.getElementById("questionImageArea").style.display = "none";
  } else {
    document.getElementById("questionImage").src = questionObj.imageURL;
    document.getElementById("questionImageArea").style.display = "block";
  }

document.getElementById("difficulty").innerHTML = "Difficulty: " + (questionObj.difficulty || '') ;
document.getElementById("realQustionNum").innerHTML =  ('# '+ questionObj.questionNumber || "");



quizInfo.questionsCompleted.push(questionObj.questionNumber);
//quizInfo.questionsCompleted = questionsCompleted;
questionsCompleted  
	
//let saveQuizInfo = JSON.stringify(quizInfo);
	
saveQuizData(quizCode, saveQuizInfo);



		console.log('questionObj.questionNumber ', questionObj.questionNumber);
		console.log('questionsCompleted ', questionsCompleted);
		console.log('quizInfo ', quizInfo);
	
  const answerButtons = document.getElementsByClassName("answer-option");

  for (let i = 0; i < answerButtons.length; i++) {
    if (questionObj.options[i]) {
      answerButtons[i].style.display = "initial";
    } else {
      answerButtons[i].style.display = "none";
    }
  }

const options = questionObj.options;
const shuffledOptions = shuffleArrayAnswers(options);

for (let i = 0; i < Math.min(shuffledOptions.length, answerButtons.length); i++) {
  answerButtons[i].innerHTML = shuffledOptions[i] || "";
  answerButtons[i].addEventListener("click", checkAnswer);
}

  document.getElementById("explanation").innerHTML = "";

  if (countdownPerQuestion && timerEnabled) {
    totalTime = questionTime;
    startTimer();
  }

  const skipNextBtn = document.getElementById('skip-next-btn');
  skipNextBtn.innerHTML = questionCorrect > currentQuestion ? 'Next' : 'Skip';
}

// Function to update the progress bar
function updateProgressBar(currentQuestion) {
  let QuestionNewNum = currentQuestion === 0 ? 1 : currentQuestion;
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    const percentage = (currentQuestion / totalQuestions) * 100;
    progressBar.style.width = percentage + '%';
  }
}

// Function to check the user's answer
function checkAnswer() {
  document.getElementById("skip-next-btn").innerHTML = "Next";

  const selectedOption = this;
  const optionContainers = document.querySelectorAll("#optionContainers button.answer-option");
  const selectedAnswer = selectedOption.innerHTML;
  const questionObj = questions[currentQuestion];
  const options = optionContainers[currentQuestion]?.children;

//  console.log('options ????????????????? ', options);
	
  
	
  let correct_bool;
  if (selectedAnswer === questionObj.answer) {
    selectedOption.classList.add('correct');
    if (isAnimationEnabled) {
      selectedOption.classList.add('pulse-animation');
    }
    correct_bool = "Correct";
    questionCorrect++;
    quizInfo.questionCorrect = questionCorrect;
    saveQuizInfo(quizCode, quizInfo);



const answerOptions = document.getElementsByClassName("answer-option");
    for (let i = 0; i < answerOptions.length; i++) {
      if (answerOptions[i].innerHTML === selectedAnswer) {
	      
		readCorrectAnswerFunc(i , "Correct" );
      }
    }
    
	  
  } else {
    selectedOption.classList.add('incorrect');
    correct_bool = "incorrect";
    questionIncorrect++;
    quizInfo.questionIncorrect = questionIncorrect;
    saveQuizInfo(quizCode, quizInfo);
	console.log('questionIncorrect ????????????????? ', questionIncorrect);
	  
	  const answerOptions = document.getElementsByClassName("answer-option");
    for (let i = 0; i < answerOptions.length; i++) {
      if (answerOptions[i].innerHTML === questionObj.answer) {
        answerOptions[i].classList.add('missed');
		readCorrectAnswerFunc(i);
        if (isAnimationEnabled) {
          answerOptions[i].classList.add('shake-animation');
        }
      }
    }
  }

//  quizInfo.questionNumber = currentQuestion;

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
  const closeButton = document.getElementById('close-btn');

  closeButton.addEventListener('click', function() {
closeExplanationPopup();	  

  });
}
function closeExplanationPopup() {
  const explanationContainer = document.querySelector('.explanation-container');
    explanationContainer.style.display = 'none';

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
    answerButtons[i].classList.remove("disabled", "correct", "incorrect", "missed", "shake-animation", "pulse-animation");
	 answerButtons[i].innerHTML = "";  
  }
}
var timeoutId;

// Function to show the next question
function nextQuestion() {
  clearTimeout(timeoutId);

  timeoutId =  setTimeout(function() {
  location.reload();
  }, 180000); // 3 minutes = 180 seconds

	
	stopSpeaking();
  currentQuestion++;
  document.getElementById('show-explanation-btn').classList.add("d-none");

  const animations = ["right", ""];
  const randomIndex = Math.floor(Math.random() * animations.length);
  const selectedAnimation = animations[randomIndex];

  slideOut("quizContainer", selectedAnimation);

  const explanationContainer = document.querySelector('.explanation-container');
  if (explanationContainer.style.display == 'block') {
    explanationContainer.style.display = 'none';
  }

  if (currentQuestion < totalQuestions) {
    enableAnswerButtons();
    showQuestion();
  } else {
    endQuiz();
  }
  updateProgressBar(currentQuestion);
  updateQuestionNumber();


}

// Function to skip the question
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

  updateProgressBar(currentQuestionNumber);
}
const userStartPoints = userInfo.userPoints;
const initialPoints = userStartPoints;

// Function to calculate the earned points
function calculateEarnedPoints() {
  const userInfo = getUserInfo();
  let currentPoints = userInfo.userPoints;
  let currentPoint = currentPoints;
  let earnedPoints = currentPoint - initialPoints;

  return earnedPoints > 0 ? earnedPoints : 0;
}
// Function to check if a badge has been earned
 const oldBadges = JSON.parse(localStorage.getItem('earnedBadges')) || [];

// Function to add a badge to the user
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

// Function to display earned points with animation
function displayEarnedPoints(start, end, duration) {
  let current = start;
  const increment = Math.ceil((end - start) / duration * 10);
  const counterElement = document.getElementById("earnedPoints");

  const intervalId = setInterval(() => {
    current += increment;
    counterElement.textContent = "+" + current + " Points!";

    if (current >= end) {
      clearInterval(intervalId);
    }
  }, 100);
}

// Function to retake the quiz
function retakeQuizFunc() {
  location.reload();
}

// Function to update quiz count in the database
async function updatequizDB() {
  const db2 = firebase.firestore();

  // Check if quiz already exists in Firestore
  const querySnapshot2 = await db2.collection('quizzes').where('quizCodeDB', '==', quizCode).get();

  if (!querySnapshot2.empty) {
    const quizDoc = querySnapshot2.docs[0]; // Assuming there's only one document with the matching quizCodeDB

    // Update the quizFinishedCount field by 1
    const quizId = quizDoc.id; // Get the document ID
    const quizRef = db2.collection('quizzes').doc(quizId); // Create a reference to the document

    await quizRef.update({
      quizFinishedCount: firebase.firestore.FieldValue.increment(1)
    });

    console.log(quizCode + " was updated: " + quizId);
  }
}

function endQuiz() {
  clearTimeout(timeoutId);

  clearInterval(timer);
  quizStarted = false;

   timerDisplay = document.getElementById("timer");
  timerDisplay.innerHTML = "";

  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || [];
  const userId = userInfo.firebaseId;
  const userBadges = JSON.parse(localStorage.getItem('earnedBadges')) || [];

  addBadgeToUser(userId, userBadges);

  const feedback = calculateFeedback();
  document.getElementById("feedback").innerHTML = feedback;

  const percentageScore = Math.round((questionCorrect / totalQuestions) * 100);
  const resultMsg = `You scored ${questionCorrect}/${totalQuestions} (${percentageScore}%)`;
  document.getElementById("score").innerHTML = resultMsg;

  updatePointsAndRank();

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

  const startValue = 0;
  const animationDuration = 2000;
  if (earnedPoints > 0) {
    displayEarnedPoints(startValue, earnedPoints, animationDuration);
  }

  slideIn("end-container", "right");

  document.getElementById("quiz-container").classList.add("d-none");
  document.getElementById("end-container").classList.remove("d-none");
  document.getElementById("otherQuizzes").classList.remove("d-none");
	
  const link = window.location.href;
  setShareableLink(link);
	
  if (questionCorrect !== totalQuestions && questionCorrect !== 0) {
    showPieChartEnd();
  }

  const newBadges = JSON.parse(localStorage.getItem('earnedBadges')) || [];
  const uniqueArray = newBadges.filter(item => !oldBadges.some(element => element.id === item.id));

  if (uniqueArray.length > 0) {
    document.getElementById("badgebox").classList.remove("d-none");

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

  updatequizDB();
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
	
document.getElementById('show-explanation-btn').classList.remove("d-none");
  const explanationContainer = document.querySelector('.explanation-container');
		
	explanationContainer.style.display = 'block';
///});
}
	
// Rating stars functionality
let rating = 0;

function rateQuiz(stars) {
  rating = stars;

  const starElements = document.querySelectorAll('.star');
  starElements.forEach((star, index) => {
    if (index < stars) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

// Leaving a review

// Get the elements
const leaveReviewBtn = document.getElementById('leaveReviewBtn');
const reviewModal = document.getElementById('reviewModal');
const closeModal = document.getElementById('closeModal');
const submitReviewBtn = document.getElementById('submitReviewBtn');
const reviewTextArea = document.getElementById('reviewTextArea');
const ratingStars = document.getElementById('ratingStars');

// Event listeners
leaveReviewBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalWindow);
submitReviewBtn.addEventListener('click', submitReview);

// Open the modal
function openModal() {
	  slideIn("reviewModal");

  reviewModal.style.display = 'block';
}

// Close the modal
function closeModalWindow() {
	  slideOut("reviewModal");

  reviewModal.style.display = 'none';
  reviewTextArea.value = ''; // Clear the review text area
}

function quickFreedback(xxx) {
reviewTextArea.value = xxx;

}

// Submit the review
function submitReview() {
	  if (rating === 0) {
	  if (isAnimationEnabled) {
ratingStars.classList.add('shake-animation');
}
alert('Please rate the quiz before leaving a review.');
    return;
  }
  const feedback = reviewTextArea.value;
  if (feedback) {
    // Perform the necessary actions to store the feedback in Firestore

    const feedbackData = {
      rating: rating,
      feedback: feedback,
      feedbackType: "feedback",
      date: new Date(),
      quizCode: quizCode // Replace with the actual quiz code
    };
 const db = firebase.firestore();
    // Add the feedback to the 'quizFeedback' collection
    db.collection('quizFeedback').add(feedbackData)
      .then(() => {
        console.log('Feedback added successfully!');
        alert('Thank you for your review!');
      })
      .catch(error => {
        console.error('Error adding feedback:', error);
        alert('Failed to add feedback. Please try again.');
      });
  


	  
    console.log('Review:', feedback);
    closeModalWindow(); // Close the modal after submitting
    alert('Thank you for your review!');
  } else {
	  if (isAnimationEnabled) {
submitReviewBtn.classList.add('shake-animation');
}
    alert('Please enter your review or feedback.');
  }
}






 function setShareableLink(data) {
        var shareLink = document.getElementById("shareLink");
        // Build the shareable link based on the provided data
        shareLink.value = data;
      }

      function copyLink() {
        var shareLink = document.getElementById("shareLink");
        shareLink.select();
        shareLink.setSelectionRange(0, 99999); /* For mobile devices */
        document.execCommand("copy");
        alert("Link copied to clipboard!");
      }










function getSettings() {
  const settingsInfoStored = localStorage.getItem('settings');
  return settingsInfoStored ? JSON.parse(settingsInfoStored) : {};
}

function saveSettings(key, value) {
  const settings = getSettings();
  settings[key] = value;
  const settingsInfo = JSON.stringify(settings);
  localStorage.setItem('settings', settingsInfo);
}












var blinkDiv = document.getElementById('readButton');
var blinkInterval;

function startBlinking() {
  blinkInterval = setInterval(function() {
    blinkDiv.classList.toggle('blink');
  }, 500);
}

function stopBlinking() {
  clearInterval(blinkInterval);
  blinkDiv.classList.remove('blink');
}


var audioButton = document.getElementById('audioButton');
var isAudioEnabled = true;


const settings = getSettings();


isAudioEnabled = settings.audioEnabled;


function toggleAudio() {
  isAudioEnabled = !isAudioEnabled;

// Save the updated settings
	saveSettings('audioEnabled', isAudioEnabled);
	
  updateAudioButton();
}

function updateAudioButton() {
  audioButton.textContent = ` ${isAudioEnabled ? 'On' : 'Off'}`;
}

audioButton.addEventListener('click', toggleAudio);
updateAudioButton();




// Get the volume slider element
var volumeSlider = document.getElementById('volumeSlider');

// Function to set the volume value
function setVolume(value) {
  // Create a new SpeechSynthesisUtterance object
  var utterance = new SpeechSynthesisUtterance();

  // Set the volume
  utterance.volume = value;

  // Output the current volume to the console
  console.log('Current volume:', utterance.volume);

  // Save the volume value to local storage
 // localStorage.setItem('volume', value);

// Save the updated settings
	saveSettings('volume', value);

}

// Function to load the volume value from local storage
function loadVolume() {
	const settings = getSettings();

  var savedVolume = settings.volume;
  if (savedVolume) {
    // Set the volume slider value
    volumeSlider.value = savedVolume;

    
  }
}

// Event listener for the volume slider
volumeSlider.addEventListener('input', function() {
  var volumeValue = volumeSlider.value;

		saveSettings('volume', volumeValue);

});

// Load the volume value on page load
loadVolume();









function getMatchingVoice(voiceName) {
  if ('speechSynthesis' in window) {
    var synthesis = window.speechSynthesis;
    var voices = synthesis.getVoices();
    var matchedVoice = voices.find(function(voice) {
      return voice.name === voiceName;
    });
    return matchedVoice;
  } else {
    console.log('Text-to-speech is not supported in this browser.');
    return null;
  }
}






function getUserOperatingSystem() {
  const userAgentString = navigator.userAgent;

  // Check if the user agent string contains the OS information
  if (userAgentString.includes('Windows')) {
    return 'Windows';
  } else if (userAgentString.includes('Macintosh')) {
    return 'Mac';
  } else if (userAgentString.includes('Linux')) {
    return 'Linux';
  } else if (userAgentString.includes('Android')) {
    return 'Android';
  } else if (userAgentString.includes('iOS')) {
    return 'iOS';
  } else {
    return 'Unknown';
  }
}







function populateVoiceDropdown() {
  var voiceDropdown = document.getElementById('voiceDropdown');
  
  // Wait for the 'voiceschanged' event
  speechSynthesis.addEventListener('voiceschanged', function() {
    var voices = speechSynthesis.getVoices();
  
    voices.forEach(function(voice) {
      var option = document.createElement('option');
      option.value = voice.voiceURI;
      option.textContent = voice.name;
      voiceDropdown.appendChild(option);
    });
  });
}



// Save voice settings to local storage
function saveVoiceSettings() {
  var rateSlider = document.getElementById('rateSlider');
  var voiceDropdown = document.getElementById('voiceDropdown');
  
  var voiceSettings = {
    rate: parseFloat(rateSlider.value),
    voice: voiceDropdown.value
  };
  	saveSettings('voiceSettings', voiceSettings);

}

// Load voice settings from local storage
function loadVoiceSettings() {
  var voiceSettings = JSON.parse(localStorage.getItem('voiceSettings'));
  if (voiceSettings) {
    var rateSlider = document.getElementById('rateSlider');
    var voiceDropdown = document.getElementById('voiceDropdown');
    
    rateSlider.value = voiceSettings.rate;
    voiceDropdown.value = voiceSettings.voice;
  }
}

// Event listeners for saving and loading voice settings
var rateSlider = document.getElementById('rateSlider');
var voiceDropdown = document.getElementById('voiceDropdown');

rateSlider.addEventListener('input', saveVoiceSettings);
voiceDropdown.addEventListener('change', saveVoiceSettings);

// Populate the voice dropdown on page load
window.addEventListener('load', function() {
  populateVoiceDropdown();
  loadVoiceSettings();
});





function readQuizFunc() {

var currentQuestion =   document.getElementById("question").innerHTML;

var currentOptions = document.getElementsByClassName("answer-option");
var optionsString = "";
let x = 0;
for (let i = 0; i < currentOptions.length; i++) {
	if(currentOptions[i].innerHTML !== ""){
		x++;
		if(x > 0){
  currentOptions[i].classList.remove("highlight"); 
		}
optionsString += " Option Number "+[x]+". "+currentOptions[i].innerHTML +", ";
  currentOptions[i].classList.add("highlight"); 
	}
}

console.log(currentQuestion+", "+optionsString);
let readThis = currentQuestion+" "+optionsString;

readTextFunc(readThis);
}

function readCorrectAnswerFunc(num,correct){
		//console.log("readThis xxx  "+zzz);
 let incorrectResponses, responses, randomIndex, readThis;	
var currentOptions = document.getElementsByClassName("answer-option");
	if(correct){
 readThis =  "Correct, the answer is "+ currentOptions[num].innerHTML;
  responses = [
    "Great job! The answer is " + currentOptions[num].innerHTML + ".",
    "You got it right! It's " + currentOptions[num].innerHTML + ".",
    "Correct answer: " + currentOptions[num].innerHTML + ".",
    "Well done! It's " + currentOptions[num].innerHTML + ".",
    "That's correct! The answer is " + currentOptions[num].innerHTML + ".",
  ];

   randomIndex = Math.floor(Math.random() * responses.length);
   readThis = correct ? responses[randomIndex] : "The correct answer is " + currentOptions[num].innerHTML + ".";
	}else{
   incorrectResponses = [
    "Oops! That's not the correct answer.",
    "No, that's not it. The correct answer is " + currentOptions[num].innerHTML + ".",
    "Incorrect. The answer is " + currentOptions[num].innerHTML + ".",
    "Better luck next time! It's actually " + currentOptions[num].innerHTML + ".",
    "Wrong answer. The correct one is " + currentOptions[num].innerHTML + ".",
  ];

   randomIndex = Math.floor(Math.random() * (correct ? correctResponses.length : incorrectResponses.length));
   readThis = correct ? correctResponses[randomIndex] : incorrectResponses[randomIndex];
  	
	}
readTextFunc(readThis);
	//console.log("readThis "+readThis);

}

function readQuestionFunc(){
let readThis =    document.getElementById("question").innerHTML;
readTextFunc(readThis);
}
function readExplanationFunc(){
   let explanations, randomIndex, readThis;	

	explanations = [
    "Here's the explanation: " + document.getElementById("explanation").innerHTML,
    "Let me explain. " + document.getElementById("explanation").innerHTML,
    "The explanation is as follows: " + document.getElementById("explanation").innerHTML,
    "Listen carefully to the explanation: " + document.getElementById("explanation").innerHTML,
    "Allow me to clarify. " + document.getElementById("explanation").innerHTML,
  ];

   randomIndex = Math.floor(Math.random() * explanations.length);
   readThis = explanations[randomIndex];
	readTextFunc(readThis);
}

    var utterance = new SpeechSynthesisUtterance();


var isSpeaking = false; // Track if an utterance is currently being spoken


function readTextFunc(text) {
	      if(isAudioEnabled === true){

  if (isSpeaking) {
    // Stop the ongoing speech	  
    stopSpeaking();
    return;
  }

  if ('speechSynthesis' in window) {
    var synthesis = window.speechSynthesis;
	  
  let blankPattern = /_{1,}/; // Pattern for one or more underscores
  let replacedQuestion2 = text.replace(blankPattern, " blank ");

 let blankPattern2 = "True or False:"; // Pattern for one or more underscores
  let replacedQuestion = replacedQuestion2.replace(blankPattern2, "");


    // Split the text into chunks
var chunkSize = 200; // Adjust the chunk size as needed
var chunks = [];
var words = replacedQuestion.split(' ');

for (var i = 0; i < words.length; i += chunkSize) {
  var chunk = words.slice(i, i + chunkSize).join(' ');
  chunks.push(chunk);
}


    // Function to speak the chunks sequentially
    function speakChunks(index) {
      if (index < chunks.length) {
        utterance.text = chunks[index];
        synthesis.speak(utterance);
        utterance.onend = function() {
          speakChunks(index + 1);
        };
      }
    }

    // Load voice settings from local storage
    var voiceSettings = JSON.parse(localStorage.getItem('voiceSettings'));
    if (voiceSettings) {
      var voice = getMatchingVoice(voiceSettings.voice);
      if (voice) {
        utterance.voice = voice;
      }
      utterance.rate = voiceSettings.rate;
    }

    // Event listener for the end of speech
    utterance.onend = function() {
      isSpeaking = false;
document.getElementById("readButton").innerHTML = "<div>🔈</div><span>Read</span>";
stopBlinking();	
    };
startBlinking();
    // Start speaking
document.getElementById("readButton").innerHTML = "<div>🔈</div><span>Reading</span>";
    isSpeaking = true;
    speakChunks(0);
  } else {
    console.log('Text-to-speech is not supported in this browser.');
  }
	      }
}


utterance.addEventListener('end', function(event) {
 // console.log('Speech ended.');
	  isSpeaking = false;
document.getElementById("readButton").innerHTML = "<div>🔈</div><span>Read</span>";
stopBlinking();	
});

// Function to stop the ongoing speech
function stopSpeaking() {
  if ('speechSynthesis' in window) {
    var synthesis = window.speechSynthesis;
    synthesis.cancel();
  }
  isSpeaking = false;
document.getElementById("readButton").innerHTML = "<div>🔈</div><span>Read</span>";

stopBlinking();

}

window.addEventListener('beforeunload', function(event) {

	stopSpeaking(); 
//  event.returnValue = 'Are you sure you want to leave this page?';
});

