chrome.runtime.onInstalled.addListener(function() {

    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      // With a new rule ...

        var allowedDomainsUrl = chrome.extension.getURL("assets/supportedDomains.txt");
        fetch(allowedDomainsUrl).then((response) => {
            response.text().then(function (text) {
                var domainsList = text.split('\n');
                var conditions = [];
                for (i = 0; i < domainsList.length; i++) {
                    conditions.push(new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlContains: domainsList[i] },
                        }));
                }
                var newRule = {
                    // That fires when a page's URL contains one of the supported commands.
                    conditions: conditions,
                    // And shows the extension's page action.
                    actions: [ new chrome.declarativeContent.ShowPageAction() ]
                };
                chrome.extension.getBackgroundPage().console.log(conditions.toString());
                chrome.declarativeContent.onPageChanged.addRules([newRule]);
            });
        });
    });
});