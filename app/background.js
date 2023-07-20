var port = null;

function sendNativeMessage() {
    message = {
      "url": document.getElementById('input-text').value,
      "quality": ''
    };
    port.postMessage(message);
}

function openCurrentUrl() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        message = {
            "url": url,
            "quality": ''
        };
        port.postMessage(message);
    });
}

var hostName = "com.google.chrome.tipej.streamlinkchrome";
port = chrome.runtime.connectNative(hostName);
port.onMessage.addListener(function(msg) {
    console.log("Received" + msg);
});
    port.onDisconnect.addListener(function() {
    console.log("Disconnected");
});
// Fetch allowed sites
var allowedDomainsUrl = chrome.runtime.getURL("assets/supportedDomains.txt");
fetch(allowedDomainsUrl).then((response) => {
    response.text().then(function (text) {
        var allowedDomains = text.split('\n');
        console.log(text);
        for (var i = 0; i < allowedDomains.length; i++) {
            var item = allowedDomains[i].trim();
            var end = "*";
            allowedDomains[i] = item.concat(end);
        }
        chrome.contextMenus.create({ // Add contextmenu
            id: 'asdfa8a9seffesf34',
            title: "Send to Streamlink",
            type: 'normal',
            documentUrlPatterns: allowedDomains,
            targetUrlPatterns: allowedDomains,
            contexts: ["page", "video", "link"],
        });
        
    });
});
console.log("Adding runtime listener");
chrome.runtime.onMessage.addListener ( // Add listener for contentscript launch events
    
    function (request, sender, sendResponse) {
        console.log("Received runtime message:" + request.Message);
        if (request.Message == "launchStream") {
            openCurrentUrl();
        } else {
            message = {
                "url": request.Message,
                "quality": ''
            };
            port.postMessage(message);
        }
        setTimeout(function() {
            sendResponse({status: true});
        }, 1);
        return true;
    }
);
chrome.contextMenus.onClicked.addListener(function (){openCurrentUrl();}); // Add context menu launcher