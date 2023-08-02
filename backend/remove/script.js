
// Function to get users without "firebaseId"
async function getUsersWithoutFirebaseId() {

      firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
  
  const querySnapshot = await db.collection('users').where('firebaseId', '==', '').get();
  const users = [];

  querySnapshot.forEach((doc) => {
    users.push({
      id: doc.id,
      data: doc.data(),
    });
  });

  return users;
}

// Function to remove a user by ID
async function removeUser(userId) {
  try {
    await db.collection('users').doc(userId).delete();
    console.log('User removed successfully.');
  } catch (error) {
    console.error('Error removing user:', error);
  }
}

module.exports = {
  getUsersWithoutFirebaseId,
  removeUser,
};
