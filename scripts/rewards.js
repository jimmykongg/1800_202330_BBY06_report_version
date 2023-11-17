function updateUserInfo() {
  console.log("Try to update user info");

  // Get the document ID from localStorage
  const docID = localStorage.getItem("docID");

  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          console.log(user.uid);
          currentUser = db.collection("users").doc(user.uid);
          currentUser.update({
              // Use 'arrayUnion' to add the new bin document ID to the 'history' array.
              // This method ensures that the ID is added only if it's not already present, preventing duplicates.
              history: firebase.firestore.FieldValue.arrayUnion(docID),
              recyclePoint: firebase.firestore.FieldValue.increment(100)
          })
              .then(() => {
                  console.log("Document successfully updated!");
              })
      } else {
          console.log("No user is logged in.");
      }
  })
}

window.onload = (event) => {
  updateUserInfo();
};