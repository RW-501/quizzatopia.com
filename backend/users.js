// Function to fetch user data and populate the user table
let sortOrder = 'asc';

function populateUserTable(sortField, sortOrder) {
  const usersRef = firebase.firestore().collection('users');
  const userTableBody = document.querySelector('#userTable tbody');
  const userCountElement = document.querySelector('#userCount');

  // Define the date format function
  function formatDate(timestamp) {
    const now = new Date();
    const date = timestamp.toDate();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  }

  usersRef.orderBy(sortField, sortOrder).limit(10).get()
    .then((querySnapshot) => {
      userTableBody.innerHTML = '';
      let userCount = 0;

      querySnapshot.forEach((doc) => {
        const user = doc.data();
        const userJoinedDate = formatDate(doc.get('userJoinedDate'));
        const userName = user.userName || 'Anonymous';
        const userEmail = user.userEmail || 'Anonymous';
        const userQuizzesTaken = user.userQuizzesTaken || 0;
        const userPoints = user.userPoints || 0;

       // Create table row and cells
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

        userCount++;
      });

      userCountElement.textContent = `Total Users: ${userCount}`;
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

// Function to toggle sorting direction
function toggleSortDirection() {
  sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
  return sortOrder;
}

// Event listener for sorting buttons
const sortButtons = document.querySelectorAll('.sort-button');
sortButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const sortField = button.dataset.sortField;
    sortOrder = toggleSortDirection();
    populateUserTable(sortField, sortOrder);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Populate the table with default sorting by userName and ascending order
  populateUserTable('userName', 'asc');

  // Update the table every 5 minutes
  setInterval(() => {
    populateUserTable('userName', sortOrder);
  }, 5 * 60 * 1000); // 5 minutes in milliseconds
});
