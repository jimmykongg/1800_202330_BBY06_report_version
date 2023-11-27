// Developed by Jimmy

//----------------------------------------------------------
// This function 
// (1) uncheckes all other languages 
// when switch button of specified language is clicked.
// 
// (2) changes languages of the navbar and welcome message 
// on the main page
//----------------------------------------------------------
function switchlanguages() {
  // Get all the language switches
  const languageSwitches = document.querySelectorAll('.language-switch');

  // Add click event listener to each switch
  languageSwitches.forEach(switchElement => {
    switchElement.addEventListener('click', function () {
      // Uncheck all other switches
      languageSwitches.forEach(otherSwitch => {
        if (otherSwitch !== switchElement) {
          otherSwitch.checked = false;
        }
      });

      //
      switch(switchElement.getAttribute("id")) {
        case "flexSwitchCheckChinese":
          document.querySelector(".language-title").innerHTML = "語言設定"
          document.querySelector(".icon-text-home").innerHTML = "主頁";
          document.querySelector(".icon-text-search").innerHTML = "搜尋"
          document.querySelector(".icon-text-facts").innerHTML = "冷知識";
          document.querySelector(".icon-text-account").innerHTML = "帳戶"; 
          break;
      }
    });
  });
}

switchlanguages();

