// Checks how far you are in each page which will determine if your hamburger menu will be replaced by a undo button instead
document.getElementById("icon-goes-here").innerHTML = "";
if (localStorage.getItem("stack") > 0) {
    var icon = document.createElement("i");
    icon.setAttribute("id", "backButton");
    icon.setAttribute("class", "fa-solid fa-arrow-left fa-2xl");
    document.getElementById("icon-goes-here").appendChild(icon);
    document.getElementById("icon-goes-here").addEventListener("click", function() {
        window.history.back();
    })
}
// } else {
//     var icon = document.createElement("span");
//     icon.setAttribute("id", "hamburgerMenu");
//     icon.setAttribute("class", "material-symbols-outlined");
//     icon.innerHTML = "menu";
//     document.getElementById("icon-goes-here").appendChild(icon);
// }