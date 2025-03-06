// Add debugging logs to trace rule installation

console.log("Alex 1.1");

chrome.runtime.onInstalled.addListener(() => {
    console.log("Twitter Blocker extension installed");
    
    console.log("Alex 2.1");

    // Check if the declarativeNetRequestFeedback permission is granted
    chrome.permissions.contains({ permissions: ['declarativeNetRequestFeedback'] }, (granted) => {
        if (granted) {
            console.log("declarativeNetRequestFeedback permission granted.");
            
            // Create a listener for web navigation events to monitor visits to x.com
            chrome.webNavigation.onBeforeNavigate.addListener(details => {
                chrome.declarativeNetRequest.getMatchedRules({})
                .then(matchedRules => {
                    console.log("Current matched rules:", matchedRules);
                });
                console.log("Navigation detected:", details);
                if (details.url.includes("x.com")) {
                    console.log(details.url + " navigation detected");
                }
            });
        } else {
            console.log("declarativeNetRequestFeedback permission not granted. Skipping matched rules logging.");
            
            // Create a listener for web navigation events to monitor visits to x.com without matched rules logging
            chrome.webNavigation.onBeforeNavigate.addListener(details => {
                console.log("Navigation detected:", details);
                if (details.url.includes("x.com")) {
                    console.log(details.url + " navigation detected");
                }
            });
        }
    });
});