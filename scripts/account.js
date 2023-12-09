// Developed by Jimmy

localStorage.setItem("stack", 0);

//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
  firebase.auth().signOut().then(() => {
    // Logged out user should not be able to go back to their pre-logged out page
    console.log("logging out user");
    window.location.replace("./index.html");
  }).catch((error) => {
    // An error happened.
  });
}