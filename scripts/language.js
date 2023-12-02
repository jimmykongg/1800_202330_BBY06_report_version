// Developed by Jimmy

//----------------------------------------------------------
// This function 
// (1) uncheckes all other languages 
// when switch button of specified language is clicked.
// 
// (2) changes languages of the navbar and welcome message 
// on the main page
//----------------------------------------------------------
function switchLanguage(targetLanguage) {
  // Get all the language switches
  const languageSwitches = document.querySelectorAll('.language-switch');
  const switchElement = document.querySelector(`.${targetLanguage}`);

  // current target switch is always checked until another target switch is selected
  switchElement.checked = true;

  // Uncheck all other switches
  languageSwitches.forEach(otherSwitch => {
    if (otherSwitch !== switchElement) {
      otherSwitch.checked = false;
    }
  });

  // Update languages
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get().then(userDoc => {
        let currentUser = db.collection("users").doc(user.uid);
        currentUser.update({
          language: targetLanguage
        }).then(() => {
          console.log("User's language preference is successfully updated!");
        })

        db.collection("languages").doc(targetLanguage).onSnapshot((doc) => {
          // document.getElementById("welcome-message").innerHTML = doc.data().welcome_message;
          document.getElementById("language-header").innerHTML = doc.data().header;
          document.getElementById("home").innerHTML = doc.data().home;
          document.getElementById("search").innerHTML = doc.data().search;
          document.getElementById("fact").innerHTML = doc.data().fact;
          document.getElementById("account").innerHTML = doc.data().account;
        })
      });
    } else {
      console.log("No user is signed in");
    }
  });
}

localStorage.setItem("stack", 1);