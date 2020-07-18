chrome.runtime.onInstalled.addListener(function() {

    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      // With a new rule ...

        var allowedDomainsUrl = chrome.extension.getURL("assets/supportedDomains.txt");
        fetch(allowedDomainsUrl).then((response) => {
            response.text().then(function (text) {
                var domainsList = text.replace(/\./g, "\\.").split('\n');
                var urlConditions = "";
                for (i = 0; i < domainsList.length; i++) {
                    urlConditions = urlConditions.concat('^'.concat('(' + domainsList[i].trim() + ')'));
                    if (i != domainsList.length - 1) {
                        urlConditions = urlConditions.concat('|');
                    }
                }
                chrome.extension.getBackgroundPage().console.log(urlConditions);
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
        });
    });
});