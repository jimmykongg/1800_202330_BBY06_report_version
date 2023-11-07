/* Insert name */
function insertNameFromFirestore() {
  // Check if the user is logged in:
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          console.log(user.uid); // Let's know who the logged-in user is by logging their UID
          currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
          currentUser.get().then(userDoc => {
              // Get the user name
              var userName = userDoc.data().name;
              console.log(userName);
              //$("#name-goes-here").text(userName); // jQuery
              document.getElementById("name-goes-here").innerText = userName;
          })
      } else {
          console.log("No user is logged in."); // Log a message when no user is logged in
      }
  })
}

insertNameFromFirestore();

/* Insert email */
function insertEmailFromFirestore() {
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          console.log(user.uid); 
          currentUser = db.collection("users").doc(user.uid); 
          currentUser.get().then(userDoc => {
              var userName = userDoc.data().email;
              console.log(userName);
              document.getElementById("email-goes-here").innerText = userName;
          })
      } else {
          console.log("No user is logged in.");
      }
  })
}

insertEmailFromFirestore();

/* Insert country */
function insertCountryFromFirestore() {
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          console.log(user.uid); 
          currentUser = db.collection("users").doc(user.uid); 
          currentUser.get().then(userDoc => {
              var userName = userDoc.data().country;
              console.log(userName);
              document.getElementById("country-goes-here").innerText = userName;
          })
      } else {
          console.log("No user is logged in.");
      }
  })
}

insertCountryFromFirestore();

/* Insert email */
function insertLocationFromFirestore() {
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          console.log(user.uid); 
          currentUser = db.collection("users").doc(user.uid); 
          currentUser.get().then(userDoc => {
              var userName = userDoc.data().recentLocation;
              console.log(userName);
              document.getElementById("location-goes-here").innerText = userName;
          })
      } else {
          console.log("No user is logged in.");
      }
  })
}

insertLocationFromFirestore();

/* Insert counter */
function insertCounterFromFirestore() {
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          console.log(user.uid); 
          currentUser = db.collection("users").doc(user.uid); 
          currentUser.get().then(userDoc => {
              var userName = userDoc.data().recycleCounter;
              console.log(userName);
              document.getElementById("counter-goes-here").innerText = userName;
          })
      } else {
          console.log("No user is logged in.");
      }
  })
}

insertCounterFromFirestore();