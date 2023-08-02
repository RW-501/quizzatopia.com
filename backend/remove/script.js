
  
async function removeUser(userId) {
  try {

    const db = firebase.firestore();

    await db.collection('users').doc(userId).delete();
    console.log('User removed successfully.');
  } catch (error) {
    console.error('Error removing user:', error);
  }
}

// Function to get users without "firebaseId"
async function getUsersWithoutFirebaseId() {
  try {
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
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}



