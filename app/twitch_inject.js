var launchButton = document.createElement("BUTTON");
launchButton.addEventListener("click", function() {
    chrome.runtime.sendMessage({Message: "launchStream"}, function (response) {
    });
});
var imgURL = chrome.extension.getURL("assets/icon-22.png");
launchButton.innerHTML = "<img src=" + imgURL + ">";
document.getElementsByClassName('player-controls__right-control-group tw-align-items-center tw-flex tw-flex-grow-1 tw-justify-content-end')[0]
    .appendChild(launchButton);