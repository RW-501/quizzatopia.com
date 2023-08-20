// Function to fetch user data and populate the user table
function populateUserTable(sortField) {
  const usersRef = firebase.firestore().collection('users');
  const userTableBody = document.querySelector('#userTable tbody');

querySnapshot.orderBy(sortField, 'asc').get()
    .then((querySnapshot) => {
      userTableBody.innerHTML = '';

      querySnapshot.forEach((doc) => {
        const user = doc.data();
        const userJoinedDate = doc.get('userJoinedDate');
        const userName = user.userName;
        const userEmail = user.userEmail;
        const userQuizzesTaken = user.userQuizzesTaken || 0;
        const userPoints = user.userPoints || 0;

        const newRow = document.createElement('tr');
        newRow.classList.add('user-row');

        const idCell = createTableCell(userJoinedDate);
        const nameCell = createTableCell(userName);
        const emailCell = createTableCell(userEmail);
        const quizzesTakenCell = createTableCell(userQuizzesTaken);
        const pointsCell = createTableCell(userPoints);

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
        newRow.appendChild(quizzesTakenCell);
        newRow.appendChild(pointsCell);
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

function sortTable(sortField) {
  populateUserTable(sortField);
}

document.addEventListener('DOMContentLoaded', function() {
  // Populate the table with default sorting by userName
  populateUserTable('userName');
});
