// background.js
// *IMPORTANT* Use:
// chrome.storage.local.set({'links_found': true});
// For when we find links in the algorithm
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.local.get('links_found', function(data) {
      if (data.links_found) {
        chrome.pageAction.setPopup({
          tabId: tabId,
          popup: 'popup.html'
        });
      } else {
        chrome.browserAction.setPopup({
          tabId: tabId,
          popup: 'popup_sign_in.html'
        });
      }
      });
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        if (url.includes("https://www.openstreetmap.org/way/") || url.includes("https://www.openstreetmap.org/node/")) {
            alert("You are at an OSM Location!");
        }
    });
});
chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'www.openstreetmap.org'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });
