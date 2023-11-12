//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {
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
    .onSnapshot(locDoc => {
        document.getElementById("reward-goes-here").innerHTML = locDoc.data().reward;
    })
    container.style.backgroundImage = "url('./images/" + localStorage.getItem("location") + ".jpg')";
}

function createRecyclable() {
    const outerDiv = document.querySelector('.info');
    db.collection("locations").doc(localStorage.getItem("location")).collection("recyclables").doc("recycle")
    .onSnapshot(recycleDoc => {
        const divs = [];
        const items = [];
        const descriptions = [];
        const numOfDivs = recycleDoc.data().numOfRecycables;
        for (let y = 1; y <= numOfDivs; y++) {
            const newDiv = document.createElement("div")
            newDiv.classList.add("logo-container");

            const logoId = "logo-goes-here-" + y;
            const descriptionId = "recycle-description-goes-here-" + y;

            newDiv.innerHTML = '<span class="material-symbols-outlined logo"><span id="' + logoId + '"></span></span><span class="text"><span id="' + descriptionId + '"></span></span>';
            outerDiv.appendChild(newDiv);
            let item = "item" + y;
            let desc = "description" + y;
            divs.push(newDiv);
            items.push(item);
            descriptions.push(desc);
        }
        for (let x = 0; x < divs.length; x++) {

            const logoGoesHereId = "logo-goes-here-" + (x + 1);
            const descriptionGoesHereId = "recycle-description-goes-here-" + (x + 1);

            document.getElementById(logoGoesHereId).innerHTML = recycleDoc.data()[items[x]];
            document.getElementById(descriptionGoesHereId).innerHTML = recycleDoc.data()[descriptions[x]];
        }
        const reward = document.createElement("div");
        reward.classList.add("reward");
        reward.innerHTML = '<span>You can get a <span id="reward-goes-here"></span> if you go recycle there</span>';
        outerDiv.appendChild(reward);
    })
}

loadSkeleton();  //invoke the function
