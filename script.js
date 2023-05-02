
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
  let currentQuestionIndex = 0;

  // Initialize quiz
  function initializeQuiz() {
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
    explanationElement.innerText = `Sorry, the correct answer is ${correctOption.innerText}. ${question.explanation}`;
    explanationElement.style.color = "#f44336";
  }
  explanationElement.style.display = "block";
  nextButton.disabled = false;
}

initializeQuiz();
