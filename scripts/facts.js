function readFact(fact) {
    db.collection("facts").doc(fact)
        .onSnapshot(factDoc => {
            console.log("Current document data: " + factDoc.data());
            document.getElementById(fact + "-goes-here").innerHTML = factDoc.data().quote;
        })
}