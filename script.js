document.addEventListener("DOMContentLoaded", () => {
  // Define the questions and answers
  const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "Madrid", correct: false },
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
      ],
      explanation: "Paris is the capital of France.",
    },
    {
      question: "What is the largest country in the world?",
      answers: [
        { text: "China", correct: false },
        { text: "Russia", correct: true },
        { text: "Canada", correct: false },
        { text: "USA", correct: false },
      ],
      explanation: "Russia is the largest country in the world.",
    },
    {
      question: "What is the highest mountain in the world?",
      answers: [
        { text: "Mount Everest", correct: true },
        { text: "K2", correct: false },
        { text: "Makalu", correct: false },
        { text: "Cho Oyu", correct: false },
      ],
      explanation: "Mount Everest is the highest mountain in the world.",
    },
  ];

  // Define variables
  const questionElement = document.getElementById("question");
  const optionElements = document.querySelectorAll(".answer-option");
  const explanationElement = document.getElementById("explanation");
  const nextButton = document.getElementById("next-btn");
  const skipButton = document.getElementById("skip-btn");
  const retakeButton = document.getElementById("retake-btn");
  const otherQuizButtons = document.querySelectorAll(".other-quiz-btn");
  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("result-container");
  const resultText = document.getElementById("result-text");
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;

  // Initialize quiz
  function initializeQuiz() {
    // Shuffle the questions
    shuffleQuestions(questions);

    // Show the first question
    showQuestion(currentQuestionIndex);

    // Add click event listener to answer options
    optionElements.forEach((option) => {
      option.addEventListener("click", () => {
        checkAnswer(option);
      });
    });

    // Add click event listener to next button
    nextButton.addEventListener("click", () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
      } else {
        endQuiz();
      }
    });

    // Add click event listener to skip button
    skipButton.addEventListener("click", () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
      } else {
        endQuiz();
      }
    });

    // Add click event listener to retake button
    retakeButton.addEventListener("click", () => {
      // Reset quiz variables
      currentQuestionIndex = 0;
      correctAnswers = 0;
      wrongAnswers = 0;

      // Shuffle the questions
      shuffleQuestions(questions);

      // Show the first question
      showQuestion(currentQuestionIndex);

      // Hide the result container
      resultContainer.style.display = "none";
    });

    // Add click event listener to other quiz buttons
    otherQuizButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Redirect to other quiz page
        window.location.href = button.dataset.url;
      });
    });
  }

 // Show a question
function showQuestion(index) {
console.log("?????22222222????????");
 const question = questions[index];
questionElement.innerText = question.question;
explanationElement.innerText = "";
explanationElement.style.display = "none";
nextButton.disabled = true;
optionElements.forEach((option, i) => {
  option.innerText = question.answers[i].text;
  option.classList.remove("correct");
  option.classList.remove("incorrect");
  option.disabled = false;
}); 
  
  }

function checkAnswer(selectedOption) {
const question = questions[currentQuestionIndex];
const selectedAnswer = question.answers.find(
(answer) => answer.text === selectedOption.innerText
);
optionElements.forEach((option) => {
if (option !== selectedOption) {
option.disabled = true;
}
});
if (selectedAnswer.correct) {
selectedOption.classList.add("correct");
explanationElement.innerText = "Correct!";
explanationElement.style.color = "#4caf50";
} else {
const correctOptionIndex = question.answers.findIndex(
(answer) => answer.correct === true
);
const correctOption = optionElements[correctOptionIndex];
correctOption.classList.add("correct");
selectedOption.classList.add("incorrect");
explanationElement.innerText = Sorry, the correct answer is ${correctOption.innerText}. ${question.explanation};
explanationElement.style.color = "#f44336";
}
explanationElement.style.display = "block";
nextButton.disabled = false;
}

function endQuiz() {
// Calculate percentage of correct answers
const correctAnswers = questions.filter((question) =>
question.answers.find((answer) => answer.correct)
);
const percentage = ((correctAnswers.length / questions.length) * 100).toFixed(
2
);
  // Display quiz results
questionElement.innerText = `You answered ${correctAnswers.length} out of ${questions.length} questions correctly, which is ${percentage}%`;
explanationElement.style.display = "none";
nextButton.style.display = "none";
skipButton.style.display = "none";

// Add retake button
const retakeButton = document.createElement("button");
retakeButton.innerText = "Retake Quiz";
retakeButton.classList.add("btn", "retake-btn");
retakeButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  initializeQuiz();
});
document.getElementById("quiz-buttons").appendChild(retakeButton);

// Add other quiz buttons
const otherQuizButtons = document.querySelectorAll(".other-quiz-btn");
otherQuizButtons.forEach((button) => {
  button.style.display = "inline-block";
  button.addEventListener("click", () => {
    // Redirect to other quiz page
    window.location.href = button.dataset.url;
  });
});
}

// Initialize quiz
function initializeQuiz() {
// Shuffle questions randomly
questions.sort(() => Math.random() - 0.5);
  
  // Show the first question
showQuestion(currentQuestionIndex);

// Add click event listener to answer options
optionElements.forEach((option) => {
  option.addEventListener("click", () => {
    checkAnswer(option);
  });
});

// Add click event listener to next button
nextButton.addEventListener("click", () => {
  console.log("??????????????????????????????????????????????");
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
});

// Add click event listener to skip button
skipButton.addEventListener("click", () => {
  console.log("?11111111111");

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
});

// End quiz
function endQuiz() {
  console.log("?????33333333333333????????");
  
  const score = calculateScore();
  const percentage = ((score / questions.length) * 100).toFixed(2);
  questionElement.innerText = `Quiz complete! You scored ${percentage}%`;
  explanationElement.innerText = "";
  nextButton.style.display = "none";
  skipButton.style.display = "none";
  retakeButton.style.display = "block";
  otherQuizzesContainer.style.display = "block";
}

// Calculate score
function calculateScore() {
  let score = 0;
  questions.forEach((question, index) => {
    const selectedOption = optionElements[index].innerText;
    const selectedAnswer = question.answers.find(answer => answer.text === selectedOption);
    if (selectedAnswer.correct) {
      score++;
    }
  });
  return score;
}

// Shuffle questions
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

// Initialize quiz
function initializeQuiz() {
  shuffleQuestions(); // shuffle the questions
  // Show the first question
  showQuestion(currentQuestionIndex);

  // Add click event listener to answer options
  optionElements.forEach(option => {
    option.addEventListener("click", () => {
      checkAnswer(option);
    });
  });

  // Add click event listener to next button
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex);
    } else {
      endQuiz();
    }
  });

  // Add click event listener to skip button
  skipButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex);
    } else {
      endQuiz();
    }
  });

  // Add click event listener to retake button
  retakeButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    shuffleQuestions(); // shuffle the questions
    showQuestion(currentQuestionIndex);
    nextButton.style.display = "block";
    skipButton.style.display = "block";
    retakeButton.style.display = "none";
    otherQuizzesContainer.style.display = "none";
  });

  // Add click event listener to other quiz buttons
  otherQuizzesButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Redirect to other quiz page
      window.location.href = button.dataset.url;
    });
  });
}

initializeQuiz(); // initialize the quiz


  
  
  
