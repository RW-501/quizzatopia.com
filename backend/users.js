
// Function to fetch user data and populate the user table
// Function to fetch user data and populate the user table
function populateUserTable() {
  const usersRef = firebase.firestore().collection('users');
  const userTableBody = document.querySelector('#userTable tbody');

  usersRef.get()
    .then((querySnapshot) => {
      userTableBody.innerHTML = '';

      querySnapshot.forEach((doc) => {
        const user = doc.data();
        const userJoinedDate = doc.get('userJoinedDate');
        const userName = user.userName;
        const userEmail = user.userEmail;

        const newRow = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = userJoinedDate;

        const nameCell = document.createElement('td');
        nameCell.textContent = userName;

        const emailCell = document.createElement('td');
        emailCell.textContent = userEmail;

        const actionsCell = document.createElement('td');
        const deactivateButton = createActionButton('Deactivate', () => deactivateUser(doc.id));
        const removeButton = createActionButton('Remove', () => removeUser(doc.id));

        actionsCell.appendChild(deactivateButton);
        actionsCell.appendChild(removeButton);

        newRow.appendChild(idCell);
        newRow.appendChild(nameCell);
        newRow.appendChild(emailCell);
        newRow.appendChild(actionsCell);

        userTableBody.appendChild(newRow);
      });
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
}

// Function to create action buttons
function createActionButton(text, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', onClick);
  return button;
}


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

