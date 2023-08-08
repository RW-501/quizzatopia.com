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
          const visitor = {
            ip: doc.data().ip,
            firstVisit: doc.data().firstVisit,
            lastVisit: doc.data().lastVisit,
            banned: doc.data().banned,
            browser: doc.data().browser,
            device: doc.data().device,
            lastVisitPage: doc.data().lastVisitPage,
            lastVisitTime: doc.data().lastVisitTime,
            referralPage: doc.data().referralPage,
            userVisitCount: doc.data().userVisitCount
            // Map other database fields to corresponding variables
          };
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

// Function to format duration in HH:MM:SS format
function formatDuration(duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  return `${hours}:${minutes}:${seconds}`;
}

// Function to populate visitor details in the DOM
function populateVisitorDetails(visitorData) {
  const visitorDetailsContainer = document.querySelector('.visitor-details');
  visitorDetailsContainer.innerHTML = '';

  visitorData.forEach(visitor => {
    const newRow = document.createElement('div');
    newRow.classList.add('visitor-row');

    const ipElement = createDetailElement('IP Address', visitor.ip);
    const firstVisitElement = createDetailElement('First Visit', visitor.firstVisit);
    const lastVisitElement = createDetailElement('Last Visit', visitor.lastVisit);
    const durationElement = createDetailElement('Visit Duration', formatDuration(visitor.lastVisitTime - visitor.firstVisitTime));
    const bannedElement = createDetailElement('Banned', visitor.banned);
    const browserElement = createDetailElement('Browser', visitor.browser);
    const deviceElement = createDetailElement('Device', visitor.device);
    const lastVisitPageElement = createDetailElement('Last Visit Page', visitor.lastVisitPage);
    const referralPageElement = createDetailElement('Referral Page', visitor.referralPage);
    const userVisitCountElement = createDetailElement('User Visit Count', visitor.userVisitCount);

    newRow.appendChild(ipElement);
    newRow.appendChild(firstVisitElement);
    newRow.appendChild(lastVisitElement);
    newRow.appendChild(durationElement);
    newRow.appendChild(bannedElement);
    newRow.appendChild(browserElement);
    newRow.appendChild(deviceElement);
    newRow.appendChild(lastVisitPageElement);
    newRow.appendChild(referralPageElement);
    newRow.appendChild(userVisitCountElement);

    visitorDetailsContainer.appendChild(newRow);
  });
}

// Helper function to create a visitor detail element
function createDetailElement(label, value) {
  const element = document.createElement('p');
  element.innerHTML = `<strong>${label}:</strong> ${value}`;
  return element;
}




function getTopReferralPages(visitorData) {
  const referralPages = visitorData.map(visitor => visitor.referralPage);
  const pageCounts = {};

  // Count the occurrences of each referral page
  referralPages.forEach(page => {
    if (pageCounts[page]) {
      pageCounts[page]++;
    } else {
      pageCounts[page] = 1;
    }
  });

  // Sort the referral pages based on the count in descending order
  const sortedPages = Object.keys(pageCounts).sort((a, b) => pageCounts[b] - pageCounts[a]);

  // Get the top referral pages and their counts
  const topPages = sortedPages.slice(0, 5);
  const pageCountsTop = topPages.map(page => pageCounts[page]);

  // Create the chart using Chart.js
  const chartCanvas = document.getElementById('chart');
  new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: topPages,
      datasets: [
        {
          label: 'Referral Page Count',
          data: pageCountsTop,
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

  // Return the top referral pages
  return topPages;
}

const topReferralPages = getTopReferralPages(visitorData);
console.log('Top Referral Pages:', topReferralPages);



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
    const duration = visitor.lastVisitTime - visitor.firstVisitTime;
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
      getTopReferralPages(visitorData);

      // Populate data table
      populateDataTable(visitorData);

      // Calculate and display visit durations
      calculateVisitDurations(visitorData);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  });
