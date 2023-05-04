// Quiz Questions
/*
const questions = [];

// fetch and assign the data
fetch("q/MCU.json")
  .then(response => response.json())
  .then(data => {
    // Use the questions data here
    //console.log("????????????????DATA"   + data);
    questions.push(...data);
  })
  .catch(error => console.error(error));


*/
console.log("questions 1    mm  "+questions); // Outputs a random order of the words

const questions = shuffleArray([...questions]);



console.log("questions 2    mm  "+questions); // Outputs a random order of the words


// Global Variables
let questionTime = 0; // seconds
let currentQuestion = 0;
let score = 0;
let quizStarted = false;
let timer = 0;
let answeredQuestions = [];
let countdownPerQuestion = false; // set to true if the countdown should happen for each question
let totalTime = 0; // seconds
let totalQuestions = questions.length;
let timerEnabled = false;

// Functions
    console.log(totalQuestions+"????????????totalQuestions????"); // Output: 3

// Function to set quiz time
function setQuizTime() {
  const quizTimeInput = document.getElementById("quiz-time");
  const newQuizTime = parseInt(quizTimeInput.value);
  totalQuestions = questions.length;
      console.log(totalQuestions+"   ????????????totalQuestions????"); // Output: 3
      console.log(timerEnabled+"   vvvtimerEnabled????"); // Output: 3

  if (timerEnabled == true) {
        console.log("     m????????????timerEnabled????"); // Output: 3
    questionTime = newQuizTime;
    totalTime = newQuizTime;
   
      startTimer();
    
  }
}



// Function to start the quiz
function startQuiz() {
  quizStarted = true;
  document.getElementById("start-btn").classList.add("d-none");
  document.getElementById("quiz-container").classList.remove("d-none");
    document.getElementById("quiz-options").classList.add("d-none");

  showQuestion();

  setQuizTime();

  answeredQuestions = [];
  updateProgressBar(currentQuestion);
  

}



// Add an event listener to the timer checkbox to update the timerEnabled variable
const timerCheckbox = document.getElementById("timer-checkbox");
timerCheckbox.addEventListener("change", function () {
  timerEnabled = timerCheckbox.checked;
          console.log(timerEnabled+"     timerEnabled??????????timerEnabled????     "); // Output: 3

});


const countdownCheckbox = document.getElementById("countdown-per-question");
countdownCheckbox.addEventListener("change", function() {
  countdownPerQuestion = countdownCheckbox.checked;
            console.log(countdownPerQuestion+"     countdownPerQuestion??????????countdownPerQuestion????     "); // Output: 3
  timerCheckbox.checked = true;
timerEnabled = true;
            console.log(timerEnabled+"     timerEnabled??????????timerEnabled????     "); // Output: 3

});






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
  if (countdownPerQuestion && timerEnabled) { // start timer only if countdown is per question and timer is enabled
    totalTime = questionTime;
    startTimer();
  }
}



  // Get the progress bar element
var progressBar = document.getElementById('progress-bar');

// Update the progress bar
function updateProgressBar(currentQuestion) {
  let QuestionNewNum = currentQuestion + 1;
  var percentage = (currentQuestion / totalQuestions) * 100;
  progressBar.style.width = percentage + '%';
  //      console.log(QuestionNewNum+"  updateProgressBar??????????currentQuestion????"); // Output: 3
    //    console.log(totalQuestions+"  totalQuestions??????????totalQuestions????"); // Output: 3

}   

// Function to check the user's answer
function checkAnswer() {
  const selectedOption = this;
  const optionContainers = document.querySelectorAll("#optionContainers button.answer-option");
  const selectedAnswer = selectedOption.innerHTML;
  const questionObj = questions[currentQuestion];
  const options = optionContainers[currentQuestion]?.children;
  const explanation = questionObj.explanation;

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
  updateProgressBar(currentQuestion);
}

// Function to skip the current question
function skipQuestion() {
  currentQuestion++;

  if (currentQuestion < totalQuestions) {
    enableAnswerButtons();
    showQuestion();
    document.getElementById("next-btn").classList.add("d-none");
  } else {
    endQuiz();
  }
  updateProgressBar(currentQuestion);
}

    // update the progress bar
  updateProgressBar(currentQuestion);
//    console.log(currentQuestion+"????????????currentQuestion????"); // Output: 3

// Function to end the quiz
function endQuiz() {
  clearInterval(timer);
  quizStarted = false;
document.getElementById("timer").innerHTML = "";
    const feedback = calculateFeedback();
    document.getElementById("feedback").innerHTML = feedback;
  
  const percentageScore = Math.round((score / totalQuestions) * 100);
  const resultMsg = `You scored ${score}/${totalQuestions} (${percentageScore}%)`;
  document.getElementById("score").innerHTML = resultMsg;
  document.getElementById("quiz-container").classList.add("d-none");
  document.getElementById("end-container").classList.remove("d-none");
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


// Event Listeners
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("skip-btn").addEventListener("click", skipQuestion);
document.getElementById("retake-btn").addEventListener("click", () => {
location.reload();
});



