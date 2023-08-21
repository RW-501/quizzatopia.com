// Function to fetch guest log data and populate the guest log table
function populateGuestLogTable(sortField) {
  const guestLogRef = firebase.firestore().collection('guestLog');
  const guestLogTableBody = document.querySelector('#guestLogTable tbody');

  guestLogRef.orderBy(sortField, 'desc').limit(20).get()
    .then((querySnapshot) => {
      guestLogTableBody.innerHTML = '';

      querySnapshot.forEach((doc) => {
        const guest = doc.data();
        const banned = guest.banned;
        const browser = guest.browser;
        const device = guest.device;
        const firstVisitPage = guest.firstVisitPage;
        const firstVisitTime = new Date(guest.firstVisitTime.toDate()).toLocaleString();
        const lastVisitPage = guest.lastVisitPage;
        const lastVisitTime = new Date(guest.lastVisitTime.toDate()).toLocaleString();
        const referralPage = guest.referralPage;
        const userVisitCount = guest.userVisitCount || 0;

        // Update the total visit count
        totalVisitCount += userVisitCount;

        const newRow = document.createElement('tr');
        newRow.classList.add('guest-row');

        const bannedCell = createTableCell(banned);
        const browserCell = createTableCell(browser);
        const deviceCell = createTableCell(device);
        const firstVisitPageCell = createTableCell(firstVisitPage);
        const firstVisitTimeCell = createTableCell(firstVisitTime);
        const lastVisitPageCell = createTableCell(lastVisitPage);
        const lastVisitTimeCell = createTableCell(lastVisitTime);
        const referralPageCell = createTableCell(referralPage);
        const userVisitCountCell = createTableCell(userVisitCount);

        newRow.appendChild(bannedCell);
        newRow.appendChild(browserCell);
        newRow.appendChild(deviceCell);
        newRow.appendChild(firstVisitPageCell);
        newRow.appendChild(firstVisitTimeCell);
        newRow.appendChild(lastVisitPageCell);
        newRow.appendChild(lastVisitTimeCell);
        newRow.appendChild(referralPageCell);
        newRow.appendChild(userVisitCountCell);

        guestLogTableBody.appendChild(newRow);
      });

      // Update the total visit count in your HTML
      document.getElementById('totalVisitCount').textContent = totalVisitCount;
    })
    .catch((error) => {
      console.error('Error fetching guest log data:', error);
    });
}

// Helper function to create a table cell
function createTableCell(content) {
  const cell = document.createElement('td');
  cell.textContent = content;
  return cell;
}

// Helper function to calculate time elapsed between two dates
function calculateTimeElapsed(currentTime, lastVisitTime) {
  const timeDifference = currentTime - lastVisitTime;
  const seconds = Math.floor((timeDifference / 1000) % 60);
  const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let timeElapsed = '';
  if (days > 0) timeElapsed += `${days}d `;
  if (hours > 0) timeElapsed += `${hours}h `;
  if (minutes > 0) timeElapsed += `${minutes}m `;
  if (seconds > 0) timeElapsed += `${seconds}s`;

  return timeElapsed;
}

function sortTable(sortField) {
  populateGuestLogTable(sortField);
}
// Call populateGuestLogTable every minute (60,000 milliseconds)
setInterval(() => {
  populateGuestLogTable('firstVisitTime');
}, 60000); // 60000 milliseconds = 1 minute

document.addEventListener('DOMContentLoaded', function() {
  // Populate the table with default sorting by firstVisitTime
  populateGuestLogTable('firstVisitTime');
});
