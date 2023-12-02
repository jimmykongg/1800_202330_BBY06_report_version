function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            //method #2:  insert using jquery
            //$("#name-goes-here").text(userName); //using jquery

            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
        }
    });
}

function getDailyFact() {
    const today = new Date().getDate();
    let random;
    db.collection("facts").get().then(factDoc => {
        const numberOfFacts = factDoc.size;
        random = Math.floor(Math.random() * numberOfFacts);
        if (localStorage.getItem("dailyFact") == null) {
            readFact("fact" + random);
        }
        if (today != localStorage.getItem("dateRecorded")) {
            readFact("fact" + random);
            localStorage.setItem("dateRecorded", today);
        }
        document.getElementById("daily-fact-goes-here").innerHTML = localStorage.getItem("dailyFact");
    })
}

function readFact(data) {
    db.collection("facts").doc(data)
        .onSnapshot(factsDoc => {
            document.getElementById("daily-fact-goes-here").innerHTML = factsDoc.data().quote;
            localStorage.setItem("dailyFact", factsDoc.data().quote);
        })
}

document.querySelector(".fact-of-the-day-container").addEventListener("click", function() {
    window.location.href = './facts.html';
})

getDailyFact();
getNameFromAuth(); //run the function
localStorage.setItem("stack", 0);
