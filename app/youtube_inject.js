var launchButton = document.createElement("BUTTON");
launchButton.addEventListener("click", function() {
    chrome.runtime.sendMessage({Message: "launchStream"}, function (response) {
        ;
    })
});
var imgURL = chrome.extension.getURL("assets/icon-22.png");
launchButton.innerHTML = "<img src=" + imgURL + ">";
launchButton.className = "streamlinkchromebutton";
var controlsRow = document.getElementsByClassName('ytp-right-controls')
controlsRow[0]
    .insertBefore(launchButton, controlsRow[0].childNodes[4]);