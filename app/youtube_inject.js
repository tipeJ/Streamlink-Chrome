var launchButton = document.createElement("BUTTON");
launchButton.addEventListener("click", function() {
    chrome.runtime.sendMessage({Message: "launchStream"}, function (response) {
    });
});

var imgURL = chrome.extension.getURL("assets/icon.svg");
var iitem = document.getElementsByClassName("ytp-settings-button")[0];

launchButton.innerHTML = '<img src="' + imgURL + '" width="75%" height=75%">';
launchButton.className = "ytp-button ytp-settings-button";
launchButton.setAttribute("aria-label", "Streamlink");
launchButton.setAttribute("title", "Streamlink");
var controlsRow = document.getElementsByClassName('ytp-right-controls')
controlsRow[0]
    .insertBefore(launchButton, controlsRow[0].childNodes[4]);