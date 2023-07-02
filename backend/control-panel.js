/*
// Get the current URL path
var path = window.location.pathname;
// Find the corresponding navigation link and add 'active' class
$('.nav-link[href="' + path + '"]').parent().addClass('active');

*/

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

// Call the getBadWords function
getBadWords();
firebase.initializeApp(firebaseConfig); // Initialize Firebase outside the function


// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault();

  // Get the edited bad words from the form
  const badWordsTextArea = document.getElementById('sendBadWords');
  const editedBadWords = badWordsTextArea.value.split('\n').map(word => word.trim());

  console.log("editedBadWords   "  +editedBadWords);


  // Update the bad words array in the database
  const db = firebase.firestore();
  const settingsRef = db.collection('settings').doc('general');

  settingsRef.add({ badWords: editedBadWords })
    .then(() => {
      alert('Bad words updated successfully!');
      getBadWords();
    })
    .catch(error => {
      console.error('Error updating bad words:', error);
    });
}

// Add event listener to form submission
const editBadWordsForm = document.getElementById('editBadWordsForm');
editBadWordsForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent page refresh
  handleFormSubmission(); // Call the form submission handler function
});



// Function to fetch user statistics and render a chart
function renderUserStatsChart() {
  // Reference to the 'userStats' collection in Firebase Firestore
  const userStatsRef = firebase.firestore().collection('users');

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


// Function to fetch user data and populate the user table
function populateUserTable() {
  // Reference to the 'users' collection in Firebase Firestore
  const usersRef = firebase.firestore().collection('users');

  // Reference to the 'userTable' tbody element
  const userTableBody = document.querySelector('#userTable tbody');

  // Fetch user data from Firestore
  usersRef.get()
    .then((querySnapshot) => {
      // Clear existing table rows
      userTableBody.innerHTML = '';

      // Iterate over each user document
      querySnapshot.forEach((doc) => {
        // Get user data from the document
        const user = doc.data();
        const userId = doc.id;
        const userName = user.name;
        const userEmail = user.email;

        // Create a new table row
        const newRow = document.createElement('tr');

        // Create table cells for each user attribute
        const idCell = document.createElement('td');
        idCell.textContent = userId;

        const nameCell = document.createElement('td');
        nameCell.textContent = userName;

        const emailCell = document.createElement('td');
        emailCell.textContent = userEmail;

        // Append cells to the new row
        newRow.appendChild(idCell);
        newRow.appendChild(nameCell);
        newRow.appendChild(emailCell);

        // Append the new row to the table body
        userTableBody.appendChild(newRow);
      });
    })
    .catch((error) => {
      // Handle error fetching user data
      console.error('Error fetching user data:', error);
    });
}


// Call the functions to populate the components when the page loads or as needed
renderUserStatsChart();
populateUserTable();
