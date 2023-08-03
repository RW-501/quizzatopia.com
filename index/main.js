











// Assuming you have an array of featured quizzes

const featuredQuizzes = [
{ title: 'Job Interview', image: '/images/sq/26.png', description: 'Land Your Dream Job with Confidence!', url: '/quiz/?e=New&q=q_209_' },
{ title: 'Pop Culture', image: '/images/sq/3.png', description: 'Test Your Pop Culture Knowledge and Become the Ultimate Trendsetter!', url: '/?e=New&q=q_23_' },
{ title: 'Web Development', image: '/images/sq/45.png', description: 'Unlock the Secrets of Web Development and Master the Digital Frontier!', url: '/quiz/?e=New&q=q_255_' },
{ title: 'Self Health', image: '/images/sq/54.png', description: 'Discover Your Path to Wellness and Embrace a Healthier You!', url: '/quiz/?e=New&q=q_190_' },
{ title: 'Movies', image: '/images/sq/35.png', description: 'Lights, Camera, Action! Dive into the Cinematic Universe and Become a Movie Guru!', url: '/quiz/?e=New&q=q_238_' }
];

// Assuming you want to populate the quiz cards dynamically
const carousel = $('.carousel_top');

featuredQuizzes.forEach(quiz => {
  const quizCard = $('<div>').addClass('quiz-card_top');
  
  // Add HTML content for the quiz card using quiz.title, quiz.image, quiz.description
const quizContent = `
  <a href="${quiz.url}" class="quiz-card">
    <img src="${quiz.image}" alt="${quiz.title}" class="quiz-image">
    <h3 class="quiz-title">${quiz.title}</h3>
    <p class="quiz-description">${quiz.description}</p>
  </a>
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

	
	
	
	
	
