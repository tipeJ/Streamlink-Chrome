var launchButton = document.createElement("BUTTON");
launchButton.addEventListener("click", function() {
    chrome.runtime.sendMessage({Message: "launchStream"}, function (response) {
        ;
    })
});
launchButton.innerText = "Streamlink";
document.getElementsByClassName('ytp-right-controls')[0]
    .appendChild(launchButton);