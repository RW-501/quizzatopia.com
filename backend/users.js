
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
        newRow.classList.add('user-row');

        const idCell = createTableCell(userJoinedDate);
        const nameCell = createTableCell(userName);
        const emailCell = createTableCell(userEmail);

        const actionsCell = document.createElement('td');
        actionsCell.classList.add('actions-cell');

        const deactivateButton = createActionButton('Deactivate', () => {
          deactivateUser(doc.id);
        });

        const removeButton = createActionButton('Remove', () => {
          removeUser(doc.id);
        });

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

// Helper function to create a table cell
function createTableCell(content) {
  const cell = document.createElement('td');
  cell.textContent = content;
  return cell;
}

// Helper function to create an action button
function createActionButton(label, clickHandler) {
  const button = document.createElement('button');
  button.textContent = label;
  button.classList.add('action-button');
  button.addEventListener('click', clickHandler);
  return button;
}

// Call the function to populate the user table
populateUserTable();


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


document.addEventListener('DOMContentLoaded', function() {

populateUserTable();
getTotalUsers();

});

