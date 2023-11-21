// Developed by Jimmy

// This function runs the two support functions below
function doAll() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      insertFirstName(user);
      getHistories(user)
    } else {
      console.log("No user is signed in");
    }
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  doAll();
});

// Displays user's first name to improve personal experience
function insertFirstName(user) {
  db.collection("users").doc(user.uid).get().then(userDoc => {
    console.log(userDoc.data().name);
    userName = userDoc.data().name;
    firstName = userName.split(" ")[0];
    document.getElementById("name-goes-here").innerHTML = firstName;
  })
}

//----------------------------------------------------------
// This function takes input param User's Firestore document pointer
// and retrieves the "history" array, and 
// dynamically displays them in this history page vertically.
//----------------------------------------------------------
function getHistories(user) {
  db.collection("users").doc(user.uid).get()
    .then(userDoc => {

      // Get the Array of recycling history records
      var histories = userDoc.data().history;

      // Get pointer the new card template
      let newcardTemplate = document.getElementById("historyTemplate");

      // Iterate through the ARRAY of history records (document ID's)
      histories.forEach(thisBinID => {
        db.collection("bins").doc(thisBinID).get().then(doc => {
          let street = doc.data().street;
          let lastVisitedTime = doc.data().last_visited.toMillis();
          let timeDiffInSec = (new Date().getTime() - lastVisitedTime) / 1000;
          let timeMessage;
          if (timeDiffInSec < 30) {
            timeMessage = "Just now";
          } else if (timeDiffInSec <= 60) {
            timeMessage = "1 minute ago"
          } else if (timeDiffInSec <= 3600) {
            timeMessage = `${Math.floor(timeDiffInSec / 60)} minutes ago`
          } else if (timeDiffInSec <= 3600 * 24) {
            timeMessage = `${Math.floor(timeDiffInSec / 3600)} hours ago`
          } else {
            timeMessage = `${Math.floor(timeDiffInSec / 86400)} days ago`
          }

          //clone the new card
          let newcard = historyTemplate.content.cloneNode(true);

          //update title and some pertinant information
          newcard.querySelector('.card-title').innerHTML = street;
          newcard.querySelector('.card-last-visited').innerHTML = timeMessage;

          //Finally, attach this new card to the div
          document.getElementById("historyCardGroup").appendChild(newcard);
        })
      });
    })
}

//----------------------------------------------------------
// This function sorts and displays the history cards 
// according to the sort options selected by the user
//----------------------------------------------------------
function displaySortedHistories(sortOption, directionStr) {

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get().then(userDoc => {

        // Get the Array of recycling history records
        var histories = userDoc.data().history;

        // Get pointer the new card template
        let newcardTemplate = document.getElementById("historyTemplate");

        // Iterate through the ARRAY of history records (document ID's)
        histories.forEach(thisBinID => {
          db.collection("bins").doc(thisBinID).then(doc => {
              let street = doc.data().street;
              let lastVisitedTime = doc.data().last_visited.toMillis();
              let timeDiffInSec = (new Date().getTime() - lastVisitedTime) / 1000;
              let timeMessage;
              if (timeDiffInSec < 30) {
                timeMessage = "Just now";
              } else if (timeDiffInSec <= 60) {
                timeMessage = "1 minute ago"
              } else if (timeDiffInSec <= 3600) {
                timeMessage = `${Math.floor(timeDiffInSec / 60)} minutes ago`
              } else if (timeDiffInSec <= 3600 * 24) {
                timeMessage = `${Math.floor(timeDiffInSec / 3600)} hours ago`
              } else {
                timeMessage = `${Math.floor(timeDiffInSec / 86400)} days ago`
              }

              //clone the new card
              let newcard = historyTemplate.content.cloneNode(true);

              //update title and some pertinant information
              newcard.querySelector('.card-title').innerHTML = street;
              newcard.querySelector('.card-last-visited').innerHTML = timeMessage;

              //Finally, attach this new card to the div
              document.getElementById("historyCardGroup").appendChild(newcard);
            })
        });
      })
    } else {
      console.log("No user is signed in");
    }
  });
}

//----------------------------------------------------------
// This function limits number of histories displayed 
// according to the shown options selected by the user
//----------------------------------------------------------
function displayLimitedHistories(user, number) {
  db.collection("users").doc(user.uid)
    .limit(number)
    .get()
    .then(userDoc => {

      // Get the Array of recycling history records
      var histories = userDoc.data().history;

      // Get pointer the new card template
      let newcardTemplate = document.getElementById("historyTemplate");

      // Iterate through the ARRAY of history records (document ID's)
      histories.forEach(thisBinID => {
        db.collection("bins").doc(thisBinID).get().then(doc => {
          let street = doc.data().street;
          let lastVisitedTime = doc.data().last_visited.toMillis();
          let timeDiffInSec = (new Date().getTime() - lastVisitedTime) / 1000;
          let timeMessage;
          if (timeDiffInSec < 30) {
            timeMessage = "Just now";
          } else if (timeDiffInSec <= 60) {
            timeMessage = "1 minute ago"
          } else if (timeDiffInSec <= 3600) {
            timeMessage = `${Math.floor(timeDiffInSec / 60)} minutes ago`
          } else if (timeDiffInSec <= 3600 * 24) {
            timeMessage = `${Math.floor(timeDiffInSec / 3600)} hours ago`
          } else {
            timeMessage = `${Math.floor(timeDiffInSec / 86400)} days ago`
          }

          //clone the new card
          let newcard = historyTemplate.content.cloneNode(true);

          //update title and some pertinant information
          newcard.querySelector('.card-title').innerHTML = street;
          newcard.querySelector('.card-last-visited').innerHTML = timeMessage;

          //Finally, attach this new card to the div
          document.getElementById("historyCardGroup").appendChild(newcard);
        })
      });
    })
}