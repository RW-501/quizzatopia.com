// quiz data
const quizData = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "New York", correct: false },
      { text: "London", correct: false },
      { text: "Paris", correct: true },
      { text: "Berlin", correct: false }
    ],
    explanation: "Paris is the capital of France."
  },
  {
    question: "What is the tallest mammal?",
    answers: [
      { text: "Giraffe", correct: true },
      { text: "Elephant", correct: false },
      { text: "Horse", correct: false },
      { text: "Kangaroo", correct: false }
    ],
    explanation: "The giraffe is the tallest mammal in the world."
  },
  // add more question objects here
];

// variables
let currentQuestionIndex = 0;
let score = 0;

// DOM elements
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerElements = document.querySelectorAll(".answer-option");
const explanationElement = document.getElementById("explanation");
const nextButton = document.getElementById("next-btn");
const skipButton = document.getElementById("skip-btn");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const retakeButton = document.getElementById("retake-btn");
const otherQuizButtons = document.querySelectorAll(".other-quiz-btn");

// function to initialize quiz
function initializeQuiz() {
  showQuestion();
  hideExplanation();
  hideResult();
}

// function to show question
function showQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  answerElements.forEach((answerElement, index) => {
    answerElement.innerText = currentQuestion.answers[index];
    answerElement.removeEventListener("click", handleAnswer);
    answerElement.addEventListener("click", handleAnswer);
  });
}

// function to handle answer
function handleAnswer(event) {
  const selectedAnswer = event.target.innerText;
  const currentQuestion = quizData[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.correctAnswer) {
    score++;
  }
  showExplanation();
  disableAnswerButtons();
  showNextButton();
}

// function to show explanation
function showExplanation() {
  const currentQuestion = quizData[currentQuestionIndex];
  explanationElement.innerText = currentQuestion.explanation;
  explanationElement.style.display = "block";
}

// function to hide explanation
function hideExplanation() {
  explanationElement.style.display = "none";
}

// function to disable answer buttons
function disableAnswerButtons() {
  answerElements.forEach((answerElement) => {
    answerElement.disabled = true;
  });
}

// function to enable answer buttons
function enableAnswerButtons() {
  answerElements.forEach((answerElement) => {
    answerElement.disabled = false;
  });
}

// function to show next button
function showNextButton() {
  nextButton.style.display = "block";
}

// function to hide next button
function hideNextButton() {
  nextButton.style.display = "none";
}

// function to show skip button
function showSkipButton() {
  skipButton.style.display = "block";
}

// function to hide skip button
function hideSkipButton() {
  skipButton.style.display = "none";
}

// function to handle next button click
function handleNextButtonClick() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
    hideExplanation();
    hideNextButton();
    enableAnswerButtons();
    hideSkipButton();
  } else {
    showResult();
  }
}

// function to handle skip button click
function handleSkipButtonClick() {
currentQuestionIndex++;
if (currentQuestionIndex < quizData.length) {
showQuestion();
hideExplanation();
hideNextButton();
enableAnswerButtons();
hideSkipButton();
} else {
showResult();
}
}

// function to handle answer button click
function handleAnswerButtonClick(e) {
const selectedAnswer = e.target.innerText;
const correctAnswer = quizData[currentQuestionIndex].correctAnswer;

disableAnswerButtons();

if (selectedAnswer === correctAnswer) {
e.target.classList.add('correct');
incrementScore();
} else {
e.target.classList.add('incorrect');
showExplanation();
}

showNextButton();
showSkipButton();
}

// function to enable answer buttons
function enableAnswerButtons() {
const answerButtons = document.querySelectorAll('.answer-option');
answerButtons.forEach(button => {
button.disabled = false;
button.classList.remove('correct', 'incorrect');
});
}

// function to disable answer buttons
function disableAnswerButtons() {
const answerButtons = document.querySelectorAll('.answer-option');
answerButtons.forEach(button => {
button.disabled = true;
});
}

// function to show explanation
function showExplanation() {
const explanation = document.getElementById('explanation');
explanation.innerText = quizData[currentQuestionIndex].explanation;
explanation.style.display = 'block';
}

// function to hide explanation
function hideExplanation() {
const explanation = document.getElementById('explanation');
explanation.style.display = 'none';
}

// function to show next button
function showNextButton() {
const nextButton = document.getElementById('next-btn');
nextButton.style.display = 'block';
}

// function to hide next button
function hideNextButton() {
const nextButton = document.getElementById('next-btn');
nextButton.style.display = 'none';
}

// function to show skip button
function showSkipButton() {
const skipButton = document.getElementById('skip-btn');
skipButton.style.display = 'block';
}

// function to hide skip button
function hideSkipButton() {
const skipButton = document.getElementById('skip-btn');
skipButton.style.display = 'none';
}

// function to increment score
function incrementScore() {
score++;
}

// function to show quiz result
function showResult() {
const scorePercentage = (score / quizData.length) * 100;
const resultText = document.getElementById('result-text');
resultText.innerText = You scored ${scorePercentage}%;
const quizContainer = document.getElementById('quiz-container');
quizContainer.style.display = 'none';
const resultContainer = document.getElementById('result-container');
resultContainer.style.display = 'block';
}

// function to retake quiz
function handleRetakeButtonClick() {
currentQuestionIndex = 0;
score = 0;
showQuestion();
hideExplanation();
hideNextButton();
enableAnswerButtons();
hideSkipButton();
const quizContainer = document.getElementById('quiz-container');
quizContainer.style.display = 'block';
const resultContainer = document.getElementById('result-container');
resultContainer.style.display = 'none';
}

// function to try another quiz
function handleOtherQuizButtonClick(e) {
const quizUrl = e.target.dataset.url;
window.location.href = quizUrl;
}


// add event listeners to buttons

document.getElementById("next-btn").addEventListener("click", handleNextButtonClick);
document.getElementById("skip-btn").addEventListener("click", handleSkipButtonClick);
document.getElementById("retake-btn").addEventListener("click", handleRetakeButtonClick);
const otherQuizButtons = document.querySelectorAll(".other-quiz-btn");
otherQuizButtons.forEach(function(button) {
  button.addEventListener("click", handleOtherQuizButtonClick);
});



