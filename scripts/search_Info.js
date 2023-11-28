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
function readReward() {
    const today = new Date().getDate();
    var reward = Math.floor(Math.random() * 101 + 100)
    if (localStorage.getItem("dateReward") == null) {
        document.getElementById("reward-goes-here").innerHTML = reward;
    }
    if (today != localStorage.getItem("dateReward")) {
        document.getElementById("reward-goes-here").innerHTML = reward;
        localStorage.setItem("dateReward", today);
    }
}

function createHeader() {
    const outerDiv = document.querySelector(".header");
    db.collection("bins").doc(localStorage.getItem("docID"))
        .onSnapshot(doc => {
            const newDiv = document.createElement("div");
            const header = document.createElement("nav");
            header.setAttribute('id', 'headerPlaceHolder');

            newDiv.classList.add("title-container");
            newDiv.innerHTML = '<p class="title" id="title-goes-here"></p><p class="title" id="location-goes-here"></p>';
            outerDiv.appendChild(header);
            outerDiv.appendChild(newDiv);
            document.getElementById("title-goes-here").innerHTML = doc.data().city + ", " + doc.data().province + ", " + doc.data().country;
            document.getElementById("location-goes-here").innerHTML = doc.data().street;
            console.log($('#headerPlaceHolder').load('./text/header.html'));
        })
}

function createRecyclables() {
    const outerDiv = document.querySelector(".info");
    db.collection("bins").doc(localStorage.getItem("docID"))
        .onSnapshot(doc => {
            const recycleArray = doc.data().material_type.toLowerCase().split(/[ ,]+/);
            const numOfRecyclables = recycleArray.length;
            for (let y = 0; y < numOfRecyclables; y++) {
                const newDiv = document.createElement("div")
                newDiv.classList.add("logo-container");

                var logo = document.createElement("i");
                var desc = document.createElement("span");
                desc.setAttribute("class", "text");

                switch (recycleArray[y]) {
                    case ("plastic"):
                        logo.setAttribute("class", "logo fa-solid fa-bottle-water fa-2xl");
                        desc.innerHTML = "Plastic"
                        break;
                    case ("paper"):
                        logo.setAttribute("class", "logo fa-solid fa-newspaper fa-2xl");
                        desc.innerHTML = "Paper"
                        break;
                    case ("organic"):
                        logo.setAttribute("class", "logo fa-solid fa-bacterium fa-2xl");
                        desc.innerHTML = "Organic"
                        break;
                    case ("glass"):
                        logo.setAttribute("class", "logo fa-solid fa-martini-glass fa-2xl");
                        desc.innerHTML = "Glass"
                        break;
                    case ("metal"):
                        logo.setAttribute("class", "logo fa-solid fa-plug fa-2xl");
                        desc.innerHTML = "Metal"
                        break;
                }

                newDiv.appendChild(logo);
                newDiv.appendChild(desc);
                outerDiv.appendChild(newDiv);
            }

            const reward = document.createElement("div");
            reward.classList.add("reward");
            reward.innerHTML = '<span>You can get <span id="reward-goes-here"></span> points if you go recycle there</span>';
            outerDiv.appendChild(reward);

            /** Logo Container */
            var newDiv = document.createElement("div");
            newDiv.setAttribute("class", "logo-container");

            /** Logo from Font Awesome */
            var logo = document.createElement("i");
            logo.setAttribute("class", "logo fa-solid fa-person-running fa-2xl");
            newDiv.appendChild(logo);

            /** Distance */
            var description = document.createElement("span");
            description.setAttribute("class", "text distance");

            if ("geolocation" in navigator) {
                // Check if geolocation is supported
                navigator.geolocation.getCurrentPosition(function (position) {
                    // This function is the success callback

                    // Get current time
                    let now = new Date();
                    let time = now.toLocaleTimeString(); // Converts the time to a string using locale conventions.

                    /** Support function that calculates the distance */
                    function getDistance() {
                        lat = doc.data().lat;
                        lng = doc.data().lng;

                        // Extract lat and long
                        var lat1 = position.coords.latitude;
                        var long1 = position.coords.longitude

                        var d = getDistanceInMeters(lat1, long1, lat, lng);

                        if (d < 1000) {
                            d = d.toFixed(0) + "m";
                        } else {
                            d = (d / 1000).toFixed(0) + "km";
                        }

                        description.innerHTML = d;
                    }

                    getDistance();

                    /**
                     * Check if user's position is within radius
                     * If it is within radius, then a navigation buttons pops up to guide them to the rewards.html to claim rewards 
                     * after they have recycled (We trust the user to do this, no validation function so far).
                     */

                }, function (error) {
                    // This function is the error callback
                    console.error("Error occurred: " + error.message);
                });
            }

            newDiv.appendChild(description);

            /** Appending the new div */
            outerDiv.appendChild(newDiv);

            readReward();
            createDescriptions();
        })
}

function createDescriptions() {
    const textDivs = document.querySelectorAll('.text:not([class*=" "]');
    const outerDiv = document.querySelector(".content");

    /** Creating the title */
    var newSpan = document.createElement("span");
    newSpan.id = "recyclables";
    newSpan.innerHTML = "What you could recycle";
    outerDiv.appendChild(newSpan);

    for (let i = 0; i < textDivs.length; i++) {
        db.collection("recycleables").doc(textDivs[i].textContent.toLowerCase())
            .onSnapshot(content => {
                var newContent = document.createElement("span");
                newContent.id = "item";
                newContent.innerHTML = content.data().description;
                outerDiv.appendChild(newContent);
            })
    }
}

function getGeolocation(doc) {
    if ("geolocation" in navigator) {
        // Check if geolocation is supported
        navigator.geolocation.getCurrentPosition(function (position) {
            // This function is the success callback

            // Get current time
            let now = new Date();
            let time = now.toLocaleTimeString(); // Converts the time to a string using locale conventions.

            /** Support function that calculates the distance */
            function getDistance(doc) {
                lat = doc.data().lat;
                lng = doc.data().lng;

                // Extract lat and long
                var lat1 = position.coords.latitude;
                var long1 = position.coords.longitude

                var d = getDistanceInMeters(lat1, long1, lat, lng);
                console.log(d);
                return d;
            }

            getDistance(doc);

            /**
             * Check if user's position is within radius
             * If it is within radius, then a navigation buttons pops up to guide them to the rewards.html to claim rewards 
             * after they have recycled (We trust the user to do this, no validation function so far).
             */

        }, function (error) {
            // This function is the error callback
            console.error("Error occurred: " + error.message);
        });
    } else {
        // Geolocation isn’t available
        console.error("Geolocation is not supported by this browser.");
    }
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function getDistanceInMeters(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // Distance in meters
}

document.getElementById("myBtn").addEventListener("click", function () {
    window.location.href = "main.html";
});

loadSkeleton();  //invoke the function
