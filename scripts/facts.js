function createFacts() {
    const outerDiv = document.querySelector(".facts-body");
    return new Promise((resolve, reject) => {
        db.collection("facts").onSnapshot((factDoc) => {
            factDoc.forEach((factDoc) => {
                const innerDiv = document.createElement("div")
                innerDiv.classList.add("fact-container");
                const newDiv = document.createElement("div")
                newDiv.classList.add("fact")
                var icon = document.createElement("i");
    
                if (factDoc.data().type == "aluminum") {
                    icon.setAttribute("class", "fa-solid fa-recycle fa-2xl");
                } else if (factDoc.data().type == "glass") {
                    icon.setAttribute("class", "fa-solid fa-martini-glass fa-2xl");
                }
    
                let sourceLink = factDoc.data().source;
                let quote = factDoc.data().quote;
    
                newDiv.innerHTML = '<span class="title">' + quote + '</span><div class="fact info"><a href=' + sourceLink + ' class="description" target="_blank"><span style="text-decoration: underline;">Source</span></a></div>';
                newDiv.append(icon);
                innerDiv.appendChild(newDiv);
                outerDiv.appendChild(innerDiv);
            })
            resolve();
        })
    })
}

function animate() {
    const items = document.querySelectorAll(".fact");
    console.log(items)
    function slideInDivs() {
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add("slide-in");
            }, index * 100);
        });
    }
    slideInDivs();
}

createFacts()
    .then(() => {
        animate();
    })

localStorage.setItem("stack", 0);
