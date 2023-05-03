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

// Functions

// Function to start the quiz
function startQuiz() {
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
  const answer = this.innerHTML;
  const questionObj = questions[currentQuestion];
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
      // update the progress bar
  updateProgressBar(currentQuestion);
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
      // update the progress bar
  updateProgressBar(currentQuestion);
}


// Function to end the quiz
function endQuiz() {
  clearInterval(timer);
  quizStarted = false;
  document.getElementById("quiz-container").classList.add("d-none");
  document.getElementById("end-container").classList.remove("d-none");
  document.getElementById("final-score").innerHTML = `${score} out of ${questions.length}`;
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
var totalQuestions = document.querySelectorAll('.quiz-question').length;

// Update the progress bar
function updateProgressBar(currentQuestion) {
  var percentage = (currentQuestion / totalQuestions) * 100;
  progressBar.style.width = percentage + '%';
}

// Event Listeners
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("skip-btn").addEventListener("click", skipQuestion);
document.getElementById("restart-btn").addEventListener("click", () => {
location.reload();
});
