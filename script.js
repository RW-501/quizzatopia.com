// Quiz Questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Rome", "Madrid"],
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
let totalTime = 60; // seconds
let answeredQuestions = [];

const totalQuestions = questions.length;

// Functions

// Function to start the quiz
function startQuiz() {
  quizStarted = true;
  document.getElementById("start-btn").classList.add("d-none");
  document.getElementById("quiz-container").classList.remove("d-none");
  showQuestion();
  startTimer();
  // Get the total number of questions
  totalQuestions = document.querySelectorAll('.quiz-question').length;
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
    answeredQuestions.push(true);
  } else {
    selectedOption.classList.add('incorrect');
    answeredQuestions.push(false);
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
  for (let i= 0; i < answerButtons.length; i++) {
answerButtons[i].addEventListener("click", checkAnswer);
answerButtons[i].classList.remove("disabled", "correct", "incorrect");
}
}

// Function to move to the next question
function nextQuestion() {
currentQuestion++;
if (currentQuestion < totalQuestions) {
enableAnswerButtons();
showQuestion();
document.getElementById("next-btn").classList.add("d-none");
} else {
endQuiz();
}
}

// Function to start the timer
function startTimer() {
timer = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
totalTime--;
document.getElementById("timer").innerHTML = Time Remaining: ${totalTime}s;
if (totalTime <= 0) {
endQuiz();
}
}

// Function to end the quiz
function endQuiz() {
clearInterval(timer);
document.getElementById("quiz-container").classList.add("d-none");
document.getElementById("end-container").classList.remove("d-none");
document.getElementById("score").innerHTML = You scored ${score} out of ${totalQuestions}!;
document.getElementById("accuracy").innerHTML = Accuracy: ${(score / totalQuestions) * 100}%;
document.getElementById("time-taken").innerHTML = Time taken: ${60 - totalTime}s;
}

// Event Listeners
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("next-btn").addEventListener("click", nextQuestion);







