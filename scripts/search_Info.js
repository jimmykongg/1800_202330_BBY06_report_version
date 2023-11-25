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
        console.log(locDoc.data().reward);
        document.getElementById("reward-goes-here").innerHTML = locDoc.data().reward;
    })
    container.style.backgroundImage = "url('./images/" + localStorage.getItem("location") + ".jpg')";
}

function createHeader() {
    const outerDiv = document.querySelector(".header");
    db.collection("bins").doc(localStorage.getItem('docID'))
        .onSnapshot(titleDoc => {
            const newDiv = document.createElement("div");
            const header = document.createElement("nav");
            header.setAttribute('id', 'headerPlaceHolder');

            newDiv.classList.add("title-container");

            newDiv.innerHTML ='<p class="title" id="title-goes-here"></p><p class="title" id="location-goes-here"></p>';
            outerDiv.appendChild(header);
            outerDiv.appendChild(newDiv);
            document.getElementById("title-goes-here").innerHTML = titleDoc.data().street;
            document.getElementById("location-goes-here").innerHTML = titleDoc.data().city + ", " + titleDoc.data().province + ", " + titleDoc.data().country;
            console.log($('#headerPlaceHolder').load('./text/header.html'));
        })
}

// function createHeader() {
//     const outerDiv = document.querySelector(".header");
//     db.collection("locations").doc(localStorage.getItem("location"))
//         .onSnapshot(titleDoc => {
//             const newDiv = document.createElement("div");
//             const header = document.createElement("nav");
//             header.id = "headerPlaceHolder";

//             newDiv.classList.add("title-container");

//             newDiv.innerHTML ='<p class="title" id="title-goes-here"></p><p class="title" id="location-goes-here"></p>';
//             outerDiv.appendChild(header);
//             outerDiv.appendChild(newDiv);
//             document.getElementById("title-goes-here").innerHTML = titleDoc.data().title;
//             document.getElementById("location-goes-here").innerHTML = titleDoc.data().street;
//             outerDiv.style.backgroundImage = "url('./images/" + localStorage.getItem("location") + ".jpg')";
//             console.log($('#headerPlaceHolder').load('./text/header.html'));
//         })
// }

function createRecyclables() {
    const outerDiv = document.querySelector(".info");
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
        db.collection("locations").doc(localStorage.getItem("location"))
            .onSnapshot(reward => {
                document.getElementById("reward-goes-here").innerHTML = reward.data().reward;
            })
    })
}

function createNavigation() {
    const outerDiv = document.querySelector(".navigate");
    db.collection("locations").doc(localStorage.getItem("location"))
    .onSnapshot(contentDoc => {
        const divs = [];
        const items = [];
        const descriptions = [];
        for (let y = 1; y <= 2; y++) {
            const newDiv = document.createElement("div")
            newDiv.classList.add("logo-container");

            const logoId = "logo-goes-here-" + y;
            const descriptionId = "description-goes-here-" + y;

            newDiv.innerHTML = '<span class="material-symbols-outlined logo"><span id="' + logoId + '"></span></span><span class="text"><span id="' + descriptionId + '"></span></span>';
            outerDiv.appendChild(newDiv);
            divs.push(newDiv);
            items.push("directions_run");
            descriptions.push("50 meters away");
        }
        document.getElementById("logo-goes-here-1").innerHTML = items[0];
        document.getElementById("logo-goes-here-2").innerHTML = items[1];
        document.getElementById("description-goes-here-1").innerHTML = descriptions[0];
        document.getElementById("description-goes-here-2").innerHTML = descriptions[1];
    })
}

function createContent() {
    const outerDiv = document.querySelector(".content");
    db.collection("locations").doc(localStorage.getItem("location")).collection("recyclables").doc("recycle")
    .onSnapshot(contentDoc => {
        const divs = [];
        const items = [];
        const numOfSpans = contentDoc.data().numOfRecycables;
        const infoPath = 'contentDoc.collection("recyclables").doc("recycle").data()';
        newSpan = document.createElement("span");
        newSpan.id = "recyclables";
        newSpan.innerHTML = "What you could recycle";

        outerDiv.appendChild(newSpan);

        for (let x = 1; x <= numOfSpans; x++) {
            const newContent = document.createElement("span");
            newContent.id = "item";

            let descriptionId = "recycle-info-goes-here-" + x;

            newContent.innerHTML = '<span id="' + descriptionId + '"></span>';
            outerDiv.appendChild(newContent);

            let description = 'item' + x + 'Info';
            newContent.innerHTML = '<span id="' + descriptionId + '"></span>';
            divs.push(newContent);
            items.push(description);
        }
        for (let x = 0; x < divs.length; x++) {
            const descriptionGoesHereId = "recycle-info-goes-here-" + (x + 1);

            document.getElementById(descriptionGoesHereId).innerHTML = contentDoc.data()[items[x]];
        }
    })
}

document.getElementById("myBtn").addEventListener("click", function() {
    window.location.href = "main.html";
});

loadSkeleton();  //invoke the function
