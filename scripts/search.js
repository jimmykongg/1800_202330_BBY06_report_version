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
loadSkeleton();  //invoke the function

function addMenuListener(item) {
    console.log(item);
    document.getElementById(item).addEventListener("click", ()=>{
        passValue(item);
    })
}

function passValue(item) {
    localStorage.setItem("location", item);
    console.log("clicked..." + item);
    window.location.href = "./search_info.html";
}

addMenuListener("SE06");
addMenuListener("SE02");
addMenuListener("SW02");