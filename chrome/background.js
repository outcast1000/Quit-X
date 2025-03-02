// Add debugging logs to trace rule installation

console.log("Alex 1.1");

chrome.runtime.onInstalled.addListener(() => {
    console.log("Twitter Blocker extension installed");
    
    console.log("Alex 2.1");

    // Create a listener for web navigation events to monitor visits to x.com
    chrome.webNavigation.onBeforeNavigate.addListener(details => {
        chrome.declarativeNetRequest.getMatchedRules({})
        .then(matchedRules => {
          console.log("Current matched rules:", matchedRules);
        });
        console.log("Navigation detected:", details);
        if (details.url.includes("x.com")) {
          console.log(details.url + "navigation detected");
        }
    });
});