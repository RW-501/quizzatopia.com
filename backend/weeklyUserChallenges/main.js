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
