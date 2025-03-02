
document.addEventListener('DOMContentLoaded', function() {
    const debugInfo = document.getElementById('debugInfo');

    // If debugInfo is not found, do nothing
    if (!debugInfo) {
        return;
    }

    // Test X.com blocking
    document.getElementById('testX').addEventListener('click', async () => {
      debugInfo.textContent = "Testing X.com blocking...";
      try {
        // Check current rules
        const rules = await chrome.declarativeNetRequest.getDynamicRules();
        debugInfo.textContent = `Current dynamic rules: ${JSON.stringify(rules, null, 2)}\n`;
        
        // Attempt to inject a content script that will check if we can access x.com
        chrome.tabs.create({url: "https://x.com"}, async (tab) => {
          setTimeout(async () => {
            try {
              // Check where the tab ended up
              const currentTab = await chrome.tabs.get(tab.id);
              debugInfo.textContent += `\nTab navigated to: ${currentTab.url}\n`;
              if (currentTab.url.includes("blocked.html")) {
                debugInfo.textContent += "SUCCESS: x.com was properly blocked!";
              } else {
                debugInfo.textContent += "FAILURE: x.com was not blocked!";
              }
            } catch (err) {
              debugInfo.textContent += `Error checking tab: ${err.message}`;
            }
          }, 2000); // Give it 2 seconds to redirect
        });
      } catch (error) {
        debugInfo.textContent += `\nError: ${error.message}`;
      }
    });
    
    // Test Twitter.com blocking
    document.getElementById('testTwitter').addEventListener('click', async () => {
      debugInfo.textContent = "Testing Twitter.com blocking...";
      try {
        chrome.tabs.create({url: "https://twitter.com"}, async (tab) => {
          setTimeout(async () => {
            const currentTab = await chrome.tabs.get(tab.id);
            debugInfo.textContent += `\nTab navigated to: ${currentTab.url}\n`;
            if (currentTab.url.includes("blocked.html")) {
              debugInfo.textContent += "SUCCESS: twitter.com was properly blocked!";
            } else {
              debugInfo.textContent += "FAILURE: twitter.com was not blocked!";
            }
          }, 2000);
        });
      } catch (error) {
        debugInfo.textContent += `\nError: ${error.message}`;
      }
    });
    
    // Refresh rules
    document.getElementById('refreshRules').addEventListener('click', async () => {
      debugInfo.textContent = "Refreshing rules...";
      try {
        await chrome.runtime.sendMessage({action: "refreshRules"});
        const rules = await chrome.declarativeNetRequest.getDynamicRules();
        debugInfo.textContent = `Rules refreshed successfully!\n${JSON.stringify(rules, null, 2)}`;
      } catch (error) {
        debugInfo.textContent += `\nError refreshing rules: ${error.message}`;
      }
    });
    
    // Initial debug info
    chrome.declarativeNetRequest.getDynamicRules().then(rules => {
      debugInfo.textContent = `Active dynamic rules: ${rules.length}\n`;
      debugInfo.textContent += JSON.stringify(rules, null, 2);
    });
  });
  [
    {
      "id": 1,
      "priority": 1,
      "action": {
        "type": "redirect",
        "redirect": {
          "extensionPath": "/blocked.html"
        }
      },
      "condition": {
        "urlFilter": "*://*.twitter.com/*",
        "resourceTypes": ["main_frame"]
      }
    },
    {
      "id": 2,
      "priority": 1,
      "action": {
        "type": "redirect",
        "redirect": {
          "extensionPath": "/blocked.html"
        }
      },
      "condition": {
        "urlFilter": "*://twitter.com/*",
        "resourceTypes": ["main_frame"]
      }
    },
    {
      "id": 3,
      "priority": 1,
      "action": {
        "type": "redirect",
        "redirect": {
          "extensionPath": "/blocked.html"
        }
      },
      "condition": {
        "urlFilter": "*://*.x.com/*",
        "resourceTypes": ["main_frame"]
      }
    },
    {
      "id": 4,
      "priority": 1,
      "action": {
        "type": "redirect",
        "redirect": {
          "extensionPath": "/blocked.html"
        }
      },
      "condition": {
        "urlFilter": "*://x.com/*",
        "resourceTypes": ["main_frame"]
      }
    }
  ]