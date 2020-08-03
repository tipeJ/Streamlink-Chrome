var launchButton = document.createElement("BUTTON");
launchButton.addEventListener("click", function() {
    chrome.runtime.sendMessage({Message: "launchStream"}, function (response) {
    });
});
var imgURL = chrome.extension.getURL("assets/icon-22.png");
launchButton.innerHTML = "<img src=" + imgURL + ">";
launchButton.setAttribute("aria-label", "Streamlink");
launchButton.setAttribute("title", "Streamlink");
launchButton.className = "tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-button-icon tw-button-icon--overlay tw-core-button tw-core-button--overlay tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative";
document.getElementsByClassName('player-controls__right-control-group tw-align-items-center tw-flex tw-flex-grow-1 tw-justify-content-end')[0]
    .appendChild(launchButton);