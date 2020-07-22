var port = null;

function sendNativeMessage() {
    message = {
      "url": document.getElementById('input-text').value,
      "quality": ''
    };
    port.postMessage(message);
}
  
chrome.runtime.onInstalled.addListener(function() {
    var hostName = "com.google.chrome.example.echo";
    port = chrome.runtime.connectNative(hostName);
    // Fetch allowed sites
    var allowedDomainsUrl = chrome.extension.getURL("assets/supportedDomains.txt");
        fetch(allowedDomainsUrl).then((response) => {
            response.text().then(function (text) {
                // Replace all rules ...
                chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
                    // With a new rule ...
                    var domainsList = text.replace(/\./g, "\\.").split('\n');
                    var urlConditions = "";
                    for (i = 0; i < domainsList.length; i++) {
                        urlConditions = urlConditions.concat('^'.concat('(' + domainsList[i].trim() + ')'));
                        if (i != domainsList.length - 1) {
                            urlConditions = urlConditions.concat('|');
                        }
                    }
                    var newRule = {
                        // That fires when a page's URL contains one of the supported commands.
                        conditions: [new chrome.declarativeContent.PageStateMatcher({
                            pageUrl: { urlMatches: urlConditions },
                        })],
                        // And shows the extension's page action.
                        actions: [ new chrome.declarativeContent.ShowPageAction() ]
                    };
                    chrome.declarativeContent.onPageChanged.addRules([newRule]);
                });
                var allowedDomains = text.split('\n');
                for (i = 0; i < allowedDomains.length; i++) {
                    var item = allowedDomains[i].trim();
                    var end = "*";
                    allowedDomains[i] = item.concat(end);
                }
                chrome.contextMenus.create({
                    id: 'asdfa8a9seffesf34',
                    title: "Send to Streamlink",
                    type: 'normal',
                    documentUrlPatterns: allowedDomains,
                    targetUrlPatterns: allowedDomains,
                    contexts: ["page", "video", "link"],
                });
                
            });
        });
    chrome.runtime.onMessage.addListener (
        function (request, sender, sendResponse) {
            if (request.Message == "launchStream") {
                chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                    let url = tabs[0].url;
                    message = {
                        "url": url,
                        "quality": ''
                      };
                    port.postMessage(message);
                })
                
            }
        }
    );
});