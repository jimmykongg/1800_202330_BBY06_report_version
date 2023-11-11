//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   
            //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            // console.log($('#navbarPlaceholder').load('./text/nav_after_login.html'));
            console.log($('#footerPlaceholder').load('./text/footer.html'));
        } else {
            // No user is signed in.
            // console.log($('#navbarPlaceholder').load('./text/nav_before_login.html'));
            console.log($('#footerPlaceholder').load('./text/footer.html'));
        }
    });
}

// Returns the reward
function readLocation(location) {
    var container = document.querySelector(".header");
    db.collection("locations").doc(location)
        .onSnapshot(factDoc => {
            console.log("Current document data: " + factDoc.data());
            document.getElementById("reward-goes-here").innerHTML = factDoc.data().reward;
        })
    container.style.backgroundImage = "url('./images/" + localStorage.getItem("location") + ".jpg')";
}

loadSkeleton();  //invoke the function
