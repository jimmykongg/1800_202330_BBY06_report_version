function updateUserInfo() {
  //--------------------------------------------------------------------
  // Get the document ID from localStorage update user's, then updates
  // (1) recent recycling location, 
  // (2) recycling history [Array of bins ID for further processing in history.html
  // (3) recycling rewards point
  //--------------------------------------------------------------------
  const docID = localStorage.getItem("docID");

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user.uid);
      currentUser = db.collection("users").doc(user.uid);
      currentUser.update({
        // Use 'arrayUnion' to add the new bin document ID to the 'history' array.
        // This method ensures that the ID is added only if it's not already present, preventing duplicates.
        history: firebase.firestore.FieldValue.arrayUnion(docID),
        recentLocation: localStorage.getItem("street"),
        recyclePoint: firebase.firestore.FieldValue.increment(1)
      })
        .then(() => {
          console.log("Document successfully updated!");
        })
    } else {
      console.log("No user is logged in.");
    }
  })
}
/*
// User info gets updated when rewards.html 
window.onload = (event) => {
  updateUserInfo();
};
*/

document.addEventListener("DOMContentLoaded", (event) => {
  updateUserInfo();
});

//--------------------------------------------------------------------
// Generate two random emoji images to users 
// in order to encourage users to exchange emoji with others.  
//--------------------------------------------------------------------
function loadRandomEmoji() {
  let EmojiID1;
  let EmojiID2;

  if (!localStorage.getItem("emoji-1") && !localStorage.getItem("emoji-2")) { // Draw a random emoji for new users
    EmojiID1 = generateRandomNum();
    localStorage.setItem("emoji-1", EmojiID1);

    // Avoid users get the same emoji reward twice
    do {
      EmojiID2 = generateRandomNum();
      localStorage.setItem("emoji-2", EmojiID2);
    } while (EmojiID1 == EmojiID2);

  } else { // Use the existing emoji for current users
    EmojiID1 = localStorage.getItem("emoji-1");
    EmojiID2 = localStorage.getItem("emoji-2");
  }

  document.getElementById("emoji-1").src = `./images/${"emoji" + EmojiID1}.png`;
  document.getElementById("emoji-2").src = `./images/${"emoji" + EmojiID2}.png`;
}

//--------------------------------------------------------------------
// Generate random emoji ID from 1 to 5 
//--------------------------------------------------------------------
function generateRandomNum() {
  return Math.floor(Math.random() * 5) + 1;
}

document.addEventListener("DOMContentLoaded", (event) => {
  loadRandomEmoji();
});

/* Insert point */
function insertPointFromFirestore() {
  currentUser = db.collection("users").doc(localStorage.getItem("userID"));
  currentUser.onSnapshot(userDoc => {
    var userPoint = userDoc.data().recyclePoint;
    document.getElementById("point").innerText = userPoint;
  })
}

insertPointFromFirestore();



