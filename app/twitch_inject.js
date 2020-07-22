var launchButton = document.createElement("BUTTON");
launchButton.addEventListener("click", function() {
    chrome.runtime.sendMessage({Message: "launchStream"}, function (response) {
        ;
    })
});
launchButton.innerText = "Streamlink";
document.getElementsByClassName('player-controls__right-control-group tw-align-items-center tw-flex tw-flex-grow-1 tw-justify-content-end')[0]
    .appendChild(launchButton);