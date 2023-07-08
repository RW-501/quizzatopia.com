// Function to fetch visitor data from the backend (adjust the API endpoint accordingly)
// Function to fetch visitor data from Firebase Firestore
function fetchVisitorData() {
  return new Promise((resolve, reject) => {
    // Replace 'guestLog' with the actual collection name in your Firestore
    db.collection('guestLog')
      .get()
      .then(querySnapshot => {
        const visitorData = [];
        querySnapshot.forEach(doc => {
          const visitor = doc.data();
          visitorData.push(visitor);
        });
        resolve(visitorData);
      })
      .catch(error => {
        console.error('Error fetching visitor data:', error);
        reject(error);
      });
  });
}

// Function to populate the visitor details section
function populateVisitorDetails(visitorData) {
  const visitorDetailsContainer = document.querySelector('.visitor-details');

  // Clear existing content
  visitorDetailsContainer.innerHTML = '';

// Create and append HTML elements for visitor details
const ipElement = document.createElement('p');
ipElement.textContent = `IP Address: ${visitorData.ip}`;
visitorDetailsContainer.appendChild(ipElement);

const firstVisitElement = document.createElement('p');
firstVisitElement.textContent = `First Visit: ${visitorData.firstVisit}`;
visitorDetailsContainer.appendChild(firstVisitElement);

const lastVisitElement = document.createElement('p');
lastVisitElement.textContent = `Last Visit: ${visitorData.lastVisit}`;
visitorDetailsContainer.appendChild(lastVisitElement);

// Calculate and display visit duration
const durationElement = document.createElement('p');
const visitDuration = visitorData.lastVisit - visitorData.firstVisit;
const formattedDuration = formatDuration(visitDuration);
durationElement.textContent = `Visit Duration: ${formattedDuration}`;
visitorDetailsContainer.appendChild(durationElement);

// ... Add more visitor details as needed

}

// Function to generate a chart using visitor data (adjust based on the chart library you're using)
// Function to generate a chart using visitor data (using Chart.js)
function generateChart(visitorData) {
  const chartCanvas = document.getElementById('chart');

  // Extract labels and visits data from visitorData
  const labels = visitorData.map(visitor => visitor.date);
  const visits = visitorData.map(visitor => visitor.visits);

  // Create the chart using Chart.js
  new Chart(chartCanvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Visits',
          data: visits,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      // Additional options for customization
    }
  });
}


// Function to populate the data table with visitor data
function populateDataTable(visitorData) {
  const dataTableBody = document.querySelector('.data-table tbody');

  // Clear existing content
  dataTableBody.innerHTML = '';

  // Loop through visitor data and create table rows
  visitorData.forEach(visitor => {
    const row = document.createElement('tr');

    const ipCell = document.createElement('td');
    ipCell.textContent = visitor.ip;
    row.appendChild(ipCell);

    const firstVisitCell = document.createElement('td');
    firstVisitCell.textContent = visitor.firstVisit;
    row.appendChild(firstVisitCell);

    const lastVisitCell = document.createElement('td');
    lastVisitCell.textContent = visitor.lastVisit;
    row.appendChild(lastVisitCell);

    // ... Add more cells for referral page, user agent, etc.

    dataTableBody.appendChild(row);
  });
}

// Function to calculate and display visit durations
function calculateVisitDurations(visitorData) {
  const totalDurationElement = document.getElementById('total-duration');
  const averageDurationElement = document.getElementById('average-duration');

  // Calculate total visit duration
  const totalDuration = visitorData.reduce((total, visitor) => {
    const duration = visitor.lastVisit - visitor.firstVisit;
    return total + duration;
  }, 0);

  // Calculate average visit duration
  const averageDuration = totalDuration / visitorData.length;

  // Display visit durations
  totalDurationElement.textContent = formatDuration(totalDuration);
  averageDurationElement.textContent = formatDuration(averageDuration);
}

// Function to format visit durations (in milliseconds) to a user-friendly format
function formatDuration(duration) {
  // ... Implement the formatting logic based on your preferences
  // Example: Convert milliseconds to minutes and round to two decimal places
  const minutes = Math.round(duration / 60000 * 100) / 100;
  return `${minutes} minutes`;
}

// Entry point
document.addEventListener('DOMContentLoaded', function () {
  // Fetch visitor data from the backend
  fetchVisitorData()
    .then(visitorData => {
      // Populate visitor details section
      populateVisitorDetails(visitorData);

      // Generate chart
      generateChart(visitorData);

      // Populate data table
      populateDataTable(visitorData);

      // Calculate and display visit durations
      calculateVisitDurations(visitorData);
    });
});
