// Quiz Questions
const questions = [  {    question: "What is the capital of France?",    options: ["Berlin", "Paris", "Rome", "Madrid"],
    answer: "Paris",
    explanation: "Paris is the capital of France"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Jupiter", "Earth", "Venus"],
    answer: "Jupiter",
    explanation: "Jupiter is the largest planet in our solar system"
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    answer: "Vatican City",
    explanation: "Vatican City is the smallest country in the world"
  }
];

// Global Variables
let currentQuestion = 0;
let score = 0;
let quizStarted = false;
let timer;
const totalTime = 60; // seconds

var totalQuestions = questions.length;

console.log(totalQuestions); // Output: 3

// Functions

// Function to start the quiz
function startQuiz() {
    console.log("?????????mm???????????????"); // Output: 3

  quizStarted = true;
  document.getElementById("start-btn").classList.add("d-none");
  document.getElementById("quiz-container").classList.remove("d-none");
  showQuestion();
  startTimer();
}

// Function to show the current question
function showQuestion() {
  const questionObj = questions[currentQuestion];
  document.getElementById("question").innerHTML = questionObj.question;
  const options = questionObj.options;
  const answerButtons = document.getElementsByClassName("answer-option");
  for (let i = 0; i < options.length; i++) {
    answerButtons[i].innerHTML = options[i];
    answerButtons[i].addEventListener("click", checkAnswer);
  }
  document.getElementById("explanation").innerHTML = "";
    
}

// Function to check the user's answer
function checkAnswer() {
       const selectedOption = this;

    const optionContainers = document.querySelectorAll("#optionContainers button.answer-option");
  const selectedAnswer = selectedOption.innerHTML;
  const questionObj = questions[currentQuestion];
  const options = optionContainers[currentQuestion].children;
  const explanation = questionObj.explanation;
  
  for (let i = 0; i < options.length; i++) {
    options[i].classList.add('disabled');
    if (options[i].innerHTML === questionObj.answer) {
      options[i].classList.add('correct');
    } else {
      options[i].classList.add('incorrect');
    }
  }
  
  if (selectedAnswer === questionObj.answer) {
    selectedOption.classList.add('correct');
    score++;
  } else {
    selectedOption.classList.add('incorrect');
  }
    
  const answer = this.innerHTML;
   questionObj = questions[currentQuestion];
  if (answer === questionObj.answer) {
    score++;
  }
 
  showExplanation(questionObj.explanation);
}





// Function to show the explanation for the current question
function showExplanation(explanation) {
  document.getElementById("explanation").innerHTML = explanation;
  disableAnswerButtons();
  document.getElementById("next-btn").classList.remove("d-none");
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
    answerButtons[i].classList.remove("disabled");
  }
}

// Function to go to the next question
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion === questions.length) {
    endQuiz();
  } else {
    showQuestion();
    enableAnswerButtons();
    document.getElementById("next-btn").classList.add("d-none");
    document.getElementById("skip-btn").classList.remove("d-none");
  }
        clearAnswers();

      // update the progress bar
  updateProgressBar(currentQuestion);
    console.log(currentQuestion+"????????????currentQuestion????"); // Output: 3

}

// Function to skip the current question
function skipQuestion() {
  currentQuestion++;
  if (currentQuestion === questions.length) {
    endQuiz();
  } else {
    showQuestion();
    enableAnswerButtons();
    document.getElementById("next-btn").classList.add("d-none");
    document.getElementById("skip-btn").classList.remove("d-none");
  }
    clearAnswers();
      // update the progress bar
  updateProgressBar(currentQuestion);
}

function clearAnswers(){
      for (let i = 0; i < options.length; i++) {
      options[i].classList.remove('correct');
  
      options[i].classList.remove('incorrect');
    }
  }
    



// Function to end the quiz
function endQuiz() {
  clearInterval(timer);
  quizStarted = false;
  document.getElementById("quiz-container").classList.add("d-none");
  document.getElementById("end-container").classList.remove("d-none");
  document.getElementById("final-score").innerHTML = `${score} out of ${questions.length}`;
    // Call the showFinalScore function with the final score when the quiz is completed
showFinalScore();

}

// Function to start the timer
function startTimer() {
  let timeLeft = totalTime;
  timer = setInterval(() => {
    document.getElementById("timer").innerHTML = `${timeLeft} seconds`;
    timeLeft--;
    if (timeLeft < 0) {
      endQuiz();
    }
  }, 1000);
}

// Get the progress bar element
var progressBar = document.getElementById('progress-bar');

// Get the total number of questions
 totalQuestions = document.querySelectorAll('.quiz-question').length;
console.log(totalQuestions+"?????????????totalQuestions???????????"); // Output: 3

// Update the progress bar
function updateProgressBar(currentQuestion) {
  var percentage = (currentQuestion / totalQuestions) * 100;
  progressBar.style.width = percentage + '%';
}

// Select the final score pop-up and close button elements
const finalScorePopup = document.getElementById('final-score-popup');
const closePopupBtn = document.getElementById('close-popup-btn');

// Function to show the final score pop-up and set the final score text
function showFinalScore() {

  // Show the final score pop-up
  finalScorePopup.style.display = 'block';
}

// Event listener for the close button to hide the final score pop-up
closePopupBtn.addEventListener('click', function() {
  finalScorePopup.style.display = 'none';
});




// Event Listeners
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("skip-btn").addEventListener("click", skipQuestion);
document.getElementById("retake-btn").addEventListener("click", () => {
location.reload();
});
