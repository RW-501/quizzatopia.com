
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
        const userJoinedDate = doc.get('userJoinedDate'); // Access the 'userJoinedDate' field correctly
        const userName = user.userName;
        const userEmail = user.userEmail;

        // Create a new table row
        const newRow = document.createElement('tr');

        // Create table cells for each user attribute
        const idCell = document.createElement('td');
        idCell.textContent = userJoinedDate;

        const nameCell = document.createElement('td');
        nameCell.textContent = userName;

        const emailCell = document.createElement('td');
        emailCell.textContent = userEmail;

        // Create buttons for deactivating and removing users
        const deactivateButton = document.createElement('button');
        deactivateButton.textContent = 'Deactivate';
        deactivateButton.addEventListener('click', () => {
          deactivateUser(doc.id); // Call the deactivateUser function with the document ID
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
          removeUser(doc.id); // Call the removeUser function with the document ID
        });

        // Append cells and buttons to the new row
        newRow.appendChild(idCell);
        newRow.appendChild(nameCell);
        newRow.appendChild(emailCell);
        newRow.appendChild(deactivateButton);
        newRow.appendChild(removeButton);

        // Append the new row to the table body
        userTableBody.appendChild(newRow);
      });
    })
    .catch((error) => {
      // Handle error fetching user data
      console.error('Error fetching user data:', error);
    });
}

function deactivateUser(userId) {
  // Reference to the 'users' collection in Firebase Firestore
  const usersRef = firebase.firestore().collection('users');

  // Update the user document with the provided userId
  usersRef.doc(userId).update({
    isActive: false // Set the 'isActive' field to false
  })
    .then(() => {
      console.log('User deactivated successfully');
    })
    .catch((error) => {
      console.error('Error deactivating user:', error);
    });
}

function removeUser(userId) {
  // Reference to the 'users' collection in Firebase Firestore
  const usersRef = firebase.firestore().collection('users');

  // Remove the user document with the provided userId
  usersRef.doc(userId).delete()
    .then(() => {
      console.log('User removed successfully');
    })
    .catch((error) => {
      console.error('Error removing user:', error);
    });
}

function getTotalUsers() {
  // Reference to the 'users' collection in Firebase Firestore
  const usersRef = firebase.firestore().collection('users');

  // Fetch all user documents and count the number of documents
  usersRef.get()
    .then((querySnapshot) => {
      const totalUsers = querySnapshot.size;
      console.log('Total users:', totalUsers);
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
}


window.addEventListener("load", function() {

populateUserTable();
getTotalUsers();

});

