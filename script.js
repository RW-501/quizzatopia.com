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
answerElement.innerText = currentQuestion.answers[index].text;
answerElement.removeEventListener("click", handleAnswerButtonClick);
answerElement.addEventListener("click", handleAnswerButtonClick);
});
}

// function to handle answer
function handleAnswer(event) {
const selectedAnswer = event.target.innerText;
const currentQuestion = quizData[currentQuestionIndex];
if (selectedAnswer === currentQuestion.answers[index].text) {
score++;
}
showExplanation();
disableAnswerButtons();
showNextButton();
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
  const percentage = (score / quizData.length) * 100;
  resultText.innerText = `You got ${score} out of ${quizData.length} questions correct (${percentage}%).`;
  resultContainer.style.display = "block";
}


// function to handle retake button click
function handleRetakeButtonClick() {
currentQuestionIndex = 0;
score = 0;
hideResult();
showQuestion();
}

// function to show result
function showResult() {
const percentage = (score / quizData.length) * 100;
resultText.innerText = You got ${score} out of ${quizData.length} questions correct (${percentage}%).;
resultContainer.style.display = "block";
}

// function to hide result
function hideResult() {
resultContainer.style.display = "none";
}

// function to handle other quiz button click
function handleOtherQuizButtonClick() {
window.location.reload();
}

// event listeners
nextButton.addEventListener("click", handleNextButtonClick);
skipButton.addEventListener("click", handleSkipButtonClick);
retakeButton.addEventListener("click", handleRetakeButtonClick);
otherQuizButtons.forEach((button) => {
button.addEventListener("click", handleOtherQuizButtonClick);
});

// initialize quiz
initializeQuiz();

// Exporting the necessary variables and functions
export { quizData, showQuestion, handleAnswerButtonClick, handleNextButtonClick, handleSkipButtonClick, handleRetakeButtonClick, handleOtherQuizButtonClick };
