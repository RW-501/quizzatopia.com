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

function populateVisitorDetails(visitorData) {
  const visitorDetailsContainer = document.querySelector('.visitor-details');

  // Clear existing content
  visitorDetailsContainer.innerHTML = '';

  visitorData.forEach(visitor => {
    // Create and append HTML elements for visitor details
    const ipElement = document.createElement('p');
    ipElement.textContent = `IP Address: ${visitor.ip}`;
    visitorDetailsContainer.appendChild(ipElement);

    const firstVisitElement = document.createElement('p');
    firstVisitElement.textContent = `First Visit: ${visitor.firstVisit}`;
    visitorDetailsContainer.appendChild(firstVisitElement);

    const lastVisitElement = document.createElement('p');
    lastVisitElement.textContent = `Last Visit: ${visitor.lastVisit}`;
    visitorDetailsContainer.appendChild(lastVisitElement);

    // Calculate and display visit duration
    const durationElement = document.createElement('p');
    const visitDuration = visitor.lastVisitTime - visitor.firstVisitTime;
    const formattedDuration = formatDuration(visitDuration);
    durationElement.textContent = `Visit Duration: ${formattedDuration}`;
    visitorDetailsContainer.appendChild(durationElement);

    // ... Add more visitor details as needed
    const bannedElement = document.createElement('p');
    bannedElement.textContent = `Banned: ${visitor.banned}`;
    visitorDetailsContainer.appendChild(bannedElement);

    const browserElement = document.createElement('p');
    browserElement.textContent = `Browser: ${visitor.browser}`;
    visitorDetailsContainer.appendChild(browserElement);

    const deviceElement = document.createElement('p');
    deviceElement.textContent = `Device: ${visitor.device}`;
    visitorDetailsContainer.appendChild(deviceElement);

    const lastVisitPageElement = document.createElement('p');
    lastVisitPageElement.textContent = `Last Visit Page: ${visitor.lastVisitPage}`;
    visitorDetailsContainer.appendChild(lastVisitPageElement);

    const referralPageElement = document.createElement('p');
    referralPageElement.textContent = `Referral Page: ${visitor.referralPage}`;
    visitorDetailsContainer.appendChild(referralPageElement);

    const userVisitCountElement = document.createElement('p');
    userVisitCountElement.textContent = `User Visit Count: ${visitor.userVisitCount}`;
    visitorDetailsContainer.appendChild(userVisitCountElement);

    // ... Add more visitor details as needed
  });
}

// Function to generate a chart using visitor data (adjust based on the chart library you're using)


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
    });
});
