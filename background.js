// background.js
// *IMPORTANT* Use:
// chrome.storage.local.set({'links_found': true});
// For when we find links in the algorithm
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let url = tabs[0].url;
      if ((url.includes("https://www.openstreetmap.org/way/") || url.includes("https://www.openstreetmap.org/node/")
        || url.includes("https://www.openstreetmap.org/relation/")) && !(url.includes("#"))) {
        var pathArray = url.split('/'); // splits URL by slashes
        var locType = pathArray[3]; // way, relation or node
        var osm_id = pathArray[4]; // unique location identifier in OSM
        var queryUrl = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];${locType}(${osm_id});out tags bb;`;
        const req = new XMLHttpRequest();
        req.open("GET", queryUrl);
        req.responseType = 'json';
        req.send();
        var osmData; // stores OSM data in JSON format
        var lat; // latitude
        var lon; // longitude
        var name // location's name
        req.onreadystatechange = (e) => {
          osmData = req.response;
          console.log(osmData);
        }
        // The following lines gather name, longitude and latidude from OSM JSON
        name = osmData.elements['0'].tags['name:en']; // fix this
        if(locType == 'way' || locType == 'relation') {
          lat = (osmData.minlat + osmData.maxlat) / 2;
          lon = (osmData.minlon + osmData.maxlon) / 2;
        }
        else {
          lat = osmData.lat;
          lon = osmData.lon;
        }
      }
    });
  }
  chrome.storage.local.get('links_found', function (data) {
    if (data.links_found) {
      chrome.pageAction.setPopup({
        tabId: tabId,
        popup: 'popup.html'
      });
    } else {
      chrome.pageAction.setPopup({
        tabId: tabId,
        popup: 'popup_nolinks.html'
      });
    }
  });
});
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({ 'links_found': false }); // move this somewhere else later
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.openstreetmap.org' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});