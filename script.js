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
let countdownPerQuestion = false; // set to true if the countdown should happen for each question

const totalQuestions = questions.length;

// Functions

// Function to start the quiz
function startQuiz() {
  quizStarted = true;
  document.getElementById("start-btn").classList.add("d-none");
  document.getElementById("quiz-container").classList.remove("d-none");
  showQuestion();
  if (!countdownPerQuestion) { // start timer only if countdown is for the whole test
    startTimer();
  }
    // Get the total number of questions
 totalQuestions = document.querySelectorAll('.quiz-question').length;
console.log(totalQuestions+"?????????????totalQuestions???????????"); // Output: 3
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

  // Get the progress bar element
var progressBar = document.getElementById('progress-bar');

// Update the progress bar
function updateProgressBar(currentQuestion) {
  var percentage = (currentQuestion / totalQuestions) * 100;
  progressBar.style.width = percentage + '%';
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
          // update the progress bar
  updateProgressBar(currentQuestion);
    console.log(currentQuestion+"????????????currentQuestion????"); // Output: 3

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
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].addEventListener("click", checkAnswer);
    answerButtons[i].classList.remove("disabled", "correct", "incorrect");
  }
}

// Function to show the next question
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

// Function to end the quiz
function endQuiz() {
  clearInterval(timer);
  document.getElementById("quiz-container").classList.add("d-none");
  document.getElementById("end-container").classList.remove("d-none");

  // Show score and feedback
  const feedback = calculateFeedback();
  document.getElementById("score").innerHTML = `${score} / ${totalQuestions}`;
  document.getElementById("feedback").innerHTML = feedback;
}

// Function to calculate the feedback for the quiz taker
function calculateFeedback() {
  let feedback = "";

  if (score === totalQuestions) {
    feedback = "Great job! You got all the questions right!";
  } else if (score > totalQuestions / 2) {
    feedback = "Good job! You did well, but there is room for improvement.";
  } else {
    feedback = "Keep practicing. You'll get there!";
  }

  if (countdownPerQuestion) { // add time bonus if the countdown was per question
    const timeBonus = calculateTimeBonus();
    feedback += ` You finished with ${timeBonus} seconds left!`;
  }

  return feedback;
}

// Function to start the timer
function startTimer() {
  const timeDisplay = document.getElementById("timer");

  timer = setInterval(function() {
    totalTime--;
    timeDisplay.innerHTML = totalTime;
    if (totalTime === 0) {
      endQuiz();
    }
  }, 1000);
}

// Function to calculate the time bonus for finishing the quiz before the timer ends
function calculateTimeBonus() {
  const timeLeft = totalTime;
  const timeBonus = timeLeft * 2; // 2 points per second
  return timeBonus;
}

// Event Listeners
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("skip-btn").addEventListener("click", skipQuestion);
document.getElementById("retake-btn").addEventListener("click", () => {
location.reload();
});



