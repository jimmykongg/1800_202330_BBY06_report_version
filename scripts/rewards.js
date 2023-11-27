// Developed by Jimmy

//--------------------------------------------------------------------
// Get the document ID from localStorage update user's, then updates
// (1) recent recycling location, 
// (2) recycling history [Array of bins ID] for further processing in history.html
// (3) recycling reward points
//--------------------------------------------------------------------
function updateUserInfo() {
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
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.onSnapshot(userDoc => {
        userPoint = userDoc.data().recyclePoint;
        document.getElementById("point").innerText = userPoint;
      })
    } else {
      console.log("No user is logged in.");
    }
  })
}

insertPointFromFirestore();

const levelOnePoint = 500;
const levelTwoPoint = 1500;
const levelThreePoint = 5000;

//--------------------------------------------------------------------
// Update the claim reward button when user has accumulated enough points
// to claim rewards.
//--------------------------------------------------------------------
function updateButton() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.onSnapshot(userDoc => {
        userPoint = userDoc.data().recyclePoint;
        //updates level 1 button
        if (userPoint >= levelOnePoint) {
          for (i = 1; i <= 2; i++) {
            let replacedElement = document.getElementById(`level-1-button-${i}`);
            replacedElement.disabled = false;
            replacedElement.removeAttribute("style");
          }
        }
      })
    }
  })
}

updateButton();

//--------------------------------------------------------------------
// Update the progress bar 
//
// This function tell users their most updated progress.
//--------------------------------------------------------------------
function updateProgressBar() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.onSnapshot(userDoc => {
        userPoint = userDoc.data().recyclePoint;
        //updates level 1 reward progress bar
        let updatedBars = document.querySelectorAll(`.progress-bar`);
        console.log(updatedBars);
        let percentage = Math.min((userPoint / levelOnePoint) * 100, 100);
        //--------------------------------------------------------------------
        // Dynamically update the progress bar with a simple linear animation
        //
        // This loop acts a human computer interaction which hopefully 
        // can improve the user experience
        //--------------------------------------------------------------------
        var j = parseInt(updatedBars[0].getAttribute("aria-valuenow"));
        function updateProgress() {
          for (let i = 0; i < 2; i++) {
            if (j <= percentage) {
              console.log("j is: " + j);
              updatedBars[i].setAttribute("style", `width: ${j}%`);
              updatedBars[i].setAttribute("aria-valuenow", j);
              j++;
            }
          }
          setTimeout(() => updateProgress(), 100);
        }
        updateProgress();
      })
    }
  })
}

updateProgressBar();

//--------------------------------------------------------------------
// Claim reward after user press the "Claim Reward" button
//--------------------------------------------------------------------
function claimReward() {

  // Press Any one of the button to activiate claimReward event
  document.getElementById("level-1-button-1").addEventListener("click", (event) => {
    disableButton();

    reCalculatePoint();

    reloadProgressBar();
  });

  document.getElementById("level-1-button-2").addEventListener("click", (event) => {
    disableButton();

    reCalculatePoint();

    reloadProgressBar();
  });
}

claimReward();

//--------------------------------------------------------------------
// Decrease 500 points from user's recycling point after they have claimed 
// a level one reward. 
//--------------------------------------------------------------------
function reCalculatePoint() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.update({
        recyclePoint: firebase.firestore.FieldValue.increment(-500)
      })
        .then(() => {
          console.log("Recycling reward points successfully updated!");
        })
    } else {
      console.log("No user is logged in.");
    }
  })
}

function disableButton() {
  for (i = 1; i <= 2; i++) {
    let replacedElement = document.getElementById(`level-1-button-${i}`);
    replacedElement.disabled = true;
  }
}

function reloadProgressBar() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.onSnapshot(userDoc => {
        userPoint = userDoc.data().recyclePoint;
        //updates level 1 reward progress bar

        let updatedBars = document.querySelectorAll(`.progress-bar`);
        console.log(updatedBars);
        let percentage = Math.min((userPoint / levelOnePoint) * 100, 100);
        //--------------------------------------------------------------------
        // Dynamically update the progress bar with a simple linear animation
        //
        // This loop acts a human computer interaction which hopefully 
        // can improve the user experience
        //--------------------------------------------------------------------
        var j = 100;
        function reloadProgress() {
          for (let i = 0; i < 2; i++) {
            if (j >= percentage) {
              updatedBars[i].setAttribute("style", `width: ${j}%`);
              updatedBars[i].setAttribute("aria-valuenow", j);
              j--;
            }
          }
          setTimeout(() => reloadProgress(), 100);
        }
        reloadProgress();
      })
    }
  })
}



