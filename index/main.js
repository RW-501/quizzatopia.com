











// Assuming you have an array of featured quizzes
const featuredQuizzes = [
  { title: 'Quiz 1', image: 'quiz1.jpg', description: 'Description of Quiz 1' },
  { title: 'Quiz 2', image: 'quiz2.jpg', description: 'Description of Quiz 2' },
  { title: 'Quiz 3', image: 'quiz3.jpg', description: 'Description of Quiz 3' }
];

// Assuming you want to populate the quiz cards dynamically
const carousel = $('.carousel');

featuredQuizzes.forEach(quiz => {
  const quizCard = $('<div>').addClass('quiz-card');
  
  // Add HTML content for the quiz card using quiz.title, quiz.image, quiz.description
  const quizContent = `
    <img src="${quiz.image}" alt="${quiz.title}" class="quiz-image">
    <h3 class="quiz-title">${quiz.title}</h3>
    <p class="quiz-description">${quiz.description}</p>
  `;
  
  quizCard.html(quizContent);
  carousel.append(quizCard);
});

    
	$(document).ready(function() {
  $('.carousel').on('scroll', function() {
    const scrollPosition = $('.carousel').scrollLeft();
    const cardWidth = $('.quiz-card').outerWidth();
    const activeCardIndex = Math.floor(scrollPosition / cardWidth);
  
    // Add any desired effects or visual indicators to the active quiz card
    $('.quiz-card').removeClass('active');
    $('.quiz-card').eq(activeCardIndex).addClass('active');
  
    // Update any related content based on the active quiz card, such as updating a preview or displaying additional information
    const activeQuizTitle = $('.quiz-card.active').find('.quiz-title').text();
    const activeQuizDescription = $('.quiz-card.active').find('.quiz-description').text();
    $('.active-quiz-title').text(activeQuizTitle);
    $('.active-quiz-description').text(activeQuizDescription);
  });
  
  $('.quiz-card').hover(function() {
    const quizTitle = $(this).find('.quiz-title').text();
    const quizPreview = $(this).find('.quiz-preview').html();
  
    // Display the quiz preview or update any related content on hover
    $('.quiz-preview-container').html(quizPreview);
    $('.quiz-preview-container').addClass('show');
  }, function() {
    // Hide the quiz preview or reset any related content
    $('.quiz-preview-container').removeClass('show');
    $('.quiz-preview-container').empty();
  });
  
  $('.call-to-action-button').on('click', function() {
    const quizId = $(this).data('quiz-id');
  
    // Perform any necessary action, such as redirecting to the quiz page or triggering a modal
    // Example: window.location.href = '/quizzes/' + quizId;
  });
});
    






	function getQuizInfo() {
  const quizInfoContainer = document.getElementById('quizInfoContainer');
  quizInfoContainer.innerHTML = ''; // Clear previous content

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('quizInfo_')) {
      const quizInfo = JSON.parse(localStorage.getItem(key));
      const quizName = quizInfo.quizName;
      const questionCorrect = quizInfo.questionCorrect;
      const numberOfQuestions = quizInfo.numberOfQuestions;
      const quizLink = quizInfo.quizLink;
      const quizTime = quizInfo.timestamp;

      const quizInfoElement = document.createElement('div');
      quizInfoElement.classList.add('quiz-info');
      quizInfoElement.innerHTML = `
        <a href="/quiz?q=${quizLink}"><h4>${quizName}</h4></a>
        <p>Quiz Taken: ${quizTime}</p>
        <p>Score: ${questionCorrect}/${numberOfQuestions} questions</p>
      `;
      
      quizInfoContainer.appendChild(quizInfoElement);
    }
  }
}

// Call the getQuizInfo() function to populate the quiz recommendations on page load
getQuizInfo();
	





 $(document).ready(function() {
    $('.carousel').carousel({
      interval: 5000 // change the slide every 5 seconds
    });
  });
	
	






	function scheduleNotification() {
  // Check if the browser supports notifications
  if (!('Notification' in window)) {
    console.log('Browser does not support notifications');
    return;
  }

  // Request permission to show notifications
  Notification.requestPermission().then(function (permission) {
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return;
    }

    // Calculate the notification time (2 days from now)
    const notificationTime = Date.now() + 2 * 24 * 60 * 60 * 1000;

    // Create a notification
    const notification = new Notification('Reminder', {
      body: 'Don\'t forget to come back to Quizzatopia! Test your knowledge with our exciting quizzes and challenge yourself. We can\'t wait to see you again!',
      icon: '/images/logo.png',
    });

    // Schedule the notification to be shown in 2 days
    setTimeout(function () {
      notification.show();
    }, notificationTime - Date.now());
  });
}

// Call the function to schedule the notification
scheduleNotification();

	
	
	
	
	
