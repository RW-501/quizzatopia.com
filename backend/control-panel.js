/*
// Get the current URL path
var path = window.location.pathname;
// Find the corresponding navigation link and add 'active' class
$('.nav-link[href="' + path + '"]').parent().addClass('active');

*/
//firebase.initializeApp(firebaseConfig); // Initialize Firebase outside the function

function getBadWords() {
  const db = firebase.firestore();
  const settingsRef = db.collection('settings').doc('general');

  settingsRef.get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        const badWords = data.badWords || [];

        // Display or use the retrieved bad words array
        console.log('Retrieved Bad Words:', badWords);
      } else {
        console.log('No bad words found in the database.');
      }
    })
    .catch(error => {
      console.error('Error retrieving bad words:', error);
    });
}




// Function to handle form submission
function handleFormSubmission() {
  // Get the edited bad words from the form
  const badWordsTextArea = document.getElementById('sendBadWords');
  const editedBadWords = badWordsTextArea.value.split('\n').map(word => word.trim());

  const db = firebase.firestore();
  const settingsRef = db.collection('settings').doc('general');

  // Check if the document exists before updating
  settingsRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        // Update the bad words field
        settingsRef.update({ badWords: editedBadWords })
          .then(() => {
            alert('Bad words updated successfully!');
            getBadWords();
          })
          .catch(error => {
            console.error('Error updating bad words:', error);
          });
      } else {
        // Create the document with the bad words field
        settingsRef.set({ badWords: editedBadWords })
          .then(() => {
            alert('Bad words created successfully!');
            getBadWords();
          })
          .catch(error => {
            console.error('Error creating bad words:', error);
          });
      }
    })
    .catch(error => {
      console.error('Error fetching document:', error);
    });
}


// Add event listener to form submission
const editBadWordsForm = document.getElementById('editBadWordsForm');
editBadWordsForm.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent page refresh
  handleFormSubmission(); // Call the form submission handler function
});



// Function to fetch user statistics and render a chart
function renderUserStatsChart() {
  // Reference to the 'userStats' collection in Firebase Firestore
  const userStatsRef = firebase.firestore().collection('userStats');

  // Reference to the "userStatsChart" canvas element
  const userStatsChartCanvas = document.getElementById('userStatsChart');

  // Fetch user statistics data from Firestore
  userStatsRef.get()
    .then((querySnapshot) => {
      // Extract data from query snapshot
      const data = querySnapshot.docs.map((doc) => doc.data());

      // Prepare data for the chart
      const labels = data.map((userStat) => userStat.label);
      const values = data.map((userStat) => userStat.value);

      // Create chart using Chart.js
      new Chart(userStatsChartCanvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'User Statistics',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch((error) => {
      // Handle error fetching user statistics data
      console.error('Error fetching user statistics data:', error);
    });
}


function getTotalUsers() {
  // Reference to the 'users' collection in Firebase Firestore
  const usersRef = firebase.firestore().collection('users');

  // Fetch all user documents and count the number of documents
  usersRef.get()
    .then((querySnapshot) => {
      const totalUsers = querySnapshot.size;
 document.getElementById('totalUsers').innerHTML = totalUsers;
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
}


window.addEventListener("load", function() {
// Call the getBadWords function
getBadWords();
	// Call the functions to populate the components when the page loads or as needed
renderUserStatsChart();
getTotalUsers();

});


