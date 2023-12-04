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

doAll();

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

      // Get recycling history records
      var histories = userDoc.data().history;

      // Get pointer to the new card template
      let newcardTemplate = document.getElementById("historyTemplate");

      // Iterate through the ARRAY of history records (document ID's)
      histories.forEach(thisBinID => {
        db.collection("history").doc(thisBinID).get().then(doc => {
          // Check if the document exists and has data
          if (doc.exists && doc.data()) {
            let street = doc.data().street;
            let lastVisitedTime = doc.data().last_visited?.toMillis();

            // Check if last_visitedTime exists before accessing properties
            if (lastVisitedTime) {
              let timeDiffInSec = (new Date().getTime() - lastVisitedTime) / 1000;
              let timeMessage;

              if (timeDiffInSec < 30) {
                timeMessage = "Just now";
              } else if (timeDiffInSec <= 60) {
                timeMessage = "1 minute ago";
              } else if (timeDiffInSec <= 3600) {
                timeMessage = `${Math.floor(timeDiffInSec / 60)} minutes ago`;
              } else if (timeDiffInSec <= 3600 * 24) {
                timeMessage = `${Math.floor(timeDiffInSec / 3600)} hours ago`;
              } else {
                timeMessage = `${Math.floor(timeDiffInSec / 86400)} days ago`;
              }

              // Clone the new card
              let newcard = historyTemplate.content.cloneNode(true);

              // Update title and some pertinent information
              newcard.querySelector('.card-title').innerHTML = street;
              newcard.querySelector('.card-last-visited').innerHTML = timeMessage;

              // Finally, attach this new card to the div
              document.getElementById("cardGroup-goes-here").appendChild(newcard);
            }
          }
        })
      });
    })
    .catch(error => {
      console.error("Error getting user document:", error);
    });
}

//----------------------------------------------------------
// This function sorts and displays the history cards 
// according to the sort options selected by the user.
// 
// The implmentation is basically a variation of getHistories function
// in addition to .sort() and .map() functions 
//
// @param sortBy sort criteria which accepts "street" or "last_visited"
// @param directionStr sort direction which accepts "asc" or "desc" 
//----------------------------------------------------------
function DisplaySortedCards(sortBy, directionStr) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const userDocRef = db.collection("users").doc(user.uid);

      userDocRef.get()
        .then(userDoc => {
          const historyArray = userDoc.data()?.history || [];

          // Fetch the corresponding history documents for each bin ID
          const binPromises = historyArray.map(binID =>
            db.collection("history").doc(binID).get()
          );

          // Process the fetched history documents
          Promise.all(binPromises)
            .then(binDocs => {
              // Filter out null or undefined documents
              const validBinDocs = binDocs.filter(doc => doc.exists && doc.data());

              // Sort the bin IDs based on the street field in the corresponding history documents
              let sortedBinIDs;
              if (sortBy == "street") {
                if (directionStr == "asc") {
                  sortedBinIDs = validBinDocs
                    .sort((a, b) => a.data().street.localeCompare(b.data().street))
                    .map(doc => doc.id);
                } else {
                  sortedBinIDs = validBinDocs
                    .sort((a, b) => b.data().street.localeCompare(a.data().street))
                    .map(doc => doc.id);
                }
              } else {
                sortedBinIDs = validBinDocs
                  .sort(compareTimestamp)
                  .map(doc => doc.id);
              }

              // Important! Remove the existing cards before appending the new ones with new order
              document.getElementById("cardGroup-goes-here").innerHTML = "";

              // Get pointer to the new card template
              let newcardTemplate = document.getElementById("historyTemplate");

              // Iterate through the sorted array of bin IDs
              sortedBinIDs.forEach(sortedBinID => {
                db.collection("history").doc(sortedBinID).get()
                  .then(doc => {
                    // Check if the document exists and has data
                    if (doc.exists && doc.data()) {
                      let street = doc.data().street;
                      let lastVisitedTime = doc.data().last_visited?.toMillis();

                      // Check if last_visitedTime exists before accessing properties
                      if (lastVisitedTime) {
                        let timeDiffInSec = (new Date().getTime() - lastVisitedTime) / 1000;
                        let timeMessage;

                        if (timeDiffInSec < 30) {
                          timeMessage = "Just now";
                        } else if (timeDiffInSec <= 60) {
                          timeMessage = "1 minute ago";
                        } else if (timeDiffInSec <= 3600) {
                          timeMessage = `${Math.floor(timeDiffInSec / 60)} minutes ago`;
                        } else if (timeDiffInSec <= 3600 * 24) {
                          timeMessage = `${Math.floor(timeDiffInSec / 3600)} hours ago`;
                        } else {
                          timeMessage = `${Math.floor(timeDiffInSec / 86400)} days ago`;
                        }

                        // Clone the new card
                        let newcard = newcardTemplate.content.cloneNode(true);

                        // Update title and some pertinent information
                        newcard.querySelector('.card-title').innerHTML = street;
                        newcard.querySelector('.card-last-visited').innerHTML = timeMessage;

                        // Finally, attach this new card to the div
                        document.getElementById("cardGroup-goes-here").appendChild(newcard);
                      }
                    }
                  })
                  .catch(error => {
                    console.error("Error fetching history document:", error);
                  });
              });
            })
            .catch(error => {
              console.error("Error fetching history documents:", error);
            });
        })
        .catch(error => {
          console.error("Error getting user document:", error);
        });
    } else {
      console.log("No user is signed in");
    }
  });
}

//----------------------------------------------------------
// A sort function that sorts two last_visted timestamp 
// by descending order (most recent comes first)
//----------------------------------------------------------
function compareTimestamp(a, b) {
  a = a.data().last_visited.toMillis();
  b = b.data().last_visited.toMillis();
  if (a > b) return -1;
  if (a == b) return 0;
  if (a < b) return 1;
}

//----------------------------------------------------------
// This function limits number of histories displayed 
// according to the shown options selected by the user
//
// The implmentation is basically a variation of getHistories function
// in addition adding a new parameter to control number of iterations
//
// @param num Number of cards displayed on this page
//----------------------------------------------------------
function limitCards(num) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get()
        .then(userDoc => {

          // Get recycling history records
          var histories = userDoc.data().history;

          document.getElementById("cardGroup-goes-here").innerHTML = "";

          // Get pointer to the new card template
          let newcardTemplate = document.getElementById("historyTemplate");

          // Iterate through the ARRAY of history records (document ID's)
          for (let i = 0; i < num; i++) {
            let thisBinID = histories[i];

            db.collection("history").doc(thisBinID).get().then(doc => {
              // Check if the document exists and has data
              if (doc.exists && doc.data()) {
                let street = doc.data().street;
                let lastVisitedTime = doc.data().last_visited?.toMillis();

                // Check if last_visitedTime exists before accessing properties
                if (lastVisitedTime) {
                  let timeDiffInSec = (new Date().getTime() - lastVisitedTime) / 1000;
                  let timeMessage;

                  if (timeDiffInSec < 30) {
                    timeMessage = "Just now";
                  } else if (timeDiffInSec <= 60) {
                    timeMessage = "1 minute ago";
                  } else if (timeDiffInSec <= 3600) {
                    timeMessage = `${Math.floor(timeDiffInSec / 60)} minutes ago`;
                  } else if (timeDiffInSec <= 3600 * 24) {
                    timeMessage = `${Math.floor(timeDiffInSec / 3600)} hours ago`;
                  } else {
                    timeMessage = `${Math.floor(timeDiffInSec / 86400)} days ago`;
                  }

                  // Clone the new card
                  let newcard = historyTemplate.content.cloneNode(true);

                  // Update title and some pertinent information
                  newcard.querySelector('.card-title').innerHTML = street;
                  newcard.querySelector('.card-last-visited').innerHTML = timeMessage;

                  // Finally, attach this new card to the div
                  document.getElementById("cardGroup-goes-here").appendChild(newcard);
                }
              }
            });
          }
        })
        .catch(error => {
          console.error("Error getting user document:", error);
        });
    } else {
      console.log("No user is signed in");
    }
  });
}

//----------------------------------------------------------
// This function clear histories by calling 
//
// @param num Number of cards displayed on this page
//----------------------------------------------------------
function clearHistory() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get().then(userDoc => {
        const currentUser = db.collection("users").doc(user.uid);
        const historiesID = userDoc.data().history.slice();

        // Remove all elements (History IDs) in history array
        currentUser.update({
          history: firebase.firestore.FieldValue.arrayRemove(...historiesID)
        })
          .then(() => {
            console.log("Array cleared successfully");
          })

        // Remove the existing cards
        document.getElementById("cardGroup-goes-here").innerHTML = "";

      })
    } else {
      console.log("No user is signed in");
    }
  });
}

// "Clear History" button should not be active while there's no history records
window.addEventListener("load", () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get().then(userDoc => {
        if (userDoc.data().history.length == 0) {
          document.getElementById("clear-history").setAttribute("disabled", "");
        }
      })
    }
  });
});


