document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("challenge-form");
    const messageDiv = document.getElementById("message");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const userId = document.getElementById("user-id").value;
        const weekStartDate = document.getElementById("week-start-date").value;
        const challengesStr = document.getElementById("challenges").value;
        const challengeIds = challengesStr.split(",").map(id => id.trim());

        // Construct the document data
        const userChallenges = {
            userID: userId,
            weekStartDate: weekStartDate,
            challenges: challengeIds.map(challengeId => ({
                challengeID: challengeId,
                status: "Not Done",
                completionDate: null
            }))
        };

 // When you're ready to add or update a document in the "weeklyUserChallenges" collection:
firestore.collection("weeklyUserChallenges")
  .add(userChallenges)
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    messageDiv.innerHTML = "Challenge data added successfully!";
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
    messageDiv.innerHTML = "Error adding challenge data.";
  });


        // Clear the form fields
        document.getElementById("user-id").value = "";
        document.getElementById("week-start-date").value = "";
        document.getElementById("challenges").value = "";
    });
});






document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("challenge-form");
    const messageDiv = document.getElementById("message");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const userId = document.getElementById("user-id").value;
        const weekStartDate = document.getElementById("week-start-date").value;
        const challengesStr = document.getElementById("challenges").value;
        const challengeIds = challengesStr.split(",").map(id => id.trim());

        // Parse JSON data from the <textarea>
        const challengeJson = document.getElementById("challenge-json").value;
        let challengeData;

        try {
            challengeData = JSON.parse(challengeJson);
        } catch (error) {
            console.error("Error parsing JSON: ", error);
            messageDiv.innerHTML = "Error parsing challenge data. Make sure it's valid JSON.";
            return;
        }

        // Construct the document data
        const userChallenges = {
            userID: userId,
            weekStartDate: weekStartDate,
            challenges: challengeData // Use the parsed JSON data
        };

        // Add or update the document in Firebase Firestore
        // Replace the following with your Firebase Firestore logic
        // ...

        // Clear the form fields and textarea
        document.getElementById("user-id").value = "";
        document.getElementById("week-start-date").value = "";
        document.getElementById("challenges").value = "";
        document.getElementById("challenge-json").value = "";
    });
});

