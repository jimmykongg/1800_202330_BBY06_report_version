// Developed by Jimmy
// Read data

/* Insert name */
function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.onSnapshot(userDoc => {
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
            currentUser.onSnapshot(userDoc => {
                var userEmail = userDoc.data().email;
                console.log(userEmail);
                document.getElementById("email-goes-here").innerText = userEmail;
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
            currentUser.onSnapshot(userDoc => {
                var userCountry = userDoc.data().country;
                document.getElementById("country-goes-here").innerText = userCountry;
            })
        } else {
            console.log("No user is logged in.");
        }
    })
}

insertCountryFromFirestore();

/* Insert location */
function insertLocationFromFirestore() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                var userLocation = userDoc.data().recentLocation;
                document.getElementById("location-goes-here").innerText = userLocation;
            })
        } else {
            console.log("No user is logged in.");
        }
    })
}

insertLocationFromFirestore();

/* Insert point */
function insertPointFromFirestore() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                var userPoint = userDoc.data().recyclePoint;
                document.getElementById("point-goes-here").innerText = userPoint;
            })
        } else {
            console.log("No user is logged in.");
        }
    })
}

insertPointFromFirestore();

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userEmail = userDoc.data().email;
                    var userCountry = userDoc.data().country;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (userCountry != null) {
                        document.getElementById("countryInput").value = userCountry;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

// Save User info from profile editing modal
function saveUserInfo() {

    // Get user entered values
    userName = document.getElementById('nameInput').value;
    userEmail = document.getElementById('emailInput').value;
    userCountry = document.getElementById('countryInput').value;

    // Update user's document in Firestore
    currentUser.update({
        name: userName,
        email: userEmail,
        country: userCountry
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
}

document.getElementById("save-btn").addEventListener("click", function (event) {
    saveUserInfo();
});

